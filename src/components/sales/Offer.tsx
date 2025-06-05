import { motion } from 'framer-motion';
import { useState } from 'react';

const Offer = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ email: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wyślij dane do backendu lub zewnętrznego narzędzia (np. MailerLite, CRM)
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-graphite" id="oferta">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          Oferta dla tatuatorów
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-metallic p-8 rounded-lg text-center"
        >
          <p className="text-lg mb-6 text-gray-300">
            Oferujemy Ci narzędzie, które zwiększy liczbę zapisów na tatuaż dzięki sztucznej inteligencji. Twój wirtualny asystent odpowie klientom 24/7, zakwalifikuje ich i umówi na sesję.
          </p>

          <ul className="text-left text-white mb-6 space-y-2">
            <li>✔ Obsługa klientów 24/7 – nawet gdy śpisz</li>
            <li>✔ Inteligentna selekcja klientów gotowych na tatuaż</li>
            <li>✔ Wyceny, portfolio i kalendarz dostępne w 1 wiadomości</li>
            <li>✔ Integracja z Instagramem, Facebookiem i Messengerem</li>
          </ul>

          <div className="text-xl font-semibold text-white mb-6">
            Cena: tylko 129 zł miesięcznie – bez umów, bez ryzyka.
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Twój e-mail"
                className="w-full px-4 py-3 rounded-lg bg-graphite text-white border border-gray-600"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="tel"
                required
                placeholder="Numer telefonu"
                className="w-full px-4 py-3 rounded-lg bg-graphite text-white border border-gray-600"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Chcę porozmawiać z konsultantem
              </button>
              <p className="text-sm text-gray-400 mt-2">Nasz konsultant skontaktuje się z Tobą w ciągu 24h.</p>
            </form>
          ) : (
            <div className="text-green-400 font-medium">
              Dziękujemy! Skontaktujemy się z Tobą wkrótce.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Offer;
