'use client';

import { Stethoscope, Brain, Shield, AlertTriangle, Users, Clock, CheckCircle, Search, Languages, Menu, X } from 'lucide-react';
import { useState } from 'react';

// Système multilingue
const translations = {
  fr: {
    title: 'À propos de Google Medical',
    subtitle: 'Diagnostic médical automatique par IA',
    mission: 'Notre mission',
    missionText: 'Google Medical révolutionne l\'accès aux soins de santé en fournissant des diagnostics préliminaires rapides et précis grâce à l\'intelligence artificielle.',
    features: {
      ai: 'IA Avancée',
      doctors: 'Médecins Spécialisés',
      realtime: 'Temps Réel'
    },
    howItWorks: 'Comment ça marche ?',
    steps: {
      search: 'Recherche de symptômes',
      analyze: 'Analyse IA',
      results: 'Résultats instantanés'
    },
    disclaimer: 'Avertissements importants',
    disclaimerText: 'Ce service fournit des informations médicales à titre informatif uniquement. Consultez toujours un professionnel de santé.',
    poweredBy: 'Propulsé par l\'IA médicale'
  },
  en: {
    title: 'About Google Medical',
    subtitle: 'Automatic medical diagnosis by AI',
    mission: 'Our mission',
    missionText: 'Google Medical revolutionizes access to healthcare by providing fast and accurate preliminary diagnoses through artificial intelligence.',
    features: {
      ai: 'Advanced AI',
      doctors: 'Specialized Doctors',
      realtime: 'Real Time'
    },
    howItWorks: 'How it works?',
    steps: {
      search: 'Symptom search',
      analyze: 'AI analysis',
      results: 'Instant results'
    },
    disclaimer: 'Important warnings',
    disclaimerText: 'This service provides medical information for informational purposes only. Always consult a healthcare professional.',
    poweredBy: 'Powered by medical AI'
  },
  es: {
    title: 'Acerca de Google Médico',
    subtitle: 'Diagnóstico médico automático por IA',
    mission: 'Nuestra misión',
    missionText: 'Google Médico revoluciona el acceso a la atención médica proporcionando diagnósticos preliminares rápidos y precisos a través de inteligencia artificial.',
    features: {
      ai: 'IA Avanzada',
      doctors: 'Médicos Especializados',
      realtime: 'Tiempo Real'
    },
    howItWorks: '¿Cómo funciona?',
    steps: {
      search: 'Búsqueda de síntomas',
      analyze: 'Análisis IA',
      results: 'Resultados instantáneos'
    },
    disclaimer: 'Advertencias importantes',
    disclaimerText: 'Este servicio proporciona información médica solo con fines informativos. Consulte siempre a un profesional de la salud.',
    poweredBy: 'Impulsado por IA médica'
  }
};

export default function AboutPage() {
  const [language, setLanguage] = useState<'fr' | 'en' | 'es'>('fr');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      {/* Header Google Style */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <span className="ml-3 text-xl font-semibold text-gray-900">Google Medical</span>
                </div>
              </div>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Accueil
              </a>
              <a href="/about" className="text-blue-600 px-3 py-2 text-sm font-medium">
                À propos
              </a>
            </nav>

            {/* Language Selector & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="relative">
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
              
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
                Accueil
              </a>
              <a href="/about" className="block px-3 py-2 text-base font-medium text-blue-600">
                À propos
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-normal text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">{t.mission}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t.missionText}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-6 text-center">
            <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.features.ai}</h3>
            <p className="text-sm text-gray-600">Algorithmes d'apprentissage automatique pour l'analyse des symptômes</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-6 text-center">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.features.doctors}</h3>
            <p className="text-sm text-gray-600">Médecins IA avec des spécialisations différentes</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-6 text-center">
            <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.features.realtime}</h3>
            <p className="text-sm text-gray-600">Résultats en quelques secondes, 24h/24</p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-6">{t.howItWorks}</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t.steps.search}</h3>
                <p className="text-gray-600">Décrivez vos symptômes dans la barre de recherche</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t.steps.analyze}</h3>
                <p className="text-gray-600">Notre IA analyse vos symptômes et consulte sa base de données médicale</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t.steps.results}</h3>
                <p className="text-gray-600">Obtenez un diagnostic préliminaire avec recommandations et prochaines étapes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-yellow-800 mb-2">{t.disclaimer}</h3>
              <p className="text-yellow-700 text-sm">
                {t.disclaimerText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-blue-200/30 bg-blue-250/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-blue-700">
          <p className="mb-2">{t.poweredBy}</p>
          <div className="mb-4 p-4 bg-blue-150/50 border border-blue-300/40 rounded-lg">
            <p className="text-blue-800 font-medium mb-1">Créé par Auriel Group</p>
            <p className="text-blue-700">📞 +33 7 88 25 18 65</p>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="/" className="hover:text-blue-800">Accueil</a>
            <a href="/about" className="hover:text-blue-800">À propos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
