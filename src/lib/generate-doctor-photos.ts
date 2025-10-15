import OpenAI from 'openai';

// Configuration OpenAI pour générer les photos de médecins
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Prompts pour générer des photos réalistes de médecins
const DOCTOR_PHOTO_PROMPTS = {
  'dr-sarah': {
    name: 'Dr. Sarah Chen',
    prompt: 'Professional portrait of a confident Asian female doctor in her 40s, wearing a white medical coat with stethoscope, modern hospital background, friendly smile, professional lighting, high quality medical photography style'
  },
  'dr-marcus': {
    name: 'Dr. Marcus Thompson', 
    prompt: 'Professional portrait of a distinguished African-American male doctor in his 50s, wearing a white medical coat with stethoscope, modern hospital background, confident expression, professional lighting, high quality medical photography style'
  },
  'dr-elena': {
    name: 'Dr. Elena Rodriguez',
    prompt: 'Professional portrait of a warm Hispanic female doctor in her 30s, wearing a white medical coat with stethoscope, modern hospital background, caring smile, professional lighting, high quality medical photography style'
  },
  'dr-james': {
    name: 'Dr. James Wilson',
    prompt: 'Professional portrait of a experienced Caucasian male doctor in his 40s, wearing a white medical coat with stethoscope, modern hospital background, professional demeanor, professional lighting, high quality medical photography style'
  },
  'dr-gabriel': {
    name: 'Dr. Gabriel Angel',
    prompt: 'Professional portrait of a compassionate Middle Eastern male doctor in his 35s, wearing a white medical coat with stethoscope, modern hospital background, gentle smile, professional lighting, high quality medical photography style'
  },
  'dr-raj': {
    name: 'Dr. Raj Patel',
    prompt: 'Professional portrait of a knowledgeable South Asian male doctor in his 45s, wearing a white medical coat with stethoscope, modern hospital background, wise expression, professional lighting, high quality medical photography style'
  }
};

export async function generateDoctorPhoto(doctorId: string): Promise<string | null> {
  try {
    const doctorInfo = DOCTOR_PHOTO_PROMPTS[doctorId as keyof typeof DOCTOR_PHOTO_PROMPTS];
    
    if (!doctorInfo) {
      console.error(`Docteur non trouvé: ${doctorId}`);
      return null;
    }

    console.log(`Génération de la photo pour ${doctorInfo.name}...`);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: doctorInfo.prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "natural"
    });

    const imageUrl = response.data[0]?.url;
    
    if (imageUrl) {
      console.log(`Photo générée avec succès pour ${doctorInfo.name}`);
      return imageUrl;
    } else {
      console.error(`Échec de génération de la photo pour ${doctorInfo.name}`);
      return null;
    }
  } catch (error) {
    console.error(`Erreur lors de la génération de la photo pour ${doctorId}:`, error);
    return null;
  }
}

// Fonction pour générer toutes les photos des médecins
export async function generateAllDoctorPhotos(): Promise<Record<string, string>> {
  const photos: Record<string, string> = {};
  
  for (const doctorId of Object.keys(DOCTOR_PHOTO_PROMPTS)) {
    try {
      const photoUrl = await generateDoctorPhoto(doctorId);
      if (photoUrl) {
        photos[doctorId] = photoUrl;
      }
      // Pause entre les générations pour éviter les limites de rate
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Erreur pour ${doctorId}:`, error);
    }
  }
  
  return photos;
}

// Photos de fallback (URLs d'images médicales professionnelles)
export const FALLBACK_DOCTOR_PHOTOS = {
  'dr-sarah': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
  'dr-marcus': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
  'dr-elena': 'https://images.unsplash.com/photo-1594824534453-89b8b93f2b0e?w=400&h=400&fit=crop&crop=face',
  'dr-james': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
  'dr-gabriel': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
  'dr-raj': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face'
};
