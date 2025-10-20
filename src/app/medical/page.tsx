'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MedicalRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page d'accueil
    router.push('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirection en cours...</h1>
        <p>Vous allez être redirigé vers la page d'accueil.</p>
      </div>
    </div>
  );
}
