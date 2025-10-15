import { NextRequest, NextResponse } from 'next/server';
import { generateDoctorPhoto, generateAllDoctorPhotos, FALLBACK_DOCTOR_PHOTOS } from '@/lib/generate-doctor-photos';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { doctorId, generateAll } = body;

    // Vérifier si OpenAI est configuré
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key non configurée, utilisation des photos de fallback');
      return NextResponse.json({
        success: false,
        message: 'OpenAI API key non configurée',
        photos: FALLBACK_DOCTOR_PHOTOS
      });
    }

    if (generateAll) {
      // Générer toutes les photos
      console.log('Génération de toutes les photos de médecins...');
      const photos = await generateAllDoctorPhotos();
      
      return NextResponse.json({
        success: true,
        message: 'Photos générées avec succès',
        photos: photos,
        fallbacks: FALLBACK_DOCTOR_PHOTOS
      });
    } else if (doctorId) {
      // Générer une photo spécifique
      console.log(`Génération de la photo pour ${doctorId}...`);
      const photoUrl = await generateDoctorPhoto(doctorId);
      
      if (photoUrl) {
        return NextResponse.json({
          success: true,
          message: 'Photo générée avec succès',
          doctorId: doctorId,
          photoUrl: photoUrl,
          fallback: FALLBACK_DOCTOR_PHOTOS[doctorId as keyof typeof FALLBACK_DOCTOR_PHOTOS]
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Échec de génération de la photo',
          doctorId: doctorId,
          fallback: FALLBACK_DOCTOR_PHOTOS[doctorId as keyof typeof FALLBACK_DOCTOR_PHOTOS]
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'Paramètres manquants'
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Erreur dans l\'API de génération de photos:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur interne du serveur',
      photos: FALLBACK_DOCTOR_PHOTOS
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API de génération de photos de médecins',
    version: '1.0.0',
    doctors: [
      'dr-sarah',
      'dr-marcus', 
      'dr-elena',
      'dr-james',
      'dr-gabriel',
      'dr-raj'
    ],
    fallbacks: FALLBACK_DOCTOR_PHOTOS
  });
}
