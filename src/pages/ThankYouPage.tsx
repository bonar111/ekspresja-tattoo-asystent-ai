import React, { useEffect } from 'react';

const ThankYouPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Dziękujemy | Ekspresja Tattoo Studio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-heading mb-6">Dziękujemy za zgłoszenie!</h1>
        <p className="text-lg text-gray-300 mb-4">
          Twoje zgłoszenie dotarło do nas pomyślnie.
        </p>
        <p className="text-lg text-gray-300 mb-8">
          Nasz tatuator dokładnie zapozna się z Twoim pomysłem na tatuaż i przygotuje dla Ciebie odpowiedź
          najpóźniej w następnym dniu roboczym.
        </p>
        <p className="text-gray-400">
          Do zobaczenia wkrótce w Ekspresji!
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
