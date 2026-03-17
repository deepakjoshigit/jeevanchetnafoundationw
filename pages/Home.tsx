
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight, ShieldCheck, Users, Globe, Smile, ChevronLeft, ChevronRight, Award, Facebook, Quote } from 'lucide-react';
import { INITIATIVES, IMAGES, DONORS, IMPACT_STORIES } from '../constants';

const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    
    let totalMiliseconds = 2000;
    let incrementTime = (totalMiliseconds / end) > 10 ? (totalMiliseconds / end) : 10;
    
    let timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <>{count.toLocaleString()}{suffix}</>;
};

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.heroSlider.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % IMAGES.heroSlider.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + IMAGES.heroSlider.length) % IMAGES.heroSlider.length);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Image Slider Top, Text Bottom */}
      <section className="bg-stone-900">
        {/* Top: Image Slider */}
        <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={IMAGES.heroSlider[currentSlide]}
                className="w-full h-full object-cover"
                alt={`Slide ${currentSlide + 1}`}
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = IMAGES.placeholder }}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10"></div>
          
          {/* Slider Controls - Game Style */}
          <div className="absolute bottom-8 left-8 right-8 z-40 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-orange-600 font-mono font-bold text-lg">0{currentSlide + 1}</span>
              <div className="w-32 h-[2px] bg-white/10 relative">
                <motion.div 
                  initial={false}
                  animate={{ width: `${((currentSlide + 1) / IMAGES.heroSlider.length) * 100}%` }}
                  className="absolute top-0 left-0 h-full bg-orange-600 shadow-[0_0_10px_#ea580c]"
                />
              </div>
              <span className="text-white/40 font-mono text-xs">0{IMAGES.heroSlider.length}</span>
            </div>

            <div className="flex gap-2">
              {IMAGES.heroSlider.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rotate-45 border transition-all duration-500 ${
                    index === currentSlide ? 'bg-orange-600 border-orange-600 scale-125' : 'border-white/30 hover:border-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Text Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-30">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-bold uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(234,88,12,0.4)]"
            >
              <Heart size={16} className="fill-current" /> Empowering Uttarakhand
            </motion.div>
            
            <div className="overflow-hidden mb-8">
              <motion.h1 
                initial={{ y: "100%", skewY: 10 }}
                whileInView={{ y: 0, skewY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-9xl font-serif font-black text-white leading-[0.85] tracking-tighter"
              >
                BUILDING <br />
                <span className="text-orange-600 italic">FUTURES</span>
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-stone-200 mb-12 leading-relaxed max-w-2xl font-light"
            >
              Jeevan Chetna Foundation is dedicated to digital literacy, hunger relief, and environmental preservation in the heart of the Himalayas.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link
                to="/donate"
                className="group relative bg-orange-600 text-white px-12 py-6 rounded-none font-black text-xl uppercase tracking-widest overflow-hidden transition-all hover:bg-orange-700 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Mission <ArrowRight size={24} />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                />
              </Link>
              <Link
                to="/impact-stories"
                className="group relative bg-white/5 backdrop-blur-xl text-white border border-white/20 px-12 py-6 rounded-none font-black text-xl uppercase tracking-widest overflow-hidden transition-all hover:bg-white/10 active:scale-95"
              >
                <span className="relative z-10">Read Archive</span>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-600 group-hover:w-full transition-all duration-500" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Mobile Donate Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Link
          to="/donate"
          className="bg-orange-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl animate-bounce hover:animate-none active:scale-90 transition-transform"
        >
          <Heart size={24} className="fill-white" />
        </Link>
      </div>

      {/* Stats Section - Bento Grid Style */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 md:row-span-2 bg-orange-600 rounded-[2.5rem] p-12 text-white flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                  <Heart size={32} className="fill-white" />
                </div>
                <h3 className="text-4xl font-serif font-bold mb-4">Making a Real Difference</h3>
                <p className="text-orange-100 text-lg max-w-sm">
                  Our foundation works tirelessly to ensure that every child has access to education and every family has food on their table.
                </p>
              </div>
              <div className="relative z-10 mt-12">
                <div className="text-6xl font-bold mb-2"><Counter value={10000} suffix="+" /></div>
                <div className="text-orange-200 font-medium uppercase tracking-widest text-sm">Lives Impacted Annually</div>
              </div>
            </motion.div>

            {[
              { label: 'Children Educated', value: 500, suffix: '+', icon: <Users size={24} />, color: 'bg-blue-50 text-blue-600' },
              { label: 'Meals Served', value: 10000, suffix: '+', icon: <Globe size={24} />, color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Trees Planted', value: 2000, suffix: '+', icon: <ShieldCheck size={24} />, color: 'bg-stone-50 text-stone-600' },
              { label: 'Happy Lives', value: 1000, suffix: '+', icon: <Smile size={24} />, color: 'bg-amber-50 text-amber-600' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-6`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Initiatives Section - Modern Cards */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-stone-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4 block">What We Do</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
                Our Core <span className="text-orange-600 italic">Initiatives</span>
              </h2>
            </div>
            <p className="text-gray-600 text-xl max-w-md">
              We focus on the most critical pillars of society to create a holistic and sustainable impact in Uttarakhand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIATIVES.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group relative h-[500px] rounded-[2.5rem] overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={item.title} 
                    onError={(e) => { e.currentTarget.src = IMAGES.placeholder }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                </div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:bg-orange-600 group-hover:border-orange-500 transition-colors duration-500">
                    {React.cloneElement(item.icon as any, { className: "w-7 h-7 text-white" })}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {item.description}
                  </p>
                  <Link to="/work" className="inline-flex items-center gap-2 text-white font-bold text-sm group/link">
                    Explore Program <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Video Section - Immersive */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 rounded-[3.5rem] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-12 md:p-20 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 text-orange-500 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-orange-600/30"
                >
                  <Smile size={16} /> Moments of Joy
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                  Voices of <span className="text-orange-600 italic">Impact</span>
                </h2>
                <p className="text-stone-400 text-xl leading-relaxed mb-10">
                  Watch this heart-warming moment of a young girl at our NGO, expressing her joy and learning through a beautiful poem. This is why we do what we do.
                </p>
                <div className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                  <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                    <Smile size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Empowering Through Art</h4>
                    <p className="text-stone-500">A girl reading and singing a poem in our NGO.</p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video lg:aspect-square h-full">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/wAgrUzgcmQQ?si=aJIuwUOiR-beztFM" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Latest Impact Stories */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
            <div>
              <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4 block">Real Stories</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Voices of <span className="text-orange-600 italic">Change</span></h2>
            </div>
            <Link to="/impact-stories" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all group">
              View All Stories <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {IMPACT_STORIES.slice(0, 1).map((story) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative">
                  <img 
                    src={story.images[0]} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={story.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Digital Glitch Overlay on Hover */}
                  <div className="absolute inset-0 bg-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]"></div>
                </div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-serif font-bold mb-2">{story.title}</h3>
                  <p className="text-white/80 line-clamp-2 mb-4">{story.excerpt}</p>
                  <Link to={`/impact-stories/${story.id}`} className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-orange-600 hover:text-white transition-all">
                    Read Full Story
                  </Link>
                </div>
              </motion.div>
            ))}

            <div className="space-y-12">
              <div className="p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100 relative">
                <Quote className="absolute top-6 right-8 text-stone-200 w-16 h-16" />
                <p className="text-xl font-serif italic text-gray-800 relative z-10 leading-relaxed mb-6">
                  "जब बच्चे पहली बार कंप्यूटर चलाते हैं, उनकी आँखों में जो चमक होती है, वही हमारी सबसे बड़ी सफलता है।"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-orange-100">
                    <img src="https://lh3.googleusercontent.com/d/1-djoBnZqkFTW8wFeHY189SuC6uQk70hT" className="w-full h-full object-cover" alt="Pravin Pandey" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Pravin Pandey</h4>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Founder & Director</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 bg-orange-50 rounded-[2rem] border border-orange-100">
                  <h4 className="text-4xl font-bold text-orange-600 mb-2">500+</h4>
                  <p className="text-gray-600 font-medium">Students empowered with digital skills</p>
                </div>
                <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                  <h4 className="text-4xl font-bold text-blue-600 mb-2">100%</h4>
                  <p className="text-gray-600 font-medium">Transparency in every donation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Donors Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-stone-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              <Award size={16} /> Wall of Kindness
            </div>
            <h2 className="text-5xl font-serif font-bold text-gray-900 mb-4">Our Generous <span className="text-orange-600 italic">Donors</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">
              We are deeply grateful to these individuals and organizations whose support fuels our mission.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DONORS.map((donor, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                    <Heart size={28} className={donor.amount >= 5000 ? "fill-current" : ""} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{donor.name}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Supporter</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">₹{donor.amount.toLocaleString()}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-12 bg-stone-900 rounded-[3rem] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-serif font-bold mb-6">Be the Change Today</h3>
              <p className="text-stone-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Your contribution, no matter the size, helps us provide education, food, and a better future for those in need in Uttarakhand.
              </p>
              <Link to="/donate" className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-2xl hover:scale-105">
                Join the Wall of Kindness <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Social Updates Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              <Facebook size={16} /> Latest Updates
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Connect With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Follow our journey and stay updated with our latest activities on social media.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden max-w-full">
              <iframe 
                src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fjeevanchetnafoundation%2Fposts%2Fpfbid02vJAHeGLd1G7MKqxVaw9PgAnvS9aVq2v9hDST61Uxhj8C33fUMxnSDJwzxfUmo9vfl&show_text=true&width=500" 
                width="500" 
                height="500" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="max-w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold mb-2">Ready to change a life?</h2>
            <p className="text-orange-100">Your small contribution can create a massive impact.</p>
          </div>
          <Link to="/donate" className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Give Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
