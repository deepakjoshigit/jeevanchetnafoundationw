
import React from 'react';
import { motion } from 'motion/react';
import { Heart, Award, Star, TrendingUp, Users } from 'lucide-react';
import { DONORS } from '../constants';

const Donors: React.FC = () => {
  // Calculate total impact (just for visual flair)
  const totalDonors = DONORS.length;
  const totalAmount = DONORS.reduce((acc, donor) => acc + donor.amount, 0);

  return (
    <div className="flex flex-col">
      {/* Hero Section (Bright & Clean) */}
      <section className="relative py-24 md:py-32 bg-stone-50 overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=2000" 
            alt="Giving" 
            className="w-full h-full object-cover grayscale opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-50/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/10 text-orange-600 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-orange-600/20"
            >
              <Heart size={16} /> Our Supporters
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-bold text-stone-900 leading-tight mb-8"
            >
              The Pillars of Our <span className="text-orange-600 italic">Mission</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-stone-600 leading-relaxed font-light"
            >
              We are deeply grateful to the individuals and organizations whose generosity fuels our work. Every contribution brings us closer to a hunger-free and digitally literate Uttarakhand.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-stone-100 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                <Users size={32} />
              </div>
              <div>
                <p className="text-stone-500 text-sm font-bold uppercase tracking-wider">Total Donors</p>
                <p className="text-3xl font-serif font-bold text-stone-900">{totalDonors}+</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <TrendingUp size={32} />
              </div>
              <div>
                <p className="text-stone-500 text-sm font-bold uppercase tracking-wider">Total Support</p>
                <p className="text-3xl font-serif font-bold text-stone-900">₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <Award size={32} />
              </div>
              <div>
                <p className="text-stone-500 text-sm font-bold uppercase tracking-wider">Impact Created</p>
                <p className="text-3xl font-serif font-bold text-stone-900">100% Direct</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donors List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Our Honorable <span className="text-orange-600 italic">Donors</span></h2>
            <p className="text-stone-600 max-w-2xl mx-auto">Acknowledging the kind souls who have contributed to our cause. Your support is our strength.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DONORS.sort((a, b) => b.amount - a.amount).map((donor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <Star size={20} fill={index < 3 ? "currentColor" : "none"} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors">{donor.name}</h3>
                    <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Contributor</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-serif font-bold text-stone-900">₹{donor.amount.toLocaleString('en-IN')}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-12 bg-orange-600 rounded-[3rem] text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Become a Part of the Change</h2>
              <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">Your small contribution can provide a meal or a book to someone in need. Join our mission today.</p>
              <a 
                href="/donate"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-stone-100 transition-all shadow-xl"
              >
                Donate Now <TrendingUp size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donors;
