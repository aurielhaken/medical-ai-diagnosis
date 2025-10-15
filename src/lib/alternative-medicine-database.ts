// Base de données complète des médecines alternatives et remèdes traditionnels
// Intégration avec exercices, positions et vidéos YouTube

export interface AlternativeMedicine {
  id: string;
  name: string;
  category: 'Médecine Traditionnelle Chinoise' | 'Ayurveda' | 'Naturopathie' | 'Homéopathie' | 'Phytothérapie' | 'Aromathérapie' | 'Remèdes de Grand-mère' | 'Thérapies Corporelles' | 'Médecine Arabe' | 'Médecine Tibétaine';
  subcategory: string;
  origin: string;
  description: string;
  indications: string[];
  contraindications: string[];
  preparation: string;
  dosage: string;
  duration: string;
  benefits: string[];
  sideEffects: string[];
  interactions: string[];
  youtubeVideos: {
    preparation: string[];
    explanation: string[];
    exercises: string[];
    massage: string[];
  };
  exercises: {
    positions: string[];
    movements: string[];
    breathing: string[];
    meditation: string[];
  };
  recipes: {
    internal: string[];
    external: string[];
    bath: string[];
    compress: string[];
  };
  grandmaRemedies: string[];
  scientificEvidence: 'Élevée' | 'Modérée' | 'Limitée' | 'Traditionnelle' | 'Anecdotique';
  safety: 'Sûr' | 'Précautions' | 'Contre-indiqué' | 'Surveillance médicale';
  cost: 'Gratuit' | 'Faible' | 'Modéré' | 'Élevé';
}

export interface ExerciseRecommendation {
  id: string;
  name: string;
  condition: string;
  type: 'Position' | 'Mouvement' | 'Respiration' | 'Méditation' | 'Massage';
  description: string;
  instructions: string[];
  duration: string;
  frequency: string;
  precautions: string[];
  benefits: string[];
  youtubeVideo: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  equipment: string[];
}

export interface ConditionSpecificRemedies {
  condition: string;
  conventional: string[];
  natural: string[];
  traditional: string[];
  exercises: ExerciseRecommendation[];
  positions: string[];
  youtubeVideos: string[];
  grandmaRemedies: string[];
  orientalMedicine: string[];
  recipes: string[];
}

// Base de données des médecines alternatives
export const alternativeMedicines: AlternativeMedicine[] = [
  {
    id: 'curcuma',
    name: 'Curcuma',
    category: 'Phytothérapie',
    subcategory: 'Anti-inflammatoire naturel',
    origin: 'Asie du Sud-Est',
    description: 'Plante rhizomateuse aux propriétés anti-inflammatoires, antioxydantes et hépatoprotectrices. La curcumine est le principe actif principal.',
    indications: [
      'Inflammation articulaire',
      'Arthrose',
      'Polyarthrite rhumatoïde',
      'Douleurs musculaires',
      'Problèmes digestifs',
      'Protection hépatique',
      'Maladies cardiovasculaires',
      'Prévention du cancer'
    ],
    contraindications: [
      'Calculs biliaires',
      'Grossesse (fortes doses)',
      'Allaitement',
      'Chirurgie programmée',
      'Troubles de la coagulation'
    ],
    preparation: 'Poudre de rhizome séché, extrait standardisé, ou rhizome frais',
    dosage: '500-1000mg/jour de curcumine pure, 1-3g de poudre',
    duration: '3-6 mois pour les effets anti-inflammatoires',
    benefits: [
      'Réduction de l\'inflammation',
      'Protection antioxydante',
      'Amélioration de la digestion',
      'Protection cardiovasculaire',
      'Soutien immunitaire',
      'Protection hépatique'
    ],
    sideEffects: [
      'Nausées légères',
      'Diarrhée (fortes doses)',
      'Coloration jaune des selles',
      'Allergies cutanées (rare)'
    ],
    interactions: [
      'Anticoagulants',
      'Antiagrégants plaquettaires',
      'Chimiothérapie',
      'Médicaments hépatiques'
    ],
    youtubeVideos: {
      preparation: [
        'https://youtube.com/watch?v=curcuma-preparation',
        'https://youtube.com/watch?v=curcuma-dosage'
      ],
      explanation: [
        'https://youtube.com/watch?v=curcuma-proprietes',
        'https://youtube.com/watch?v=curcumine-inflammation'
      ],
      exercises: [
        'https://youtube.com/watch?v=exercices-arthrose-curcuma',
        'https://youtube.com/watch?v=yoga-inflammation'
      ],
      massage: [
        'https://youtube.com/watch?v=massage-curcuma-huile',
        'https://youtube.com/watch?v=auto-massage-articulations'
      ]
    },
    exercises: {
      positions: [
        'Position du lotus pour la méditation',
        'Position assise avec support lombaire',
        'Position allongée avec coussin sous les genoux'
      ],
      movements: [
        'Mouvements circulaires des articulations',
        'Étirements doux',
        'Marche méditative'
      ],
      breathing: [
        'Respiration diaphragmatique',
        'Respiration 4-7-8',
        'Respiration alternée'
      ],
      meditation: [
        'Méditation de pleine conscience',
        'Visualisation de guérison',
        'Méditation sur la gratitude'
      ]
    },
    recipes: {
      internal: [
        'Lait d\'or: 1 cuillère de curcuma + 1 pincée de poivre noir + 1 tasse de lait végétal chaud',
        'Smoothie anti-inflammatoire: curcuma + gingembre + ananas + épinards',
        'Infusion de curcuma: 1 cuillère dans 250ml d\'eau bouillante + miel'
      ],
      external: [
        'Cataplasme: poudre de curcuma + eau tiède, appliquer sur les articulations',
        'Huile de massage: curcuma + huile de coco + quelques gouttes d\'huile essentielle',
        'Masque facial: curcuma + miel + lait pour les peaux sensibles'
      ],
      bath: [
        'Bain au curcuma: 2 cuillères de poudre dans l\'eau du bain',
        'Bain aux sels d\'Epsom + curcuma pour la relaxation'
      ],
      compress: [
        'Compresse chaude: curcuma + eau chaude + gaze',
        'Compresse froide: curcuma + eau froide pour les inflammations aiguës'
      ]
    },
    grandmaRemedies: [
      'Poudre de curcuma dans les plats',
      'Curcuma frais râpé dans les salades',
      'Boisson au curcuma avant le coucher',
      'Curcuma + miel pour la gorge irritée'
    ],
    scientificEvidence: 'Modérée',
    safety: 'Précautions',
    cost: 'Faible'
  },

  {
    id: 'gingembre',
    name: 'Gingembre',
    category: 'Phytothérapie',
    subcategory: 'Anti-nauséeux et anti-inflammatoire',
    origin: 'Asie du Sud-Est',
    description: 'Rhizome aromatique aux propriétés anti-nauséeuses, anti-inflammatoires et digestives. Riche en gingérols et shogaols.',
    indications: [
      'Nausées et vomissements',
      'Mal des transports',
      'Nausées de grossesse',
      'Douleurs inflammatoires',
      'Problèmes digestifs',
      'Rhume et grippe',
      'Douleurs menstruelles',
      'Migraines'
    ],
    contraindications: [
      'Calculs biliaires',
      'Grossesse (fortes doses)',
      'Allaitement',
      'Troubles de la coagulation',
      'Diabète (surveillance glycémique)'
    ],
    preparation: 'Rhizome frais, séché, en poudre, ou extrait',
    dosage: '1-3g de rhizome séché/jour, 10g de rhizome frais',
    duration: '2-4 semaines pour les nausées, 1-3 mois pour l\'inflammation',
    benefits: [
      'Réduction des nausées',
      'Anti-inflammatoire naturel',
      'Amélioration de la digestion',
      'Stimulation immunitaire',
      'Analgésique naturel',
      'Antioxydant'
    ],
    sideEffects: [
      'Brûlures d\'estomac',
      'Diarrhée (fortes doses)',
      'Allergies cutanées',
      'Interactions avec anticoagulants'
    ],
    interactions: [
      'Anticoagulants',
      'Médicaments anti-diabétiques',
      'Antiacides',
      'Aspirine'
    ],
    youtubeVideos: {
      preparation: [
        'https://youtube.com/watch?v=gingembre-preparation',
        'https://youtube.com/watch?v=the-gingembre-recette'
      ],
      explanation: [
        'https://youtube.com/watch?v=gingembre-proprietes',
        'https://youtube.com/watch?v=gingembre-nausees'
      ],
      exercises: [
        'https://youtube.com/watch?v=exercices-digestion-gingembre',
        'https://youtube.com/watch?v=yoga-nausees'
      ],
      massage: [
        'https://youtube.com/watch?v=massage-gingembre-ventre',
        'https://youtube.com/watch?v=auto-massage-digestif'
      ]
    },
    exercises: {
      positions: [
        'Position assise droite pour la digestion',
        'Position genoux-poitrine pour les nausées',
        'Position latérale gauche après les repas'
      ],
      movements: [
        'Mouvements circulaires du ventre',
        'Étirements doux du dos',
        'Marche lente après les repas'
      ],
      breathing: [
        'Respiration abdominale profonde',
        'Respiration par le nez uniquement',
        'Respiration 4-4-4'
      ],
      meditation: [
        'Méditation de l\'estomac',
        'Visualisation de la digestion',
        'Méditation de gratitude pour la nourriture'
      ]
    },
    recipes: {
      internal: [
        'Thé au gingembre: 2-3 tranches de gingembre frais dans 250ml d\'eau bouillante + miel',
        'Smoothie anti-nausée: gingembre + banane + lait d\'amande',
        'Infusion digestive: gingembre + menthe + citron'
      ],
      external: [
        'Huile de massage: gingembre râpé + huile de coco',
        'Compresse chaude: gingembre + eau chaude + gaze',
        'Bain de pieds: gingembre + eau tiède pour la circulation'
      ],
      bath: [
        'Bain relaxant: gingembre + sels d\'Epsom',
        'Bain stimulant: gingembre + huiles essentielles'
      ],
      compress: [
        'Compresse chaude sur l\'estomac',
        'Compresse froide sur les tempes pour les migraines'
      ]
    },
    grandmaRemedies: [
      'Morceau de gingembre frais à mâcher',
      'Gingembre confit pour les nausées',
      'Boisson chaude au gingembre le matin',
      'Gingembre + miel pour la gorge'
    ],
    scientificEvidence: 'Modérée',
    safety: 'Précautions',
    cost: 'Faible'
  },

  {
    id: 'acupuncture',
    name: 'Acupuncture',
    category: 'Médecine Traditionnelle Chinoise',
    subcategory: 'Thérapie par aiguilles',
    origin: 'Chine ancienne',
    description: 'Technique de médecine traditionnelle chinoise consistant à stimuler des points spécifiques du corps avec des aiguilles fines pour rétablir l\'équilibre énergétique.',
    indications: [
      'Douleurs chroniques',
      'Migraines et céphalées',
      'Douleurs articulaires',
      'Anxiété et stress',
      'Insomnie',
      'Nausées et vomissements',
      'Douleurs menstruelles',
      'Problèmes digestifs',
      'Dépression',
      'Fertilité'
    ],
    contraindications: [
      'Troubles de la coagulation',
      'Infections cutanées aux points d\'insertion',
      'Grossesse (certains points)',
      'Pacemaker (électro-acupuncture)',
      'Phobies des aiguilles'
    ],
    preparation: 'Séance avec acupuncteur diplômé, aiguilles stériles à usage unique',
    dosage: '10-20 aiguilles par séance, stimulation 15-30 minutes',
    duration: '6-12 séances pour les problèmes chroniques',
    benefits: [
      'Réduction de la douleur',
      'Amélioration de la circulation énergétique',
      'Réduction du stress',
      'Amélioration du sommeil',
      'Renforcement de l\'immunité',
      'Équilibrage émotionnel'
    ],
    sideEffects: [
      'Saignement léger aux points d\'insertion',
      'Bruising occasionnel',
      'Fatigue après la séance',
      'Sensation de lourdeur ou de chaleur'
    ],
    interactions: [
      'Anticoagulants (risque de saignement)',
      'Traitements immunosuppresseurs',
      'Médicaments psychotropes'
    ],
    youtubeVideos: {
      preparation: [
        'https://youtube.com/watch?v=acupuncture-preparation',
        'https://youtube.com/watch?v=points-acupuncture'
      ],
      explanation: [
        'https://youtube.com/watch?v=acupuncture-mecanisme',
        'https://youtube.com/watch?v=meridiens-energie'
      ],
      exercises: [
        'https://youtube.com/watch?v=auto-acupression',
        'https://youtube.com/watch?v=points-massage'
      ],
      massage: [
        'https://youtube.com/watch?v=acupression-techniques',
        'https://youtube.com/watch?v=massage-points-energie'
      ]
    },
    exercises: {
      positions: [
        'Position allongée confortable',
        'Position assise avec support lombaire',
        'Position latérale pour les points du dos'
      ],
      movements: [
        'Respiration profonde pendant la séance',
        'Mouvements doux des articulations',
        'Étirements post-séance'
      ],
      breathing: [
        'Respiration abdominale profonde',
        'Respiration 4-7-8 pour la relaxation',
        'Respiration consciente'
      ],
      meditation: [
        'Méditation pendant la séance',
        'Visualisation du flux énergétique',
        'Méditation de gratitude'
      ]
    },
    recipes: {
      internal: [
        'Thé chaud après la séance',
        'Infusion de ginseng pour renforcer l\'énergie',
        'Eau chaude avec citron et miel'
      ],
      external: [
        'Application de chaleur sur les points traités',
        'Massage doux avec huile essentielle',
        'Compresse chaude sur les zones douloureuses'
      ],
      bath: [
        'Bain chaud relaxant après la séance',
        'Bain aux sels d\'Epsom pour la détente'
      ],
      compress: [
        'Compresse chaude sur les points d\'acupuncture',
        'Compresse froide en cas d\'inflammation'
      ]
    },
    grandmaRemedies: [
      'Repos après la séance',
      'Hydratation abondante',
      'Éviter les efforts intenses',
      'Alimentation légère et chaude'
    ],
    scientificEvidence: 'Modérée',
    safety: 'Surveillance médicale',
    cost: 'Modéré'
  },

  {
    id: 'miel-manuka',
    name: 'Miel de Manuka',
    category: 'Remèdes de Grand-mère',
    subcategory: 'Antibiotique naturel',
    origin: 'Nouvelle-Zélande',
    description: 'Miel monofloral produit par les abeilles butinant les fleurs du manuka (Leptospermum scoparium), riche en méthylglyoxal aux propriétés antibactériennes.',
    indications: [
      'Infections cutanées',
      'Brûlures et plaies',
      'Infections de la gorge',
      'Problèmes digestifs',
      'Ulcères gastriques',
      'Gingivites',
      'Acné',
      'Eczéma'
    ],
    contraindications: [
      'Diabète (surveillance glycémique)',
      'Allergie au miel',
      'Enfants de moins d\'1 an',
      'Immunodépression sévère'
    ],
    preparation: 'Miel pur, UMF (Unique Manuka Factor) minimum 10+',
    dosage: '1-2 cuillères à café par jour, application locale selon besoin',
    duration: '1-2 semaines pour les infections aiguës',
    benefits: [
      'Action antibactérienne',
      'Cicatrisation accélérée',
      'Anti-inflammatoire',
      'Stimulation immunitaire',
      'Protection digestive',
      'Hydratation cutanée'
    ],
    sideEffects: [
      'Élévation de la glycémie',
      'Allergies cutanées (rare)',
      'Sensibilité dentaire',
      'Prise de poids si surconsommation'
    ],
    interactions: [
      'Médicaments anti-diabétiques',
      'Anticoagulants (fortes doses)',
      'Antibiotiques (potentialisation)'
    ],
    youtubeVideos: {
      preparation: [
        'https://youtube.com/watch?v=miel-manuka-utilisation',
        'https://youtube.com/watch?v=umf-manuka-explanation'
      ],
      explanation: [
        'https://youtube.com/watch?v=manuka-proprietes',
        'https://youtube.com/watch?v=methylglyoxal-miel'
      ],
      exercises: [
        'https://youtube.com/watch?v=exercices-immunite',
        'https://youtube.com/watch?v=yoga-digestion'
      ],
      massage: [
        'https://youtube.com/watch?v=massage-miel-peau',
        'https://youtube.com/watch?v=auto-massage-ventre'
      ]
    },
    exercises: {
      positions: [
        'Position assise pour l\'ingestion',
        'Position allongée pour l\'application cutanée',
        'Position debout pour les gargarismes'
      ],
      movements: [
        'Mouvements de la langue pour répartir le miel',
        'Mouvements circulaires pour l\'application cutanée',
        'Gargarismes doux'
      ],
      breathing: [
        'Respiration nasale pendant l\'ingestion',
        'Respiration profonde pour la relaxation',
        'Respiration consciente'
      ],
      meditation: [
        'Méditation sur la guérison',
        'Visualisation de la cicatrisation',
        'Méditation de gratitude'
      ]
    },
    recipes: {
      internal: [
        'Miel pur à jeun le matin',
        'Thé au miel de manuka + citron',
        'Smoothie au miel de manuka + banane'
      ],
      external: [
        'Application directe sur les plaies',
        'Masque facial au miel de manuka',
        'Gargarismes avec miel dilué dans l\'eau tiède'
      ],
      bath: [
        'Bain au miel de manuka pour la peau',
        'Bain de bouche au miel dilué'
      ],
      compress: [
        'Compresse au miel de manuka',
        'Cataplasme miel + argile'
      ]
    },
    grandmaRemedies: [
      'Miel pur sur une cuillère',
      'Miel + citron pour la gorge',
      'Miel + cannelle pour l\'immunité',
      'Miel + ail pour les infections'
    ],
    scientificEvidence: 'Modérée',
    safety: 'Précautions',
    cost: 'Élevé'
  }
];

// Base de données des exercices recommandés
export const exerciseRecommendations: ExerciseRecommendation[] = [
  {
    id: 'sciatique-position',
    name: 'Position de décompression sciatique',
    condition: 'Nerf sciatique',
    type: 'Position',
    description: 'Position allongée avec élévation des jambes pour décompresser le nerf sciatique et réduire la douleur.',
    instructions: [
      'Allongez-vous sur le dos',
      'Placez un oreiller sous la tête',
      'Soulevez les jambes à 90° contre un mur ou sur une chaise',
      'Gardez les genoux légèrement fléchis',
      'Restez dans cette position 10-15 minutes',
      'Respirez profondément et détendez-vous'
    ],
    duration: '10-15 minutes',
    frequency: '2-3 fois par jour',
    precautions: [
      'Arrêtez si la douleur augmente',
      'Évitez si vous avez des problèmes cardiaques',
      'Ne forcez pas la position'
    ],
    benefits: [
      'Décompression du nerf sciatique',
      'Réduction de l\'inflammation',
      'Amélioration de la circulation',
      'Relaxation musculaire'
    ],
    youtubeVideo: 'https://youtube.com/watch?v=sciatique-position-decompression',
    difficulty: 'Débutant',
    equipment: ['Oreiller', 'Mur ou chaise']
  },

  {
    id: 'sciatique-etirement',
    name: 'Étirement du muscle piriforme',
    condition: 'Nerf sciatique',
    type: 'Mouvement',
    description: 'Étirement spécifique du muscle piriforme qui peut comprimer le nerf sciatique.',
    instructions: [
      'Allongez-vous sur le dos',
      'Pliez la jambe droite et placez la cheville sur le genou gauche',
      'Attrapez l\'arrière de la cuisse gauche avec les deux mains',
      'Tirez doucement la jambe gauche vers vous',
      'Maintenez l\'étirement 30 secondes',
      'Changez de jambe et répétez'
    ],
    duration: '30 secondes par jambe',
    frequency: '3-4 fois par jour',
    precautions: [
      'Étirement doux, sans forcer',
      'Arrêtez si la douleur augmente',
      'Respiration normale pendant l\'étirement'
    ],
    benefits: [
      'Étirement du muscle piriforme',
      'Réduction de la compression nerveuse',
      'Amélioration de la mobilité',
      'Relaxation musculaire'
    ],
    youtubeVideo: 'https://youtube.com/watch?v=etirement-piriforme-sciatique',
    difficulty: 'Débutant',
    equipment: ['Tapis ou lit']
  },

  {
    id: 'carie-prevention',
    name: 'Techniques de brossage préventif',
    condition: 'Caries dentaires',
    type: 'Mouvement',
    description: 'Techniques de brossage et soins bucco-dentaires pour prévenir les caries et les complications.',
    instructions: [
      'Brossez-vous les dents 2-3 fois par jour',
      'Utilisez une brosse à dents souple',
      'Brossez pendant 2 minutes minimum',
      'Mouvements circulaires doux',
      'N\'oubliez pas la langue',
      'Utilisez du fil dentaire quotidiennement',
      'Rincez avec un bain de bouche fluoré'
    ],
    duration: '2-3 minutes par brossage',
    frequency: '2-3 fois par jour',
    precautions: [
      'Évitez le brossage agressif',
      'Changez de brosse tous les 3 mois',
      'Évitez les aliments sucrés entre les repas'
    ],
    benefits: [
      'Prévention des caries',
      'Élimination de la plaque dentaire',
      'Prévention des maladies parodontales',
      'Haleine fraîche'
    ],
    youtubeVideo: 'https://youtube.com/watch?v=brossage-dents-technique',
    difficulty: 'Débutant',
    equipment: ['Brosse à dents', 'Dentifrice', 'Fil dentaire']
  },

  {
    id: 'respiration-anti-stress',
    name: 'Respiration 4-7-8',
    condition: 'Stress et anxiété',
    type: 'Respiration',
    description: 'Technique de respiration pour réduire le stress et l\'anxiété, basée sur la respiration yogique.',
    instructions: [
      'Asseyez-vous confortablement, dos droit',
      'Placez la pointe de la langue contre le palais',
      'Expirez complètement par la bouche',
      'Inspirez par le nez en comptant jusqu\'à 4',
      'Retenez votre souffle en comptant jusqu\'à 7',
      'Expirez par la bouche en comptant jusqu\'à 8',
      'Répétez le cycle 4 fois'
    ],
    duration: '5-10 minutes',
    frequency: '2-3 fois par jour',
    precautions: [
      'Commencez doucement',
      'Arrêtez si vous vous sentez étourdi',
      'Pratiquez dans un endroit calme'
    ],
    benefits: [
      'Réduction du stress',
      'Amélioration du sommeil',
      'Réduction de l\'anxiété',
      'Équilibrage du système nerveux'
    ],
    youtubeVideo: 'https://youtube.com/watch?v=respiration-4-7-8',
    difficulty: 'Débutant',
    equipment: ['Aucun']
  }
];

// Base de données des remèdes par condition
export const conditionSpecificRemedies: ConditionSpecificRemedies[] = [
  {
    condition: 'Nerf sciatique',
    conventional: [
      'Anti-inflammatoires (ibuprofène)',
      'Relaxants musculaires',
      'Infiltrations corticoïdes',
      'Physiothérapie'
    ],
    natural: [
      'Curcuma (anti-inflammatoire)',
      'Gingembre',
      'Boswellia',
      'Arnica',
      'Magnésium'
    ],
    traditional: [
      'Acupuncture',
      'Massage thérapeutique',
      'Moxibustion',
      'Chiropraxie'
    ],
    exercises: [
      exerciseRecommendations.find(e => e.id === 'sciatique-position')!,
      exerciseRecommendations.find(e => e.id === 'sciatique-etirement')!
    ],
    positions: [
      'Position allongée avec coussin sous les genoux',
      'Position latérale avec coussin entre les jambes',
      'Position assise avec support lombaire',
      'Position debout avec une jambe sur un support'
    ],
    youtubeVideos: [
      'https://youtube.com/watch?v=sciatique-exercices',
      'https://youtube.com/watch?v=sciatique-massage',
      'https://youtube.com/watch?v=sciatique-acupression',
      'https://youtube.com/watch?v=sciatique-yoga'
    ],
    grandmaRemedies: [
      'Compresse chaude sur la zone douloureuse',
      'Bain aux sels d\'Epsom',
      'Massage à l\'huile de camphre',
      'Application d\'argile verte',
      'Infusion de saule blanc'
    ],
    orientalMedicine: [
      'Acupuncture sur les points VB30, V40, V60',
      'Moxibustion sur les méridiens vessie',
      'Massage Tui Na',
      'Exercices de Qi Gong'
    ],
    recipes: [
      'Infusion de saule blanc: 1 cuillère d\'écorce dans 250ml d\'eau bouillante',
      'Compresse d\'argile verte: mélanger avec de l\'eau tiède, appliquer 20min',
      'Huile de massage: huile de coco + 5 gouttes d\'huile essentielle de gaulthérie'
    ]
  },

  {
    condition: 'Caries dentaires',
    conventional: [
      'Consultation dentaire urgente',
      'Détartrage et nettoyage',
      'Obturation (plombage)',
      'Traitement endodontique si nécessaire',
      'Antibiotiques si infection'
    ],
    natural: [
      'Miel de manuka (antibactérien)',
      'Clou de girofle (antalgique)',
      'Huile de coco (oil pulling)',
      'Propolis',
      'Vitamine D et calcium'
    ],
    traditional: [
      'Acupuncture pour la douleur',
      'Médecine ayurvédique',
      'Phytothérapie',
      'Homéopathie'
    ],
    exercises: [
      exerciseRecommendations.find(e => e.id === 'carie-prevention')!
    ],
    positions: [
      'Position assise droite pour manger',
      'Éviter la position couchée après manger',
      'Position debout pour le brossage'
    ],
    youtubeVideos: [
      'https://youtube.com/watch?v=carie-prevention',
      'https://youtube.com/watch?v=soins-dentaires',
      'https://youtube.com/watch?v=oil-pulling',
      'https://youtube.com/watch?v=alimentation-dentaire'
    ],
    grandmaRemedies: [
      'Clou de girofle sur la dent douloureuse',
      'Rince-bouche au sel et eau tiède',
      'Compresse froide sur la joue',
      'Éviter les aliments sucrés',
      'Brossage avec bicarbonate de soude'
    ],
    orientalMedicine: [
      'Acupuncture sur les points GI4, ST6, ST7',
      'Massage des gencives',
      'Médecine traditionnelle chinoise',
      'Techniques de respiration'
    ],
    recipes: [
      'Rince-bouche au sel: 1 cuillère à café de sel dans 250ml d\'eau tiède',
      'Oil pulling: 1 cuillère d\'huile de coco en bain de bouche 15min',
      'Infusion de clou de girofle: 3 clous dans 250ml d\'eau bouillante'
    ]
  }
];

// Fonctions utilitaires
export function getAlternativeMedicineById(id: string): AlternativeMedicine | null {
  return alternativeMedicines.find(medicine => medicine.id === id) || null;
}

export function getAlternativeMedicinesByCategory(category: string): AlternativeMedicine[] {
  return alternativeMedicines.filter(medicine => 
    medicine.category.toLowerCase().includes(category.toLowerCase())
  );
}

export function getConditionRemedies(condition: string): ConditionSpecificRemedies | null {
  return conditionSpecificRemedies.find(remedy => 
    remedy.condition.toLowerCase().includes(condition.toLowerCase())
  ) || null;
}

export function getExerciseRecommendations(condition: string): ExerciseRecommendation[] {
  const conditionRemedies = getConditionRemedies(condition);
  return conditionRemedies ? conditionRemedies.exercises : [];
}

export function searchAlternativeMedicines(query: string): {
  medicines: AlternativeMedicine[];
  exercises: ExerciseRecommendation[];
  conditions: ConditionSpecificRemedies[];
} {
  const queryLower = query.toLowerCase();
  
  const medicines = alternativeMedicines.filter(medicine =>
    medicine.name.toLowerCase().includes(queryLower) ||
    medicine.indications.some(ind => ind.toLowerCase().includes(queryLower)) ||
    medicine.category.toLowerCase().includes(queryLower)
  );
  
  const exercises = exerciseRecommendations.filter(exercise =>
    exercise.name.toLowerCase().includes(queryLower) ||
    exercise.condition.toLowerCase().includes(queryLower) ||
    exercise.description.toLowerCase().includes(queryLower)
  );
  
  const conditions = conditionSpecificRemedies.filter(condition =>
    condition.condition.toLowerCase().includes(queryLower) ||
    condition.conventional.some(conv => conv.toLowerCase().includes(queryLower)) ||
    condition.natural.some(nat => nat.toLowerCase().includes(queryLower))
  );
  
  return { medicines, exercises, conditions };
}
