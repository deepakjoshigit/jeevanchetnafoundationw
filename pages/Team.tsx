
import React from 'react';
import { motion } from 'motion/react';
import { Users, Linkedin, Mail, ArrowRight, Award, Heart, Star } from 'lucide-react';
import { TEAM_MEMBERS } from '../constants';

const Team: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="relative py-24 md:py-32 bg-stone-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold uppercase tracking-widest mb-8"
            >
              <Users size={16} /> Our People
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight mb-8"
            >
              The Hearts Behind the <span className="text-orange-600 italic">Foundation</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              A diverse team of passionate individuals committed to creating a lasting impact in Uttarakhand through education, nutrition, and environmental care.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900">Our <span className="text-orange-600 italic">Founders</span></h2>
            <div className="h-px bg-stone-200 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {TEAM_MEMBERS.founders.map((founder, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-stone-50 rounded-[3.5rem] p-12 md:p-16 border border-stone-100 transition-all duration-500 hover:bg-white hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Award size={120} />
                </div>
                <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                  <div className={`w-40 h-40 md:w-56 md:h-56 rounded-[2.5rem] ${founder.color || 'bg-orange-100'} flex items-center justify-center text-7xl shadow-xl group-hover:scale-105 transition-transform duration-700 overflow-hidden border-4 border-white`}>
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
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">{founder.name}</h3>
                    <p className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-6">Founder & Director</p>
                    <p className="text-gray-600 leading-relaxed italic text-lg">"{founder.description}"</p>
                    <div className="mt-8 flex justify-center md:justify-start gap-4">
                      <button className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all">
                        <Linkedin size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all">
                        <Mail size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Grid */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900">Core <span className="text-orange-600 italic">Team</span></h2>
            <div className="h-px bg-stone-200 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.coreTeam.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-24 h-24 bg-stone-50 rounded-[1.5rem] flex items-center justify-center text-4xl mb-8 group-hover:bg-orange-50 transition-colors duration-500 overflow-hidden border border-stone-100">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    member.emoji
                  )}
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-orange-600 font-bold text-xs uppercase tracking-widest mb-6">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">{member.description}</p>
                
                <div className="flex gap-4 pt-6 border-t border-stone-50">
                  <button className="text-stone-300 hover:text-orange-600 transition-colors"><Linkedin size={18} /></button>
                  <button className="text-stone-300 hover:text-orange-600 transition-colors"><Mail size={18} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md text-orange-500 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-white/10"
              >
                <Star size={16} className="fill-current" /> Join the Movement
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                Want to be part of our <span className="text-orange-600 italic">Mission?</span>
              </h2>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                Want to be part of our <span className="text-orange-600 italic">Mission?</span>
              </h2>
              <p className="text-stone-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                We are always looking for passionate volunteers, educators, and professionals to help us expand our reach across Uttarakhand.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-5 rounded-full font-bold text-lg transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-3">
                  Become a Volunteer <ArrowRight size={20} />
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-full font-bold text-lg transition-all hover:scale-105">
                  View Openings
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
