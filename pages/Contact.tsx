
import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, MessageCircle, Send, Sparkles, Globe, Clock, ArrowRight } from 'lucide-react';
import { CONTACT_INFO, IMAGES } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.heroSlider[0]} 
            className="w-full h-full object-cover opacity-30 scale-110" 
            alt="Contact Background" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 text-orange-500 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-orange-600/30 backdrop-blur-sm"
            >
              <Globe size={16} /> Connect with Us
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8"
            >
              Let's Start a <span className="text-orange-600 italic">Conversation.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-stone-400 leading-relaxed"
            >
              We're always here to listen. Reach out to us for collaborations, volunteer work, or general inquiries.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Contact Details */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100 group hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform">
                  <MapPin size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Head Office</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{CONTACT_INFO.headOffice}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100 group hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                  <Phone size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Call Us</h3>
                <div className="space-y-2">
                  {CONTACT_INFO.phones.map((p, i) => (
                    <p key={i} className="text-gray-600 text-lg font-medium hover:text-orange-600 transition-colors cursor-pointer">{p}</p>
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
                className="block bg-stone-50 p-10 rounded-[3rem] border border-stone-100 hover:bg-emerald-50 hover:border-emerald-100 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <MessageCircle size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">WhatsApp Support</h3>
                <p className="text-gray-600 text-lg font-medium">{CONTACT_INFO.whatsapp}</p>
                <div className="inline-flex items-center gap-2 text-emerald-600 text-sm mt-4 font-bold uppercase tracking-widest">
                  Chat with us <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.a>
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 bg-white p-10 md:p-20 rounded-[4rem] shadow-2xl border border-stone-100"
            >
              <div className="flex items-center gap-3 text-orange-600 font-bold uppercase tracking-widest text-sm mb-8">
                <Sparkles size={16} /> Send a Message
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-12 leading-tight">
                How can we <span className="text-orange-600 italic">Help</span> you?
              </h2>
              
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-8 py-5 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-8 py-5 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium transition-all" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-8 py-5 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium transition-all" 
                    placeholder="Inquiry about volunteering" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Message</label>
                  <textarea 
                    rows={6} 
                    className="w-full px-8 py-5 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none resize-none font-medium transition-all" 
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-2xl flex items-center justify-center gap-3 group"
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
            className="mt-24 p-12 md:p-20 bg-stone-900 rounded-[4rem] text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-bl-full opacity-10"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs mb-6">
                  <Clock size={16} /> Visit Us
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">Working Address</h3>
                <p className="text-stone-400 text-xl leading-relaxed mb-8">{CONTACT_INFO.workingAddress}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-stone-300 font-medium">
                    Mon - Sat: 9:00 AM - 6:00 PM
                  </div>
                  <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-stone-300 font-medium">
                    Sunday: Closed
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-4">Direct Emails</h4>
                {CONTACT_INFO.emails.map((email, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
                      <Mail size={20} />
                    </div>
                    <span className="text-lg text-stone-300 font-medium truncate">{email}</span>
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
