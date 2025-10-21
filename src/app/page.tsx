'use client';

import { useState } from 'react';
import { Search, Stethoscope, AlertTriangle, CheckCircle } from 'lucide-react';

// FORCE RENDER - Interface bleu roi moderne
const FORCE_UPDATE = Date.now() + Math.random();

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
  }
};

export default function MyDocAI() {
  const [language, setLanguage] = useState<'fr' | 'en' | 'es'>('fr');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  
  const t = translations[language];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setDiagnosis(null);
    
    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: [searchQuery],
          doctorId: 'mydoc-ai'
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSearching) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div key={FORCE_UPDATE} className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Effets de fond animés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-400/30 rounded-full blur-2xl animate-float delay-700"></div>
      </div>

      {/* Header Ultra Premium */}
      <header className="relative z-10 flex justify-between items-center p-8">
        {/* Logo MyDoc-AI Ultra Moderne */}
        <div className="flex items-center space-x-6">
          <div className="relative group">
            {/* Effet de lueur externe */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-700"></div>
            
            {/* Conteneur principal */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
              {/* Icône cerveau moderne */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full relative">
                  <div className="absolute inset-2 bg-white/20 rounded-full"></div>
                  <div className="absolute top-1 left-1 w-2 h-3 bg-white/40 rounded-full"></div>
                  <div className="absolute top-1 right-1 w-2 h-3 bg-white/40 rounded-full"></div>
                  <div className="absolute bottom-1 left-2 w-3 h-2 bg-white/40 rounded-full"></div>
                  <div className="absolute bottom-1 right-2 w-3 h-2 bg-white/40 rounded-full"></div>
                </div>
              </div>
              
              {/* Badge AI */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-black px-2 py-1 rounded-full">
                AI
              </div>
            </div>
          </div>
          
          {/* Texte du logo */}
          <div className="relative">
            <h1 className="text-4xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-lg" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              MyDoc-AI
            </h1>
            <p className="text-lg font-bold text-cyan-200 drop-shadow-lg" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              Intelligence Médicale
            </p>
          </div>
        </div>
        
        {/* Sélecteur de langue */}
        <div className="flex items-center space-x-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-lg">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'fr' | 'en' | 'es')}
              className="bg-transparent font-bold focus:outline-none cursor-pointer text-white"
              style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}
            >
              <option value="fr" className="bg-slate-800 text-white">🇫🇷 Français</option>
              <option value="en" className="bg-slate-800 text-white">🇺🇸 English</option>
              <option value="es" className="bg-slate-800 text-white">🇪🇸 Español</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content - Style Ultra Premium */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 py-12">
        
        {/* Hero Section Ultra Moderne */}
        <div className="text-center mb-16 animate-fade-in">
          {/* Titre principal ultra moderne */}
            <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-8 tracking-tight drop-shadow-2xl" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              MyDoc-AI
            </h1>
          
          {/* Sous-titre ultra moderne */}
          <p className="text-2xl md:text-3xl font-bold max-w-4xl text-center leading-relaxed text-cyan-100 drop-shadow-lg mb-12" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Search Bar Ultra Moderne */}
        <div className="w-full max-w-4xl mb-8 animate-fade-in-up">
          <div className="flex items-center space-x-4">
            {/* Barre de recherche ultra moderne */}
            <div className="flex-1 relative group">
              {/* Effet de lueur */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-8 pr-8 py-8 bg-transparent text-2xl focus:outline-none font-medium text-white placeholder-white/60"
                  style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}
                />
              </div>
            </div>
            
            {/* Bouton d'analyse ultra moderne */}
            <button
              type="button"
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="px-8 py-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-black text-xl rounded-3xl hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:hover:scale-100 min-w-[200px] flex items-center justify-center space-x-3"
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

        {/* Example Ultra Moderne */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-4 mb-8 shadow-lg">
          <p className="text-lg md:text-xl font-medium text-center text-white/80" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
            {t.example}
          </p>
        </div>

        {/* Diagnostic Results Ultra Modernes */}
        {diagnosis && (
          <div className="w-full max-w-5xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 md:p-12 mt-16 animate-fade-in-up">
            {/* En-tête du diagnostic ultra moderne */}
            <div className="mb-10 pb-8 border-b border-white/20">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight drop-shadow-lg text-white" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                    {diagnosis.condition}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl px-6 py-3 rounded-full border border-cyan-400/30">
                      <span className="text-2xl font-black text-cyan-300" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>{diagnosis.probability}%</span>
                      <span className="text-lg font-bold text-cyan-200" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>Probabilité</span>
                    </div>
                    <span className={`px-6 py-3 rounded-full text-lg font-black border-2 ${
                      diagnosis.urgency === 'critical' ? 'bg-red-500/20 border-red-400/50 text-red-300' :
                      diagnosis.urgency === 'high' ? 'bg-orange-500/20 border-orange-400/50 text-orange-300' :
                      diagnosis.urgency === 'medium' ? 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300' :
                      'bg-green-500/20 border-green-400/50 text-green-300'
                    }`} style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                      {diagnosis.urgency === 'critical' ? '🚨 Urgent' :
                       diagnosis.urgency === 'high' ? '⚠️ Élevé' :
                       diagnosis.urgency === 'medium' ? '⏱️ Modéré' : '✅ Faible'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description ultra moderne */}
            <div className="mb-10">
              <h3 className="text-2xl font-black mb-4 flex items-center text-white" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                <span className="mr-3">📋</span>
                Description
              </h3>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <p className="text-xl leading-relaxed font-medium text-white/90">
                  {diagnosis.description}
                </p>
              </div>
            </div>
            
            {/* Recommandations ultra modernes */}
            {diagnosis.recommendations && diagnosis.recommendations.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-black mb-6 flex items-center text-white" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                  <span className="mr-3">💊</span>
                  Recommandations
                </h3>
                <ul className="space-y-4">
                  {diagnosis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl p-6 rounded-2xl border border-green-400/20 hover:bg-green-500/20 transition-all duration-300">
                      <CheckCircle className="w-7 h-7 mr-4 mt-1 flex-shrink-0 text-green-400" />
                      <span className="text-lg font-medium text-white/90">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Avertissement ultra moderne */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-400/20 rounded-2xl p-8">
              <div className="flex items-start">
                <AlertTriangle className="w-8 h-8 mr-4 mt-1 flex-shrink-0 text-yellow-400" />
                <p className="text-lg font-medium leading-relaxed text-white/90">{t.disclaimer}</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer Ultra Moderne */}
      <footer className="relative z-10 mt-auto py-12 text-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-6 max-w-2xl mx-auto shadow-lg">
          <p className="text-xl font-bold text-white" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
            {t.poweredBy}
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-white/80">
            <span>🔒 Sécurisé</span>
            <span>⚡ Rapide</span>
            <span>🎯 Précis</span>
          </div>
        </div>
      </footer>
    </div>
  );
}