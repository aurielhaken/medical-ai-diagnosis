'use client';

import { useState, useEffect } from 'react';
import { Search, Pill, Leaf, Heart, Play, BookOpen, Users, Globe, Activity, AlertTriangle, CheckCircle, Clock, Star, Youtube, MessageSquare, MapPin, Sparkles } from 'lucide-react';

interface SearchResult {
  success: boolean;
  query: string;
  type: string;
  results: any;
  timestamp: string;
}

interface QuickSearchResult {
  molecules: string[];
  conditions: string[];
  symptoms: string[];
  remedies: string[];
}

export default function MedicalSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [quickResults, setQuickResults] = useState<QuickSearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showQuickResults, setShowQuickResults] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [language, setLanguage] = useState<'fr' | 'en' | 'es'>('fr');

  // Recherche rapide (autocomplétion)
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const timeoutId = setTimeout(async () => {
        try {
          const response = await fetch('/api/medical-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: searchQuery, type: 'quick' })
          });
          
          if (response.ok) {
            const data = await response.json();
            setQuickResults(data.results);
            setShowQuickResults(true);
          }
        } catch (error) {
          console.error('Erreur recherche rapide:', error);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setShowQuickResults(false);
      setQuickResults(null);
    }
  }, [searchQuery]);

  // Recherche complète
  const handleSearch = async (query: string = searchQuery) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setShowQuickResults(false);

    try {
      const response = await fetch('/api/medical-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, type: 'full' })
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        
        // Ajouter à l'historique
        if (!searchHistory.includes(query)) {
          setSearchHistory(prev => [query, ...prev.slice(0, 9)]);
        }
      } else {
        console.error('Erreur recherche complète');
      }
    } catch (error) {
      console.error('Erreur recherche:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'Très élevée': return 'text-green-600 bg-green-50';
      case 'Élevée': return 'text-blue-600 bg-blue-50';
      case 'Modérée': return 'text-yellow-600 bg-yellow-50';
      case 'Faible': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case 'Sûr': return 'text-green-600 bg-green-50';
      case 'Précautions': return 'text-yellow-600 bg-yellow-50';
      case 'Surveillance médicale': return 'text-orange-600 bg-orange-50';
      case 'Risqué': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const translations = {
    fr: {
      title: 'Moteur de Recherche Médicale Universel',
      subtitle: 'Recherchez des molécules, remèdes naturels, exercices et vidéos thérapeutiques',
      searchPlaceholder: 'Rechercher une molécule, condition, symptôme...',
      searchButton: 'Rechercher',
      molecules: 'Molécules',
      conditions: 'Conditions',
      treatments: 'Traitements',
      exercises: 'Exercices',
      youtubeVideos: 'Vidéos YouTube',
      grandmaRemedies: 'Remèdes de Grand-mère',
      orientalMedicine: 'Médecine Orientale',
      recipes: 'Recettes',
      positions: 'Positions',
      comparisons: 'Comparaisons',
      suggestions: 'Suggestions',
      relatedQueries: 'Recherches liées',
      searchHistory: 'Historique des recherches',
      effectiveness: 'Efficacité',
      safety: 'Sécurité',
      sideEffects: 'Effets secondaires',
      duration: 'Durée',
      cost: 'Coût',
      recommendation: 'Recommandation',
      watchVideo: 'Regarder la vidéo',
      viewRecipe: 'Voir la recette',
      tryExercise: 'Essayer l\'exercice'
    },
    en: {
      title: 'Universal Medical Search Engine',
      subtitle: 'Search for molecules, natural remedies, exercises and therapeutic videos',
      searchPlaceholder: 'Search for a molecule, condition, symptom...',
      searchButton: 'Search',
      molecules: 'Molecules',
      conditions: 'Conditions',
      treatments: 'Treatments',
      exercises: 'Exercises',
      youtubeVideos: 'YouTube Videos',
      grandmaRemedies: 'Grandma Remedies',
      orientalMedicine: 'Oriental Medicine',
      recipes: 'Recipes',
      positions: 'Positions',
      comparisons: 'Comparisons',
      suggestions: 'Suggestions',
      relatedQueries: 'Related Queries',
      searchHistory: 'Search History',
      effectiveness: 'Effectiveness',
      safety: 'Safety',
      sideEffects: 'Side Effects',
      duration: 'Duration',
      cost: 'Cost',
      recommendation: 'Recommendation',
      watchVideo: 'Watch Video',
      viewRecipe: 'View Recipe',
      tryExercise: 'Try Exercise'
    },
    es: {
      title: 'Motor de Búsqueda Médica Universal',
      subtitle: 'Busca moléculas, remedios naturales, ejercicios y videos terapéuticos',
      searchPlaceholder: 'Buscar una molécula, condición, síntoma...',
      searchButton: 'Buscar',
      molecules: 'Moléculas',
      conditions: 'Condiciones',
      treatments: 'Tratamientos',
      exercises: 'Ejercicios',
      youtubeVideos: 'Videos de YouTube',
      grandmaRemedies: 'Remedios de la Abuela',
      orientalMedicine: 'Medicina Oriental',
      recipes: 'Recetas',
      positions: 'Posiciones',
      comparisons: 'Comparaciones',
      suggestions: 'Sugerencias',
      relatedQueries: 'Consultas Relacionadas',
      searchHistory: 'Historial de Búsqueda',
      effectiveness: 'Efectividad',
      safety: 'Seguridad',
      sideEffects: 'Efectos Secundarios',
      duration: 'Duración',
      cost: 'Costo',
      recommendation: 'Recomendación',
      watchVideo: 'Ver Video',
      viewRecipe: 'Ver Receta',
      tryExercise: 'Probar Ejercicio'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900">Recherche Médicale</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'fr' | 'en' | 'es')}
                className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Titre et description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.searchPlaceholder}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-full text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white"
            />
            <button
              onClick={() => handleSearch()}
              disabled={isSearching || !searchQuery.trim()}
              className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSearching ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  {t.searchButton}
                </>
              )}
            </button>
          </div>

          {/* Résultats de recherche rapide */}
          {showQuickResults && quickResults && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
              {quickResults.molecules.length > 0 && (
                <div className="p-3">
                  <div className="flex items-center mb-2">
                    <Pill className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="font-medium text-gray-700">Molécules</span>
                  </div>
                  {quickResults.molecules.map((molecule, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(molecule);
                        handleSearch(molecule);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
                    >
                      {molecule}
                    </button>
                  ))}
                </div>
              )}
              
              {quickResults.conditions.length > 0 && (
                <div className="p-3 border-t">
                  <div className="flex items-center mb-2">
                    <Heart className="w-4 h-4 text-red-600 mr-2" />
                    <span className="font-medium text-gray-700">Conditions</span>
                  </div>
                  {quickResults.conditions.map((condition, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(condition);
                        handleSearch(condition);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              )}

              {quickResults.symptoms.length > 0 && (
                <div className="p-3 border-t">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="font-medium text-gray-700">Symptômes</span>
                  </div>
                  {quickResults.symptoms.map((symptom, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(symptom);
                        handleSearch(symptom);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Historique des recherches */}
        {searchHistory.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{t.searchHistory}</h3>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((query, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(query);
                    handleSearch(query);
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Résultats de recherche */}
        {searchResults && searchResults.results && searchResults.results.results && (
          <div className="space-y-8">
            {/* Molécules */}
            {searchResults.results.results.molecules && (searchResults.results.results.molecules.vidal?.length > 0 || searchResults.results.results.molecules.alternatives?.length > 0) && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Pill className="w-6 h-6 text-blue-600 mr-3" />
                  {t.molecules}
                </h2>
                
                {searchResults.results.results.molecules.vidal?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Médicaments Conventionnels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.results.results.molecules.vidal.map((molecule: any, index: number) => (
                        <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">{molecule.name}</h4>
                          <p className="text-sm text-blue-700 mb-2">{molecule.category}</p>
                          <p className="text-xs text-blue-600">{molecule.mechanismOfAction.substring(0, 100)}...</p>
                          <div className="mt-2">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {molecule.scientificEvidence} évidence
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.results.results.molecules.alternatives?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Médecines Alternatives</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.results.results.molecules.alternatives.map((medicine: any, index: number) => (
                        <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2">{medicine.name}</h4>
                          <p className="text-sm text-green-700 mb-2">{medicine.category}</p>
                          <p className="text-xs text-green-600">{medicine.description.substring(0, 100)}...</p>
                          <div className="mt-2 flex gap-2">
                            <span className={`text-xs px-2 py-1 rounded ${getEffectivenessColor(medicine.scientificEvidence)}`}>
                              {medicine.scientificEvidence} évidence
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${getSafetyColor(medicine.safety)}`}>
                              {medicine.safety}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Comparaisons */}
            {searchResults.results.results.comparisons?.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="w-6 h-6 text-yellow-600 mr-3" />
                  {t.comparisons}
                </h2>
                
                {searchResults.results.results.comparisons.map((comparison: any, index: number) => (
                  <div key={index} className="mb-6 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{comparison.condition}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Conventionnel */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                          <Pill className="w-4 h-4 mr-2" />
                          Conventionnel
                        </h4>
                        <p className="font-medium text-blue-800 mb-2">{comparison.conventional.name}</p>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Efficacité:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${getEffectivenessColor(comparison.conventional.effectiveness)}`}>
                              {comparison.conventional.effectiveness}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Sécurité:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${getSafetyColor(comparison.conventional.safety)}`}>
                              {comparison.conventional.safety}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Coût:</span>
                            <span className="ml-2 text-blue-600">{comparison.conventional.cost}</span>
                          </div>
                          <div>
                            <span className="font-medium">Durée:</span>
                            <span className="ml-2 text-blue-600">{comparison.conventional.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Naturel */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                          <Leaf className="w-4 h-4 mr-2" />
                          Naturel
                        </h4>
                        <p className="font-medium text-green-800 mb-2">{comparison.natural.name}</p>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Efficacité:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${getEffectivenessColor(comparison.natural.effectiveness)}`}>
                              {comparison.natural.effectiveness}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Sécurité:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${getSafetyColor(comparison.natural.safety)}`}>
                              {comparison.natural.safety}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Coût:</span>
                            <span className="ml-2 text-green-600">{comparison.natural.cost}</span>
                          </div>
                          <div>
                            <span className="font-medium">Durée:</span>
                            <span className="ml-2 text-green-600">{comparison.natural.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Traditionnel */}
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                          <Globe className="w-4 h-4 mr-2" />
                          Traditionnel
                        </h4>
                        <p className="font-medium text-purple-800 mb-2">{comparison.traditional.name}</p>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Efficacité:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${getEffectivenessColor(comparison.traditional.effectiveness)}`}>
                              {comparison.traditional.effectiveness}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Sécurité:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${getSafetyColor(comparison.traditional.safety)}`}>
                              {comparison.traditional.safety}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Coût:</span>
                            <span className="ml-2 text-purple-600">{comparison.traditional.cost}</span>
                          </div>
                          <div>
                            <span className="font-medium">Durée:</span>
                            <span className="ml-2 text-purple-600">{comparison.traditional.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recommandation */}
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">💡 Recommandation</h4>
                      <p className="text-yellow-800">{comparison.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Vidéos YouTube */}
            {searchResults.results.results.youtubeVideos && (
              Object.values(searchResults.results.results.youtubeVideos).some((videos: any) => videos?.length > 0) && (
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Youtube className="w-6 h-6 text-red-600 mr-3" />
                    {t.youtubeVideos}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {searchResults.results.results.youtubeVideos.explanation?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Explications</h3>
                        <div className="space-y-2">
                          {searchResults.results.results.youtubeVideos.explanation.map((video: string, index: number) => (
                            <a
                              key={index}
                              href={video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <div className="flex items-center">
                                <Play className="w-4 h-4 text-red-600 mr-2" />
                                <span className="text-sm text-gray-700">Vidéo d'explication {index + 1}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.results.results.youtubeVideos.exercises?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">🏃‍♂️ Exercices</h3>
                        <div className="space-y-2">
                          {searchResults.results.results.youtubeVideos.exercises.map((video: string, index: number) => (
                            <a
                              key={index}
                              href={video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <div className="flex items-center">
                                <Activity className="w-4 h-4 text-green-600 mr-2" />
                                <span className="text-sm text-gray-700">{t.tryExercise} {index + 1}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}

            {/* Remèdes de grand-mère */}
            {searchResults.results.results.grandmaRemedies?.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 text-orange-600 mr-3" />
                  {t.grandmaRemedies}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.results.results.grandmaRemedies.map((remedy: string, index: number) => (
                    <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <MessageSquare className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-orange-800">{remedy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recettes */}
            {searchResults.results.results.recipes?.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
                  {t.recipes}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.results.results.recipes.map((recipe: string, index: number) => (
                    <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <BookOpen className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-purple-800">{recipe}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Positions */}
            {searchResults.results.results.positions?.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 text-indigo-600 mr-3" />
                  {t.positions}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.results.results.positions.map((position: string, index: number) => (
                    <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-indigo-800">{position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {searchResults.results.suggestions?.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.suggestions}</h2>
                
                <div className="flex flex-wrap gap-3">
                  {searchResults.results.suggestions.map((suggestion: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        handleSearch(suggestion);
                      }}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
