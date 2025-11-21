// src/pages/services/ThankYou.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroImage from '@/assets/neo-brutalism-inspired-building.jpg';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fire Facebook Pixel Lead event
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }

    // Optional: auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/services/property-development');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Thank You!</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Your inquiry has been submitted successfully. We’ll contact you within 24 hours.
          </p>
          <p className="mt-4 text-white/80">
            Redirecting you back to our services page shortly...
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ThankYou;
