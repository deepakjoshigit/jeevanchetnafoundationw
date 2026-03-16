
import React from 'react';
import { Users, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { TEAM_MEMBERS } from '../constants';

const Team: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our People</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Meet the Hearts Behind the Foundation</h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            A diverse team of passionate individuals committed to creating a lasting impact in our community.
          </p>
        </div>

        {/* Founders Section */}
        <section className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="h-px bg-orange-200 flex-grow"></div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 px-2 md:px-4">Our Founders</h2>
            <div className="h-px bg-orange-200 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {TEAM_MEMBERS.founders.map((founder, i) => (
              <div key={i} className="group relative bg-gray-50 rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 border border-gray-100 hover:border-orange-200 hover:bg-white transition-all shadow-sm hover:shadow-2xl">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                  <div className={`w-28 h-28 md:w-40 md:h-40 rounded-full ${founder.color} flex items-center justify-center text-5xl md:text-7xl shadow-inner group-hover:scale-110 transition-transform duration-500 overflow-hidden`}>
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
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{founder.name}</h3>
                    <p className="text-orange-600 font-bold uppercase tracking-widest text-[10px] md:text-sm mb-4 md:mb-6">{founder.role}</p>
                    <p className="text-gray-600 leading-relaxed italic text-sm md:text-base">"{founder.description}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Team Grid */}
        <section>
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px bg-green-200 flex-grow"></div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 px-4">Core Team Members</h2>
            <div className="h-px bg-green-200 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.coreTeam.map((member, i) => (
              <div key={i} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-orange-50 transition-colors overflow-hidden">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    member.emoji
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-700 font-bold text-[10px] uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
                
                <div className="mt-8 pt-6 border-t border-gray-50 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-orange-600 transition-colors"><Linkedin size={18} /></button>
                  <button className="text-gray-400 hover:text-orange-600 transition-colors"><Mail size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Us CTA */}
        <div className="mt-32 bg-gray-900 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">Want to Join Our Mission?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              We are always looking for passionate volunteers and professionals to help us expand our reach in Haldwani and beyond.
            </p>
            <button className="bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all flex items-center gap-2 mx-auto shadow-xl">
              Become a Volunteer <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
