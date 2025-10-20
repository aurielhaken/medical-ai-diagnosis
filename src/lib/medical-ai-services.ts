import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// Configuration Gemini
let genAI: GoogleGenerativeAI | null = null;

function initializeGemini(apiKey: string) {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

// Fonction pour appeler Gemini Pro avec prompt médical spécialisé
export async function callGeminiMedical(symptoms: string[], doctorId: string, apiKey: string, clarificationAnswers?: Record<string, string>): Promise<any> {
  try {
    const genAI = initializeGemini(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const clarificationContext = clarificationAnswers 
      ? `\n\nINFORMATIONS SUPPLÉMENTAIRES (réponses aux questions de clarification):\n${Object.entries(clarificationAnswers).map(([key, value]) => `- ${key}: ${value}`).join('\n')}`
      : '';

    const medicalPrompt = `
Tu es un médecin IA expert en diagnostic médical. Analyse les symptômes suivants et fournis un diagnostic médical détaillé et professionnel.

SYMPTÔMES: ${symptoms.join(', ')}
${clarificationContext}

DOCTEUR: ${doctorId}

Réponds UNIQUEMENT avec un JSON valide contenant:
{
  "condition": "Nom de la condition la plus probable",
  "probability": 85,
  "description": "Description détaillée de la condition et des mécanismes",
  "symptoms": ["symptôme1", "symptôme2"],
  "recommendations": ["recommandation1", "recommandation2", "recommandation3"],
  "urgency": "low|medium|high|critical",
  "differentialDiagnosis": ["diagnostic alternatif 1", "diagnostic alternatif 2"],
  "nextSteps": ["étape 1", "étape 2"],
  "category": "catégorie médicale",
  "severity": "légère|modérée|sévère"
}

IMPORTANT:
- Sois précis et médicalement rigoureux
- Considère les diagnostics différentiels
- Évalue correctement l'urgence
- Donne des recommandations pratiques
- Reste dans le cadre du diagnostic préliminaire
- N'oublie jamais de recommander une consultation médicale si nécessaire
`;

    const result = await model.generateContent(medicalPrompt);
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim() === '') {
      throw new Error('Réponse vide de Gemini');
    }

    // Extraire le JSON de la réponse
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Format de réponse invalide de Gemini');
  } catch (error) {
    console.error('Erreur Gemini API médicale:', error);
    throw error;
  }
}

// Fonction pour appeler OpenAI avec prompt médical spécialisé
export async function callOpenAIMedical(symptoms: string[], doctorId: string, apiKey: string, clarificationAnswers?: Record<string, string>): Promise<any> {
  try {
    const openai = new OpenAI({ apiKey });

    const clarificationContext = clarificationAnswers 
      ? `\n\nINFORMATIONS SUPPLÉMENTAIRES (réponses aux questions de clarification):\n${Object.entries(clarificationAnswers).map(([key, value]) => `- ${key}: ${value}`).join('\n')}`
      : '';

    const medicalPrompt = `Tu es un médecin IA expert en diagnostic médical. Analyse les symptômes suivants et fournis un diagnostic médical détaillé et professionnel.

SYMPTÔMES: ${symptoms.join(', ')}
${clarificationContext}
DOCTEUR: ${doctorId}

Réponds UNIQUEMENT avec un JSON valide contenant:
{
  "condition": "Nom de la condition la plus probable",
  "probability": 85,
  "description": "Description détaillée de la condition et des mécanismes",
  "symptoms": ["symptôme1", "symptôme2"],
  "recommendations": ["recommandation1", "recommandation2", "recommandation3"],
  "urgency": "low|medium|high|critical",
  "differentialDiagnosis": ["diagnostic alternatif 1", "diagnostic alternatif 2"],
  "nextSteps": ["étape 1", "étape 2"],
  "category": "catégorie médicale",
  "severity": "légère|modérée|sévère"
}

IMPORTANT:
- Sois précis et médicalement rigoureux
- Considère les diagnostics différentiels
- Évalue correctement l'urgence
- Donne des recommandations pratiques
- Reste dans le cadre du diagnostic préliminaire
- N'oublie jamais de recommander une consultation médicale si nécessaire`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Tu es un médecin IA expert avec une vaste connaissance médicale. Tu fournis des diagnostics préliminaires précis et des recommandations médicales appropriées."
        },
        {
          role: "user",
          content: medicalPrompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.3,
      top_p: 0.95
    });

    const content = completion.choices[0]?.message?.content;
    if (!content || content.trim() === '') {
      throw new Error('Réponse vide d\'OpenAI');
    }

    // Extraire le JSON de la réponse
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Format de réponse invalide d\'OpenAI');
  } catch (error) {
    console.error('Erreur OpenAI API médicale:', error);
    throw error;
  }
}

// Fonction pour appeler OpenRouter avec modèles médicaux spécialisés
export async function callOpenRouterMedical(symptoms: string[], doctorId: string, apiKey: string, clarificationAnswers?: Record<string, string>): Promise<any> {
  // Modèles médicaux spécialisés par ordre de préférence
  const MEDICAL_MODELS = [
    'anthropic/claude-3.5-sonnet', // Excellent pour le raisonnement médical
    'openai/gpt-4o', // Très bon pour les diagnostics
    'meta-llama/llama-3.1-70b-instruct', // Bon modèle open-source
    'google/gemini-pro-1.5', // Alternative Google
    'meta-llama/llama-3.1-8b-instruct' // Fallback plus léger
  ];

  for (const model of MEDICAL_MODELS) {
    try {
      console.log(`Tentative diagnostic médical avec: ${model}`);
      
      const clarificationContext = clarificationAnswers 
        ? `\n\nINFORMATIONS SUPPLÉMENTAIRES (réponses aux questions de clarification):\n${Object.entries(clarificationAnswers).map(([key, value]) => `- ${key}: ${value}`).join('\n')}`
        : '';

      const medicalPrompt = `Tu es un médecin IA expert en diagnostic médical. Analyse les symptômes suivants et fournis un diagnostic médical détaillé et professionnel.

SYMPTÔMES: ${symptoms.join(', ')}
${clarificationContext}
DOCTEUR: ${doctorId}

Réponds UNIQUEMENT avec un JSON valide contenant:
{
  "condition": "Nom de la condition la plus probable",
  "probability": 85,
  "description": "Description détaillée de la condition et des mécanismes",
  "symptoms": ["symptôme1", "symptôme2"],
  "recommendations": ["recommandation1", "recommandation2", "recommandation3"],
  "urgency": "low|medium|high|critical",
  "differentialDiagnosis": ["diagnostic alternatif 1", "diagnostic alternatif 2"],
  "nextSteps": ["étape 1", "étape 2"],
  "category": "catégorie médicale",
  "severity": "légère|modérée|sévère"
}

IMPORTANT:
- Sois précis et médicalement rigoureux
- Considère les diagnostics différentiels
- Évalue correctement l'urgence
- Donne des recommandations pratiques
- Reste dans le cadre du diagnostic préliminaire
- N'oublie jamais de recommander une consultation médicale si nécessaire`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://medical-ai-diagnosis.com',
          'X-Title': 'Medical AI Diagnosis',
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: "Tu es un médecin IA expert avec une vaste connaissance médicale. Tu fournis des diagnostics préliminaires précis et des recommandations médicales appropriées."
            },
            {
              role: "user",
              content: medicalPrompt
            }
          ],
          temperature: 0.2, // Plus déterministe pour les diagnostics médicaux
          top_p: 0.95,
          max_tokens: 1500,
          stream: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content && content.trim()) {
          console.log(`Diagnostic médical réussi avec: ${model}`);
          
          // Extraire le JSON de la réponse
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          }
        }
      } else {
        console.log(`Modèle médical ${model} indisponible: ${response.status}`);
      }
    } catch (error) {
      console.log(`Erreur avec le modèle médical ${model}:`, error);
      continue; // Essayer le modèle suivant
    }
  }
  
  throw new Error('Tous les modèles médicaux OpenRouter ont échoué');
}
