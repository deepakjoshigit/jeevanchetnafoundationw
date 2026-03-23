
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { INITIATIVES, IMAGES } from '../constants';
import { CheckCircle, ArrowRight, Sparkles, Target } from 'lucide-react';

const Work: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Editorial Style (Bright & Clean) */}
      <section className="relative min-h-[80vh] flex items-center bg-stone-50 overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            src={IMAGES.heroSlider[1]} 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="Work Background" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-orange-600"></div>
              <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px]">Our Mission in Action</span>
            </motion.div>
            
            <div className="overflow-hidden mb-8">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-[8rem] font-serif font-bold text-stone-900 leading-[0.85] tracking-tighter"
              >
                Changing the <br />
                <span className="text-orange-600 italic font-medium">Narrative</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light text-balance"
            >
              Explore our diverse range of projects designed to uplift society through education, health, and environmental sustainability in the heart of the Himalayas.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Initiatives List - Refined Alternating Layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-48">
            {INITIATIVES.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col lg:flex-row gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 w-full group relative">
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt={item.title} 
                      onError={(e) => { e.currentTarget.src = IMAGES.placeholder }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                  {/* Floating Icon Card */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute -bottom-10 -right-10 w-32 h-32 bg-white p-8 rounded-[2.5rem] shadow-2xl flex items-center justify-center border border-stone-100 z-20 hidden md:flex"
                  >
                    {React.cloneElement(item.icon as any, { className: "w-full h-full text-orange-600" })}
                  </motion.div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-orange-600 font-mono font-bold text-sm">0{i + 1}</span>
                    <div className="w-12 h-px bg-stone-200"></div>
                    <span className="text-stone-400 uppercase tracking-[0.3em] text-[10px] font-bold">Initiative</span>
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-950 mb-8 leading-tight">
                    {item.title.split(' ').map((word, idx) => (
                      <span key={idx} className={idx === item.title.split(' ').length - 1 ? "text-orange-600 italic" : ""}>
                        {word}{" "}
                      </span>
                    ))}
                  </h2>
                  
                  <p className="text-stone-600 text-xl leading-relaxed mb-10 font-light">
                    {item.description} Our approach involves direct community interaction, understanding specific needs, and deploying resources efficiently.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {['Sustainable Impact', 'Community Driven', 'Transparent Process', 'Professional Monitoring'].map((point, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-stone-700 font-medium">
                        <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle className="text-orange-600" size={16} />
                        </div>
                        {point}
                      </div>
                    ))}
                  </div>

                  <button className="group inline-flex items-center gap-4 bg-stone-950 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-stone-950/10">
                    Explore Program <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers CTA - Split Layout Style */}
      <section className="py-32 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-stone-100">
            <div className="p-12 md:p-24">
              <div className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-xs mb-8">
                <Sparkles size={16} /> Join the Movement
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-950 mb-8 leading-tight">
                Ready to make a <span className="text-orange-600 italic">Difference?</span>
              </h2>
              <p className="text-stone-500 text-xl mb-12 leading-relaxed font-light">
                Your contribution, whether big or small, helps us continue these vital programs across Uttarakhand.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/donate" className="bg-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl shadow-orange-600/20 hover:bg-orange-700 text-center">
                  Donate to a Cause
                </Link>
                <Link to="/contact" className="bg-stone-950 text-white px-10 py-5 rounded-full font-bold text-lg transition-all hover:bg-stone-800 text-center">
                  Partner with Us
                </Link>
              </div>
            </div>
            <div className="relative h-full min-h-[400px] bg-stone-200">
              <img 
                src={IMAGES.heroSlider[2]} 
                className="absolute inset-0 w-full h-full object-cover" 
                alt="Impact" 
              />
              <div className="absolute inset-0 bg-orange-600/10 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
