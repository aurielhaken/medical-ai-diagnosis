import { NextRequest, NextResponse } from 'next/server';
import { analyzeSymptoms, getPersonalizedRecommendations, calculateUrgency } from '@/lib/medical-database';
import { callGeminiMedical, callOpenAIMedical, callOpenRouterMedical } from '@/lib/medical-ai-services';
import { getTreatmentForCondition, searchTreatmentsBySymptom } from '@/lib/medical-treatments';
import { getUniversalTreatmentsForSymptom, generateIntegrativePlan } from '@/lib/universal-medicine';

// Cache simple en mémoire
const diagnosisCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symptoms, doctorId, clarificationAnswers } = body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
        return NextResponse.json(
          { error: 'Symptômes requis' },
          {
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
              'Access-Control-Allow-Credentials': 'true',
            }
          }
        );
    }

    // Vérifier le cache
    const cacheKey = JSON.stringify({ symptoms, doctorId });
    const cached = diagnosisCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('📦 Utilisation du cache pour:', symptoms);
      return NextResponse.json({ ...cached.data, fromCache: true });
    }

    // Plus besoin de vérifier le doctorId - diagnostic automatique

    // Vérifier les clés API disponibles pour l'IA médicale
    const geminiKey = process.env.GOOGLE_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const openAIKey = process.env.OPENAI_API_KEY;
    
    let aiDiagnosis = null;
    let mode = 'fallback';

    // 1. Essayer Gemini Pro en premier (GRATUIT) avec timeout
    if (geminiKey) {
      try {
        console.log('Tentative diagnostic avec Gemini Pro (gratuit)...');
        aiDiagnosis = await Promise.race([
          callGeminiMedical(symptoms, 'universal-ai', geminiKey, clarificationAnswers),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout Gemini')), 15000)
          )
        ]);
        mode = 'gemini-medical';
      } catch (e) {
        console.error('Gemini médical failed:', e);
      }
    }

    // 2. Essayer OpenAI GPT-4o (excellent pour le médical) avec timeout
    if (!aiDiagnosis && openAIKey) {
      try {
        console.log('Tentative diagnostic avec OpenAI GPT-4o...');
        aiDiagnosis = await Promise.race([
          callOpenAIMedical(symptoms, 'universal-ai', openAIKey, clarificationAnswers),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout OpenAI')), 15000)
          )
        ]);
        mode = 'openai-medical';
      } catch (e) {
        console.error('OpenAI médical failed:', e);
      }
    }

    // 3. Essayer OpenRouter avec modèles médicaux spécialisés avec timeout
    if (!aiDiagnosis && openRouterKey) {
      try {
        console.log('Tentative diagnostic avec OpenRouter...');
        aiDiagnosis = await Promise.race([
          callOpenRouterMedical(symptoms, 'universal-ai', openRouterKey, clarificationAnswers),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout OpenRouter')), 20000)
          )
        ]);
        mode = 'openrouter-medical';
      } catch (e) {
        console.error('OpenRouter médical failed:', e);
      }
    }

    // 4. Fallback vers la base de données statique si aucune IA disponible
    if (!aiDiagnosis) {
      console.log('Fallback vers la base de données médicale statique...');
      const diagnosis = analyzeSymptoms(symptoms, 'universal-ai');
      
      if (!diagnosis) {
        return NextResponse.json({
          condition: 'Symptômes non spécifiques',
          probability: 30,
          description: 'Les symptômes décrits ne correspondent pas à un pattern médical spécifique connu. Une consultation médicale est recommandée pour une évaluation plus approfondie.',
          symptoms: symptoms,
          recommendations: [
            'Consultation médicale recommandée',
            'Surveillance des symptômes',
            'Tenir un journal des symptômes',
            'Retour si aggravation'
          ],
          urgency: 'medium',
          doctor: doctorId,
          timestamp: new Date().toISOString(),
          differentialDiagnosis: ['Consultation médicale nécessaire'],
          nextSteps: [
            'Consultation médicale',
            'Examens complémentaires si nécessaire'
          ]
        });
      }

      // Personnaliser les recommandations selon le médecin
      const personalizedRecommendations = getPersonalizedRecommendations(diagnosis, doctorId);
      
      // Calculer l'urgence
      const urgency = calculateUrgency(symptoms, diagnosis);

      // Générer le diagnostic final
      aiDiagnosis = {
        condition: diagnosis.name,
        probability: diagnosis.probability,
        description: diagnosis.description,
        symptoms: symptoms,
        recommendations: personalizedRecommendations,
        urgency: urgency,
        differentialDiagnosis: diagnosis.differentialDiagnosis,
        nextSteps: diagnosis.nextSteps,
        category: diagnosis.category,
        severity: diagnosis.severity
      };
      mode = 'static-database';
    }

    // Rechercher les traitements appropriés
    let treatments = null;
    let universalTreatments = null;
    let integrativePlan = null;
    
    try {
      treatments = getTreatmentForCondition(aiDiagnosis.condition, aiDiagnosis.severity);
      if (!treatments) {
        // Rechercher par symptômes si pas de condition exacte
        const symptomTreatments = searchTreatmentsBySymptom(symptoms);
        treatments = symptomTreatments[0] || null;
      }

      // Rechercher les traitements universels
      const universalOptions: any[] = [];
      symptoms.forEach(symptom => {
        const symptomTreatments = getUniversalTreatmentsForSymptom(symptom);
        universalOptions.push(...symptomTreatments);
      });

      if (universalOptions.length > 0) {
        universalTreatments = universalOptions.slice(0, 8); // Limiter à 8 traitements
      }

      // Générer un plan intégratif
      integrativePlan = generateIntegrativePlan(symptoms, aiDiagnosis.severity);
    } catch (error) {
      console.error('Erreur lors de la recherche de traitements:', error);
    }

    // Générer le diagnostic final avec l'IA
    const finalDiagnosis = {
      id: Date.now().toString(),
      condition: aiDiagnosis.condition,
      probability: aiDiagnosis.probability || 75,
      description: aiDiagnosis.description,
      symptoms: symptoms,
      recommendations: aiDiagnosis.recommendations || [
        'Consultation médicale recommandée',
        'Surveillance des symptômes'
      ],
      urgency: aiDiagnosis.urgency || 'medium',
      doctor: doctorId,
      timestamp: new Date().toISOString(),
      differentialDiagnosis: aiDiagnosis.differentialDiagnosis || ['Consultation médicale nécessaire'],
      nextSteps: aiDiagnosis.nextSteps || ['Consultation médicale'],
      category: aiDiagnosis.category || 'Général',
      severity: aiDiagnosis.severity || 'modérée',
      aiMode: mode, // Indique quelle IA a été utilisée
      // Ajouter les informations de traitement
      treatments: treatments ? {
        medications: treatments.medications,
        naturalRemedies: treatments.naturalRemedies,
        lifestyleChanges: treatments.lifestyleChanges,
        emergencyActions: treatments.emergencyActions,
        consultationAdvice: treatments.consultationAdvice,
        followUpInstructions: treatments.followUpInstructions
      } : null,
      // Ajouter les médecines universelles
      universalTreatments: universalTreatments || null,
      integrativePlan: integrativePlan || null
    };

        // Mettre en cache le résultat
        diagnosisCache.set(cacheKey, {
          data: finalDiagnosis as unknown,
          timestamp: Date.now()
        });

    // Limiter la taille du cache (garder max 100 entrées)
    if (diagnosisCache.size > 100) {
      const firstKey = diagnosisCache.keys().next().value;
      if (firstKey) {
        diagnosisCache.delete(firstKey);
      }
    }

    return NextResponse.json(finalDiagnosis, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
      }
    });

  } catch (error) {
    console.error('Erreur dans l\'API de diagnostic:', error);
        return NextResponse.json(
          { error: 'Erreur interne du serveur' },
          {
            status: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
              'Access-Control-Allow-Credentials': 'true',
            }
          }
        );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

export async function GET() {
  return NextResponse.json({
    message: 'API de diagnostic médical IA',
    version: '1.0.0',
    doctors: [
      'dr-sarah',
      'dr-marcus', 
      'dr-elena',
      'dr-james'
    ]
  }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
      }
  });
}
