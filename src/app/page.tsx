'use client';

import { useState } from 'react';
import { Search, Stethoscope, AlertTriangle, CheckCircle, Clock, Languages } from 'lucide-react';

interface Diagnosis {
  condition: string;
  probability: number;
  description: string;
  symptoms: string[];
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  aiMode?: string;
}

const translations = {
  fr: {
    title: 'MyDoc-AI',
    subtitle: 'Décrivez vos symptômes et obtenez un diagnostic préliminaire',
    searchPlaceholder: 'Écrivez vos symptômes...',
    example: 'Exemple : J\'ai de la fièvre et des maux de tête',
    disclaimer: 'Ce service fournit des informations médicales à titre informatif uniquement. Consultez toujours un professionnel de santé.',
    poweredBy: 'Propulsé par MyDoc-AI'
  },
  en: {
    title: 'MyDoc-AI',
    subtitle: 'Describe your symptoms and get a preliminary diagnosis',
    searchPlaceholder: 'Write your symptoms...',
    example: 'Example: I have fever and headache',
    disclaimer: 'This service provides medical information for informational purposes only. Always consult a healthcare professional.',
    poweredBy: 'Powered by MyDoc-AI'
  },
  es: {
    title: 'MyDoc-AI',
    subtitle: 'Describe tus síntomas y obtén un diagnóstico preliminar',
    searchPlaceholder: 'Escribe tus síntomas...',
    example: 'Ejemplo: Tengo fiebre y dolor de cabeza',
    disclaimer: 'Este servicio proporciona información médica solo con fines informativos. Consulte siempre a un profesional de la salud.',
    poweredBy: 'Impulsado por MyDoc-AI'
  }
};

export default function MyDocAI() {
  const [language, setLanguage] = useState<'fr' | 'en' | 'es'>('fr');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  
  const t = translations[language];

  // Fonction de recherche de symptômes
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: [searchQuery],
          doctorId: 'mydoc-ai',
          patientInfo: {
            age: 'Non spécifié',
            gender: 'Non spécifié'
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'analyse');
      }

      const data = await response.json();
      setDiagnosis(data);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      alert('Erreur lors de l\'analyse. Veuillez réessayer.');
    } finally {
      setIsSearching(false);
    }
  };

  // Gestion des touches
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSearching) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Simple */}
      <header className="flex justify-end items-center p-6">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'fr' | 'en' | 'es')}
          className="text-sm font-medium text-gray-700 hover:text-blue-600 bg-white border border-gray-200 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        >
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇺🇸 English</option>
          <option value="es">🇪🇸 Español</option>
        </select>
      </header>

      {/* Main Content - Style Premium */}
      <main className="flex flex-col items-center justify-center min-h-[85vh] px-6 py-12">
        
        {/* Logo Premium */}
        <div className="mb-12 animate-fade-in">
          <div className="flex flex-col items-center justify-center">
            {/* Logo Premium MyDoc-AI */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative group animate-float">
                {/* Effet de lueur externe */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-glow"></div>
                
                {/* Conteneur principal du logo */}
                <div className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 p-8 rounded-3xl shadow-2xl transform group-hover:scale-110 transition-all duration-500 border-4 border-white/20">
                  {/* Icône stéthoscope avec effet 3D */}
                  <div className="relative">
                    <Stethoscope className="w-20 h-20 text-white drop-shadow-2xl" strokeWidth={2.5} />
                    
                    {/* Effet de brillance sur l'icône */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full blur-sm"></div>
                  </div>
                  
                  {/* Texte "AI" intégré dans le logo */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-black px-2 py-1 rounded-full border-2 border-white/50 shadow-lg animate-pulse">
                    AI
                  </div>
                </div>
                
                {/* Particules flottantes autour du logo */}
                <div className="absolute -top-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full animate-particle-float"></div>
                <div className="absolute -top-1 -right-3 w-2 h-2 bg-purple-400 rounded-full animate-particle-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-particle-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-2 -right-1 w-3 h-3 bg-cyan-300 rounded-full animate-particle-float" style={{ animationDelay: '1.5s' }}></div>
                
                {/* Particules supplémentaires pour plus d'effet */}
                <div className="absolute top-4 -left-4 w-1 h-1 bg-white rounded-full animate-particle-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-6 -right-6 w-1.5 h-1.5 bg-white rounded-full animate-particle-float" style={{ animationDelay: '2.5s' }}></div>
                <div className="absolute -bottom-4 left-4 w-1 h-1 bg-white rounded-full animate-particle-float" style={{ animationDelay: '3s' }}></div>
              </div>
            </div>
            
            {/* Titre principal */}
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent mb-3 tracking-tight">
              MyDoc-AI
            </h1>
            
            {/* Sous-titre */}
            <p className="text-xl md:text-2xl font-bold max-w-2xl text-center leading-relaxed" style={{ color: '#000000' }}>
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Search Bar Premium */}
        <div className="w-full max-w-3xl mb-6 animate-fade-in-up">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
              <Search className="h-6 w-6 text-blue-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t.searchPlaceholder}
              className="block w-full pl-16 pr-6 py-6 border-2 border-gray-200 rounded-2xl text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-lg hover:shadow-xl transition-all bg-white"
            />
          </div>
          
          {/* Bouton séparé en gros plan */}
          <button
            type="button"
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="w-full mt-4 py-6 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-2xl rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:hover:scale-100"
          >
            {isSearching ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-7 w-7 border-3 border-white border-t-transparent mr-3"></div>
                <span>Analyse en cours...</span>
              </div>
            ) : (
              <span>🔍 Analyser mes symptômes</span>
            )}
          </button>
        </div>

        {/* Example */}
        <p className="text-base md:text-lg mb-12 font-black" style={{ color: '#000000' }}>{t.example}</p>

        {/* Diagnostic Results Premium */}
        {diagnosis && (
          <div className="w-full max-w-4xl bg-white border-2 border-gray-300 rounded-3xl shadow-2xl p-8 md:p-10 mt-12 animate-fade-in-up">
            {/* En-tête du diagnostic */}
            <div className="mb-8 pb-6 border-b-2 border-gray-400">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#000000' }}>
                    {diagnosis.condition}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full border-2 border-blue-400">
                      <span className="text-lg font-black" style={{ color: '#000000' }}>{diagnosis.probability}%</span>
                      <span className="text-sm font-black" style={{ color: '#000000' }}>Probabilité</span>
                    </div>
                    <span className={`px-5 py-2 rounded-full text-sm font-black border-2 ${
                      diagnosis.urgency === 'critical' ? 'bg-red-200 border-red-600' :
                      diagnosis.urgency === 'high' ? 'bg-orange-200 border-orange-600' :
                      diagnosis.urgency === 'medium' ? 'bg-yellow-200 border-yellow-600' :
                      'bg-green-200 border-green-600'
                    }`} style={{ color: '#000000' }}>
                      {diagnosis.urgency === 'critical' ? '🚨 Urgent' :
                       diagnosis.urgency === 'high' ? '⚠️ Élevé' :
                       diagnosis.urgency === 'medium' ? '⏱️ Modéré' : '✅ Faible'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-black mb-3" style={{ color: '#000000' }}>📋 Description</h3>
              <p className="text-lg leading-relaxed font-black" style={{ color: '#000000' }}>
                {diagnosis.description}
              </p>
            </div>
            
            {/* Recommandations */}
            {diagnosis.recommendations && diagnosis.recommendations.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-black mb-4" style={{ color: '#000000' }}>💊 Recommandations</h3>
                <ul className="space-y-3">
                  {diagnosis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start bg-green-50 p-4 rounded-xl border-2 border-green-400">
                      <CheckCircle className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#000000' }} />
                      <span className="text-base font-black" style={{ color: '#000000' }}>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Avertissement */}
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 border-2 border-yellow-600 rounded-2xl p-6">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 mr-3 mt-1 flex-shrink-0" style={{ color: '#000000' }} />
                <p className="text-base font-black leading-relaxed" style={{ color: '#000000' }}>{t.disclaimer}</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer Premium */}
      <footer className="mt-auto py-8 text-center">
        <p className="text-base font-bold" style={{ color: '#000000' }}>
          {t.poweredBy}
        </p>
      </footer>
    </div>
  );
}