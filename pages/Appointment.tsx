
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { FOUNDATION_NAME, CONTACT_INFO } from '../constants';

const Appointment: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    purpose: 'General Inquiry',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log('Appointment Data:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-20 min-h-[70vh] flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-lg mx-4 border border-gray-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Appointment Requested!</h2>
          <p className="text-gray-600 mb-8">
            Thank you, {formData.name}. Your appointment request for {formData.date} at {formData.time} has been received. Our team will contact you shortly to confirm.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg"
          >
            Book Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 md:space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
                Get in Touch
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                Schedule an <span className="text-orange-600">Appointment</span> with Us
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
                Whether you want to volunteer, discuss a partnership, or need support, we're here to listen. Book a slot to visit our office or have a virtual meeting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-blue-600">
                  <Calendar size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Flexible Dates</h4>
                <p className="text-xs md:text-sm text-gray-500">Pick a day that works best for your schedule.</p>
              </div>
              <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-green-600">
                  <Clock size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Timely Response</h4>
                <p className="text-xs md:text-sm text-gray-500">We confirm all requests within 24 hours.</p>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-orange-600 rounded-bl-full opacity-20"></div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Office Hours</h3>
              <ul className="space-y-2 md:space-y-3 text-gray-400 text-xs md:text-sm">
                <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span>Monday - Friday</span>
                  <span className="text-white font-medium">10:00 AM - 06:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span>Saturday</span>
                  <span className="text-white font-medium">10:00 AM - 02:00 PM</span>
                </li>
                <li className="flex justify-between text-orange-500">
                  <span>Sunday</span>
                  <span className="font-bold uppercase">Closed</span>
                </li>
              </ul>
              <p className="mt-4 md:mt-6 text-[10px] md:text-xs text-gray-500 italic">
                * For emergency support, please call us directly at {CONTACT_INFO.phones[0]}
              </p>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gray-100 relative"
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <User size={14} className="text-orange-500 md:w-4 md:h-4" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={14} className="text-orange-500 md:w-4 md:h-4" /> Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={14} className="text-orange-500 md:w-4 md:h-4" /> Phone
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 00000 00000"
                    className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <MessageSquare size={14} className="text-orange-500 md:w-4 md:h-4" /> Purpose
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm md:text-base"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Donation Discussion">Donation Discussion</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Support Needed">Support Needed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={14} className="text-orange-500 md:w-4 md:h-4" /> Preferred Date
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Clock size={14} className="text-orange-500 md:w-4 md:h-4" /> Preferred Time
                  </label>
                  <input
                    required
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm md:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us a bit about why you'd like to meet..."
                  rows={3}
                  className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none text-sm md:text-base"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl hover:bg-orange-700 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                Request Appointment <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
