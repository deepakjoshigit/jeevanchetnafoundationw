
import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">Get In Touch</h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">We're always here to listen. Reach out to us for collaborations, volunteer work, or general inquiries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details Cards */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <MapPin />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Head Office</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{CONTACT_INFO.headOffice}</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Phone />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <div className="space-y-1">
                {CONTACT_INFO.phones.map((p, i) => (
                  <p key={i} className="text-gray-600 text-sm font-medium">{p}</p>
                ))}
              </div>
            </div>

            <a 
              href={CONTACT_INFO.socials.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:border-green-200 transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <MessageCircle />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp Support</h3>
              <p className="text-gray-600 text-sm font-medium">{CONTACT_INFO.whatsapp}</p>
              <p className="text-green-600 text-xs mt-2 font-bold uppercase tracking-wider">Chat with us</p>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-50">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Send us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="example@mail.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={6} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none" placeholder="Your message here..."></textarea>
              </div>
              <button className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl flex items-center gap-2 group">
                Send Message <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Working Address Detail */}
        <div className="mt-20 p-12 bg-gray-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex-1">
             <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-orange-500">
               <MapPin /> Working Address
             </h3>
             <p className="text-gray-400 text-lg">{CONTACT_INFO.workingAddress}</p>
           </div>
           <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-gray-300">
                 <Mail className="text-orange-500" />
                 <span>{CONTACT_INFO.emails[0]}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                 <Mail className="text-orange-500" />
                 <span>{CONTACT_INFO.emails[1]}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
