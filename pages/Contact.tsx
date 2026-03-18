
import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, MessageCircle, Send, Sparkles, Globe, Clock, ArrowRight } from 'lucide-react';
import { CONTACT_INFO, IMAGES } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-[60vh] flex items-center bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            src={IMAGES.heroSlider[0]} 
            className="w-full h-full object-cover" 
            alt="Contact Background" 
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
              <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">Connect with Us</span>
            </motion.div>
            
            <div className="overflow-hidden mb-8">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-[8rem] font-serif font-bold text-white leading-[0.85] tracking-tighter"
              >
                Let's <span className="text-orange-600 italic font-medium">Talk</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-stone-300 max-w-2xl leading-relaxed font-light text-balance"
            >
              We're always here to listen. Reach out to us for collaborations, volunteer work, or general inquiries.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Content - Refined Layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            {/* Contact Details */}
            <div className="lg:col-span-4 space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-stone-50 p-12 rounded-[3.5rem] border border-stone-100 group hover:bg-white hover:shadow-2xl transition-all duration-700"
              >
                <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 mb-10 group-hover:scale-110 transition-transform duration-700">
                  <MapPin size={32} />
                </div>
                <h3 className="text-3xl font-serif font-bold text-stone-950 mb-4">Head Office</h3>
                <p className="text-stone-500 leading-relaxed text-xl font-light">{CONTACT_INFO.headOffice}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-stone-50 p-12 rounded-[3.5rem] border border-stone-100 group hover:bg-white hover:shadow-2xl transition-all duration-700"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 mb-10 group-hover:scale-110 transition-transform duration-700">
                  <Phone size={32} />
                </div>
                <h3 className="text-3xl font-serif font-bold text-stone-950 mb-4">Call Us</h3>
                <div className="space-y-3">
                  {CONTACT_INFO.phones.map((p, i) => (
                    <p key={i} className="text-stone-500 text-xl font-light hover:text-orange-600 transition-colors cursor-pointer">{p}</p>
                  ))}
                </div>
              </motion.div>

              <motion.a 
                href={CONTACT_INFO.socials.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="block bg-stone-50 p-12 rounded-[3.5rem] border border-stone-100 hover:bg-emerald-50 hover:border-emerald-100 hover:shadow-2xl transition-all duration-700 group"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mb-10 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-700">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-3xl font-serif font-bold text-stone-950 mb-4">WhatsApp</h3>
                <p className="text-stone-500 text-xl font-light">{CONTACT_INFO.whatsapp}</p>
                <div className="inline-flex items-center gap-3 text-emerald-600 text-[10px] mt-8 font-bold uppercase tracking-[0.2em]">
                  Chat with us <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.a>
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 bg-white p-12 md:p-24 rounded-[4rem] shadow-2xl border border-stone-100"
            >
              <div className="flex items-center gap-3 text-orange-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-10">
                <Sparkles size={16} /> Send a Message
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-950 mb-16 leading-tight tracking-tighter">
                How can we <br />
                <span className="text-orange-600 italic font-medium">Help</span> you?
              </h2>
              
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-6">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-10 py-6 bg-stone-50 border border-stone-100 rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-6">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-10 py-6 bg-stone-50 border border-stone-100 rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium transition-all" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-6">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-10 py-6 bg-stone-50 border border-stone-100 rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium transition-all" 
                    placeholder="Inquiry about volunteering" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-6">Message</label>
                  <textarea 
                    rows={6} 
                    className="w-full px-10 py-6 bg-stone-50 border border-stone-100 rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none resize-none font-medium transition-all" 
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto bg-orange-600 text-white px-16 py-6 rounded-3xl font-bold text-lg hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/20 flex items-center justify-center gap-4 group"
                >
                  Send Message <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Working Address & Additional Info */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 p-12 md:p-24 bg-stone-950 rounded-[4rem] text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[150px] opacity-10 translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-3 text-orange-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">
                  <Clock size={18} /> Visit Us
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8 tracking-tighter">Working Address</h3>
                <p className="text-stone-400 text-2xl leading-relaxed mb-12 font-light">{CONTACT_INFO.workingAddress}</p>
                <div className="flex flex-wrap gap-6">
                  <div className="px-8 py-4 bg-white/5 rounded-full border border-white/10 text-stone-300 font-medium text-sm">
                    Mon - Sat: 9:00 AM - 6:00 PM
                  </div>
                  <div className="px-8 py-4 bg-white/5 rounded-full border border-white/10 text-stone-300 font-medium text-sm">
                    Sunday: Closed
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <h4 className="text-2xl font-serif font-bold text-white mb-8">Direct Emails</h4>
                {CONTACT_INFO.emails.map((email, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-8 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 group cursor-pointer transition-all duration-500"
                  >
                    <div className="w-14 h-14 bg-orange-600/20 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                      <Mail size={24} />
                    </div>
                    <span className="text-xl text-stone-300 font-light truncate">{email}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
