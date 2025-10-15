import { NextRequest, NextResponse } from 'next/server';
import { medicalSearchEngine } from '@/lib/medical-search-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message requis' },
        { status: 400 }
      );
    }

  console.log(`Chat médical: "${message}"`);

  // Analyser le message pour déterminer le type de réponse
  const response = await generateMedicalChatResponse(message, conversationHistory);
  console.log(`Réponse finale:`, JSON.stringify(response, null, 2));

    return NextResponse.json({
      success: true,
      message: message,
      response: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur dans l\'API de chat médical:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

async function generateMedicalChatResponse(message: string, conversationHistory: any[]) {
  const messageLower = message.toLowerCase();
  
  // Détecter les symptômes mentionnés
  const symptoms = detectSymptoms(message);
  console.log(`Symptômes détectés: [${symptoms.join(', ')}]`);
  
  // Générer des questions de suivi basées sur les symptômes
  const followUpQuestions = generateFollowUpQuestions(symptoms, message);
  
  // Rechercher des informations médicales pertinentes
  const medicalInfo = await medicalSearchEngine.search(message);
  console.log(`Recherche médicale pour "${message}":`, medicalInfo ? 'Résultats trouvés' : 'Aucun résultat');
  
  // Générer une réponse contextuelle
  let response = {
    type: 'question' as 'question' | 'information' | 'recommendation',
    text: '',
    followUpQuestions: followUpQuestions,
    followUpOptions: [] as string[],
    medicalInfo: null as any,
    urgency: 'low' as 'low' | 'medium' | 'high' | 'critical',
    recommendations: [] as string[],
    videos: [] as string[]
  };

  // Analyser l'urgence
  if (messageLower.includes('urgent') || messageLower.includes('grave') || messageLower.includes('sang') || messageLower.includes('douleur thoracique')) {
    response.urgency = 'high';
  } else if (messageLower.includes('fièvre') || messageLower.includes('forte') || messageLower.includes('intense')) {
    response.urgency = 'medium';
  }

  // Générer la réponse principale
  if (symptoms.length > 0) {
    const mainSymptom = symptoms[0];
    response.text = generateSymptomResponse(mainSymptom, message);
    response.medicalInfo = medicalInfo;
    response.recommendations = generateRecommendations(mainSymptom, medicalInfo);
    response.videos = extractVideos(medicalInfo);
    response.followUpOptions = generateFollowUpOptions(mainSymptom, message);
    response.type = 'information';
    console.log(`Réponse générée pour le symptôme: ${mainSymptom}`);
    console.log(`Type de réponse: ${response.type}`);
    console.log(`Nombre de recommandations: ${response.recommendations.length}`);
    console.log(`Nombre d'options de suivi: ${response.followUpOptions.length}`);
  } else {
    response.text = "Je comprends que vous ne vous sentez pas bien. Pouvez-vous me décrire plus précisément vos symptômes ? Par exemple : avez-vous de la fièvre, des douleurs, des nausées ?";
    response.type = 'question';
    console.log('Aucun symptôme détecté, réponse générique générée');
  }

  return response;
}

function detectSymptoms(message: string): string[] {
  const symptoms: string[] = [];
  const messageLower = message.toLowerCase();
  
  // Liste des symptômes courants
  const symptomKeywords = {
    'mal de tête': ['mal de tête', 'mal de tete', 'céphalée', 'migraine', 'douleur tête', 'douleur tete', 'mal au crâne', 'mal au crane', 'j\'ai mal à la tête', 'j\'ai mal a la tete', 'mal de crane'],
    'fièvre': ['fièvre', 'fievre', 'température', 'temperature', 'chaud', 'fiévreux', 'fievreux'],
    'nausées': ['nausées', 'nausees', 'nausée', 'nausee', 'envie de vomir', 'vomir'],
    'douleur thoracique': ['douleur thoracique', 'douleur poitrine', 'oppression thoracique', 'mal à la poitrine', 'mal a la poitrine'],
    'douleur abdominale': ['douleur abdominale', 'mal au ventre', 'douleur estomac', 'mal à l\'estomac', 'mal a l\'estomac', 'douleur ventre', 'crampes ventre', 'crampes au ventre', 'douleur côté droit', 'douleur cote droit', 'douleur côté gauche', 'douleur cote gauche', 'douleur en haut du ventre', 'douleur en bas du ventre'],
    'fatigue': ['fatigue', 'épuisement', 'epuisement', 'faiblesse', 'fatigué', 'fatiguee', 'épuisé', 'epuise'],
    'toux': ['toux', 'tousser', 'tousse'],
    'essoufflement': ['essoufflement', 'difficulté respirer', 'difficulte respirer', 'respiration difficile', 'souffle court'],
    'douleur dos': ['mal de dos', 'douleur dos', 'lombalgie', 'mal au dos', 'douleur lombaire'],
    'douleur articulaire': ['douleur articulaire', 'mal aux articulations', 'arthrite', 'douleur genou', 'douleur épaule', 'douleur epaule'],
    'vertiges': ['vertiges', 'vertige', 'étourdissement', 'etourdissement', 'sensation de tourner'],
    'diarrhée': ['diarrhée', 'diarrhee', 'selles liquides', 'selles molles'],
    'constipation': ['constipation', 'difficulté à aller aux toilettes', 'difficulte a aller aux toilettes'],
    'douleur gorge': ['mal de gorge', 'douleur gorge', 'gorge irritée', 'gorge irritee'],
    'écoulement nasal': ['écoulement nasal', 'ecoulement nasal', 'nez qui coule', 'rhume']
  };

  for (const [symptom, keywords] of Object.entries(symptomKeywords)) {
    if (keywords.some(keyword => messageLower.includes(keyword))) {
      symptoms.push(symptom);
    }
  }

  console.log(`Symptômes détectés: [${symptoms.join(', ')}] pour le message: ${message}`);
  console.log(`Message en minuscules: "${messageLower}"`);
  return symptoms;
}

function generateFollowUpQuestions(symptoms: string[], message: string): string[] {
  const questions: string[] = [];
  const messageLower = message.toLowerCase();

  if (symptoms.includes('mal de tête')) {
    questions.push("Quel type de mal de tête ressentez-vous ? (lancinant, pulsatile, constant, intermittent)");
    questions.push("Depuis combien de temps avez-vous ce mal de tête ?");
    questions.push("Avez-vous d'autres symptômes comme de la fièvre, des nausées ou une sensibilité à la lumière ?");
  }

  if (symptoms.includes('fièvre')) {
    questions.push("Quelle est votre température ?");
    questions.push("Depuis quand avez-vous de la fièvre ?");
    questions.push("Avez-vous d'autres symptômes comme des frissons, des sueurs ou des courbatures ?");
  }

  if (symptoms.includes('douleur abdominale')) {
    questions.push("Où exactement ressentez-vous la douleur ? (haut du ventre, bas du ventre, côté droit/gauche)");
    questions.push("La douleur est-elle constante ou par vagues ?");
    questions.push("Avez-vous des nausées, des vomissements ou des changements dans vos selles ?");
  }

  if (symptoms.includes('fatigue')) {
    questions.push("Cette fatigue est-elle récente ou dure-t-elle depuis longtemps ?");
    questions.push("Avez-vous des difficultés à dormir ou vous réveillez-vous fatigué ?");
    questions.push("Y a-t-il eu des changements récents dans votre vie (stress, alimentation, activité) ?");
  }

  // Questions générales si pas de symptôme spécifique détecté
  if (symptoms.length === 0) {
    questions.push("Pouvez-vous me dire depuis quand vous ne vous sentez pas bien ?");
    questions.push("Avez-vous de la fièvre ou une température élevée ?");
    questions.push("Y a-t-il des symptômes particuliers qui vous inquiètent ?");
  }

  return questions.slice(0, 3); // Limiter à 3 questions
}

function generateFollowUpOptions(symptom: string, message: string): string[] {
  const options: string[] = [];

  if (symptom === 'mal de tête') {
    options.push(
      "Mal de tête lancinant/pulsatile",
      "Mal de tête constant et sourd",
      "Mal de tête par vagues/intermittent",
      "Mal de tête avec nausées",
      "Mal de tête avec sensibilité à la lumière",
      "Mal de tête au réveil",
      "Mal de tête après effort",
      "Mal de tête avec fièvre",
      "Mal de tête avec vertiges",
      "Mal de tête avec raideur de la nuque",
      "Mal de tête unilatéral (un seul côté)",
      "Mal de tête avec troubles visuels"
    );
  }

  if (symptom === 'fièvre') {
    options.push(
      "Fièvre légère (37-38°C)",
      "Fièvre modérée (38-39°C)",
      "Fièvre élevée (39-40°C)",
      "Fièvre très élevée (>40°C)",
      "Fièvre avec frissons",
      "Fièvre avec sueurs",
      "Fièvre avec courbatures",
      "Fièvre depuis plus de 3 jours",
      "Fièvre avec maux de tête",
      "Fièvre avec éruption cutanée",
      "Fièvre avec douleurs musculaires",
      "Fièvre avec fatigue intense"
    );
  }

  if (symptom === 'nausées') {
    options.push(
      "Nausées légères",
      "Nausées avec envie de vomir",
      "Nausées après avoir mangé",
      "Nausées au réveil",
      "Nausées avec vertiges",
      "Nausées avec maux de tête",
      "Nausées avec douleur abdominale",
      "Nausées avec fièvre",
      "Nausées avec perte d'appétit",
      "Nausées avec fatigue",
      "Nausées avec diarrhée",
      "Nausées avec constipation"
    );
  }

  if (symptom === 'douleur abdominale') {
    options.push(
      "Douleur en haut du ventre",
      "Douleur en bas du ventre",
      "Douleur côté droit",
      "Douleur côté gauche",
      "Douleur constante",
      "Douleur par vagues/crampes",
      "Douleur avec nausées",
      "Douleur avec fièvre",
      "Douleur avec ballonnements",
      "Douleur avec diarrhée",
      "Douleur avec constipation",
      "Douleur après avoir mangé"
    );
  }

  if (symptom === 'fatigue') {
    options.push(
      "Fatigue récente (quelques jours)",
      "Fatigue chronique (plusieurs semaines)",
      "Fatigue au réveil",
      "Fatigue après effort",
      "Fatigue avec difficultés de concentration",
      "Fatigue avec troubles du sommeil",
      "Fatigue avec perte d'appétit",
      "Fatigue avec douleurs musculaires",
      "Fatigue avec maux de tête",
      "Fatigue avec nausées",
      "Fatigue avec fièvre",
      "Fatigue avec essoufflement"
    );
  }

  if (symptom === 'douleur dos') {
    options.push(
      "Douleur lombaire (bas du dos)",
      "Douleur dorsale (milieu du dos)",
      "Douleur cervicale (cou)",
      "Douleur avec raideur",
      "Douleur qui irradie dans la jambe",
      "Douleur qui irradie dans le bras",
      "Douleur au mouvement",
      "Douleur au repos",
      "Douleur avec engourdissement",
      "Douleur avec picotements",
      "Douleur avec faiblesse musculaire",
      "Douleur après position assise"
    );
  }

  if (symptom === 'toux') {
    options.push(
      "Toux sèche",
      "Toux grasse avec crachats",
      "Toux nocturne",
      "Toux avec fièvre",
      "Toux avec essoufflement",
      "Toux avec douleur thoracique",
      "Toux persistante (plus de 3 semaines)",
      "Toux avec sang",
      "Toux avec maux de gorge",
      "Toux avec écoulement nasal",
      "Toux avec fatigue",
      "Toux avec maux de tête"
    );
  }

  if (symptom === 'essoufflement') {
    options.push(
      "Essoufflement à l'effort",
      "Essoufflement au repos",
      "Essoufflement en position couchée",
      "Essoufflement avec toux",
      "Essoufflement avec douleur thoracique",
      "Essoufflement avec fièvre",
      "Essoufflement soudain",
      "Essoufflement progressif",
      "Essoufflement avec fatigue",
      "Essoufflement avec maux de tête",
      "Essoufflement avec nausées",
      "Essoufflement avec vertiges"
    );
  }

  if (symptom === 'vertiges') {
    options.push(
      "Vertiges en position debout",
      "Vertiges en tournant la tête",
      "Vertiges avec nausées",
      "Vertiges avec maux de tête",
      "Vertiges avec fatigue",
      "Vertiges avec acouphènes",
      "Vertiges avec perte d'équilibre",
      "Vertiges avec vision trouble",
      "Vertiges soudains",
      "Vertiges persistants",
      "Vertiges avec sueurs",
      "Vertiges avec palpitations"
    );
  }

  if (symptom === 'diarrhée') {
    options.push(
      "Diarrhée aiguë (quelques jours)",
      "Diarrhée chronique (plusieurs semaines)",
      "Diarrhée avec fièvre",
      "Diarrhée avec nausées",
      "Diarrhée avec douleurs abdominales",
      "Diarrhée avec sang",
      "Diarrhée avec mucus",
      "Diarrhée après avoir mangé",
      "Diarrhée avec fatigue",
      "Diarrhée avec déshydratation",
      "Diarrhée avec vomissements",
      "Diarrhée avec perte de poids"
    );
  }

  if (symptom === 'constipation') {
    options.push(
      "Constipation récente",
      "Constipation chronique",
      "Constipation avec douleurs abdominales",
      "Constipation avec ballonnements",
      "Constipation avec nausées",
      "Constipation avec fatigue",
      "Constipation avec perte d'appétit",
      "Constipation avec hémorroïdes",
      "Constipation avec sang dans les selles",
      "Constipation avec douleurs anales",
      "Constipation avec sensation d'évacuation incomplète",
      "Constipation avec selles dures"
    );
  }

  if (symptom === 'douleur gorge') {
    options.push(
      "Mal de gorge léger",
      "Mal de gorge intense",
      "Mal de gorge avec fièvre",
      "Mal de gorge avec difficulté à avaler",
      "Mal de gorge avec toux",
      "Mal de gorge avec écoulement nasal",
      "Mal de gorge avec fatigue",
      "Mal de gorge avec maux de tête",
      "Mal de gorge avec ganglions enflés",
      "Mal de gorge avec voix rauque",
      "Mal de gorge avec points blancs",
      "Mal de gorge avec mauvaise haleine"
    );
  }

  if (symptom === 'écoulement nasal') {
    options.push(
      "Écoulement nasal clair",
      "Écoulement nasal épais",
      "Écoulement nasal avec éternuements",
      "Écoulement nasal avec congestion",
      "Écoulement nasal avec fièvre",
      "Écoulement nasal avec maux de tête",
      "Écoulement nasal avec fatigue",
      "Écoulement nasal avec toux",
      "Écoulement nasal avec mal de gorge",
      "Écoulement nasal avec démangeaisons",
      "Écoulement nasal avec larmoiement",
      "Écoulement nasal avec perte d'odorat"
    );
  }

  if (symptom === 'douleur articulaire') {
    options.push(
      "Douleur articulaire au genou",
      "Douleur articulaire à l'épaule",
      "Douleur articulaire à la hanche",
      "Douleur articulaire au poignet",
      "Douleur articulaire avec raideur",
      "Douleur articulaire avec gonflement",
      "Douleur articulaire au réveil",
      "Douleur articulaire après effort",
      "Douleur articulaire avec fatigue",
      "Douleur articulaire avec fièvre",
      "Douleur articulaire avec rougeur",
      "Douleur articulaire avec chaleur"
    );
  }

  const limitedOptions = options.slice(0, 8); // Limiter à 8 options
  console.log(`Options générées pour ${symptom}: ${limitedOptions.length} options`);
  return limitedOptions;
}

function generateSymptomResponse(symptom: string, message: string): string {
  const responses: { [key: string]: string } = {
    'mal de tête': "Je vois que vous avez un mal de tête. Pour mieux vous aider, j'aimerais en savoir plus sur les caractéristiques de cette douleur.",
    'fièvre': "Vous mentionnez de la fièvre. C'est un symptôme important qui peut avoir plusieurs causes. Laissez-moi vous poser quelques questions pour mieux comprendre votre situation.",
    'nausées': "Les nausées peuvent être liées à différents problèmes. Je vais vous poser quelques questions pour identifier la cause possible.",
    'douleur thoracique': "Une douleur thoracique nécessite une attention particulière. Pouvez-vous me donner plus de détails sur cette douleur ?",
    'douleur abdominale': "Je vois que vous avez une douleur abdominale. Pour mieux vous aider, j'aimerais en savoir plus sur les caractéristiques de cette douleur.",
    'fatigue': "La fatigue peut être le signe de différents problèmes. Laissez-moi vous poser quelques questions pour mieux comprendre votre situation.",
    'toux': "Une toux peut avoir plusieurs causes. Je vais vous poser quelques questions pour identifier le type de toux et ses caractéristiques.",
    'essoufflement': "L'essoufflement est un symptôme important. Je vais vous poser quelques questions pour évaluer la gravité de la situation.",
    'douleur dos': "Les douleurs de dos sont très courantes. Je vais vous poser quelques questions pour mieux comprendre votre situation.",
    'douleur articulaire': "Les douleurs articulaires peuvent avoir plusieurs causes. Laissez-moi vous poser quelques questions pour mieux vous aider.",
    'vertiges': "Les vertiges peuvent être préoccupants. Je vais vous poser quelques questions pour évaluer votre situation.",
    'diarrhée': "La diarrhée peut avoir plusieurs causes. Je vais vous poser quelques questions pour mieux comprendre votre situation.",
    'constipation': "La constipation peut être inconfortable. Laissez-moi vous poser quelques questions pour mieux vous aider.",
    'douleur gorge': "Un mal de gorge peut avoir plusieurs causes. Je vais vous poser quelques questions pour identifier le problème.",
    'écoulement nasal': "Un écoulement nasal peut être le signe de différents problèmes. Laissez-moi vous poser quelques questions."
  };

  const response = responses[symptom] || "Je comprends que vous ne vous sentez pas bien. Laissez-moi vous poser quelques questions pour mieux vous aider.";
  console.log(`Réponse générée pour ${symptom}: ${response}`);
  return response;
}

function generateRecommendations(symptom: string, medicalInfo: any): string[] {
  const recommendations: string[] = [];

  if (symptom === 'mal de tête') {
    recommendations.push("Buvez de l'eau régulièrement (la déshydratation peut causer des maux de tête)");
    recommendations.push("Reposez-vous dans un endroit calme et sombre");
    recommendations.push("Évitez les écrans et les lumières vives");
    recommendations.push("Si la douleur persiste, vous pouvez prendre du paracétamol selon la posologie");
  }

  if (symptom === 'fièvre') {
    recommendations.push("Buvez beaucoup d'eau pour éviter la déshydratation");
    recommendations.push("Reposez-vous et évitez les efforts physiques");
    recommendations.push("Vous pouvez prendre du paracétamol pour faire baisser la fièvre");
    recommendations.push("Surveillez votre température régulièrement");
  }

  if (symptom === 'nausées') {
    recommendations.push("Buvez de l'eau par petites gorgées");
    recommendations.push("Évitez les aliments gras ou épicés");
    recommendations.push("Le gingembre peut aider à calmer les nausées");
    recommendations.push("Reposez-vous et évitez les mouvements brusques");
  }

  if (symptom === 'fatigue') {
    recommendations.push("Assurez-vous de dormir suffisamment (7-9 heures par nuit)");
    recommendations.push("Buvez de l'eau régulièrement");
    recommendations.push("Mangez des aliments riches en fer et en vitamines");
    recommendations.push("Évitez la caféine en fin de journée");
  }

  if (symptom === 'douleur abdominale') {
    recommendations.push("Évitez les aliments qui peuvent irriter (épicés, gras, acides)");
    recommendations.push("Appliquez une bouillotte chaude sur le ventre");
    recommendations.push("Buvez de l'eau par petites gorgées");
    recommendations.push("Surveillez les signes d'aggravation (fièvre, vomissements)");
  }

  // Ajouter des recommandations basées sur les informations médicales trouvées
  if (medicalInfo && medicalInfo.results && medicalInfo.results.grandmaRemedies) {
    recommendations.push(...medicalInfo.results.grandmaRemedies.slice(0, 2));
  }

  const limitedRecommendations = recommendations.slice(0, 4); // Limiter à 4 recommandations
  console.log(`Recommandations générées pour ${symptom}: ${limitedRecommendations.length} recommandations`);
  return limitedRecommendations;
}

function extractVideos(medicalInfo: any): string[] {
  const videos: string[] = [];

  if (medicalInfo && medicalInfo.results && medicalInfo.results.youtubeVideos) {
    const youtubeVideos = medicalInfo.results.youtubeVideos;
    
    if (youtubeVideos.explanation) {
      videos.push(...youtubeVideos.explanation.slice(0, 2));
    }
    if (youtubeVideos.exercises) {
      videos.push(...youtubeVideos.exercises.slice(0, 2));
    }
    if (youtubeVideos.remedies) {
      videos.push(...youtubeVideos.remedies.slice(0, 1));
    }
  }

  const limitedVideos = videos.slice(0, 3); // Limiter à 3 vidéos
  console.log(`Vidéos extraites: ${limitedVideos.length} vidéos`);
  return limitedVideos;
}

export async function GET() {
  return NextResponse.json({
    message: 'API de chat médical interactif',
    version: '1.0.0',
    features: [
      'Détection automatique des symptômes',
      'Questions de suivi intelligentes',
      'Recommandations personnalisées',
      'Intégration vidéos YouTube',
      'Évaluation de l\'urgence'
    ],
    examples: {
      'Symptôme simple': {
        method: 'POST',
        body: { message: 'J\'ai mal à la tête' }
      },
      'Symptôme complexe': {
        method: 'POST',
        body: { message: 'J\'ai de la fièvre et des nausées depuis hier' }
      }
    }
  });
}
