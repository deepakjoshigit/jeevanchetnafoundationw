
import React from 'react';
import { motion } from 'motion/react';
import { Target, Heart, Eye, Award, Users, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { DIRECTORS, IMAGES } from '../constants';

const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.about} 
            className="w-full h-full object-cover opacity-30 scale-105" 
            alt="About Background" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900 to-stone-900"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 text-orange-500 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-orange-600/30 backdrop-blur-sm"
            >
              <Award size={16} /> Our Legacy
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8"
            >
              Awakening <span className="text-orange-600 italic">Potential</span>, Transforming Lives.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-stone-400 leading-relaxed"
            >
              Jeevan Chetna Foundation is more than an NGO; it's a movement dedicated to social welfare, digital literacy, and humanitarian causes in the heart of Uttarakhand.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={IMAGES.about} 
                  className="w-full h-full object-cover" 
                  alt="Our Story" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-600 rounded-[3rem] p-10 text-white flex flex-col justify-center shadow-2xl hidden md:flex">
                <div className="text-5xl font-bold mb-2">10+</div>
                <div className="text-orange-100 font-medium uppercase tracking-widest text-sm">Ongoing Projects Across Uttarakhand</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4 block">The Awakening</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                Where Compassion Meets <span className="text-orange-600 italic">Action</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in Haldwani, Nainital, Jeevan Chetna Foundation (Life Awareness) was born from a simple yet powerful realization: that basic needs and digital literacy are the twin engines of modern empowerment.
                </p>
                <p>
                  We operate as a Section 8 Company, ensuring the highest standards of transparency and accountability. Our work spans from the remote corners of the Himalayas to the bustling streets of Haldwani, bringing hope where it's needed most.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Registered</h4>
                      <p className="text-sm text-gray-500">MCA Section 8 Company</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Grassroots</h4>
                      <p className="text-sm text-gray-500">Deep Community Roots</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values - Bento Grid */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Our Mission', 
                text: 'To provide quality education, eliminate hunger, and promote environmental sustainability through community engagement.', 
                icon: <Target size={32} />, 
                color: 'bg-orange-600 text-white',
                delay: 0
              },
              { 
                title: 'Our Vision', 
                text: 'A world where every child has access to digital tools and knowledge, and no person goes to sleep hungry.', 
                icon: <Eye size={32} />, 
                color: 'bg-white text-gray-900',
                delay: 0.1
              },
              { 
                title: 'Our Values', 
                text: 'Transparency, empathy, commitment, and integrity in every action we take for the community.', 
                icon: <Heart size={32} />, 
                color: 'bg-white text-gray-900',
                delay: 0.2
              },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
                className={`${item.color} p-12 rounded-[3rem] shadow-sm border border-stone-200/50 flex flex-col justify-between h-full hover:shadow-xl transition-all duration-500`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${item.color === 'bg-white text-gray-900' ? 'bg-stone-50 text-orange-600' : 'bg-white/20 text-white'}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold mb-6">{item.title}</h3>
                  <p className={`${item.color === 'bg-white text-gray-900' ? 'text-gray-600' : 'text-orange-100'} text-lg leading-relaxed`}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4 block">Leadership</span>
            <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">Foundation <span className="text-orange-600 italic">Directors</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">
              Guided by visionary leaders committed to building a better Uttarakhand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {DIRECTORS.map((director, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-stone-50 rounded-[3.5rem] p-12 text-center group transition-all duration-500 border border-stone-100 hover:bg-white hover:shadow-2xl"
              >
                <div className="w-48 h-48 mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-orange-600 rounded-full scale-110 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                    {director.image ? (
                      <img 
                        src={director.image} 
                        alt={director.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <Users size={64} />
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">{director.name}</h3>
                <p className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-6">Founder & Director</p>
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full text-gray-500 text-sm font-bold shadow-sm border border-stone-100">
                  DIN: {director.din}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
            Join Our Journey of <span className="text-orange-600 italic">Awakening</span>
          </h2>
          <p className="text-stone-400 text-xl max-w-2xl mx-auto mb-12">
            Whether through volunteering, donating, or spreading the word, your support makes a real difference in Uttarakhand.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl hover:scale-105">
              Support Our Mission
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
