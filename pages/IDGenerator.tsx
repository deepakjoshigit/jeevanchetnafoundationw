
import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Download, User, Mail, Phone, Briefcase, Camera, IdCard, RefreshCw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { FOUNDATION_NAME, CONTACT_INFO, IMAGES } from '../constants';

const IDGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Volunteer',
    details: '',
    photo: null as string | null,
  });
  const [idNumber, setIdNumber] = useState(`JCF-${Math.floor(100000 + Math.random() * 900000)}`);
  const idCardRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateNewId = () => {
    setIdNumber(`JCF-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const downloadIDCard = async () => {
    if (idCardRef.current) {
      try {
        const canvas = await html2canvas(idCardRef.current, {
          scale: 3, // Higher quality
          useCORS: true,
          backgroundColor: null,
        });
        const link = document.createElement('a');
        link.download = `${formData.name || 'ID-Card'}-JCF.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error generating ID card:', error);
      }
    }
  };

  return (
    <div className="py-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4"
          >
            ID Card Generator
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Create your official {FOUNDATION_NAME} ID card. Fill in your details, upload a photo, and download your personalized card.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
              <IdCard className="text-orange-600" /> Enter Your Details
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <User size={16} className="text-orange-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase size={16} className="text-orange-500" /> Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="Volunteer">Volunteer</option>
                    <option value="Team Member">Team Member</option>
                    <option value="Coordinator">Coordinator</option>
                    <option value="Director">Director</option>
                    <option value="Supporter">Supporter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-orange-500" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="rahul@example.com"
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-orange-500" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Camera size={16} className="text-orange-500" /> Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-gray-50 border-2 border-dashed border-gray-200 hover:border-orange-400 p-4 rounded-xl flex flex-col items-center justify-center transition-all w-full">
                    <Camera size={24} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Click to upload photo</span>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>
                  {formData.photo && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-orange-500 shrink-0">
                      <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Additional Details</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="e.g. Blood Group: O+, Emergency Contact: 9999999999"
                  rows={3}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={generateNewId}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} /> New ID Number
                </button>
                <button
                  onClick={downloadIDCard}
                  className="flex-[2] bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Download size={18} /> Download ID Card
                </button>
              </div>
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center sticky top-24"
          >
            <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-8">Live Preview</h2>
            
            {/* ID Card Container */}
            <div 
              ref={idCardRef}
              className="w-[350px] h-[550px] bg-white rounded-[2rem] shadow-2xl overflow-hidden relative border border-gray-100"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {/* Header Design */}
              <div className="bg-gradient-to-br from-orange-600 to-orange-500 h-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="bg-white p-1.5 rounded-xl shadow-lg mb-2">
                    <img src={IMAGES.logo} alt="Logo" className="h-10 w-auto" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-white font-bold text-sm tracking-tight uppercase text-center leading-tight">
                    {FOUNDATION_NAME}
                  </h3>
                </div>
              </div>

              {/* Photo Section */}
              <div className="relative -mt-12 flex justify-center">
                <div className="w-32 h-32 bg-white rounded-3xl p-1 shadow-xl">
                  <div className="w-full h-full bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                    {formData.photo ? (
                      <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <User size={48} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8 text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
                  {formData.name || 'Your Name'}
                </h4>
                <p className="text-orange-600 font-bold text-sm uppercase tracking-widest mb-6">
                  {formData.role}
                </p>

                <div className="space-y-4 text-left bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-orange-500">
                      <Mail size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase font-bold">Email</span>
                      <span className="text-xs font-medium text-gray-700 truncate max-w-[180px]">
                        {formData.email || 'email@example.com'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-orange-500">
                      <Phone size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase font-bold">Phone</span>
                      <span className="text-xs font-medium text-gray-700">
                        {formData.phone || '+91 00000 00000'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-orange-500">
                      <IdCard size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase font-bold">ID Number</span>
                      <span className="text-xs font-mono font-bold text-gray-900">
                        {idNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {formData.details && (
                  <div className="mt-4 text-left">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 px-1">Additional Info</p>
                    <p className="text-[11px] text-gray-600 bg-orange-50/50 p-3 rounded-xl border border-orange-100/50 italic">
                      {formData.details}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Design */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-gray-400 uppercase font-bold">Issued By</span>
                    <span className="text-[10px] font-bold text-gray-900">Authorized Signatory</span>
                    <span className="text-[8px] text-gray-500">Director, {FOUNDATION_NAME}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-gray-400 uppercase font-bold">Valid Thru</span>
                    <span className="text-[10px] font-bold text-gray-700">Mar 2027</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 text-xs text-gray-400 text-center max-w-[300px]">
              Tip: Use a high-quality square photo for the best result. The ID card is generated at 3x resolution for crisp printing.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IDGenerator;
