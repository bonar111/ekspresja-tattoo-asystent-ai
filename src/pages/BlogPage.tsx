import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { openChat } from '../lib/openChat';

const BlogPage = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Blog & FAQ | Ekspresja Tattoo Studio';
    window.scrollTo(0, 0);
  }, []);

  const toggleQuestion = (index: number) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };

  const faqItems = [
    { question: "Does getting a tattoo hurt?", answer: "Pain is subjective and varies from person to person. Most clients describe the sensation as uncomfortable rather than painful, similar to a cat scratch or sunburn. Areas with more nerve endings or thin skin (like ribs, ankles, or inner arms) tend to be more sensitive than others. Our artists work to make the experience as comfortable as possible." },
    { question: "How should I prepare for my tattoo session?", answer: "Get a good night's sleep, eat a proper meal before your appointment, and stay hydrated. Avoid alcohol for at least 24 hours before your session, as it can thin your blood and increase bleeding. Wear comfortable clothing that provides easy access to the area being tattooed. Consider bringing snacks and entertainment for longer sessions." },
    { question: "How much will my tattoo cost?", answer: "Tattoo pricing depends on size, complexity, placement, and the time required to complete the work. Our artists charge by the hour for larger pieces, while smaller tattoos often have a minimum fee. During your consultation, we'll provide a specific quote based on your design. Deposits are required to secure your appointment and are applied to the final cost." },
    { question: "How do I care for my new tattoo?", answer: "After your session, we'll provide detailed aftercare instructions. Generally, you'll need to keep the tattoo clean and moisturized. Avoid swimming, direct sunlight, and heavy exercise for at least two weeks. Don't pick or scratch at scabs as they form. If you have any concerns during healing, contact us immediately. Proper aftercare is crucial for maintaining the quality of your tattoo." },
    { question: "How long does a tattoo take to heal?", answer: "The visible healing process takes about 2-4 weeks, though complete healing beneath the skin takes longer. Initially, your tattoo may appear very bright and then form a scab. As it heals, some flaking is normal. The tattoo may look dull after this initial healing, but it will regain its vibrancy as the deeper layers heal over 1-2 months." },
    { question: "Can I bring my own design?", answer: "Absolutely! We encourage clients to bring references, ideas, or complete designs. Our artists can work directly from your design or make modifications to ensure it translates well as a tattoo. During consultation, we'll discuss any necessary adjustments for size, placement, and longevity of the design." }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* ... artykuł bez zmian (ucięte dla czytelności) ... */}
            {/* Cała treść artykułu z Twojej wersji zostaje */}
            {/* --- POCZĄTEK SKRÓTU --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-8">First Tattoo Experience: What to Expect</h1>
              <div className="mb-8 rounded-lg overflow-hidden">
                <LazyLoadImage
                  src="https://images.pexels.com/photos/4125580/pexels-photo-4125580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="First tattoo experience"
                  effect="blur"
                  className="w-full h-auto"
                />
              </div>
              {/* --- TU zostaw cały Twój istniejący długi artykuł --- */}
            </motion.div>
            {/* --- KONIEC SKRÓTU --- */}
          </div>
          
          <div className="lg:col-span-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-metallic rounded-lg p-6 sticky top-24"
            >
              <h2 className="text-xl mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4">
                    <button
                      className="flex justify-between items-center w-full text-left font-medium"
                      onClick={() => toggleQuestion(index)}
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-200 ${activeQuestion === index ? 'rotate-180 text-neon' : ''}`}
                      />
                    </button>
                    <div
                      className={`mt-2 text-gray-300 overflow-hidden transition-all duration-300 ${activeQuestion === index ? 'max-h-96' : 'max-h-0'}`}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <p className="mb-4 text-center">Have more questions?</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary w-full flex items-center justify-center"
                  onClick={(e) => openChat({ source: 'blog_sidebar_cta' }, e)}
                >
                  <MessageCircle size={20} className="mr-2" />
                  Ask the Bot
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
