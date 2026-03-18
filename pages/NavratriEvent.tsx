
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Share2, Calendar, MapPin, Users } from 'lucide-react';

const NavratriEvent: React.FC = () => {
  const eventImage = "https://lh3.googleusercontent.com/d/1EaZMI5stBFVWpI63F_2Wh3yNEOECW-EL";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'चैत्र नवरात्रि दान उत्सव - जीवन चेतना फाउंडेशन',
        text: 'इस पावन पर्व पर जरूरतमंद बच्चों के जीवन में खुशियां लाएं। हमारे नवरात्रि विशेष दान अभियान से जुड़ें।',
        url: window.location.href,
      });
    } else {
      alert('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20 pb-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-stone-950">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-stone-950"
        >
          <img 
            src={eventImage} 
            alt="Navratri Event" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 text-orange-500 rounded-full text-sm font-bold uppercase tracking-widest border border-orange-600/30 backdrop-blur-md">
              विशेष आयोजन • Special Event
            </div>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white leading-tight">
              चैत्र नवरात्रि <br />
              <span className="text-orange-600 italic">दान उत्सव</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto font-light leading-relaxed">
              इस पावन पर्व पर जरूरतमंद बच्चों के जीवन में खुशियां लाएं। <br className="hidden md:block" />
              आपका एक छोटा सा दान किसी बच्चे का भविष्य संवार सकता है।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Details */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-8 bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-stone-100"
          >
            <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed">
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-8">बच्चों के लिए खुशियों की नवरात्रि</h2>
              <p className="text-xl mb-8">
                चैत्र नवरात्रि के शुभ अवसर पर <strong>जीवन चेतना फाउंडेशन</strong> द्वारा गरीब और असहाय बच्चों के लिए भोजन और शिक्षा सहायता का विशेष अभियान चलाया जा रहा है। 
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="p-8 bg-orange-50 rounded-3xl border border-orange-100">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Heart size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 mb-2">कन्या पूजन एवं भोजन</h4>
                  <p className="text-stone-600">अष्टमी और नवमी के दिन कन्या पूजन और विशेष भोजन वितरण का आयोजन।</p>
                </div>
                <div className="p-8 bg-stone-50 rounded-3xl border border-stone-200">
                  <div className="w-12 h-12 bg-stone-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Users size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 mb-2">शिक्षा सामग्री वितरण</h4>
                  <p className="text-stone-600">जरूरतमंद बच्चों को स्कूल बैग, किताबें और अन्य शिक्षण सामग्री प्रदान करना।</p>
                </div>
              </div>

              <p className="mb-8">
                नवरात्रि शक्ति और भक्ति का पर्व है। इस दौरान दान का विशेष महत्व माना गया है। हमारे फाउंडेशन का लक्ष्य है कि उत्तराखंड के दूर-दराज के क्षेत्रों में रहने वाले उन बच्चों तक मदद पहुंचाई जाए जो बुनियादी सुविधाओं से वंचित हैं।
              </p>

              <div className="bg-stone-900 text-white p-10 rounded-[2.5rem] mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 rounded-full blur-[60px] opacity-20"></div>
                <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">आपका योगदान क्यों जरूरी है?</h3>
                <ul className="space-y-4 relative z-10 text-stone-300">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>₹500 से एक बच्चे को पूरे नवरात्रि का पौष्टिक भोजन मिल सकता है।</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>₹1100 से एक बच्चे की शिक्षा सामग्री का खर्च उठाया जा सकता है।</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2.5 shrink-0"></div>
                    <span>₹2100 से एक परिवार को राशन किट प्रदान की जा सकती है।</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 border-2 border-dashed border-stone-200 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-stone-100 rounded-2xl">
                    <Share2 className="text-stone-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900">इस संदेश को फैलाएं</h5>
                    <p className="text-sm text-stone-500">दूसरों को प्रेरित करने के लिए साझा करें</p>
                  </div>
                </div>
                <button 
                  onClick={handleShare}
                  className="w-full md:w-auto px-8 py-3 bg-stone-900 text-white rounded-full font-bold hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
                >
                  Share Event <Share2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar / CTA */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-orange-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-orange-600/30 sticky top-32"
            >
              <h3 className="text-3xl font-serif font-bold mb-6">अभी दान करें</h3>
              <p className="mb-8 text-orange-100 leading-relaxed">
                आपका दान सुरक्षित है और सीधे बच्चों की मदद के लिए उपयोग किया जाएगा। डिजिटल माध्यम से तुरंत दान करें।
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <Calendar className="text-orange-200" size={20} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-orange-200">अवधि</p>
                    <p className="font-bold">चैत्र नवरात्रि (9 दिन)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  <MapPin className="text-orange-200" size={20} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-orange-200">स्थान</p>
                    <p className="font-bold">हल्द्वानी एवं ग्रामीण क्षेत्र</p>
                  </div>
                </div>
              </div>

              <Link 
                to="/donate" 
                className="w-full bg-white text-orange-600 py-5 rounded-full font-bold text-xl hover:bg-stone-100 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                Donate Now <ArrowRight />
              </Link>
              
              <p className="mt-6 text-center text-xs text-orange-100/60 italic">
                सभी दान आयकर की धारा 80G के तहत कर मुक्त हैं।
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-xl overflow-hidden relative"
            >
              <div className="relative z-10">
                <h4 className="text-xl font-serif font-bold text-stone-900 mb-4">संपर्क करें</h4>
                <p className="text-stone-500 text-sm mb-6">अधिक जानकारी के लिए हमें कॉल या व्हाट्सएप करें।</p>
                <a 
                  href="tel:+919012146420" 
                  className="flex items-center gap-3 text-stone-900 font-bold mb-4 hover:text-orange-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
                    <Users size={18} />
                  </div>
                  +91 9012146420
                </a>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-stone-50 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery / Visuals */}
      <section className="py-24 bg-stone-100 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">अभियान की झलक</h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-[3rem] overflow-hidden shadow-2xl h-[500px] bg-stone-950"
            >
              <img 
                src={eventImage} 
                alt="Navratri Drive" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white p-12 rounded-[3rem] shadow-xl flex flex-col justify-center">
                <h3 className="text-3xl font-serif font-bold text-stone-900 mb-6 italic">"सेवा ही परमो धर्म:"</h3>
                <p className="text-stone-600 text-lg leading-relaxed">
                  हमारा उद्देश्य केवल भोजन देना नहीं, बल्कि बच्चों के चेहरों पर मुस्कान लाना और उन्हें यह महसूस कराना है कि समाज उनके साथ खड़ा है। इस नवरात्रि, आइए मिलकर एक बदलाव लाएं।
                </p>
              </div>
              <div className="bg-orange-600 p-12 rounded-[3rem] shadow-xl text-white flex items-center justify-between">
                <div>
                  <h4 className="text-4xl font-bold mb-2">100+</h4>
                  <p className="text-orange-100 uppercase tracking-widest text-xs font-bold">बच्चों का लक्ष्य</p>
                </div>
                <Heart size={48} className="text-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NavratriEvent;
