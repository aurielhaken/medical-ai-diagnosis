// Base de données des traitements et médicaments par condition médicale
import { findVidalTreatment, getAllVidalTreatments } from './vidal-treatments';

export interface Medication {
  molecule: string;
  dosage: string;
  frequency: string;
  duration: string;
  contraindications: string[];
  sideEffects: string[];
  category: 'OTC' | 'Prescription' | 'Natural' | 'Emergency';
  countryRestrictions?: string[];
}

export interface Treatment {
  id: string;
  condition: string;
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  medications: Medication[];
  naturalRemedies: string[];
  lifestyleChanges: string[];
  emergencyActions: string[];
  consultationAdvice: string;
  followUpInstructions: string;
}

export const medicalTreatments: Record<string, Treatment[]> = {
  'Angine de poitrine': [
    {
      id: 'angina-mild',
      condition: 'Angine de poitrine légère',
      severity: 'mild',
      medications: [
        {
          molecule: 'Aspirine',
          dosage: '75-100mg',
          frequency: 'Une fois par jour',
          duration: 'Selon prescription médicale',
          contraindications: ['Allergie à l\'aspirine', 'Ulcère gastrique', 'Hémophilie'],
          sideEffects: ['Brûlures d\'estomac', 'Saignements'],
          category: 'OTC'
        },
        {
          molecule: 'Nitroglycérine sublinguale',
          dosage: '0.3-0.6mg',
          frequency: 'En cas de douleur thoracique',
          duration: 'Maximum 3 doses en 15 minutes',
          contraindications: ['Hypotension artérielle', 'Sténose aortique'],
          sideEffects: ['Maux de tête', 'Hypotension', 'Rougeur'],
          category: 'Prescription'
        }
      ],
      naturalRemedies: [
        'Oméga-3 (poissons gras)',
        'Coenzyme Q10',
        'Magnésium',
        'Réduction du stress par méditation'
      ],
      lifestyleChanges: [
        'Arrêt du tabac',
        'Exercice physique modéré régulier',
        'Alimentation méditerranéenne',
        'Gestion du stress'
      ],
      emergencyActions: [
        'Repos immédiat',
        'Appel des urgences si douleur persistante',
        'Aspirine 325mg si disponible'
      ],
      consultationAdvice: 'Consultez votre médecin dans les 24-48h pour une évaluation cardiaque complète.',
      followUpInstructions: 'Surveillance de la tension artérielle, ECG de contrôle, bilan lipidique.'
    }
  ],
  
  'Migraine': [
    {
      id: 'migraine-mild',
      condition: 'Migraine légère à modérée',
      severity: 'mild',
      medications: [
        {
          molecule: 'Ibuprofène',
          dosage: '400-600mg',
          frequency: 'Toutes les 6-8h',
          duration: 'Maximum 3 jours',
          contraindications: ['Ulcère gastrique', 'Insuffisance rénale', 'Allergie aux AINS'],
          sideEffects: ['Troubles digestifs', 'Vertiges'],
          category: 'OTC'
        },
        {
          molecule: 'Paracétamol',
          dosage: '1000mg',
          frequency: 'Toutes les 6h',
          duration: 'Maximum 4 jours',
          contraindications: ['Insuffisance hépatique sévère'],
          sideEffects: ['Rare: réactions allergiques'],
          category: 'OTC'
        }
      ],
      naturalRemedies: [
        'Magnésium 400-600mg/jour',
        'Vitamine B2 (riboflavine) 400mg/jour',
        'Feverfew (tanacetum parthenium)',
        'Gingembre (anti-nausée)'
      ],
      lifestyleChanges: [
        'Repos dans une pièce sombre et silencieuse',
        'Hydratation suffisante',
        'Éviter les déclencheurs (alcool, chocolat, fromage)',
        'Régularité des repas et du sommeil'
      ],
      emergencyActions: [
        'Repos immédiat',
        'Glaçon sur la nuque',
        'Massage des tempes'
      ],
      consultationAdvice: 'Consultez si les migraines sont fréquentes (>2/semaine) ou invalidantes.',
      followUpInstructions: 'Tenir un journal des migraines, évaluation neurologique si nécessaire.'
    }
  ],

  'Grippe': [
    {
      id: 'flu-mild',
      condition: 'Grippe légère',
      severity: 'mild',
      medications: [
        {
          molecule: 'Paracétamol',
          dosage: '500-1000mg',
          frequency: 'Toutes les 6h',
          duration: 'Maximum 5 jours',
          contraindications: ['Insuffisance hépatique'],
          sideEffects: ['Rare: réactions allergiques'],
          category: 'OTC'
        },
        {
          molecule: 'Ibuprofène',
          dosage: '200-400mg',
          frequency: 'Toutes les 6-8h',
          duration: 'Maximum 3 jours',
          contraindications: ['Ulcère gastrique', 'Allergie aux AINS'],
          sideEffects: ['Troubles digestifs'],
          category: 'OTC'
        }
      ],
      naturalRemedies: [
        'Zinc 15-30mg/jour',
        'Vitamine C 1000mg/jour',
        'Echinacea',
        'Miel de thym (toux)',
        'Gingembre (nausées)'
      ],
      lifestyleChanges: [
        'Repos complet',
        'Hydratation abondante (2-3L/jour)',
        'Alimentation légère et nutritive',
        'Humidification de l\'air'
      ],
      emergencyActions: [
        'Surveillance de la température',
        'Hydratation constante',
        'Appel médecin si fièvre >39°C'
      ],
      consultationAdvice: 'Consultez si fièvre >39°C, essoufflement, ou symptômes >7 jours.',
      followUpInstructions: 'Repos complet, retour progressif aux activités, surveillance des complications.'
    }
  ],

  'Anxiété légère': [
    {
      id: 'anxiety-mild',
      condition: 'Anxiété légère',
      severity: 'mild',
      medications: [
        {
          molecule: 'Magnésium',
          dosage: '200-400mg',
          frequency: '2-3 fois par jour',
          duration: '2-3 mois',
          contraindications: ['Insuffisance rénale sévère'],
          sideEffects: ['Diarrhée (doses élevées)'],
          category: 'Natural'
        },
        {
          molecule: 'Mélisse (Melissa officinalis)',
          dosage: '300mg extrait sec',
          frequency: '2-3 fois par jour',
          duration: '4-6 semaines',
          contraindications: ['Hypothyroïdie'],
          sideEffects: ['Rare: somnolence'],
          category: 'Natural'
        }
      ],
      naturalRemedies: [
        'Camomille (tisane)',
        'Lavande (huile essentielle)',
        'Passiflore',
        'Valériane (sommeil)',
        'Exercices de respiration'
      ],
      lifestyleChanges: [
        'Exercice physique régulier',
        'Techniques de relaxation',
        'Méditation quotidienne',
        'Réduction caféine',
        'Sommeil régulier'
      ],
      emergencyActions: [
        'Techniques de respiration 4-7-8',
        'Marche en plein air',
        'Musique apaisante'
      ],
      consultationAdvice: 'Consultez un professionnel si l\'anxiété persiste >6 semaines ou affecte la vie quotidienne.',
      followUpInstructions: 'Suivi psychologique si nécessaire, évaluation du stress chronique.'
    }
  ],

  'Douleur musculaire': [
    {
      id: 'muscle-pain-mild',
      condition: 'Douleur musculaire légère',
      severity: 'mild',
      medications: [
        {
          molecule: 'Ibuprofène gel',
          dosage: '2-4g',
          frequency: '3-4 fois par jour',
          duration: 'Maximum 7 jours',
          contraindications: ['Allergie aux AINS', 'Lésions cutanées'],
          sideEffects: ['Irritation cutanée'],
          category: 'OTC'
        },
        {
          molecule: 'Paracétamol',
          dosage: '500-1000mg',
          frequency: 'Toutes les 6h',
          duration: 'Maximum 5 jours',
          contraindications: ['Insuffisance hépatique'],
          sideEffects: ['Rare'],
          category: 'OTC'
        }
      ],
      naturalRemedies: [
        'Arnica montana (gel)',
        'Curcuma (anti-inflammatoire)',
        'Magnésium (relaxant musculaire)',
        'Glace (premiers jours)',
        'Chaleur (après 48h)'
      ],
      lifestyleChanges: [
        'Repos relatif',
        'Étirements doux',
        'Massage léger',
        'Hydratation',
        'Éviter les mouvements brusques'
      ],
      emergencyActions: [
        'Glace 15-20min toutes les heures',
        'Élévation si possible',
        'Immobilisation temporaire'
      ],
      consultationAdvice: 'Consultez si douleur intense, gonflement important, ou limitation de mouvement >3 jours.',
      followUpInstructions: 'Reprise progressive de l\'activité, kinésithérapie si nécessaire.'
    }
  ],

  'Reflux gastro-œsophagien': [
    {
      id: 'gerd-mild',
      condition: 'Reflux gastro-œsophagien léger',
      severity: 'mild',
      medications: [
        {
          molecule: 'Ranitidine',
          dosage: '150mg',
          frequency: '2 fois par jour',
          duration: 'Maximum 8 semaines',
          contraindications: ['Allergie', 'Insuffisance rénale'],
          sideEffects: ['Maux de tête', 'Constipation'],
          category: 'OTC'
        },
        {
          molecule: 'Gaviscon',
          dosage: '10-20ml',
          frequency: 'Après repas et au coucher',
          duration: 'Selon besoin',
          contraindications: ['Insuffisance rénale sévère'],
          sideEffects: ['Constipation'],
          category: 'OTC'
        }
      ],
      naturalRemedies: [
        'Réglisse (DGL)',
        'Aloe vera',
        'Gingembre',
        'Probiotiques',
        'Réduction du stress'
      ],
      lifestyleChanges: [
        'Éviter les repas copieux',
        'Ne pas se coucher 2-3h après manger',
        'Surélever la tête de lit',
        'Éviter alcool, café, épices',
        'Perte de poids si surpoids'
      ],
      emergencyActions: [
        'Position assise après repas',
        'Hydratation par petites gorgées',
        'Éviter les positions penchées'
      ],
      consultationAdvice: 'Consultez si symptômes >3 fois/semaine, douleur thoracique, ou difficultés à avaler.',
      followUpInstructions: 'Modifications alimentaires, évaluation endoscopique si persistance.'
    }
  ]
};

export function getTreatmentForCondition(condition: string, severity: string = 'mild'): Treatment | null {
  // 1. Essayer d'abord la base de données Vidal (plus complète)
  const vidalTreatment = findVidalTreatment(condition, severity as any);
  if (vidalTreatment) {
    // Convertir le traitement Vidal vers le format Treatment
    return {
      id: vidalTreatment.id,
      condition: vidalTreatment.condition,
      severity: vidalTreatment.severity,
      medications: vidalTreatment.medications.map(med => ({
        molecule: med.molecule,
        dosage: med.dosage,
        frequency: med.frequency,
        duration: med.duration,
        contraindications: med.contraindications,
        sideEffects: med.sideEffects,
        category: med.category,
        countryRestrictions: med.countryRestrictions
      })),
      naturalRemedies: vidalTreatment.naturalRemedies,
      lifestyleChanges: vidalTreatment.lifestyleChanges,
      emergencyActions: vidalTreatment.emergencyActions,
      consultationAdvice: vidalTreatment.consultationAdvice,
      followUpInstructions: vidalTreatment.followUpInstructions
    };
  }

  // 2. Fallback vers la base de données originale
  const treatments = medicalTreatments[condition];
  if (!treatments) return null;
  
  return treatments.find(t => t.severity === severity) || treatments[0];
}

export function getAllTreatmentsForCondition(condition: string): Treatment[] {
  return medicalTreatments[condition] || [];
}

export function searchTreatmentsBySymptom(symptoms: string[]): Treatment[] {
  const matchingTreatments: Treatment[] = [];
  
  // Correspondances symptômes -> conditions
  const symptomMapping: Record<string, string[]> = {
    'Douleur thoracique': ['Angine de poitrine'],
    'Maux de tête': ['Migraine'],
    'Fièvre': ['Grippe'],
    'Anxiété': ['Anxiété légère'],
    'Douleur musculaire': ['Douleur musculaire'],
    'Reflux': ['Reflux gastro-œsophagien'],
    'Brûlures d\'estomac': ['Reflux gastro-œsophagien'],
    'Toux': ['Grippe'],
    'Fatigue': ['Grippe', 'Anxiété légère'],
    'Nausées': ['Grippe', 'Migraine']
  };
  
  symptoms.forEach(symptom => {
    const conditions = symptomMapping[symptom] || [];
    conditions.forEach(condition => {
      const treatments = getAllTreatmentsForCondition(condition);
      matchingTreatments.push(...treatments);
    });
  });
  
  return matchingTreatments;
}
