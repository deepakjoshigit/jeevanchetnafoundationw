
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, ArrowRight, CreditCard, ExternalLink, Sparkles, Award, Star } from 'lucide-react';
import { RAZORPAY_KEY, FOUNDATION_NAME, CONTACT_INFO, BANK_DETAILS, IMAGES } from '../constants';

const Donate: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleDonate = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: amount * 100, // in paisa
      currency: "INR",
      name: FOUNDATION_NAME,
      description: "Donation for Social Welfare",
      image: "https://via.placeholder.com/128", // NGO Logo
      handler: function (response: any) {
        alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: name,
        email: email,
        contact: phone
      },
      theme: {
        color: "#ea580c" // Orange 600
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.heroSlider[2]} 
            className="w-full h-full object-cover opacity-30 scale-110" 
            alt="Donate Background" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900 to-stone-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-orange-600/20 text-orange-500 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-orange-600/30 backdrop-blur-sm"
          >
            <Heart size={16} className="fill-current" /> Be the Change
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8"
          >
            Your Kindness <span className="text-orange-600 italic">Saves Lives.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed"
          >
            Every contribution helps us provide education, nutrition, and hope to those who need it most in Uttarakhand.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 -mt-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Donation Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-7 bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl border border-stone-100"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                  <CreditCard size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900">Make a Donation</h2>
                  <p className="text-gray-500">Secure & Tax-Deductible (80G)</p>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-6 uppercase tracking-widest">Select Amount (INR)</label>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[500, 1000, 5000].map((val) => (
                      <button
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`py-5 rounded-[2rem] font-bold text-xl transition-all duration-500 ${
                          amount === val 
                            ? 'bg-orange-600 text-white shadow-2xl scale-105' 
                            : 'bg-stone-50 text-gray-500 hover:bg-stone-100 border border-stone-100'
                        }`}
                      >
                        ₹{val}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₹</span>
                    <input
                      type="number"
                      placeholder="Enter Custom Amount"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full pl-12 pr-8 py-6 bg-stone-50 border border-stone-100 rounded-[2rem] focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-bold text-2xl text-gray-900 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-8 py-5 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full px-8 py-5 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-8 py-5 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDonate}
                  className="w-full bg-orange-600 text-white py-6 rounded-[2rem] font-bold text-xl hover:bg-orange-700 transition-all shadow-2xl flex items-center justify-center gap-4 group"
                >
                  Proceed to Secure Payment <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>

                <div className="flex items-center justify-center gap-8 pt-4">
                  <div className="flex items-center gap-2 text-stone-400 text-sm font-medium">
                    <ShieldCheck size={18} className="text-emerald-500" /> SSL Secure
                  </div>
                  <div className="flex items-center gap-2 text-stone-400 text-sm font-medium">
                    <Award size={18} className="text-blue-500" /> 80G Tax Benefit
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Impact & Info */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <h3 className="text-3xl font-serif font-bold text-gray-900">Why Your Gift <span className="text-orange-600 italic">Matters</span></h3>
                <div className="space-y-6">
                  {[
                    { title: '₹500 feeds 10 children', desc: 'A nutritious meal can make a child concentrate better on their studies.', icon: '🍱', color: 'bg-orange-50' },
                    { title: '₹1000 plants 5 trees', desc: 'Contribute to a greener Haldwani and combat climate change.', icon: '🌳', color: 'bg-emerald-50' },
                    { title: '₹5000 funds digital literacy', desc: 'Support one student with a basic computer education course for a month.', icon: '💻', color: 'bg-blue-50' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex gap-6 p-8 bg-white rounded-[2.5rem] shadow-sm border border-stone-100 group transition-all duration-500 hover:shadow-xl"
                    >
                      <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h4>
                        <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-stone-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 rounded-bl-full opacity-20"></div>
                <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                  <Star size={24} className="text-orange-500 fill-current" /> Bank Transfer
                </h3>
                <div className="space-y-6">
                  {[
                    { label: 'Account Name', value: BANK_DETAILS.accountName },
                    { label: 'Account Number', value: BANK_DETAILS.accountNo, mono: true },
                    { label: 'IFSC Code', value: BANK_DETAILS.ifsc, mono: true },
                    { label: 'Bank Name', value: BANK_DETAILS.bankName }
                  ].map((detail, i) => (
                    <div key={i} className="flex flex-col gap-1 border-b border-white/10 pb-4">
                      <span className="text-stone-500 text-xs font-bold uppercase tracking-widest">{detail.label}</span>
                      <span className={`text-lg ${detail.mono ? 'font-mono' : 'font-medium'}`}>{detail.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-sm text-stone-500 italic text-center leading-relaxed">
                  After transfer, please share the transaction screenshot on WhatsApp <span className="text-orange-500 font-bold">{CONTACT_INFO.whatsapp}</span> for the donation receipt.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-stone-100 text-center"
              >
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">Scan to Donate (UPI)</h3>
                <div className="max-w-[220px] mx-auto p-4 bg-stone-50 rounded-[2.5rem] border-2 border-dashed border-stone-200 relative group">
                  <div className="absolute inset-0 bg-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
                  <img 
                    src={IMAGES.qrCode} 
                    alt="Donation QR Code" 
                    className="w-full h-auto rounded-2xl relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="mt-6 text-sm text-stone-500 leading-relaxed">
                  Scan this QR code using any UPI app<br/>(PhonePe, Google Pay, Paytm, etc.)
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
