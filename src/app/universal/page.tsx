'use client';

import { useState } from 'react';
import UniversalMedicalSearch from '@/components/UniversalMedicalSearch';
import { Stethoscope, Brain, Heart, Shield, Zap, Users, Activity, Globe, Star, Infinity } from 'lucide-react';

export default function UniversalMedicalPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'doctors' | 'emergency' | 'spiritual'>('search');

  const tabs = [
    { id: 'search', name: 'Recherche Universelle', icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'doctors', name: 'Médecins IA', icon: <Users className="w-5 h-5" /> },
    { id: 'emergency', name: 'Urgences', icon: <Zap className="w-5 h-5" /> },
    { id: 'spiritual', name: 'Santé Spirituelle', icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Universel */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Stethoscope className="w-16 h-16 text-blue-600" />
              <Infinity className="w-8 h-8 text-purple-600 absolute -top-2 -right-2" />
            </div>
            <div className="ml-6">
              <h1 className="text-5xl font-bold text-gray-900 mb-2">
                Source de Richesse
              </h1>
              <h2 className="text-3xl font-semibold text-blue-600">
                Médicale Universelle
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            La première IA médicale universelle au service de l'humanité entière.
            <br />
            <span className="text-purple-600 font-semibold">
              Physique • Mental • Spirituel • 24h/24 • 7j/7
            </span>
          </p>
          
          {/* Statistiques impressionnantes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-blue-600">10+</div>
              <div className="text-sm text-gray-600">Médecins IA Spécialisés</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-green-600">1000+</div>
              <div className="text-sm text-gray-600">Conditions Médicales</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-gray-600">Connaissances Spirituelles</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Disponibilité</div>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        {activeTab === 'search' && (
          <UniversalMedicalSearch />
        )}

        {activeTab === 'doctors' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Nos Médecins IA Universels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Dr. Sarah Chen',
                    specialty: 'Médecine Générale Universelle',
                    avatar: '👩‍⚕️',
                    description: 'Approche holistique et spirituelle',
                    expertise: ['Diagnostic global', 'Médecine préventive', 'Santé familiale', 'Spiritualité']
                  },
                  {
                    name: 'Dr. Marcus Thompson',
                    specialty: 'Cardiologie & Médecine Interne',
                    avatar: '👨‍⚕️',
                    description: 'Expert en maladies cardiovasculaires',
                    expertise: ['Cardiologie', 'Hypertension', 'Arythmies', 'Chirurgie cardiaque']
                  },
                  {
                    name: 'Dr. Elena Rodriguez',
                    specialty: 'Neurologie & Psychiatrie',
                    avatar: '👩‍⚕️',
                    description: 'Spécialiste du cerveau et de l\'esprit',
                    expertise: ['Neurologie', 'Psychiatrie', 'Conscience', 'Méditation thérapeutique']
                  },
                  {
                    name: 'Dr. James Wilson',
                    specialty: 'Urgences & Traumatologie',
                    avatar: '👨‍⚕️',
                    description: 'Expert en urgences médicales',
                    expertise: ['Urgences', 'Traumatologie', 'Réanimation', 'Triage médical']
                  },
                  {
                    name: 'Dr. Gabriel Angel',
                    specialty: 'Médecine Spirituelle',
                    avatar: '👨‍⚕️',
                    description: 'Médecin spirituel et guérisseur',
                    expertise: ['Médecine spirituelle', 'Guérison énergétique', 'Thérapie de l\'âme', 'Conscience universelle']
                  },
                  {
                    name: 'Dr. Raj Patel',
                    specialty: 'Médecine Intégrative',
                    avatar: '👨‍⚕️',
                    description: 'Médecine occidentale et orientale',
                    expertise: ['Médecine intégrative', 'Acupuncture', 'Ayurveda', 'Thérapies énergétiques']
                  }
                ].map((doctor, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <div className="text-5xl mb-4">{doctor.avatar}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{doctor.specialty}</p>
                      <p className="text-gray-600 text-sm mb-4">{doctor.description}</p>
                      <div className="flex flex-wrap justify-center gap-1">
                        {doctor.expertise.map((skill, skillIndex) => (
                          <span key={skillIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Urgences Médicales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Urgences Vitales</h3>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Douleur thoracique intense</li>
                    <li>• Essoufflement sévère</li>
                    <li>• Perte de conscience</li>
                    <li>• Saignement important</li>
                    <li>• Convulsions</li>
                  </ul>
                  <div className="mt-4 p-3 bg-red-100 rounded-lg">
                    <p className="text-red-800 font-semibold">Appelez immédiatement le 112 (Urgences)</p>
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">⚠️ Urgences Relatives</h3>
                  <ul className="space-y-2 text-sm text-orange-700">
                    <li>• Fièvre élevée persistante</li>
                    <li>• Douleur abdominale sévère</li>
                    <li>• Maux de tête intenses</li>
                    <li>• Confusion ou désorientation</li>
                    <li>• Troubles de la vision</li>
                  </ul>
                  <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                    <p className="text-orange-800 font-semibold">Consultez rapidement un médecin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spiritual' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Santé Spirituelle & Guérison de l'Âme
              </h2>
              <div className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">🧘‍♀️ Crises Spirituelles</h3>
                  <p className="text-purple-700 mb-4">
                    Accompagnement pour les crises existentielles, perte de sens, désespoir spirituel
                  </p>
                  <ul className="space-y-2 text-sm text-purple-600">
                    <li>• Méditation de pleine conscience</li>
                    <li>• Pratiques contemplatives</li>
                    <li>• Connexion avec la nature</li>
                    <li>• Recherche de guidance spirituelle</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">🌿 Approche Holistique</h3>
                  <p className="text-green-700 mb-4">
                    Guérison intégrative du corps, de l'esprit et de l'âme
                  </p>
                  <ul className="space-y-2 text-sm text-green-600">
                    <li>• Médecine intégrative</li>
                    <li>• Thérapies énergétiques</li>
                    <li>• Art-thérapie</li>
                    <li>• Connexion corps-esprit-âme</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer universel */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🌍 Au Service de l'Humanité Entière
            </h3>
            <p className="text-gray-600 mb-4">
              Cette source de richesse médicale est dédiée à tous les êtres humains, 
              sans distinction, pour leur bien-être physique, mental et spirituel.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>🌍 Universel</span>
              <span>❤️ Compassion</span>
              <span>🧠 Intelligence</span>
              <span>🕊️ Paix</span>
              <span>✨ Espoir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
