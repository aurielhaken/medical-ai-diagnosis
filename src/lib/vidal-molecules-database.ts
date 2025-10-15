// Base de données complète des molécules Vidal avec propriétés détaillées
// Intégration avec médecines alternatives et remèdes traditionnels

export interface VidalMolecule {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  category: 'Analgésique' | 'Anti-inflammatoire' | 'Antibiotique' | 'Antihistaminique' | 'Antidépresseur' | 'Anxiolytique' | 'Anticoagulant' | 'Hypoglycémiant' | 'Antihypertenseur' | 'Bronchodilatateur' | 'Corticostéroïde' | 'Diurétique' | 'Antispasmodique' | 'Laxatif' | 'Antiacide' | 'Vaccin' | 'Autre';
  subcategory: string;
  mechanismOfAction: string;
  indications: string[];
  contraindications: string[];
  sideEffects: {
    common: string[];
    rare: string[];
    serious: string[];
  };
  interactions: {
    drugs: string[];
    foods: string[];
    supplements: string[];
  };
  dosage: {
    adult: string;
    pediatric: string;
    elderly: string;
    renal: string;
    hepatic: string;
  };
  pharmacokinetics: {
    absorption: string;
    distribution: string;
    metabolism: string;
    elimination: string;
    halfLife: string;
  };
  monitoring: string[];
  pregnancy: {
    category: 'A' | 'B' | 'C' | 'D' | 'X';
    advice: string;
  };
  breastfeeding: string;
  overdose: {
    symptoms: string[];
    treatment: string[];
  };
  alternatives: {
    conventional: string[];
    natural: string[];
    traditional: string[];
    homeopathic: string[];
  };
  youtubeVideos: {
    exercise: string[];
    explanation: string[];
    remedy: string[];
  };
  grandmaRemedies: string[];
  orientalMedicine: string[];
  exerciseRecommendations: string[];
  positions: string[];
  recipes: string[];
}

// Base de données complète des molécules Vidal
export const vidalMolecules: VidalMolecule[] = [
  {
    id: 'paracetamol',
    name: 'Paracétamol',
    genericName: 'Acetaminophen',
    brandNames: ['Doliprane', 'Efferalgan', 'Dafalgan', 'Paracetamol EG'],
    category: 'Analgésique',
    subcategory: 'Antalgique non opioïde',
    mechanismOfAction: 'Inhibition de la cyclooxygénase dans le système nerveux central, réduisant la production de prostaglandines responsables de la douleur et de la fièvre',
    indications: [
      'Douleurs légères à modérées',
      'Fièvre',
      'Migraines',
      'Douleurs dentaires',
      'Douleurs menstruelles',
      'Arthrose',
      'Mal de dos'
    ],
    contraindications: [
      'Insuffisance hépatique sévère',
      'Allergie au paracétamol',
      'Maladie de Gilbert',
      'Alcoolisme chronique'
    ],
    sideEffects: {
      common: ['Rare: éruption cutanée', 'Nausées légères'],
      rare: ['Troubles hépatiques', 'Réactions allergiques'],
      serious: ['Hépatotoxicité en surdosage', 'Nécrose hépatique', 'Insuffisance hépatique']
    },
    interactions: {
      drugs: ['Warfarine (surveillance INR)', 'Phénobarbital', 'Isoniazide'],
      foods: ['Alcool (risque hépatique)', 'Caféine (potentialisation)'],
      supplements: ['Charbon activé', 'Magnésium']
    },
    dosage: {
      adult: '500-1000mg toutes les 6-8h, maximum 4g/jour',
      pediatric: '15mg/kg toutes les 6h, maximum 60mg/kg/jour',
      elderly: 'Réduire de 25% chez les >75 ans',
      renal: 'Pas d\'ajustement nécessaire',
      hepatic: 'Contre-indiqué en cas d\'insuffisance sévère'
    },
    pharmacokinetics: {
      absorption: 'Rapide et complète par voie orale (30-60 min)',
      distribution: 'Distribution dans tous les tissus',
      metabolism: 'Métabolisé principalement dans le foie (glucuronoconjugaison et sulfoconjugaison)',
      elimination: 'Éliminé par les urines (90%) et fèces (10%)',
      halfLife: '2-4 heures'
    },
    monitoring: [
      'Fonction hépatique si traitement prolongé',
      'Surveillance des signes de surdosage',
      'Dosage plasmatique si suspicion de surdosage'
    ],
    pregnancy: {
      category: 'B',
      advice: 'Utilisable pendant la grossesse aux doses recommandées'
    },
    breastfeeding: 'Compatible avec l\'allaitement',
    overdose: {
      symptoms: ['Nausées', 'Vomissements', 'Douleur abdominale', 'Jaunisse', 'Confusion'],
      treatment: ['N-acétylcystéine IV', 'Charbon activé', 'Support hépatique']
    },
    alternatives: {
      conventional: ['Ibuprofène', 'Aspirine', 'Tramadol'],
      natural: ['Curcuma', 'Gingembre', 'Cannelle', 'Menthe poivrée'],
      traditional: ['Saule blanc', 'Reine-des-prés', 'Bouleau'],
      homeopathic: ['Arnica montana', 'Belladonna', 'Chamomilla']
    },
    youtubeVideos: {
      exercise: [
        'https://youtube.com/watch?v=exercices-mal-de-dos',
        'https://youtube.com/watch?v=postures-migraine'
      ],
      explanation: [
        'https://youtube.com/watch?v=paracetamol-mechanisme',
        'https://youtube.com/watch?v=douleur-fièvre'
      ],
      remedy: [
        'https://youtube.com/watch?v=remedes-naturels-douleur',
        'https://youtube.com/watch?v=alternatives-paracetamol'
      ]
    },
    grandmaRemedies: [
      'Compresse froide sur le front pour la fièvre',
      'Thé de camomille pour les maux de tête',
      'Gingembre frais râpé dans de l\'eau chaude',
      'Huile essentielle de menthe poivrée en massage'
    ],
    orientalMedicine: [
      'Acupuncture pour la douleur',
      'Points d\'acupression LI4 et GB20',
      'Moxibustion sur CV4',
      'Thé vert au gingembre'
    ],
    exerciseRecommendations: [
      'Étirements doux pour les douleurs musculaires',
      'Respiration profonde pour la relaxation',
      'Marche légère pour améliorer la circulation',
      'Yoga doux pour les tensions'
    ],
    positions: [
      'Position allongée avec oreiller sous les genoux',
      'Position assise avec support lombaire',
      'Position latérale avec coussin entre les genoux'
    ],
    recipes: [
      'Infusion de saule blanc: 1 cuillère à café d\'écorce dans 250ml d\'eau bouillante',
      'Compresse de gingembre: râper du gingembre frais, envelopper dans une gaze',
      'Massage aux huiles essentielles: 2 gouttes de menthe + 1 cuillère d\'huile d\'amande'
    ]
  },

  {
    id: 'ibuprofen',
    name: 'Ibuprofène',
    genericName: 'Ibuprofen',
    brandNames: ['Advil', 'Nurofen', 'Spedifen', 'Ibuprofen EG'],
    category: 'Anti-inflammatoire',
    subcategory: 'AINS (Anti-inflammatoire non stéroïdien)',
    mechanismOfAction: 'Inhibition de la cyclooxygénase (COX-1 et COX-2), réduisant la production de prostaglandines responsables de l\'inflammation, de la douleur et de la fièvre',
    indications: [
      'Douleurs inflammatoires',
      'Arthrose',
      'Polyarthrite rhumatoïde',
      'Migraines',
      'Douleurs dentaires',
      'Fièvre',
      'Douleurs menstruelles'
    ],
    contraindications: [
      'Ulcère gastroduodénal',
      'Insuffisance cardiaque',
      'Insuffisance rénale sévère',
      'Allergie aux AINS',
      'Grossesse 3ème trimestre',
      'Asthme avec intolérance aux AINS'
    ],
    sideEffects: {
      common: ['Troubles digestifs', 'Nausées', 'Douleurs épigastriques'],
      rare: ['Éruption cutanée', 'Vertiges', 'Somnolence'],
      serious: ['Ulcère gastroduodénal', 'Saignement digestif', 'Insuffisance rénale', 'Risque cardiovasculaire']
    },
    interactions: {
      drugs: ['Warfarine', 'Diurétiques', 'IEC', 'Lithium', 'Méthotrexate'],
      foods: ['Alcool (risque digestif)', 'Aliments épicés'],
      supplements: ['Ginkgo biloba', 'Ginseng', 'Ail']
    },
    dosage: {
      adult: '200-400mg 3 fois par jour, maximum 1200mg/jour',
      pediatric: '5-10mg/kg 3 fois par jour',
      elderly: 'Réduire la dose de 25%',
      renal: 'Contre-indiqué si clairance <30ml/min',
      hepatic: 'Réduire la dose de 50%'
    },
    pharmacokinetics: {
      absorption: 'Rapide par voie orale (30-60 min)',
      distribution: 'Liaison protéique élevée (99%)',
      metabolism: 'Métabolisé dans le foie par hydroxylation',
      elimination: 'Éliminé par les urines (90%)',
      halfLife: '2-4 heures'
    },
    monitoring: [
      'Fonction rénale',
      'Surveillance digestive',
      'Tension artérielle',
      'Signes d\'allergie'
    ],
    pregnancy: {
      category: 'C',
      advice: 'Éviter au 3ème trimestre (fermeture du canal artériel)'
    },
    breastfeeding: 'Compatible avec l\'allaitement (faible passage)',
    overdose: {
      symptoms: ['Nausées', 'Vomissements', 'Somnolence', 'Hypotension'],
      treatment: ['Évacuation gastrique', 'Charbon activé', 'Support symptomatique']
    },
    alternatives: {
      conventional: ['Paracétamol', 'Naproxène', 'Diclofénac'],
      natural: ['Curcuma', 'Boswellia', 'Gingembre', 'Arnica'],
      traditional: ['Saule blanc', 'Reine-des-prés', 'Harpagophytum'],
      homeopathic: ['Rhus toxicodendron', 'Bryonia', 'Apis mellifica']
    },
    youtubeVideos: {
      exercise: [
        'https://youtube.com/watch?v=exercices-arthrose',
        'https://youtube.com/watch?v=etirements-inflammation'
      ],
      explanation: [
        'https://youtube.com/watch?v=ains-mecanisme',
        'https://youtube.com/watch?v=inflammation-douleur'
      ],
      remedy: [
        'https://youtube.com/watch?v=anti-inflammatoires-naturels',
        'https://youtube.com/watch?v=curcuma-gingembre'
      ]
    },
    grandmaRemedies: [
      'Compresse chaude sur les zones douloureuses',
      'Bain aux sels d\'Epsom',
      'Massage à l\'huile de camphre',
      'Application d\'argile verte'
    ],
    orientalMedicine: [
      'Acupuncture anti-inflammatoire',
      'Points d\'acupression ST36 et LI11',
      'Moxibustion sur GV4',
      'Thé au curcuma et gingembre'
    ],
    exerciseRecommendations: [
      'Étirements progressifs',
      'Exercices de renforcement musculaire',
      'Natation (port non pesant)',
      'Tai-chi pour la souplesse'
    ],
    positions: [
      'Position allongée avec coussin sous les genoux',
      'Position assise avec support lombaire',
      'Position latérale avec coussin entre les jambes'
    ],
    recipes: [
      'Infusion de saule blanc: 2 cuillères à café d\'écorce dans 500ml d\'eau',
      'Compresse d\'argile verte: mélanger avec de l\'eau tiède, appliquer 20min',
      'Bain aux sels d\'Epsom: 2 tasses de sels dans un bain chaud'
    ]
  },

  {
    id: 'metformin',
    name: 'Metformine',
    genericName: 'Metformin',
    brandNames: ['Glucophage', 'Metformin EG', 'Stagid'],
    category: 'Hypoglycémiant',
    subcategory: 'Biguanide',
    mechanismOfAction: 'Améliore la sensibilité à l\'insuline, réduit la production hépatique de glucose et augmente l\'utilisation périphérique du glucose',
    indications: [
      'Diabète de type 2',
      'Prévention du diabète',
      'Syndrome des ovaires polykystiques',
      'Résistance à l\'insuline',
      'Prévention des complications diabétiques'
    ],
    contraindications: [
      'Insuffisance rénale',
      'Insuffisance hépatique',
      'Acidose lactique',
      'Contraste iodé',
      'Alcoolisme chronique',
      'Hypoxie'
    ],
    sideEffects: {
      common: ['Troubles digestifs', 'Diarrhée', 'Nausées', 'Goût métallique'],
      rare: ['Éruption cutanée', 'Déficit en vitamine B12'],
      serious: ['Acidose lactique', 'Hypoglycémie (rare)', 'Insuffisance rénale']
    },
    interactions: {
      drugs: ['Contraste iodé', 'Alcool', 'Cimétidine', 'Digoxine'],
      foods: ['Alcool (risque d\'acidose lactique)'],
      supplements: ['B12', 'Folate', 'Coenzyme Q10']
    },
    dosage: {
      adult: '500-2000mg/jour en 2-3 prises',
      pediatric: 'Non recommandé <10 ans',
      elderly: 'Surveillance rénale renforcée',
      renal: 'Contre-indiqué si clairance <30ml/min',
      hepatic: 'Contre-indiqué en cas d\'insuffisance'
    },
    pharmacokinetics: {
      absorption: 'Incomplète par voie orale (50-60%)',
      distribution: 'Distribution dans les tissus',
      metabolism: 'Non métabolisé',
      elimination: 'Éliminé inchangé par les urines',
      halfLife: '6-8 heures'
    },
    monitoring: [
      'Glycémie',
      'HbA1c',
      'Fonction rénale',
      'Vitamine B12',
      'Acidose lactique'
    ],
    pregnancy: {
      category: 'B',
      advice: 'Utilisable pendant la grossesse si nécessaire'
    },
    breastfeeding: 'Compatible avec l\'allaitement',
    overdose: {
      symptoms: ['Nausées', 'Vomissements', 'Diarrhée', 'Acidose lactique'],
      treatment: ['Arrêt du médicament', 'Correction de l\'acidose', 'Support symptomatique']
    },
    alternatives: {
      conventional: ['Sulfonylurées', 'Glinides', 'Inhibiteurs DPP-4'],
      natural: ['Cannelle', 'Gymnema sylvestre', 'Fenugrec', 'Chromium'],
      traditional: ['Momordica charantia', 'Stevia', 'Aloe vera'],
      homeopathic: ['Syzygium jambolanum', 'Uranium nitricum']
    },
    youtubeVideos: {
      exercise: [
        'https://youtube.com/watch?v=exercices-diabete',
        'https://youtube.com/watch?v=marcher-glycemie'
      ],
      explanation: [
        'https://youtube.com/watch?v=metformine-diabete',
        'https://youtube.com/watch?v=resistance-insuline'
      ],
      remedy: [
        'https://youtube.com/watch?v=aliments-anti-diabete',
        'https://youtube.com/watch?v=plantes-hypoglycemiantes'
      ]
    },
    grandmaRemedies: [
      'Cannelle dans les boissons',
      'Fenugrec trempé dans l\'eau',
      'Graines de chia pour la satiété',
      'Vinaigre de cidre avant les repas'
    ],
    orientalMedicine: [
      'Acupuncture pour l\'équilibre glycémique',
      'Points d\'acupression ST36 et SP6',
      'Moxibustion sur CV12',
      'Thé au ginseng et rehmannia'
    ],
    exerciseRecommendations: [
      'Marche régulière 30min/jour',
      'Exercices de résistance',
      'Yoga pour le stress',
      'Cyclisme modéré'
    ],
    positions: [
      'Position assise après les repas',
      'Marche post-prandiale',
      'Exercices en position debout'
    ],
    recipes: [
      'Infusion de cannelle: 1 bâton dans 250ml d\'eau chaude',
      'Graines de fenugrec: 1 cuillère trempée toute la nuit',
      'Vinaigre de cidre: 1 cuillère dans un verre d\'eau avant les repas'
    ]
  },

  {
    id: 'amoxicillin',
    name: 'Amoxicilline',
    genericName: 'Amoxicillin',
    brandNames: ['Clamoxyl', 'Amoxicillin EG', 'Augmentin'],
    category: 'Antibiotique',
    subcategory: 'Pénicilline',
    mechanismOfAction: 'Inhibition de la synthèse de la paroi bactérienne en bloquant les transpeptidases, entraînant la lyse bactérienne',
    indications: [
      'Infections respiratoires',
      'Infections urinaires',
      'Infections cutanées',
      'Otites',
      'Sinusites',
      'Infections dentaires',
      'Maladie de Lyme'
    ],
    contraindications: [
      'Allergie aux pénicillines',
      'Mononucléose infectieuse',
      'Leucémie lymphoïde chronique'
    ],
    sideEffects: {
      common: ['Diarrhée', 'Nausées', 'Vomissements', 'Éruption cutanée'],
      rare: ['Candidose', 'Colite pseudomembraneuse'],
      serious: ['Choc anaphylactique', 'Syndrome de Stevens-Johnson', 'Toxicité hépatique']
    },
    interactions: {
      drugs: ['Méthotrexate', 'Warfarine', 'Contraceptifs oraux'],
      foods: ['Aliments acides', 'Produits laitiers'],
      supplements: ['Probiotiques', 'Vitamine K']
    },
    dosage: {
      adult: '500mg-1g 3 fois par jour',
      pediatric: '25-50mg/kg/jour en 3 prises',
      elderly: 'Ajustement selon la fonction rénale',
      renal: 'Réduire si clairance <30ml/min',
      hepatic: 'Pas d\'ajustement nécessaire'
    },
    pharmacokinetics: {
      absorption: 'Excellente par voie orale (90-95%)',
      distribution: 'Large distribution tissulaire',
      metabolism: 'Métabolisé partiellement dans le foie',
      elimination: 'Éliminé par les urines (60-80%)',
      halfLife: '1-1.5 heures'
    },
    monitoring: [
      'Signes d\'allergie',
      'Fonction rénale',
      'Signes d\'infection fongique',
      'Surveillance digestive'
    ],
    pregnancy: {
      category: 'B',
      advice: 'Utilisable pendant la grossesse'
    },
    breastfeeding: 'Compatible avec l\'allaitement',
    overdose: {
      symptoms: ['Nausées', 'Vomissements', 'Diarrhée'],
      treatment: ['Évacuation gastrique', 'Charbon activé', 'Support symptomatique']
    },
    alternatives: {
      conventional: ['Céphalexine', 'Azithromycine', 'Clarithromycine'],
      natural: ['Propolis', 'Ail', 'Échinacée', 'Pépins de pamplemousse'],
      traditional: ['Miel de manuka', 'Extrait de pépins de pamplemousse', 'Argent colloïdal'],
      homeopathic: ['Pyrogenium', 'Baptisia', 'Echinacea']
    },
    youtubeVideos: {
      exercise: [
        'https://youtube.com/watch?v=exercices-renforcement-immunitaire',
        'https://youtube.com/watch?v=respiration-propre'
      ],
      explanation: [
        'https://youtube.com/watch?v=antibiotiques-resistance',
        'https://youtube.com/watch?v=infections-bacteriennes'
      ],
      remedy: [
        'https://youtube.com/watch?v=antibiotiques-naturels',
        'https://youtube.com/watch?v=propolis-echinacee'
      ]
    },
    grandmaRemedies: [
      'Miel et citron pour la toux',
      'Gargarismes au sel et eau tiède',
      'Infusion de thym et romarin',
      'Compresse chaude sur les sinus'
    ],
    orientalMedicine: [
      'Acupuncture pour renforcer l\'immunité',
      'Points d\'acupression LI4 et ST36',
      'Moxibustion sur GV14',
      'Thé au ginseng et astragale'
    ],
    exerciseRecommendations: [
      'Repos pendant l\'infection',
      'Exercices respiratoires doux',
      'Marche légère quand possible',
      'Hydratation abondante'
    ],
    positions: [
      'Position semi-assise pour les infections respiratoires',
      'Position allongée avec surélévation de la tête',
      'Position latérale pour le drainage'
    ],
    recipes: [
      'Infusion de thym: 1 cuillère dans 250ml d\'eau bouillante',
      'Miel et citron: 1 cuillère de miel + jus de citron dans de l\'eau chaude',
      'Gargarisme au sel: 1 cuillère à café de sel dans 250ml d\'eau tiède'
    ]
  },

  {
    id: 'omeprazole',
    name: 'Oméprazole',
    genericName: 'Omeprazole',
    brandNames: ['Mopral', 'Omeprazole EG', 'Zoltum'],
    category: 'Autre',
    subcategory: 'Inhibiteur de la pompe à protons',
    mechanismOfAction: 'Inhibition irréversible de la pompe à protons H+/K+-ATPase dans les cellules pariétales gastriques, réduisant la sécrétion acide',
    indications: [
      'Reflux gastro-œsophagien',
      'Ulcère gastroduodénal',
      'Syndrome de Zollinger-Ellison',
      'Gastrite érosive',
      'Prévention des ulcères de stress',
      'Œsophagite peptique'
    ],
    contraindications: [
      'Hypersensibilité au médicament',
      'Tumeur gastrique suspectée',
      'Grossesse (1er trimestre)'
    ],
    sideEffects: {
      common: ['Maux de tête', 'Nausées', 'Diarrhée', 'Douleurs abdominales'],
      rare: ['Éruption cutanée', 'Vertiges', 'Troubles du goût'],
      serious: ['Déficit en magnésium', 'Déficit en vitamine B12', 'Ostéoporose', 'Infections digestives']
    },
    interactions: {
      drugs: ['Warfarine', 'Phénytoïne', 'Clopidogrel', 'Méthotrexate'],
      foods: ['Aliments acides', 'Alcool'],
      supplements: ['Magnésium', 'Vitamine B12', 'Calcium', 'Fer']
    },
    dosage: {
      adult: '20-40mg une fois par jour',
      pediatric: '0.5-1mg/kg/jour',
      elderly: 'Pas d\'ajustement nécessaire',
      renal: 'Pas d\'ajustement nécessaire',
      hepatic: 'Réduire la dose de 50%'
    },
    pharmacokinetics: {
      absorption: 'Rapide mais variable (30-60%)',
      distribution: 'Liaison protéique élevée (95%)',
      metabolism: 'Métabolisé dans le foie par CYP2C19',
      elimination: 'Éliminé par les urines (80%)',
      halfLife: '1-2 heures'
    },
    monitoring: [
      'Magnésium sérique',
      'Vitamine B12',
      'Densité osseuse si traitement prolongé',
      'Signes d\'infection'
    ],
    pregnancy: {
      category: 'C',
      advice: 'Éviter au 1er trimestre'
    },
    breastfeeding: 'Compatible avec l\'allaitement',
    overdose: {
      symptoms: ['Nausées', 'Vomissements', 'Somnolence'],
      treatment: ['Support symptomatique', 'Surveillance cardiaque']
    },
    alternatives: {
      conventional: ['Ranitidine', 'Famotidine', 'Cimétidine'],
      natural: ['Aloe vera', 'Réglisse', 'Camomille', 'Gingembre'],
      traditional: ['Bicarbonate de soude', 'Vinaigre de cidre', 'Jus d\'aloe vera'],
      homeopathic: ['Nux vomica', 'Arsenicum album', 'Carbo vegetabilis']
    },
    youtubeVideos: {
      exercise: [
        'https://youtube.com/watch?v=exercices-reflux',
        'https://youtube.com/watch?v=postures-digestives'
      ],
      explanation: [
        'https://youtube.com/watch?v=reflux-gastro-oesophagien',
        'https://youtube.com/watch?v=acide-gastrique'
      ],
      remedy: [
        'https://youtube.com/watch?v=remedes-naturels-reflux',
        'https://youtube.com/watch?v=aliments-anti-acide'
      ]
    },
    grandmaRemedies: [
      'Bicarbonate de soude dans l\'eau',
      'Jus d\'aloe vera pur',
      'Infusion de camomille',
      'Mâcher des graines d\'anis'
    ],
    orientalMedicine: [
      'Acupuncture pour l\'estomac',
      'Points d\'acupression ST36 et CV12',
      'Moxibustion sur CV12',
      'Thé au gingembre et réglisse'
    ],
    exerciseRecommendations: [
      'Éviter les exercices après les repas',
      'Marche légère pour la digestion',
      'Exercices de respiration',
      'Yoga pour la relaxation'
    ],
    positions: [
      'Position semi-assise après les repas',
      'Surélévation de la tête au lit',
      'Éviter la position couchée après manger'
    ],
    recipes: [
      'Infusion de camomille: 2 cuillères dans 250ml d\'eau bouillante',
      'Jus d\'aloe vera: 30ml pur le matin à jeun',
      'Eau au bicarbonate: 1 cuillère à café dans un verre d\'eau'
    ]
  }
];

// Fonction pour rechercher une molécule par nom
export function findVidalMolecule(name: string): VidalMolecule | null {
  return vidalMolecules.find(molecule => 
    molecule.name.toLowerCase().includes(name.toLowerCase()) ||
    molecule.genericName.toLowerCase().includes(name.toLowerCase()) ||
    molecule.brandNames.some(brand => brand.toLowerCase().includes(name.toLowerCase()))
  ) || null;
}

// Fonction pour rechercher par catégorie
export function getMoleculesByCategory(category: string): VidalMolecule[] {
  return vidalMolecules.filter(molecule => 
    molecule.category.toLowerCase().includes(category.toLowerCase())
  );
}

// Fonction pour rechercher par indication
export function getMoleculesByIndication(indication: string): VidalMolecule[] {
  return vidalMolecules.filter(molecule =>
    molecule.indications.some(ind => ind.toLowerCase().includes(indication.toLowerCase()))
  );
}

// Fonction pour comparer avec les alternatives
export function getMoleculeAlternatives(moleculeId: string): {
  conventional: string[];
  natural: string[];
  traditional: string[];
  homeopathic: string[];
} | null {
  const molecule = vidalMolecules.find(m => m.id === moleculeId);
  return molecule ? molecule.alternatives : null;
}

// Fonction pour obtenir les recommandations d'exercices
export function getExerciseRecommendations(moleculeId: string): {
  exercises: string[];
  positions: string[];
  youtubeVideos: string[];
} | null {
  const molecule = vidalMolecules.find(m => m.id === moleculeId);
  if (!molecule) return null;
  
  return {
    exercises: molecule.exerciseRecommendations,
    positions: molecule.positions,
    youtubeVideos: [
      ...molecule.youtubeVideos.exercise,
      ...molecule.youtubeVideos.explanation,
      ...molecule.youtubeVideos.remedy
    ]
  };
}

// Fonction pour obtenir les remèdes de grand-mère
export function getGrandmaRemedies(moleculeId: string): string[] | null {
  const molecule = vidalMolecules.find(m => m.id === moleculeId);
  return molecule ? molecule.grandmaRemedies : null;
}

// Fonction pour obtenir la médecine orientale
export function getOrientalMedicine(moleculeId: string): string[] | null {
  const molecule = vidalMolecules.find(m => m.id === moleculeId);
  return molecule ? molecule.orientalMedicine : null;
}

// Fonction de recherche complète
export function searchMolecules(query: string): {
  molecules: VidalMolecule[];
  categories: string[];
  indications: string[];
} {
  const queryLower = query.toLowerCase();
  
  const molecules = vidalMolecules.filter(molecule =>
    molecule.name.toLowerCase().includes(queryLower) ||
    molecule.genericName.toLowerCase().includes(queryLower) ||
    molecule.brandNames.some(brand => brand.toLowerCase().includes(queryLower)) ||
    molecule.indications.some(ind => ind.toLowerCase().includes(queryLower)) ||
    molecule.category.toLowerCase().includes(queryLower)
  );
  
  const categories = [...new Set(molecules.map(m => m.category))];
  const indications = [...new Set(molecules.flatMap(m => m.indications))];
  
  return { molecules, categories, indications };
}
