
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Target, Heart, Eye, Award, Users, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { DIRECTORS, IMAGES } from '../constants';

const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Editorial Style (Bright & Clean) */}
      <section className="relative min-h-[80vh] flex items-center bg-stone-50 overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            src={IMAGES.about} 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="About Background" 
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
              <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px]">Our Legacy & Future</span>
            </motion.div>
            
            <div className="overflow-hidden mb-8">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-[8rem] font-serif font-bold text-stone-900 leading-[0.85] tracking-tighter"
              >
                Awakening <br />
                <span className="text-orange-600 italic font-medium">Potential</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light text-balance"
            >
              Jeevan Chetna Foundation is more than an NGO; it's a movement dedicated to social welfare, digital literacy, and humanitarian causes in the heart of Uttarakhand.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section - Refined Layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
                <img 
                  src={IMAGES.about} 
                  className="w-full h-full object-cover" 
                  alt="Our Story" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-orange-600 rounded-[3.5rem] p-12 text-white flex flex-col justify-center shadow-2xl hidden md:flex">
                <div className="text-6xl font-bold mb-2 tracking-tighter">10+</div>
                <div className="text-orange-100 font-bold uppercase tracking-widest text-xs leading-relaxed">Ongoing Projects Across Uttarakhand</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-orange-600 font-mono font-bold text-sm">01</span>
                <div className="w-12 h-px bg-stone-200"></div>
                <span className="text-stone-400 uppercase tracking-[0.3em] text-[10px] font-bold">The Awakening</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-950 mb-8 leading-tight">
                Where Compassion Meets <span className="text-orange-600 italic">Action</span>
              </h2>
              
              <div className="space-y-8 text-stone-600 text-xl leading-relaxed font-light">
                <p>
                  Founded in Haldwani, Nainital, Jeevan Chetna Foundation (Life Awareness) was born from a simple yet powerful realization: that basic needs and digital literacy are the twin engines of modern empowerment.
                </p>
                <p>
                  We operate as a Section 8 Company, ensuring the highest standards of transparency and accountability. Our work spans from the remote corners of the Himalayas to the bustling streets of Haldwani.
                </p>
                
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-orange-600 shrink-0 border border-stone-100">
                      <ShieldCheck size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-950 text-lg">Registered</h4>
                      <p className="text-sm text-stone-500">MCA Section 8 Company</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-orange-600 shrink-0 border border-stone-100">
                      <Globe size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-950 text-lg">Grassroots</h4>
                      <p className="text-sm text-stone-500">Deep Community Roots</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values - Bento Grid Style */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Our Mission', 
                text: 'To provide quality education, eliminate hunger, and promote environmental sustainability through community engagement.', 
                icon: <Target size={32} />, 
                color: 'bg-stone-950 text-white',
                delay: 0
              },
              { 
                title: 'Our Vision', 
                text: 'A world where every child has access to digital tools and knowledge, and no person goes to sleep hungry.', 
                icon: <Eye size={32} />, 
                color: 'bg-white text-stone-950',
                delay: 0.1
              },
              { 
                title: 'Our Values', 
                text: 'Transparency, empathy, commitment, and integrity in every action we take for the community.', 
                icon: <Heart size={32} />, 
                color: 'bg-orange-600 text-white',
                delay: 0.2
              },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.8 }}
                className={`${item.color} p-12 rounded-[3.5rem] shadow-sm border border-stone-200/50 flex flex-col justify-between h-full hover:shadow-2xl transition-all duration-500 group`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-12 transition-transform duration-500 group-hover:scale-110 ${item.color === 'bg-white text-stone-950' ? 'bg-stone-50 text-orange-600' : 'bg-white/10 text-white'}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-4xl font-serif font-bold mb-6">{item.title}</h3>
                  <p className={`${item.color === 'bg-white text-stone-950' ? 'text-stone-500' : 'text-stone-200'} text-lg leading-relaxed font-light`}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section - Refined Cards */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-stone-200"></div>
              <span className="text-orange-600 font-mono font-bold text-sm uppercase tracking-widest">Leadership</span>
              <div className="w-12 h-px bg-stone-200"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-950 mb-8">Foundation <span className="text-orange-600 italic">Directors</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-xl font-light">
              Guided by visionary leaders committed to building a better Uttarakhand through sustainable social change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {DIRECTORS.map((director, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-stone-50 rounded-[4rem] p-12 text-center group transition-all duration-700 border border-stone-100 hover:bg-white hover:shadow-2xl relative overflow-hidden"
              >
                <div className="w-56 h-56 mx-auto mb-10 relative">
                  <div className="absolute inset-0 bg-orange-600 rounded-full scale-110 opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
                  <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10">
                    {director.image ? (
                      <img 
                        src={director.image} 
                        alt={director.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <Users size={80} />
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-4xl font-serif font-bold text-stone-950 mb-3">{director.name}</h3>
                <p className="text-orange-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Founder & Director</p>
                <div className="inline-flex items-center gap-3 px-8 py-3 bg-white rounded-full text-stone-500 text-xs font-bold shadow-sm border border-stone-100">
                  <ShieldCheck size={14} className="text-orange-600" /> DIN: {director.din}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Editorial Style (Bright) */}
      <section className="py-32 bg-stone-50 relative overflow-hidden border-t border-stone-200">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-stone-950 mb-10 leading-tight tracking-tighter">
            Join Our Journey of <br />
            <span className="text-orange-600 italic font-medium">Awakening</span>
          </h2>
          <p className="text-stone-500 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
            Whether through volunteering, donating, or spreading the word, your support makes a real difference in Uttarakhand.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/donate" className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-6 rounded-full font-bold text-lg transition-all shadow-2xl shadow-orange-600/20 flex items-center gap-3 justify-center">
              Support Our Mission <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="bg-white hover:bg-stone-50 text-stone-950 border border-stone-200 px-12 py-6 rounded-full font-bold text-lg transition-all justify-center shadow-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
