
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShieldCheck, Users, Globe, Smile, ChevronLeft, ChevronRight, Award, Facebook } from 'lucide-react';
import { INITIATIVES, IMAGES, DONORS } from '../constants';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.heroSlider.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % IMAGES.heroSlider.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + IMAGES.heroSlider.length) % IMAGES.heroSlider.length);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        {/* Slider Images */}
        <div className="absolute inset-0">
          {IMAGES.heroSlider.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                className="w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = IMAGES.placeholder }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
        >
          <ChevronLeft size={24} className="md:w-8 md:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
        >
          <ChevronRight size={24} className="md:w-8 md:h-8" />
        </button>

        {/* Buttons at Bottom */}
        <div className="absolute bottom-12 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/donate"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95"
              >
                <Heart className="w-5 h-5 md:w-6 md:h-6 fill-current" /> Donate Now
              </Link>
              <Link
                to="/work"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Learn More <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {IMAGES.heroSlider.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide ? 'bg-orange-500 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Floating Mobile Donate Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Link
          to="/donate"
          className="bg-orange-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl animate-bounce hover:animate-none active:scale-90 transition-transform"
        >
          <Heart size={24} className="fill-white" />
        </Link>
      </div>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Children Educated', value: '500+', icon: <Users className="text-orange-500" /> },
              { label: 'Meals Served', value: '10k+', icon: <Globe className="text-blue-500" /> },
              { label: 'Trees Planted', value: '2k+', icon: <ShieldCheck className="text-green-500" /> },
              { label: 'Happy Lives', value: '1000+', icon: <Smile className="text-yellow-500" /> },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Core Initiatives</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We focus on the most critical pillars of society to create a holistic and sustainable impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {INITIATIVES.map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 h-[450px]">
                <img 
                  src={item.image} 
                  className="w-full h-1/2 object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={item.title} 
                  onError={(e) => { e.currentTarget.src = IMAGES.placeholder }}
                />
                <div className="p-8">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-widest">
                Moments of Joy
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                Voices of <span className="text-orange-600">Impact</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Watch this heart-warming moment of a young girl at our NGO, expressing her joy and learning through a beautiful poem. This is why we do what we do.
              </p>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0">
                  <Smile size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Empowering Through Art</h4>
                  <p className="text-sm text-gray-500">A girl reading and singing a poem in our NGO.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/wAgrUzgcmQQ?si=aJIuwUOiR-beztFM" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Donors Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              <Award size={16} /> Wall of Kindness
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Generous Donors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We are deeply grateful to these individuals and organizations whose support fuels our mission.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DONORS.map((donor, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-white transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm group-hover:scale-110 transition-transform">
                    <Heart size={24} className={donor.amount >= 5000 ? "fill-orange-600" : ""} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{donor.name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Contributor</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-orange-600">₹{donor.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-stone-900 rounded-[2.5rem] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 rounded-bl-full opacity-20"></div>
            <h3 className="text-2xl font-serif font-bold mb-4">Be the Change Today</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Your contribution, no matter the size, helps us provide education, food, and a better future for those in need.
            </p>
            <Link to="/donate" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">
              Join the Wall of Kindness <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Updates Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              <Facebook size={16} /> Latest Updates
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Connect With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Follow our journey and stay updated with our latest activities on social media.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden max-w-full">
              <iframe 
                src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fjeevanchetnafoundation%2Fposts%2Fpfbid02vJAHeGLd1G7MKqxVaw9PgAnvS9aVq2v9hDST61Uxhj8C33fUMxnSDJwzxfUmo9vfl&show_text=true&width=500" 
                width="500" 
                height="500" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="max-w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold mb-2">Ready to change a life?</h2>
            <p className="text-orange-100">Your small contribution can create a massive impact.</p>
          </div>
          <Link to="/donate" className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Give Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
