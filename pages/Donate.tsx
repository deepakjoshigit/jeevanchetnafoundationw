
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
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-[60vh] flex items-center bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            src={IMAGES.heroSlider[2]} 
            className="w-full h-full object-cover" 
            alt="Donate Background" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-md text-orange-500 rounded-full text-xs font-bold uppercase tracking-widest mb-10 border border-white/10"
          >
            <Heart size={18} className="fill-current" /> Be the Change
          </motion.div>
          
          <div className="overflow-hidden mb-8">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[8rem] font-serif font-bold text-white leading-[0.85] tracking-tighter"
            >
              Your <span className="text-orange-600 italic font-medium">Kindness</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto leading-relaxed font-light text-balance"
          >
            Every contribution helps us provide education, nutrition, and hope to those who need it most in Uttarakhand.
          </motion.p>
        </div>
      </section>

      {/* Main Content - Refined Layout */}
      <section className="py-32 bg-stone-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Donation Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="lg:col-span-7 bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-stone-100"
            >
              <div className="flex items-center gap-6 mb-16">
                <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-600">
                  <CreditCard size={36} />
                </div>
                <div>
                  <h2 className="text-4xl font-serif font-bold text-stone-950">Make a Donation</h2>
                  <p className="text-stone-400 font-light text-lg">Secure & Tax-Deductible (80G)</p>
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 mb-8 uppercase tracking-[0.2em] ml-6">Select Amount (INR)</label>
                  <div className="grid grid-cols-3 gap-6 mb-10">
                    {[500, 1000, 5000].map((val) => (
                      <button
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`py-6 rounded-[2.5rem] font-bold text-2xl transition-all duration-700 ${
                          amount === val 
                            ? 'bg-orange-600 text-white shadow-2xl shadow-orange-600/20 scale-105' 
                            : 'bg-stone-50 text-stone-400 hover:bg-stone-100 border border-stone-100'
                        }`}
                      >
                        ₹{val}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-8 top-1/2 -translate-y-1/2 text-3xl font-bold text-stone-300">₹</span>
                    <input
                      type="number"
                      placeholder="Enter Custom Amount"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full pl-16 pr-10 py-7 bg-stone-50 border border-stone-100 rounded-[2.5rem] focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-bold text-3xl text-stone-950 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-6">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-10 py-6 bg-stone-50 border border-stone-100 rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-6">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full px-10 py-6 bg-stone-50 border border-stone-100 rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-6">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-10 py-6 bg-stone-50 border border-stone-100 rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:outline-none font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDonate}
                  className="w-full bg-orange-600 text-white py-7 rounded-[2.5rem] font-bold text-xl hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/20 flex items-center justify-center gap-4 group"
                >
                  Proceed to Secure Payment <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>

                <div className="flex items-center justify-center gap-10 pt-6">
                  <div className="flex items-center gap-3 text-stone-400 text-sm font-medium">
                    <ShieldCheck size={20} className="text-emerald-500" /> SSL Secure
                  </div>
                  <div className="flex items-center gap-3 text-stone-400 text-sm font-medium">
                    <Award size={20} className="text-blue-500" /> 80G Tax Benefit
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Impact & Info */}
            <div className="lg:col-span-5 space-y-16">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="space-y-10"
              >
                <h3 className="text-4xl font-serif font-bold text-stone-950">Why Your Gift <span className="text-orange-600 italic">Matters</span></h3>
                <div className="space-y-8">
                  {[
                    { title: '₹500 feeds 10 children', desc: 'A nutritious meal can make a child concentrate better on their studies.', icon: '🍱', color: 'bg-orange-50' },
                    { title: '₹1000 plants 5 trees', desc: 'Contribute to a greener Haldwani and combat climate change.', icon: '🌳', color: 'bg-emerald-50' },
                    { title: '₹5000 funds digital literacy', desc: 'Support one student with a basic computer education course for a month.', icon: '💻', color: 'bg-blue-50' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex gap-8 p-10 bg-white rounded-[3rem] shadow-sm border border-stone-100 group transition-all duration-700 hover:shadow-2xl"
                    >
                      <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform duration-700`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-950 text-xl mb-2">{item.title}</h4>
                        <p className="text-stone-500 leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="bg-stone-950 rounded-[4rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600 rounded-bl-full opacity-20"></div>
                <h3 className="text-3xl font-serif font-bold mb-10 flex items-center gap-4">
                  <Star size={28} className="text-orange-500 fill-current" /> Bank Transfer
                </h3>
                <div className="space-y-8">
                  {[
                    { label: 'Account Name', value: BANK_DETAILS.accountName },
                    { label: 'Account Number', value: BANK_DETAILS.accountNo, mono: true },
                    { label: 'IFSC Code', value: BANK_DETAILS.ifsc, mono: true },
                    { label: 'Bank Name', value: BANK_DETAILS.bankName }
                  ].map((detail, i) => (
                    <div key={i} className="flex flex-col gap-2 border-b border-white/10 pb-6">
                      <span className="text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em]">{detail.label}</span>
                      <span className={`text-xl ${detail.mono ? 'font-mono' : 'font-light'}`}>{detail.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-12 text-sm text-stone-500 italic text-center leading-relaxed font-light">
                  After transfer, please share the transaction screenshot on WhatsApp <br />
                  <span className="text-orange-500 font-bold">{CONTACT_INFO.whatsapp}</span> for the donation receipt.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="bg-white p-12 md:p-16 rounded-[4rem] shadow-xl border border-stone-100 text-center"
              >
                <h3 className="text-3xl font-serif font-bold text-stone-950 mb-10">Scan to Donate (UPI)</h3>
                <div className="max-w-[260px] mx-auto p-6 bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-200 relative group">
                  <div className="absolute inset-0 bg-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem] duration-700"></div>
                  <img 
                    src={IMAGES.qrCode} 
                    alt="Donation QR Code" 
                    className="w-full h-auto rounded-2xl relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="mt-10 text-stone-500 leading-relaxed font-light">
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
