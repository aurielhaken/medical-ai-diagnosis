import { NextRequest, NextResponse } from 'next/server';

interface ClarificationQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'text' | 'scale' | 'yes_no';
  options?: string[];
  importance: 'critical' | 'high' | 'medium' | 'low';
  category: string;
}

interface ClarificationResponse {
  needsClarification: boolean;
  questions: ClarificationQuestion[];
  reasoning: string;
}

// Questions de clarification basées sur les symptômes
const getClarificationQuestions = (symptoms: string[]): ClarificationQuestion[] => {
  const questions: ClarificationQuestion[] = [];
  const symptomText = symptoms.join(' ').toLowerCase();

  // Questions pour douleurs
  if (symptomText.includes('douleur') || symptomText.includes('mal')) {
    questions.push({
      id: 'pain_location',
      question: 'Pouvez-vous préciser la localisation exacte de la douleur ?',
      type: 'text',
      importance: 'high',
      category: 'douleur'
    });
    
    questions.push({
      id: 'pain_intensity',
      question: 'Sur une échelle de 1 à 10, quelle est l\'intensité de la douleur ?',
      type: 'scale',
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      importance: 'high',
      category: 'douleur'
    });

    questions.push({
      id: 'pain_duration',
      question: 'Depuis combien de temps ressentez-vous cette douleur ?',
      type: 'multiple_choice',
      options: [
        'Quelques heures',
        '1-2 jours',
        '3-7 jours',
        '1-2 semaines',
        'Plus de 2 semaines',
        'Plusieurs mois'
      ],
      importance: 'high',
      category: 'douleur'
    });

    questions.push({
      id: 'pain_triggers',
      question: 'Qu\'est-ce qui aggrave ou améliore la douleur ?',
      type: 'text',
      importance: 'medium',
      category: 'douleur'
    });
  }

  // Questions pour fièvre
  if (symptomText.includes('fièvre') || symptomText.includes('température')) {
    questions.push({
      id: 'fever_temperature',
      question: 'Avez-vous pris votre température ? Si oui, quelle était-elle ?',
      type: 'text',
      importance: 'critical',
      category: 'fièvre'
    });

    questions.push({
      id: 'fever_duration',
      question: 'Depuis combien de temps avez-vous de la fièvre ?',
      type: 'multiple_choice',
      options: [
        'Quelques heures',
        '1-2 jours',
        '3-7 jours',
        'Plus d\'une semaine'
      ],
      importance: 'high',
      category: 'fièvre'
    });

    questions.push({
      id: 'fever_symptoms',
      question: 'Avez-vous d\'autres symptômes avec la fièvre ?',
      type: 'text',
      importance: 'high',
      category: 'fièvre'
    });
  }

  // Questions pour problèmes respiratoires
  if (symptomText.includes('respiration') || symptomText.includes('essoufflement') || symptomText.includes('toux')) {
    questions.push({
      id: 'breathing_difficulty',
      question: 'Avez-vous des difficultés à respirer au repos ou seulement à l\'effort ?',
      type: 'multiple_choice',
      options: [
        'Au repos',
        'Seulement à l\'effort',
        'Les deux',
        'Pas de difficulté respiratoire'
      ],
      importance: 'critical',
      category: 'respiration'
    });

    questions.push({
      id: 'cough_type',
      question: 'Quel type de toux avez-vous ?',
      type: 'multiple_choice',
      options: [
        'Toux sèche',
        'Toux grasse (avec crachats)',
        'Toux avec sang',
        'Pas de toux'
      ],
      importance: 'high',
      category: 'respiration'
    });
  }

  // Questions pour problèmes digestifs
  if (symptomText.includes('ventre') || symptomText.includes('estomac') || symptomText.includes('nausée') || symptomText.includes('vomissement')) {
    questions.push({
      id: 'digestive_timing',
      question: 'Quand ressentez-vous ces symptômes digestifs ?',
      type: 'multiple_choice',
      options: [
        'Après avoir mangé',
        'Le matin à jeun',
        'En permanence',
        'De façon intermittente'
      ],
      importance: 'medium',
      category: 'digestif'
    });

    questions.push({
      id: 'digestive_food',
      question: 'Y a-t-il des aliments qui déclenchent ou aggravent ces symptômes ?',
      type: 'text',
      importance: 'medium',
      category: 'digestif'
    });
  }

  // Questions générales importantes
  questions.push({
    id: 'age_group',
    question: 'Dans quelle tranche d\'âge vous situez-vous ?',
    type: 'multiple_choice',
    options: [
      '0-12 ans',
      '13-17 ans',
      '18-30 ans',
      '31-50 ans',
      '51-65 ans',
      'Plus de 65 ans'
    ],
    importance: 'high',
    category: 'général'
  });

  questions.push({
    id: 'medical_history',
    question: 'Avez-vous des antécédents médicaux ou prenez-vous des médicaments ?',
    type: 'text',
    importance: 'high',
    category: 'général'
  });

  questions.push({
    id: 'recent_events',
    question: 'Y a-t-il eu un événement récent (accident, blessure, changement) qui pourrait expliquer ces symptômes ?',
    type: 'text',
    importance: 'medium',
    category: 'général'
  });

  questions.push({
    id: 'urgency_feeling',
    question: 'À quel point vous sentez-vous inquiet(e) par ces symptômes ?',
    type: 'multiple_choice',
    options: [
      'Très inquiet(e), je pense que c\'est grave',
      'Modérément inquiet(e)',
      'Légèrement inquiet(e)',
      'Pas vraiment inquiet(e)'
    ],
    importance: 'medium',
    category: 'général'
  });

  return questions.slice(0, 6); // Limiter à 6 questions max
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symptoms } = body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: 'Symptômes requis' },
        { status: 400 }
      );
    }

    // Générer les questions de clarification
    const questions = getClarificationQuestions(symptoms);
    
    // Déterminer si des clarifications sont nécessaires
    const needsClarification = questions.length > 0;
    
    const reasoning = needsClarification 
      ? `Pour un diagnostic plus précis, j'ai besoin de clarifications sur vos symptômes : "${symptoms.join(', ')}". Ces questions m'aideront à mieux comprendre votre situation.`
      : 'Les symptômes fournis sont suffisamment détaillés pour un diagnostic préliminaire.';

    const response: ClarificationResponse = {
      needsClarification,
      questions,
      reasoning
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erreur dans l\'API de clarification:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API de clarification médicale',
    version: '1.0.0',
    purpose: 'Poser des questions de clarification pour améliorer la précision du diagnostic'
  });
}
