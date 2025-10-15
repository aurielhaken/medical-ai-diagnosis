'use client';

import { useState } from 'react';
import { ArrowLeft, Search, Filter, Globe, Heart, Brain, Zap, Leaf, Sparkles, Info, Star, Clock, Shield } from 'lucide-react';
import { universalMedicineCategories, getUniversalTreatmentsForSymptom, getHolisticRecommendations } from '@/lib/universal-medicine';

export default function UniversalMedicinePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [showHolistic, setShowHolistic] = useState(false);

  const symptoms = [
    'Douleur thoracique', 'Maux de tête', 'Anxiété', 'Fatigue', 'Insomnie',
    'Douleur musculaire', 'Problèmes digestifs', 'Stress', 'Dépression', 'Allergies'
  ];

  const filteredCategories = universalMedicineCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEvidenceColor = (evidence: string) => {
    switch (evidence) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'traditional': return 'bg-purple-100 text-purple-800';
      case 'anecdotal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApproachIcon = (approach: string) => {
    switch (approach) {
      case 'scientific': return '🔬';
      case 'holistic': return '🌿';
      case 'energetic': return '⚡';
      case 'spiritual': return '🌀';
      case 'integrated': return '⚕️';
      default: return '💫';
    }
  };

  const getTargetIcon = (target: string) => {
    switch (target) {
      case 'body': return '💪';
      case 'mind': return '🧠';
      case 'energy': return '⚡';
      case 'spirit': return '✨';
      case 'integrated': return '🌐';
      default: return '💫';
    }
  };

  const holisticAssessment = selectedSymptom ? getHolisticRecommendations([selectedSymptom]) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <a 
              href="/diagnostic"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </a>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Globe className="w-8 h-8 text-blue-600" />
                Médecines Universelles du Monde
              </h1>
              <p className="text-gray-600 mt-2">
                Découvrez toutes les approches thérapeutiques de l'humanité - Science, Tradition et Sagesse
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une médecine, une approche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choisir un symptôme</option>
                {symptoms.map(symptom => (
                  <option key={symptom} value={symptom}>{symptom}</option>
                ))}
              </select>
              
              <button
                onClick={() => setShowHolistic(!showHolistic)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  showHolistic 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Filter className="w-5 h-5 inline mr-2" />
                Approche Holistique
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Holistic Assessment */}
        {showHolistic && holisticAssessment && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Évaluation Holistique pour: {selectedSymptom}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Corps */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Corps (Physique & Énergétique)
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-blue-700 mb-1">Physique:</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      {holisticAssessment.body.physical.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-700 mb-1">Énergétique:</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      {holisticAssessment.body.energetic.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Esprit */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Esprit (Émotionnel & Mental)
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-1">Émotionnel:</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      {holisticAssessment.mind.emotional.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-1">Mental:</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      {holisticAssessment.mind.mental.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Âme */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Âme (Sens & Connexion)
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-purple-700 mb-1">Sens de vie:</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      {holisticAssessment.spirit.purpose.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-purple-700 mb-1">Connexion:</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      {holisticAssessment.spirit.connection.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medicine Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className={`p-6 ${category.color === 'blue' ? 'bg-blue-600' : 
                                      category.color === 'green' ? 'bg-green-600' :
                                      category.color === 'purple' ? 'bg-purple-600' : 'bg-indigo-600'} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{category.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                      <p className="text-blue-100 mt-1">{category.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
                  >
                    {selectedCategory === category.id ? 'Masquer' : 'Explorer'}
                  </button>
                </div>
              </div>

              {/* Category Content */}
              {selectedCategory === category.id && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.approaches.map((treatment) => (
                      <div key={treatment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getApproachIcon(treatment.approach)}</span>
                            <span className="text-xl">{getTargetIcon(treatment.target)}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getEvidenceColor(treatment.evidence)}`}>
                            {treatment.evidence === 'high' ? 'Preuves élevées' :
                             treatment.evidence === 'moderate' ? 'Preuves modérées' :
                             treatment.evidence === 'traditional' ? 'Traditionnel' :
                             'Anecdotique'}
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2">{treatment.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{treatment.description}</p>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500">{treatment.origin}</span>
                          </div>
                          
                          {treatment.culturalContext && (
                            <div className="bg-gray-50 p-2 rounded">
                              <p className="text-gray-600 italic">{treatment.culturalContext}</p>
                            </div>
                          )}
                          
                          {treatment.preparation && (
                            <div>
                              <span className="font-medium text-gray-600">Préparation:</span>
                              <p className="text-gray-500">{treatment.preparation}</p>
                            </div>
                          )}
                          
                          {treatment.dosage && (
                            <div>
                              <span className="font-medium text-gray-600">Dosage:</span>
                              <p className="text-gray-500">{treatment.dosage}</p>
                            </div>
                          )}
                          
                          {treatment.contraindications.length > 0 && (
                            <div>
                              <span className="font-medium text-red-600">⚠️ Contre-indications:</span>
                              <p className="text-red-500">{treatment.contraindications.join(', ')}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Information */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">🌍 Vision Universelle de la Santé</h3>
            <p className="text-blue-100 mb-4">
              Cette approche intégrative respecte toutes les traditions médicales du monde tout en encourageant 
              la consultation de professionnels qualifiés dans chaque domaine.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Sécurité avant tout</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Respect des traditions</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Approche intemporelle</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>Consultation professionnelle recommandée</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
