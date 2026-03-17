
import React from 'react';
import { motion } from 'motion/react';
import { INITIATIVES, IMAGES } from '../constants';
import { CheckCircle, ArrowRight, Sparkles, Target } from 'lucide-react';

const Work: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent z-10"></div>
          <img 
            src={IMAGES.heroSlider[1]} 
            className="w-full h-full object-cover opacity-40 scale-110" 
            alt="Work Background" 
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 text-orange-500 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-orange-600/30 backdrop-blur-sm"
            >
              <Target size={16} /> Our Impact
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8"
            >
              Changing the <span className="text-orange-600 italic">Narrative</span> of Uttarakhand.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-stone-400 leading-relaxed"
            >
              Explore our diverse range of projects designed to uplift society through education, health, and environmental sustainability.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Initiatives List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32 md:space-y-48">
            {INITIATIVES.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row gap-16 md:gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 w-full group">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-orange-600/5 rounded-[3.5rem] scale-95 group-hover:scale-100 transition-transform duration-700"></div>
                    <div className="relative aspect-[4/3] md:aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                      <img 
                        src={item.image} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        alt={item.title} 
                        onError={(e) => { e.currentTarget.src = IMAGES.placeholder }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-20 h-20 md:w-24 md:h-24 bg-white p-5 md:p-6 rounded-[2rem] shadow-2xl flex items-center justify-center border border-stone-100"
                    >
                      {React.cloneElement(item.icon as any, { className: "w-full h-full text-orange-600" })}
                    </motion.div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-sm mb-6">
                    <Sparkles size={16} /> Initiative 0{i + 1}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                    {item.title.split(' ').map((word, idx) => (
                      <span key={idx} className={idx === item.title.split(' ').length - 1 ? "text-orange-600 italic" : ""}>
                        {word}{" "}
                      </span>
                    ))}
                  </h2>
                  <p className="text-gray-600 text-xl leading-relaxed mb-10">
                    {item.description} Our approach involves direct community interaction, understanding specific needs, and deploying resources efficiently. We don't just provide services; we build capacity for long-term self-reliance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {['Sustainable Impact', 'Community Driven', 'Transparent Process', 'Professional Monitoring'].map((point, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-700 font-bold">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle className="text-orange-600" size={14} />
                        </div>
                        {point}
                      </div>
                    ))}
                  </div>
                  <button className="group inline-flex items-center gap-3 text-orange-600 font-bold text-lg hover:gap-5 transition-all">
                    Learn more about this program <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers CTA */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                Ready to make a <span className="text-stone-900 italic">Difference?</span>
              </h2>
              <p className="text-orange-100 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Your contribution, whether big or small, helps us continue these vital programs across Uttarakhand.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-orange-600 px-12 py-5 rounded-full font-bold text-lg transition-all shadow-2xl hover:scale-105">
                  Donate to a Cause
                </button>
                <button className="bg-orange-700/30 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-full font-bold text-lg transition-all hover:scale-105">
                  Partner with Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
