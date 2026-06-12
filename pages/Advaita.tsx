import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  Check, 
  MessageSquare, 
  Info, 
  ArrowRight, 
  Leaf, 
  Sparkles, 
  Gift, 
  RotateCcw,
  Heart,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  CreditCard,
  Percent,
  HelpCircle,
  Clock,
  ExternalLink,
  FileSpreadsheet,
  Lock,
  RefreshCw,
  LogIn,
  LogOut,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { googleSignIn, logout, initAuth, getAccessToken } from '../firebase';

interface CartItem {
  product: Product;
  quantity: number;
}


// Custom Promotion Banners for the Advaita Slider
const PROMO_SLIDERS = [
  {
    id: 1,
    title: "Celestial Mountain Harvest",
    subtitle: "Organic Himalayan Elixirs",
    description: "Cold-extracted single-origin raw honey of wildflower orchards. Pure, unfiltered nectar crafted at 7,000 feet directly by sovereign women co-operatives.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1200",
    badge: "100% Native SHG-Sourced",
    accent: "text-amber-500",
    bgGradient: "from-amber-950/90 via-stone-900/80 to-transparent"
  },
  {
    id: 2,
    title: "Heritage Almora Coppersmiths",
    subtitle: "Sacred Metalware Craft",
    description: "Hand-hammered pristine copper carafes & jugs. Direct livelihood preservation of traditional coppersmith families endangered by mass-factory mechanization.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
    badge: "400-Year Ancestral Heritage",
    accent: "text-orange-400",
    bgGradient: "from-orange-950/90 via-stone-900/80 to-transparent"
  },
  {
    id: 3,
    title: "Rich Terroir Ground Masale",
    subtitle: "Stone-Ground Ayurvedic Spices",
    description: "Authentic Kumaoni Jakhiya tempering, sun-cured high-curcumin turmeric, and sub-alpine lemongrass blends for conscious home wellness masters.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200",
    badge: "Direct Farmer Premium Pay",
    accent: "text-emerald-400",
    bgGradient: "from-emerald-950/90 via-stone-900/80 to-transparent"
  }
];

const FAQ_ITEMS = [
  {
    question: "What does are the revenue share percentages for 'Advaita' products?",
    answer: "We represent a strict fair-trade initiative under the Jeevan Chetna Foundation. Exactly 100% of the sales profit of these products is credited directly to the bank accounts of our rural women self-help cooperatives (SHGs), traditional weavers, and artisan groups."
  },
  {
    question: "Where are these items dispatched from, and what is the delivery timeline?",
    answer: "Each item is carefully packed and dispatched directly from Haldwani and our sub-alpine collection centers in Almora. We deliver for FREE across Bharat within 4 to 7 working days."
  },
  {
    question: "Can I pay via UPI scan, and how does the ordering system work?",
    answer: "Yes! Since we are a strictly non-broker foundation, we integrate a direct checkout option. When you choose check-out, we generate an official purchase slip and open WhatsApp so you can coordinate shipments directly with our NGO desk. We provide a scan-to-pay GPay/Paytm QR Code to credit payments directly to our registered SBI cooperative banking account."
  },
  {
    question: "Are the spices grown organically?",
    answer: "Absolutely. All Advaita agricultural harvests are cultivated on high-altitude terraced fields of Uttarakhand. No synthetic chemical pesticides, toxic inputs, or industrial processing is ever utilized."
  }
];

const Advaita: React.FC = () => {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<'shop' | 'impact' | 'help' | 'sheets'>('shop');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'honey' | 'craft' | 'masale'>('all');
  
  // Google Sheets Integration State
  const [sheetsLoggedIn, setSheetsLoggedIn] = useState(false);
  const [sheetsUser, setSheetsUser] = useState<any>(null);
  const [spreadsheetId, setSpreadsheetId] = useState<string>(() => {
    return localStorage.getItem('advaita_spreadsheet_id') || '';
  });
  const [spreadsheetName, setSpreadsheetName] = useState<string>('');
  const [isLinkingSheet, setIsLinkingSheet] = useState(false);
  const [sheetsLoadingMessage, setSheetsLoadingMessage] = useState<string>('');
  const [recentSheetsLogs, setRecentSheetsLogs] = useState<any[]>([]);
  const [sheetsProducts, setSheetsProducts] = useState<Product[]>([]);
  const [useSheetsCatalog, setUseSheetsCatalog] = useState(false);

  // Advanced Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'default' | 'priceLowHigh' | 'priceHighLow' | 'rating'>('default');
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Cart states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [justAddedProduct, setJustAddedProduct] = useState<string | null>(null);
  
  // Intermediary details modal
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  
  // Checkout Modal status
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPincode, setCheckoutPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState('');

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMO_SLIDERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Sync session on mount / update
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setSheetsLoggedIn(true);
        setSheetsUser(user);
        if (spreadsheetId) {
          fetchSpreadsheetMetadata(spreadsheetId, token);
        }
      },
      () => {
        setSheetsLoggedIn(false);
        setSheetsUser(null);
      }
    );
    return () => unsubscribe();
  }, [spreadsheetId]);


  const fetchSpreadsheetMetadata = async (sheetId: string, token: string) => {
    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error("Could not retrieve spreadsheet metadata. Check ID or permission.");
      }
      const data = await response.json();
      setSpreadsheetName(data.properties.title);
      loadRecentRegisteredOrders(sheetId, token);
    } catch (err: any) {
      console.error(err);
      setSheetsLoadingMessage("Spreadsheet error: " + err.message);
    }
  };

  const loadRecentRegisteredOrders = async (sheetId: string, token: string) => {
    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Orders!A2:K30`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        if (result.values) {
          const formatted = result.values.map((row: any, idx: number) => ({
            id: row[0] || `ORD-${idx}`,
            time: row[1] || 'Unknown',
            name: row[2] || 'Unknown',
            phone: row[3] || 'Unknown',
            items: row[7] || '',
            total: row[8] || '0',
            status: row[10] || 'Pending'
          })).reverse();
          setRecentSheetsLogs(formatted);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNewSpreadsheet = async () => {
    try {
      const token = await getAccessToken();
      if (!token) {
        alert("Please sign in with Google first!");
        return;
      }
      
      setIsLinkingSheet(true);
      setSheetsLoadingMessage("Creating a new Google Spreadsheet...");
      
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          properties: {
            title: "Advaita Co-operative Store Logs"
          },
          sheets: [
            { properties: { title: "Orders" } },
            { properties: { title: "Catalog" } }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to create spreadsheet.");
      }
      
      const spreadsheet = await response.json();
      const newSheetId = spreadsheet.spreadsheetId;
      
      localStorage.setItem('advaita_spreadsheet_id', newSheetId);
      setSpreadsheetId(newSheetId);
      setSpreadsheetName(spreadsheet.properties.title);
      
      setSheetsLoadingMessage("Configuring worksheets & table headers...");
      
      // Setup orders worksheet headers
      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${newSheetId}/values/Orders!A1:K1?valueInputOption=USER_ENTERED`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          range: "Orders!A1:K1",
          majorDimension: "ROWS",
          values: [[
            "Order ID", 
            "Timestamp", 
            "Customer Name", 
            "WhatsApp Phone", 
            "Email Address", 
            "Physical Landmark/Address", 
            "Pincode", 
            "Items Ordered", 
            "Grand Total Payable (₹)", 
            "Payment Method Preferred",
            "Fulfillment Status"
          ]]
        })
      });

      // Setup catalog sheets headers
      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${newSheetId}/values/Catalog!A1:J1?valueInputOption=USER_ENTERED`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          range: "Catalog!A1:J1",
          majorDimension: "ROWS",
          values: [[
            "Item ID",
            "Product Name", 
            "Category (honey, craft, masale)", 
            "Price (INR)", 
            "Weight / Pack size", 
            "Short Description",
            "Purity Details (comma separated)",
            "Product Image URL",
            "Availability Status",
            "Livelihood Eco Impact"
          ]]
        })
      });

      // Export default items
      const catalogRows = PRODUCTS.map(p => [
        p.id,
        p.name,
        p.category,
        p.price,
        p.weightOrSize,
        p.description,
        p.details.join(', '),
        p.image,
        p.availability,
        p.livelihoodImpact
      ]);

      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${newSheetId}/values/Catalog!A2:J${PRODUCTS.length + 1}?valueInputOption=USER_ENTERED`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          range: `Catalog!A2:J${PRODUCTS.length + 1}`,
          majorDimension: "ROWS",
          values: catalogRows
        })
      });
      
      setSheetsLoadingMessage("Spreadsheet initialized successfully! Your cooperative hub is active.");
      setTimeout(() => setSheetsLoadingMessage(""), 4000);
      
    } catch (err: any) {
      alert("Error initializing master sheet: " + err.message);
    } finally {
      setIsLinkingSheet(false);
    }
  };

  const handleLinkExistingSpreadsheet = async (sheetId: string) => {
    if (!sheetId.trim()) return;
    const token = await getAccessToken();
    if (!token) {
      alert("Please sign in with Google first.");
      return;
    }
    
    setIsLinkingSheet(true);
    setSheetsLoadingMessage("Linking existing spreadsheet...");
    try {
      await fetchSpreadsheetMetadata(sheetId.trim(), token);
      localStorage.setItem('advaita_spreadsheet_id', sheetId.trim());
      setSpreadsheetId(sheetId.trim());
      setSheetsLoadingMessage("Sheet linked successfully!");
      setTimeout(() => setSheetsLoadingMessage(""), 3000);
    } catch (err: any) {
      alert("Error linking sheet: " + err.message);
    } finally {
      setIsLinkingSheet(false);
    }
  };

  const handleFetchCatalogFromSheets = async () => {
    const token = await getAccessToken();
    if (!token || !spreadsheetId) {
      alert("Google Sheets must be connected first!");
      return;
    }
    
    setSheetsLoadingMessage("Downloading catalog from Google Sheet...");
    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Catalog!A2:J100`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error("Could not find the 'Catalog' tab. Please create a Spreadsheet first.");
      }
      
      const result = await response.json();
      if (!result.values || result.values.length === 0) {
        alert("No catalog items found. Add rows to your Google Sheet first.");
        return;
      }
      
      const importedProducts: Product[] = result.values.map((row: any) => {
        return {
          id: row[0] || Math.random().toString(36).substr(2, 9),
          name: row[1] || 'Unnamed Sheet Item',
          category: (row[2] === 'honey' || row[2] === 'craft' || row[2] === 'masale' ? row[2] : 'honey') as 'honey' | 'craft' | 'masale',
          price: parseFloat(row[3]) || 0,
          weightOrSize: row[4] || '1 Unit',
          description: row[5] || 'Product managed live in Google Sheets.',
          details: row[6] ? row[6].split(',').map((s: string) => s.trim()) : ['Direct from self-help co-ops'],
          image: row[7] || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38',
          availability: row[8] || 'In Stock',
          livelihoodImpact: row[9] || 'Section-8 fair-trade certified livelihood support.'
        };
      });
      
      setSheetsProducts(importedProducts);
      setUseSheetsCatalog(true);
      setSheetsLoadingMessage(`Co-op catalog active! Loaded ${importedProducts.length} items.`);
      setTimeout(() => setSheetsLoadingMessage(""), 4000);
    } catch (err: any) {
      alert("Error loading catalog: " + err.message);
    }
  };

  const handleResetToDefaultCatalog = () => {
    setUseSheetsCatalog(false);
    setSheetsProducts([]);
    setSheetsLoadingMessage("Reverted back to default local artisan products.");
    setTimeout(() => setSheetsLoadingMessage(""), 3000);
  };

  const handleGoogleSheetsLogin = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setSheetsLoggedIn(true);
        setSheetsUser(res.user);
        if (spreadsheetId) {
          fetchSpreadsheetMetadata(spreadsheetId, res.accessToken);
        }
      }
    } catch (err: any) {
      alert("Google Sign-In failed: " + err.message);
    }
  };

  const handleGoogleSheetsLogout = async () => {
    await logout();
    setSheetsLoggedIn(false);
    setSheetsUser(null);
    setSpreadsheetName('');
    setRecentSheetsLogs([]);
  };

  // Filter products based on Category, Search Query, and Price Range
  const filteredProducts = useMemo(() => {
    let result = [...(useSheetsCatalog ? sheetsProducts : PRODUCTS)];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    result = result.filter(p => p.price <= priceRange);

    if (sortOption === 'priceLowHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighLow') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      // Mock Sort by rating
      result.sort((a, b) => (b.price % 3) - (a.price % 3)); 
    }

    return result;
  }, [selectedCategory, searchQuery, priceRange, sortOption]);

  // Wishlist toggle
  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) 
      ? prev.filter(id => id !== productId) 
      : [...prev, productId]
    );
  };

  // Cart actions
  const addToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

    setJustAddedProduct(product.id);
    setTimeout(() => {
      setJustAddedProduct(null);
    }, 2000);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount);

  // Apply Sample Coupons
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'BHARAT') {
      setAppliedDiscount(10);
      setCouponMessage("10% NGO Solidarity Discount applied!");
    } else if (code === 'ADVAITA') {
      setAppliedDiscount(15);
      setCouponMessage("Special 15% First-time Harvest support applied!");
    } else {
      setCouponMessage("Invalid code. Try 'ADVAITA' or 'BHARAT' to support!");
      setAppliedDiscount(0);
    }
  };

  // Checkout order generation
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutPhone || !checkoutAddress || !checkoutPincode) {
      alert("Please fill in shipping name, phone, pincode and delivery address.");
      return;
    }

    setIsOrderPlaced(true);

    const orderId = `ORD-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 10)}`;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const orderItemsText = cart.map(item => 
      `🌱 ${item.quantity}x ${item.product.name} [${item.product.weightOrSize}] at ₹${item.product.price} each = ₹${item.product.price * item.quantity}`
    ).join('\n');

    const message = encodeURIComponent(
`🚩 *ADVAITA STORE - NEW ORDER (JCF NGO)*
----------------------------------------
Pranam! I would like to purchase these premium Himalayan indigenous goods:

*ORDER ID:* ${orderId}
----------------------------------------

*ORDERED ITEMS:*
${orderItemsText}

*BILLING:*
• Subtotal: ₹${subtotal}
• Coupon Discount: ${appliedDiscount > 0 ? `${appliedDiscount}% (-₹${discountAmount})` : 'None'}
• Total Supports Payable: ₹${grandTotal}
• Payment Choice: ${paymentMethod === 'upi' ? 'Online UPI (Direct Scan)' : 'Cash on Delivery (COD)'}

*DELIVERY DETAILS:*
• Name: ${checkoutName}
• WhatsApp: ${checkoutPhone}
• Email: ${checkoutEmail || 'Not Provided'}
• Landmark/Address: ${checkoutAddress}
• Pincode & City/State: ${checkoutPincode}

_Thank you for protecting mountain ecosystems & supporting village self-reliance!_ ⛰️🌿`
    );

    // Write to Google Sheets if connected
    const token = await getAccessToken();
    if (token && spreadsheetId) {
      try {
        const itemSummaries = cart.map(item => `${item.quantity}x ${item.product.name}`).join(', ');
        const rowData = [
          orderId,
          timestamp,
          checkoutName,
          checkoutPhone,
          checkoutEmail || 'N/A',
          checkoutAddress,
          checkoutPincode,
          itemSummaries,
          grandTotal,
          paymentMethod === 'upi' ? 'UPI' : 'COD',
          'Processing'
        ];
        
        await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Orders:append?valueInputOption=USER_ENTERED`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            range: "Orders",
            majorDimension: "ROWS",
            values: [rowData]
          })
        });
        
        loadRecentRegisteredOrders(spreadsheetId, token);
      } catch (err) {
        console.error("Failed to append order to Google Sheets:", err);
      }
    }

    // Dynamic direct WhatsApp integration
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=919068528721&text=${message}&type=phone_number&app_absent=0`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  const handleResetOrder = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    setIsOrderPlaced(false);
    setCheckoutName('');
    setCheckoutPhone('');
    setCheckoutAddress('');
    setCheckoutEmail('');
    setCheckoutPincode('');
    setCouponCode('');
    setAppliedDiscount(0);
    setCouponMessage('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 select-none font-sans antialiased text-stone-800">
      
      {/* 1. Brand Banner with Custom Advaita Logo */}
      <section className="bg-stone-900 text-white relative border-b border-stone-800 py-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Advaita Custom Premium SV Logo */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl border border-amber-500/30 flex items-center justify-center text-amber-400">
              {/* SVG vector symbol for Advaita */}
              <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.625-.772-7.843-2.118m15.686 0A8.996 8.996 0 0012 7.5a8.996 8.996 0 00-7.843 1.118" />
              </svg>
            </div>
            
            <div className="text-left font-serif">
              <span className="text-[10px] text-amber-500 uppercase tracking-[0.4em] font-mono block font-bold mb-0.5">Indigenous Himalayan Platform</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-stone-100 tracking-tight leading-none">
                ADVAITA
              </h1>
              <span className="text-[11px] font-light text-stone-400 block tracking-widest uppercase mt-0.5">Premium Cooperative Commerce</span>
            </div>
          </div>

          {/* Flipkart-like Search Bar & Store Nav Buttons */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full md:w-auto justify-end">
            <div className="relative w-full max-w-sm md:w-80">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium honey, spices, crafts..." 
                className="w-full bg-stone-800 border border-stone-700 rounded-full py-2.5 pl-5 pr-11 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
              />
              <span className="absolute right-4 top-2.5 text-stone-500">
                <Search size={18} />
              </span>
            </div>

            {/* In-Store Visual Filters / Tabs */}
            <div className="flex bg-stone-800/80 border border-stone-700/60 rounded-full p-1.5 shrink-0 select-none overflow-x-auto max-w-full">
              <button 
                onClick={() => { setActiveTab('shop'); }}
                className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all uppercase tracking-wider whitespace-nowrap ${
                  activeTab === 'shop' 
                  ? 'bg-amber-500 text-stone-950 shadow' 
                  : 'text-stone-300 hover:text-white'
                }`}
              >
                Shop Store
              </button>
              <button 
                onClick={() => { setActiveTab('sheets'); }}
                className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all uppercase tracking-wider whitespace-nowrap ${
                  activeTab === 'sheets' 
                  ? 'bg-amber-500 text-stone-950 shadow' 
                  : 'text-stone-300 hover:text-white'
                }`}
              >
                Sheets Sync Hub
              </button>
              <button 
                onClick={() => { setActiveTab('impact'); }}
                className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all uppercase tracking-wider whitespace-nowrap ${
                  activeTab === 'impact' 
                  ? 'bg-amber-500 text-stone-950 shadow' 
                  : 'text-stone-300 hover:text-white'
                }`}
              >
                Livelihood Hub
              </button>
              <button 
                onClick={() => { setActiveTab('help'); }}
                className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all uppercase tracking-wider whitespace-nowrap ${
                  activeTab === 'help' 
                  ? 'bg-amber-500 text-stone-950 shadow' 
                  : 'text-stone-300 hover:text-white'
                }`}
              >
                FAQs
              </button>
            </div>
          </div>

        </div>
      </section>

      {activeTab === 'shop' && (
        <>
          {/* 2. Promo Slider Carousel (Flipkart Style) */}
          <section className="bg-stone-950 relative overflow-hidden min-h-[420px] md:min-h-[500px] flex items-center border-b border-stone-900">
            <AnimatePresence mode="wait">
              {PROMO_SLIDERS.map((slide, index) => {
                if (index !== currentSlide) return null;
                return (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 z-0 flex items-center"
                  >
                    <div className="absolute inset-x-0 w-full h-full">
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full h-full object-cover opacity-20 grayscale brightness-75 scale-100" 
                        referrerPolicy="no-referrer"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full text-left">
                      <div className="max-w-2xl text-white space-y-4">
                        
                        <motion.span 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="inline-block bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold font-mono uppercase text-[10px] tracking-widest px-3 py-1 rounded"
                        >
                          {slide.badge}
                        </motion.span>
                        
                        <motion.h2 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl md:text-6xl font-serif font-black tracking-tight leading-none text-stone-100"
                        >
                          {slide.title}
                        </motion.h2>

                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className={`block text-lg font-bold uppercase tracking-wider ${slide.accent} font-serif`}
                        >
                          {slide.subtitle}
                        </motion.span>

                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="text-stone-300 font-light text-sm md:text-base leading-relaxed text-pretty max-w-xl"
                        >
                          {slide.description}
                        </motion.p>

                        <motion.div 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="flex items-center gap-4 pt-4"
                        >
                          <button 
                            onClick={() => {
                              const el = document.getElementById('marketplace-anchor');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 active:scale-95"
                          >
                            Explore Harvest <ChevronRight size={14} />
                          </button>

                          <div className="flex gap-1">
                            {PROMO_SLIDERS.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                onClick={() => setCurrentSlide(dotIdx)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                  dotIdx === currentSlide ? 'bg-amber-500 w-8' : 'bg-stone-700 hover:bg-stone-500'
                                }`}
                              />
                            ))}
                          </div>
                        </motion.div>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </section>

          {/* 3. Flipkart Category Circles Strip */}
          <div className="bg-white border-b border-stone-200 py-8 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-6 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
                {[
                  { id: 'all', label: 'All Products', icon: '⛰️' },
                  { id: 'honey', label: 'Pure Honey', icon: '🍯' },
                  { id: 'masale', label: 'Pahari Spices', icon: '🌶️' },
                  { id: 'craft', label: 'Village Crafts', icon: '🎨' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedCategory(item.id as any);
                      const el = document.getElementById('marketplace-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex flex-col items-center gap-2 text-center shrink-0 min-w-[100px] group"
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
                      selectedCategory === item.id 
                      ? 'bg-amber-500/15 border-2 border-amber-500 scale-110 shadow-md ring-4 ring-amber-500/10' 
                      : 'bg-stone-50 border border-stone-200 hover:bg-amber-50 hover:border-amber-200 group-hover:scale-105'
                    }`}>
                      {item.icon}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      selectedCategory === item.id ? 'text-amber-600 font-extrabold' : 'text-stone-600 hover:text-stone-900'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Trust Bullet Strip */}
          <div className="bg-amber-50/50 border-b border-stone-200 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-amber-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Truck size={14} className="text-amber-600" /> Free Shipping Across India
              </div>
              <div className="flex items-center justify-center gap-2">
                <Leaf size={14} className="text-amber-600" /> 100% Certified Organic Roots
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-amber-600" /> Safe No-Broker Commerce
              </div>
              <div className="flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-amber-600" /> Women Artisan Co-Op Managed
              </div>
            </div>
          </div>

          {/* 5. Main Double Column Marketplace */}
          <main id="marketplace-anchor" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* FILTERS PANEL COLUMN */}
              <aside className="lg:col-span-3 space-y-8 bg-white border border-stone-200 rounded-[2rem] p-6 h-fit shadow-sm">
                
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                    <SlidersHorizontal size={18} className="text-amber-500" /> Filtering Panel
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setPriceRange(1500);
                      setSortOption('default');
                    }}
                    className="text-[10px] font-bold text-amber-600 uppercase tracking-widest hover:text-amber-700"
                  >
                    Reset All
                  </button>
                </div>

                {/* Filter section: Search */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block h-fit">Keyword Search</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. Honey, Coaster..." 
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Filter section: Sort options */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block pb-1">Sort Products By</label>
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-4 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  >
                    <option value="default">Direct Recommendation</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                    <option value="rating">Best Customer Ratings</option>
                  </select>
                </div>

                {/* Filter section: Price range */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    <span>Max Budget Limit</span>
                    <span className="text-amber-600 font-mono text-xs">₹{priceRange}</span>
                  </div>
                  <input 
                    type="range" 
                    min="150" 
                    max="1500" 
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] font-light text-stone-400">
                    <span>₹150</span>
                    <span>₹1,500</span>
                  </div>
                </div>

                {/* Static Trust Banner */}
                <div className="pt-6 border-t border-stone-100 space-y-4">
                  <div className="bg-amber-50 rounded-2xl p-4 flex gap-3">
                    <Sparkles className="text-amber-600 shrink-0 mt-0.5" size={16} />
                    <div className="text-[11px] leading-relaxed text-amber-900">
                      <strong>Traditional Aipan Folk Art</strong>
                      <p className="font-light text-amber-800">Every craft design leverages centuries-old red and white ritual geometry of rural Kumaon, providing honor and identity.</p>
                    </div>
                  </div>
                </div>

              </aside>

              {/* PRODUCTS CATALOG VIEW */}
              <div className="lg:col-span-9 space-y-12">
                
                {/* Meta Summary bar */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="text-stone-500 font-light text-xs">
                    Showing <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> premium organic items
                  </div>
                  <div className="flex gap-2">
                    {selectedCategory !== 'all' && (
                      <span className="bg-amber-50 text-amber-700 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-amber-200">
                        Category: {selectedCategory.toUpperCase()}
                      </span>
                    )}
                    {searchQuery.trim() && (
                      <span className="bg-stone-100 text-stone-700 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                        Search: "{searchQuery}"
                      </span>
                    )}
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-white border border-stone-200 rounded-[2.5rem] text-stone-400 space-y-4 shadow-sm">
                    <ShoppingBag size={54} className="mx-auto opacity-20 text-amber-500" />
                    <h3 className="font-serif font-bold text-stone-900 text-lg">No authentic products match your filter parameters</h3>
                    <p className="text-xs font-light max-w-sm mx-auto">Try resetting the budget limit or searching for other keywords like "Honey", "Basket", "Turmeric" or "Spices".</p>
                    <button 
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                        setPriceRange(1500);
                      }}
                      className="bg-stone-900 hover:bg-amber-500 text-white hover:text-stone-950 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all"
                    >
                      Reset Shopping Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layoutId={`card-${product.id}`}
                        onClick={() => setActiveDetailProduct(product)}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-[2.2rem] border border-stone-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative cursor-pointer"
                      >
                        <div>
                          
                          {/* Image Box */}
                          <div className="relative rounded-[1.6rem] overflow-hidden bg-stone-50 aspect-square mb-5 group">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Category Indicator pill */}
                            <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full font-bold text-[9px] uppercase tracking-wider text-amber-600 shadow-sm border border-amber-50">
                              {product.category === 'honey' ? '🍯 Celestial Honey' : product.category === 'craft' ? '🎨 Village Folk Handcraft' : '🌶️ Pahari Masale'}
                            </span>

                            {/* Bookmark Wishlist button */}
                            <button
                              onClick={(e) => toggleWishlist(product.id, e)}
                              className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-2.5 rounded-full shadow-sm text-stone-400 hover:text-red-500 active:scale-90 transition-colors"
                            >
                              <Heart 
                                size={14} 
                                className={wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''} 
                              />
                            </button>

                            {/* Quick view mouse hover display */}
                            <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-stone-900/90 text-white text-[9px] uppercase font-bold tracking-widest px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/10">
                                View Pure Story & Specifications
                              </span>
                            </div>
                          </div>

                          {/* Specific weight / content size and Star Ratings */}
                          <div className="flex items-center justify-between mb-1 text-[10px] font-mono font-medium uppercase text-stone-400 tracking-wider">
                            <span>{product.weightOrSize}</span>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star size={10} className="fill-amber-500" />
                              <Star size={10} className="fill-amber-500" />
                              <Star size={10} className="fill-amber-500" />
                              <Star size={10} className="fill-amber-500" />
                              <Star size={10} className="fill-amber-500" />
                              <span className="text-stone-500 text-[9px] ml-0.5">(5.0)</span>
                            </div>
                          </div>

                          <h3 className="text-lg font-serif font-black text-stone-900 group-hover:text-amber-600 mb-2 leading-snug line-clamp-2">
                            {product.name}
                          </h3>

                          <p className="text-stone-500 font-light text-xs line-clamp-2 leading-relaxed mb-4">
                            {product.description}
                          </p>
                        </div>

                        <div>
                          
                          {/* Bottom Row including direct Buy-Now and Add-to-cart */}
                          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                            <div>
                              <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold block leading-none mb-1">Direct Profit Pay</span>
                              <span className="text-2xl font-black text-stone-950">₹{product.price}</span>
                            </div>

                            <div className="flex gap-2">
                              {/* Direct checkout Buy-Now */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                  setIsCartOpen(true);
                                }}
                                className="bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl py-2.5 px-3.5 text-xs font-bold transition-all active:scale-95 flex items-center gap-1"
                                title="Buy Now"
                              >
                                Buy Now
                              </button>

                              {/* Add to cart icon */}
                              <button
                                onClick={(e) => addToCart(product, e)}
                                className="bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-850 rounded-xl p-2.5 transition-all active:scale-95 relative"
                                title="Add to Cart"
                              >
                                <ShoppingBag size={15} />
                              </button>
                            </div>
                          </div>

                          {/* Just added visual banner */}
                          <AnimatePresence>
                            {justAddedProduct === product.id && (
                              <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="text-[10px] text-emerald-600 font-bold mt-2.5 flex items-center gap-1.5 justify-center"
                              >
                                <Check size={12} /> Added to Advaita Checkout!
                              </motion.div>
                            )}
                          </AnimatePresence>

                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          </main>
        </>
      )}

      {activeTab === 'impact' && (
        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-amber-600 font-mono font-bold uppercase tracking-widest text-xs">Transforming Marginal Farming Clusters</span>
            <h2 className="text-4xl font-serif font-black text-stone-950">Mountain Livelihood Solidarity Hub</h2>
            <p className="text-stone-500 font-light text-sm leading-relaxed">
              Advaita bypasses standard broker cartels and distribution agents. 100% of our operations center on boosting rural banking independence across rural Uttarakhand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 bg-amber-500/15 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">🍯</div>
              <h3 className="text-xl font-serif font-bold text-stone-950">120+ Bee-keeping Farms</h3>
              <p className="text-xs font-light text-stone-500 leading-relaxed">Stable, healthy mountain beehives and nectar foragers safeguarded through certified scientific, cruelty-free collection training.</p>
            </div>

            <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 bg-amber-500/15 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">🌶️</div>
              <h3 className="text-xl font-serif font-bold text-stone-950">340+ Women SHG Members</h3>
              <p className="text-xs font-light text-stone-500 leading-relaxed">Direct self-governing cooperative banking units managed entirely by native women's networks in rural Kumaoni ridges.</p>
            </div>

            <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 bg-amber-500/15 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">🎨</div>
              <h3 className="text-xl font-serif font-bold text-stone-950">8 folk Art Centers</h3>
              <p className="text-xs font-light text-stone-500 leading-relaxed">Preserving the sacred white-and-brick-red ritual Aipan floor decals & woodcarving traditions via dedicated native training academies.</p>
            </div>
          </div>

          <div className="bg-stone-900 text-white rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
            <div className="absolute inset-0 bg-stone-950/60 mix-blend-multiply z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" 
              className="absolute inset-0 w-full h-full object-cover opacity-10" 
              alt="Sustainable agriculture Kumaon" 
              referrerPolicy="no-referrer"
            />
            
            <div className="relative z-10 space-y-6 md:w-2/3">
              <span className="text-amber-400 font-mono text-[10px] uppercase font-bold tracking-[0.25em]">Direct Action Mission</span>
              <h3 className="text-3xl font-serif font-extrabold text-stone-100 tracking-tight leading-tight">Every purchase stops mountain displacement and migration.</h3>
              <p className="text-sm font-light text-stone-350 leading-relaxed">
                By purchasing these pure harvest recipes under ADVAITA, you directly increase structural village viability. Native farmers gain regular, independent revenue flows directly into state-monitored SHG bank ledgers, allowing them to educate children and access medicine without leaving their ancestral homes.
              </p>
            </div>
            
            <div className="relative z-10 md:w-1/3 w-full shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 backdrop-blur-md">
                <span className="text-stone-300 font-bold uppercase font-mono text-[9px] tracking-widest block text-center">Verified NGO Certification</span>
                <hr className="border-white/10" />
                <div className="space-y-2 text-xs font-light">
                  <div className="flex justify-between">
                    <span>Broker Intermediaries:</span>
                    <span className="text-red-400 font-bold uppercase">0% (None)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Artisan Direct Portion:</span>
                    <span className="text-emerald-400 font-bold uppercase">100% of profit</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compliance:</span>
                    <span className="text-emerald-400 font-bold uppercase">Section 8 NGO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'help' && (
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-amber-600 font-mono font-bold uppercase tracking-widest text-xs">Customer Trust & Clarity</span>
            <h2 className="text-4xl font-serif font-black text-stone-950">Store Helper Center</h2>
            <p className="text-stone-500 font-light text-sm leading-relaxed">
              Find transparent answers to logistics, fair trade operations, packaging, and digital support schemes below.
            </p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-[3rem] p-8 md:p-12 shadow-sm">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="pb-6 border-b border-stone-100 last:border-b-0 last:pb-0 pt-6 first:pt-0">
                <h3 className="text-lg font-serif font-black text-stone-900 mb-2 flex items-center gap-2">
                  <HelpCircle size={18} className="text-amber-500 shrink-0" /> {faq.question}
                </h3>
                <p className="text-sm font-light text-stone-600 pl-7 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'sheets' && (
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-emerald-600 font-mono font-bold uppercase tracking-widest text-xs">Direct API Integration Hub</span>
            <h2 className="text-4xl font-serif font-black text-stone-950 flex items-center justify-center gap-3">
              <FileSpreadsheet className="text-emerald-600 animate-pulse" size={36} /> Google Sheets Sync Hub
            </h2>
            <p className="text-stone-500 font-light text-sm leading-relaxed">
              Empower your NGO operations with real-time Google Workspace integration. Sync store catalog prices directly from spreadsheet columns and log checkout orders live!
            </p>
          </div>

          {/* Quick status message */}
          {sheetsLoadingMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 max-w-xl mx-auto text-amber-805 text-xs font-semibold h-fit text-left"
            >
              <RefreshCw className="animate-spin text-amber-600 shrink-0" size={16} />
              <span>{sheetsLoadingMessage}</span>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left side settings card */}
            <div className="lg:col-span-5 space-y-8 h-fit">
              
              {/* Authentications panel */}
              <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 shadow-sm space-y-6 text-left">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <h3 className="text-lg font-serif font-black text-stone-900">1. Authenticate Account</h3>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider ${
                    sheetsLoggedIn 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-stone-100 text-stone-400'
                  }`}>
                    {sheetsLoggedIn ? "Authenticated" : "Unconnected"}
                  </span>
                </div>

                {!sheetsLoggedIn ? (
                  <div className="space-y-4">
                    <p className="text-xs text-stone-500 font-light leading-relaxed">
                      Log in using Google OAuth to allow Advaita to read catalog entries & record order transaction rows directly onto your Google Sheets.
                    </p>
                    <button
                      onClick={handleGoogleSheetsLogin}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-[0.982]"
                    >
                      <LogIn size={16} /> Sign in with Google
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-xl border border-stone-100">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold font-sans">
                        {sheetsUser?.displayName?.[0] || 'O'}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">{sheetsUser?.displayName || "Google Operator"}</span>
                        <span className="text-[10px] text-stone-400 block font-mono">{sheetsUser?.email || "cooperative@jeevanchetna.org"}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleGoogleSheetsLogout}
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all h-fit"
                    >
                      <LogOut size={16} /> Disconnect Google Session
                    </button>
                  </div>
                )}
              </div>

              {/* Bind Sheet Panel */}
              <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 shadow-sm space-y-6 text-left">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <h3 className="text-lg font-serif font-black text-stone-950">2. Link Spreadsheet</h3>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider ${
                    spreadsheetId 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-stone-100 text-stone-400'
                  }`}>
                    {spreadsheetId ? "Active Bind" : "No Bind"}
                  </span>
                </div>

                {!sheetsLoggedIn ? (
                  <div className="text-center py-6 text-stone-450 border border-dashed border-stone-200 rounded-2xl flex flex-col items-center gap-2">
                    <Lock size={20} className="text-stone-300" />
                    <span className="text-xs font-light">Authenticate with Google to connect spreadsheet ledger.</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {spreadsheetId && (
                      <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-xs">
                        <div className="flex justify-between font-bold text-emerald-800 mb-1">
                          <span>Active Spreadsheet Title:</span>
                        </div>
                        <span className="font-serif block font-bold text-stone-900 mb-2">{spreadsheetName || "Loading Metadata..."}</span>
                        <hr className="border-emerald-200/50 my-2" />
                        <span className="text-[9px] font-mono text-stone-400 block break-all leading-relaxed">
                          <strong>ID:</strong> {spreadsheetId}
                        </span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-[9px] font-extrabold uppercase tracking-widest text-stone-450 block h-fit">Spreadsheet ID Override</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="manual-sheet-id"
                          placeholder="PASTE_SPREADSHEET_ID"
                          className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500 flex-grow"
                        />
                        <button
                          onClick={() => {
                            const val = (document.getElementById('manual-sheet-id') as HTMLInputElement)?.value;
                            if (val) handleLinkExistingSpreadsheet(val);
                          }}
                          className="bg-stone-950 hover:bg-emerald-600 text-white rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Bind
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-px bg-stone-200 flex-grow"></div>
                      <span className="text-[9px] uppercase tracking-widest text-stone-400 font-extrabold shrink-0">Or Create Master Spreadsheet</span>
                      <div className="h-px bg-stone-200 flex-grow"></div>
                    </div>

                    <button
                      onClick={handleCreateNewSpreadsheet}
                      disabled={isLinkingSheet}
                      className="w-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Plus size={16} className="text-emerald-600" /> Create Auto-Configured Co-Op Spreadsheet
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Right side operational log panel */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Dynamic Catalog Panel */}
              <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div>
                    <h3 className="text-lg font-serif font-black text-stone-900">3. Catalog Price Controller</h3>
                    <p className="text-[10px] text-stone-400 font-light uppercase tracking-wider font-mono mt-0.5">Control live catalog from cloud database</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider ${
                    useSheetsCatalog 
                    ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                    : 'bg-stone-100 text-stone-500'
                  }`}>
                    {useSheetsCatalog ? "Google Sheets Sync On" : "Local Default Portfolio"}
                  </span>
                </div>

                {!spreadsheetId ? (
                  <div className="text-center py-8 text-stone-400 flex flex-col items-center gap-2">
                    <AlertTriangle size={24} className="text-amber-500 opacity-60" />
                    <span className="text-xs font-light text-stone-500 max-w-sm text-center">No spreadsheet bind is active. Create or Bind a spreadsheet above to override local prices.</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-stone-500 font-light leading-relaxed">
                      When active, you can modify prices, sizes, or availability statuses in the <strong className="text-emerald-700 font-bold">Catalog</strong> tab of your linked Google Sheet. Simply click sync below to apply updates globally on Advaita!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={handleFetchCatalogFromSheets}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
                      >
                        <RefreshCw size={14} /> Force Live Catalog Sync
                      </button>
                      <button
                        onClick={handleResetToDefaultCatalog}
                        className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <RotateCcw size={14} /> Restore Local Baseline
                      </button>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-[11px] leading-relaxed text-amber-900 font-light">
                      <strong className="font-bold">Artisan Co-Op Ledger Rule:</strong>
                      <p className="mt-1">For dynamic catalog sync to work, maintain the column headers on your Google Sheet. It allows the pricing script to locate Item ID, Price, and Availability states instantly!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Transactions display direct tracker */}
              <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div>
                    <h3 className="text-lg font-serif font-black text-stone-900">4. Live Store Order Registry</h3>
                    <p className="text-[10px] text-stone-400 font-light uppercase tracking-wider font-mono mt-0.5">Orders recorded automatically to "Orders" sheet tab</p>
                  </div>
                  <button
                    onClick={() => {
                      if (spreadsheetId) {
                        getAccessToken().then(tok => {
                          if (tok) loadRecentRegisteredOrders(spreadsheetId, tok);
                        });
                      }
                    }}
                    disabled={!spreadsheetId}
                    className="p-2 hover:bg-stone-50 rounded-lg text-emerald-600 border border-stone-200 flex items-center gap-1 text-[10px] uppercase tracking-wider font-black font-mono cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw size={10} /> Fetch Rows
                  </button>
                </div>

                {!spreadsheetId ? (
                  <div className="text-center py-10 text-stone-400 border border-dashed border-stone-200 rounded-2xl flex flex-col items-center gap-2">
                    <FileSpreadsheet size={32} className="text-stone-300 opacity-80" />
                    <span className="text-xs font-light">Active Spreadsheet required to print logged order receipts.</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    {recentSheetsLogs.length === 0 ? (
                      <div className="text-center py-8 text-stone-450 text-xs font-light">
                        No checkout rows detected under "Orders" tab. Place an order on the checkout screen to see rows populate instantly in Google Sheets!
                      </div>
                    ) : (
                      <table className="w-full text-xs font-light">
                        <thead>
                          <tr className="border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider text-[9px] text-left">
                            <th className="py-2 pr-4">Order ID</th>
                            <th className="py-2 pr-4">Timestamp</th>
                            <th className="py-2 pr-4">Customer</th>
                            <th className="py-2 pr-4">Cart Summary</th>
                            <th className="py-2 text-right">Payable</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentSheetsLogs.slice(0, 10).map((row, idx) => (
                            <tr key={idx} className="border-b border-stone-50 last:border-b-0">
                              <td className="py-3 pr-4 font-mono font-bold text-stone-900">{row.id}</td>
                              <td className="py-3 pr-4 font-mono text-stone-500 text-[10px]">{row.time}</td>
                              <td className="py-3 pr-4 font-medium text-stone-900">{row.name}</td>
                              <td className="py-3 pr-4 text-stone-500 truncate max-w-[150px]">{row.items}</td>
                              <td className="py-3 text-right font-mono font-extrabold text-amber-600">₹{row.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 6. Floating Persistent Cart Strip */}
      <AnimatePresence>
        {totalQuantity > 0 && (
          <motion.button
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 50 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-8 z-55 bg-stone-950 text-white p-5 rounded-full shadow-2xl flex items-center gap-3 font-bold border border-stone-800 transition-all cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart size={24} className="text-amber-400" />
              <span className="absolute -top-3.5 -right-3.5 bg-amber-500 text-stone-950 text-[10px] uppercase font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                {totalQuantity}
              </span>
            </div>
            <span className="text-xs tracking-wider uppercase font-bold pr-2 text-stone-200">Advaita Cart (₹{subtotal})</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 7. Cart Slider Panel (Slide out Drawer) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-100 transition-opacity"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-110 flex flex-col justify-between border-l border-stone-200"
            >
              {/* Header */}
              <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
                    <ShoppingCart size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-black text-stone-950">Advaita Checkout Cart</h3>
                    <p className="text-[10px] text-stone-400 font-light uppercase tracking-wider font-mono">100% direct-to-artisan fund</p>
                  </div>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-stone-950 transition-colors p-2 cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="p-8 space-y-6 flex-grow overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-stone-400 space-y-4">
                    <ShoppingBag size={48} className="mx-auto opacity-25 text-amber-500" />
                    <p className="font-light text-sm">Your organic cart is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs bg-stone-900 text-white rounded-full px-5 py-2.5 uppercase tracking-widest font-bold hover:bg-amber-500 hover:text-stone-950 transition-all cursor-pointer"
                    >
                      Browse Store Catalog
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 pb-6 border-b border-stone-100 last:border-b-0 last:pb-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-20 h-20 rounded-2xl object-cover border border-stone-150 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-grow space-y-1 text-left">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-stone-450 block">{item.product.weightOrSize}</span>
                        <h4 className="font-serif font-bold text-stone-900 leading-tight text-sm line-clamp-1">{item.product.name}</h4>
                        <p className="text-amber-600 font-bold text-sm">₹{item.product.price * item.quantity}</p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center bg-stone-100 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 hover:bg-white rounded text-stone-500 cursor-pointer">
                              <Minus size={10} />
                            </button>
                            <span className="px-3 text-xs font-bold text-stone-800">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 hover:bg-white rounded text-stone-500 cursor-pointer">
                              <Plus size={10} />
                            </button>
                          </div>

                          <button onClick={() => removeFromCart(item.product.id)} className="text-stone-400 hover:text-red-500 p-1.5 rounded-full cursor-pointer">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo code box & grand total */}
              {cart.length > 0 && (
                <div className="p-8 border-t border-stone-150 bg-stone-50 space-y-6">
                  
                  {/* Coupon section */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 block ml-0.5">Apply Devotion Coupon Promo</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Try 'ADVAITA' or 'BHARAT'"
                        className="bg-white border border-stone-200 rounded-xl px-4 py-2 text-xs uppercase font-mono focus:outline-none focus:border-amber-500 flex-grow"
                      />
                      <button 
                        onClick={applyCoupon}
                        className="bg-stone-900 text-white rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-stone-950 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMessage && (
                      <span className="text-[10px] block font-bold text-emerald-600 pl-0.5">{couponMessage}</span>
                    )}
                  </div>

                  <hr className="border-stone-200" />

                  <div className="space-y-2.5 text-sm text-left">
                    <div className="flex justify-between text-stone-500">
                      <span>Harvest Basket Subtotal:</span>
                      <span className="font-mono">₹{subtotal}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Cooperative Discount ({appliedDiscount}%):</span>
                        <span className="font-mono">-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-500">
                      <span>Logistics & Shipping:</span>
                      <span className="text-emerald-600 font-bold uppercase text-xs tracking-wider">Free Home Delivery</span>
                    </div>
                    <hr className="border-stone-200 pt-1" />
                    <div className="flex justify-between text-stone-950 font-black text-lg pt-1">
                      <span>Grand Total:</span>
                      <span className="font-mono text-amber-600">₹{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full bg-amber-500 text-stone-950 rounded-2xl py-4 font-bold text-sm uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10 active:scale-[0.982] cursor-pointer"
                  >
                    Proceed to Direct Checkout <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 8. Full Product Detailed Viewer Pop-over */}
      <AnimatePresence>
        {activeDetailProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailProduct(null)}
              className="fixed inset-0 bg-black/80 z-120 backdrop-blur-sm"
            />

            <div className="fixed inset-0 z-130 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="bg-white rounded-[3.2rem] overflow-hidden max-w-4xl w-full relative shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col md:flex-row text-left"
              >
                {/* Exit button */}
                <button 
                  onClick={() => setActiveDetailProduct(null)}
                  className="absolute top-6 right-6 bg-stone-900/10 text-stone-800 hover:bg-stone-900 hover:text-white p-3 rounded-full transition-all z-20 cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Left Side picture zoom */}
                <div className="md:w-1/2 min-h-[300px] md:min-h-full relative bg-stone-100 shrink-0">
                  <img 
                    src={activeDetailProduct.image} 
                    alt={activeDetailProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider text-amber-600 shadow-md border border-amber-50">
                    {activeDetailProduct.category === 'honey' ? '🍯 Organic Pure Honey' : activeDetailProduct.category === 'craft' ? '🎨 Ancient folkcraft' : '🌶️ Traditional mountain Spices'}
                  </span>
                </div>

                {/* Right details content pane */}
                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full space-y-6">
                  
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono font-medium uppercase tracking-widest text-stone-400 block mb-1">Standard Packaging Size: {activeDetailProduct.weightOrSize}</span>
                      <h3 className="text-2xl md:text-3xl font-serif font-black text-stone-905 leading-tight mb-3 pr-6">{activeDetailProduct.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-stone-950">₹{activeDetailProduct.price}</span>
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-emerald-100">
                          {activeDetailProduct.availability}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Sustainable Terroir Story</h4>
                      <p className="text-stone-600 text-sm font-light leading-relaxed">{activeDetailProduct.description}</p>
                    </div>

                    {/* Specifications List */}
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Purity Specifications</h4>
                      <ul className="space-y-2 text-xs font-light text-stone-550 list-inside text-stone-500">
                        {activeDetailProduct.details.map((spec, index) => (
                          <li key={index} className="flex gap-2.5 items-start">
                            <span className="text-amber-500 font-extrabold shrink-0">•</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Livelihood Solidarity Impact banner */}
                    <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 flex gap-3 text-xs text-amber-955 shadow-inner">
                      <Gift className="text-amber-600 shrink-0 fill-amber-200" size={20} />
                      <div>
                        <strong className="block font-serif font-bold text-amber-950 mb-1">Cooperative Solidarity Pay</strong>
                        <p className="font-light text-amber-800 leading-relaxed">{activeDetailProduct.livelihoodImpact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        addToCart(activeDetailProduct);
                        setActiveDetailProduct(null);
                        setIsCartOpen(true);
                      }}
                      className="flex-grow bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-2xl py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag size={14} /> Buy and Pay Directly
                    </button>
                    
                    <button
                      onClick={() => {
                        const message = encodeURIComponent(`Pranam! I am browsing the beautiful 'Advaita' Himalayan Co-op catalog. I am deeply interested in details about the product "${activeDetailProduct.name}" (${activeDetailProduct.weightOrSize}) priced fairly at ₹${activeDetailProduct.price}. Could you share delivery feasibility?`);
                        window.open(`https://api.whatsapp.com/send/?phone=919068528721&text=${message}&type=phone_number&app_absent=0`, '_blank');
                      }}
                      className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      <MessageSquare size={14} /> Inquire first
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* 9. Direct Checkout Form & UPI Secure Payment Flow */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 z-140 backdrop-blur-sm"
              onClick={() => { if(!isOrderPlaced) setIsCheckoutOpen(false); }}
            />

            <div className="fixed inset-0 z-150 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="bg-white rounded-[3.2rem] overflow-hidden max-w-2xl w-full relative shadow-2xl border border-stone-200 max-h-[92vh] flex flex-col text-left"
              >
                {/* Header */}
                <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50 shrink-0">
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-amber-500" size={24} />
                    <div>
                      <h3 className="text-xl font-serif font-black text-stone-950">Advaita Co-operative Checkout</h3>
                      <p className="text-xs text-stone-400 font-light">Direct Himalayan producer solidarity payout. Zero platform fees.</p>
                    </div>
                  </div>
                  {!isOrderPlaced && (
                    <button onClick={() => setIsCheckoutOpen(false)} className="text-stone-400 hover:text-stone-900 transition-colors p-2 cursor-pointer">
                      <X size={20} />
                    </button>
                  )}
                </div>

                {/* Form fields & Scan body panel */}
                <div className="p-8 flex-grow overflow-y-auto space-y-6">
                  {!isOrderPlaced ? (
                    <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                      
                      {/* Products Summary Card */}
                      <div className="bg-stone-50 border border-stone-200 p-5 rounded-3xl space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">Selected Basket Summary</span>
                        {cart.map(item => (
                          <div key={item.product.id} className="flex justify-between text-xs text-stone-700">
                            <span>{item.quantity}x {item.product.name} ({item.product.weightOrSize})</span>
                            <span className="font-bold">₹{item.product.price * item.quantity}</span>
                          </div>
                        ))}
                        <hr className="border-stone-200" />
                        
                        {appliedDiscount > 0 && (
                          <div className="flex justify-between text-xs text-emerald-600 font-bold">
                            <span>Solidarity Discount ({appliedDiscount}%):</span>
                            <span>-₹{discountAmount}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-sm text-stone-900 font-bold">
                          <span>Total Supports Payable:</span>
                          <span className="text-amber-600">₹{grandTotal}</span>
                        </div>
                      </div>

                      {/* Inputs */}
                      <div className="space-y-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 block">Shipping & Billing Credentials</span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5 ml-1">Recipient Full Name</label>
                            <input 
                              type="text" 
                              required
                              value={checkoutName}
                              onChange={(e) => setCheckoutName(e.target.value)}
                              placeholder="e.g. Anand Karki" 
                              className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-stone-850"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5 ml-1">WhatsApp Mobile Phone</label>
                            <input 
                              type="tel" 
                              required
                              value={checkoutPhone}
                              onChange={(e) => setCheckoutPhone(e.target.value)}
                              placeholder="WhatsApp number to coordinate delivery" 
                              className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-stone-850"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5 ml-1">Email ID (Optional)</label>
                            <input 
                              type="email" 
                              value={checkoutEmail}
                              onChange={(e) => setCheckoutEmail(e.target.value)}
                              placeholder="e.g. anand.karki@gmail.com" 
                              className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-stone-850"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5 ml-1">Zip / Postal Pincode Code</label>
                            <input 
                              type="text" 
                              required
                              value={checkoutPincode}
                              onChange={(e) => setCheckoutPincode(e.target.value)}
                              placeholder="e.g. 263139 ( Uttarakhand / PAN India )" 
                              className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-stone-850"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5 ml-1">Complete Physical Street Address</label>
                          <textarea 
                            required
                            rows={3}
                            value={checkoutAddress}
                            onChange={(e) => setCheckoutAddress(e.target.value)}
                            placeholder="Please provide your precise landmarks, area name, post office, state and city for exact postal logistics dispatch." 
                            className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-stone-850 resize-none font-sans"
                          />
                        </div>
                      </div>

                      {/* Payment Mode Selection */}
                      <div className="space-y-3 pb-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 block">Payment Mode Preference</span>
                        <div className="grid grid-cols-2 gap-4">
                          
                          <label className={`border rounded-2xl p-4 flex gap-3 cursor-pointer items-start transition-all text-left ${
                            paymentMethod === 'upi' 
                              ? 'border-amber-500 bg-amber-50/25' 
                              : 'border-stone-200 bg-white hover:bg-stone-50'
                          }`}>
                            <input 
                              type="radio" 
                              name="checkout_payment"
                              checked={paymentMethod === 'upi'}
                              onChange={() => setPaymentMethod('upi')}
                              className="accent-amber-500 mt-1"
                            />
                            <div>
                              <strong className="text-xs font-black block text-stone-900">Direct UPI & Scan QR</strong>
                              <span className="text-[10px] text-stone-500 font-light block mt-0.5">Pay via GPay, PhonePe, Paytm or BHIM UPI</span>
                            </div>
                          </label>

                          <label className={`border rounded-2xl p-4 flex gap-3 cursor-pointer items-start transition-all text-left ${
                            paymentMethod === 'cod' 
                              ? 'border-amber-500 bg-amber-50/25' 
                              : 'border-stone-200 bg-white hover:bg-stone-50'
                          }`}>
                            <input 
                              type="radio" 
                              name="checkout_payment"
                              checked={paymentMethod === 'cod'}
                              onChange={() => setPaymentMethod('cod')}
                              className="accent-amber-500 mt-1"
                            />
                            <div>
                              <strong className="text-xs font-black block text-stone-900">COD (Cash Delivery)</strong>
                              <span className="text-[10px] text-stone-500 font-light block mt-0.5">Pay cash to registered delivery agent</span>
                            </div>
                          </label>

                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-stone-950 text-white rounded-2xl py-4 font-bold text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-stone-950 transition-all flex items-center justify-center gap-2 shadow-xl shadow-stone-900/10 cursor-pointer"
                      >
                        Transmit Safe Order Details to NGO Desk <ArrowRight size={16} />
                      </button>

                    </form>
                  ) : (
                    // POST-CHECKOUT QR CODE PAYMENTS DETAILS & DIRECTING CHAT
                    <div className="text-center py-6 space-y-6">
                      
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <Check size={32} />
                      </div>

                      <div>
                        <h4 className="text-2xl font-serif font-black text-stone-950">Direct Slip Transmitted!</h4>
                        <p className="text-xs font-light text-stone-500 max-w-sm mx-auto mt-2 leading-relaxed">
                          We have opened safe WhatsApp credentials to deliver your purchase details directly to Jeevan Chetna Foundation for high-speed custom packaging.
                        </p>
                      </div>

                      {paymentMethod === 'upi' && (
                        <div className="bg-stone-50 border border-stone-200 rounded-[2.5rem] p-6 max-w-md mx-auto space-y-4 text-center">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-600 block">Independent Cooperative Banking QR</span>
                          
                          {/* Live QR Code rendering */}
                          <div className="bg-white p-4 rounded-2xl border border-stone-200 max-w-[200px] mx-auto shadow-sm">
                            <img 
                              src="https://lh3.googleusercontent.com/d/1GfQpVsxqXQmkQhBEs1mjKkKHw7nf5U__" 
                              alt="Jeevan Chetna Registered QR" 
                              className="w-full h-auto"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="space-y-1 text-center">
                            <p className="text-xs font-bold text-stone-800">
                              Registered UPI: <span className="text-amber-600 font-mono text-xs select-all">jeevanchetnafoundationn@sbi</span>
                            </p>
                            <p className="text-[10px] text-stone-400 font-light max-w-xs mx-auto leading-relaxed">
                              Scan this official SBI merchant QR to complete the direct transaction of <strong className="text-amber-600 font-extrabold text-xs">₹{grandTotal}</strong>. Share the payment screenshot on WhatsApp to complete tracking activation.
                            </p>
                          </div>
                          
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText("jeevanchetnafoundationn@sbi");
                              alert("Official foundation UPI copied!");
                            }}
                            className="bg-white text-stone-700 hover:bg-stone-100 border border-stone-300 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                          >
                            Copy UPI Account ID
                          </button>
                        </div>
                      )}

                      {/* WhatsApp bypass button */}
                      <div className="space-y-4 pt-4 border-t border-stone-100 max-w-md mx-auto">
                        <p className="text-xs text-stone-500 font-light leading-relaxed">If WhatsApp fails to trigger automatically due to sandbox browser isolation, please click manually below to text us order screenshots:</p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                          <button
                            onClick={() => {
                              const orderItemsText = cart.map(item => 
                                `🌱 ${item.quantity}x ${item.product.name} [₹${item.product.price}]`
                              ).join('\n');

                              const message = encodeURIComponent(
`🚩 *ADVAITA ORDER - MANUAL RETRY*
*ITEMS:*
${orderItemsText}
*SUPPORT TOTAL PAYABLE:* ₹${grandTotal}
*DELIVERY ADDRESS DETAILS:*
Name: ${checkoutName}
Address: ${checkoutAddress}
WhatsApp: ${checkoutPhone}`
                              );
                              window.open(`https://api.whatsapp.com/send/?phone=919068528721&text=${message}&type=phone_number&app_absent=0`, '_blank');
                            }}
                            className="bg-amber-500 font-bold hover:bg-amber-600 text-stone-950 rounded-full px-6 py-3.5 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <MessageSquare size={14} /> Open WhatsApp Chat
                          </button>

                          <button 
                            onClick={handleResetOrder}
                            className="bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-full px-6 py-3.5 text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <RotateCcw size={14} /> Clear & Buy More
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>

                {isOrderPlaced && (
                  <div className="p-8 border-t border-stone-100 bg-stone-50 flex justify-end shrink-0">
                    <button
                      onClick={handleResetOrder}
                      className="bg-stone-900 text-white rounded-2xl py-3.5 px-8 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-stone-950 transition-all cursor-pointer"
                    >
                      Clear & Back to Store Catalog
                    </button>
                  </div>
                )}

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Advaita;
