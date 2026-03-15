
import React from 'react';
import { FileText, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DOCUMENTS, CONTACT_INFO } from '../constants';

const Documents: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b border-gray-100 pb-10">
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Legal & Compliance</h1>
              <p className="text-gray-600">We maintain complete transparency in our operations. View our official registrations below.</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-2xl font-bold">
              <ShieldCheck /> Verified Section 8 NGO
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCUMENTS.map((doc, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-orange-200 hover:bg-white transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white rounded-xl text-orange-600 shadow-sm">
                    <FileText size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-2 py-1 rounded">
                    {doc.category}
                  </span>
                </div>
                <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">{doc.label}</h3>
                <p className="text-gray-900 font-mono font-bold break-all">{doc.value}</p>
              </div>
            ))}
            
            {/* Bank Details Card */}
            <div className="p-6 bg-orange-600 rounded-2xl text-white col-span-1 md:col-span-2 lg:col-span-3 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Banking Information</h3>
                  <p className="text-orange-100 mb-4 md:mb-0">Support us directly via bank transfer for 80G tax benefits.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full md:w-auto">
                  <div>
                    <span className="text-orange-200 text-xs block mb-1">A/C NUMBER</span>
                    <p className="font-bold text-lg">00000044208565753</p>
                  </div>
                  <div>
                    <span className="text-orange-200 text-xs block mb-1">IFSC CODE</span>
                    <p className="font-bold text-lg">SBIN0000646</p>
                  </div>
                  <div>
                    <span className="text-orange-200 text-xs block mb-1">BANK NAME</span>
                    <p className="font-bold text-lg">SBI (Haldwani)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
             {['CSR.GOV.IN', 'GEM PORTAL', 'DARPAN REG', 'MSME REG'].map((item, i) => (
               <div key={i} className="flex items-center gap-2 text-gray-400 font-bold text-xs border border-gray-200 rounded-xl p-4 justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                 <CheckCircle2 size={16} className="text-green-500" />
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
