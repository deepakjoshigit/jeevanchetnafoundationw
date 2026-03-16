
import React from 'react';
import { FileText, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DOCUMENTS, CONTACT_INFO } from '../constants';

const Documents: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-20 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-10 md:mb-16 border-b border-gray-100 pb-8 md:pb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 md:mb-4">Legal & Compliance</h1>
              <p className="text-gray-600 text-sm md:text-base">We maintain complete transparency in our operations. View our official registrations below.</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-base">
              <ShieldCheck size={20} /> Verified Section 8 NGO
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {DOCUMENTS.map((doc, i) => (
              <div key={i} className="p-5 md:p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-orange-200 hover:bg-white transition-all">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div className="p-2.5 md:p-3 bg-white rounded-xl text-orange-600 shadow-sm">
                    <FileText size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-2 py-1 rounded">
                    {doc.category}
                  </span>
                </div>
                <h3 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-1">{doc.label}</h3>
                <p className="text-gray-900 font-mono font-bold break-all text-sm md:text-base">{doc.value}</p>
              </div>
            ))}
            
            {/* Bank Details Card */}
            <div className="p-6 md:p-8 bg-orange-600 rounded-2xl text-white col-span-1 md:col-span-2 lg:col-span-3 mt-4 md:mt-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Banking Information</h3>
                  <p className="text-orange-100 text-sm md:text-base mb-0">Support us directly via bank transfer for 80G tax benefits.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 w-full lg:w-auto">
                  <div>
                    <span className="text-orange-200 text-[10px] md:text-xs block mb-1">A/C NUMBER</span>
                    <p className="font-bold text-base md:text-lg">00000044208565753</p>
                  </div>
                  <div>
                    <span className="text-orange-200 text-[10px] md:text-xs block mb-1">IFSC CODE</span>
                    <p className="font-bold text-base md:text-lg">SBIN0000646</p>
                  </div>
                  <div>
                    <span className="text-orange-200 text-[10px] md:text-xs block mb-1">BANK NAME</span>
                    <p className="font-bold text-base md:text-lg">SBI (Haldwani)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
             {['CSR.GOV.IN', 'GEM PORTAL', 'DARPAN REG', 'MSME REG'].map((item, i) => (
               <div key={i} className="flex items-center gap-2 text-gray-400 font-bold text-[10px] md:text-xs border border-gray-200 rounded-xl p-3 md:p-4 justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                 <CheckCircle2 size={14} className="text-green-500 md:w-4 md:h-4" />
                 {item}
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
