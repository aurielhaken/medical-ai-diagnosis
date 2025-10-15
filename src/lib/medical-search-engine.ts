// Moteur de recherche médical complet
// Intégration de toutes les bases de données : Vidal, médecines alternatives, exercices, YouTube

import { findVidalMolecule, getMoleculesByCategory, searchMolecules } from './vidal-molecules-database';
import { findVidalCondition, vidalMedicalConditions } from './vidal-medical-database';
import { findVidalTreatment, vidalTreatments } from './vidal-treatments';
import { getAlternativeMedicinesByCategory, searchAlternativeMedicines, getConditionRemedies } from './alternative-medicine-database';

export interface MedicalSearchResult {
  query: string;
  timestamp: Date;
  results: {
    molecules: {
      vidal: any[];
      alternatives: any[];
    };
    conditions: {
      vidal: any[];
      symptoms: any[];
    };
    treatments: {
      conventional: any[];
      natural: any[];
      traditional: any[];
    };
    exercises: any[];
    youtubeVideos: {
      explanation: string[];
      exercises: string[];
      remedies: string[];
      massage: string[];
    };
    grandmaRemedies: string[];
    orientalMedicine: string[];
    recipes: string[];
    positions: string[];
    comparisons: ComparisonResult[];
  };
  suggestions: string[];
  relatedQueries: string[];
}

export interface ComparisonResult {
  condition: string;
  conventional: {
    name: string;
    effectiveness: 'Très élevée' | 'Élevée' | 'Modérée' | 'Faible';
    sideEffects: string[];
    cost: 'Gratuit' | 'Faible' | 'Modéré' | 'Élevé';
    duration: string;
    safety: 'Sûr' | 'Précautions' | 'Surveillance médicale' | 'Risqué';
  };
  natural: {
    name: string;
    effectiveness: 'Très élevée' | 'Élevée' | 'Modérée' | 'Faible';
    sideEffects: string[];
    cost: 'Gratuit' | 'Faible' | 'Modéré' | 'Élevé';
    duration: string;
    safety: 'Sûr' | 'Précautions' | 'Surveillance médicale' | 'Risqué';
  };
  traditional: {
    name: string;
    effectiveness: 'Très élevée' | 'Élevée' | 'Modérée' | 'Faible';
    sideEffects: string[];
    cost: 'Gratuit' | 'Faible' | 'Modéré' | 'Élevé';
    duration: string;
    safety: 'Sûr' | 'Précautions' | 'Surveillance médicale' | 'Risqué';
  };
  recommendation: string;
  youtubeVideos: string[];
}

// Moteur de recherche principal
export class MedicalSearchEngine {
  private searchHistory: string[] = [];
  private maxHistorySize = 100;

  // Recherche complète
  async search(query: string): Promise<MedicalSearchResult> {
    const normalizedQuery = this.normalizeQuery(query);
    this.addToHistory(normalizedQuery);

    const results = await Promise.all([
      this.searchMolecules(normalizedQuery),
      this.searchConditions(normalizedQuery),
      this.searchTreatments(normalizedQuery),
      this.searchExercises(normalizedQuery),
      this.searchYouTubeVideos(normalizedQuery),
      this.searchGrandmaRemedies(normalizedQuery),
      this.searchOrientalMedicine(normalizedQuery),
      this.searchRecipes(normalizedQuery),
      this.searchPositions(normalizedQuery),
      this.generateComparisons(normalizedQuery)
    ]);

    const [molecules, conditions, treatments, exercises, youtubeVideos, grandmaRemedies, orientalMedicine, recipes, positions, comparisons] = results;

    const suggestions = this.generateSuggestions(normalizedQuery);
    const relatedQueries = this.generateRelatedQueries(normalizedQuery);

    return {
      query: normalizedQuery,
      timestamp: new Date(),
      results: {
        molecules,
        conditions,
        treatments,
        exercises,
        youtubeVideos,
        grandmaRemedies,
        orientalMedicine,
        recipes,
        positions,
        comparisons
      },
      suggestions,
      relatedQueries
    };
  }

  // Recherche de molécules
  private async searchMolecules(query: string) {
    const vidalResults = searchMolecules(query);
    const alternativeResults = searchAlternativeMedicines(query);

    return {
      vidal: vidalResults.molecules.slice(0, 10), // Limiter à 10 résultats
      alternatives: alternativeResults.medicines.slice(0, 10)
    };
  }

  // Recherche de conditions
  private async searchConditions(query: string) {
    // Recherche dans la base Vidal
    const vidalConditions = vidalMedicalConditions.filter(condition =>
      condition.name.toLowerCase().includes(query.toLowerCase()) ||
      condition.symptoms.some(symptom => symptom.toLowerCase().includes(query.toLowerCase())) ||
      condition.description.toLowerCase().includes(query.toLowerCase())
    );

    // Recherche de symptômes
    const symptoms = vidalConditions.flatMap(condition => condition.symptoms)
      .filter(symptom => symptom.toLowerCase().includes(query.toLowerCase()));

    return {
      vidal: vidalConditions.slice(0, 10),
      symptoms: [...new Set(symptoms)].slice(0, 10)
    };
  }

  // Recherche de traitements
  private async searchTreatments(query: string) {
    const conditionRemedies = getConditionRemedies(query);
    
    if (conditionRemedies) {
      return {
        conventional: conditionRemedies.conventional,
        natural: conditionRemedies.natural,
        traditional: conditionRemedies.traditional
      };
    }

    // Recherche générale dans les traitements
    const conventionalTreatments = Object.values(vidalTreatments)
      .flat()
      .filter(treatment => 
        treatment.condition.toLowerCase().includes(query.toLowerCase()) ||
        treatment.medications.some(med => 
          med.molecule.toLowerCase().includes(query.toLowerCase())
        )
      );

    const alternativeMedicines = searchAlternativeMedicines(query);

    return {
      conventional: conventionalTreatments.slice(0, 10),
      natural: alternativeMedicines.medicines.filter(med => 
        med.category === 'Phytothérapie' || med.category === 'Naturopathie'
      ).slice(0, 10),
      traditional: alternativeMedicines.medicines.filter(med => 
        med.category === 'Médecine Traditionnelle Chinoise' || 
        med.category === 'Ayurveda' ||
        med.category === 'Médecine Arabe'
      ).slice(0, 10)
    };
  }

  // Recherche d'exercices
  private async searchExercises(query: string) {
    const alternativeResults = searchAlternativeMedicines(query);
    return alternativeResults.exercises.slice(0, 10);
  }

  // Recherche de vidéos YouTube
  private async searchYouTubeVideos(query: string) {
    const alternativeResults = searchAlternativeMedicines(query);
    const conditionRemedies = getConditionRemedies(query);

    let explanationVideos: string[] = [];
    let exerciseVideos: string[] = [];
    let remedyVideos: string[] = [];
    let massageVideos: string[] = [];

    // Collecter les vidéos des médecines alternatives
    alternativeResults.medicines.forEach(medicine => {
      explanationVideos.push(...medicine.youtubeVideos.explanation);
      exerciseVideos.push(...medicine.youtubeVideos.exercises);
      remedyVideos.push(...medicine.youtubeVideos.preparation);
      massageVideos.push(...medicine.youtubeVideos.massage);
    });

    // Ajouter les vidéos des conditions spécifiques
    if (conditionRemedies) {
      exerciseVideos.push(...conditionRemedies.youtubeVideos);
    }

    // Supprimer les doublons
    explanationVideos = [...new Set(explanationVideos)];
    exerciseVideos = [...new Set(exerciseVideos)];
    remedyVideos = [...new Set(remedyVideos)];
    massageVideos = [...new Set(massageVideos)];

    return {
      explanation: explanationVideos.slice(0, 5),
      exercises: exerciseVideos.slice(0, 5),
      remedies: remedyVideos.slice(0, 5),
      massage: massageVideos.slice(0, 5)
    };
  }

  // Recherche de remèdes de grand-mère
  private async searchGrandmaRemedies(query: string) {
    const conditionRemedies = getConditionRemedies(query);
    const alternativeResults = searchAlternativeMedicines(query);

    let remedies: string[] = [];

    if (conditionRemedies) {
      remedies.push(...conditionRemedies.grandmaRemedies);
    }

    alternativeResults.medicines.forEach(medicine => {
      remedies.push(...medicine.grandmaRemedies);
    });

    return [...new Set(remedies)].slice(0, 10);
  }

  // Recherche de médecine orientale
  private async searchOrientalMedicine(query: string) {
    const conditionRemedies = getConditionRemedies(query);
    const alternativeResults = searchAlternativeMedicines(query);

    let oriental: string[] = [];

    if (conditionRemedies) {
      oriental.push(...conditionRemedies.orientalMedicine);
    }

    alternativeResults.medicines.forEach(medicine => {
      if (medicine.category === 'Médecine Traditionnelle Chinoise' || 
          medicine.category === 'Ayurveda' ||
          medicine.category === 'Médecine Arabe' ||
          medicine.category === 'Médecine Tibétaine') {
        oriental.push(medicine.name);
      }
    });

    return [...new Set(oriental)].slice(0, 10);
  }

  // Recherche de recettes
  private async searchRecipes(query: string) {
    const conditionRemedies = getConditionRemedies(query);
    const alternativeResults = searchAlternativeMedicines(query);

    let recipes: string[] = [];

    if (conditionRemedies) {
      recipes.push(...conditionRemedies.recipes);
    }

    alternativeResults.medicines.forEach(medicine => {
      recipes.push(...medicine.recipes.internal);
      recipes.push(...medicine.recipes.external);
      recipes.push(...medicine.recipes.bath);
      recipes.push(...medicine.recipes.compress);
    });

    return [...new Set(recipes)].slice(0, 15);
  }

  // Recherche de positions
  private async searchPositions(query: string) {
    const conditionRemedies = getConditionRemedies(query);
    const alternativeResults = searchAlternativeMedicines(query);

    let positions: string[] = [];

    if (conditionRemedies) {
      positions.push(...conditionRemedies.positions);
    }

    alternativeResults.medicines.forEach(medicine => {
      positions.push(...medicine.exercises.positions);
    });

    return [...new Set(positions)].slice(0, 10);
  }

  // Génération de comparaisons
  private async generateComparisons(query: string): Promise<ComparisonResult[]> {
    const comparisons: ComparisonResult[] = [];

    // Exemples de comparaisons pour les conditions courantes
    if (query.toLowerCase().includes('douleur') || query.toLowerCase().includes('inflammation')) {
      comparisons.push({
        condition: 'Douleur inflammatoire',
        conventional: {
          name: 'Ibuprofène',
          effectiveness: 'Élevée',
          sideEffects: ['Troubles digestifs', 'Risque cardiovasculaire', 'Insuffisance rénale'],
          cost: 'Faible',
          duration: '4-6 heures',
          safety: 'Précautions'
        },
        natural: {
          name: 'Curcuma',
          effectiveness: 'Modérée',
          sideEffects: ['Nausées légères', 'Coloration des selles'],
          cost: 'Faible',
          duration: '6-8 heures',
          safety: 'Sûr'
        },
        traditional: {
          name: 'Acupuncture',
          effectiveness: 'Modérée',
          sideEffects: ['Saignement léger', 'Bruising occasionnel'],
          cost: 'Modéré',
          duration: 'Plusieurs heures',
          safety: 'Surveillance médicale'
        },
        recommendation: 'Pour les douleurs légères à modérées, commencez par le curcuma. Pour les douleurs sévères, consultez un médecin pour l\'ibuprofène. L\'acupuncture peut être un complément efficace.',
        youtubeVideos: [
          'https://youtube.com/watch?v=comparaison-antidouleurs',
          'https://youtube.com/watch?v=curcuma-vs-ibuprofene'
        ]
      });
    }

    if (query.toLowerCase().includes('nausée') || query.toLowerCase().includes('vomissement')) {
      comparisons.push({
        condition: 'Nausées et vomissements',
        conventional: {
          name: 'Métoclopramide',
          effectiveness: 'Élevée',
          sideEffects: ['Somnolence', 'Troubles extrapyramidaux', 'Hyperprolactinémie'],
          cost: 'Faible',
          duration: '4-6 heures',
          safety: 'Surveillance médicale'
        },
        natural: {
          name: 'Gingembre',
          effectiveness: 'Modérée',
          sideEffects: ['Brûlures d\'estomac', 'Diarrhée (fortes doses)'],
          cost: 'Faible',
          duration: '2-4 heures',
          safety: 'Sûr'
        },
        traditional: {
          name: 'Acupuncture',
          effectiveness: 'Modérée',
          sideEffects: ['Sensation de lourdeur', 'Fatigue'],
          cost: 'Modéré',
          duration: 'Plusieurs heures',
          safety: 'Sûr'
        },
        recommendation: 'Le gingembre est excellent pour les nausées légères. Pour les nausées sévères ou post-opératoires, consultez un médecin. L\'acupuncture peut être très efficace.',
        youtubeVideos: [
          'https://youtube.com/watch?v=gingembre-nausees',
          'https://youtube.com/watch?v=acupuncture-nausees'
        ]
      });
    }

    return comparisons;
  }

  // Génération de suggestions
  private generateSuggestions(query: string): string[] {
    const suggestions: string[] = [];
    const queryLower = query.toLowerCase();

    // Suggestions basées sur les mots-clés
    if (queryLower.includes('douleur')) {
      suggestions.push('Exercices pour soulager la douleur', 'Positions anti-douleur', 'Remèdes naturels contre la douleur');
    }

    if (queryLower.includes('inflammation')) {
      suggestions.push('Anti-inflammatoires naturels', 'Aliments anti-inflammatoires', 'Exercices pour réduire l\'inflammation');
    }

    if (queryLower.includes('stress') || queryLower.includes('anxiété')) {
      suggestions.push('Techniques de relaxation', 'Respiration anti-stress', 'Méditation guidée');
    }

    if (queryLower.includes('digestion')) {
      suggestions.push('Aliments bons pour la digestion', 'Exercices digestifs', 'Remèdes de grand-mère');
    }

    // Suggestions générales
    suggestions.push(
      'Comparaison médicaments vs naturels',
      'Exercices thérapeutiques',
      'Recettes de grand-mère',
      'Médecine traditionnelle chinoise'
    );

    return suggestions.slice(0, 8);
  }

  // Génération de requêtes liées
  private generateRelatedQueries(query: string): string[] {
    const relatedQueries: string[] = [];
    const queryLower = query.toLowerCase();

    // Requêtes liées basées sur les mots-clés
    if (queryLower.includes('paracétamol')) {
      relatedQueries.push('Alternatives au paracétamol', 'Effets secondaires paracétamol', 'Posologie paracétamol');
    }

    if (queryLower.includes('curcuma')) {
      relatedQueries.push('Recettes au curcuma', 'Curcuma et inflammation', 'Curcuma vs ibuprofène');
    }

    if (queryLower.includes('sciatique')) {
      relatedQueries.push('Exercices sciatique', 'Positions sciatique', 'Remèdes sciatique');
    }

    if (queryLower.includes('carie')) {
      relatedQueries.push('Prévention caries', 'Soins dentaires naturels', 'Remèdes caries');
    }

    return relatedQueries.slice(0, 6);
  }

  // Normalisation de la requête
  private normalizeQuery(query: string): string {
    return query.trim().toLowerCase()
      .replace(/[^\w\s]/g, '') // Supprimer la ponctuation
      .replace(/\s+/g, ' ') // Normaliser les espaces
      .trim();
  }

  // Ajout à l'historique
  private addToHistory(query: string): void {
    if (!this.searchHistory.includes(query)) {
      this.searchHistory.unshift(query);
      if (this.searchHistory.length > this.maxHistorySize) {
        this.searchHistory = this.searchHistory.slice(0, this.maxHistorySize);
      }
    }
  }

  // Récupération de l'historique
  getSearchHistory(): string[] {
    return this.searchHistory;
  }

  // Recherche rapide (pour l'autocomplétion)
  async quickSearch(query: string): Promise<{
    molecules: string[];
    conditions: string[];
    symptoms: string[];
    remedies: string[];
  }> {
    const normalizedQuery = this.normalizeQuery(query);
    
    if (normalizedQuery.length < 2) {
      return { molecules: [], conditions: [], symptoms: [], remedies: [] };
    }

    const results = await this.search(normalizedQuery);

    return {
      molecules: [
        ...results.results.molecules.vidal.map(m => m.name),
        ...results.results.molecules.alternatives.map(m => m.name)
      ].slice(0, 5),
      conditions: results.results.conditions.vidal.map(c => c.name).slice(0, 5),
      symptoms: results.results.conditions.symptoms.slice(0, 5),
      remedies: results.results.grandmaRemedies.slice(0, 5)
    };
  }
}

// Instance globale du moteur de recherche
export const medicalSearchEngine = new MedicalSearchEngine();
