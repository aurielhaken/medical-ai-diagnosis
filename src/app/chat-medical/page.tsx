'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Video, AlertTriangle, CheckCircle, Clock, MessageSquare, Search, Languages, Menu, X } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  followUpQuestions?: string[];
  followUpOptions?: string[];
  recommendations?: string[];
  videos?: string[];
  urgency?: 'low' | 'medium' | 'high' | 'critical';
}

export default function MedicalChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Bonjour ! Je suis votre assistant médical IA. Comment puis-je vous aider aujourd'hui ? Décrivez-moi vos symptômes et je vous poserai des questions pour mieux vous comprendre.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en' | 'es'>('fr');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/medical-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory: messages
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.response.text,
          timestamp: new Date(),
          followUpQuestions: data.response.followUpQuestions,
          followUpOptions: data.response.followUpOptions,
          recommendations: data.response.recommendations,
          videos: data.response.videos,
          urgency: data.response.urgency
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Désolé, j'ai rencontré une erreur. Pouvez-vous réessayer ?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        // Désélectionner l'option
        return prev.filter(opt => opt !== option);
      } else {
        // Sélectionner l'option
        return [...prev, option];
      }
    });
  };

  const handleSendSelectedOptions = async () => {
    if (selectedOptions.length === 0) return;
    
    const combinedMessage = selectedOptions.join(', ');
    setSelectedOptions([]);
    
    // Créer le message utilisateur
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: combinedMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/medical-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: combinedMessage,
          conversationHistory: messages
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.response.text,
          timestamp: new Date(),
          followUpQuestions: data.response.followUpQuestions,
          followUpOptions: data.response.followUpOptions,
          recommendations: data.response.recommendations,
          videos: data.response.videos,
          urgency: data.response.urgency
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Désolé, j'ai rencontré une erreur. Pouvez-vous réessayer ?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const translations = {
    fr: {
      title: 'Chat Médical IA',
      subtitle: 'Assistant médical intelligent pour vos questions de santé',
      placeholder: 'Décrivez vos symptômes...',
      send: 'Envoyer',
      quickQuestions: 'Questions rapides',
      recommendations: 'Recommandations',
      videos: 'Vidéos utiles',
      followUp: 'Questions de suivi',
      urgency: {
        low: 'Faible urgence',
        medium: 'Urgence modérée',
        high: 'Urgence élevée',
        critical: 'Urgence critique'
      }
    },
    en: {
      title: 'Medical AI Chat',
      subtitle: 'Intelligent medical assistant for your health questions',
      placeholder: 'Describe your symptoms...',
      send: 'Send',
      quickQuestions: 'Quick questions',
      recommendations: 'Recommendations',
      videos: 'Useful videos',
      followUp: 'Follow-up questions',
      urgency: {
        low: 'Low urgency',
        medium: 'Medium urgency',
        high: 'High urgency',
        critical: 'Critical urgency'
      }
    },
    es: {
      title: 'Chat Médico IA',
      subtitle: 'Asistente médico inteligente para sus preguntas de salud',
      placeholder: 'Describa sus síntomas...',
      send: 'Enviar',
      quickQuestions: 'Preguntas rápidas',
      recommendations: 'Recomendaciones',
      videos: 'Videos útiles',
      followUp: 'Preguntas de seguimiento',
      urgency: {
        low: 'Baja urgencia',
        medium: 'Urgencia media',
        high: 'Alta urgencia',
        critical: 'Urgencia crítica'
      }
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
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
              <a href="/recherche-medicale" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Recherche
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
              <a href="/recherche-medicale" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
                Recherche
              </a>
              <a href="/about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
                À propos
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 h-96 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'assistant' && (
                      <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Indicateur d'urgence */}
                      {message.urgency && message.urgency !== 'low' && (
                        <div className={`mt-2 px-2 py-1 rounded text-xs flex items-center gap-1 ${getUrgencyColor(message.urgency)}`}>
                          {getUrgencyIcon(message.urgency)}
                          {t.urgency[message.urgency]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Questions de suivi */}
            {messages.length > 0 && messages[messages.length - 1].followUpQuestions && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t.followUp}:</h4>
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].followUpQuestions!.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors text-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Options de suivi spécialisées */}
            {messages.length > 0 && messages[messages.length - 1].followUpOptions && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Sélectionnez votre situation (plusieurs choix possibles) :</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {messages[messages.length - 1].followUpOptions!.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`p-3 border rounded-lg transition-colors text-left ${
                        selectedOptions.includes(option)
                          ? 'bg-blue-100 border-blue-500 text-blue-900'
                          : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900 flex items-center">
                        <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center ${
                          selectedOptions.includes(option)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedOptions.includes(option) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Bouton pour envoyer les options sélectionnées */}
                {selectedOptions.length > 0 && (
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={handleSendSelectedOptions}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Envoyer les {selectedOptions.length} option{selectedOptions.length > 1 ? 's' : ''} sélectionnée{selectedOptions.length > 1 ? 's' : ''}
                    </button>
                    <button
                      onClick={() => setSelectedOptions([])}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Effacer la sélection
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Recommandations */}
            {messages.length > 0 && messages[messages.length - 1].recommendations && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t.recommendations}:</h4>
                <div className="space-y-2">
                  {messages[messages.length - 1].recommendations!.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vidéos */}
            {messages.length > 0 && messages[messages.length - 1].videos && messages[messages.length - 1].videos!.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t.videos}:</h4>
                <div className="space-y-2">
                  {messages[messages.length - 1].videos!.map((video, index) => (
                    <a
                      key={index}
                      href={video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Video className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-800">Vidéo {index + 1}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t.placeholder}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        disabled={isLoading}
                      />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {t.send}
              </button>
            </div>
          </div>
        </div>

        {/* Questions rapides */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{t.quickQuestions}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickQuestion("J'ai mal à la tête")}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">Mal de tête</div>
              <div className="text-sm text-gray-600">Décrivez votre céphalée</div>
            </button>
            <button
              onClick={() => handleQuickQuestion("J'ai de la fièvre")}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">Fièvre</div>
              <div className="text-sm text-gray-600">Évaluation de la température</div>
            </button>
            <button
              onClick={() => handleQuickQuestion("J'ai des nausées")}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">Nausées</div>
              <div className="text-sm text-gray-600">Problèmes digestifs</div>
            </button>
            <button
              onClick={() => handleQuickQuestion("Je me sens fatigué")}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">Fatigue</div>
              <div className="text-sm text-gray-600">Épuisement général</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
