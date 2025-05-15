import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ChevronDown, MessageCircle } from 'lucide-react';

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
    {
      question: "Does getting a tattoo hurt?",
      answer: "Pain is subjective and varies from person to person. Most clients describe the sensation as uncomfortable rather than painful, similar to a cat scratch or sunburn. Areas with more nerve endings or thin skin (like ribs, ankles, or inner arms) tend to be more sensitive than others. Our artists work to make the experience as comfortable as possible."
    },
    {
      question: "How should I prepare for my tattoo session?",
      answer: "Get a good night's sleep, eat a proper meal before your appointment, and stay hydrated. Avoid alcohol for at least 24 hours before your session, as it can thin your blood and increase bleeding. Wear comfortable clothing that provides easy access to the area being tattooed. Consider bringing snacks and entertainment for longer sessions."
    },
    {
      question: "How much will my tattoo cost?",
      answer: "Tattoo pricing depends on size, complexity, placement, and the time required to complete the work. Our artists charge by the hour for larger pieces, while smaller tattoos often have a minimum fee. During your consultation, we'll provide a specific quote based on your design. Deposits are required to secure your appointment and are applied to the final cost."
    },
    {
      question: "How do I care for my new tattoo?",
      answer: "After your session, we'll provide detailed aftercare instructions. Generally, you'll need to keep the tattoo clean and moisturized. Avoid swimming, direct sunlight, and heavy exercise for at least two weeks. Don't pick or scratch at scabs as they form. If you have any concerns during healing, contact us immediately. Proper aftercare is crucial for maintaining the quality of your tattoo."
    },
    {
      question: "How long does a tattoo take to heal?",
      answer: "The visible healing process takes about 2-4 weeks, though complete healing beneath the skin takes longer. Initially, your tattoo may appear very bright and then form a scab. As it heals, some flaking is normal. The tattoo may look dull after this initial healing, but it will regain its vibrancy as the deeper layers heal over 1-2 months."
    },
    {
      question: "Can I bring my own design?",
      answer: "Absolutely! We encourage clients to bring references, ideas, or complete designs. Our artists can work directly from your design or make modifications to ensure it translates well as a tattoo. During consultation, we'll discuss any necessary adjustments for size, placement, and longevity of the design."
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 order-2 lg:order-1">
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
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p>
                  Getting your first tattoo is an exciting milestone, but it can also be nerve-wracking if you don't know what to expect. 
                  At Ekspresja Tattoo Studio, we strive to make your first tattoo experience positive and memorable. This comprehensive 
                  guide will walk you through every stage of the process, from planning to aftercare.
                </p>
                
                <h2>Planning Your First Tattoo</h2>
                
                <p>
                  The journey to your first tattoo begins long before you sit in the artist's chair. This planning phase is crucial for 
                  ensuring you end up with body art you'll love for years to come.
                </p>
                
                <h3>Finding Inspiration and Refining Your Idea</h3>
                
                <p>
                  Begin by collecting images that resonate with you. Consider the symbolism and personal meaning behind your tattoo. 
                  Is there a story you want to tell? A memory you want to commemorate? Or do you simply appreciate the aesthetic of a particular style?
                </p>
                
                <p>
                  Our AI consultation tool can help you explore different styles and placements based on your preferences. You can upload 
                  reference images and receive instant feedback on how your idea might translate as a tattoo.
                </p>
                
                <h3>Choosing the Right Artist</h3>
                
                <p>
                  Every tattoo artist has their own specialty and style. Browse through our artists' portfolios to find someone whose work 
                  aligns with your vision. Don't hesitate to schedule consultations with multiple artists before making your decision.
                </p>
                
                <p>
                  During your consultation, pay attention to how the artist communicates. Do they listen to your ideas? Do they offer 
                  constructive suggestions? The right artist will make you feel comfortable and confident in their abilities.
                </p>
                
                <h3>Placement Considerations</h3>
                
                <p>
                  Where you place your tattoo affects not only its visibility but also the pain level, aging process, and potential for distortion. 
                  Consider these factors:
                </p>
                
                <ul>
                  <li>Visibility: How public do you want your tattoo to be? Will it affect your professional life?</li>
                  <li>Pain tolerance: Areas with thin skin or more nerve endings (ribs, inner arms, ankles) tend to be more painful.</li>
                  <li>Aging: Tattoos in areas that stretch or receive sun exposure may fade or distort faster.</li>
                  <li>Canvas size: Some designs require more space to include sufficient detail.</li>
                </ul>
                
                <h2>Preparing for Your Appointment</h2>
                
                <p>
                  Once you've selected your design and artist, it's time to prepare for the big day. Proper preparation can significantly 
                  improve your experience and the quality of your tattoo.
                </p>
                
                <h3>Physical Preparation</h3>
                
                <ul>
                  <li>Get 8 hours of sleep the night before to ensure your body is rested.</li>
                  <li>Eat a substantial meal 1-2 hours before your appointment to maintain your blood sugar levels.</li>
                  <li>Stay hydrated by drinking plenty of water in the 24 hours leading up to your session.</li>
                  <li>Avoid alcohol for at least 24 hours before your appointment, as it thins your blood and can increase bleeding.</li>
                  <li>Moisturize the area being tattooed in the days leading up to your appointment, but don't apply lotion on the day of.</li>
                </ul>
                
                <h3>Mental Preparation</h3>
                
                <p>
                  Managing anxiety before your first tattoo is completely normal. Consider these strategies:
                </p>
                
                <ul>
                  <li>Practice deep breathing or meditation techniques to stay calm.</li>
                  <li>Bring a supportive friend (if the studio allows it).</li>
                  <li>Prepare a playlist or podcast to distract yourself during the session.</li>
                  <li>Remember that discomfort is temporary, but your amazing tattoo is permanent.</li>
                </ul>
                
                <h3>What to Bring</h3>
                
                <ul>
                  <li>ID and payment method (cash, card, or electronic payment depending on studio policy)</li>
                  <li>Comfortable, loose-fitting clothing that provides easy access to the tattoo area</li>
                  <li>Snacks and water for longer sessions</li>
                  <li>Entertainment (headphones, book, etc.)</li>
                  <li>Any final reference images or notes about your design</li>
                </ul>
                
                <h2>During Your Tattoo Session</h2>
                
                <p>
                  The day has arrived! Here's what to expect when you walk into the studio for your appointment.
                </p>
                
                <h3>Arrival and Setup</h3>
                
                <p>
                  When you arrive, you'll complete any remaining paperwork and review the design with your artist. This is your last 
                  opportunity to request minor changes, so don't hesitate to speak up.
                </p>
                
                <p>
                  Your artist will then:
                </p>
                
                <ol>
                  <li>Clean and prepare the area where you'll be tattooed</li>
                  <li>Apply a stencil of your design to guide their work</li>
                  <li>Have you check the placement in a mirror and approve before beginning</li>
                  <li>Set up their station with sterilized equipment and ink</li>
                </ol>
                
                <h3>The Tattooing Process</h3>
                
                <p>
                  As the tattooing begins, you'll feel a sensation similar to a cat scratch or sunburn. The first few minutes are typically 
                  the most intense as your body adjusts to the feeling. Most people find that they settle into the sensation after a while.
                </p>
                
                <p>
                  During your session:
                </p>
                
                <ul>
                  <li>Try to remain still, but let your artist know if you need a break</li>
                  <li>Focus on your breathing and use your prepared distractions</li>
                  <li>Communicate with your artist if you're experiencing significant discomfort</li>
                  <li>Ask questions if you're curious about the process</li>
                </ul>
                
                <p>
                  Sessions can last anywhere from 30 minutes to several hours depending on the complexity of your design. Your artist will 
                  periodically wipe away excess ink and blood to keep the area clean and visible.
                </p>
                
                <h2>Aftercare: Ensuring Your Tattoo Heals Beautifully</h2>
                
                <p>
                  Proper aftercare is essential for preserving the quality of your tattoo and preventing infection. Your artist will provide 
                  specific instructions, but here are the general guidelines:
                </p>
                
                <h3>Immediate Aftercare (First 24-48 Hours)</h3>
                
                <ol>
                  <li>Keep the bandage on for the amount of time recommended by your artist (typically 2-24 hours)</li>
                  <li>When removing the bandage, wash the area gently with mild, fragrance-free soap and lukewarm water</li>
                  <li>Pat dry with a clean paper towel (never rub)</li>
                  <li>Apply a thin layer of the recommended ointment</li>
                  <li>Avoid tight clothing that might stick to the tattoo</li>
                </ol>
                
                <h3>Ongoing Care (2-4 Weeks)</h3>
                
                <ul>
                  <li>Wash the tattoo 2-3 times daily with gentle soap</li>
                  <li>Apply a thin layer of recommended moisturizer after washing</li>
                  <li>Avoid direct sunlight, swimming pools, hot tubs, and saunas</li>
                  <li>Don't pick at scabs or flaking skin</li>
                  <li>Wear loose, clean clothing over the tattooed area</li>
                  <li>Sleep on clean sheets, avoiding direct pressure on the new tattoo</li>
                </ul>
                
                <h3>Long-Term Care</h3>
                
                <p>
                  To keep your tattoo looking vibrant for years to come:
                </p>
                
                <ul>
                  <li>Always apply sunscreen (SPF 30+) when the tattooed area will be exposed to sunlight</li>
                  <li>Keep the skin moisturized year-round</li>
                  <li>Consider touch-ups every few years if you notice fading</li>
                </ul>
                
                <h2>Common Questions and Concerns</h2>
                
                <p>
                  It's natural to have questions about your healing tattoo. Here are some common concerns:
                </p>
                
                <h3>When to Contact Your Artist or a Medical Professional</h3>
                
                <p>
                  While some redness, swelling, and discomfort are normal during healing, contact your artist or a doctor if you experience:
                </p>
                
                <ul>
                  <li>Excessive redness, swelling, or warmth around the tattoo</li>
                  <li>Pus or foul-smelling discharge</li>
                  <li>Fever or chills</li>
                  <li>Severe pain that worsens rather than improves</li>
                  <li>Rash or hives around the tattoo</li>
                </ul>
                
                <h2>Conclusion: Your Tattoo Journey</h2>
                
                <p>
                  Getting your first tattoo is more than just an appointment—it's a personal journey of self-expression. At Ekspresja Tattoo Studio, 
                  we're committed to making that journey positive, safe, and memorable.
                </p>
                
                <p>
                  Remember that every person's experience is unique. By understanding the process, preparing adequately, and following proper 
                  aftercare, you're setting yourself up for tattoo success.
                </p>
                
                <p>
                  Ready to start your tattoo journey? Contact us for a consultation, or try our AI assistant for instant feedback on your tattoo ideas.
                </p>
              </div>
            </motion.div>
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
                  onClick={() => {
                    if (window.voiceflow && window.voiceflow.chat) {
                      window.voiceflow.chat.open();
                    }
                  }}
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