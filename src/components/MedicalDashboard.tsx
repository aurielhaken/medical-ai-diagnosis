'use client';

import { useState, useEffect } from 'react';
import { Activity, Users, Brain, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

interface MedicalStats {
  totalDiagnoses: number;
  accuracyRate: number;
  averageResponseTime: number;
  mostCommonConditions: Array<{
    condition: string;
    count: number;
    percentage: number;
  }>;
  urgencyDistribution: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export default function MedicalDashboard() {
  const [stats, setStats] = useState<MedicalStats>({
    totalDiagnoses: 0,
    accuracyRate: 0,
    averageResponseTime: 0,
    mostCommonConditions: [],
    urgencyDistribution: {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    }
  });

  useEffect(() => {
    // Simuler le chargement des statistiques
    const mockStats: MedicalStats = {
      totalDiagnoses: 1247,
      accuracyRate: 87.3,
      averageResponseTime: 2.4,
      mostCommonConditions: [
        { condition: 'Syndrome grippal', count: 234, percentage: 18.8 },
        { condition: 'Migraine', count: 189, percentage: 15.2 },
        { condition: 'Trouble anxieux', count: 156, percentage: 12.5 },
        { condition: 'Gastro-entérite', count: 134, percentage: 10.7 },
        { condition: 'Hypertension', count: 98, percentage: 7.9 }
      ],
      urgencyDistribution: {
        low: 45,
        medium: 35,
        high: 15,
        critical: 5
      }
    };
    
    setStats(mockStats);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord médical IA</h2>
      
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Diagnostics totaux</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDiagnoses.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Taux de précision</p>
              <p className="text-2xl font-bold text-gray-900">{stats.accuracyRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Temps de réponse</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageResponseTime}s</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Médecins IA actifs</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conditions les plus fréquentes */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conditions les plus diagnostiquées</h3>
        <div className="space-y-3">
          {stats.mostCommonConditions.map((condition, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-900">{condition.condition}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{condition.count} cas</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: `${condition.percentage}%`}}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12 text-right">{condition.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution des urgences */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution des urgences</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.urgencyDistribution.low}%</div>
            <div className="text-sm text-gray-600">Faible</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{stats.urgencyDistribution.medium}%</div>
            <div className="text-sm text-gray-600">Modérée</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.urgencyDistribution.high}%</div>
            <div className="text-sm text-gray-600">Élevée</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{stats.urgencyDistribution.critical}%</div>
            <div className="text-sm text-gray-600">Critique</div>
          </div>
        </div>
      </div>
    </div>
  );
}
