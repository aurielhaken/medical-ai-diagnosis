const fs = require('fs');
const path = require('path');

// Créer un SVG simple pour l'icône MyDoc-AI
const iconSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="512" cy="512" r="480" fill="url(#gradient)" stroke="#ffffff" stroke-width="8"/>
  
  <!-- Medical cross -->
  <rect x="400" y="200" width="224" height="80" rx="40" fill="#ffffff"/>
  <rect x="460" y="140" width="104" height="200" rx="52" fill="#ffffff"/>
  
  <!-- AI circuit pattern -->
  <circle cx="300" cy="300" r="8" fill="#ffffff" opacity="0.8"/>
  <circle cx="724" cy="300" r="8" fill="#ffffff" opacity="0.8"/>
  <circle cx="300" cy="724" r="8" fill="#ffffff" opacity="0.8"/>
  <circle cx="724" cy="724" r="8" fill="#ffffff" opacity="0.8"/>
  
  <!-- Connection lines -->
  <line x1="300" y1="300" x2="400" y2="400" stroke="#ffffff" stroke-width="3" opacity="0.6"/>
  <line x1="724" y1="300" x2="624" y2="400" stroke="#ffffff" stroke-width="3" opacity="0.6"/>
  <line x1="300" y1="724" x2="400" y2="624" stroke="#ffffff" stroke-width="3" opacity="0.6"/>
  <line x1="724" y1="724" x2="624" y2="624" stroke="#ffffff" stroke-width="3" opacity="0.6"/>
  
  <!-- Text -->
  <text x="512" y="900" font-family="Arial, sans-serif" font-size="120" font-weight="900" text-anchor="middle" fill="#ffffff">MyDoc-AI</text>
</svg>
`;

// Créer le dossier assets s'il n'existe pas
const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Sauvegarder l'icône SVG
fs.writeFileSync(path.join(assetsDir, 'icon.svg'), iconSvg);

console.log('✅ Icône SVG générée avec succès !');
console.log('📁 Fichier créé : assets/icon.svg');
console.log('');
console.log('📱 Pour générer les icônes PNG, utilisez un convertisseur en ligne ou :');
console.log('   - https://convertio.co/svg-png/');
console.log('   - https://cloudconvert.com/svg-to-png');
console.log('');
console.log('📏 Tailles nécessaires :');
console.log('   - icon.png : 1024x1024');
console.log('   - splash.png : 1284x2778 (iPhone 12 Pro Max)');
console.log('   - adaptive-icon.png : 1024x1024');
console.log('   - favicon.png : 48x48');
