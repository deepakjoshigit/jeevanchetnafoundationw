
import React, { useState } from 'react';
import { Heart, ShieldCheck, ArrowRight, CreditCard, ExternalLink } from 'lucide-react';
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
    <div className="py-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Donation Form */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Heart className="text-red-500 fill-red-500" /> Donate Life
            </h1>
            <p className="text-gray-600 mb-10">Your contribution is 100% tax deductible under Section 80G. Help us continue our education and hunger relief programs.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select or Enter Amount (INR)</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[500, 1000, 5000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className={`py-3 rounded-2xl font-bold transition-all ${
                        amount === val ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom Amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-bold text-xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={handleDonate}
                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-orange-700 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                Proceed to Pay <ArrowRight />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
               <div className="flex items-center gap-1 text-xs"><ShieldCheck size={14} className="text-green-500" /> Secure Payment</div>
               <div className="flex items-center gap-1 text-xs"><CreditCard size={14} /> Cards/UPI/Netbanking</div>
            </div>
          </div>

          {/* Why Donate Content */}
          <div className="space-y-12 pt-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Why Your Gift Matters</h2>
              <div className="space-y-6">
                 {[
                   { title: '₹500 feeds 10 children', desc: 'A nutritious meal can make a child concentrate better on their studies.', icon: '🍱' },
                   { title: '₹1000 plants 5 trees', desc: 'Contribute to a greener Haldwani and combat climate change.', icon: '🌳' },
                   { title: '₹5000 funds digital literacy', desc: 'Support one student with a basic computer education course for a month.', icon: '💻' }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                     <span className="text-4xl">{item.icon}</span>
                     <div>
                       <h4 className="font-bold text-gray-900">{item.title}</h4>
                       <p className="text-gray-500 text-sm">{item.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 rounded-bl-full opacity-20"></div>
               <h3 className="text-2xl font-serif font-bold mb-6">Bank Transfer Details</h3>
               <div className="space-y-4 text-gray-300">
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-500">Account Name</span>
                    <span className="font-medium">{BANK_DETAILS.accountName}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-500">Account Number</span>
                    <span className="font-medium font-mono text-lg">{BANK_DETAILS.accountNo}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-500">IFSC Code</span>
                    <span className="font-medium font-mono text-lg">{BANK_DETAILS.ifsc}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-500">Bank Name</span>
                    <span className="font-medium">{BANK_DETAILS.bankName}</span>
                  </div>
               </div>
               <p className="mt-8 text-xs text-gray-500 italic text-center">
                 After transfer, please share the transaction screenshot on WhatsApp {CONTACT_INFO.whatsapp} for the donation receipt.
               </p>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 text-center">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Scan to Donate (UPI)</h3>
              <div className="max-w-[250px] mx-auto p-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <img 
                  src={IMAGES.qrCode} 
                  alt="Donation QR Code" 
                  className="w-full h-auto rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-4 text-sm text-gray-500">Scan this QR code using any UPI app (PhonePe, Google Pay, Paytm, etc.)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Donate;
