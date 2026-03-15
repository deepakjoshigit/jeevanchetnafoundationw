
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShieldCheck, Users, Globe, Smile, ChevronLeft, ChevronRight } from 'lucide-react';
import { INITIATIVES, IMAGES } from '../constants';

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
      <section className="relative h-[85vh] overflow-hidden">
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
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
        >
          <ChevronRight size={32} />
        </button>

        {/* Buttons at Bottom */}
        <div className="absolute bottom-12 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/donate"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95"
              >
                <Heart className="fill-current" /> Support Our Mission
              </Link>
              <Link
                to="/work"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Learn More <ArrowRight />
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
