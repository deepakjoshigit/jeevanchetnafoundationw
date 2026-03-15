import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, X } from 'lucide-react';
import { IMAGES } from '../constants';

const QRPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group"
      >
        <QrCode size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
          Donate via QR
        </span>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-sm w-full text-center overflow-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2"
              >
                <X size={24} />
              </button>

              <div className="mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <QrCode size={32} className="text-orange-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Scan to Donate</h3>
                <p className="text-gray-500 text-sm mt-2">Support our mission directly via UPI</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 mb-6">
                <img
                  src={IMAGES.qrCode}
                  alt="Donation QR Code"
                  className="w-full h-auto rounded-xl shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Accepted Apps</p>
                <div className="flex justify-center gap-4 grayscale opacity-60">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Google_Pay_Logo.svg" alt="GPay" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-4" />
                </div>
              </div>
              
              <p className="mt-8 text-[10px] text-gray-400 italic">
                Your contribution helps us provide food and education to those in need.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QRPopup;
