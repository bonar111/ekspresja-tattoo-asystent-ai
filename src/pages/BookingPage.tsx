import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveClientData } from '../utils/aiAssistantApi';
import { track } from '../lib/analytics';

interface BookingFormInputs {
  firstName: string;
  email: string;
  phone: string;
  files: FileList;
  gdprConsent: boolean;
}

const TEST_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\
eyJ1bmlxdWVfbmFtZSI6IkdyemVnb3J6IEJvbmFyIiwibmJmIjoxNzQ2MjYyMjA3LCJleHAiOjQ5MDIwMjIyMDcsImlhdCI6MTc0NjI2MjIwNywiaXNzIjoiRWtzcHJlc2phIiwiYXVkIjoiRWtzcHJlc2phIn0.\
xbP5BWij6wpc5j9pc5UBiCweZVmQurvHFc8W_Q0KWKU`;

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  useEffect(() => {
    localStorage.setItem('token', TEST_TOKEN);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<BookingFormInputs>({
    defaultValues: {
      firstName: '',
      email: '',
      phone: '',
      gdprConsent: false
    }
  });

  useEffect(() => {
    track('AIFormView');
    setQueryParams(Object.fromEntries(new URLSearchParams(location.search)));
  }, [location.search]);

  const onSubmit: SubmitHandler<BookingFormInputs> = async (data) => {
    try {
      const response = await saveClientData({
        FirstName: data.firstName,
        Email: data.email,
        PhoneNumber: data.phone,
        ConsentRodo: data.gdprConsent,
        Placement: queryParams.placement,
        Size: queryParams.size ? Number(queryParams.size) : undefined,
        IsColour: queryParams.isColor === 'tak',
        UserTattooDescription: queryParams.description,
        SelectedDate: queryParams.date,
        SelectedArtist: queryParams.artist,
        VoiceFlowId: queryParams.vfId,
        OwnerId: queryParams.ownerId,
        Photos: data.files ? Array.from(data.files) : []
      });

      if (response.status === 200) {
        +        // --------------- zdarzenie 3 -----------------
        track('AISubmit', {
          placement: queryParams.placement,
          size:     queryParams.size,
          isColour: queryParams.isColor === 'tak',
          artist:   queryParams.artist
        });
        // --------------------------------------------

        reset();
        navigate('/podziekowania');
      }
    } catch (error) {
      console.error('Błąd wysyłki formularza:', error);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 text-3xl">Zarezerwuj sesję tatuażu</h1>
          <p className="text-gray-400">Wypełnij formularz, aby ukończyć rezerwację.</p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-metallic p-6 rounded-lg space-y-6"
          >
            <div>
              <label className="block mb-2">
                Imię <span className="text-neon">*</span>
              </label>
              <input type="text" className="form-input" {...register('firstName', { required: true })} />
              {errors.firstName && <p className="text-red-400 text-sm mt-1">Imię jest wymagane.</p>}
            </div>

            <div>
              <label className="block mb-2">
                Email <span className="text-neon">*</span>
              </label>
              <input type="email" className="form-input" {...register('email', { required: true })} />
              {errors.email && <p className="text-red-400 text-sm mt-1">Email jest wymagany.</p>}
            </div>

            <div>
              <label className="block mb-2">
                Numer telefonu <span className="text-neon">*</span>
              </label>
              <input type="tel" className="form-input" {...register('phone', { required: true })} />
              {errors.phone && <p className="text-red-400 text-sm mt-1">Numer telefonu jest wymagany.</p>}
            </div>

            <div>
              <label className="block mb-2">Zdjęcia inspiracji (opcjonalne)</label>
              <input type="file" multiple accept="image/*" className="form-input" {...register('files')} />
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('gdprConsent', { required: true })} />
                Wyrażam zgodę na przetwarzanie danych <span className="text-neon">*</span>
              </label>
              {errors.gdprConsent && <p className="text-red-400 text-sm mt-1">Zgoda jest wymagana.</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij zgłoszenie'}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
