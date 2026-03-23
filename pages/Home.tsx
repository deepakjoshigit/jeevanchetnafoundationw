
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight, Users, Smile, ChevronLeft, ChevronRight, Award, Facebook, Quote } from 'lucide-react';
import { INITIATIVES, IMAGES, DONORS, IMPACT_STORIES } from '../constants';

const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    
    let totalMiliseconds = 2000;
    let incrementTime = (totalMiliseconds / end) > 10 ? (totalMiliseconds / end) : 10;
    
    let timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <>{count.toLocaleString()}{suffix}</>;
};

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
    <div className="flex flex-col bg-white">
      {/* Hero Section - Clean & Bright */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center bg-white overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={IMAGES.heroSlider[currentSlide]}
                className="w-full h-full object-cover"
                alt={`Slide ${currentSlide + 1}`}
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = IMAGES.placeholder }}
              />
              {/* Subtle light overlay instead of heavy black */}
              <div className="absolute inset-0 bg-white/10"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Navigation */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-8">
          <button 
            onClick={prevSlide} 
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-900 hover:bg-orange-600 hover:text-white transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2">
            {IMAGES.heroSlider.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === i ? 'w-8 bg-orange-600' : 'w-2 bg-stone-300'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide} 
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-900 hover:bg-orange-600 hover:text-white transition-all shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Stats Section - Clean & Minimal */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Impact</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">Making a Real Difference</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Lives Impacted', value: 15000, suffix: '+', icon: <Users className="text-orange-600" /> },
              { label: 'Villages Served', value: 50, suffix: '+', icon: <Award className="text-orange-600" /> },
              { label: 'Active Volunteers', value: 200, suffix: '+', icon: <Heart className="text-orange-600" /> },
              { label: 'Years of Service', value: 10, suffix: '+', icon: <Smile className="text-orange-600" /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <p className="text-4xl font-bold text-stone-900 mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-stone-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section - Elegant Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Initiatives</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 leading-tight">Empowering communities through dedicated action.</h2>
            </div>
            <Link to="/work" className="text-orange-600 font-bold flex items-center gap-2 hover:gap-4 transition-all group">
              View All Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {INITIATIVES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-stone-50 rounded-[2.5rem] overflow-hidden border border-stone-100 hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = IMAGES.placeholder }}
                  />
                </div>
                <div className="p-8">
                  <div className="mb-6 p-3 bg-white rounded-2xl w-fit shadow-sm">{item.icon}</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donors Section - Clean List */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Supporters</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900">Kind Hearts Behind Our Mission</h2>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-stone-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DONORS.slice(0, 9).map((donor, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-orange-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                      {donor.name[0]}
                    </div>
                    <span className="font-bold text-stone-900">{donor.name}</span>
                  </div>
                  <span className="text-orange-600 font-mono font-bold">₹{donor.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/donors" className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg">
                View All Donors <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories - Editorial Style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900">Impact Stories</h2>
            <Link to="/impact-stories" className="text-stone-500 hover:text-orange-600 transition-colors font-bold uppercase tracking-widest text-xs">Read More</Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {IMPACT_STORIES.map((story, i) => (
              <Link key={i} to={`/impact-stories/${story.id}`} className="group">
                <div className="relative aspect-video rounded-[3rem] overflow-hidden mb-8">
                  <img 
                    src={story.images[0]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={story.title}
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-stone-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Success Story</span>
                  </div>
                </div>
                <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4 group-hover:text-orange-600 transition-colors">{story.title}</h3>
                <p className="text-stone-500 leading-relaxed line-clamp-2">{story.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean & Inviting */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-600 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Your support can change a life today.</h2>
              <p className="text-orange-100 text-lg mb-12 leading-relaxed">Join us in our mission to create a more equitable and sustainable world. Every contribution counts.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/donate" className="bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-stone-100 transition-all shadow-xl flex items-center justify-center gap-2">
                  Donate Now <Heart className="fill-orange-600" />
                </Link>
                <Link to="/contact" className="bg-orange-700 text-white border border-orange-500 px-10 py-5 rounded-full font-bold text-lg hover:bg-orange-800 transition-all flex items-center justify-center gap-2">
                  Contact Us <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
