# Google Medical - Diagnostic médical automatique par IA

Un système de diagnostic médical révolutionnaire utilisant l'intelligence artificielle pour fournir des diagnostics préliminaires rapides et précis.

## 🌟 Fonctionnalités

- **Diagnostic automatique** : Analyse des symptômes par IA
- **Multilingue** : Disponible en français, anglais et espagnol
- **Interface Google Style** : Design moderne et intuitif
- **Recherche de symptômes** : Barre de recherche intelligente
- **Symptômes populaires** : Accès rapide aux symptômes courants
- **Diagnostic en temps réel** : Résultats instantanés
- **Médecines universelles** : Intégration des approches thérapeutiques du monde entier

## 🚀 Technologies utilisées

- **Next.js 15** avec App Router
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **APIs IA** : Google Gemini, OpenAI GPT-4o, OpenRouter
- **Zod** pour la validation des données

## 🏃‍♂️ Démarrage rapide

1. **Cloner le projet**
```bash
git clone <repository-url>
cd google-medical
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configurer les variables d'environnement**
Créez un fichier `.env.local` avec vos clés API :
```env
GOOGLE_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

4. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. **Ouvrir dans le navigateur**
Rendez-vous sur [http://localhost:3000](http://localhost:3000)

## 🎯 Utilisation

### Page d'accueil
- Saisissez vos symptômes dans la barre de recherche
- Cliquez sur les symptômes populaires pour un accès rapide
- Obtenez un diagnostic préliminaire instantané

### Diagnostic avancé
- Accédez à `/diagnostic` pour une analyse complète
- Sélectionnez les zones du corps affectées
- Choisissez parmi une vaste liste de symptômes
- Ajoutez des commentaires détaillés

### Fonctionnalités multilingues
- Sélectionnez votre langue (🇫🇷 Français, 🇺🇸 English, 🇪🇸 Español)
- Interface entièrement traduite
- Diagnostic adapté à votre langue

## 🏗️ Architecture

```
src/
├── app/                    # Pages Next.js
│   ├── page.tsx           # Page d'accueil Google Medical
│   ├── diagnostic/        # Diagnostic avancé
│   ├── about/             # Page à propos
│   └── api/               # API Routes
├── components/            # Composants React
├── lib/                   # Logique métier
│   ├── medical-ai-services.ts    # Services IA
│   ├── medical-database.ts       # Base de données médicale
│   ├── universal-medicine.ts     # Médecines universelles
│   └── medical-treatments.ts     # Traitements
└── types/                 # Types TypeScript
```

## 🤖 Intégrations IA

### Google Gemini Pro (Gratuit)
- Diagnostic médical de base
- Analyse des symptômes
- Recommandations préliminaires

### OpenAI GPT-4o
- Diagnostic avancé
- Analyse complexe des symptômes
- Recommandations détaillées

### OpenRouter
- Accès à plusieurs modèles IA
- Fallback pour la disponibilité
- Modèles médicaux spécialisés

## 🌍 Médecines universelles

Le système intègre :
- **Médecine conventionnelle** : Approche scientifique moderne
- **Médecines douces** : Phytothérapie, aromathérapie, naturopathie
- **Médecines traditionnelles** : TCM, Ayurveda, médecine arabe
- **Médecine intégrative** : Approche holistique combinée

## ⚠️ Avertissements

- Ce service fournit des **informations médicales à titre informatif uniquement**
- Il **ne remplace pas** une consultation médicale professionnelle
- En cas de symptômes graves, consultez **immédiatement** un médecin
- En urgence médicale, appelez le **112**

## 📱 Responsive Design

- Interface adaptée mobile, tablette et desktop
- Navigation mobile optimisée
- Design Google Material inspiré

## 🔧 Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
```

## 📄 Licence

Ce projet est développé à des fins éducatives et de démonstration.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouvelles fonctionnalités
- Améliorer la documentation

---

**Google Medical** - Révolutionner l'accès aux soins de santé grâce à l'IA 🏥✨
