
import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Download, User, Calendar, Briefcase, MapPin, FileText, RefreshCw, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import { FOUNDATION_NAME, CONTACT_INFO, IMAGES } from '../constants';

const JoiningLetter: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    guardianName: '',
    address: '',
    role: 'Volunteer',
    joiningDate: new Date().toISOString().split('T')[0],
    refNumber: `JCF/APPT/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
  });

  const letterRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateNewRef = () => {
    setFormData(prev => ({
      ...prev,
      refNumber: `JCF/APPT/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`
    }));
  };

  const downloadLetter = async () => {
    if (letterRef.current) {
      try {
        const canvas = await html2canvas(letterRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        });
        const link = document.createElement('a');
        link.download = `Joining-Letter-${formData.name || 'Member'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error generating letter:', error);
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
            Joining Letter Generator
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Generate an official appointment and joining letter for new team members and volunteers.
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
              <FileText className="text-orange-600" /> Letter Details
            </h2>

            <div className="space-y-6">
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
                  <User size={16} className="text-orange-500" /> S/O or D/O (Guardian Name)
                </label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleInputChange}
                  placeholder="Father's or Guardian's Name"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-orange-500" /> Full Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter complete residential address"
                  rows={2}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase size={16} className="text-orange-500" /> Designation
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="Volunteer">Volunteer</option>
                    <option value="Social Worker">Social Worker</option>
                    <option value="Team Member">Team Member</option>
                    <option value="Coordinator">Coordinator</option>
                    <option value="Digital Literacy Trainer">Digital Literacy Trainer</option>
                    <option value="Environmental Activist">Environmental Activist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-orange-500" /> Joining Date
                  </label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={generateNewRef}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} /> New Ref No.
                </button>
                <button
                  onClick={downloadLetter}
                  className="flex-[2] bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Download size={18} /> Download Letter
                </button>
              </div>
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-8">Letter Preview</h2>
            
            {/* Letter Container */}
            <div 
              ref={letterRef}
              className="w-[595px] min-h-[842px] bg-white shadow-2xl p-12 relative text-gray-800 leading-relaxed text-sm"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              {/* Letterhead */}
              <div className="border-b-2 border-orange-600 pb-6 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={IMAGES.logo} alt="Logo" className="h-16 w-auto" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="text-2xl font-bold text-orange-600 leading-none">{FOUNDATION_NAME}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Transforming Lives, Empowering Communities</p>
                  </div>
                </div>
                <div className="text-right text-[10px] text-gray-500">
                  <p>{CONTACT_INFO.headOffice}</p>
                  <p>Email: {CONTACT_INFO.emails[0]}</p>
                  <p>Phone: {CONTACT_INFO.phones[0]}</p>
                </div>
              </div>

              {/* Letter Content */}
              <div className="space-y-6">
                <div className="flex justify-between font-bold">
                  <p>Ref: {formData.refNumber}</p>
                  <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
                </div>

                <div className="mt-8">
                  <p className="font-bold">To,</p>
                  <p className="font-bold uppercase">{formData.name || '[Name]'}</p>
                  <p>S/O / D/O: {formData.guardianName || '[Guardian Name]'}</p>
                  <p className="max-w-[300px]">{formData.address || '[Address]'}</p>
                </div>

                <div className="text-center py-4">
                  <h4 className="text-lg font-bold underline uppercase">Subject: Appointment Letter for the post of {formData.role}</h4>
                </div>

                <p>Dear {formData.name || 'Candidate'},</p>

                <p>
                  With reference to your application and subsequent interview, we are pleased to appoint you as a <strong>{formData.role}</strong> in <strong>{FOUNDATION_NAME}</strong> with effect from <strong>{new Date(formData.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.
                </p>

                <p>Your appointment is subject to the following terms and conditions:</p>

                <ul className="list-decimal pl-5 space-y-2">
                  <li>You will be responsible for the duties assigned to you by the foundation from time to time.</li>
                  <li>You are expected to maintain the highest standards of integrity and social responsibility.</li>
                  <li>This appointment is based on the information provided by you in your application.</li>
                  <li>You will follow all the rules and regulations of the foundation as applicable.</li>
                  <li>Your performance will be reviewed periodically to ensure alignment with our mission.</li>
                </ul>

                <p className="pt-4">
                  We look forward to your valuable contribution towards our mission of hunger relief, education, and digital literacy. Please sign the duplicate copy of this letter as a token of your acceptance.
                </p>

                <p>Welcome to the team!</p>

                <div className="mt-16 pt-8 flex justify-between items-end">
                  <div className="text-center">
                    <div className="w-32 h-px bg-gray-400 mb-2"></div>
                    <p className="text-xs font-bold">Candidate Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="mb-2">
                      <p className="font-serif italic text-lg text-gray-900">Deepak Joshi</p>
                    </div>
                    <p className="text-xs font-bold">Director</p>
                    <p className="text-[10px] text-gray-500">For {FOUNDATION_NAME}</p>
                  </div>
                </div>
              </div>

              {/* Footer Decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-600 via-green-600 to-orange-600"></div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-gray-400 text-xs italic">
              <Printer size={14} /> Note: This is a computer-generated document for foundation use.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JoiningLetter;
