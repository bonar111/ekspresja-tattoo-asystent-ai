// src/pages/StudioContactPage.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface FormValues {
  studioName: string;
  email: string;
  phone: string;
  gdpr: boolean;
}

const StudioContactPage = () => {
  const nav = useNavigate();
  const location = useLocation();
  const chosenPlan = (location.state as { plan?: string })?.plan;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    defaultValues: { gdpr: true }
  });

  useEffect(() => {
    document.title = 'Zgłoś swoje studio | Ekspresja AI';
    window.scrollTo(0, 0);
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // ✉️ Tu w prawdziwym projekcie wyślij dane do backendu / CRM
    // np. await axios.post('/api/leads', { ...data, chosenPlan });

    console.table({ ...data, chosenPlan });
    reset();
    nav('/podziekowania'); // możesz podmienić na własną stronę sukcesu
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto bg-metallic p-8 rounded-xl"
        >
          <h1 className="text-2xl mb-6 text-center">
            {chosenPlan ? `Pakiet ${chosenPlan}` : 'Zgłoś swoje studio'}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-1">
                Nazwa studia <span className="text-neon">*</span>
              </label>
              <input
                className="form-input"
                {...register('studioName', { required: true })}
              />
              {errors.studioName && (
                <p className="text-red-400 text-sm mt-1">To pole jest wymagane.</p>
              )}
            </div>

            <div>
              <label className="block mb-1">
                Email <span className="text-neon">*</span>
              </label>
              <input
                type="email"
                className="form-input"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">Wpisz poprawny email.</p>
              )}
            </div>

            <div>
              <label className="block mb-1">
                Telefon <span className="text-neon">*</span>
              </label>
              <input
                type="tel"
                className="form-input"
                {...register('phone', { required: true })}
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">Podaj numer telefonu.</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('gdpr', { required: true })} />
                <span>
                  Wyrażam zgodę na kontakt w sprawie usługi (RODO) <span className="text-neon">*</span>
                </span>
              </label>
              {errors.gdpr && (
                <p className="text-red-400 text-sm mt-1">Zgoda jest wymagana.</p>
              )}
            </div>

            <button disabled={isSubmitting} className="btn btn-primary w-full">
              {isSubmitting ? 'Wysyłanie…' : 'Wyślij i czekaj na telefon'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default StudioContactPage;
