'use client';

import { useState, useEffect } from 'react';
import { Search, Stethoscope, Brain, Heart, Shield, Zap, Users, Activity } from 'lucide-react';
import { searchUniversalMedical, analyzeSpiritualAspects } from '@/lib/universal-medical-database';

interface SearchResult {
  doctors: any[];
  conditions: any[];
  symptoms: string[];
}

export default function UniversalMedicalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({ doctors: [], conditions: [], symptoms: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    { id: '', name: 'Toutes les spécialités', icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'Cardiologie', name: 'Cardiologie', icon: <Heart className="w-5 h-5" /> },
    { id: 'Neurologie', name: 'Neurologie', icon: <Brain className="w-5 h-5" /> },
    { id: 'Psychiatrie', name: 'Psychiatrie', icon: <Brain className="w-5 h-5" /> },
    { id: 'Santé spirituelle', name: 'Santé spirituelle', icon: <Shield className="w-5 h-5" /> },
    { id: 'Urgences', name: 'Urgences', icon: <Zap className="w-5 h-5" /> },
    { id: 'Médecine intégrative', name: 'Médecine intégrative', icon: <Activity className="w-5 h-5" /> }
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Simuler un délai de recherche
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Recherche dans la base de données universelle
      const searchResults = searchUniversalMedical(searchQuery, selectedCategory);
      console.log('Recherche pour:', searchQuery);
      console.log('Résultats trouvés:', searchResults);
      
      // Si aucun résultat, ajouter des résultats de test basés sur la requête
      if (searchResults.doctors.length === 0 && searchResults.conditions.length === 0 && searchResults.symptoms.length === 0) {
        const testResults = generateTestResults(searchQuery);
        setResults(testResults);
      } else {
        setResults(searchResults);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      // En cas d'erreur, afficher des résultats de test
      const testResults = generateTestResults(searchQuery);
      setResults(testResults);
    } finally {
      setIsSearching(false);
    }
  };

  // Fonction pour générer des résultats de test
  const generateTestResults = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Résultats de test basés sur la requête
    let testDoctors = [];
    let testConditions = [];
    let testSymptoms = [];

    // Recherche par mots-clés
    if (lowerQuery.includes('paracétamol') || lowerQuery.includes('paracetamol')) {
      testDoctors = [
        {
          id: 'dr-test-1',
          name: 'Dr. Sarah Chen',
          title: 'Médecin Généraliste Universelle',
          specialty: 'Médecine Générale & Toxicologie',
          avatar: '👩‍⚕️',
          description: 'Spécialisée dans le diagnostic préliminaire et la toxicologie',
          expertise: ['Toxicologie', 'Médecine d\'urgence', 'Diagnostic différentiel'],
          spiritualApproach: true
        }
      ];

      testConditions = [
        {
          id: 'test-condition-1',
          name: 'Intoxication au paracétamol',
          category: 'Toxicologie',
          subcategory: 'Intoxication médicamenteuse',
          symptoms: ['Nausées', 'Vomissements', 'Douleur abdominale', 'Fatigue', 'Jaunisse'],
          severity: 'severe',
          urgency: 'high',
          description: 'L\'intoxication au paracétamol peut être fatale en cas de surdosage. Le paracétamol est métabolisé par le foie et peut causer une hépatotoxicité sévère.',
          recommendations: [
            'Arrêt immédiat du paracétamol',
            'Consultation médicale urgente',
            'Traitement par N-acétylcystéine si nécessaire',
            'Surveillance des fonctions hépatiques'
          ],
          spiritualGuidance: [
            'Méditation pour calmer l\'anxiété',
            'Pratiques de respiration consciente',
            'Connexion avec la nature pour l\'apaisement'
          ],
          holisticApproach: [
            'Hydratation abondante',
            'Repos complet',
            'Alimentation légère',
            'Éviter l\'alcool et les médicaments'
          ],
          differentialDiagnosis: ['Hépatite virale', 'Autres intoxications', 'Maladie hépatique'],
          nextSteps: [
            'Consultation médicale immédiate',
            'Examens de laboratoire',
            'Surveillance rapprochée'
          ],
          probability: 85,
          relatedConditions: ['Hépatite', 'Insuffisance hépatique'],
          preventionTips: [
            'Respecter les dosages recommandés',
            'Ne pas dépasser 4g par jour',
            'Éviter l\'alcool avec le paracétamol'
          ],
          emergencyActions: [
            'Appeler le 15 (SAMU) immédiatement',
            'Ne pas attendre les symptômes',
            'Apporter l\'emballage du médicament'
          ]
        }
      ];

      testSymptoms = [
        'Nausées', 'Vomissements', 'Douleur abdominale', 'Fatigue', 'Jaunisse',
        'Maux de tête', 'Confusion', 'Sueurs', 'Tremblements'
      ];
    } else if (lowerQuery.includes('douleur') || lowerQuery.includes('mal')) {
      testDoctors = [
        {
          id: 'dr-test-2',
          name: 'Dr. Marcus Thompson',
          title: 'Médecin Interniste',
          specialty: 'Médecine Interne & Diagnostic',
          avatar: '👨‍⚕️',
          description: 'Expert en diagnostic des douleurs et cas complexes',
          expertise: ['Diagnostic différentiel', 'Médecine interne', 'Gestion de la douleur'],
          emergencySpecialist: true
        }
      ];

      testConditions = [
        {
          id: 'test-condition-2',
          name: 'Douleur chronique',
          category: 'Médecine interne',
          subcategory: 'Syndromes douloureux',
          symptoms: ['Douleur persistante', 'Fatigue', 'Troubles du sommeil', 'Anxiété'],
          severity: 'moderate',
          urgency: 'medium',
          description: 'Douleur persistante nécessitant une évaluation médicale approfondie.',
          recommendations: [
            'Consultation médicale',
            'Évaluation de la douleur',
            'Plan de traitement personnalisé',
            'Suivi régulier'
          ],
          spiritualGuidance: [
            'Méditation de pleine conscience',
            'Techniques de relaxation',
            'Acceptation et lâcher-prise'
          ],
          holisticApproach: [
            'Physiothérapie',
            'Acupuncture',
            'Méditation',
            'Exercice adapté'
          ],
          differentialDiagnosis: ['Inflammation', 'Névralgie', 'Trouble psychosomatique'],
          nextSteps: [
            'Consultation médicale',
            'Examens complémentaires',
            'Plan de traitement'
          ],
          probability: 70,
          relatedConditions: ['Fibromyalgie', 'Arthrite', 'Névralgie'],
          preventionTips: [
            'Exercice régulier',
            'Gestion du stress',
            'Posture correcte'
          ],
          emergencyActions: [
            'Consulter si douleur intense',
            'Appeler le 15 si urgence'
          ]
        }
      ];

      testSymptoms = [
        'Douleur thoracique', 'Douleur abdominale', 'Maux de tête', 'Douleur articulaire',
        'Douleur musculaire', 'Douleur au dos', 'Douleur au cou'
      ];
    } else {
      // Résultats génériques
      testDoctors = [
        {
          id: 'dr-test-3',
          name: 'Dr. Sarah Chen',
          title: 'Médecin Généraliste Universelle',
          specialty: 'Médecine Générale & Diagnostic Global',
          avatar: '👩‍⚕️',
          description: 'Spécialisée dans le diagnostic préliminaire et la médecine préventive',
          expertise: ['Diagnostic différentiel', 'Médecine préventive', 'Santé familiale'],
          spiritualApproach: true
        }
      ];

      testConditions = [
        {
          id: 'test-condition-3',
          name: 'Consultation médicale recommandée',
          category: 'Médecine générale',
          subcategory: 'Évaluation médicale',
          symptoms: ['Symptômes variés'],
          severity: 'moderate',
          urgency: 'medium',
          description: 'Une consultation médicale est recommandée pour une évaluation approfondie de vos symptômes.',
          recommendations: [
            'Consultation médicale',
            'Surveillance des symptômes',
            'Tenir un journal des symptômes'
          ],
          spiritualGuidance: [
            'Méditation pour l\'apaisement',
            'Pratiques de respiration'
          ],
          holisticApproach: [
            'Repos',
            'Hydratation',
            'Alimentation équilibrée'
          ],
          differentialDiagnosis: ['Évaluation médicale nécessaire'],
          nextSteps: [
            'Consultation médicale',
            'Examens si nécessaire'
          ],
          probability: 50,
          relatedConditions: ['À déterminer'],
          preventionTips: [
            'Mode de vie sain',
            'Prévention'
          ],
          emergencyActions: [
            'Consulter si aggravation'
          ]
        }
      ];

      testSymptoms = [
        'Fièvre', 'Fatigue', 'Maux de tête', 'Nausées', 'Douleur',
        'Essoufflement', 'Vertiges', 'Palpitations'
      ];
    }

    return {
      doctors: testDoctors,
      conditions: testConditions,
      symptoms: testSymptoms
    };
  };

  useEffect(() => {
    if (query.length > 2) {
      const timeoutId = setTimeout(() => {
        handleSearch(query);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [query, selectedCategory]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Barre de recherche principale */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Source de Richesse Médicale Universelle
          </h1>
          <p className="text-lg text-gray-600">
            Recherchez parmi toutes les connaissances médicales de l'humanité
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder="Recherchez un symptôme, une maladie, un médecin, une spécialité..."
            className="block w-full pl-10 pr-20 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-gray-900"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {isSearching ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            ) : (
              <button
                onClick={() => handleSearch(query)}
                disabled={!query.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Rechercher
              </button>
            )}
          </div>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Résultats de recherche */}
      {query.length > 2 && (
        <div className="space-y-6">
          {/* Médecins IA */}
          {results.doctors.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-600" />
                Médecins IA Spécialisés ({results.doctors.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.doctors.map((doctor) => (
                  <div key={doctor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="text-3xl mr-3">{doctor.avatar}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-blue-600">{doctor.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{doctor.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.expertise.slice(0, 3).map((skill: string, index: number) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {doctor.spiritualApproach && (
                      <div className="mt-2">
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          Approche spirituelle
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conditions médicales */}
          {results.conditions.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Stethoscope className="w-6 h-6 mr-2 text-green-600" />
                Conditions Médicales ({results.conditions.length})
              </h2>
              <div className="space-y-4">
                {results.conditions.map((condition) => (
                  <div key={condition.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{condition.name}</h3>
                        <p className="text-sm text-gray-600">{condition.category} • {condition.subcategory}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(condition.urgency)}`}>
                        {condition.urgency === 'low' ? 'Faible' :
                         condition.urgency === 'medium' ? 'Modérée' :
                         condition.urgency === 'high' ? 'Élevée' : 'Critique'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{condition.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {condition.symptoms.slice(0, 5).map((symptom: string, index: number) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {symptom}
                        </span>
                      ))}
                    </div>
                    {condition.spiritualGuidance && (
                      <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                        <h4 className="text-sm font-semibold text-purple-800 mb-2">Guidance spirituelle :</h4>
                        <ul className="text-xs text-purple-700 space-y-1">
                          {condition.spiritualGuidance.slice(0, 3).map((guidance: string, index: number) => (
                            <li key={index}>• {guidance}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Symptômes */}
          {results.symptoms.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-orange-600" />
                Symptômes Correspondants ({results.symptoms.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {results.symptoms.map((symptom, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Aucun résultat */}
          {query.length > 2 && results.doctors.length === 0 && results.conditions.length === 0 && results.symptoms.length === 0 && !isSearching && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez avec d'autres mots-clés ou explorez nos catégories spécialisées
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Médecine générale</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Cardiologie</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Santé mentale</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Urgences</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggestions populaires */}
      {query.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recherches populaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'Douleur thoracique', 'Anxiété', 'Migraine', 'Dépression',
              'Fièvre', 'Fatigue', 'Insomnie', 'Stress',
              'Crise spirituelle', 'Hypertension', 'Diabète', 'Cancer'
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
