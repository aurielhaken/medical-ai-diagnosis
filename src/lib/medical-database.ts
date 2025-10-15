// Base de données médicale pour l'IA de diagnostic
import { findVidalCondition, vidalMedicalConditions } from './vidal-medical-database';

export interface MedicalCondition {
  id: string;
  name: string;
  category: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendations: string[];
  differentialDiagnosis: string[];
  nextSteps: string[];
  probability: number;
}

export interface SymptomPattern {
  symptoms: string[];
  condition: string;
  probability: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

// Base de données des conditions médicales
export const medicalConditions: MedicalCondition[] = [
  {
    id: 'flu',
    name: 'Syndrome grippal',
    category: 'Infectieux',
    symptoms: ['Fièvre', 'Fatigue', 'Douleur musculaire', 'Maux de tête', 'Toux', 'Congestion nasale'],
    severity: 'moderate',
    urgency: 'medium',
    description: 'Infection virale causée par le virus de la grippe, caractérisée par des symptômes respiratoires et systémiques.',
    recommendations: [
      'Repos et hydratation abondante',
      'Paracétamol pour la fièvre et les douleurs',
      'Surveillance de la température',
      'Consultation médicale si aggravation'
    ],
    differentialDiagnosis: ['Rhume commun', 'COVID-19', 'Allergie saisonnière', 'Bronchite'],
    nextSteps: [
      'Surveillance des symptômes',
      'Consultation si aggravation',
      'Tests si persistance'
    ],
    probability: 75
  },
  {
    id: 'migraine',
    name: 'Migraine',
    category: 'Neurologique',
    symptoms: ['Maux de tête sévères', 'Nausées', 'Vomissements', 'Sensibilité à la lumière', 'Sensibilité au bruit'],
    severity: 'severe',
    urgency: 'medium',
    description: 'Céphalée primaire caractérisée par des maux de tête récurrents, souvent unilatéraux et pulsatifs.',
    recommendations: [
      'Repos dans une pièce sombre et calme',
      'Médicaments anti-migraineux',
      'Éviter les déclencheurs connus',
      'Consultation neurologique si fréquent'
    ],
    differentialDiagnosis: ['Céphalée de tension', 'Sinusite', 'Hypertension', 'Tumeur cérébrale'],
    nextSteps: [
      'Tenir un journal des migraines',
      'Identifier les déclencheurs',
      'Consultation spécialisée si nécessaire'
    ],
    probability: 80
  },
  {
    id: 'anxiety',
    name: 'Trouble anxieux',
    category: 'Santé mentale',
    symptoms: ['Anxiété', 'Palpitations', 'Sueurs', 'Tremblements', 'Essoufflement', 'Insomnie'],
    severity: 'moderate',
    urgency: 'medium',
    description: 'Trouble psychologique caractérisé par une anxiété excessive et persistante.',
    recommendations: [
      'Techniques de relaxation',
      'Exercices de respiration',
      'Consultation psychologique',
      'Éviter la caféine et l\'alcool'
    ],
    differentialDiagnosis: ['Crise de panique', 'Dépression', 'Hyperthyroïdie', 'Problème cardiaque'],
    nextSteps: [
      'Consultation psychologique',
      'Techniques de gestion du stress',
      'Suivi médical régulier'
    ],
    probability: 70
  },
  {
    id: 'gastroenteritis',
    name: 'Gastro-entérite',
    category: 'Digestif',
    symptoms: ['Nausées', 'Vomissements', 'Diarrhée', 'Douleur abdominale', 'Fièvre légère', 'Perte d\'appétit'],
    severity: 'moderate',
    urgency: 'medium',
    description: 'Inflammation de l\'estomac et des intestins, souvent d\'origine virale ou bactérienne.',
    recommendations: [
      'Hydratation abondante',
      'Régime alimentaire léger',
      'Repos',
      'Éviter les produits laitiers temporairement'
    ],
    differentialDiagnosis: ['Intoxication alimentaire', 'Infection bactérienne', 'Maladie inflammatoire', 'Allergie alimentaire'],
    nextSteps: [
      'Surveillance de l\'hydratation',
      'Consultation si déshydratation',
      'Tests si persistance'
    ],
    probability: 85
  },
  {
    id: 'hypertension',
    name: 'Hypertension artérielle',
    category: 'Cardiovasculaire',
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
    differentialDiagnosis: ['Stress', 'Problème rénal', 'Trouble endocrinien', 'Médicaments'],
    nextSteps: [
      'Surveillance tensionnelle',
      'Consultation médicale urgente',
      'Examens complémentaires'
    ],
    probability: 60
  },
  {
    id: 'depression',
    name: 'Dépression',
    category: 'Santé mentale',
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
    differentialDiagnosis: ['Trouble bipolaire', 'Dépression saisonnière', 'Trouble anxieux', 'Problème médical'],
    nextSteps: [
      'Consultation psychologique immédiate',
      'Évaluation psychiatrique',
      'Plan de traitement personnalisé'
    ],
    probability: 75
  }
];

// Patterns de symptômes pour l'analyse
export const symptomPatterns: SymptomPattern[] = [
  {
    symptoms: ['Fièvre', 'Fatigue', 'Douleur musculaire', 'Toux'],
    condition: 'Syndrome grippal',
    probability: 80,
    urgency: 'medium'
  },
  {
    symptoms: ['Maux de tête sévères', 'Nausées', 'Sensibilité à la lumière'],
    condition: 'Migraine',
    probability: 85,
    urgency: 'medium'
  },
  {
    symptoms: ['Anxiété', 'Palpitations', 'Sueurs', 'Tremblements'],
    condition: 'Trouble anxieux',
    probability: 75,
    urgency: 'medium'
  },
  {
    symptoms: ['Nausées', 'Vomissements', 'Diarrhée', 'Douleur abdominale'],
    condition: 'Gastro-entérite',
    probability: 90,
    urgency: 'medium'
  },
  {
    symptoms: ['Maux de tête', 'Vertiges', 'Palpitations', 'Essoufflement'],
    condition: 'Hypertension artérielle',
    probability: 70,
    urgency: 'high'
  },
  {
    symptoms: ['Tristesse persistante', 'Perte d\'intérêt', 'Fatigue', 'Insomnie'],
    condition: 'Dépression',
    probability: 80,
    urgency: 'high'
  }
];

// Fonction d'analyse des symptômes avec base de données Vidal
export function analyzeSymptoms(symptoms: string[], doctorId: string): MedicalCondition | null {
  // 1. Essayer d'abord la base de données Vidal (plus complète)
  const vidalMatch = findVidalCondition(symptoms);
  if (vidalMatch) {
    // Convertir la condition Vidal vers le format MedicalCondition
    return {
      id: vidalMatch.id,
      name: vidalMatch.name,
      category: vidalMatch.category,
      symptoms: vidalMatch.symptoms,
      severity: vidalMatch.severity,
      urgency: vidalMatch.urgency,
      description: vidalMatch.description,
      recommendations: vidalMatch.recommendations,
      differentialDiagnosis: vidalMatch.differentialDiagnosis,
      nextSteps: vidalMatch.nextSteps,
      probability: vidalMatch.probability
    };
  }

  // 2. Fallback vers la base de données originale
  let bestMatch: SymptomPattern | null = null;
  let bestScore = 0;

  for (const pattern of symptomPatterns) {
    const matchingSymptoms = pattern.symptoms.filter(symptom => 
      symptoms.some(s => s.toLowerCase().includes(symptom.toLowerCase()) || 
                        symptom.toLowerCase().includes(s.toLowerCase()))
    );
    
    const score = (matchingSymptoms.length / pattern.symptoms.length) * 100;
    
    if (score > bestScore && score > 50) { // Seuil de 50% de correspondance
      bestScore = score;
      bestMatch = pattern;
    }
  }

  if (bestMatch) {
    const condition = medicalConditions.find(c => c.name === bestMatch!.condition);
    if (condition) {
      return {
        ...condition,
        probability: Math.min(bestMatch.probability, 95) // Limiter à 95% max
      };
    }
  }

  return null;
}

// Fonction pour obtenir des recommandations personnalisées selon le médecin
export function getPersonalizedRecommendations(condition: MedicalCondition, doctorId: string): string[] {
  const baseRecommendations = [...condition.recommendations];
  
  // Personnalisation selon le médecin
  switch (doctorId) {
    case 'dr-sarah':
      baseRecommendations.unshift('Approche préventive recommandée');
      break;
    case 'dr-marcus':
      baseRecommendations.unshift('Analyse approfondie nécessaire');
      break;
    case 'dr-elena':
      baseRecommendations.unshift('Approche holistique recommandée');
      break;
    case 'dr-james':
      baseRecommendations.unshift('Surveillance rapprochée');
      break;
  }
  
  return baseRecommendations;
}

// Fonction pour calculer l'urgence
export function calculateUrgency(symptoms: string[], condition: MedicalCondition): 'low' | 'medium' | 'high' | 'critical' {
  const criticalSymptoms = ['Douleur thoracique', 'Essoufflement sévère', 'Perte de conscience', 'Saignement important'];
  const highUrgencySymptoms = ['Fièvre élevée', 'Douleur abdominale sévère', 'Confusion', 'Vision trouble'];
  
  if (symptoms.some(s => criticalSymptoms.some(cs => s.toLowerCase().includes(cs.toLowerCase())))) {
    return 'critical';
  }
  
  if (symptoms.some(s => highUrgencySymptoms.some(hs => s.toLowerCase().includes(hs.toLowerCase())))) {
    return 'high';
  }
  
  return condition.urgency;
}
