import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface Diagnosis {
  condition: string;
  probability: number;
  description: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

interface ClarificationQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'text' | 'scale' | 'yes_no';
  options?: string[];
  importance: 'critical' | 'high' | 'medium' | 'low';
  category: string;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [clarificationQuestions, setClarificationQuestions] = useState<ClarificationQuestion[]>([]);
  const [clarificationAnswers, setClarificationAnswers] = useState<Record<string, string>>({});
  const [showClarification, setShowClarification] = useState(false);
  const [isAnalyzingClarification, setIsAnalyzingClarification] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setDiagnosis(null);
    setShowClarification(false);
    setClarificationQuestions([]);
    setClarificationAnswers({});
    
    try {
      // 1. Vérifier s'il faut des clarifications
      const clarificationResponse = await fetch('https://mydoc-ai.com/api/clarification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: [searchQuery]
        }),
      });

      if (clarificationResponse.ok) {
        const clarificationData = await clarificationResponse.json();
        
        if (clarificationData.needsClarification && clarificationData.questions.length > 0) {
          setClarificationQuestions(clarificationData.questions);
          setShowClarification(true);
          setIsSearching(false);
          return;
        }
      }

      // 2. Si pas de clarification nécessaire, faire le diagnostic directement
      await performDiagnosis();
      
    } catch (error) {
      console.error('Erreur lors de la vérification des clarifications:', error);
      await performDiagnosis();
    }
  };

  const performDiagnosis = async () => {
    try {
      const response = await fetch('https://mydoc-ai.com/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: [searchQuery],
          doctorId: 'mydoc-ai',
          clarificationAnswers: Object.keys(clarificationAnswers).length > 0 ? clarificationAnswers : undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'analyse');
      }

      const data = await response.json();
      setDiagnosis(data);
      setShowClarification(false);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      Alert.alert('Erreur', 'Erreur lors de l\'analyse. Veuillez réessayer.');
    } finally {
      setIsSearching(false);
      setIsAnalyzingClarification(false);
    }
  };

  const handleClarificationSubmit = async () => {
    setIsAnalyzingClarification(true);
    await performDiagnosis();
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      default: return '#22c55e';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'critical': return '🚨 Urgent';
      case 'high': return '⚠️ Élevé';
      case 'medium': return '⏱️ Modéré';
      default: return '✅ Faible';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="medical" size={32} color="#06b6d4" />
            </View>
            <View style={styles.logoText}>
              <Text style={styles.logoTitle}>MyDoc-AI</Text>
              <Text style={styles.logoSubtitle}>Intelligence Médicale</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Diagnostic Médical</Text>
            <Text style={styles.heroSubtitle}>
              Décrivez vos symptômes et obtenez un diagnostic préliminaire
            </Text>
          </View>

          {/* Search Section */}
          <View style={styles.searchSection}>
            <BlurView intensity={20} style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Décrivez vos symptômes..."
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={searchQuery}
                onChangeText={setSearchQuery}
                multiline
              />
              <TouchableOpacity
                style={[styles.searchButton, (!searchQuery.trim() || isSearching) && styles.searchButtonDisabled]}
                onPress={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
              >
                {isSearching ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Ionicons name="search" size={24} color="#ffffff" />
                )}
              </TouchableOpacity>
            </BlurView>
            
            <Text style={styles.exampleText}>
              Exemple : J'ai de la fièvre et des maux de tête
            </Text>
          </View>

          {/* Clarification Questions */}
          {showClarification && clarificationQuestions.length > 0 && (
            <View style={styles.clarificationSection}>
              <BlurView intensity={20} style={styles.clarificationContainer}>
                <Text style={styles.clarificationTitle}>Questions de Clarification</Text>
                <Text style={styles.clarificationSubtitle}>
                  Pour un diagnostic plus précis, j'ai besoin de quelques informations supplémentaires :
                </Text>
                
                {clarificationQuestions.map((question, index) => (
                  <View key={question.id} style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                      {index + 1}. {question.question}
                      {question.importance === 'critical' && <Text style={styles.criticalMark}> *</Text>}
                    </Text>
                    
                    {question.type === 'multiple_choice' && question.options && (
                      <View style={styles.optionsContainer}>
                        {question.options.map((option) => (
                          <TouchableOpacity
                            key={option}
                            style={[
                              styles.optionButton,
                              clarificationAnswers[question.id] === option && styles.optionButtonSelected
                            ]}
                            onPress={() => setClarificationAnswers(prev => ({ ...prev, [question.id]: option }))}
                          >
                            <Text style={[
                              styles.optionText,
                              clarificationAnswers[question.id] === option && styles.optionTextSelected
                            ]}>
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    
                    {question.type === 'scale' && question.options && (
                      <View style={styles.scaleContainer}>
                        {question.options.map((option) => (
                          <TouchableOpacity
                            key={option}
                            style={[
                              styles.scaleButton,
                              clarificationAnswers[question.id] === option && styles.scaleButtonSelected
                            ]}
                            onPress={() => setClarificationAnswers(prev => ({ ...prev, [question.id]: option }))}
                          >
                            <Text style={[
                              styles.scaleText,
                              clarificationAnswers[question.id] === option && styles.scaleTextSelected
                            ]}>
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
                
                <View style={styles.clarificationActions}>
                  <TouchableOpacity
                    style={styles.ignoreButton}
                    onPress={() => {
                      setShowClarification(false);
                      setClarificationQuestions([]);
                      setClarificationAnswers({});
                    }}
                  >
                    <Text style={styles.ignoreButtonText}>Ignorer et Diagnostiquer</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.submitButton, isAnalyzingClarification && styles.submitButtonDisabled]}
                    onPress={handleClarificationSubmit}
                    disabled={isAnalyzingClarification}
                  >
                    {isAnalyzingClarification ? (
                      <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                      <Text style={styles.submitButtonText}>Diagnostiquer</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </BlurView>
            </View>
          )}

          {/* Diagnosis Results */}
          {diagnosis && (
            <View style={styles.diagnosisSection}>
              <BlurView intensity={20} style={styles.diagnosisContainer}>
                <Text style={styles.diagnosisTitle}>{diagnosis.condition}</Text>
                
                <View style={styles.diagnosisInfo}>
                  <View style={styles.probabilityContainer}>
                    <Text style={styles.probabilityText}>{diagnosis.probability}%</Text>
                    <Text style={styles.probabilityLabel}>Probabilité</Text>
                  </View>
                  
                  <View style={[styles.urgencyContainer, { backgroundColor: getUrgencyColor(diagnosis.urgency) + '20' }]}>
                    <Text style={[styles.urgencyText, { color: getUrgencyColor(diagnosis.urgency) }]}>
                      {getUrgencyText(diagnosis.urgency)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionTitle}>Description</Text>
                  <Text style={styles.descriptionText}>{diagnosis.description}</Text>
                </View>
                
                {diagnosis.recommendations && diagnosis.recommendations.length > 0 && (
                  <View style={styles.recommendationsContainer}>
                    <Text style={styles.recommendationsTitle}>Recommandations</Text>
                    {diagnosis.recommendations.map((rec, index) => (
                      <View key={index} style={styles.recommendationItem}>
                        <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                        <Text style={styles.recommendationText}>{rec}</Text>
                      </View>
                    ))}
                  </View>
                )}
                
                <View style={styles.disclaimerContainer}>
                  <Ionicons name="warning" size={20} color="#eab308" />
                  <Text style={styles.disclaimerText}>
                    Ce service fournit des informations médicales à titre informatif uniquement. 
                    Consultez toujours un professionnel de santé.
                  </Text>
                </View>
              </BlurView>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logoText: {
    flex: 1,
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    fontFamily: 'System',
  },
  logoSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  searchSection: {
    marginBottom: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'System',
    fontWeight: '600',
    minHeight: 50,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#06b6d4',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchButtonDisabled: {
    backgroundColor: 'rgba(6, 182, 212, 0.5)',
  },
  exampleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  clarificationSection: {
    marginBottom: 30,
  },
  clarificationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  clarificationTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  clarificationSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 15,
  },
  criticalMark: {
    color: '#ef4444',
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(6, 182, 212, 0.3)',
    borderColor: '#06b6d4',
  },
  optionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#ffffff',
  },
  scaleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  scaleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  scaleButtonSelected: {
    backgroundColor: '#06b6d4',
    borderColor: '#06b6d4',
  },
  scaleText: {
    fontSize: 18,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scaleTextSelected: {
    color: '#ffffff',
  },
  clarificationActions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  ignoreButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  ignoreButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#06b6d4',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: 'rgba(6, 182, 212, 0.5)',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  diagnosisSection: {
    marginBottom: 30,
  },
  diagnosisContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  diagnosisTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  diagnosisInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  probabilityContainer: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  probabilityText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#06b6d4',
  },
  probabilityLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  urgencyContainer: {
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  urgencyText: {
    fontSize: 16,
    fontWeight: '900',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
  recommendationsContainer: {
    marginBottom: 20,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 15,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 10,
    flex: 1,
    lineHeight: 22,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderRadius: 12,
    padding: 15,
  },
  disclaimerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
});
