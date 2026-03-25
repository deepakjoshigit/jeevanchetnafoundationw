
import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart, Users, Globe } from 'lucide-react';
import { IMAGES } from '../constants';

const Volunteer: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-stone-50 overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            src={IMAGES.heroSlider[2]} 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="Volunteer Background" 
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
              <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px]">Join Our Mission</span>
            </motion.div>
            
            <div className="overflow-hidden mb-8">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-[8rem] font-serif font-bold text-stone-900 leading-[0.85] tracking-tighter"
              >
                Become a <span className="text-orange-600 italic font-medium">Volunteer</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light text-balance"
            >
              Your time and skills can change lives. Join our dedicated team of volunteers and help us make a real impact in the community.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Info Column */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                  <Heart size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-950 mb-3">Why Volunteer?</h3>
                <p className="text-stone-500 leading-relaxed font-light">
                  Volunteering is a powerful way to give back. You'll gain new experiences, meet like-minded people, and most importantly, help those who need it most.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <Users size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-950 mb-3">Who Can Join?</h3>
                <p className="text-stone-500 leading-relaxed font-light">
                  Anyone with a passion for social service is welcome. Whether you're a student, professional, or retiree, there's a place for you in our foundation.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                  <Globe size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-950 mb-3">Areas of Work</h3>
                <ul className="text-stone-500 leading-relaxed font-light space-y-2">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Education & Teaching</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Hunger Relief Drives</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Environmental Plantation</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Digital Literacy Programs</li>
                </ul>
              </motion.div>
            </div>

            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 bg-white p-6 md:p-12 rounded-[4rem] shadow-2xl border border-stone-100"
            >
              <div className="flex items-center gap-3 text-orange-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">
                <Sparkles size={16} /> Registration Form
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-950 mb-10 leading-tight tracking-tighter">
                Fill the <span className="text-orange-600 italic font-medium">Volunteer</span> Form
              </h2>

              <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-stone-50 border border-stone-200 shadow-inner min-h-[800px]">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfQ1qjOxrgyUG0foLYKxWeDXZs1pensBJRtYbuAVH9JDAeVTA/viewform?embedded=true" 
                  width="100%" 
                  height="1200" 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  className="w-full"
                  title="Volunteer Registration Form"
                >
                  Loading…
                </iframe>
              </div>

              <div className="mt-8 text-center">
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfQ1qjOxrgyUG0foLYKxWeDXZs1pensBJRtYbuAVH9JDAeVTA/viewform?usp=sf_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-[0.1em] text-xs transition-colors"
                >
                  Form not loading? Open in new tab <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;
