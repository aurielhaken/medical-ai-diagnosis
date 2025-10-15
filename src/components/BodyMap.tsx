'use client';

import React from 'react';

interface BodyMapProps {
  selectedAreas: string[];
  onAreaSelect: (area: string) => void;
  language: 'fr' | 'en' | 'es';
}

const areaTranslations = {
  fr: {
    head: 'Tête',
    forehead: 'Front',
    temples: 'Tempes',
    eyes: 'Yeux',
    ears: 'Oreilles',
    nose: 'Nez',
    mouth: 'Bouche',
    jaw: 'Mâchoire',
    neck: 'Cou',
    throat: 'Gorge',
    shoulders: 'Épaules',
    upperBack: 'Haut du dos',
    chest: 'Poitrine',
    heart: 'Cœur',
    lungs: 'Poumons',
    breasts: 'Seins',
    lowerBack: 'Bas du dos',
    abdomen: 'Abdomen',
    stomach: 'Estomac',
    liver: 'Foie',
    kidneys: 'Reins',
    pelvis: 'Bassin',
    genitals: 'Organes génitaux',
    arms: 'Bras',
    elbows: 'Coudes',
    forearms: 'Avant-bras',
    wrists: 'Poignets',
    hands: 'Mains',
    fingers: 'Doigts',
    thighs: 'Cuisse',
    knees: 'Genoux',
    calves: 'Mollets',
    ankles: 'Chevilles',
    feet: 'Pieds',
    toes: 'Orteils'
  },
  en: {
    head: 'Head',
    neck: 'Neck',
    chest: 'Chest',
    abdomen: 'Abdomen',
    back: 'Back',
    arms: 'Arms',
    hands: 'Hands',
    legs: 'Legs',
    feet: 'Feet',
    pelvis: 'Pelvis'
  },
  es: {
    head: 'Cabeza',
    neck: 'Cuello',
    chest: 'Pecho',
    abdomen: 'Abdomen',
    back: 'Espalda',
    arms: 'Brazos',
    hands: 'Manos',
    legs: 'Piernas',
    feet: 'Pies',
    pelvis: 'Pelvis'
  }
};

export default function BodyMap({ selectedAreas, onAreaSelect, language }: BodyMapProps) {
  const t = areaTranslations[language];

  const bodyAreas = [
    // Tête et visage
    { id: 'head', label: t.head, x: 45, y: 5, width: 10, height: 15, type: 'circle' },
    { id: 'forehead', label: t.forehead, x: 46, y: 6, width: 8, height: 4, type: 'rect' },
    { id: 'temples', label: t.temples, x: 42, y: 8, width: 6, height: 4, type: 'rect' },
    { id: 'eyes', label: t.eyes, x: 45, y: 12, width: 10, height: 3, type: 'rect' },
    { id: 'nose', label: t.nose, x: 48, y: 15, width: 4, height: 3, type: 'rect' },
    { id: 'mouth', label: t.mouth, x: 46, y: 18, width: 8, height: 2, type: 'rect' },
    { id: 'jaw', label: t.jaw, x: 44, y: 19, width: 12, height: 3, type: 'rect' },
    { id: 'ears', label: t.ears, x: 38, y: 10, width: 3, height: 6, type: 'rect' },
    
    // Cou et gorge
    { id: 'neck', label: t.neck, x: 47, y: 22, width: 6, height: 8, type: 'rect' },
    { id: 'throat', label: t.throat, x: 48, y: 23, width: 4, height: 6, type: 'rect' },
    
    // Tronc supérieur
    { id: 'shoulders', label: t.shoulders, x: 35, y: 30, width: 30, height: 8, type: 'rect' },
    { id: 'upperBack', label: t.upperBack, x: 37, y: 38, width: 26, height: 12, type: 'rect' },
    { id: 'chest', label: t.chest, x: 42, y: 38, width: 16, height: 12, type: 'rect' },
    { id: 'heart', label: t.heart, x: 44, y: 40, width: 6, height: 6, type: 'rect' },
    { id: 'lungs', label: t.lungs, x: 41, y: 42, width: 18, height: 8, type: 'rect' },
    { id: 'breasts', label: t.breasts, x: 45, y: 44, width: 10, height: 4, type: 'rect' },
    
    // Tronc inférieur
    { id: 'lowerBack', label: t.lowerBack, x: 38, y: 50, width: 24, height: 15, type: 'rect' },
    { id: 'abdomen', label: t.abdomen, x: 43, y: 50, width: 14, height: 15, type: 'rect' },
    { id: 'stomach', label: t.stomach, x: 45, y: 52, width: 10, height: 6, type: 'rect' },
    { id: 'liver', label: t.liver, x: 42, y: 54, width: 6, height: 8, type: 'rect' },
    { id: 'kidneys', label: t.kidneys, x: 40, y: 56, width: 4, height: 6, type: 'rect' },
    
    // Bassin
    { id: 'pelvis', label: t.pelvis, x: 44, y: 65, width: 12, height: 8, type: 'rect' },
    { id: 'genitals', label: t.genitals, x: 48, y: 70, width: 4, height: 3, type: 'rect' },
    
    // Bras et mains
    { id: 'arms', label: t.arms, x: 20, y: 35, width: 15, height: 25, type: 'rect' },
    { id: 'elbows', label: t.elbows, x: 22, y: 50, width: 8, height: 6, type: 'rect' },
    { id: 'forearms', label: t.forearms, x: 18, y: 56, width: 12, height: 8, type: 'rect' },
    { id: 'wrists', label: t.wrists, x: 20, y: 64, width: 8, height: 3, type: 'rect' },
    { id: 'hands', label: t.hands, x: 16, y: 67, width: 16, height: 6, type: 'rect' },
    { id: 'fingers', label: t.fingers, x: 14, y: 68, width: 20, height: 4, type: 'rect' },
    
    // Jambes et pieds
    { id: 'thighs', label: t.thighs, x: 43, y: 73, width: 14, height: 15, type: 'rect' },
    { id: 'knees', label: t.knees, x: 45, y: 88, width: 10, height: 8, type: 'rect' },
    { id: 'calves', label: t.calves, x: 44, y: 96, width: 12, height: 12, type: 'rect' },
    { id: 'ankles', label: t.ankles, x: 46, y: 108, width: 8, height: 4, type: 'rect' },
    { id: 'feet', label: t.feet, x: 42, y: 112, width: 16, height: 8, type: 'rect' },
    { id: 'toes', label: t.toes, x: 40, y: 118, width: 20, height: 3, type: 'rect' }
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {language === 'fr' ? 'Carte du corps' :
           language === 'en' ? 'Body Map' :
           'Mapa del cuerpo'}
        </h3>
        <p className="text-sm text-gray-600">
          {language === 'fr' ? 'Cliquez sur les zones douloureuses' :
           language === 'en' ? 'Click on painful areas' :
           'Haga clic en las áreas dolorosas'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {language === 'fr' ? 'Sélectionnez les parties du corps concernées' :
           language === 'en' ? 'Select the affected body parts' :
           'Seleccione las partes del cuerpo afectadas'}
        </p>
      </div>

      {/* Carte du corps MEDIVERSE.AI - Simple et efficace */}
      <div className="relative bg-white rounded-2xl shadow-xl p-6">
        <svg
          width="300"
          height="600"
          viewBox="0 0 150 300"
          className="mx-auto"
        >
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE5D9" />
              <stop offset="100%" stopColor="#FFD6C8" />
            </linearGradient>
            
            <linearGradient id="selectedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            
            <filter id="bodyShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.1"/>
            </filter>
          </defs>
          
          {/* Fond simple */}
          <rect width="150" height="300" fill="#F8FAFC" opacity="0.3"/>
          <line x1="75" y1="0" x2="75" y2="300" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3,3"/>
          
          {/* CORPS HUMAIN MEDIVERSE.AI - SIMPLE ET ÉLÉGANT */}
          
          {/* Tête */}
          <ellipse cx="75" cy="30" rx="12" ry="15" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1.5" filter="url(#bodyShadow)"/>
          
          {/* Cou */}
          <ellipse cx="75" cy="48" rx="5" ry="8" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          
          {/* Tronc */}
          <ellipse cx="75" cy="90" rx="20" ry="35" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1.5" filter="url(#bodyShadow)"/>
          
          {/* Bras gauche */}
          <ellipse cx="45" cy="80" rx="8" ry="20" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1" filter="url(#bodyShadow)"/>
          <ellipse cx="40" cy="105" rx="6" ry="15" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          <ellipse cx="38" cy="125" rx="5" ry="12" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          
          {/* Bras droit */}
          <ellipse cx="105" cy="80" rx="8" ry="20" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1" filter="url(#bodyShadow)"/>
          <ellipse cx="110" cy="105" rx="6" ry="15" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          <ellipse cx="112" cy="125" rx="5" ry="12" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          
          {/* Mains */}
          <ellipse cx="35" cy="140" rx="6" ry="8" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          <ellipse cx="115" cy="140" rx="6" ry="8" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          
          {/* Bassin */}
          <ellipse cx="75" cy="130" rx="18" ry="12" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1.5" filter="url(#bodyShadow)"/>
          
          {/* Cuisse gauche */}
          <ellipse cx="65" cy="170" rx="10" ry="25" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1" filter="url(#bodyShadow)"/>
          
          {/* Cuisse droite */}
          <ellipse cx="85" cy="170" rx="10" ry="25" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1" filter="url(#bodyShadow)"/>
          
          {/* Genoux */}
          <ellipse cx="65" cy="205" rx="8" ry="10" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          <ellipse cx="85" cy="205" rx="8" ry="10" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          
          {/* Mollets */}
          <ellipse cx="65" cy="235" rx="7" ry="20" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          <ellipse cx="85" cy="235" rx="7" ry="20" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          
          {/* Pieds */}
          <ellipse cx="62" cy="260" rx="8" ry="6" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          <ellipse cx="88" cy="260" rx="8" ry="6" fill="url(#bodyGradient)" stroke="#D1A88A" strokeWidth="1"/>
          
          {/* Zones cliquables MEDIVERSE.AI */}
          {bodyAreas.map((area) => {
            const isSelected = selectedAreas.includes(area.id);
            // Coordonnées simplifiées pour le nouveau viewBox
            const scaledX = area.x * 1.5;
            const scaledY = area.y * 3;
            const scaledWidth = area.width * 1.5;
            const scaledHeight = area.height * 3;
            
            return (
              <g key={area.id}>
                {/* Zone de sélection */}
                <ellipse
                  cx={scaledX + scaledWidth/2}
                  cy={scaledY + scaledHeight/2}
                  rx={scaledWidth/2 + 3}
                  ry={scaledHeight/2 + 3}
                  fill={isSelected ? 'url(#selectedGradient)' : 'transparent'}
                  fillOpacity={isSelected ? 0.4 : 0}
                  stroke={isSelected ? '#3B82F6' : 'transparent'}
                  strokeWidth={isSelected ? 2 : 0}
                  className="cursor-pointer transition-all duration-300 hover:fill-blue-200 hover:fill-opacity-20"
                  onClick={() => onAreaSelect(area.id)}
                />
                
                {/* Indicateur de sélection */}
                {isSelected && (
                  <circle 
                    cx={scaledX + scaledWidth/2} 
                    cy={scaledY + scaledHeight/2} 
                    r="4" 
                    fill="#FFFFFF" 
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Zones sélectionnées */}
      {selectedAreas.length > 0 && (
        <div className="w-full">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {language === 'fr' ? 'Zones sélectionnées:' :
             language === 'en' ? 'Selected areas:' :
             'Áreas seleccionadas:'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedAreas.map((areaId) => {
              const area = bodyAreas.find(a => a.id === areaId);
              return (
                <span
                  key={areaId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                >
                  {area?.label || areaId}
                  <button
                    onClick={() => onAreaSelect(areaId)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}