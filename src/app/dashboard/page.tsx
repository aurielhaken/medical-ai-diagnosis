'use client';

import MedicalDashboard from '@/components/MedicalDashboard';
import { Stethoscope, Activity, Users, Brain } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Tableau de bord médical IA</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Statistiques et performances de notre système de diagnostic médical IA
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1">
            <div className="flex space-x-1">
              <a 
                href="/" 
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                Diagnostic
              </a>
              <a 
                href="/dashboard" 
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md"
              >
                Tableau de bord
              </a>
              <a 
                href="/about" 
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                À propos
              </a>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <MedicalDashboard />

        {/* Informations supplémentaires */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">IA Avancée</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Notre système utilise des algorithmes d'apprentissage automatique pour analyser 
              les symptômes et fournir des diagnostics précis.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Médecins Spécialisés</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Quatre médecins IA spécialisés avec des approches différentes pour couvrir 
              tous les aspects du diagnostic médical.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Temps Réel</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Analyse instantanée des symptômes avec des résultats en quelques secondes 
              pour une prise en charge rapide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
