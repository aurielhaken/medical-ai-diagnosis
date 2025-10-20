"use client";

import React, { useState } from 'react';

export default function MobilePage() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);

  // Multilingual content
  const translations = {
    fr: {
      appTitle: "MyDoc-AI",
      appSubtitle: "Intelligence Médicale",
      mainTitle: "Diagnostic Médical",
      mainSubtitle: "Décrivez vos symptômes et obtenez un diagnostic préliminaire",
      searchPlaceholder: "Décrivez vos symptômes...",
      searchButton: "Rechercher",
      exampleText: "Exemple : J'ai de la fièvre et des maux de tête",
      featuresTitle: "Fonctionnalités",
      chatTitle: "Chat Médical IA",
      chatDescription: "Posez vos questions de santé à tout moment. Notre IA médicale vous répond 24/7 avec des réponses personnalisées et précises.",
      diagnosisTitle: "Diagnostic Intelligent",
      diagnosisDescription: "Analysez vos symptômes avec notre IA avancée. Obtenez un diagnostic préliminaire avec des recommandations personnalisées.",
      dictionaryTitle: "Dictionnaire Médical",
      dictionaryDescription: "Consultez notre base de données médicale complète. Termes, définitions et explications claires pour mieux comprendre votre santé.",
      startChat: "Commencer le chat",
      analyzeSymptoms: "Analyser mes symptômes",
      exploreDictionary: "Explorer le dictionnaire"
    },
    en: {
      appTitle: "MyDoc-AI",
      appSubtitle: "Medical Intelligence",
      mainTitle: "Medical Diagnosis",
      mainSubtitle: "Describe your symptoms and get a preliminary diagnosis",
      searchPlaceholder: "Describe your symptoms...",
      searchButton: "Search",
      exampleText: "Example: I have fever and headaches",
      featuresTitle: "Features",
      chatTitle: "AI Medical Chat",
      chatDescription: "Ask your health questions anytime. Our medical AI responds 24/7 with personalized and accurate answers.",
      diagnosisTitle: "Intelligent Diagnosis",
      diagnosisDescription: "Analyze your symptoms with our advanced AI. Get a preliminary diagnosis with personalized recommendations.",
      dictionaryTitle: "Medical Dictionary",
      dictionaryDescription: "Consult our complete medical database. Terms, definitions and clear explanations to better understand your health.",
      startChat: "Start chat",
      analyzeSymptoms: "Analyze my symptoms",
      exploreDictionary: "Explore dictionary"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

  const switchLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Veuillez décrire vos symptômes avant de rechercher.');
      return;
    }
    
    setIsSearching(true);
    
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
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      setDiagnosis(data);
    } catch (error) {
      console.error('Erreur API:', error);
      alert('Erreur lors de l\'analyse. Veuillez réessayer.');
    } finally {
      setIsSearching(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg p-4 flex justify-between items-center z-50 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-xl border-2 border-white/20">
            🏥
          </div>
          <div className="text-lg font-bold text-cyan-100">MyDoc-AI</div>
        </div>
        <div className="flex gap-4 items-center">
          <select 
            onChange={(e) => switchLanguage(e.target.value)}
            className="bg-transparent text-white border border-white/30 rounded-md px-3 py-1 text-sm"
          >
            <option value="fr">🇫🇷 FR</option>
            <option value="en">🇺🇸 EN</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section */}
        <div className="text-center px-5 py-16">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl inline-flex items-center justify-center text-white text-4xl mb-5 border-3 border-white/20 shadow-lg shadow-blue-500/30">
              🏥
            </div>
            <h1 className="text-5xl font-bold text-cyan-100 mb-3 text-shadow-lg">{t.appTitle}</h1>
            <p className="text-lg text-white/80">{t.appSubtitle}</p>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 text-shadow-lg">{t.mainTitle}</h2>
          <p className="text-lg text-white/90 mb-10 leading-relaxed">{t.mainSubtitle}</p>
          
          <div className="max-w-2xl mx-auto relative flex bg-white/10 rounded-full p-2 backdrop-blur-lg border border-white/20 shadow-xl shadow-black/30">
            <input
              type="text"
              className="flex-1 bg-transparent text-white text-base px-5 py-4 outline-none placeholder-white/60"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-full px-6 py-4 text-white text-base font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
            >
              <span className="text-lg">{isSearching ? '⏳' : '🔍'}</span>
              <span>{isSearching ? 'Analyse...' : t.searchButton}</span>
            </button>
          </div>
          
          <p className="text-white/70 text-sm mt-4">{t.exampleText}</p>
        </div>

        {/* Diagnosis Results */}
        {diagnosis && (
          <div className="px-5 py-8">
            <div className="max-w-4xl mx-auto bg-white/10 rounded-2xl p-8 backdrop-blur-lg border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl">🏥</span>
                <span className="text-2xl font-bold text-cyan-100">Analyse Médicale IA</span>
                <span className="text-white/70 text-sm">{new Date().toLocaleDateString('fr-FR')}</span>
              </div>
              
              <div className="space-y-6">
                {diagnosis.diagnosis && diagnosis.diagnosis.map((diag: any, index: number) => (
                  <div key={index} className="bg-white/5 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-cyan-100">{diag.condition}</h3>
                      <span className="text-2xl font-bold text-purple-400" style={{color: '#1e40af'}}>
                        {Math.round(diag.probability * 100)}%
                      </span>
                    </div>
                    <p className="text-white/90 mb-4">{diag.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-cyan-100">Recommandations :</h4>
                      {diag.recommendations && diag.recommendations.map((rec: string, recIndex: number) => (
                        <div key={recIndex} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <span className="text-green-400 text-lg">✅</span>
                          <span className="text-white/90">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="px-5 py-16 bg-white/5">
          <h2 className="text-3xl font-bold text-cyan-100 text-center mb-12">{t.featuresTitle}</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 text-center backdrop-blur-lg border border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:bg-white/15 hover:shadow-xl hover:shadow-black/30 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1 rounded-full text-xs font-bold">
                NEW!
              </div>
              <div className="text-5xl mb-5">💬</div>
              <h3 className="text-2xl font-bold text-cyan-100 mb-4">{t.chatTitle}</h3>
              <p className="text-white/80 leading-relaxed mb-6">{t.chatDescription}</p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-full px-6 py-3 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5">
                {t.startChat}
              </button>
            </div>
            
            <div 
              onClick={handleSearch}
              className="bg-white/10 rounded-2xl p-8 text-center backdrop-blur-lg border border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:bg-white/15 hover:shadow-xl hover:shadow-black/30 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                HOT!
              </div>
              <div className="text-5xl mb-5">🔍</div>
              <h3 className="text-2xl font-bold text-cyan-100 mb-4">{t.diagnosisTitle}</h3>
              <p className="text-white/80 leading-relaxed mb-6">{t.diagnosisDescription}</p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-full px-6 py-3 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5">
                {t.analyzeSymptoms}
              </button>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-8 text-center backdrop-blur-lg border border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:bg-white/15 hover:shadow-xl hover:shadow-black/30 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                TRY NOW!
              </div>
              <div className="text-5xl mb-5">📚</div>
              <h3 className="text-2xl font-bold text-cyan-100 mb-4">{t.dictionaryTitle}</h3>
              <p className="text-white/80 leading-relaxed mb-6">{t.dictionaryDescription}</p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-full px-6 py-3 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5">
                {t.exploreDictionary}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}