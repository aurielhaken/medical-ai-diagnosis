import { NextRequest, NextResponse } from 'next/server';
import { medicalSearchEngine } from '@/lib/medical-search-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, type = 'full' } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Requête de recherche requise' },
        { status: 400 }
      );
    }

    console.log(`Recherche médicale: "${query}" (type: ${type})`);

    let results;

    if (type === 'quick') {
      // Recherche rapide pour l'autocomplétion
      results = await medicalSearchEngine.quickSearch(query);
    } else {
      // Recherche complète
      results = await medicalSearchEngine.search(query);
    }

    // Simuler un délai de recherche (optionnel)
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      query: query,
      type: type,
      results: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur dans l\'API de recherche médicale:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API de recherche médicale complète',
    version: '1.0.0',
    features: [
      'Recherche de molécules Vidal',
      'Médecines alternatives',
      'Exercices thérapeutiques',
      'Vidéos YouTube',
      'Remèdes de grand-mère',
      'Médecine orientale',
      'Comparaisons médicaments vs naturels',
      'Recettes thérapeutiques'
    ],
    endpoints: {
      'POST /': 'Recherche complète ou rapide',
      'GET /': 'Informations sur l\'API'
    },
    examples: {
      'Recherche complète': {
        method: 'POST',
        body: { query: 'douleur sciatique', type: 'full' }
      },
      'Recherche rapide': {
        method: 'POST',
        body: { query: 'curcuma', type: 'quick' }
      }
    }
  });
}
