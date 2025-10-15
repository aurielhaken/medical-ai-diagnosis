// Base de données des traitements enrichie avec le Vidal
// Médicaments et traitements basés sur les recommandations du Vidal

export interface VidalMedication {
  molecule: string;
  dosage: string;
  frequency: string;
  duration: string;
  contraindications: string[];
  sideEffects: string[];
  category: 'OTC' | 'Prescription' | 'Natural' | 'Emergency';
  countryRestrictions?: string[];
  interactions?: string[];
  monitoring?: string[];
  specialPopulations?: string[];
}

export interface VidalTreatment {
  id: string;
  condition: string;
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  medications: VidalMedication[];
  naturalRemedies: string[];
  lifestyleChanges: string[];
  emergencyActions: string[];
  consultationAdvice: string;
  followUpInstructions: string;
  alternativeTreatments?: string[];
  drugInteractions?: string[];
  monitoring?: string[];
}

// Base de données complète des traitements basée sur le Vidal
export const vidalTreatments: Record<string, VidalTreatment[]> = {
  // NEUROLOGIE
  'Migraine': [
    {
      id: 'migraine-acute',
      condition: 'Migraine aiguë',
      severity: 'moderate',
      medications: [
        {
          molecule: 'Sumatriptan',
          dosage: '50-100mg',
          frequency: 'Au début de la crise',
          duration: 'Maximum 2 comprimés par jour',
          contraindications: ['Maladie cardiovasculaire', 'Hypertension non contrôlée', 'Grossesse'],
          sideEffects: ['Sensation de chaleur', 'Picotements', 'Nausées', 'Vertiges'],
          category: 'Prescription',
          interactions: ['Ergotamine', 'Inhibiteurs MAO'],
          monitoring: ['Tension artérielle', 'Fonction cardiaque'],
          specialPopulations: ['Éviter chez la femme enceinte']
        },
        {
          molecule: 'Paracétamol',
          dosage: '1000mg',
          frequency: 'Toutes les 6-8h',
          duration: 'Maximum 4g/jour',
          contraindications: ['Insuffisance hépatique sévère', 'Allergie au paracétamol'],
          sideEffects: ['Rare: éruption cutanée', 'Hépatotoxicité en surdosage'],
          category: 'OTC',
          interactions: ['Warfarine (surveillance INR)'],
          monitoring: ['Fonction hépatique si traitement prolongé'],
          specialPopulations: ['Réduire la dose chez l\'insuffisant hépatique']
        },
        {
          molecule: 'Métoclopramide',
          dosage: '10mg',
          frequency: '3 fois par jour',
          duration: 'Maximum 5 jours',
          contraindications: ['Épilepsie', 'Phéochromocytome', 'Obstruction digestive'],
          sideEffects: ['Somnolence', 'Troubles extrapyramidaux', 'Hyperprolactinémie'],
          category: 'Prescription',
          interactions: ['Neuroleptiques', 'Lévodopa'],
          monitoring: ['Surveillance neurologique'],
          specialPopulations: ['Éviter chez l\'enfant <1 an']
        }
      ],
      naturalRemedies: [
        'Repos dans une pièce sombre et calme',
        'Compresses froides sur le front',
        'Massage des tempes',
        'Hydratation abondante',
        'Gingembre (anti-nauséeux naturel)',
        'Menthe poivrée (inhalation)'
      ],
      lifestyleChanges: [
        'Identifier et éviter les déclencheurs',
        'Régularité des repas et du sommeil',
        'Gestion du stress',
        'Exercice physique modéré',
        'Éviter l\'alcool et certains aliments'
      ],
      emergencyActions: [
        'Appeler le 15 si migraine avec signes neurologiques',
        'Consultation urgente si migraine avec fièvre',
        'Éviter la conduite pendant la crise'
      ],
      consultationAdvice: 'Consultation neurologique si migraines fréquentes (>3/mois) ou atypiques',
      followUpInstructions: 'Tenir un journal des migraines, évaluation du retentissement',
      alternativeTreatments: ['Acupuncture', 'Relaxation', 'Biofeedback'],
      drugInteractions: ['Éviter l\'association triptans + ergotamine'],
      monitoring: ['Surveillance tensionnelle', 'Évaluation du retentissement']
    }
  ],

  'Épilepsie': [
    {
      id: 'epilepsie-maintenance',
      condition: 'Épilepsie - traitement de fond',
      severity: 'severe',
      medications: [
        {
          molecule: 'Valproate de sodium',
          dosage: '500-2000mg/jour',
          frequency: '2-3 fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Maladie hépatique', 'Porphyrie', 'Grossesse'],
          sideEffects: ['Prise de poids', 'Tremblements', 'Alopécie', 'Troubles hépatiques'],
          category: 'Prescription',
          interactions: ['Phénobarbital', 'Carbamazépine', 'Lamotrigine'],
          monitoring: ['Fonction hépatique', 'Numération plaquettaire', 'Ammoniémie'],
          specialPopulations: ['Contre-indiqué chez la femme enceinte']
        },
        {
          molecule: 'Carbamazépine',
          dosage: '400-1200mg/jour',
          frequency: '2-3 fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Bloc auriculo-ventriculaire', 'Hypersensibilité'],
          sideEffects: ['Vertiges', 'Somnolence', 'Éruption cutanée', 'Hyponatrémie'],
          category: 'Prescription',
          interactions: ['Warfarine', 'Contraceptifs oraux', 'Digoxine'],
          monitoring: ['Fonction hépatique', 'Numération sanguine', 'Natrémie'],
          specialPopulations: ['Surveillance particulière chez l\'enfant']
        },
        {
          molecule: 'Lévétiracétam',
          dosage: '1000-3000mg/jour',
          frequency: '2 fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Hypersensibilité'],
          sideEffects: ['Somnolence', 'Vertiges', 'Irritabilité', 'Troubles psychiatriques'],
          category: 'Prescription',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Surveillance psychiatrique'],
          specialPopulations: ['Utilisable chez l\'enfant et la femme enceinte']
        }
      ],
      naturalRemedies: [
        'Régime cétogène (sous surveillance médicale)',
        'Supplémentation en magnésium',
        'Vitamine B6',
        'Techniques de relaxation',
        'Éviter les facteurs déclenchants'
      ],
      lifestyleChanges: [
        'Régularité du sommeil',
        'Éviter l\'alcool et les drogues',
        'Précautions de sécurité',
        'Éviter la conduite si crises récentes',
        'Éducation du patient et de l\'entourage'
      ],
      emergencyActions: [
        'Appeler le 15 si crise prolongée >5 minutes',
        'Position latérale de sécurité',
        'Ne pas introduire d\'objet dans la bouche',
        'Surveillance des voies aériennes'
      ],
      consultationAdvice: 'Consultation neurologique urgente pour tout diagnostic d\'épilepsie',
      followUpInstructions: 'Consultation neurologique régulière, EEG de contrôle',
      alternativeTreatments: ['Stimulation du nerf vague', 'Chirurgie épileptique'],
      drugInteractions: ['Surveillance des interactions multiples'],
      monitoring: ['EEG régulier', 'Dosages plasmatiques', 'Surveillance clinique']
    }
  ],

  // CARDIOLOGIE
  'Infarctus du myocarde': [
    {
      id: 'infarctus-urgent',
      condition: 'Infarctus du myocarde - urgence',
      severity: 'critical',
      medications: [
        {
          molecule: 'Aspirine',
          dosage: '300mg',
          frequency: 'Dose unique',
          duration: 'Immédiat',
          contraindications: ['Allergie à l\'aspirine', 'Hémorragie active'],
          sideEffects: ['Risque hémorragique'],
          category: 'Emergency',
          interactions: ['Anticoagulants', 'AINS'],
          monitoring: ['Surveillance hémorragique'],
          specialPopulations: ['Attention chez l\'insuffisant rénal']
        },
        {
          molecule: 'Clopidogrel',
          dosage: '600mg',
          frequency: 'Dose de charge',
          duration: 'Suivi de 75mg/jour',
          contraindications: ['Hémorragie active', 'Hypersensibilité'],
          sideEffects: ['Hémorragies', 'Thrombopénie', 'Troubles digestifs'],
          category: 'Prescription',
          interactions: ['Warfarine', 'AINS'],
          monitoring: ['Numération plaquettaire', 'Surveillance hémorragique'],
          specialPopulations: ['Attention chez l\'insuffisant rénal']
        },
        {
          molecule: 'Atorvastatine',
          dosage: '80mg',
          frequency: 'Une fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Maladie hépatique active', 'Grossesse'],
          sideEffects: ['Myalgies', 'Troubles hépatiques', 'Diabète'],
          category: 'Prescription',
          interactions: ['Ciclosporine', 'Macrolides'],
          monitoring: ['Fonction hépatique', 'CPK', 'Glycémie'],
          specialPopulations: ['Attention chez l\'insuffisant hépatique']
        }
      ],
      naturalRemedies: [
        'Repos absolu',
        'Position demi-assise',
        'Oxygénothérapie si disponible',
        'Surveillance continue'
      ],
      lifestyleChanges: [
        'Arrêt immédiat du tabac',
        'Régime méditerranéen',
        'Exercice adapté après rééducation',
        'Contrôle des facteurs de risque'
      ],
      emergencyActions: [
        'Appel immédiat du 15',
        'Aspirine 300mg si disponible',
        'Défibrillation si arrêt cardiaque',
        'Transport médicalisé'
      ],
      consultationAdvice: 'Hospitalisation urgente en unité de soins intensifs',
      followUpInstructions: 'Rééducation cardiaque, surveillance cardiologique',
      alternativeTreatments: ['Angioplastie primaire', 'Thrombolyse'],
      drugInteractions: ['Surveillance des interactions multiples'],
      monitoring: ['ECG continu', 'Biologie cardiaque', 'Échocardiographie']
    }
  ],

  'Hypertension artérielle': [
    {
      id: 'hta-moderate',
      condition: 'Hypertension artérielle modérée',
      severity: 'moderate',
      medications: [
        {
          molecule: 'Ramipril',
          dosage: '2.5-10mg',
          frequency: 'Une fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Grossesse', 'Sténose bilatérale des artères rénales'],
          sideEffects: ['Toux sèche', 'Hyperkaliémie', 'Angio-œdème'],
          category: 'Prescription',
          interactions: ['Diurétiques épargneurs de potassium', 'AINS'],
          monitoring: ['Créatininémie', 'Kaliémie', 'Tension artérielle'],
          specialPopulations: ['Contre-indiqué chez la femme enceinte']
        },
        {
          molecule: 'Amlodipine',
          dosage: '5-10mg',
          frequency: 'Une fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Choc cardiogénique', 'Sténose aortique'],
          sideEffects: ['Œdèmes des chevilles', 'Flush', 'Céphalées'],
          category: 'Prescription',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Tension artérielle', 'Surveillance cardiaque'],
          specialPopulations: ['Attention chez l\'insuffisant hépatique']
        },
        {
          molecule: 'Hydrochlorothiazide',
          dosage: '12.5-25mg',
          frequency: 'Une fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Anurie', 'Hypersensibilité aux sulfamides'],
          sideEffects: ['Hypokaliémie', 'Hyponatrémie', 'Hyperuricémie'],
          category: 'Prescription',
          interactions: ['Digitaliques', 'Lithium'],
          monitoring: ['Kaliémie', 'Natrémie', 'Uricémie'],
          specialPopulations: ['Attention chez l\'insuffisant rénal']
        }
      ],
      naturalRemedies: [
        'Régime hyposodé',
        'Supplémentation en potassium',
        'Ail (effet modeste)',
        'Techniques de relaxation',
        'Exercice physique régulier'
      ],
      lifestyleChanges: [
        'Régime DASH',
        'Exercice physique 30min/jour',
        'Arrêt du tabac',
        'Limitation de l\'alcool',
        'Perte de poids si nécessaire'
      ],
      emergencyActions: [
        'Consultation médicale si tension >180/110',
        'Surveillance tensionnelle',
        'Éviter les efforts intenses'
      ],
      consultationAdvice: 'Consultation médicale pour bilan et traitement',
      followUpInstructions: 'Surveillance tensionnelle mensuelle, consultation trimestrielle',
      alternativeTreatments: ['Méditation', 'Acupuncture', 'Biofeedback'],
      drugInteractions: ['Surveillance des interactions multiples'],
      monitoring: ['Tension artérielle', 'Fonction rénale', 'Électrolytes']
    }
  ],

  // PNEUMOLOGIE
  'Asthme': [
    {
      id: 'asthme-controle',
      condition: 'Asthme contrôlé',
      severity: 'moderate',
      medications: [
        {
          molecule: 'Salbutamol',
          dosage: '100-200μg',
          frequency: 'En cas de crise',
          duration: 'Maximum 8 bouffées/jour',
          contraindications: ['Hypersensibilité', 'Tachycardie sévère'],
          sideEffects: ['Tremblements', 'Tachycardie', 'Hypokaliémie'],
          category: 'Prescription',
          interactions: ['Bêta-bloquants', 'Diurétiques'],
          monitoring: ['Fréquence cardiaque', 'Kaliémie'],
          specialPopulations: ['Attention chez la femme enceinte']
        },
        {
          molecule: 'Béclométasone',
          dosage: '200-800μg/jour',
          frequency: '2 fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Hypersensibilité'],
          sideEffects: ['Candidose oropharyngée', 'Enrouement', 'Troubles de croissance'],
          category: 'Prescription',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Croissance chez l\'enfant', 'Surveillance oropharyngée'],
          specialPopulations: ['Attention chez l\'enfant']
        },
        {
          molecule: 'Montélukast',
          dosage: '10mg',
          frequency: 'Une fois par jour le soir',
          duration: 'Traitement au long cours',
          contraindications: ['Hypersensibilité'],
          sideEffects: ['Maux de tête', 'Troubles digestifs', 'Troubles neuropsychiatriques'],
          category: 'Prescription',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Surveillance neuropsychiatrique'],
          specialPopulations: ['Attention aux troubles neuropsychiatriques']
        }
      ],
      naturalRemedies: [
        'Éviter les allergènes',
        'Humidification de l\'air',
        'Techniques de respiration',
        'Supplémentation en magnésium',
        'Probiotiques'
      ],
      lifestyleChanges: [
        'Éviter les déclencheurs',
        'Arrêt du tabac',
        'Exercice adapté',
        'Vaccination antigrippale',
        'Plan d\'action personnalisé'
      ],
      emergencyActions: [
        'Appeler le 15 si crise sévère',
        'Utiliser le bronchodilatateur',
        'Position assise',
        'Surveillance des signes de gravité'
      ],
      consultationAdvice: 'Consultation pneumologique pour évaluation et plan d\'action',
      followUpInstructions: 'Mesure du DEP, consultation régulière, éducation thérapeutique',
      alternativeTreatments: ['Immunothérapie', 'Omalizumab', 'Thermoplastie bronchique'],
      drugInteractions: ['Bêta-bloquants (contre-indiqués)'],
      monitoring: ['Débit expiratoire de pointe', 'Fonction respiratoire', 'Surveillance clinique']
    }
  ],

  // GASTRO-ENTÉROLOGIE
  'Gastro-entérite': [
    {
      id: 'gastro-virale',
      condition: 'Gastro-entérite virale',
      severity: 'moderate',
      medications: [
        {
          molecule: 'Fosfomycine trométamol',
          dosage: '3g',
          frequency: 'Dose unique',
          duration: '1 jour',
          contraindications: ['Insuffisance rénale sévère', 'Hypersensibilité'],
          sideEffects: ['Diarrhée', 'Nausées', 'Céphalées'],
          category: 'Prescription',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Fonction rénale'],
          specialPopulations: ['Attention chez l\'insuffisant rénal']
        },
        {
          molecule: 'Lopéramide',
          dosage: '2mg',
          frequency: 'Après chaque selle liquide',
          duration: 'Maximum 3 jours',
          contraindications: ['Diarrhée fébrile', 'Colite pseudomembraneuse'],
          sideEffects: ['Constipation', 'Somnolence', 'Ballonnements'],
          category: 'OTC',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Surveillance clinique'],
          specialPopulations: ['Éviter chez l\'enfant <2 ans']
        },
        {
          molecule: 'Saccharomyces boulardii',
          dosage: '200-400mg',
          frequency: '2 fois par jour',
          duration: '5-7 jours',
          contraindications: ['Hypersensibilité', 'Immunodépression'],
          sideEffects: ['Ballonnements', 'Constipation'],
          category: 'Natural',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Surveillance clinique'],
          specialPopulations: ['Attention chez l\'immunodéprimé']
        }
      ],
      naturalRemedies: [
        'Solutions de réhydratation orale',
        'Riz et carottes',
        'Bananes',
        'Compote de pommes',
        'Thé léger',
        'Bouillon de légumes'
      ],
      lifestyleChanges: [
        'Régime sans résidus',
        'Hydratation abondante',
        'Repos',
        'Hygiène des mains',
        'Éviter les produits laitiers temporairement'
      ],
      emergencyActions: [
        'Consultation si déshydratation',
        'Surveillance des signes de gravité',
        'Hospitalisation si nécessaire'
      ],
      consultationAdvice: 'Consultation si persistance >48h ou signes de déshydratation',
      followUpInstructions: 'Surveillance hydratation, reprise alimentaire progressive',
      alternativeTreatments: ['Probiotiques', 'Argile', 'Charbon activé'],
      drugInteractions: ['Peu d\'interactions'],
      monitoring: ['Surveillance hydratation', 'Signes de déshydratation']
    }
  ],

  // ENDOCRINOLOGIE
  'Diabète de type 2': [
    {
      id: 'diabete-type2',
      condition: 'Diabète de type 2',
      severity: 'moderate',
      medications: [
        {
          molecule: 'Metformine',
          dosage: '500-2000mg/jour',
          frequency: '2-3 fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Insuffisance rénale', 'Insuffisance hépatique', 'Acidose lactique'],
          sideEffects: ['Troubles digestifs', 'Goût métallique', 'Acidose lactique'],
          category: 'Prescription',
          interactions: ['Contraste iodé', 'Alcool'],
          monitoring: ['Créatininémie', 'Glycémie', 'HbA1c'],
          specialPopulations: ['Attention chez l\'insuffisant rénal']
        },
        {
          molecule: 'Gliclazide',
          dosage: '80-320mg/jour',
          frequency: '1-2 fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Insuffisance hépatique', 'Grossesse', 'Allaitement'],
          sideEffects: ['Hypoglycémie', 'Prise de poids', 'Troubles digestifs'],
          category: 'Prescription',
          interactions: ['Warfarine', 'Salicylates'],
          monitoring: ['Glycémie', 'HbA1c', 'Surveillance hypoglycémie'],
          specialPopulations: ['Attention chez l\'insuffisant rénal']
        },
        {
          molecule: 'Insuline glargine',
          dosage: 'Selon prescription',
          frequency: 'Une fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Hypersensibilité', 'Hypoglycémie'],
          sideEffects: ['Hypoglycémie', 'Lipodystrophie', 'Réactions locales'],
          category: 'Prescription',
          interactions: ['Bêta-bloquants', 'Alcool'],
          monitoring: ['Glycémie', 'HbA1c', 'Surveillance hypoglycémie'],
          specialPopulations: ['Attention chez l\'insuffisant rénal']
        }
      ],
      naturalRemedies: [
        'Cannelle (effet modeste)',
        'Fenugrec',
        'Ginseng',
        'Chromium',
        'Exercice physique régulier'
      ],
      lifestyleChanges: [
        'Régime diabétique équilibré',
        'Exercice physique 150min/semaine',
        'Perte de poids si nécessaire',
        'Arrêt du tabac',
        'Contrôle des facteurs de risque'
      ],
      emergencyActions: [
        'Consultation si hypoglycémie sévère',
        'Surveillance des complications',
        'Éducation thérapeutique'
      ],
      consultationAdvice: 'Consultation endocrinologique pour évaluation et traitement',
      followUpInstructions: 'Surveillance glycémique, HbA1c trimestrielle, bilan annuel',
      alternativeTreatments: ['Chirurgie bariatrique', 'Pompe à insuline'],
      drugInteractions: ['Surveillance des interactions multiples'],
      monitoring: ['Glycémie', 'HbA1c', 'Fonction rénale', 'Examen ophtalmologique']
    }
  ],

  // RHUMATOLOGIE
  'Arthrose': [
    {
      id: 'arthrose-genou',
      condition: 'Arthrose du genou',
      severity: 'moderate',
      medications: [
        {
          molecule: 'Paracétamol',
          dosage: '1000mg',
          frequency: '3-4 fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Insuffisance hépatique sévère', 'Allergie'],
          sideEffects: ['Hépatotoxicité en surdosage', 'Rare: éruption'],
          category: 'OTC',
          interactions: ['Warfarine'],
          monitoring: ['Fonction hépatique si traitement prolongé'],
          specialPopulations: ['Réduire la dose chez l\'insuffisant hépatique']
        },
        {
          molecule: 'Ibuprofène',
          dosage: '400-600mg',
          frequency: '3 fois par jour',
          duration: 'Traitement au long cours',
          contraindications: ['Ulcère gastroduodénal', 'Insuffisance cardiaque', 'Grossesse 3ème trimestre'],
          sideEffects: ['Troubles digestifs', 'Risque cardiovasculaire', 'Insuffisance rénale'],
          category: 'OTC',
          interactions: ['Warfarine', 'Diurétiques', 'IEC'],
          monitoring: ['Fonction rénale', 'Surveillance digestive'],
          specialPopulations: ['Attention chez l\'insuffisant rénal/cardiaque']
        },
        {
          molecule: 'Glucosamine',
          dosage: '1500mg',
          frequency: 'Une fois par jour',
          duration: '3-6 mois',
          contraindications: ['Allergie aux crustacés'],
          sideEffects: ['Troubles digestifs', 'Céphalées'],
          category: 'Natural',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Surveillance clinique'],
          specialPopulations: ['Attention chez l\'allergique aux crustacés']
        }
      ],
      naturalRemedies: [
        'Curcuma (anti-inflammatoire naturel)',
        'Gingembre',
        'Oméga-3',
        'Vitamine D',
        'Magnésium'
      ],
      lifestyleChanges: [
        'Perte de poids si nécessaire',
        'Exercice adapté (natation, vélo)',
        'Physiothérapie',
        'Éviter les escaliers',
        'Semelles orthopédiques'
      ],
      emergencyActions: [
        'Consultation si douleur aiguë',
        'Surveillance des signes d\'inflammation',
        'Éviter la surcharge articulaire'
      ],
      consultationAdvice: 'Consultation rhumatologique pour évaluation et traitement',
      followUpInstructions: 'Surveillance clinique, radiographies de contrôle',
      alternativeTreatments: ['Infiltrations', 'Viscosupplémentation', 'Chirurgie prothétique'],
      drugInteractions: ['Surveillance des interactions AINS'],
      monitoring: ['Fonction rénale', 'Surveillance digestive', 'Évaluation de la douleur']
    }
  ],

  // DERMATOLOGIE
  'Eczéma': [
    {
      id: 'eczema-atopique',
      condition: 'Eczéma atopique',
      severity: 'mild',
      medications: [
        {
          molecule: 'Bétaméthasone',
          dosage: 'Crème 0.05%',
          frequency: '1-2 fois par jour',
          duration: 'Maximum 2 semaines',
          contraindications: ['Infections cutanées', 'Hypersensibilité'],
          sideEffects: ['Atrophie cutanée', 'Télangiectasies', 'Stries'],
          category: 'Prescription',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Surveillance cutanée'],
          specialPopulations: ['Attention chez l\'enfant']
        },
        {
          molecule: 'Cétirizine',
          dosage: '10mg',
          frequency: 'Une fois par jour',
          duration: 'Selon prescription',
          contraindications: ['Hypersensibilité', 'Insuffisance rénale sévère'],
          sideEffects: ['Somnolence', 'Sécheresse buccale', 'Fatigue'],
          category: 'OTC',
          interactions: ['Alcool', 'Sédatifs'],
          monitoring: ['Fonction rénale'],
          specialPopulations: ['Attention chez l\'insuffisant rénal']
        },
        {
          molecule: 'Tacrolimus',
          dosage: 'Pommade 0.1%',
          frequency: '2 fois par jour',
          duration: 'Traitement intermittent',
          contraindications: ['Hypersensibilité', 'Infections cutanées'],
          sideEffects: ['Brûlures locales', 'Prurit', 'Érythème'],
          category: 'Prescription',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Surveillance cutanée'],
          specialPopulations: ['Attention chez l\'enfant <2 ans']
        }
      ],
      naturalRemedies: [
        'Émollients (vaseline, crèmes hydratantes)',
        'Huile d\'amande douce',
        'Avoine colloïdale',
        'Aloe vera',
        'Calendula'
      ],
      lifestyleChanges: [
        'Éviter les irritants',
        'Hydratation cutanée régulière',
        'Vêtements en coton',
        'Éviter les bains chauds',
        'Gestion du stress'
      ],
      emergencyActions: [
        'Consultation si surinfection',
        'Surveillance des signes d\'infection',
        'Éviter le grattage'
      ],
      consultationAdvice: 'Consultation dermatologique pour évaluation et traitement',
      followUpInstructions: 'Surveillance cutanée, éducation thérapeutique',
      alternativeTreatments: ['Photothérapie', 'Immunosuppresseurs', 'Biothérapies'],
      drugInteractions: ['Peu d\'interactions'],
      monitoring: ['Surveillance cutanée', 'Signes d\'infection', 'Efficacité du traitement']
    }
  ],

  // UROLOGIE
  'Cystite': [
    {
      id: 'cystite-simple',
      condition: 'Cystite simple',
      severity: 'mild',
      medications: [
        {
          molecule: 'Fosfomycine trométamol',
          dosage: '3g',
          frequency: 'Dose unique',
          duration: '1 jour',
          contraindications: ['Insuffisance rénale sévère', 'Hypersensibilité'],
          sideEffects: ['Diarrhée', 'Nausées', 'Céphalées'],
          category: 'Prescription',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Fonction rénale'],
          specialPopulations: ['Attention chez l\'insuffisant rénal']
        },
        {
          molecule: 'Nitrofurantoïne',
          dosage: '100mg',
          frequency: '2 fois par jour',
          duration: '5 jours',
          contraindications: ['Insuffisance rénale', 'Déficit en G6PD', 'Grossesse'],
          sideEffects: ['Troubles digestifs', 'Neuropathie', 'Pneumopathie'],
          category: 'Prescription',
          interactions: ['Antiacides', 'Probenecide'],
          monitoring: ['Fonction rénale', 'Surveillance neurologique'],
          specialPopulations: ['Contre-indiqué chez la femme enceinte']
        },
        {
          molecule: 'Phénazopyridine',
          dosage: '200mg',
          frequency: '3 fois par jour',
          duration: '2-3 jours',
          contraindications: ['Insuffisance rénale', 'Hypersensibilité'],
          sideEffects: ['Coloration urinaire', 'Troubles digestifs'],
          category: 'OTC',
          interactions: ['Peu d\'interactions'],
          monitoring: ['Fonction rénale'],
          specialPopulations: ['Attention chez l\'insuffisant rénal']
        }
      ],
      naturalRemedies: [
        'Hydratation abondante',
        'Jus de canneberge',
        'D-mannose',
        'Probiotiques',
        'Vitamine C'
      ],
      lifestyleChanges: [
        'Hygiène intime',
        'Miction post-coïtale',
        'Éviter la constipation',
        'Vider complètement la vessie',
        'Éviter les produits irritants'
      ],
      emergencyActions: [
        'Consultation si fièvre',
        'Surveillance des signes de pyélonéphrite',
        'ECBU si récidive'
      ],
      consultationAdvice: 'Consultation si récidive ou signes de gravité',
      followUpInstructions: 'ECBU de contrôle, prévention des récidives',
      alternativeTreatments: ['Probiotiques', 'D-mannose', 'Cranberry'],
      drugInteractions: ['Peu d\'interactions'],
      monitoring: ['ECBU', 'Signes de pyélonéphrite', 'Récidives']
    }
  ]
};

// Fonction pour rechercher un traitement
export function findVidalTreatment(condition: string, severity?: string): VidalTreatment | null {
  const treatments = vidalTreatments[condition];
  if (!treatments) return null;
  
  if (severity) {
    return treatments.find(t => t.severity === severity) || treatments[0];
  }
  
  return treatments[0];
}

// Fonction pour obtenir tous les traitements d'une condition
export function getAllVidalTreatments(condition: string): VidalTreatment[] {
  return vidalTreatments[condition] || [];
}

// Fonction pour rechercher par médicament
export function searchByMedication(molecule: string): VidalTreatment[] {
  const results: VidalTreatment[] = [];
  
  for (const condition in vidalTreatments) {
    for (const treatment of vidalTreatments[condition]) {
      if (treatment.medications.some(med => 
        med.molecule.toLowerCase().includes(molecule.toLowerCase())
      )) {
        results.push(treatment);
      }
    }
  }
  
  return results;
}
