// BASE DE DONNÉES MÉDICALE UNIVERSELLE
// Source de richesse pour tous les maux de l'humanité - Physiques ET Spirituels

export interface UniversalDoctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  gender: 'male' | 'female';
  avatar: string;
  description: string;
  experience: string;
  personality: string;
  expertise: string[];
  spiritualApproach?: boolean;
  holisticApproach?: boolean;
  emergencySpecialist?: boolean;
}

export interface MedicalCondition {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendations: string[];
  spiritualGuidance?: string[];
  holisticApproach?: string[];
  differentialDiagnosis: string[];
  nextSteps: string[];
  probability: number;
  relatedConditions?: string[];
  preventionTips?: string[];
  emergencyActions?: string[];
}

// MÉDECINS IA UNIVERSELLES - TOUTES SPÉCIALITÉS
export const universalDoctors: UniversalDoctor[] = [
  // MÉDECINE GÉNÉRALE
  {
    id: 'dr-sarah-chen',
    name: 'Dr. Sarah Chen',
    title: 'Médecin Généraliste Universelle',
    specialty: 'Médecine Générale & Diagnostic Global',
    gender: 'female',
    avatar: '👩‍⚕️',
    description: 'Médecin généraliste avec approche holistique et spirituelle',
    experience: '20 ans d\'expérience',
    personality: 'Approche empathique, spirituelle et méthodique',
    expertise: ['Diagnostic différentiel', 'Médecine préventive', 'Santé familiale', 'Médecine spirituelle'],
    spiritualApproach: true,
    holisticApproach: true
  },
  
  // CARDIOLOGIE
  {
    id: 'dr-marcus-thompson',
    name: 'Dr. Marcus Thompson',
    title: 'Cardiologue & Médecin Interniste',
    specialty: 'Cardiologie & Médecine Interne Complexe',
    gender: 'male',
    avatar: '👨‍⚕️',
    description: 'Expert en maladies cardiovasculaires et cas complexes',
    experience: '25 ans d\'expérience',
    personality: 'Approche analytique, directe et rassurante',
    expertise: ['Cardiologie', 'Hypertension', 'Arythmies', 'Chirurgie cardiaque', 'Réadaptation cardiaque'],
    emergencySpecialist: true
  },

  // NEUROLOGIE
  {
    id: 'dr-elena-rodriguez',
    name: 'Dr. Elena Rodriguez',
    title: 'Neurologue & Psychiatre',
    specialty: 'Neurologie & Santé Mentale Holistique',
    gender: 'female',
    avatar: '👩‍⚕️',
    description: 'Spécialiste du cerveau, de l\'esprit et de la conscience',
    experience: '18 ans d\'expérience',
    personality: 'Approche bienveillante, holistique et spirituelle',
    expertise: ['Neurologie', 'Psychiatrie', 'Médecine de l\'esprit', 'Conscience', 'Méditation thérapeutique'],
    spiritualApproach: true,
    holisticApproach: true
  },

  // URGENCES
  {
    id: 'dr-james-wilson',
    name: 'Dr. James Wilson',
    title: 'Médecin Urgentiste & Traumatologue',
    specialty: 'Urgences & Traumatologie',
    gender: 'male',
    avatar: '👨‍⚕️',
    description: 'Expert en urgences médicales et traumatismes',
    experience: '22 ans d\'expérience',
    personality: 'Approche efficace, rassurante et déterminée',
    expertise: ['Urgences', 'Traumatologie', 'Réanimation', 'Triage médical', 'Médecine de catastrophe'],
    emergencySpecialist: true
  },

  // PÉDIATRIE
  {
    id: 'dr-marie-dubois',
    name: 'Dr. Marie Dubois',
    title: 'Pédiatre & Médecin de Famille',
    specialty: 'Pédiatrie & Santé de l\'Enfant',
    gender: 'female',
    avatar: '👩‍⚕️',
    description: 'Spécialiste de la santé des enfants et adolescents',
    experience: '15 ans d\'expérience',
    personality: 'Approche douce, patiente et rassurante',
    expertise: ['Pédiatrie', 'Santé de l\'enfant', 'Développement', 'Vaccination', 'Médecine familiale'],
    holisticApproach: true
  },

  // GYNÉCOLOGIE
  {
    id: 'dr-sophie-martin',
    name: 'Dr. Sophie Martin',
    title: 'Gynécologue & Obstétricienne',
    specialty: 'Santé de la Femme & Reproduction',
    gender: 'female',
    avatar: '👩‍⚕️',
    description: 'Spécialiste de la santé féminine et de la reproduction',
    experience: '17 ans d\'expérience',
    personality: 'Approche bienveillante, confidentielle et rassurante',
    expertise: ['Gynécologie', 'Obstétrique', 'Fécondité', 'Ménopause', 'Santé sexuelle'],
    holisticApproach: true
  },

  // ONCOLOGIE
  {
    id: 'dr-pierre-durand',
    name: 'Dr. Pierre Durand',
    title: 'Oncologue & Médecin Intégratif',
    specialty: 'Cancer & Médecine Intégrative',
    gender: 'male',
    avatar: '👨‍⚕️',
    description: 'Spécialiste du cancer avec approche intégrative et spirituelle',
    experience: '20 ans d\'expérience',
    personality: 'Approche compassionnelle, intégrative et spirituelle',
    expertise: ['Oncologie', 'Chimiothérapie', 'Radiothérapie', 'Médecine intégrative', 'Support psychologique'],
    spiritualApproach: true,
    holisticApproach: true
  },

  // PSYCHIATRIE
  {
    id: 'dr-anna-kowalski',
    name: 'Dr. Anna Kowalski',
    title: 'Psychiatre & Thérapeute Spirituelle',
    specialty: 'Psychiatrie & Santé Mentale Spirituelle',
    gender: 'female',
    avatar: '👩‍⚕️',
    description: 'Psychiatre avec approche spirituelle et holistique',
    experience: '16 ans d\'expérience',
    personality: 'Approche spirituelle, holistique et thérapeutique',
    expertise: ['Psychiatrie', 'Thérapie spirituelle', 'Méditation', 'Conscience', 'Guérison de l\'âme'],
    spiritualApproach: true,
    holisticApproach: true
  },

  // MÉDECINE ALTERNATIVE
  {
    id: 'dr-raj-patel',
    name: 'Dr. Raj Patel',
    title: 'Médecin Intégratif & Thérapeute Holistique',
    specialty: 'Médecine Intégrative & Thérapies Alternatives',
    gender: 'male',
    avatar: '👨‍⚕️',
    description: 'Médecin intégratif combinant médecine occidentale et orientale',
    experience: '19 ans d\'expérience',
    personality: 'Approche holistique, spirituelle et intégrative',
    expertise: ['Médecine intégrative', 'Acupuncture', 'Ayurveda', 'Médecine chinoise', 'Thérapies énergétiques'],
    spiritualApproach: true,
    holisticApproach: true
  },

  // MÉDECINE D\'URGENCE SPIRITUELLE
  {
    id: 'dr-gabriel-angel',
    name: 'Dr. Gabriel Angel',
    title: 'Médecin Spirituel & Guérisseur',
    specialty: 'Médecine Spirituelle & Guérison de l\'Âme',
    gender: 'male',
    avatar: '👨‍⚕️',
    description: 'Médecin spirituel spécialisé dans la guérison de l\'âme et du corps',
    experience: '30 ans d\'expérience',
    personality: 'Approche spirituelle, compassionnelle et guérisseuse',
    expertise: ['Médecine spirituelle', 'Guérison énergétique', 'Thérapie de l\'âme', 'Méditation thérapeutique', 'Conscience universelle'],
    spiritualApproach: true,
    holisticApproach: true
  }
];

// CATÉGORIES MÉDICALES UNIVERSELLES
export const medicalCategories = [
  // SYSTÈMES PHYSIQUES
  'Système cardiovasculaire',
  'Système respiratoire', 
  'Système digestif',
  'Système neurologique',
  'Système musculo-squelettique',
  'Système dermatologique',
  'Système génito-urinaire',
  'Système endocrinien',
  'Système immunitaire',
  'Système lymphatique',
  'Système reproducteur',
  'Système sensoriel',
  
  // SPÉCIALITÉS MÉDICALES
  'Cardiologie',
  'Neurologie',
  'Psychiatrie',
  'Pédiatrie',
  'Gynécologie',
  'Oncologie',
  'Dermatologie',
  'Ophtalmologie',
  'ORL',
  'Urologie',
  'Gastro-entérologie',
  'Pneumologie',
  'Rhumatologie',
  'Endocrinologie',
  'Hématologie',
  'Néphrologie',
  'Gériatrie',
  'Médecine d\'urgence',
  'Anesthésiologie',
  'Chirurgie',
  
  // MÉDECINE HOLISTIQUE
  'Médecine intégrative',
  'Médecine alternative',
  'Médecine traditionnelle',
  'Médecine énergétique',
  'Médecine quantique',
  'Médecine vibratoire',
  
  // SANTÉ MENTALE & SPIRITUELLE
  'Santé mentale',
  'Santé spirituelle',
  'Conscience',
  'Méditation thérapeutique',
  'Thérapie de l\'âme',
  'Guérison spirituelle',
  'Développement personnel',
  'Bien-être holistique',
  
  // URGENCES & CRISES
  'Urgences médicales',
  'Crises psychologiques',
  'Crises spirituelles',
  'Traumatismes',
  'Accidents',
  'Catastrophes'
];

// SYMPTÔMES UNIVERSAUX - PHYSIQUES ET SPIRITUELS
export const universalSymptoms = [
  // SYMPTÔMES PHYSIQUES
  'Douleur thoracique', 'Essoufflement', 'Maux de tête', 'Nausées', 'Vomissements',
  'Fièvre', 'Fatigue', 'Vertiges', 'Palpitations', 'Douleur abdominale',
  'Toux', 'Congestion nasale', 'Douleur articulaire', 'Raideur musculaire',
  'Éruption cutanée', 'Démangeaisons', 'Sueurs nocturnes', 'Perte d\'appétit',
  'Insomnie', 'Constipation', 'Diarrhée', 'Ballonnements', 'Reflux acide',
  'Douleur de gorge', 'Raideur de la nuque', 'Douleur au dos', 'Douleur au cou',
  'Engourdissement', 'Picotements', 'Tremblements', 'Convulsions', 'Perte de conscience',
  'Vision trouble', 'Audition diminuée', 'Saignement', 'Douleur urinaire',
  'Perte de poids', 'Prise de poids', 'Soif excessive', 'Mictions fréquentes',
  'Douleur oculaire', 'Sensibilité à la lumière', 'Bourdonnements d\'oreilles',
  'Douleur dentaire', 'Saignement des gencives', 'Douleur mammaire',
  'Douleur testiculaire', 'Douleur pelvienne', 'Douleur lombaire',
  
  // SYMPTÔMES MENTAUX & ÉMOTIONNELS
  'Anxiété', 'Dépression', 'Stress', 'Panique', 'Angoisse',
  'Tristesse', 'Colère', 'Irritabilité', 'Apathie', 'Confusion',
  'Perte de mémoire', 'Difficultés de concentration', 'Perte d\'intérêt',
  'Sentiment de vide', 'Culpabilité', 'Honte', 'Peur', 'Phobies',
  'Obsessions', 'Compulsions', 'Hallucinations', 'Délires',
  'Paranoïa', 'Maniaque', 'Bipolaire', 'Troubles de l\'humeur',
  
  // SYMPTÔMES SPIRITUELS
  'Crise existentielle', 'Perte de sens', 'Désespoir spirituel',
  'Sentiment de déconnexion', 'Perte de foi', 'Crise de conscience',
  'Sentiment d\'abandon', 'Perte d\'identité', 'Confusion spirituelle',
  'Sentiment de vide spirituel', 'Perte de direction', 'Crise de valeurs',
  'Sentiment d\'inutilité', 'Perte de connexion divine', 'Désespoir métaphysique',
  'Crise de l\'âme', 'Perte de paix intérieure', 'Troubles de l\'aura',
  'Déséquilibre énergétique', 'Blocages spirituels', 'Perte de guidance'
];

// CONDITIONS MÉDICALES UNIVERSELLES
export const universalConditions: MedicalCondition[] = [
  // CONDITIONS PHYSIQUES MAJEURES
  {
    id: 'hypertension',
    name: 'Hypertension artérielle',
    category: 'Cardiologie',
    subcategory: 'Maladies cardiovasculaires',
    symptoms: ['Maux de tête', 'Vertiges', 'Palpitations', 'Essoufflement', 'Fatigue', 'Vision trouble'],
    severity: 'severe',
    urgency: 'high',
    description: 'Pression artérielle élevée de manière chronique, facteur de risque cardiovasculaire majeur.',
    recommendations: [
      'Mesure régulière de la tension',
      'Modification du mode de vie',
      'Médicaments antihypertenseurs',
      'Consultation cardiologique'
    ],
    spiritualGuidance: [
      'Méditation pour réduire le stress',
      'Pratiques de respiration consciente',
      'Connexion avec la nature pour l\'apaisement'
    ],
    holisticApproach: [
      'Régime méditerranéen',
      'Exercice physique régulier',
      'Techniques de relaxation',
      'Gestion du stress'
    ],
    differentialDiagnosis: ['Stress', 'Problème rénal', 'Trouble endocrinien', 'Médicaments'],
    nextSteps: [
      'Surveillance tensionnelle',
      'Consultation médicale urgente',
      'Examens complémentaires'
    ],
    probability: 60,
    relatedConditions: ['Diabète', 'Maladie rénale', 'Accident vasculaire cérébral'],
    preventionTips: [
      'Régime pauvre en sel',
      'Exercice régulier',
      'Gestion du stress',
      'Éviter le tabac et l\'alcool'
    ],
    emergencyActions: [
      'Appeler le 15 si tension > 180/110',
      'Repos immédiat',
      'Surveillance des symptômes'
    ]
  },

  // CONDITIONS MENTALES
  {
    id: 'depression',
    name: 'Dépression majeure',
    category: 'Psychiatrie',
    subcategory: 'Troubles de l\'humeur',
    symptoms: ['Tristesse persistante', 'Perte d\'intérêt', 'Fatigue', 'Insomnie', 'Perte d\'appétit', 'Difficultés de concentration'],
    severity: 'severe',
    urgency: 'high',
    description: 'Trouble de l\'humeur caractérisé par une tristesse persistante et une perte d\'intérêt pour les activités.',
    recommendations: [
      'Consultation psychologique urgente',
      'Thérapie cognitivo-comportementale',
      'Médicaments antidépresseurs si nécessaire',
      'Support social et familial'
    ],
    spiritualGuidance: [
      'Méditation de pleine conscience',
      'Pratiques de gratitude',
      'Connexion avec sa spiritualité',
      'Recherche de sens et de but'
    ],
    holisticApproach: [
      'Thérapie par la nature',
      'Exercice physique régulier',
      'Régime équilibré',
      'Techniques de relaxation'
    ],
    differentialDiagnosis: ['Trouble bipolaire', 'Dépression saisonnière', 'Trouble anxieux', 'Problème médical'],
    nextSteps: [
      'Consultation psychologique immédiate',
      'Évaluation psychiatrique',
      'Plan de traitement personnalisé'
    ],
    probability: 75,
    relatedConditions: ['Anxiété', 'Troubles du sommeil', 'Troubles alimentaires'],
    preventionTips: [
      'Maintenir des relations sociales',
      'Pratiquer la gratitude',
      'Exercice régulier',
      'Techniques de gestion du stress'
    ],
    emergencyActions: [
      'Appeler le 3114 (SOS Amitié)',
      'Contacter un proche',
      'Ne pas rester seul'
    ]
  },

  // CONDITIONS SPIRITUELLES
  {
    id: 'crise-spirituelle',
    name: 'Crise spirituelle existentielle',
    category: 'Santé spirituelle',
    subcategory: 'Crises de conscience',
    symptoms: ['Crise existentielle', 'Perte de sens', 'Désespoir spirituel', 'Sentiment de déconnexion', 'Perte de foi', 'Confusion spirituelle'],
    severity: 'severe',
    urgency: 'high',
    description: 'Crise profonde de l\'âme caractérisée par une perte de sens et de connexion spirituelle.',
    recommendations: [
      'Accompagnement spirituel',
      'Méditation et contemplation',
      'Connexion avec la nature',
      'Recherche de guidance spirituelle'
    ],
    spiritualGuidance: [
      'Méditation de pleine conscience',
      'Pratiques contemplatives',
      'Connexion avec l\'univers',
      'Recherche de sa vérité intérieure',
      'Acceptation et lâcher-prise'
    ],
    holisticApproach: [
      'Thérapie par la nature',
      'Art-thérapie',
      'Musique thérapeutique',
      'Pratiques corporelles (yoga, tai-chi)'
    ],
    differentialDiagnosis: ['Dépression', 'Crise de la quarantaine', 'Burn-out', 'Trouble anxieux'],
    nextSteps: [
      'Accompagnement spirituel',
      'Méditation quotidienne',
      'Connexion avec sa communauté spirituelle'
    ],
    probability: 80,
    relatedConditions: ['Dépression', 'Anxiété', 'Burn-out'],
    preventionTips: [
      'Pratique spirituelle régulière',
      'Connexion avec sa communauté',
      'Méditation quotidienne',
      'Recherche de sens'
    ],
    emergencyActions: [
      'Appeler un guide spirituel',
      'Pratiquer la méditation d\'urgence',
      'Se connecter à la nature'
    ]
  }
];

// FONCTION DE RECHERCHE MÉDICALE UNIVERSELLE
export function searchUniversalMedical(query: string, category?: string): {
  doctors: UniversalDoctor[];
  conditions: MedicalCondition[];
  symptoms: string[];
} {
  const lowerQuery = query.toLowerCase();
  
  // Recherche dans les médecins
  const matchingDoctors = universalDoctors.filter(doctor => 
    doctor.name.toLowerCase().includes(lowerQuery) ||
    doctor.specialty.toLowerCase().includes(lowerQuery) ||
    doctor.expertise.some(exp => exp.toLowerCase().includes(lowerQuery)) ||
    doctor.description.toLowerCase().includes(lowerQuery)
  );

  // Recherche dans les conditions
  const matchingConditions = universalConditions.filter(condition =>
    condition.name.toLowerCase().includes(lowerQuery) ||
    condition.category.toLowerCase().includes(lowerQuery) ||
    condition.subcategory.toLowerCase().includes(lowerQuery) ||
    condition.description.toLowerCase().includes(lowerQuery) ||
    condition.symptoms.some(symptom => symptom.toLowerCase().includes(lowerQuery))
  );

  // Recherche dans les symptômes
  const matchingSymptoms = universalSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(lowerQuery)
  );

  return {
    doctors: matchingDoctors,
    conditions: matchingConditions,
    symptoms: matchingSymptoms
  };
}

// FONCTION D'ANALYSE SPIRITUELLE
export function analyzeSpiritualAspects(symptoms: string[]): {
  spiritualGuidance: string[];
  holisticApproach: string[];
  emergencySpiritualActions: string[];
} {
  const spiritualSymptoms = symptoms.filter(symptom => 
    universalConditions.some(condition => 
      condition.spiritualGuidance && 
      condition.symptoms.some(s => s.toLowerCase().includes(symptom.toLowerCase()))
    )
  );

  return {
    spiritualGuidance: [
      'Méditation de pleine conscience',
      'Pratiques de respiration consciente',
      'Connexion avec la nature',
      'Recherche de sens et de but',
      'Acceptation et lâcher-prise'
    ],
    holisticApproach: [
      'Thérapie par la nature',
      'Exercice physique régulier',
      'Régime équilibré',
      'Techniques de relaxation',
      'Art-thérapie'
    ],
    emergencySpiritualActions: [
      'Appeler un guide spirituel',
      'Pratiquer la méditation d\'urgence',
      'Se connecter à la nature',
      'Réciter des mantras apaisants'
    ]
  };
}
