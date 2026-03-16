
import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6">Get In Touch</h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">We're always here to listen. Reach out to us for collaborations, volunteer work, or general inquiries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Details Cards */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-gray-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl md:rounded-2xl flex items-center justify-center text-orange-600 mb-4 md:mb-6">
                <MapPin size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Head Office</h3>
              <p className="text-gray-600 leading-relaxed text-xs md:text-sm">{CONTACT_INFO.headOffice}</p>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 mb-4 md:mb-6">
                <Phone size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <div className="space-y-1">
                {CONTACT_INFO.phones.map((p, i) => (
                   <p key={i} className="text-gray-600 text-xs md:text-sm font-medium">{p}</p>
                ))}
              </div>
            </div>

            <a 
              href={CONTACT_INFO.socials.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-gray-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 hover:border-green-200 transition-all group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl md:rounded-2xl flex items-center justify-center text-green-600 mb-4 md:mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <MessageCircle size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">WhatsApp Support</h3>
              <p className="text-gray-600 text-xs md:text-sm font-medium">{CONTACT_INFO.whatsapp}</p>
              <p className="text-green-600 text-[10px] md:text-xs mt-2 font-bold uppercase tracking-wider">Chat with us</p>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gray-50">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6 md:mb-8">Send us a Message</h2>
            <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-5 md:px-6 py-3 md:py-4 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm md:text-base" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-5 md:px-6 py-3 md:py-4 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm md:text-base" placeholder="example@mail.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Subject</label>
                <input type="text" className="w-full px-5 md:px-6 py-3 md:py-4 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm md:text-base" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={5} className="w-full px-5 md:px-6 py-3 md:py-4 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none text-sm md:text-base" placeholder="Your message here..."></textarea>
              </div>
              <button className="w-full md:w-auto bg-orange-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-orange-700 transition-all shadow-xl flex items-center justify-center gap-2 group">
                Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Working Address Detail */}
        <div className="mt-12 md:mt-20 p-8 md:p-12 bg-gray-900 rounded-[2rem] md:rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex-1 text-center md:text-left">
             <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2 text-orange-500">
               <MapPin size={24} /> Working Address
             </h3>
             <p className="text-gray-400 text-base md:text-lg">{CONTACT_INFO.workingAddress}</p>
           </div>
           <div className="flex-1 flex flex-col gap-3 md:gap-4 w-full md:w-auto">
              <div className="flex items-center gap-3 md:gap-4 text-gray-300 text-sm md:text-base">
                 <Mail className="text-orange-500 shrink-0" size={20} />
                 <span className="truncate">{CONTACT_INFO.emails[0]}</span>
              </div>
              <div className="flex items-center gap-3 md:gap-4 text-gray-300 text-sm md:text-base">
                 <Mail className="text-orange-500 shrink-0" size={20} />
                 <span className="truncate">{CONTACT_INFO.emails[1]}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
