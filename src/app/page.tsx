'use client';

import { useState } from 'react';
import { Search, Stethoscope, AlertTriangle, CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Effets de fond animés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-40 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header Ultra Premium */}
      <header className="relative z-10 flex justify-between items-center p-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl">
            <Stethoscope className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MyDoc-AI
            </h2>
            <p className="text-sm text-gray-600 font-medium">Intelligence Médicale</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl px-6 py-3 shadow-lg">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'fr' | 'en' | 'es')}
              className="bg-transparent text-gray-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="fr" className="bg-white text-gray-700">🇫🇷 Français</option>
              <option value="en" className="bg-white text-gray-700">🇺🇸 English</option>
              <option value="es" className="bg-white text-gray-700">🇪🇸 Español</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content - Style Ultra Premium */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 py-12">
        
        {/* Hero Section Ultra Premium */}
        <div className="text-center mb-16 animate-fade-in">
          {/* Logo Ultra Premium */}
          <div className="flex items-center justify-center mb-12">
            <div className="relative group">
              {/* Effet de lueur externe multiple */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-all duration-700 animate-glow"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-700 animate-glow delay-300"></div>
              
              {/* Conteneur principal du logo */}
              <div className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 p-12 rounded-full shadow-2xl transform group-hover:scale-110 transition-all duration-700 border-4 border-white/30 backdrop-blur-sm">
                {/* Icône stéthoscope avec effet 3D ultra */}
                <div className="relative">
                  <Stethoscope className="w-24 h-24 text-white drop-shadow-2xl" strokeWidth={2.5} />
                  
                  {/* Effet de brillance multiple */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full blur-sm"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
                </div>
                
                {/* Texte "AI" ultra stylisé */}
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white text-sm font-black px-3 py-2 rounded-full border-2 border-white/60 shadow-2xl animate-pulse">
                  AI
                </div>
              </div>
              
              {/* Particules flottantes ultra */}
              <div className="absolute -top-4 -left-4 w-4 h-4 bg-cyan-400 rounded-full animate-particle-float shadow-lg"></div>
              <div className="absolute -top-2 -right-5 w-3 h-3 bg-purple-400 rounded-full animate-particle-float shadow-lg" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-particle-float shadow-lg" style={{ animationDelay: '2s' }}></div>
              <div className="absolute -bottom-3 -right-2 w-4 h-4 bg-cyan-300 rounded-full animate-particle-float shadow-lg" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Particules supplémentaires ultra */}
              <div className="absolute top-6 -left-6 w-2 h-2 bg-white rounded-full animate-particle-float shadow-lg" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-8 -right-8 w-2 h-2 bg-white rounded-full animate-particle-float shadow-lg" style={{ animationDelay: '2.5s' }}></div>
              <div className="absolute -bottom-6 left-6 w-2 h-2 bg-white rounded-full animate-particle-float shadow-lg" style={{ animationDelay: '3s' }}></div>
            </div>
          </div>
          
          {/* Titre principal ultra */}
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-2xl" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
            MyDoc-AI
          </h1>
          
          {/* Sous-titre ultra */}
          <p className="text-2xl md:text-3xl font-bold max-w-4xl text-center leading-relaxed text-gray-800 drop-shadow-lg" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Search Bar Ultra Premium */}
        <div className="w-full max-w-4xl mb-8 animate-fade-in-up">
          <div className="flex items-center space-x-4">
            {/* Barre de recherche séparée */}
            <div className="flex-1 relative group">
              {/* Effet de lueur autour de la barre de recherche */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl p-2 shadow-2xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-8 pr-8 py-8 bg-transparent text-gray-800 text-2xl placeholder-gray-500 focus:outline-none font-medium"
                  style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}
                />
              </div>
            </div>
            
            {/* Bouton d'analyse séparé */}
            <button
              type="button"
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="px-8 py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-black text-xl rounded-3xl hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:hover:scale-100 min-w-[200px] flex items-center justify-center space-x-3"
              style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}
            >
              <Search className="h-6 w-6" />
              {isSearching ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent mr-3"></div>
                  <span>Analyse...</span>
                </div>
              ) : (
                <span>Analyser</span>
              )}
            </button>
          </div>
        </div>

        {/* Example Ultra Premium */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl px-8 py-4 mb-16 shadow-lg">
          <p className="text-lg md:text-xl font-medium text-gray-700 text-center" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
            {t.example}
          </p>
        </div>

        {/* Diagnostic Results Ultra Premium */}
        {diagnosis && (
          <div className="w-full max-w-5xl bg-white/95 backdrop-blur-2xl border border-gray-200 rounded-3xl shadow-2xl p-10 md:p-12 mt-16 animate-fade-in-up">
            {/* En-tête du diagnostic ultra */}
            <div className="mb-10 pb-8 border-b border-gray-300">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-gray-800 drop-shadow-lg" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                    {diagnosis.condition}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-3 bg-blue-100 px-6 py-3 rounded-full border border-blue-200">
                      <span className="text-2xl font-black text-blue-800" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>{diagnosis.probability}%</span>
                      <span className="text-lg font-bold text-blue-700" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>Probabilité</span>
                    </div>
                    <span className={`px-6 py-3 rounded-full text-lg font-black border-2 ${
                      diagnosis.urgency === 'critical' ? 'bg-red-100 border-red-400 text-red-800' :
                      diagnosis.urgency === 'high' ? 'bg-orange-100 border-orange-400 text-orange-800' :
                      diagnosis.urgency === 'medium' ? 'bg-yellow-100 border-yellow-400 text-yellow-800' :
                      'bg-green-100 border-green-400 text-green-800'
                    }`} style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                      {diagnosis.urgency === 'critical' ? '🚨 Urgent' :
                       diagnosis.urgency === 'high' ? '⚠️ Élevé' :
                       diagnosis.urgency === 'medium' ? '⏱️ Modéré' : '✅ Faible'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description ultra */}
            <div className="mb-10">
              <h3 className="text-2xl font-black mb-4 text-gray-800 flex items-center" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                <span className="mr-3">📋</span>
                Description
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <p className="text-xl leading-relaxed font-medium text-gray-700">
                  {diagnosis.description}
                </p>
              </div>
            </div>
            
            {/* Recommandations ultra */}
            {diagnosis.recommendations && diagnosis.recommendations.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-black mb-6 text-gray-800 flex items-center">
                  <span className="mr-3">💊</span>
                  Recommandations
                </h3>
                <ul className="space-y-4">
                  {diagnosis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start bg-green-50 p-6 rounded-2xl border border-green-200 hover:bg-green-100 transition-all duration-300">
                      <CheckCircle className="w-7 h-7 mr-4 mt-1 flex-shrink-0 text-green-600" />
                      <span className="text-lg font-medium text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Avertissement ultra */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-2xl p-8">
              <div className="flex items-start">
                <AlertTriangle className="w-8 h-8 mr-4 mt-1 flex-shrink-0 text-yellow-600" />
                <p className="text-lg font-medium leading-relaxed text-gray-700">{t.disclaimer}</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer Ultra Premium */}
      <footer className="relative z-10 mt-auto py-12 text-center">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl px-8 py-6 max-w-2xl mx-auto shadow-lg">
          <p className="text-xl font-bold text-gray-800">
            {t.poweredBy}
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-600">
            <span>🔒 Sécurisé</span>
            <span>⚡ Rapide</span>
            <span>🎯 Précis</span>
          </div>
        </div>
      </footer>
    </div>
  );
}