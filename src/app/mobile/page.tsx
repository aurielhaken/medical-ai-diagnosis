"use client";

import React, { useState, useEffect } from 'react';

export default function MobilePage() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [conversationState, setConversationState] = useState({
    hasSymptoms: false,
    hasDuration: false,
    hasIntensity: false,
    hasLocation: false,
    hasOtherSymptoms: false,
    hasMedicalHistory: false,
    symptoms: '',
    duration: '',
    intensity: '',
    location: '',
    otherSymptoms: '',
    medicalHistory: ''
  });

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
      welcome: "Bonjour ! Je suis votre assistant médical IA. Comment puis-je vous aider aujourd'hui ?",
      thanks: "Merci pour ces informations. Avez-vous pris des médicaments récemment ?",
      painQuestion: "Je comprends que vous ressentez de la douleur. Pouvez-vous me dire depuis combien de temps ?",
      intensityQuestion: "Sur une échelle de 1 à 10, comment évaluez-vous l'intensité de cette douleur ?",
      locationQuestion: "Pouvez-vous me préciser exactement où vous ressentez cette douleur ?",
      otherSymptoms: "Avez-vous d'autres symptômes associés comme de la fièvre, des nausées ou des vertiges ?",
      medicalHistory: "Avez-vous des antécédents médicaux particuliers ou des allergies connues ?",
      analysis: "Analyse Médicale",
      diagnostic: "Diagnostic",
      recommendations: "Recommandations",
      consultDoctor: "Consultez un médecin pour un examen physique",
      takeMedication: "Prenez des anti-inflammatoires selon prescription",
      writeMessage: "Écrivez votre message...",
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
      welcome: "Hello! I am your AI medical assistant. How can I help you today?",
      thanks: "Thank you for this information. Have you taken any medication recently?",
      painQuestion: "I understand you're experiencing pain. Can you tell me how long this has been going on?",
      intensityQuestion: "On a scale of 1 to 10, how would you rate the intensity of this pain?",
      locationQuestion: "Can you tell me exactly where you feel this pain?",
      otherSymptoms: "Do you have any other associated symptoms like fever, nausea, or dizziness?",
      medicalHistory: "Do you have any particular medical history or known allergies?",
      analysis: "Medical Analysis",
      diagnostic: "Diagnostic",
      recommendations: "Recommendations",
      consultDoctor: "Consult a doctor for a physical examination",
      takeMedication: "Take anti-inflammatory drugs as prescribed",
      writeMessage: "Write your message...",
      startChat: "Start chat",
      analyzeSymptoms: "Analyze my symptoms",
      exploreDictionary: "Explore dictionary"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

  const switchLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const startDiagnosis = async () => {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const symptoms = searchInput?.value.trim();
    
    if (!symptoms) {
      alert('Veuillez décrire vos symptômes avant de rechercher.');
      return;
    }
    
    // Open chat with symptoms
    setShowChat(true);
    addMessage(symptoms, 'user');
    
    // Generate AI response
    setTimeout(() => {
      const response = generatePersonalizedResponse(symptoms);
      addMessage(response, 'ai');
      
      if (isMedicalRelated(symptoms)) {
        setShowAnalysis(true);
      }
    }, 2000);
  };

  const [showChat, setShowChat] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [messages, setMessages] = useState([
    { text: t.welcome, sender: 'ai', time: 'Maintenant' }
  ]);

  const addMessage = (text: string, sender: 'user' | 'ai') => {
    const time = new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setMessages(prev => [...prev, { text, sender, time }]);
  };

  const generatePersonalizedResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Store the message in conversation state
    storeConversationData(message, lowerMessage);
    
    // Generate response based on conversation state
    return generateContextualResponse();
  };

  const storeConversationData = (message: string, lowerMessage: string) => {
    setConversationState(prev => {
      const newState = { ...prev };
      
      // Store symptoms (only if not already stored)
      if (!newState.hasSymptoms && (lowerMessage.includes('mal') || lowerMessage.includes('douleur') || 
          lowerMessage.includes('pain') || lowerMessage.includes('hurt') ||
          lowerMessage.includes('ventre') || lowerMessage.includes('stomach'))) {
        newState.hasSymptoms = true;
        newState.symptoms = message;
      }
      
      // Store duration (only if not already stored)
      if (!newState.hasDuration && (lowerMessage.includes('depuis') || lowerMessage.includes('since') || 
          lowerMessage.includes('jour') || lowerMessage.includes('day') ||
          lowerMessage.match(/\d+\s*(jour|day)/))) {
        newState.hasDuration = true;
        newState.duration = message;
      }
      
      // Store intensity (numbers 1-10, only if not already stored)
      if (!newState.hasIntensity && lowerMessage.match(/\b[1-9]|10\b/)) {
        newState.hasIntensity = true;
        newState.intensity = message;
      }
      
      // Store location (only if not already stored)
      if (!newState.hasLocation && (lowerMessage.includes('gauche') || lowerMessage.includes('droite') ||
          lowerMessage.includes('left') || lowerMessage.includes('right') ||
          lowerMessage.includes('ballonements') || lowerMessage.includes('bloating') ||
          lowerMessage.includes('côté') || lowerMessage.includes('side'))) {
        newState.hasLocation = true;
        newState.location = message;
      }
      
      return newState;
    });
  };

  const generateContextualResponse = () => {
    // If we have enough information, call the real API
    if (conversationState.hasSymptoms && conversationState.hasDuration && 
        conversationState.hasIntensity && conversationState.hasLocation) {
      return callRealMedicalAPI();
    }
    
    // Progressive questioning based on what we know
    if (!conversationState.hasSymptoms) {
      return t.painQuestion;
    }
    
    if (conversationState.hasSymptoms && !conversationState.hasDuration) {
      return t.intensityQuestion;
    }
    
    if (conversationState.hasDuration && !conversationState.hasIntensity) {
      return t.intensityQuestion;
    }
    
    if (conversationState.hasIntensity && !conversationState.hasLocation) {
      return t.locationQuestion;
    }
    
    if (conversationState.hasLocation && !conversationState.hasOtherSymptoms) {
      return t.otherSymptoms;
    }
    
    // If we have everything, call the real API
    return callRealMedicalAPI();
  };

  const callRealMedicalAPI = async () => {
    try {
      // Prepare symptoms for API
      const symptoms = [
        conversationState.symptoms,
        `Durée: ${conversationState.duration}`,
        `Intensité: ${conversationState.intensity}/10`,
        `Localisation: ${conversationState.location}`
      ].filter(s => s).join(', ');

      console.log('Appel API avec symptômes:', symptoms);

      // Call the real MyDoc-AI API
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: [symptoms],
          doctorId: 'mydoc-ai'
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      console.log('Réponse API:', data);

      // Reset conversation state
      setConversationState({
        hasSymptoms: false,
        hasDuration: false,
        hasIntensity: false,
        hasLocation: false,
        hasOtherSymptoms: false,
        hasMedicalHistory: false,
        symptoms: '',
        duration: '',
        intensity: '',
        location: '',
        otherSymptoms: '',
        medicalHistory: ''
      });

      // Show medical analysis with real data
      setTimeout(() => {
        setShowAnalysis(true);
      }, 1000);

      return `Merci pour ces informations détaillées. J'ai analysé vos symptômes avec notre IA médicale avancée et je vais vous fournir un diagnostic préliminaire avec des recommandations personnalisées.`;

    } catch (error) {
      console.error('Erreur API:', error);
      
      // Fallback to basic analysis
      setConversationState({
        hasSymptoms: false,
        hasDuration: false,
        hasIntensity: false,
        hasLocation: false,
        hasOtherSymptoms: false,
        hasMedicalHistory: false,
        symptoms: '',
        duration: '',
        intensity: '',
        location: '',
        otherSymptoms: '',
        medicalHistory: ''
      });
      
      setTimeout(() => {
        setShowAnalysis(true);
      }, 1000);
      
      return `Merci pour ces informations. Basé sur vos symptômes (${conversationState.symptoms}), la durée (${conversationState.duration}), l'intensité (${conversationState.intensity}/10) et la localisation (${conversationState.location}), je recommande de consulter un médecin pour un examen approfondi.`;
    }
  };

  const isMedicalRelated = (message: string) => {
    const medicalKeywords = [
      'mal', 'douleur', 'symptôme', 'fièvre', 'nausée', 'vertige',
      'pain', 'hurt', 'symptom', 'fever', 'nausea', 'dizzy'
    ];
    
    const lowerMessage = message.toLowerCase();
    return medicalKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const sendMessage = () => {
    const input = document.getElementById('messageInput') as HTMLInputElement;
    const message = input?.value.trim();
    
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    // Generate AI response
    setTimeout(() => {
      const response = generatePersonalizedResponse(message);
      addMessage(response, 'ai');
      
      if (isMedicalRelated(message)) {
        setShowAnalysis(true);
      }
    }, 1500);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const startNewConsultation = () => {
    // Reset conversation state
    setConversationState({
      hasSymptoms: false,
      hasDuration: false,
      hasIntensity: false,
      hasLocation: false,
      hasOtherSymptoms: false,
      hasMedicalHistory: false,
      symptoms: '',
      duration: '',
      intensity: '',
      location: '',
      otherSymptoms: '',
      medicalHistory: ''
    });
    
    // Clear chat messages except the welcome message
    setMessages([{ text: t.welcome, sender: 'ai', time: 'Maintenant' }]);
    
    // Hide medical analysis
    setShowAnalysis(false);
  };

  if (showChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg p-4 flex justify-between items-center z-50 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-xl border-2 border-white/20">
              🏥
            </div>
            <div className="text-lg font-bold text-cyan-100">{t.chatTitle}</div>
          </div>
          <button 
            onClick={() => setShowChat(false)}
            className="text-white text-2xl"
          >
            ←
          </button>
        </div>

        {/* Chat Messages */}
        <div className="pt-20 pb-20 px-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                msg.sender === 'ai' 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
                  : 'bg-gradient-to-br from-green-500 to-green-700'
              }`}>
                {msg.sender === 'user' ? '👤' : '🤖'}
              </div>
              <div>
                <div className={`p-4 rounded-2xl backdrop-blur-lg border border-white/20 ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
                    : 'bg-white/10'
                }`}>
                  {msg.text}
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Medical Analysis */}
        {showAnalysis && (
          <div className="mx-4 mb-4 bg-white/10 rounded-2xl p-6 backdrop-blur-lg border border-white/20">
            <div className="flex justify-between items-center mb-5">
              <span className="text-2xl">🏥</span>
              <span className="text-xl font-bold text-cyan-100">Analyse Médicale IA</span>
              <span className="text-white/70 text-sm">2025-01-20</span>
            </div>
            <div className="flex justify-between items-center mb-5 p-4 bg-white/5 rounded-lg">
              <span className="text-lg text-cyan-100">Diagnostic</span>
              <span className="text-2xl font-bold text-purple-400">85%</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-green-400 text-lg">✅</span>
                <span className="text-white/90">Consultez un médecin pour un examen physique</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-green-400 text-lg">✅</span>
                <span className="text-white/90">Prenez des anti-inflammatoires selon prescription</span>
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg p-4 flex gap-3 border-t border-white/10">
          <input
            type="text"
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t.writeMessage}
            id="messageInput"
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-full w-12 h-12 text-white text-xl flex items-center justify-center"
          >
            📤
          </button>
          <button
            onClick={startNewConsultation}
            className="bg-gradient-to-br from-green-500 to-green-700 rounded-full w-12 h-12 text-white text-lg flex items-center justify-center"
            title="Nouvelle consultation"
          >
            🔄
          </button>
        </div>
      </div>
    );
  }

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
              id="searchInput"
            />
            <button
              onClick={startDiagnosis}
              className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-full px-6 py-4 text-white text-base font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="text-lg">🔍</span>
              <span>{t.searchButton}</span>
            </button>
          </div>
          
          <p className="text-white/70 text-sm mt-4">{t.exampleText}</p>
        </div>

        {/* Features Section */}
        <div className="px-5 py-16 bg-white/5">
          <h2 className="text-3xl font-bold text-cyan-100 text-center mb-12">{t.featuresTitle}</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              onClick={() => setShowChat(true)}
              className="bg-white/10 rounded-2xl p-8 text-center backdrop-blur-lg border border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:bg-white/15 hover:shadow-xl hover:shadow-black/30 relative overflow-hidden"
            >
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
              onClick={startDiagnosis}
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