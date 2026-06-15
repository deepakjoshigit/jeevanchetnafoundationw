import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Calendar, 
  Info, 
  ExternalLink, 
  UserCheck, 
  PhoneCall, 
  Shield, 
  MapPin,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

const Attendance: React.FC = () => {
  // ISO-compliant formatted date & time in IST timezone
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', timeOptions));
      setDate(now.toLocaleDateString('en-IN', dateOptions));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Decorative Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute top-[40%] -right-20 w-80 h-80 bg-green-50/50 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-150/45 text-orange-700 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <UserCheck size={14} className="text-orange-600 animate-pulse" />
            Digital Duty Ledger
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-black text-stone-900 tracking-tight"
          >
            Center & Field <span className="text-orange-600">Attendance</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-stone-550 max-w-2xl mx-auto mt-3 text-sm font-light leading-relaxed"
          >
            Uttarakhand regional coordinates & center staff registration portal. Log your daily work, field projects, and volunteer activities instantly.
          </motion.p>
        </div>

        {/* Live Status and Clock Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
          {/* Indian Standard Time Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-stone-200 p-5 rounded-3xl flex items-center justify-between shadow-sm"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block font-mono tracking-wider">Local Time (IST)</span>
              <span className="text-xl font-mono font-bold text-stone-900 mt-1 block">
                {time || 'Calculating...'}
              </span>
            </div>
            <div className="bg-orange-50 text-orange-600 p-3 rounded-2xl border border-orange-100">
              <Clock size={20} />
            </div>
          </motion.div>

          {/* Active Date Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-stone-200 p-5 rounded-3xl flex items-center justify-between shadow-sm md:col-span-2"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block font-mono tracking-wider">Today's Date</span>
              <span className="text-base font-bold text-stone-800 mt-1 block">
                {date || 'Fetching calendar...'}
              </span>
            </div>
            <div className="bg-green-50 text-green-700 p-3 rounded-2xl border border-green-100">
              <Calendar size={20} />
            </div>
          </motion.div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Instructions & Help Columns (4 Cols on Large) */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            
            {/* Guide Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-stone-200 rounded-[2rem] p-6 shadow-sm text-left"
            >
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-4">
                <FileCheck2 size={20} className="text-orange-600" />
                Submission Guidelines
              </h3>
              
              <ul className="space-y-4 text-xs text-stone-600 font-light leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-stone-850 block font-semibold">Pre-commence Checklist</strong>
                    Ensure your device network stays stable during the submission process to avoid form disruptions.
                  </div>
                </li>
                
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-stone-850 block font-semibold">Accurate Coordinates</strong>
                    Be sure to select your specific office location or center task details from the list accurately.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-stone-850 block font-semibold">Timely Completion</strong>
                    Submit daily logs on scheduling or before finishing your work shift to synchronize hours with coordinating ledger database.
                  </div>
                </li>
              </ul>

              <div className="mt-6 pt-5 border-t border-stone-100 flex items-start gap-3 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100">
                <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900 font-medium leading-normal">
                  Need to check your submitted logs history or edit wrong entries? Contact Center Supervisor or Operations desk.
                </p>
              </div>
            </motion.div>

            {/* Helpline and Coordinator Support */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-stone-900 text-white rounded-[2rem] p-6 shadow-md text-left"
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2 mb-3">
                <PhoneCall size={16} /> Operations Support
              </h4>
              <p className="text-xs text-stone-300 font-light leading-relaxed mb-4">
                If the Google Form below fails to load or acts frozen on your mobile device, please initiate a call with our technical support.
              </p>
              <div className="space-y-2 mt-4 text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-405 font-light">Lead Coordinator:</span>
                  <span className="font-mono text-stone-200 font-semibold select-all">+91 89585 21254</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-405 font-light">Tech Desk Email:</span>
                  <span className="font-mono text-stone-200 font-semibold select-all">jeevanchetnafoundationn@gmail.com</span>
                </div>
              </div>
              <a 
                href="https://docs.google.com/spreadsheets/d/1MD6HsYm2irxmvKIsUuXj-_q3TdtugmudqPe5AOTA3mk/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="mt-5 w-full bg-white/10 hover:bg-white/15 text-white font-bold text-[11px] uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all select-none"
              >
                <ExternalLink size={13} className="text-orange-400" /> View Master Spreadsheet
              </a>
            </motion.div>

          </div>

          {/* New Google Form Display Embedded Platform (8 Cols on Large) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-stone-200/95 rounded-[2.5rem] p-4 sm:p-6 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-green-600" />
              
              <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2 text-stone-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-650">Google Sync Active</span>
                </div>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLScWh2Lpm_k-Z4rhkGV-Qg1P1UQW5ljg2JwJJb2zfuNFzFvReA/viewform"
                  target="_blank"
                  rel="noreferrer"
                  className="text-stone-500 hover:text-stone-800 text-xs font-bold inline-flex items-center gap-1 transition-all"
                >
                  Open Direct Link <ExternalLink size={12} />
                </a>
              </div>

              {/* Embedding IFrame with custom animated loader */}
              <div className="relative rounded-2xl border border-stone-150 overflow-hidden bg-stone-50/50 min-h-[909px]">
                
                <AnimatePresence>
                  {iframeLoading && (
                    <motion.div 
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 p-8"
                    >
                      <div className="w-12 h-12 rounded-full border-4 border-orange-100 border-t-orange-600 animate-spin mb-4" />
                      <p className="text-stone-800 font-bold text-sm">Opening Attendance Form...</p>
                      <p className="text-stone-500 text-xs font-light mt-1.5 text-center max-w-sm leading-relaxed">
                        Connecting to Google's server database. If it doesn't load instantly, check your network speed.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <iframe 
                  id="attendance_form_iframe"
                  src="https://docs.google.com/forms/d/e/1FAIpQLScWh2Lpm_k-Z4rhkGV-Qg1P1UQW5ljg2JwJJb2zfuNFzFvReA/viewform?embedded=true" 
                  width="100%" 
                  height="909" 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  onLoad={() => setIframeLoading(false)}
                  className="w-full relative z-10 block transition-opacity duration-500"
                  style={{ opacity: iframeLoading ? 0 : 1 }}
                >
                  Loading…
                </iframe>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Attendance;
