'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Stethoscope, Brain, CheckCircle, AlertTriangle, Clock, ArrowRight, RefreshCw, Wifi, WifiOff, Pill, Leaf, Activity, Heart, Sparkles, Globe, MessageSquare, MapPin, Search, Languages, Menu, X } from 'lucide-react';
import BodyMap from '@/components/BodyMap';

interface DiagnosisResult {
  level: 'reassuring' | 'priority' | 'urgent';
  advice: string;
  recommendations: string[];
  nextSteps: string[];
  estimatedTime: string;
  treatments?: TreatmentInfo;
  condition?: string;
  probability?: number;
  description?: string;
  rawData?: any;
}

interface Medication {
  molecule: string;
  dosage: string;
  frequency: string;
  duration: string;
  contraindications: string[];
  sideEffects: string[];
  category: 'OTC' | 'Prescription' | 'Natural' | 'Emergency';
}

interface TreatmentInfo {
  medications: Medication[];
  naturalRemedies: string[];
  lifestyleChanges: string[];
  emergencyActions: string[];
  consultationAdvice: string;
  followUpInstructions: string;
}

const symptomCategories = {
  'Général': [
    'Fatigue', 'Fièvre', 'Perte d\'appétit', 'Perte de poids', 'Gain de poids',
    'Sueurs nocturnes', 'Frissons', 'Malaise général'
  ],
  'Neurologique': [
    'Maux de tête', 'Vertiges', 'Étourdissements', 'Migraine', 'Raideur de la nuque',
    'Engourdissement', 'Picotements', 'Tremblements', 'Convulsions', 'Perte de conscience',
    'Troubles de la mémoire', 'Confusion'
  ],
  'Cardiovasculaire': [
    'Douleur thoracique', 'Essoufflement', 'Palpitations', 'Rythme cardiaque irrégulier',
    'Œdème des jambes', 'Hypertension', 'Hypotension'
  ],
  'Respiratoire': [
    'Toux', 'Expectorations', 'Dyspnée', 'Respiration sifflante',
    'Douleur thoracique', 'Saignements de nez'
  ],
  'Digestif': [
    'Nausées', 'Vomissements', 'Douleur abdominale', 'Diarrhée', 'Constipation',
    'Ballonnements', 'Reflux acide', 'Brûlures d\'estomac', 'Perte d\'appétit',
    'Sang dans les selles'
  ],
  'Musculo-squelettique': [
    'Douleur au dos', 'Douleur au cou', 'Douleur articulaire', 'Raideur musculaire',
    'Crampes', 'Faiblesse musculaire', 'Douleur au genou', 'Douleur à l\'épaule'
  ],
  'Peau': [
    'Éruption cutanée', 'Démangeaisons', 'Rougeurs', 'Sécheresse de la peau',
    'Boutons', 'Urticaire', 'Eczéma', 'Plaies qui ne guérissent pas'
  ],
  'Urogénital': [
    'Douleur urinaire', 'Fréquence urinaire', 'Urgence urinaire', 'Incontinence',
    'Sang dans les urines', 'Douleur pelvienne', 'Règles irrégulières'
  ],
  'Psychique': [
    'Anxiété', 'Dépression', 'Insomnie', 'Irritabilité', 'Sautes d\'humeur',
    'Stress', 'Difficultés de concentration', 'Perte de motivation'
  ]
};

const translations = {
  fr: {
    title: 'Diagnostic IA Universel',
    steps: {
      symptoms: 'Décrire vos symptômes',
      analysis: 'Analyse universelle', 
      results: 'Diagnostic complet'
    },
    symptoms: {
      title: 'Décrivez votre problème',
      subtitle: 'Sélectionnez les zones concernées et décrivez vos symptômes',
      bodyMap: 'Carte du corps',
      bodyMapSubtitle: 'Cliquez sur les zones douloureuses',
      symptoms: 'Symptômes détaillés',
      symptomsSubtitle: 'Ajoutez des symptômes spécifiques',
      comments: 'Vos commentaires',
      commentsPlaceholder: 'Décrivez votre problème en détail... Comment avez-vous commencé à vous sentir mal ? Qu\'est-ce qui aggrave ou améliore vos symptômes ?',
      selected: 'symptôme sélectionné',
      selectedPlural: 'symptômes sélectionnés',
      clearAll: 'Tout effacer',
      analyze: 'Analyser',
      selectAll: 'Tout sélectionner',
      deselectAll: 'Tout désélectionner'
    },
    analysis: {
      title: 'Analyse Universelle en cours...',
      subtitle: 'Notre IA analyse vos symptômes avec les médecines du monde entier'
    },
    results: {
      title: 'Diagnostic Universel Complet',
      subtitle: 'Analyse intégrative des médecines du monde',
      mainDiagnosis: 'Diagnostic Principal',
      condition: 'Condition identifiée',
      probability: 'Probabilité',
      recommendations: 'Recommandations',
      medications: 'Médicaments recommandés',
      naturalRemedies: 'Remèdes naturels',
      lifestyleChanges: 'Changements de mode de vie',
      emergencyActions: 'Actions d\'urgence',
      medicalAdvice: 'Conseil médical',
      newDiagnosis: 'Nouveau diagnostic'
    }
  },
  en: {
    title: 'Universal AI Diagnostic',
    steps: {
      symptoms: 'Describe your symptoms',
      analysis: 'Universal analysis',
      results: 'Complete diagnosis'
    },
    symptoms: {
      title: 'Describe your problem',
      subtitle: 'Select the affected areas and describe your symptoms',
      bodyMap: 'Body map',
      bodyMapSubtitle: 'Click on painful areas',
      symptoms: 'Detailed symptoms',
      symptomsSubtitle: 'Add specific symptoms',
      comments: 'Your comments',
      commentsPlaceholder: 'Describe your problem in detail... How did you start feeling unwell? What makes your symptoms worse or better?',
      selected: 'symptom selected',
      selectedPlural: 'symptoms selected',
      clearAll: 'Clear all',
      analyze: 'Analyze',
      selectAll: 'Select all',
      deselectAll: 'Deselect all'
    },
    analysis: {
      title: 'Universal Analysis in progress...',
      subtitle: 'Our AI analyzes your symptoms with medicines from around the world'
    },
    results: {
      title: 'Complete Universal Diagnostic',
      subtitle: 'Integrative analysis of world medicines',
      mainDiagnosis: 'Main Diagnosis',
      condition: 'Identified condition',
      probability: 'Probability',
      recommendations: 'Recommendations',
      medications: 'Recommended medications',
      naturalRemedies: 'Natural remedies',
      lifestyleChanges: 'Lifestyle changes',
      emergencyActions: 'Emergency actions',
      medicalAdvice: 'Medical advice',
      newDiagnosis: 'New diagnosis'
    }
  },
  es: {
    title: 'Diagnóstico IA Universal',
    steps: {
      symptoms: 'Describir sus síntomas',
      analysis: 'Análisis universal',
      results: 'Diagnóstico completo'
    },
    symptoms: {
      title: 'Describa su problema',
      subtitle: 'Seleccione las áreas afectadas y describa sus síntomas',
      bodyMap: 'Mapa del cuerpo',
      bodyMapSubtitle: 'Haga clic en las áreas dolorosas',
      symptoms: 'Síntomas detallados',
      symptomsSubtitle: 'Agregue síntomas específicos',
      comments: 'Sus comentarios',
      commentsPlaceholder: 'Describa su problema en detalle... ¿Cómo comenzó a sentirse mal? ¿Qué empeora o mejora sus síntomas?',
      selected: 'síntoma seleccionado',
      selectedPlural: 'síntomas seleccionados',
      clearAll: 'Limpiar todo',
      analyze: 'Analizar',
      selectAll: 'Seleccionar todo',
      deselectAll: 'Deseleccionar todo'
    },
    analysis: {
      title: 'Análisis Universal en progreso...',
      subtitle: 'Nuestra IA analiza sus síntomas con medicinas de todo el mundo'
    },
    results: {
      title: 'Diagnóstico Universal Completo',
      subtitle: 'Análisis integrativo de medicinas del mundo',
      mainDiagnosis: 'Diagnóstico Principal',
      condition: 'Condición identificada',
      probability: 'Probabilidad',
      recommendations: 'Recomendaciones',
      medications: 'Medicamentos recomendados',
      naturalRemedies: 'Remedios naturales',
      lifestyleChanges: 'Cambios en el estilo de vida',
      emergencyActions: 'Acciones de emergencia',
      medicalAdvice: 'Consejo médico',
      newDiagnosis: 'Nuevo diagnóstico'
    }
  }
};

export default function GoogleMedicalDiagnostic() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBodyAreas, setSelectedBodyAreas] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [patientComments, setPatientComments] = useState<string>('');
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'fr' | 'en' | 'es'>('fr');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const t = translations[language];
  
  const steps = [
    { id: 'symptoms', title: t.steps.symptoms, icon: Stethoscope },
    { id: 'analysis', title: t.steps.analysis, icon: Sparkles },
    { id: 'results', title: t.steps.results, icon: CheckCircle }
  ];

  // Vérifier la connectivité
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fonctions pour la sélection des zones du corps
  const toggleBodyArea = (area: string) => {
    setSelectedBodyAreas(prev => 
      prev.includes(area) 
        ? prev.filter(s => s !== area)
        : [...prev, area]
    );
  };

  // Fonctions pour la sélection multiple de symptômes
  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const selectAllInCategory = (category: string) => {
    const categorySymptoms = symptomCategories[category as keyof typeof symptomCategories];
    const allSelected = categorySymptoms.every((s: string) => selectedSymptoms.includes(s));
    
    if (allSelected) {
      // Désélectionner tous les symptômes de cette catégorie
      setSelectedSymptoms(prev => prev.filter(s => !categorySymptoms.includes(s)));
    } else {
      // Sélectionner tous les symptômes de cette catégorie
      setSelectedSymptoms(prev => [...new Set([...prev, ...categorySymptoms])]);
    }
  };

  const clearAllSymptoms = () => {
    setSelectedSymptoms([]);
  };

  const canProceedToAnalysis = () => {
    return selectedBodyAreas.length > 0 || selectedSymptoms.length > 0 || patientComments.trim().length > 0;
  };

  const startAnalysis = async () => {
    if (!canProceedToAnalysis() || !isOnline) return;
    
    setIsAnalyzing(true);
    setError(null);
    setCurrentStep(2);

    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: selectedSymptoms.map(symptom => ({
            name: symptom,
            category: 'Général',
            severity: 'moderate',
            duration: '',
            frequency: '',
            additionalNotes: ''
          })),
          bodyAreas: selectedBodyAreas,
          patientComments: patientComments,
          patientInfo: {
            age: '35',
            gender: 'unspecified'
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'analyse');
      }

      const data = await response.json();
      
      // Mapper la réponse vers notre format
      const result: DiagnosisResult = {
        level: data.urgency === 'critical' ? 'urgent' : 
               data.urgency === 'high' ? 'priority' : 'reassuring',
        advice: data.description || data.advice || 'Consultez votre médecin pour un suivi approprié.',
        recommendations: data.recommendations || [],
        nextSteps: data.nextSteps || [],
        estimatedTime: data.urgency === 'critical' ? 'Immédiat' : 
                      data.urgency === 'high' ? 'Sous 24h' : '24-48h',
        condition: data.condition,
        probability: data.probability,
        description: data.description,
        rawData: data,
        treatments: data.integrativePlan ? {
          medications: data.treatments?.medications || [],
          naturalRemedies: data.treatments?.naturalRemedies || [],
          lifestyleChanges: data.treatments?.lifestyleChanges || [],
          emergencyActions: data.treatments?.emergencyActions || [],
          consultationAdvice: data.treatments?.consultationAdvice || 'Consultez un professionnel de santé.',
          followUpInstructions: data.treatments?.followUpInstructions || ''
        } : undefined
      };

      setDiagnosisResult(result);
      setCurrentStep(3);
    } catch (error) {
      console.error('Erreur d\'analyse:', error);
      setError('Erreur lors de l\'analyse. Veuillez réessayer.');
      setCurrentStep(1);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStepIcon = (index: number) => {
    const step = steps[index];
    const Icon = step.icon;
    const isActive = index === currentStep;
    const isCompleted = index < currentStep;

    return (
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
        isActive ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' :
        isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25' :
        'bg-gray-100 text-gray-400 hover:bg-gray-200'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
    );
  };

  const getResultIcon = (level: string) => {
    switch (level) {
      case 'urgent':
        return <AlertTriangle className="w-8 h-8 text-red-600" />;
      case 'priority':
        return <Clock className="w-8 h-8 text-orange-600" />;
      default:
        return <CheckCircle className="w-8 h-8 text-green-600" />;
    }
  };

  const getResultMessage = (level: string) => {
    switch (level) {
      case 'urgent':
        return {
          title: 'Urgence élevée',
          message: 'Appelez les urgences ou rendez-vous immédiatement.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800'
        };
      case 'priority':
        return {
          title: 'Prioritaire',
          message: 'Mieux vaut consulter sous 24h.',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800'
        };
      default:
        return {
          title: 'Rassurant',
          message: 'Rien d\'alarmant pour l\'instant. Surveillez 24–48h.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800'
        };
    }
  };

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
                  <button
                    onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 1 || isAnalyzing}
                    className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mr-3"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <span className="ml-3 text-xl font-semibold text-gray-900">{t.title}</span>
                </div>
              </div>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Accueil
              </a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
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
              <a href="/about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
                À propos
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Progress Steps */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  {getStepIcon(index)}
                  <span className="text-xs mt-2 text-center max-w-20 hidden sm:block font-medium text-gray-600">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="mx-4 hidden sm:block">
                    <div className="w-6 h-0.5 bg-gray-300 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Étape 1: Description du problème */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t.symptoms.title}
              </h2>
              <p className="text-gray-600">
                {t.symptoms.subtitle}
              </p>
            </div>

            {/* Carte du corps moderne */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t.symptoms.bodyMap}
                </h3>
              </div>
              <BodyMap
                selectedAreas={selectedBodyAreas}
                onAreaSelect={toggleBodyArea}
                language={language}
              />
            </div>

            {/* Symptômes détaillés moderne */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t.symptoms.symptoms}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {t.symptoms.symptomsSubtitle}
              </p>

              {/* Sélection complète de symptômes par catégories */}
              <div className="space-y-6">
                {/* Symptômes neurologiques */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Neurologiques & Cérébraux
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['Maux de tête', 'Migraine', 'Vertiges', 'Étourdissements', 'Confusion', 'Perte de mémoire', 'Difficultés de concentration', 'Sensibilité à la lumière', 'Sensibilité au bruit', 'Hallucinations', 'Convulsions', 'Évanouissement'].map((symptom) => (
                      <label
                        key={symptom}
                        className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedSymptoms.includes(symptom) 
                            ? 'border-purple-500 bg-purple-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSymptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                          className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                        />
                        <span className={`ml-3 text-sm font-medium ${
                          selectedSymptoms.includes(symptom) ? 'text-purple-900' : 'text-gray-700'
                        }`}>
                          {symptom}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Symptômes respiratoires */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Respiratoires & Thoraciques
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['Essoufflement', 'Toux', 'Toux sèche', 'Toux grasse', 'Douleur thoracique', 'Oppression thoracique', 'Respiration sifflante', 'Sang dans les crachats', 'Difficulté à respirer', 'Respiration rapide', 'Respiration superficielle', 'Apnée du sommeil'].map((symptom) => (
                      <label
                        key={symptom}
                        className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedSymptoms.includes(symptom) 
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSymptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className={`ml-3 text-sm font-medium ${
                          selectedSymptoms.includes(symptom) ? 'text-blue-900' : 'text-gray-700'
                        }`}>
                          {symptom}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Symptômes digestifs */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Digestifs & Abdominaux
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['Nausées', 'Vomissements', 'Douleur abdominale', 'Crampes abdominales', 'Ballonnements', 'Gaz', 'Constipation', 'Diarrhée', 'Sang dans les selles', 'Selles noires', 'Perte d\'appétit', 'Sensation de satiété rapide', 'Brûlures d\'estomac', 'Reflux gastro-œsophagien', 'Difficulté à avaler', 'Hoquet persistant'].map((symptom) => (
                      <label
                        key={symptom}
                        className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedSymptoms.includes(symptom) 
                            ? 'border-green-500 bg-green-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSymptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                        />
                        <span className={`ml-3 text-sm font-medium ${
                          selectedSymptoms.includes(symptom) ? 'text-green-900' : 'text-gray-700'
                        }`}>
                          {symptom}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Symptômes cardiaques */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Cardiaques & Cardiovasculaires
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['Palpitations', 'Battements cardiaques irréguliers', 'Douleur thoracique', 'Oppression thoracique', 'Essoufflement à l\'effort', 'Fatigue cardiaque', 'Gonflement des jambes', 'Gonflement des pieds', 'Hypertension', 'Hypotension', 'Mains et pieds froids', 'Cyanose'].map((symptom) => (
                      <label
                        key={symptom}
                        className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedSymptoms.includes(symptom) 
                            ? 'border-red-500 bg-red-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSymptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                          className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                        />
                        <span className={`ml-3 text-sm font-medium ${
                          selectedSymptoms.includes(symptom) ? 'text-red-900' : 'text-gray-700'
                        }`}>
                          {symptom}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Symptômes généraux */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Généraux & Systémiques
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['Fièvre', 'Fatigue', 'Faiblesse générale', 'Perte de poids', 'Prise de poids', 'Sueurs nocturnes', 'Frissons', 'Douleurs musculaires', 'Douleurs articulaires', 'Raideur articulaire', 'Gonflement des articulations', 'Difficulté à bouger', 'Inflammation', 'Sensibilité générale', 'Malaise', 'Épuisement'].map((symptom) => (
                      <label
                        key={symptom}
                        className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedSymptoms.includes(symptom) 
                            ? 'border-yellow-500 bg-yellow-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSymptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                          className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                        />
                        <span className={`ml-3 text-sm font-medium ${
                          selectedSymptoms.includes(symptom) ? 'text-yellow-900' : 'text-gray-700'
                        }`}>
                          {symptom}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Symptômes cutanés */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Cutanés & Dermatologiques
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['Éruption cutanée', 'Démangeaisons', 'Rougeur de la peau', 'Sécheresse cutanée', 'Desquamation', 'Plaies qui ne guérissent pas', 'Changements de couleur de peau', 'Bosses ou nodules', 'Ulcères', 'Pustules', 'Vésicules', 'Croûtes', 'Cicatrices anormales', 'Perte de cheveux', 'Changements d\'ongles'].map((symptom) => (
                      <label
                        key={symptom}
                        className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedSymptoms.includes(symptom) 
                            ? 'border-orange-500 bg-orange-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSymptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                          className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                        />
                        <span className={`ml-3 text-sm font-medium ${
                          selectedSymptoms.includes(symptom) ? 'text-orange-900' : 'text-gray-700'
                        }`}>
                          {symptom}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Symptômes urinaires */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Urinaires & Rénaux
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['Douleur en urinant', 'Besoin fréquent d\'uriner', 'Urine foncée', 'Urine trouble', 'Sang dans l\'urine', 'Difficulté à uriner', 'Incontinence', 'Rétention urinaire', 'Douleur au bas du dos', 'Gonflement des pieds', 'Hypertension', 'Fatigue rénale'].map((symptom) => (
                      <label
                        key={symptom}
                        className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedSymptoms.includes(symptom) 
                            ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSymptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                          className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                        />
                        <span className={`ml-3 text-sm font-medium ${
                          selectedSymptoms.includes(symptom) ? 'text-indigo-900' : 'text-gray-700'
                        }`}>
                          {symptom}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Symptômes psychologiques */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    Psychologiques & Comportementaux
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['Anxiété', 'Dépression', 'Stress', 'Insomnie', 'Somnolence excessive', 'Changements d\'humeur', 'Irritabilité', 'Agitation', 'Apathie', 'Pensées suicidaires', 'Crises de panique', 'Phobies', 'Troubles alimentaires', 'Comportements compulsifs', 'Isolement social', 'Perte d\'intérêt'].map((symptom) => (
                      <label
                        key={symptom}
                        className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedSymptoms.includes(symptom) 
                            ? 'border-pink-500 bg-pink-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSymptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                          className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                        />
                        <span className={`ml-3 text-sm font-medium ${
                          selectedSymptoms.includes(symptom) ? 'text-pink-900' : 'text-gray-700'
                        }`}>
                          {symptom}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compteur de symptômes moderne */}
              {selectedSymptoms.length > 0 && (
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedSymptoms.length} {selectedSymptoms.length > 1 ? t.symptoms.selectedPlural : t.symptoms.selected}
                  </span>
                  <button
                    onClick={clearAllSymptoms}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
                  >
                    {t.symptoms.clearAll}
                  </button>
                </div>
              )}
            </div>

            {/* Commentaires du patient moderne */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t.symptoms.comments}
                </h3>
              </div>
              <textarea
                value={patientComments}
                onChange={(e) => setPatientComments(e.target.value)}
                placeholder={t.symptoms.commentsPlaceholder}
                className="w-full h-36 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-500">
                  Décrivez votre problème en détail pour un diagnostic plus précis
                </p>
                <p className="text-sm text-gray-400">
                  {patientComments.length}/500
                </p>
              </div>
            </div>

            {/* Bouton d'analyse moderne */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-700">
                    Récapitulatif de votre consultation
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedBodyAreas.length > 0 && `${selectedBodyAreas.length} zone${selectedBodyAreas.length > 1 ? 's' : ''} sélectionnée${selectedBodyAreas.length > 1 ? 's' : ''}`}
                    {selectedSymptoms.length > 0 && ` • ${selectedSymptoms.length} symptôme${selectedSymptoms.length > 1 ? 's' : ''}`}
                    {patientComments.trim().length > 0 && ' • Commentaires détaillés'}
                  </div>
                </div>
                <button
                  onClick={startAnalysis}
                  disabled={!canProceedToAnalysis()}
                  className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    {t.symptoms.analyze}
                  </span>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        )}

        {/* Étape 2: Analyse en cours */}
        {currentStep === 2 && (
          <div className="text-center space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Analyse Universelle en cours...
              </h2>
              
              <p className="text-gray-600 mb-6">
                Notre IA analyse vos symptômes avec les médecines du monde entier
              </p>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-500">🩺 Évaluation des symptômes</p>
                <p className="text-sm text-gray-500">🌍 Analyse des médecines traditionnelles</p>
                <p className="text-sm text-gray-500">💊 Recherche de traitements naturels</p>
                <p className="text-sm text-gray-500">📋 Génération des recommandations intégratives</p>
              </div>
            </div>
          </div>
        )}

        {/* Étape 3: Résultats */}
        {currentStep === 3 && diagnosisResult && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Diagnostic Universel Complet
              </h2>
              <p className="text-gray-600">
                Analyse intégrative des médecines du monde
              </p>
            </div>

            {/* Diagnostic principal */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🩺 Diagnostic Principal
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-900 text-lg">
                  {diagnosisResult.condition || 'Condition identifiée'}
                </h4>
                <p className="text-blue-700 text-sm">
                  Probabilité: {diagnosisResult.probability || 85}%
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {diagnosisResult.advice}
              </p>
            </div>

            {/* Carte de résultat principal */}
            <div className={`rounded-xl border-2 p-6 ${getResultMessage(diagnosisResult.level).bgColor} ${getResultMessage(diagnosisResult.level).borderColor}`}>
              <div className="flex items-start gap-4">
                {getResultIcon(diagnosisResult.level)}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${getResultMessage(diagnosisResult.level).textColor}`}>
                    {getResultMessage(diagnosisResult.level).title}
                  </h3>
                  <p className={`text-lg ${getResultMessage(diagnosisResult.level).textColor}`}>
                    {getResultMessage(diagnosisResult.level).message}
                  </p>
                  <p className={`text-sm mt-2 ${getResultMessage(diagnosisResult.level).textColor}`}>
                    Temps estimé: {diagnosisResult.estimatedTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Recommandations */}
            {diagnosisResult.recommendations && diagnosisResult.recommendations.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Recommandations
                </h3>
                <ul className="space-y-2">
                  {diagnosisResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Traitements */}
            {diagnosisResult.treatments && (
              <div className="space-y-4">
                {/* Médicaments */}
                {diagnosisResult.treatments.medications && diagnosisResult.treatments.medications.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Pill className="w-5 h-5 text-blue-600" />
                      Médicaments recommandés
                    </h3>
                    <div className="space-y-4">
                      {diagnosisResult.treatments.medications.map((med, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900">{med.molecule}</h4>
                          <p className="text-sm text-gray-600">Dosage: {med.dosage} - {med.frequency}</p>
                          <p className="text-sm text-gray-600">Durée: {med.duration}</p>
                          {med.contraindications.length > 0 && (
                            <p className="text-sm text-red-600 mt-2">
                              ⚠️ Contre-indications: {med.contraindications.join(', ')}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Remèdes naturels */}
                {diagnosisResult.treatments.naturalRemedies && diagnosisResult.treatments.naturalRemedies.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                      Remèdes naturels
                    </h3>
                    <ul className="space-y-2">
                      {diagnosisResult.treatments.naturalRemedies.map((remedy, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Leaf className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{remedy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Changements de mode de vie */}
                {diagnosisResult.treatments.lifestyleChanges && diagnosisResult.treatments.lifestyleChanges.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-600" />
                      Changements de mode de vie
                    </h3>
                    <ul className="space-y-2">
                      {diagnosisResult.treatments.lifestyleChanges.map((change, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Heart className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Actions d'urgence */}
            {diagnosisResult.treatments?.emergencyActions && diagnosisResult.treatments.emergencyActions.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Actions d'urgence
                </h3>
                <ul className="space-y-2">
                  {diagnosisResult.treatments.emergencyActions.map((action, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-red-800">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Conseil de consultation */}
            {diagnosisResult.treatments?.consultationAdvice && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">
                  💡 Conseil médical
                </h3>
                <p className="text-blue-800">{diagnosisResult.treatments.consultationAdvice}</p>
              </div>
            )}

            {/* Bouton pour nouveau diagnostic */}
            <div className="text-center">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setSelectedBodyAreas([]);
                  setSelectedSymptoms([]);
                  setPatientComments('');
                  setDiagnosisResult(null);
                  setError(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Nouveau diagnostic
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}