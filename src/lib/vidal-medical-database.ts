// Base de données médicale complète basée sur le Vidal
// Enrichissement des connaissances médicales pour l'IA de diagnostic

export interface VidalMedicalCondition {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendations: string[];
  differentialDiagnosis: string[];
  nextSteps: string[];
  probability: number;
  ageGroups?: string[];
  riskFactors?: string[];
  complications?: string[];
  prevention?: string[];
  medications?: string[];
  contraindications?: string[];
  followUp?: string[];
}

// Base de données complète des conditions médicales basée sur le Vidal
export const vidalMedicalConditions: VidalMedicalCondition[] = [
  // NEUROLOGIE
  {
    id: 'migraine',
    name: 'Migraine',
    category: 'Neurologique',
    subcategory: 'Céphalées',
    symptoms: ['Maux de tête', 'Nausées', 'Vomissements', 'Sensibilité à la lumière', 'Sensibilité au bruit', 'Aura visuelle', 'Vertiges'],
    severity: 'moderate',
    urgency: 'medium',
    description: 'Céphalée primaire caractérisée par des crises récurrentes de maux de tête pulsatile, souvent unilatéraux, accompagnés de nausées et de photophobie.',
    recommendations: [
      'Repos dans une pièce sombre et calme',
      'Triptans (sumatriptan, zolmitriptan) en cas de crise',
      'Antiémétiques (métoclopramide) si nausées',
      'Paracétamol ou AINS en première intention',
      'Éviter les déclencheurs (stress, certains aliments, manque de sommeil)',
      'Traitement préventif si >3 crises/mois'
    ],
    differentialDiagnosis: ['Céphalée de tension', 'Sinusite', 'Hypertension artérielle', 'Accident vasculaire cérébral', 'Hémorragie méningée'],
    nextSteps: ['Tenir un journal des migraines', 'Identifier les déclencheurs', 'Consultation neurologique si atypique', 'Évaluation du retentissement'],
    probability: 85,
    ageGroups: ['Adulte', 'Adolescent'],
    riskFactors: ['Antécédents familiaux', 'Stress', 'Hormones féminines', 'Certains aliments'],
    complications: ['Migraine chronique', 'État de mal migraineux', 'Aura persistante'],
    prevention: ['Régularité des repas et du sommeil', 'Gestion du stress', 'Éviter les déclencheurs'],
    medications: ['Triptans', 'Paracétamol', 'AINS', 'Antiémétiques', 'Bêta-bloquants (prévention)'],
    contraindications: ['Maladie cardiovasculaire (triptans)', 'Insuffisance hépatique (paracétamol)'],
    followUp: ['Consultation si aggravation', 'Évaluation du traitement préventif']
  },
  {
    id: 'cephalee-tension',
    name: 'Céphalée de tension',
    category: 'Neurologique',
    subcategory: 'Céphalées',
    symptoms: ['Maux de tête', 'Sensation de pression', 'Raideur de la nuque', 'Fatigue', 'Tension musculaire'],
    severity: 'mild',
    urgency: 'low',
    description: 'Céphalée primaire bilatérale, non pulsatile, d\'intensité légère à modérée, en casque ou en bandeau.',
    recommendations: [
      'Relaxation et gestion du stress',
      'Massage des muscles du cou et des épaules',
      'Posture correcte au travail',
      'Exercices de relaxation et de respiration',
      'Paracétamol ou AINS si nécessaire',
      'Physiothérapie si chronique'
    ],
    differentialDiagnosis: ['Migraine', 'Sinusite', 'Hypertension artérielle', 'Céphalée médicamenteuse'],
    nextSteps: ['Surveillance', 'Consultation si persistance >3 mois', 'Évaluation du stress'],
    probability: 80,
    ageGroups: ['Adulte', 'Adolescent'],
    riskFactors: ['Stress', 'Posture incorrecte', 'Fatigue', 'Anxiété'],
    complications: ['Céphalée chronique quotidienne', 'Céphalée médicamenteuse'],
    prevention: ['Gestion du stress', 'Posture correcte', 'Exercice régulier'],
    medications: ['Paracétamol', 'AINS', 'Relaxants musculaires'],
    followUp: ['Consultation si chronique']
  },
  {
    id: 'epilepsie',
    name: 'Épilepsie',
    category: 'Neurologique',
    subcategory: 'Troubles épileptiques',
    symptoms: ['Convulsions', 'Perte de conscience', 'Mouvements involontaires', 'Confusion post-critique', 'Aura', 'Chute brutale'],
    severity: 'severe',
    urgency: 'high',
    description: 'Trouble neurologique chronique caractérisé par des crises épileptiques récurrentes dues à une décharge électrique anormale du cerveau.',
    recommendations: [
      'Traitement antiépileptique (valproate, carbamazépine, lévétiracétam)',
      'Éviter les facteurs déclenchants (manque de sommeil, alcool, stress)',
      'Surveillance médicale régulière',
      'Précautions de sécurité (éviter la conduite, la natation seule)',
      'Éducation du patient et de l\'entourage'
    ],
    differentialDiagnosis: ['Syncope', 'Crise d\'épilepsie fébrile', 'Troubles métaboliques', 'Troubles psychogènes'],
    nextSteps: ['Consultation neurologique urgente', 'Électroencéphalogramme', 'IRM cérébrale', 'Bilan métabolique'],
    probability: 90,
    ageGroups: ['Tous âges'],
    riskFactors: ['Antécédents familiaux', 'Traumatisme crânien', 'AVC', 'Tumeur cérébrale'],
    complications: ['État de mal épileptique', 'Traumatismes', 'Mort subite inattendue'],
    prevention: ['Éviter les facteurs déclenchants', 'Traitement préventif', 'Surveillance médicale'],
    medications: ['Valproate', 'Carbamazépine', 'Lévétiracétam', 'Lamotrigine', 'Topiramate'],
    contraindications: ['Grossesse (valproate)', 'Allergie aux antiépileptiques'],
    followUp: ['Consultation neurologique régulière', 'Électroencéphalogramme de contrôle']
  },

  // CARDIOLOGIE
  {
    id: 'infarctus-myocarde',
    name: 'Infarctus du myocarde',
    category: 'Cardiovasculaire',
    subcategory: 'Syndrome coronarien aigu',
    symptoms: ['Douleur thoracique', 'Essoufflement', 'Nausées', 'Vomissements', 'Sueurs', 'Irradiation bras gauche', 'Fatigue'],
    severity: 'critical',
    urgency: 'critical',
    description: 'Nécrose du muscle cardiaque due à l\'occlusion complète d\'une artère coronaire, nécessitant une prise en charge urgente.',
    recommendations: [
      'Appel immédiat du 15 (SAMU)',
      'Aspirine 300mg en l\'absence de contre-indication',
      'Repos absolu en position demi-assise',
      'Oxygénothérapie si disponible',
      'Défibrillation si arrêt cardiaque',
      'Traitement thrombolytique ou angioplastie primaire'
    ],
    differentialDiagnosis: ['Angine de poitrine', 'Embolie pulmonaire', 'Dissection aortique', 'Péricardite', 'Pneumothorax'],
    nextSteps: ['Hospitalisation urgente', 'Coronarographie', 'Traitement thrombolytique ou angioplastie', 'Surveillance en soins intensifs'],
    probability: 95,
    ageGroups: ['Adulte', 'Personne âgée'],
    riskFactors: ['Tabagisme', 'Diabète', 'Hypertension', 'Hypercholestérolémie', 'Antécédents familiaux'],
    complications: ['Choc cardiogénique', 'Arythmies', 'Insuffisance cardiaque', 'Mort subite'],
    prevention: ['Arrêt du tabac', 'Contrôle des facteurs de risque', 'Aspirine préventive'],
    medications: ['Aspirine', 'Clopidogrel', 'Statines', 'Bêta-bloquants', 'IEC'],
    contraindications: ['Allergie à l\'aspirine', 'Hémorragie active'],
    followUp: ['Rééducation cardiaque', 'Surveillance cardiologique', 'Traitement préventif']
  },
  {
    id: 'angine-poitrine',
    name: 'Angine de poitrine',
    category: 'Cardiovasculaire',
    subcategory: 'Syndrome coronarien chronique',
    symptoms: ['Douleur thoracique', 'Oppression', 'Essoufflement à l\'effort', 'Fatigue', 'Irradiation mâchoire/bras'],
    severity: 'moderate',
    urgency: 'high',
    description: 'Douleur thoracique due à un défaut d\'oxygénation du muscle cardiaque lors d\'un effort ou d\'un stress.',
    recommendations: [
      'Arrêt immédiat de l\'effort',
      'Trinitrine sublinguale',
      'Consultation cardiologique urgente',
      'Modification des facteurs de risque cardiovasculaire',
      'Traitement anti-angineux (bêta-bloquants, inhibiteurs calciques)'
    ],
    differentialDiagnosis: ['Infarctus du myocarde', 'Embolie pulmonaire', 'Péricardite', 'Douleur musculo-squelettique'],
    nextSteps: ['Électrocardiogramme', 'Test d\'effort', 'Coronarographie', 'Échocardiographie'],
    probability: 85,
    ageGroups: ['Adulte', 'Personne âgée'],
    riskFactors: ['Tabagisme', 'Diabète', 'Hypertension', 'Hypercholestérolémie', 'Sédentarité'],
    complications: ['Infarctus du myocarde', 'Insuffisance cardiaque', 'Mort subite'],
    prevention: ['Arrêt du tabac', 'Contrôle des facteurs de risque', 'Exercice adapté'],
    medications: ['Trinitrine', 'Bêta-bloquants', 'Inhibiteurs calciques', 'Statines', 'Aspirine'],
    contraindications: ['Hypotension artérielle (trinitrine)', 'Asthme (bêta-bloquants)'],
    followUp: ['Consultation cardiologique régulière', 'Surveillance des facteurs de risque']
  },
  {
    id: 'hypertension-arterielle',
    name: 'Hypertension artérielle',
    category: 'Cardiovasculaire',
    subcategory: 'Troubles tensionnels',
    symptoms: ['Maux de tête', 'Vertiges', 'Fatigue', 'Saignements de nez', 'Vision trouble', 'Palpitations'],
    severity: 'moderate',
    urgency: 'medium',
    description: 'Pression artérielle élevée de manière chronique (>140/90 mmHg), facteur de risque cardiovasculaire majeur.',
    recommendations: [
      'Mesure régulière de la tension artérielle',
      'Régime hyposodé (<6g/jour)',
      'Exercice physique régulier (30min/jour)',
      'Arrêt du tabac et limitation de l\'alcool',
      'Perte de poids si surcharge pondérale',
      'Traitement antihypertenseur si nécessaire'
    ],
    differentialDiagnosis: ['Céphalée de tension', 'Troubles visuels', 'Insuffisance rénale', 'Hyperthyroïdie'],
    nextSteps: ['Surveillance tensionnelle', 'Bilan cardiovasculaire complet', 'Traitement antihypertenseur', 'Éducation thérapeutique'],
    probability: 80,
    ageGroups: ['Adulte', 'Personne âgée'],
    riskFactors: ['Âge', 'Antécédents familiaux', 'Sédentarité', 'Surpoids', 'Alimentation riche en sel'],
    complications: ['AVC', 'Infarctus du myocarde', 'Insuffisance rénale', 'Rétinopathie'],
    prevention: ['Mode de vie sain', 'Surveillance tensionnelle', 'Contrôle des facteurs de risque'],
    medications: ['IEC', 'ARA2', 'Diurétiques', 'Bêta-bloquants', 'Inhibiteurs calciques'],
    contraindications: ['Grossesse (IEC/ARA2)', 'Hyperkaliémie (IEC/ARA2)'],
    followUp: ['Surveillance tensionnelle mensuelle', 'Consultation médicale trimestrielle']
  },

  // PNEUMOLOGIE
  {
    id: 'asthme',
    name: 'Asthme',
    category: 'Respiratoire',
    subcategory: 'Maladies obstructives',
    symptoms: ['Essoufflement', 'Respiration sifflante', 'Toux sèche', 'Oppression thoracique', 'Crises nocturnes'],
    severity: 'moderate',
    urgency: 'high',
    description: 'Maladie inflammatoire chronique des voies aériennes avec hyperréactivité bronchique et obstruction réversible.',
    recommendations: [
      'Bronchodilatateur d\'action rapide (salbutamol)',
      'Corticostéroïdes inhalés (béclométasone, fluticasone)',
      'Éviter les allergènes et irritants',
      'Plan d\'action personnalisé',
      'Mesure du débit expiratoire de pointe',
      'Éducation thérapeutique'
    ],
    differentialDiagnosis: ['BPCO', 'Embolie pulmonaire', 'Insuffisance cardiaque', 'Bronchite chronique'],
    nextSteps: ['Exploration fonctionnelle respiratoire', 'Tests allergologiques', 'Éducation thérapeutique', 'Plan d\'action'],
    probability: 85,
    ageGroups: ['Tous âges'],
    riskFactors: ['Atopie', 'Antécédents familiaux', 'Exposition aux allergènes', 'Tabagisme passif'],
    complications: ['Asthme sévère', 'État de mal asthmatique', 'Insuffisance respiratoire'],
    prevention: ['Éviter les allergènes', 'Arrêt du tabac', 'Vaccination antigrippale'],
    medications: ['Salbutamol', 'Béclométasone', 'Fluticasone', 'Montélukast', 'Théophylline'],
    contraindications: ['Allergie aux bronchodilatateurs', 'Tachycardie sévère'],
    followUp: ['Consultation pneumologique', 'Mesure du DEP', 'Ajustement du traitement']
  },
  {
    id: 'bronchite-aigue',
    name: 'Bronchite aiguë',
    category: 'Respiratoire',
    subcategory: 'Infections respiratoires',
    symptoms: ['Toux', 'Expectorations', 'Fièvre', 'Fatigue', 'Douleur thoracique', 'Congestion nasale'],
    severity: 'mild',
    urgency: 'low',
    description: 'Inflammation aiguë des bronches, généralement d\'origine virale, avec toux productive et symptômes généraux.',
    recommendations: [
      'Repos et hydratation abondante',
      'Antitussifs si toux sèche (codéine, dextrométhorphane)',
      'Expectorants si toux grasse (N-acétylcystéine)',
      'Antipyrétiques si fièvre (paracétamol)',
      'Éviter le tabac et les irritants',
      'Humidification de l\'air'
    ],
    differentialDiagnosis: ['Pneumonie', 'Asthme', 'Sinusite', 'COVID-19'],
    nextSteps: ['Surveillance clinique', 'Consultation si aggravation', 'Radiographie thoracique si suspicion de pneumonie'],
    probability: 80,
    ageGroups: ['Tous âges'],
    riskFactors: ['Tabagisme', 'Pollution atmosphérique', 'Immunodépression'],
    complications: ['Pneumonie', 'Bronchite chronique', 'Asthme'],
    prevention: ['Arrêt du tabac', 'Vaccination antigrippale', 'Éviter les irritants'],
    medications: ['Paracétamol', 'Antitussifs', 'Expectorants', 'Antibiotiques si surinfection'],
    contraindications: ['Allergie aux antitussifs', 'Insuffisance respiratoire'],
    followUp: ['Consultation si persistance >10 jours']
  },
  {
    id: 'pneumonie',
    name: 'Pneumonie',
    category: 'Respiratoire',
    subcategory: 'Infections pulmonaires',
    symptoms: ['Fièvre élevée', 'Toux productive', 'Essoufflement', 'Douleur thoracique', 'Fatigue', 'Frissons'],
    severity: 'severe',
    urgency: 'high',
    description: 'Infection aiguë du parenchyme pulmonaire avec consolidation alvéolaire, nécessitant un traitement antibiotique.',
    recommendations: [
      'Antibiothérapie adaptée (amoxicilline, lévofloxacine)',
      'Repos au lit',
      'Hydratation abondante',
      'Antipyrétiques (paracétamol)',
      'Oxygénothérapie si nécessaire',
      'Kinésithérapie respiratoire'
    ],
    differentialDiagnosis: ['Bronchite aiguë', 'Embolie pulmonaire', 'Insuffisance cardiaque', 'Tuberculose'],
    nextSteps: ['Radiographie thoracique', 'Antibiothérapie', 'Surveillance clinique', 'Hospitalisation si sévère'],
    probability: 90,
    ageGroups: ['Tous âges'],
    riskFactors: ['Âge avancé', 'Immunodépression', 'Tabagisme', 'Alcoolisme'],
    complications: ['Pleuropneumonie', 'Septicémie', 'Insuffisance respiratoire', 'Décès'],
    prevention: ['Vaccination antipneumococcique', 'Vaccination antigrippale', 'Arrêt du tabac'],
    medications: ['Amoxicilline', 'Lévofloxacine', 'Paracétamol', 'Oxygène'],
    contraindications: ['Allergie aux antibiotiques', 'Insuffisance rénale (lévofloxacine)'],
    followUp: ['Radiographie de contrôle', 'Surveillance clinique', 'Vaccination préventive']
  },

  // GASTRO-ENTÉROLOGIE
  {
    id: 'gastro-enterite',
    name: 'Gastro-entérite',
    category: 'Digestif',
    subcategory: 'Infections digestives',
    symptoms: ['Diarrhée', 'Vomissements', 'Nausées', 'Douleurs abdominales', 'Fièvre', 'Perte d\'appétit'],
    severity: 'moderate',
    urgency: 'medium',
    description: 'Inflammation aiguë de l\'estomac et de l\'intestin, généralement d\'origine infectieuse (virale, bactérienne).',
    recommendations: [
      'Réhydratation orale (solutions de réhydratation)',
      'Régime sans résidus',
      'Probiotiques (Saccharomyces boulardii)',
      'Antispasmodiques si douleurs (phloroglucinol)',
      'Antidiarrhéiques si nécessaire (loperamide)',
      'Éviter les produits laitiers temporairement'
    ],
    differentialDiagnosis: ['Intoxication alimentaire', 'Appendicite', 'Maladie inflammatoire chronique', 'Diverticulite'],
    nextSteps: ['Surveillance de l\'hydratation', 'Consultation si déshydratation', 'Coproculture si persistance'],
    probability: 85,
    ageGroups: ['Tous âges'],
    riskFactors: ['Voyage récent', 'Consommation d\'aliments contaminés', 'Immunodépression'],
    complications: ['Déshydratation', 'Déséquilibre hydroélectrolytique', 'Septicémie'],
    prevention: ['Hygiène des mains', 'Éviter les aliments contaminés', 'Vaccination rotavirus (enfant)'],
    medications: ['Solutions de réhydratation', 'Probiotiques', 'Antispasmodiques', 'Antidiarrhéiques'],
    contraindications: ['Obstruction intestinale (antidiarrhéiques)', 'Allergie aux probiotiques'],
    followUp: ['Consultation si persistance >48h', 'Surveillance hydratation']
  },
  {
    id: 'reflux-gastro-oesophagien',
    name: 'Reflux gastro-œsophagien',
    category: 'Digestif',
    subcategory: 'Troubles œsophagiens',
    symptoms: ['Brûlures d\'estomac', 'Régurgitations acides', 'Douleur thoracique', 'Toux nocturne', 'Dysphagie'],
    severity: 'mild',
    urgency: 'low',
    description: 'Remontée du contenu gastrique dans l\'œsophage avec symptômes gênants et complications possibles.',
    recommendations: [
      'Éviter les repas copieux et tardifs',
      'Surélever la tête du lit',
      'Inhibiteurs de la pompe à protons (oméprazole, pantoprazole)',
      'Anti-H2 (ranitidine) en alternative',
      'Modification du mode de vie',
      'Éviter les aliments déclenchants'
    ],
    differentialDiagnosis: ['Ulcère gastroduodénal', 'Œsophagite', 'Angine de poitrine', 'Cancer de l\'œsophage'],
    nextSteps: ['Endoscopie digestive haute', 'pH-métrie si nécessaire', 'Traitement médical', 'Surveillance'],
    probability: 80,
    ageGroups: ['Adulte', 'Personne âgée'],
    riskFactors: ['Surpoids', 'Grossesse', 'Hernie hiatale', 'Tabagisme', 'Alcool'],
    complications: ['Œsophagite', 'Sténose œsophagienne', 'Endobrachyœsophage', 'Cancer de l\'œsophage'],
    prevention: ['Contrôle du poids', 'Éviter les repas tardifs', 'Arrêt du tabac'],
    medications: ['Oméprazole', 'Pantoprazole', 'Ranitidine', 'Alginate de sodium'],
    contraindications: ['Allergie aux IPP', 'Grossesse (certains IPP)'],
    followUp: ['Consultation si persistance', 'Endoscopie de surveillance si complications']
  },
  {
    id: 'appendicite',
    name: 'Appendicite',
    category: 'Digestif',
    subcategory: 'Urgences abdominales',
    symptoms: ['Douleur abdominale', 'Nausées', 'Vomissements', 'Fièvre', 'Perte d\'appétit', 'Défense abdominale'],
    severity: 'severe',
    urgency: 'critical',
    description: 'Inflammation aiguë de l\'appendice vermiforme nécessitant une intervention chirurgicale urgente.',
    recommendations: [
      'Consultation chirurgicale urgente',
      'Aucun aliment ni boisson',
      'Antalgiques avec précaution',
      'Surveillance clinique rapprochée',
      'Préparation à l\'intervention chirurgicale',
      'Antibiothérapie préopératoire'
    ],
    differentialDiagnosis: ['Gastro-entérite', 'Colique néphrétique', 'Salpingite', 'Diverticulite'],
    nextSteps: ['Appendicectomie', 'Antibiothérapie', 'Surveillance post-opératoire', 'Rééducation'],
    probability: 90,
    ageGroups: ['Enfant', 'Adolescent', 'Jeune adulte'],
    riskFactors: ['Obstruction appendiculaire', 'Infection', 'Facteurs génétiques'],
    complications: ['Péritonite', 'Abcès appendiculaire', 'Occlusion intestinale'],
    prevention: ['Diagnostic précoce', 'Traitement chirurgical rapide'],
    medications: ['Antibiotiques', 'Antalgiques', 'Antispasmodiques'],
    contraindications: ['Allergie aux antibiotiques'],
    followUp: ['Surveillance post-opératoire', 'Consultation de contrôle']
  },

  // ENDOCRINOLOGIE
  {
    id: 'diabete-type2',
    name: 'Diabète de type 2',
    category: 'Endocrinien',
    subcategory: 'Troubles métaboliques',
    symptoms: ['Soif excessive', 'Urination fréquente', 'Fatigue', 'Vision trouble', 'Cicatrisation lente', 'Perte de poids'],
    severity: 'moderate',
    urgency: 'medium',
    description: 'Trouble métabolique caractérisé par une hyperglycémie chronique et une résistance à l\'insuline.',
    recommendations: [
      'Régime diabétique équilibré',
      'Exercice physique régulier',
      'Surveillance glycémique',
      'Médicaments antidiabétiques (metformine, sulfamides)',
      'Contrôle des facteurs de risque cardiovasculaire',
      'Éducation thérapeutique'
    ],
    differentialDiagnosis: ['Diabète de type 1', 'Diabète gestationnel', 'Intolérance au glucose', 'Diabète secondaire'],
    nextSteps: ['HbA1c', 'Bilan lipidique', 'Examen ophtalmologique', 'Éducation thérapeutique', 'Traitement médicamenteux'],
    probability: 85,
    ageGroups: ['Adulte', 'Personne âgée'],
    riskFactors: ['Surpoids', 'Sédentarité', 'Antécédents familiaux', 'Âge', 'Ethnie'],
    complications: ['Rétinopathie', 'Néphropathie', 'Neuropathie', 'Maladie cardiovasculaire'],
    prevention: ['Mode de vie sain', 'Contrôle du poids', 'Exercice régulier'],
    medications: ['Metformine', 'Sulfamides', 'Glinides', 'Inhibiteurs DPP-4', 'Insuline'],
    contraindications: ['Insuffisance rénale (metformine)', 'Allergie aux sulfamides'],
    followUp: ['Surveillance glycémique', 'Consultation trimestrielle', 'Bilan annuel']
  },
  {
    id: 'hypothyroidie',
    name: 'Hypothyroïdie',
    category: 'Endocrinien',
    subcategory: 'Troubles thyroïdiens',
    symptoms: ['Fatigue', 'Prise de poids', 'Frilosité', 'Constipation', 'Dépression', 'Peau sèche', 'Chute de cheveux'],
    severity: 'moderate',
    urgency: 'low',
    description: 'Déficit en hormones thyroïdiennes entraînant un ralentissement du métabolisme et des fonctions organiques.',
    recommendations: [
      'Substitution par L-thyroxine',
      'Surveillance biologique (TSH, T4)',
      'Régime équilibré',
      'Exercice adapté',
      'Éviter les interactions médicamenteuses',
      'Éducation thérapeutique'
    ],
    differentialDiagnosis: ['Dépression', 'Syndrome de fatigue chronique', 'Anémie', 'Maladie de Basedow'],
    nextSteps: ['TSH, T3, T4', 'Échographie thyroïdienne', 'Traitement substitutif', 'Surveillance biologique'],
    probability: 80,
    ageGroups: ['Adulte', 'Personne âgée'],
    riskFactors: ['Maladie auto-immune', 'Traitement par iode radioactif', 'Chirurgie thyroïdienne'],
    complications: ['Myxœdème', 'Coma myxœdémateux', 'Maladie cardiovasculaire'],
    prevention: ['Surveillance thyroïdienne', 'Traitement précoce'],
    medications: ['L-thyroxine', 'L-triiodothyronine'],
    contraindications: ['Hyperthyroïdie', 'Allergie à la thyroxine'],
    followUp: ['Surveillance biologique trimestrielle', 'Ajustement posologique']
  },

  // RHUMATOLOGIE
  {
    id: 'arthrose',
    name: 'Arthrose',
    category: 'Musculo-squelettique',
    subcategory: 'Arthropathies dégénératives',
    symptoms: ['Douleur articulaire', 'Raideur matinale', 'Limitation des mouvements', 'Déformation articulaire', 'Crissement'],
    severity: 'moderate',
    urgency: 'low',
    description: 'Maladie dégénérative des articulations avec destruction progressive du cartilage articulaire.',
    recommendations: [
      'Antalgiques (paracétamol)',
      'Anti-inflammatoires non stéroïdiens',
      'Physiothérapie',
      'Perte de poids si nécessaire',
      'Infiltrations de corticoïdes si nécessaire',
      'Chirurgie prothétique si sévère'
    ],
    differentialDiagnosis: ['Polyarthrite rhumatoïde', 'Goutte', 'Tendinite', 'Bursite'],
    nextSteps: ['Radiographies articulaires', 'Bilan inflammatoire', 'Traitement symptomatique', 'Rééducation'],
    probability: 85,
    ageGroups: ['Adulte', 'Personne âgée'],
    riskFactors: ['Âge', 'Surpoids', 'Traumatismes', 'Facteurs génétiques', 'Surcharge articulaire'],
    complications: ['Déformation articulaire', 'Perte de fonction', 'Douleur chronique'],
    prevention: ['Contrôle du poids', 'Exercice adapté', 'Protection articulaire'],
    medications: ['Paracétamol', 'AINS', 'Corticoïdes', 'Chondroprotecteurs'],
    contraindications: ['Insuffisance rénale (AINS)', 'Ulcère gastroduodénal (AINS)'],
    followUp: ['Consultation rhumatologique', 'Surveillance radiologique']
  },
  {
    id: 'polyarthrite-rhumatoide',
    name: 'Polyarthrite rhumatoïde',
    category: 'Musculo-squelettique',
    subcategory: 'Arthropathies inflammatoires',
    symptoms: ['Douleur articulaire', 'Raideur matinale prolongée', 'Gonflement articulaire', 'Fatigue', 'Raideur symétrique'],
    severity: 'severe',
    urgency: 'high',
    description: 'Maladie auto-immune inflammatoire chronique touchant les articulations avec destruction progressive.',
    recommendations: [
      'Traitement de fond (méthotrexate, sulfasalazine)',
      'Anti-inflammatoires non stéroïdiens',
      'Corticostéroïdes',
      'Biothérapies si nécessaire',
      'Physiothérapie',
      'Surveillance régulière'
    ],
    differentialDiagnosis: ['Arthrose', 'Lupus érythémateux', 'Spondylarthrite', 'Goutte'],
    nextSteps: ['Facteur rhumatoïde', 'ACPA', 'Radiographies', 'Traitement rhumatologique', 'Surveillance biologique'],
    probability: 80,
    ageGroups: ['Adulte'],
    riskFactors: ['Facteurs génétiques', 'Tabagisme', 'Infections', 'Hormones féminines'],
    complications: ['Destruction articulaire', 'Maladies cardiovasculaires', 'Ostéoporose'],
    prevention: ['Arrêt du tabac', 'Traitement précoce', 'Surveillance régulière'],
    medications: ['Méthotrexate', 'Sulfasalazine', 'Hydroxychloroquine', 'Biothérapies'],
    contraindications: ['Grossesse (méthotrexate)', 'Insuffisance hépatique (méthotrexate)'],
    followUp: ['Consultation rhumatologique mensuelle', 'Surveillance biologique']
  },

  // DERMATOLOGIE
  {
    id: 'eczema',
    name: 'Eczéma',
    category: 'Dermatologique',
    subcategory: 'Dermatoses inflammatoires',
    symptoms: ['Démangeaisons', 'Rougeur', 'Sécheresse cutanée', 'Desquamation', 'Lichénification', 'Vésicules'],
    severity: 'mild',
    urgency: 'low',
    description: 'Dermatose inflammatoire chronique avec prurit et lésions eczématiformes, souvent d\'origine allergique.',
    recommendations: [
      'Émollients (vaseline, crèmes hydratantes)',
      'Corticostéroïdes topiques',
      'Antihistaminiques si prurit',
      'Éviter les irritants et allergènes',
      'Hydratation cutanée régulière',
      'Éviter les bains chauds'
    ],
    differentialDiagnosis: ['Psoriasis', 'Dermatite de contact', 'Mycose', 'Dermatite séborrhéique'],
    nextSteps: ['Tests allergologiques', 'Traitement topique', 'Éducation thérapeutique', 'Surveillance'],
    probability: 80,
    ageGroups: ['Tous âges'],
    riskFactors: ['Atopie', 'Antécédents familiaux', 'Exposition aux allergènes', 'Stress'],
    complications: ['Surinfection', 'Lichénification', 'Impétigo'],
    prevention: ['Éviter les allergènes', 'Hydratation cutanée', 'Gestion du stress'],
    medications: ['Corticostéroïdes topiques', 'Antihistaminiques', 'Émollients', 'Immunosuppresseurs'],
    contraindications: ['Allergie aux corticostéroïdes', 'Infections cutanées'],
    followUp: ['Consultation dermatologique', 'Surveillance du traitement']
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    category: 'Dermatologique',
    subcategory: 'Dermatoses inflammatoires',
    symptoms: ['Plaques érythémateuses', 'Desquamation', 'Démangeaisons', 'Épaississement cutané', 'Ongles atteints'],
    severity: 'moderate',
    urgency: 'low',
    description: 'Maladie inflammatoire chronique de la peau avec prolifération épidermique excessive et inflammation.',
    recommendations: [
      'Corticostéroïdes topiques',
      'Analogues de la vitamine D (calcipotriol)',
      'Photothérapie UVB',
      'Traitements systémiques si sévère',
      'Hydratation cutanée',
      'Éviter le stress et les traumatismes'
    ],
    differentialDiagnosis: ['Eczéma', 'Dermatite séborrhéique', 'Lichen plan', 'Mycose'],
    nextSteps: ['Biopsie cutanée', 'Traitement dermatologique', 'Surveillance articulaire', 'Éducation thérapeutique'],
    probability: 85,
    ageGroups: ['Adulte'],
    riskFactors: ['Facteurs génétiques', 'Stress', 'Infections', 'Traumatismes', 'Médicaments'],
    complications: ['Arthrite psoriasique', 'Maladies cardiovasculaires', 'Dépression'],
    prevention: ['Gestion du stress', 'Éviter les traumatismes', 'Traitement précoce'],
    medications: ['Corticostéroïdes', 'Calcipotriol', 'Méthotrexate', 'Biothérapies'],
    contraindications: ['Allergie aux traitements', 'Grossesse (certains traitements)'],
    followUp: ['Consultation dermatologique', 'Surveillance articulaire']
  },

  // UROLOGIE
  {
    id: 'cystite',
    name: 'Cystite',
    category: 'Urogénital',
    subcategory: 'Infections urinaires',
    symptoms: ['Douleur urinaire', 'Fréquence urinaire', 'Urgence urinaire', 'Hématurie', 'Douleur sus-pubienne'],
    severity: 'mild',
    urgency: 'medium',
    description: 'Infection urinaire basse avec inflammation de la vessie, principalement chez la femme.',
    recommendations: [
      'Antibiothérapie adaptée (fosfomycine, nitrofurantoïne)',
      'Hydratation abondante',
      'Antalgiques urinaires (phénazopyridine)',
      'Éviter la constipation',
      'Hygiène intime',
      'Vider complètement la vessie'
    ],
    differentialDiagnosis: ['Pyélonéphrite', 'Urétrite', 'Calcul urinaire', 'Vaginite'],
    nextSteps: ['ECBU', 'Antibiothérapie', 'Surveillance', 'Prévention des récidives'],
    probability: 85,
    ageGroups: ['Femme adulte', 'Personne âgée'],
    riskFactors: ['Sexe féminin', 'Rapports sexuels', 'Ménopause', 'Diabète', 'Grossesse'],
    complications: ['Pyélonéphrite', 'Septicémie', 'Cystite récidivante'],
    prevention: ['Hydratation', 'Hygiène intime', 'Miction post-coïtale'],
    medications: ['Fosfomycine', 'Nitrofurantoïne', 'Ciprofloxacine', 'Antalgiques urinaires'],
    contraindications: ['Allergie aux antibiotiques', 'Insuffisance rénale'],
    followUp: ['ECBU de contrôle', 'Consultation si récidive']
  },
  {
    id: 'pyelonephrite',
    name: 'Pyélonéphrite',
    category: 'Urogénital',
    subcategory: 'Infections urinaires',
    symptoms: ['Fièvre élevée', 'Douleur lombaire', 'Douleur urinaire', 'Nausées', 'Vomissements', 'Frissons'],
    severity: 'severe',
    urgency: 'high',
    description: 'Infection urinaire haute avec atteinte du parenchyme rénal, nécessitant un traitement antibiotique urgent.',
    recommendations: [
      'Antibiothérapie parentérale (céfotaxime, amoxicilline)',
      'Hydratation abondante',
      'Antipyrétiques (paracétamol)',
      'Surveillance clinique rapprochée',
      'Hospitalisation si sévère',
      'Échographie rénale'
    ],
    differentialDiagnosis: ['Cystite', 'Colique néphrétique', 'Appendicite', 'Pneumonie'],
    nextSteps: ['ECBU', 'Échographie rénale', 'Hospitalisation si nécessaire', 'Antibiothérapie'],
    probability: 90,
    ageGroups: ['Tous âges'],
    riskFactors: ['Cystite non traitée', 'Obstruction urinaire', 'Diabète', 'Grossesse'],
    complications: ['Septicémie', 'Abcès rénal', 'Insuffisance rénale', 'Choc septique'],
    prevention: ['Traitement précoce des cystites', 'Hydratation', 'Éviter la rétention urinaire'],
    medications: ['Céfotaxime', 'Amoxicilline', 'Ciprofloxacine', 'Paracétamol'],
    contraindications: ['Allergie aux antibiotiques', 'Insuffisance rénale'],
    followUp: ['ECBU de contrôle', 'Échographie de contrôle', 'Surveillance rénale']
  },

  // GYNÉCOLOGIE
  {
    id: 'endometriose',
    name: 'Endométriose',
    category: 'Urogénital',
    subcategory: 'Pathologies gynécologiques',
    symptoms: ['Douleur pelvienne', 'Dysménorrhée', 'Dyspareunie', 'Infertilité', 'Ménorragies', 'Douleur défécatoire'],
    severity: 'moderate',
    urgency: 'medium',
    description: 'Présence de tissu endométrial en dehors de la cavité utérine, causant douleurs et infertilité.',
    recommendations: [
      'Antalgiques (AINS)',
      'Traitement hormonal (pilule, progestatifs)',
      'Chirurgie si nécessaire',
      'Prise en charge de la douleur',
      'Prise en charge de l\'infertilité',
      'Support psychologique'
    ],
    differentialDiagnosis: ['Adénomyose', 'Fibromes', 'Maladie inflammatoire pelvienne', 'Syndrome du côlon irritable'],
    nextSteps: ['Échographie pelvienne', 'IRM', 'Laparoscopie', 'Traitement gynécologique', 'Prise en charge multidisciplinaire'],
    probability: 80,
    ageGroups: ['Femme en âge de procréer'],
    riskFactors: ['Facteurs génétiques', 'Règles précoces', 'Cycle court', 'Nulliparité'],
    complications: ['Infertilité', 'Adhérences', 'Douleur chronique', 'Dépression'],
    prevention: ['Diagnostic précoce', 'Traitement hormonal', 'Grossesse'],
    medications: ['AINS', 'Pilule contraceptive', 'Progestatifs', 'Agonistes GnRH'],
    contraindications: ['Grossesse (certains traitements)', 'Thrombose (pilule)'],
    followUp: ['Consultation gynécologique', 'Surveillance échographique', 'Prise en charge de l\'infertilité']
  },

  // PSYCHIATRIE
  {
    id: 'depression',
    name: 'Dépression',
    category: 'Psychique',
    subcategory: 'Troubles de l\'humeur',
    symptoms: ['Tristesse', 'Perte d\'intérêt', 'Fatigue', 'Troubles du sommeil', 'Troubles de l\'appétit', 'Idées noires', 'Difficultés de concentration'],
    severity: 'moderate',
    urgency: 'high',
    description: 'Trouble de l\'humeur caractérisé par une tristesse persistante et une perte d\'intérêt pour les activités.',
    recommendations: [
      'Psychothérapie (TCC, thérapie interpersonnelle)',
      'Antidépresseurs si nécessaire (ISRS, IRSN)',
      'Activité physique régulière',
      'Rythme de vie régulier',
      'Support social et familial',
      'Éviter l\'isolement'
    ],
    differentialDiagnosis: ['Dysthymie', 'Trouble bipolaire', 'Dépression réactionnelle', 'Trouble anxieux'],
    nextSteps: ['Évaluation psychiatrique', 'Traitement adapté', 'Suivi régulier', 'Prévention de la rechute'],
    probability: 80,
    ageGroups: ['Tous âges'],
    riskFactors: ['Antécédents familiaux', 'Événements de vie', 'Maladies chroniques', 'Substances'],
    complications: ['Suicide', 'Troubles anxieux', 'Dépendances', 'Problèmes sociaux'],
    prevention: ['Gestion du stress', 'Support social', 'Mode de vie sain'],
    medications: ['ISRS', 'IRSN', 'Tricycliques', 'IMAO'],
    contraindications: ['Allergie aux antidépresseurs', 'Glaucomes (tricycliques)'],
    followUp: ['Consultation psychiatrique', 'Surveillance du traitement', 'Prévention de la rechute']
  },
  {
    id: 'anxiete',
    name: 'Trouble anxieux',
    category: 'Psychique',
    subcategory: 'Troubles anxieux',
    symptoms: ['Anxiété', 'Agitation', 'Troubles du sommeil', 'Fatigue', 'Difficultés de concentration', 'Crises de panique', 'Évitement'],
    severity: 'moderate',
    urgency: 'medium',
    description: 'Trouble psychique caractérisé par une anxiété excessive et persistante avec retentissement fonctionnel.',
    recommendations: [
      'Thérapie cognitivo-comportementale',
      'Techniques de relaxation',
      'Anxiolytiques si nécessaire (benzodiazépines)',
      'Antidépresseurs (ISRS)',
      'Éviter les stimulants',
      'Exercices de respiration'
    ],
    differentialDiagnosis: ['Dépression', 'Trouble panique', 'TOC', 'Stress post-traumatique'],
    nextSteps: ['Évaluation psychologique', 'Traitement adapté', 'Suivi', 'Éducation thérapeutique'],
    probability: 75,
    ageGroups: ['Tous âges'],
    riskFactors: ['Facteurs génétiques', 'Événements traumatiques', 'Stress chronique'],
    complications: ['Dépression', 'Troubles somatiques', 'Évitement social'],
    prevention: ['Gestion du stress', 'Techniques de relaxation', 'Support social'],
    medications: ['Benzodiazépines', 'ISRS', 'Buspirone', 'Bêta-bloquants'],
    contraindications: ['Allergie aux anxiolytiques', 'Dépendance (benzodiazépines)'],
    followUp: ['Consultation psychologique', 'Surveillance du traitement', 'Prévention de la rechute']
  },

  // INFECTIOLOGIE
  {
    id: 'grippe',
    name: 'Grippe',
    category: 'Infectieux',
    subcategory: 'Infections virales',
    symptoms: ['Fièvre élevée', 'Courbatures', 'Fatigue', 'Maux de tête', 'Toux sèche', 'Congestion nasale', 'Frissons'],
    severity: 'moderate',
    urgency: 'medium',
    description: 'Infection virale aiguë des voies respiratoires avec symptômes généraux marqués et complications possibles.',
    recommendations: [
      'Repos au lit',
      'Hydratation abondante',
      'Antipyrétiques (paracétamol)',
      'Antitussifs si nécessaire',
      'Vaccination préventive annuelle',
      'Éviter les contacts si possible'
    ],
    differentialDiagnosis: ['Rhume', 'COVID-19', 'Mononucléose infectieuse', 'Pneumonie virale'],
    nextSteps: ['Surveillance clinique', 'Consultation si complications', 'Vaccination préventive', 'Tests si nécessaire'],
    probability: 85,
    ageGroups: ['Tous âges'],
    riskFactors: ['Âge avancé', 'Maladies chroniques', 'Immunodépression', 'Grossesse'],
    complications: ['Pneumonie', 'Surinfection bactérienne', 'Décompensation de maladies chroniques'],
    prevention: ['Vaccination annuelle', 'Hygiène des mains', 'Éviter les contacts'],
    medications: ['Paracétamol', 'Antitussifs', 'Antiviraux (oseltamivir)', 'Antibiotiques si surinfection'],
    contraindications: ['Allergie aux antiviraux', 'Insuffisance rénale (oseltamivir)'],
    followUp: ['Consultation si complications', 'Vaccination préventive']
  },
  {
    id: 'covid19',
    name: 'COVID-19',
    category: 'Infectieux',
    subcategory: 'Infections virales',
    symptoms: ['Fièvre', 'Toux', 'Essoufflement', 'Perte de goût/odorat', 'Fatigue', 'Maux de tête', 'Douleurs musculaires'],
    severity: 'moderate',
    urgency: 'high',
    description: 'Infection virale due au SARS-CoV-2 avec atteinte respiratoire possible et complications systémiques.',
    recommendations: [
      'Isolement strict',
      'Test de dépistage (PCR)',
      'Surveillance des symptômes',
      'Consultation si aggravation',
      'Vaccination préventive',
      'Mesures barrières'
    ],
    differentialDiagnosis: ['Grippe', 'Rhume', 'Autres infections virales', 'Pneumonie'],
    nextSteps: ['Test PCR', 'Surveillance clinique', 'Traitement symptomatique', 'Hospitalisation si sévère'],
    probability: 80,
    ageGroups: ['Tous âges'],
    riskFactors: ['Âge avancé', 'Maladies chroniques', 'Immunodépression', 'Obésité'],
    complications: ['Pneumonie', 'SDRA', 'Thromboses', 'Séquelles à long terme'],
    prevention: ['Vaccination', 'Mesures barrières', 'Éviter les rassemblements'],
    medications: ['Paracétamol', 'Antiviraux', 'Corticoïdes', 'Anticoagulants'],
    contraindications: ['Allergie aux traitements', 'Interactions médicamenteuses'],
    followUp: ['Surveillance clinique', 'Tests de contrôle', 'Rééducation si nécessaire']
  }
];

// Fonction pour rechercher une condition médicale
export function findVidalCondition(symptoms: string[]): VidalMedicalCondition | null {
  let bestMatch: VidalMedicalCondition | null = null;
  let bestScore = 0;

  for (const condition of vidalMedicalConditions) {
    const matchingSymptoms = condition.symptoms.filter(symptom => 
      symptoms.some(s => s.toLowerCase().includes(symptom.toLowerCase()) || 
                        symptom.toLowerCase().includes(s.toLowerCase()))
    );
    
    const score = (matchingSymptoms.length / condition.symptoms.length) * 100;
    
    if (score > bestScore && score > 40) { // Seuil de 40% de correspondance
      bestScore = score;
      bestMatch = condition;
    }
  }

  return bestMatch;
}

// Fonction pour obtenir des conditions par catégorie
export function getConditionsByCategory(category: string): VidalMedicalCondition[] {
  return vidalMedicalConditions.filter(condition => condition.category === category);
}

// Fonction pour obtenir des conditions par urgence
export function getConditionsByUrgency(urgency: 'low' | 'medium' | 'high' | 'critical'): VidalMedicalCondition[] {
  return vidalMedicalConditions.filter(condition => condition.urgency === urgency);
}

// Fonction pour rechercher par nom
export function searchConditionByName(name: string): VidalMedicalCondition | null {
  return vidalMedicalConditions.find(condition => 
    condition.name.toLowerCase().includes(name.toLowerCase())
  ) || null;
}
