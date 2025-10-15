// Système de médecine universelle intégrant toutes les approches thérapeutiques du monde

export interface UniversalTreatment {
  id: string;
  name: string;
  category: 'conventional' | 'soft' | 'traditional' | 'integrative';
  subcategory: string;
  description: string;
  origin: string;
  approach: 'scientific' | 'holistic' | 'energetic' | 'spiritual' | 'integrated';
  target: 'body' | 'mind' | 'energy' | 'spirit' | 'integrated';
  evidence: 'high' | 'moderate' | 'traditional' | 'anecdotal';
  contraindications: string[];
  sideEffects: string[];
  culturalContext?: string;
  preparation?: string;
  dosage?: string;
  duration?: string;
  frequency?: string;
}

export interface UniversalMedicineCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  approaches: UniversalTreatment[];
}

export const universalMedicineCategories: UniversalMedicineCategory[] = [
  {
    id: 'conventional',
    name: 'Médecine Conventionnelle',
    description: 'Basée sur la science, les preuves cliniques et la pharmacologie moderne',
    icon: '🔬',
    color: 'blue',
    approaches: [
      {
        id: 'general-medicine',
        name: 'Médecine Générale',
        category: 'conventional',
        subcategory: 'Diagnostic et traitement général',
        description: 'Premier niveau de soins, diagnostic différentiel, prévention',
        origin: 'Occident',
        approach: 'scientific',
        target: 'body',
        evidence: 'high',
        contraindications: ['Allergies spécifiques'],
        sideEffects: ['Selon médicament'],
        dosage: 'Selon prescription',
        duration: 'Selon condition',
        frequency: 'Selon protocole médical'
      },
      {
        id: 'cardiology',
        name: 'Cardiologie',
        category: 'conventional',
        subcategory: 'Spécialité cardiovasculaire',
        description: 'Diagnostic et traitement des maladies du cœur et des vaisseaux',
        origin: 'Occident',
        approach: 'scientific',
        target: 'body',
        evidence: 'high',
        contraindications: ['Hypersensibilité aux médicaments cardiovasculaires'],
        sideEffects: ['Selon traitement'],
        dosage: 'Selon prescription spécialisée',
        duration: 'Souvent à vie pour certaines conditions',
        frequency: 'Selon protocole cardiologique'
      },
      {
        id: 'neurology',
        name: 'Neurologie',
        category: 'conventional',
        subcategory: 'Système nerveux',
        description: 'Diagnostic et traitement des troubles neurologiques',
        origin: 'Occident',
        approach: 'scientific',
        target: 'body',
        evidence: 'high',
        contraindications: ['Selon condition neurologique'],
        sideEffects: ['Selon traitement'],
        dosage: 'Selon prescription neurologique',
        duration: 'Selon condition',
        frequency: 'Selon protocole'
      }
    ]
  },
  
  {
    id: 'soft-medicine',
    name: 'Médecines Douces',
    description: 'Approches complémentaires visant à accompagner et prévenir',
    icon: '🌿',
    color: 'green',
    approaches: [
      {
        id: 'phytotherapy',
        name: 'Phytothérapie',
        category: 'soft',
        subcategory: 'Plantes médicinales',
        description: 'Utilisation thérapeutique des plantes et de leurs extraits',
        origin: 'Universel',
        approach: 'holistic',
        target: 'integrated',
        evidence: 'moderate',
        contraindications: ['Allergies aux plantes', 'Grossesse (certaines plantes)'],
        sideEffects: ['Réactions allergiques possibles'],
        culturalContext: 'Utilisée dans toutes les cultures traditionnelles',
        preparation: 'Infusions, décoctions, teintures, gélules',
        dosage: 'Selon la plante et la condition',
        duration: 'Cures de 3-6 semaines',
        frequency: '2-3 fois par jour'
      },
      {
        id: 'aromatherapy',
        name: 'Aromathérapie',
        category: 'soft',
        subcategory: 'Huiles essentielles',
        description: 'Utilisation thérapeutique des huiles essentielles extraites des plantes',
        origin: 'France, Moyen-Orient',
        approach: 'holistic',
        target: 'integrated',
        evidence: 'moderate',
        contraindications: ['Grossesse', 'Épilepsie', 'Hypertension'],
        sideEffects: ['Irritations cutanées', 'Réactions allergiques'],
        culturalContext: 'Tradition millénaire en Égypte, Grèce, Inde',
        preparation: 'Diffusion, application cutanée, inhalation',
        dosage: '2-5 gouttes selon usage',
        duration: 'Cures de 1-3 semaines',
        frequency: '1-3 fois par jour'
      },
      {
        id: 'naturopathy',
        name: 'Naturopathie',
        category: 'soft',
        subcategory: 'Médecine naturelle',
        description: 'Approche globale utilisant des moyens naturels pour stimuler les capacités d\'auto-guérison',
        origin: 'Europe, Amérique du Nord',
        approach: 'holistic',
        target: 'integrated',
        evidence: 'moderate',
        contraindications: ['Urgences médicales'],
        sideEffects: ['Rare, généralement bien toléré'],
        culturalContext: 'Philosophie de la nature comme guérisseur',
        preparation: 'Alimentation, plantes, eau, air, exercice',
        dosage: 'Selon protocole individualisé',
        duration: 'Programmes de 3-6 mois',
        frequency: 'Quotidien'
      },
      {
        id: 'osteopathy',
        name: 'Ostéopathie',
        category: 'soft',
        subcategory: 'Thérapie manuelle',
        description: 'Thérapie manuelle visant à rétablir l\'équilibre structurel du corps',
        origin: 'États-Unis',
        approach: 'holistic',
        target: 'body',
        evidence: 'moderate',
        contraindications: ['Fractures récentes', 'Ostéoporose sévère'],
        sideEffects: ['Douleurs temporaires', 'Fatigue'],
        culturalContext: 'Fondée sur l\'interdépendance structure-fonction',
        preparation: 'Examen physique complet',
        dosage: 'Sessions de 45-60 minutes',
        duration: '3-6 sessions',
        frequency: '1-2 fois par semaine'
      },
      {
        id: 'meditation-therapy',
        name: 'Méditation Thérapeutique',
        category: 'soft',
        subcategory: 'Mindfulness',
        description: 'Pratiques de pleine conscience pour réduire le stress et améliorer la santé mentale',
        origin: 'Bouddhisme, traditions contemplatives',
        approach: 'holistic',
        target: 'mind',
        evidence: 'moderate',
        contraindications: ['Psychoses actives'],
        sideEffects: ['Rare: anxiété temporaire'],
        culturalContext: 'Tradition millénaire en Asie',
        preparation: 'Position confortable, environnement calme',
        dosage: '10-30 minutes',
        duration: 'Pratique continue',
        frequency: 'Quotidien'
      }
    ]
  },

  {
    id: 'traditional-medicine',
    name: 'Médecines Traditionnelles',
    description: 'Systèmes médicaux millénaires basés sur des visions énergétiques du corps',
    icon: '🌀',
    color: 'purple',
    approaches: [
      {
        id: 'traditional-chinese-medicine',
        name: 'Médecine Traditionnelle Chinoise',
        category: 'traditional',
        subcategory: 'TCM',
        description: 'Système médical basé sur l\'équilibre du Qi et des méridiens énergétiques',
        origin: 'Chine',
        approach: 'energetic',
        target: 'integrated',
        evidence: 'traditional',
        contraindications: ['Grossesse (certains points)', 'Troubles de coagulation'],
        sideEffects: ['Hématomes mineurs', 'Fatigue temporaire'],
        culturalContext: 'Philosophie taoïste, équilibre Yin-Yang',
        preparation: 'Diagnostic par pouls et langue',
        dosage: 'Sessions de 30-60 minutes',
        duration: 'Séries de 6-12 sessions',
        frequency: '1-2 fois par semaine'
      },
      {
        id: 'ayurveda',
        name: 'Ayurveda',
        category: 'traditional',
        subcategory: 'Médecine indienne',
        description: 'Système médical indien basé sur l\'équilibre des doshas (Vata, Pitta, Kapha)',
        origin: 'Inde',
        approach: 'holistic',
        target: 'integrated',
        evidence: 'traditional',
        contraindications: ['Selon constitution doshique'],
        sideEffects: ['Réactions de purification'],
        culturalContext: 'Philosophie védique, connexion corps-esprit-univers',
        preparation: 'Diagnostic constitutionnel (Prakriti)',
        dosage: 'Selon constitution et condition',
        duration: 'Programmes de 3-12 mois',
        frequency: 'Selon protocole ayurvédique'
      },
      {
        id: 'arabic-medicine',
        name: 'Médecine Arabe Traditionnelle',
        category: 'traditional',
        subcategory: 'Médecine prophétique',
        description: 'Système médical basé sur les enseignements prophétiques et les plantes du désert',
        origin: 'Monde arabe',
        approach: 'holistic',
        target: 'integrated',
        evidence: 'traditional',
        contraindications: ['Selon condition et constitution'],
        sideEffects: ['Réactions de détoxification'],
        culturalContext: 'Traditions prophétiques, plantes du désert',
        preparation: 'Diagnostic par humeurs et tempéraments',
        dosage: 'Selon condition et constitution',
        duration: 'Cures saisonnières',
        frequency: 'Selon protocole traditionnel'
      },
      {
        id: 'african-medicine',
        name: 'Médecine Africaine Traditionnelle',
        category: 'traditional',
        subcategory: 'Médecine ancestrale',
        description: 'Système médical intégrant plantes, rituels et connexion avec les ancêtres',
        origin: 'Afrique',
        approach: 'spiritual',
        target: 'integrated',
        evidence: 'traditional',
        contraindications: ['Selon traditions locales'],
        sideEffects: ['Réactions spirituelles'],
        culturalContext: 'Connexion avec les ancêtres, plantes sacrées',
        preparation: 'Consultation avec guérisseur traditionnel',
        dosage: 'Selon traditions et rituels',
        duration: 'Selon condition spirituelle',
        frequency: 'Selon calendrier traditionnel'
      },
      {
        id: 'tibetan-medicine',
        name: 'Médecine Tibétaine',
        category: 'traditional',
        subcategory: 'Médecine himalayenne',
        description: 'Système médical mélangeant ayurvéda et bouddhisme tibétain',
        origin: 'Tibet',
        approach: 'holistic',
        target: 'integrated',
        evidence: 'traditional',
        contraindications: ['Selon constitution tibétaine'],
        sideEffects: ['Réactions de purification'],
        culturalContext: 'Bouddhisme tibétain, montagnes sacrées',
        preparation: 'Diagnostic par pouls et urine',
        dosage: 'Selon constitution et saison',
        duration: 'Programmes saisonniers',
        frequency: 'Selon protocole tibétain'
      }
    ]
  },

  {
    id: 'integrative-medicine',
    name: 'Médecine Intégrative',
    description: 'Approche moderne combinant science et médecines traditionnelles',
    icon: '⚕️',
    color: 'indigo',
    approaches: [
      {
        id: 'functional-medicine',
        name: 'Médecine Fonctionnelle',
        category: 'integrative',
        subcategory: 'Médecine des causes',
        description: 'Approche qui recherche les causes profondes des déséquilibres',
        origin: 'États-Unis',
        approach: 'integrated',
        target: 'integrated',
        evidence: 'moderate',
        contraindications: ['Selon condition spécifique'],
        sideEffects: ['Réactions de détoxification'],
        culturalContext: 'Combinaison science moderne et approche holistique',
        preparation: 'Tests fonctionnels complets',
        dosage: 'Protocoles individualisés',
        duration: 'Programmes de 3-12 mois',
        frequency: 'Suivi régulier'
      },
      {
        id: 'quantum-medicine',
        name: 'Médecine Quantique',
        category: 'integrative',
        subcategory: 'Médecine énergétique',
        description: 'Approche basée sur les principes de la physique quantique appliqués à la santé',
        origin: 'Occident moderne',
        approach: 'energetic',
        target: 'integrated',
        evidence: 'anecdotal',
        contraindications: ['Grossesse', 'Pacemaker'],
        sideEffects: ['Réactions énergétiques'],
        culturalContext: 'Physique quantique, conscience et matière',
        preparation: 'Évaluation énergétique',
        dosage: 'Sessions énergétiques',
        duration: 'Programmes de 1-6 mois',
        frequency: 'Selon protocole énergétique'
      },
      {
        id: 'mind-body-medicine',
        name: 'Médecine Corps-Esprit',
        category: 'integrative',
        subcategory: 'Psychoneuroimmunologie',
        description: 'Approche intégrant la connexion entre esprit, corps et système immunitaire',
        origin: 'Occident moderne',
        approach: 'holistic',
        target: 'integrated',
        evidence: 'moderate',
        contraindications: ['Selon condition psychologique'],
        sideEffects: ['Réactions émotionnelles'],
        culturalContext: 'Science moderne et traditions contemplatives',
        preparation: 'Évaluation psychosomatique',
        dosage: 'Programmes individualisés',
        duration: '3-12 mois',
        frequency: 'Sessions hebdomadaires'
      }
    ]
  }
];

export interface HolisticAssessment {
  body: {
    physical: string[];
    energetic: string[];
  };
  mind: {
    emotional: string[];
    mental: string[];
  };
  spirit: {
    purpose: string[];
    connection: string[];
  };
}

export function getUniversalTreatmentsForSymptom(symptom: string): UniversalTreatment[] {
  const allTreatments: UniversalTreatment[] = [];
  
  universalMedicineCategories.forEach(category => {
    category.approaches.forEach(treatment => {
      allTreatments.push(treatment);
    });
  });
  
  // Correspondances symptômes -> traitements
  const symptomMappings: Record<string, string[]> = {
    'Douleur thoracique': ['general-medicine', 'cardiology', 'acupuncture', 'osteopathy', 'traditional-chinese-medicine'],
    'Maux de tête': ['neurology', 'phytotherapy', 'aromatherapy', 'acupuncture', 'meditation-therapy'],
    'Anxiété': ['meditation-therapy', 'aromatherapy', 'ayurveda', 'mind-body-medicine'],
    'Fatigue': ['naturopathy', 'ayurveda', 'functional-medicine', 'tibetan-medicine'],
    'Insomnie': ['meditation-therapy', 'phytotherapy', 'aromatherapy', 'traditional-chinese-medicine'],
    'Douleur musculaire': ['osteopathy', 'aromatherapy', 'traditional-chinese-medicine', 'african-medicine'],
    'Digestif': ['naturopathy', 'ayurveda', 'traditional-chinese-medicine', 'functional-medicine']
  };
  
  const relevantTreatmentIds = symptomMappings[symptom] || [];
  return allTreatments.filter(treatment => 
    relevantTreatmentIds.includes(treatment.id)
  );
}

export function getHolisticRecommendations(symptoms: string[]): HolisticAssessment {
  return {
    body: {
      physical: [
        'Évaluation médicale conventionnelle',
        'Tests de laboratoire si nécessaire',
        'Exercice adapté à la condition'
      ],
      energetic: [
        'Équilibrage énergétique (acupuncture, reiki)',
        'Harmonisation des chakras',
        'Travail sur les méridiens'
      ]
    },
    mind: {
      emotional: [
        'Gestion du stress et des émotions',
        'Techniques de relaxation',
        'Méditation et pleine conscience'
      ],
      mental: [
        'Reprogrammation des schémas mentaux',
        'Visualisation positive',
        'Techniques de respiration'
      ]
    },
    spirit: {
      purpose: [
        'Recherche du sens et de la mission de vie',
        'Alignement avec les valeurs profondes',
        'Développement spirituel personnel'
      ],
      connection: [
        'Connexion avec la nature',
        'Relations harmonieuses',
        'Communion avec le divin'
      ]
    }
  };
}

export function generateIntegrativePlan(symptoms: string[], severity: string): {
  conventional: UniversalTreatment[];
  complementary: UniversalTreatment[];
  traditional: UniversalTreatment[];
  holistic: HolisticAssessment;
} {
  const conventional = universalMedicineCategories
    .find(cat => cat.id === 'conventional')?.approaches || [];
  
  const complementary = universalMedicineCategories
    .find(cat => cat.id === 'soft-medicine')?.approaches || [];
  
  const traditional = universalMedicineCategories
    .find(cat => cat.id === 'traditional-medicine')?.approaches || [];
  
  const holistic = getHolisticRecommendations(symptoms);
  
  return {
    conventional,
    complementary,
    traditional,
    holistic
  };
}
