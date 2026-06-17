import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  School, 
  CheckCircle2, 
  ExternalLink,
  Users,
  Utensils,
  BookOpen,
  Filter,
  X,
  CreditCard,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { RAZORPAY_KEY, FOUNDATION_NAME, CONTACT_INFO, BANK_DETAILS } from '../constants';

interface Child {
  id: string;
  name: string;
  driveUrl: string;
  suggestedAmount: number;
  category: 'girl' | 'boy' | 'duo';
  age: number;
  grade: string;
  location: string;
  aspiration: string;
  supportType: string;
  icon: string;
}

const CHILDREN_DATA: Child[] = [
  {
    id: 'chadani-1',
    name: 'Chadani',
    driveUrl: 'https://drive.google.com/file/d/1RYSTdtKLigYG2wiKSRkXeBkmvsbKqNwN/view?usp=sharing',
    suggestedAmount: 1200,
    category: 'girl',
    age: 9,
    grade: 'Class 4',
    location: 'Haldwani Slum Area',
    aspiration: 'Wants to become a Teacher to educate poor girls.',
    supportType: 'Primary Education & Ration',
    icon: '📚'
  },
  {
    id: 'puja-1',
    name: 'Puja',
    driveUrl: 'https://drive.google.com/file/d/1WmKaljsbhqVw7YArqzcCvfDWMG-JZdh-/view?usp=sharing',
    suggestedAmount: 1500,
    category: 'girl',
    age: 11,
    grade: 'Class 6',
    location: 'Kathgodam Outskirts',
    aspiration: 'Dreams of becoming a Doctor to treat her village folk.',
    supportType: 'School Tuition & Hygiene Kit',
    icon: '🩺'
  },
  {
    id: 'aarti',
    name: 'Aarti',
    driveUrl: 'https://drive.google.com/file/d/1R5rkB4augka9b1UFUjoMcYqd1IyGTmRp/view?usp=sharing',
    suggestedAmount: 1200,
    category: 'girl',
    age: 8,
    grade: 'Class 3',
    location: 'Lalkuan Brick Kiln Colony',
    aspiration: 'Loves science and dreams of becoming an Engineer.',
    supportType: 'Daily Tuition Support & Uniforms',
    icon: '🔬'
  },
  {
    id: 'radha-1',
    name: 'Radha',
    driveUrl: 'https://drive.google.com/file/d/19NpzD6iFRHODkBnv3OkLRVbVGfOWzuOC/view?usp=sharing',
    suggestedAmount: 1800,
    category: 'girl',
    age: 12,
    grade: 'Class 7',
    location: 'Lalkuan Slum',
    aspiration: 'Aims to join Civil Services to serve the nation.',
    supportType: 'Full Sponsorship & Nutrition',
    icon: '🏛️'
  },
  {
    id: 'kiran',
    name: 'Kiran',
    driveUrl: 'https://drive.google.com/file/d/1UW8CJsDmxqEZTo4X2zmtqzo9NKP5FHRQ/view?usp=sharing',
    suggestedAmount: 1000,
    category: 'girl',
    age: 7,
    grade: 'Class 2',
    location: 'Ramnagar Forest Edge Colony',
    aspiration: 'Enjoys painting, wants to inspire through Art.',
    supportType: 'School Bags, Books & Daily Mid-day Meal',
    icon: '🎨'
  },
  {
    id: 'swati',
    name: 'Swati',
    driveUrl: 'https://drive.google.com/file/d/1VgCXnplxMZfQFdXU1UE-wZyNOF5Eg5Bo/view?usp=sharing',
    suggestedAmount: 1550,
    category: 'girl',
    age: 10,
    grade: 'Class 5',
    location: 'Haldwani Station Colony',
    aspiration: 'Aspires to be a Nurse to provide healing care.',
    supportType: 'Educational Aid & Stationary Kits',
    icon: '🏥'
  },
  {
    id: 'dheeraj',
    name: 'Dheeraj',
    driveUrl: 'https://drive.google.com/file/d/1JXInWeGaA4tSMcmudx_26ppp3XQDTrhZ/view?usp=sharing',
    suggestedAmount: 1600,
    category: 'boy',
    age: 11,
    grade: 'Class 6',
    location: 'Bareilly Road Slum Hub',
    aspiration: 'Wants to study computers and become a Programmer.',
    supportType: 'STEM Education & Laptop Lab Access',
    icon: '💻'
  },
  {
    id: 'priyanshu',
    name: 'Priyanshu',
    driveUrl: 'https://drive.google.com/file/d/1HXdxdzipW4xWATTLexlFkoVGMqK2Rkg8/view?usp=sharing',
    suggestedAmount: 1200,
    category: 'boy',
    age: 9,
    grade: 'Class 4',
    location: 'Subhash Nagar Basti',
    aspiration: 'A passionate runner, dreams of representing India in Athletics.',
    supportType: 'Nutrition Supplement & Sports Support',
    icon: '🏃'
  },
  {
    id: 'chandani-2',
    name: 'Chandani',
    driveUrl: 'https://drive.google.com/file/d/1JRkweQgFBAl_VZUzcxf1TS2GrnnX55Ku/view?usp=sharing',
    suggestedAmount: 1500,
    category: 'girl',
    age: 10,
    grade: 'Class 5',
    location: 'Transport Nagar Slum',
    aspiration: 'Hopes to be an English Professor and help local schools.',
    supportType: 'Special Language Coaching & Textbooks',
    icon: '🗣️'
  },
  {
    id: 'radha-2',
    name: 'Radha',
    driveUrl: 'https://drive.google.com/file/d/159DKOqkurWbr2-1gmQpuMH9ybCBfFErK/view?usp=sharing',
    suggestedAmount: 1400,
    category: 'girl',
    age: 8,
    grade: 'Class 3',
    location: 'Kathgodam bypass basti',
    aspiration: 'Wants to dance on television and teach local children.',
    supportType: 'Tuition support, Shoes & Nutritious Breakfast',
    icon: '🌟'
  },
  {
    id: 'puja-2',
    name: 'Puja',
    driveUrl: 'https://drive.google.com/file/d/1iSNxqtrFPd0T2AZRf8zhICtBvqripXAb/view?usp=sharing',
    suggestedAmount: 1200,
    category: 'girl',
    age: 9,
    grade: 'Class 4',
    location: 'Lalkuan Railway Colony',
    aspiration: 'Fascinated by high-speed trains, wants to be pilot or railways driver.',
    supportType: 'Enrollment fees & Uniform maintenance',
    icon: '🚂'
  },
  {
    id: 'preeti-seeta',
    name: 'Preeti & Seeta',
    driveUrl: 'https://drive.google.com/file/d/1v9c168kcVY-IBWa5J9lBK88MRewLhhbo/view?usp=sharing',
    suggestedAmount: 2500,
    category: 'duo',
    age: 12,
    grade: 'Classes 7 & 6 (Sisters)',
    location: 'Haldwani Railway Transit Colony',
    aspiration: 'Determined to support each other and uplift their household.',
    supportType: 'Double Sibling Education & Welfare Grant',
    icon: '👭'
  }
];

const getDriveThumbnail = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop';
};

const Sponsor: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'girl' | 'boy'>('all');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  
  // Modal donation state variables
  const [sponsorAmount, setSponsorAmount] = useState<number>(1500);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [frequency, setFrequency] = useState<'monthly' | 'one-time'>('monthly');

  const filteredChildren = CHILDREN_DATA.filter(child => {
    if (filter === 'all') return true;
    if (filter === 'girl') return child.category === 'girl' || child.category === 'duo';
    return child.category === 'boy';
  });

  const openSponsorModal = (child: Child) => {
    setSelectedChild(child);
    setSponsorAmount(child.suggestedAmount);
  };

  const handleSponsorPayment = () => {
    if (!sponsorAmount || sponsorAmount <= 0) {
      alert("Please enter a valid support amount");
      return;
    }
    if (!donorName.trim()) {
      alert("Please provide your name so we can record your sponsorship");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: sponsorAmount * 100, // in paisa
      currency: "INR",
      name: FOUNDATION_NAME,
      description: `Sponsorship Support for ${selectedChild?.name}`,
      image: "https://via.placeholder.com/128", // NGO Logo
      handler: function (response: any) {
        alert(`Thank you for your noble gesture! Your sponsorship for ${selectedChild?.name} has been processed successfully. Receipt Transaction ID: ${response.razorpay_payment_id}`);
        setSelectedChild(null);
      },
      prefill: {
        name: donorName,
        email: donorEmail,
        contact: donorPhone
      },
      theme: {
        color: "#ea580c" // Orange 600
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Editorial Responsive Hero Section */}
      <div className="max-w-7xl mx-auto mb-20 relative text-center">
        <div className="absolute top-[10%] left-[5%] w-60 h-60 bg-orange-100 rounded-full blur-3xl opacity-55 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-45 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-orange-50 text-orange-700 rounded-full text-xs font-bold uppercase tracking-widest border border-orange-150/45 mb-4"
          >
            <Sparkles size={14} className="text-orange-500 animate-pulse" />
            Empower Uttarakhand's Future
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-stone-900 leading-[1.1]"
          >
            Sponsor a <span className="text-orange-600 italic">Child's Future</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-stone-550 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed text-balance"
          >
            There is no greater joy than giving a child the chance to read, write, learn, and grow. Directly sponsor these young minds, and we'll keep you updated on their academic and personal milestones.
          </motion.p>
        </div>
      </div>

      {/* Overview Metric Banner Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {[
          { icon: <BookOpen className="text-orange-600" size={24} />, title: "100% Direct", desc: "Every Rupee lands directly in school fees, uniform purchase, healthy daily meals, and books." },
          { icon: <Users className="text-green-700" size={24} />, title: "Regular Reports", desc: "Sponsors receive term-end report cards, handwritten postcards, and progress tracker logs of children." },
          { icon: <Utensils className="text-blue-600" size={24} />, title: "Healthy Nutrition", desc: "Ensures comprehensive medical coverage and high-protein diet supplies to tackle early childhood anemia." }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white border border-stone-150 p-6 rounded-3xl shadow-sm text-left flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center p-2 shrink-0">
              {metric.icon}
            </div>
            <div>
              <h3 className="font-bold text-stone-950 text-base">{metric.title}</h3>
              <p className="text-xs text-stone-500 font-light mt-1.5 leading-relaxed">{metric.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Options */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-stone-200/50 pb-8">
        <div className="flex items-center gap-2.5">
          <Filter size={16} className="text-stone-400" />
          <span className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">Filter Children</span>
        </div>
        <div className="flex gap-2 p-1 bg-stone-100 rounded-full border border-stone-200">
          {[
            { id: 'all', label: 'All Children' },
            { id: 'girl', label: 'Underprivileged Girls' },
            { id: 'boy', label: 'Underprivileged Boys' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 ${
                filter === btn.id 
                  ? 'bg-orange-600 text-white shadow' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 12-Card Dynamic Children Sponsor Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredChildren.map((child, index) => (
            <motion.div
              key={child.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-[2rem] border border-stone-200/80 shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left relative group min-h-[480px]"
            >
              {/* Image Frame Container */}
              <div className="h-64 relative overflow-hidden bg-stone-100">
                <span className="absolute top-4 left-4 z-20 bg-orange-600 text-white px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow">
                  WAITING FOR SPONSOR
                </span>
                
                <img 
                  src={getDriveThumbnail(child.driveUrl)}
                  alt={child.name}
                  onError={(e) => {
                    // Fallbck if direct google drive view fails
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop`;
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                
                {/* Overlay Aspiration Info */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-bold text-orange-400 font-mono tracking-widest uppercase block">ASPIRATION</span>
                    <p className="text-white text-xs font-semibold mt-0.5 line-clamp-1">{child.aspiration}</p>
                  </div>
                  <span className="text-2xl shrink-0 filter drop-shadow">{child.icon}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-2xl font-serif font-black text-stone-950 tracking-tight">{child.name}</h2>
                    <span className="px-2.5 py-1 bg-stone-50 border border-stone-150 rounded-full text-[10px] font-bold text-stone-500">
                      Age {child.age} • {child.grade}
                    </span>
                  </div>

                  <p className="text-xs text-stone-505 font-light leading-relaxed mt-3 flex items-start gap-1">
                    <span className="font-semibold text-stone-800">Location:</span> {child.location}
                  </p>

                  <p className="text-xs text-stone-505 font-light leading-relaxed mt-1 flex items-start gap-1">
                    <span className="font-semibold text-stone-800">Direct Support:</span> {child.supportType}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-extrabold text-stone-400 block tracking-widest uppercase font-mono">Suggested Support</span>
                    <span className="text-xl font-bold text-orange-600">₹{child.suggestedAmount}<span className="text-[10px] text-stone-500 font-light font-sans">/mo</span></span>
                  </div>
                  
                  <button
                    onClick={() => openSponsorModal(child)}
                    className="bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-black text-xs uppercase tracking-wider px-4 py-3 rounded-xl flex items-center gap-1.5 transition-all select-none shadow hover:shadow-md"
                  >
                    <Heart size={12} className="fill-current text-white animate-pulse" /> Sponsor {child.name}
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sponsoring Overlay Modal Dialog */}
      <AnimatePresence>
        {selectedChild && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            
            {/* Dark blur overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChild(null)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            />

            {/* Modal Body Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[3rem] shadow-2xl border border-stone-200 w-full max-w-2xl overflow-hidden relative z-10 text-left my-8"
            >
              <button 
                onClick={() => setSelectedChild(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-50 border border-stone-150 text-stone-500 hover:text-stone-850 transition-colors z-35"
              >
                <X size={18} />
              </button>

              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-green-600" />

              <div className="p-6 sm:p-10 border-b border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-500/20 shadowshrink-0">
                  <img 
                    src={getDriveThumbnail(selectedChild.driveUrl)} 
                    alt={selectedChild.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop`;
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-orange-600 tracking-widest font-mono">SPONSORSHIP CHOICE</span>
                  <h3 className="text-3xl font-serif font-black text-stone-900 mt-0.5">Adopt {selectedChild.name}'s Education</h3>
                  <p className="text-xs text-stone-500 font-light mt-1">
                    Your contribution directly provides school kits, uniforms, high-nutrition raw material imports, and basic health checkups for this child as part of Jeevan Chetna Foundation.
                  </p>
                </div>
              </div>

              {/* Forms and Settings */}
              <div className="p-6 sm:p-10 space-y-6 max-h-[60vh] overflow-y-auto">
                
                {/* Step 1: Support Level Choice */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-400 tracking-widest font-mono mb-2">Sponsorship Amount (INR)</label>
                  
                  {/* Preset Quick Selection Buttons */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[selectedChild.suggestedAmount, selectedChild.suggestedAmount * 2, selectedChild.suggestedAmount * 5].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setSponsorAmount(preset)}
                        className={`py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all border ${
                          sponsorAmount === preset
                            ? 'bg-orange-600 text-white border-transparent shadow shadow-orange-600/10'
                            : 'bg-stone-50 text-stone-600 border-stone-150 hover:bg-stone-100'
                        }`}
                      >
                        {preset === selectedChild.suggestedAmount ? `₹${preset} (Basic)` : preset === selectedChild.suggestedAmount * 2 ? `₹${preset} (Silver)` : `₹${preset} (Gold)`}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Slider */}
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-bold text-stone-400">₹</span>
                    <input 
                      type="number"
                      placeholder="Enter Custom Amount"
                      value={sponsorAmount}
                      onChange={(e) => setSponsorAmount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-4.5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold text-lg text-stone-850"
                    />
                  </div>
                </div>

                {/* Sponsoring Frequency Option */}
                <div className="flex gap-4 bg-stone-50 p-1 rounded-2xl border border-stone-150">
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      frequency === 'monthly'
                        ? 'bg-stone-900 text-white shadow'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <CheckCircle2 size={13} className="text-orange-500" /> Support Monthly (Recurring Intent)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      frequency === 'one-time'
                        ? 'bg-stone-900 text-white shadow'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Sponsor One-Time Support
                  </button>
                </div>

                {/* Donor Contact Bio Information Form */}
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase text-stone-400 tracking-wider font-mono">Donor Identification Details</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                        <User size={15} />
                      </span>
                      <input 
                        type="text"
                        placeholder="Your Full Name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full pl-11 pr-4 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/15 text-stone-950 text-sm font-medium"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                        <Phone size={15} />
                      </span>
                      <input 
                        type="tel"
                        placeholder="WhatsApp / Phone Number"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/15 text-stone-950 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                      <Mail size={15} />
                    </span>
                    <input 
                      type="email"
                      placeholder="Your Email Address"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/15 text-stone-950 text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Sponsoring Direct Guarantee */}
                <div className="bg-emerald-50/70 border border-emerald-100/80 rounded-2xl p-4 flex gap-3 text-left">
                  <ShieldCheck size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-emerald-900 leading-relaxed font-medium">
                    <strong className="block font-bold mb-0.5">Tax Saving Advantage under Section 80G</strong>
                    Sponsorship with Jeevan Chetna Foundation is eligible for immediate 50% Indian Income Tax rebate benefits. A custom certificate of contribution will be delivered to your email post compliance process.
                  </p>
                </div>

                {/* Unified Razorpay Action Call Button */}
                <button
                  type="button"
                  onClick={handleSponsorPayment}
                  className="w-full bg-orange-600 hover:bg-orange-700 active:scale-[0.99] text-white py-4.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all select-none shadow hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <CreditCard size={16} /> Complete Contribution of ₹{sponsorAmount}
                </button>

                {/* Offline alternative */}
                <div className="pt-4 border-t border-stone-100 text-center">
                  <p className="text-[11px] text-stone-500">
                    Prefer direct bank transfers? Send ₹{sponsorAmount} to <strong>Account No: {BANK_DETAILS.accountNo}</strong> (IFSC: {BANK_DETAILS.ifsc}) <br />
                    and share screenshot on WhatsApp support <span className="text-orange-600 font-bold">{CONTACT_INFO.whatsapp}</span>
                  </p>
                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Sponsor;
