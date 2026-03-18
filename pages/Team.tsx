
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Users, Linkedin, Mail, ArrowRight, Award, Heart, Star } from 'lucide-react';
import { TEAM_MEMBERS, IMAGES } from '../constants';

const Team: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-[70vh] flex items-center bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            src={IMAGES.heroSlider[0]} 
            className="w-full h-full object-cover" 
            alt="Team Background" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-orange-600"></div>
              <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">The Hearts Behind the Foundation</span>
            </motion.div>
            
            <div className="overflow-hidden mb-8">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-[8rem] font-serif font-bold text-white leading-[0.85] tracking-tighter"
              >
                Our <span className="text-orange-600 italic font-medium">People</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-stone-300 max-w-2xl leading-relaxed font-light text-balance"
            >
              A diverse team of passionate individuals committed to creating a lasting impact in Uttarakhand through education, nutrition, and environmental care.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Founders Section - Refined Layout */}
      {TEAM_MEMBERS.founders.length > 0 && (
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 mb-24">
              <h2 className="text-5xl font-serif font-bold text-stone-950">Our <span className="text-orange-600 italic">Founders</span></h2>
              <div className="h-px bg-stone-200 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {TEAM_MEMBERS.founders.map((founder, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-stone-50 rounded-[4rem] p-12 md:p-16 border border-stone-100 transition-all duration-700 hover:bg-white hover:shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                    <Award size={140} />
                  </div>
                  <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                    <div className={`w-48 h-48 md:w-64 md:h-64 rounded-[3rem] ${founder.color || 'bg-orange-50'} flex items-center justify-center text-7xl shadow-2xl group-hover:scale-105 transition-transform duration-1000 overflow-hidden border-8 border-white`}>
                      {founder.image ? (
                        <img 
                          src={founder.image} 
                          alt={founder.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        founder.emoji
                      )}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-4xl font-serif font-bold text-stone-950 mb-3">{founder.name}</h3>
                      <p className="text-orange-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Founder & Director</p>
                      <p className="text-stone-500 leading-relaxed italic text-xl font-light">"{founder.description}"</p>
                      <div className="mt-10 flex justify-center md:justify-start gap-5">
                        <button className="w-12 h-12 rounded-full bg-white border border-stone-100 flex items-center justify-center text-stone-400 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm">
                          <Linkedin size={20} />
                        </button>
                        <button className="w-12 h-12 rounded-full bg-white border border-stone-100 flex items-center justify-center text-stone-400 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm">
                          <Mail size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Team Grid - Refined Cards */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-24">
            <h2 className="text-5xl font-serif font-bold text-stone-950">Core <span className="text-orange-600 italic">Team</span></h2>
            <div className="h-px bg-stone-200 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {TEAM_MEMBERS.coreTeam.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group bg-white p-10 rounded-[3.5rem] border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                <div className="w-28 h-28 bg-stone-50 rounded-[2rem] flex items-center justify-center text-5xl mb-10 group-hover:bg-orange-50 transition-colors duration-700 overflow-hidden border border-stone-100 relative">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="relative z-10">{member.emoji}</span>
                  )}
                  <div className="absolute inset-0 bg-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
                <h3 className="text-3xl font-serif font-bold text-stone-950 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">{member.role}</p>
                <p className="text-stone-500 text-base leading-relaxed mb-10 font-light">{member.description}</p>
                
                <div className="flex gap-4 pt-8 border-t border-stone-50">
                  <button className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 hover:bg-orange-600 hover:text-white transition-all duration-500"><Linkedin size={16} /></button>
                  <button className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 hover:bg-orange-600 hover:text-white transition-all duration-500"><Mail size={16} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA - Editorial Style */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-950 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600 rounded-full blur-[150px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-md text-orange-500 rounded-full text-xs font-bold uppercase tracking-widest mb-10 border border-white/10"
              >
                <Star size={18} className="fill-current" /> Join the Movement
              </motion.div>
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-10 leading-tight tracking-tighter">
                Want to be part of our <br />
                <span className="text-orange-600 italic font-medium">Mission?</span>
              </h2>
              <p className="text-stone-400 text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-light">
                We are always looking for passionate volunteers, educators, and professionals to help us expand our reach across Uttarakhand.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Link to="/contact" className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-6 rounded-full font-bold text-lg transition-all shadow-2xl shadow-orange-600/20 flex items-center justify-center gap-3">
                  Become a Volunteer <ArrowRight size={20} />
                </Link>
                <Link to="/work" className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 px-12 py-6 rounded-full font-bold text-lg transition-all">
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
