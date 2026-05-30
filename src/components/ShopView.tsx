import React from 'react';
import { 
  Search, SlidersHorizontal, Star, ShoppingCart, 
  Check, Eye, Sparkles, AlertCircle, X, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ShopViewProps {
  onAddToCart: (product: Product) => void;
  cart: any[];
}

type CategoryType = 'all' | 'fans_coolers' | 'solar_power' | 'repair_parts' | 'lighting_fixtures';

const WAVE_1_PRODUCTS: Product[] = [
  {
    id: "prod-fan-pedestal-heavy",
    name: "Ravi Farrata",
    category: "fans_coolers",
    description: "High-speed heavy duty Ravi Farrata stand fan containing 100% pure copper motor winding. Delivers high velocity cool breeze air thrust with dual dynamic speed controls and high durability steel pedestal stand.",
    price: 1799,
    rating: 4.8,
    brand: "Jyoti Electricals",
    image: "https://5.imimg.com/data5/ANDROID/Default/2021/1/GJ/SV/ET/20931955/product-jpeg.png",
    specifications: [
      "Winding configuration: 100% Pure Heavy Copper wound coils",
      "Robust double-blade design for maximum throw capacity",
      "Includes thermal cutoff protections for continuous summers",
      "Sturdy premium iron weight base avoids accidental tipping"
    ],
    inStock: true,
    tag: "Copper"
  },
  {
    id: "prod-mixer-jar-steel-base",
    name: "Mixer Jar Base Spare Parts",
    category: "repair_parts",
    description: "Pro-grade high durability replacement motor coupler and jar steel base block. Fitted with premium self-lubricating heavy-duty brass bushing sleeves and impact-absorbing gaskets.",
    price: 179,
    rating: 4.9,
    brand: "Jyoti Genuine Spares",
    image: "https://m.media-amazon.com/images/I/71v7UD-PtLL._AC_UF894,1000_QL80_.jpg",
    specifications: [
      "Material: Cold-forged steel base mounting plates",
      "Sintered brass bushes ensure minimal physical friction",
      "Includes dynamic high-grip coupling block teeth",
      "Universal design: fits almost all domestic standard mixer grinders"
    ],
    inStock: true
  },
  {
    id: "prod-cooler-motor-copper-18",
    name: "100% Copper Cooler Motor",
    category: "fans_coolers",
    description: "Heavy-duty induction replacement motor designed for major desert air coolers. Wound with double-varnished extreme insulation Class-H copper wire for durable moisture immunity.",
    price: 3499,
    rating: 4.9,
    brand: "Jyoti Electricals",
    image: "https://images-eu.ssl-images-amazon.com/images/I/319oNiU61LS._AC_UL495_SR435,495_.jpg",
    specifications: [
      "Stator core: Low power loss electromagnetic steel structure",
      "100% pure electrolytic copper wire windings maximum efficiency",
      "Preloaded dynamic start capacitor support system",
      "High precision heavy bushings minimize shaft friction & sound"
    ],
    inStock: true,
    tag: "100% Copper Winding"
  },
  {
    id: "prod-light-panel-led-15w",
    name: "Jyoti Decorative Flush Fit LED Panel Light 15W",
    category: "lighting_fixtures",
    description: "Elegantly finished white trim LED downlight. Perfect surge protection driver to handle erratic rural line currents without flickering.",
    price: 240,
    rating: 4.8,
    brand: "Jyoti Electricals",
    image: "https://5.imimg.com/data5/SELLER/Default/2025/7/527811420/XB/RD/GM/44147587/8-7-inch-flush-mount-led-ceiling-light-500x500.jpg",
    specifications: [
      "Operating voltage threshold: automatic cutoff over 320V AC",
      "CRI (Color Rendering Index): >85 for real daylight hues",
      "Premium glare-free acrylic frosted diffuser lens",
      "Easy installation spring clamps with insulated grips"
    ],
    inStock: true
  }
];

const WAVE_2_PRODUCTS: Product[] = [
  {
    id: "prod-stabilizer-heavy-manual-5k",
    name: "Jyoti Intelligent Copper Multi-phase Stabilizer 5kVA",
    category: "repair_parts",
    description: "High capacity domestic automatic voltage regulator. Crafted with 100% thick copper chokes, automatic overload cuts, and direct meter readings panel.",
    price: 5400,
    rating: 4.9,
    brand: "Jyoti Electricals",
    image: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=600&q=80",
    specifications: [
      "Winding integrity: Handcrafted elite H-Class thick insulated copper magnet wires",
      "Wide fluctuation response: from 130V to 290V auto stabilization",
      "Microchip logical smart delay time controller switch",
      "Inbuilt automatic high-temp circuit breaker"
    ],
    inStock: true,
    tag: "Pro Security"
  },
  {
    id: "prod-wash-pulsator-shifter",
    name: "Heavy-Duty Washing Machine pulsator Core Cog",
    category: "repair_parts",
    description: "Premium replacement wash pulsator core wheel with impact-resistant splines to prevent clothes slippage and improve scrubbing pressure.",
    price: 320,
    rating: 4.7,
    brand: "Jyoti Genuine Spares",
    image: "https://images.unsplash.com/photo-1618979287755-d2021f974f52?auto=format&fit=crop&w=600&q=80",
    specifications: [
      "Spline count: 11 teeth reinforced design",
      "High grade impact-absorbing virgin plastic core",
      "Designed specifically for Aura and local wash pulsator discs",
      "Rustproof central locking steel insert bolt"
    ],
    inStock: true
  },
  {
    id: "prod-cooler-fan-blades-18",
    name: "Desert Air Cooler Heavy Exhaust Fan Blades 18-Inch",
    category: "fans_coolers",
    description: "Tough balanced metal fan blade replacement for high airspeed delivery in local desert coolers. Pitch-calibrated to restrict motor hub loading.",
    price: 380,
    rating: 4.8,
    brand: "Jyoti Genuine Spares",
    image: "https://images.unsplash.com/photo-1622324706596-f046e7f86414?auto=format&fit=crop&w=600&q=80",
    specifications: [
      "Diameter: 18 inch wide heavy aerodynamic metal fan profile",
      "Precisely balanced weights preventing spinner vibrations",
      "Compatible with standard 0.5-inch cooler motor shafts",
      "Corrosion-safe anti-rust zinc-plated central lock collar"
    ],
    inStock: true,
    tag: "Cooler Spares Available"
  },
  {
    id: "prod-solar-controller-30a",
    name: "Jyoti Smart MPPT Solar Controller 30A Charger",
    category: "solar_power",
    description: "Micro-controller governed solar charge controller that pairs panels to battery systems. Built-in spark arresters and surge guards.",
    price: 3599,
    rating: 4.8,
    brand: "Jyoti Hybrid Energy",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
    specifications: [
      "Fits capacities: 300W to 1200W panel arrays",
      "Pure sine wave output compatibility mapping",
      "Dynamic battery charge profile selection",
      "Inbuilt low-voltage battery cutoff protections",
      "Anodized passive aluminum cooling base plates"
    ],
    inStock: true
  }
];

export default function ShopView({ onAddToCart, cart }: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [addedProductId, setAddedProductId] = React.useState<string | null>(null);

  // Dynamic Paging catalog State variables
  const [catalogProducts, setCatalogProducts] = React.useState<Product[]>(PRODUCTS);
  const [currentWave, setCurrentWave] = React.useState(0);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [loaderMessage, setLoaderMessage] = React.useState('Coordinating with Railway Road storage...');

  const hasMore = currentWave < 2;
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  // Filter products
  const filteredProducts = catalogProducts.filter(prod => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const triggerLoadMore = () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    const messages = [
      "Coordinating Railway Road warehouse vaults...",
      "Fetching copper wire rewinding spec-sheets...",
      "Validating electronic catalog checksums...",
      "Reconciling local inventory quantities...",
      "Releasing high-resolution catalog assets..."
    ];
    let step = 0;
    setLoaderMessage(messages[0]);
    
    const interval = setInterval(() => {
      step++;
      if (step < messages.length) {
        setLoaderMessage(messages[step]);
      } else {
        clearInterval(interval);
      }
    }, 450);

    setTimeout(() => {
      clearInterval(interval);
      setCatalogProducts(prev => {
        if (currentWave === 0) {
          return [...prev, ...WAVE_1_PRODUCTS];
        } else if (currentWave === 1) {
          return [...prev, ...WAVE_2_PRODUCTS];
        }
        return prev;
      });
      setCurrentWave(prev => prev + 1);
      setIsLoadingMore(false);
    }, 2400);
  };

  React.useEffect(() => {
    if (!hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          triggerLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, isLoadingMore, currentWave]);

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Spares & Units' },
    { id: 'fans_coolers', label: 'Fans & Coolers' },
    { id: 'solar_power', label: 'Solar Controller (MPPT)' },
    { id: 'repair_parts', label: 'Genuine Spares & Stabilizers' },
    { id: 'lighting_fixtures', label: 'Lighting Fittings' }
  ];

  const handleAddToCartWithFeedback = (product: Product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 text-left border-b border-white/10 pb-6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-copper-500 block mb-1.5 animate-fadeIn">
            PREMIUM GENUINE ELECTRICAL CATALOG
          </span>
          <h1 className="editorial-serif-heading text-3xl sm:text-5xl text-white">
            Genuine Spares &amp; Coolers
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl font-sans">
            Browse high-efficiency copper-wound fans, desert coolers, stabilizers, and replacement machine parts with offline pickup booking.
          </p>
        </div>
        
        {/* Dynamic availability pill */}
        <div className="bg-[#101115] text-[#cccccc] border border-white/10 px-3 py-2 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-copper-500 animate-pulse" />
          <span>Showroom Carry-Out &amp; Support Available</span>
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="bg-[#121212] rounded-sm p-5 border border-white/10 flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
        
        {/* Search input tab */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search fans, coolers, stabilizers, mixer jars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-white/10 focus:outline-none focus:border-copper-500 text-xs bg-[#181818] text-slate-200 uppercase tracking-widest font-mono font-bold placeholder:text-slate-600 placeholder:normal-case"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white font-mono uppercase tracking-widest text-[9px] font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category button filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 w-full lg:w-auto">
          <span className="text-[10px] text-[#8c8c8c] font-mono tracking-widest font-bold uppercase hidden lg:inline flex-shrink-0">
            FILTERS:
          </span>
          <div className="flex overflow-x-auto pb-2.5 -mx-4 px-4 gap-1.5 md:pb-0 md:mx-0 md:px-0 scrollbar-none snap-x md:flex-wrap w-auto max-w-full justify-start lg:justify-end">
            {categories.map((c) => {
              const works = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-2.5 md:py-2 flex-shrink-0 snap-align-start rounded-sm text-[10px] uppercase font-mono tracking-widest font-bold transition-all duration-300 cursor-pointer ${
                    works 
                      ? 'bg-copper-500 text-slate-950 font-bold' 
                      : 'bg-[#181818] hover:bg-white hover:text-slate-950 text-slate-300 border border-white/5'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#121212]/50 rounded-sm p-12 text-center border border-dashed border-white/10 animate-fadeIn">
          <AlertCircle className="h-10 w-10 text-slate-500 mx-auto mb-3" />
          <h3 className="editorial-serif-heading text-lg text-white">No matching products found</h3>
          <p className="text-slate-400 text-xs mt-1.5 max-w-sm mx-auto font-sans leading-relaxed">
            Try correcting your spelling, selecting a different filter category, or search for "smu", "TV", or generic parameters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 bg-copper-500 hover:bg-transparent hover:text-white border border-copper-500 text-slate-950 font-mono tracking-widest uppercase font-bold text-[10px] py-3 px-6 rounded-sm cursor-pointer transition-all duration-300"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const hasAdded = addedProductId === product.id;
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                key={product.id}
                className="group relative bg-[#121212] rounded-sm border border-white/10 overflow-hidden hover:border-white/25 transition-all duration-300 text-left flex flex-col justify-between"
              >
                {/* Floating flag tag or badges */}
                {product.tag && (
                  <span className="absolute top-3.5 left-3.5 z-10 bg-slate-950/90 text-copper-500 text-[9px] font-mono uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm font-bold flex items-center gap-1 border border-white/10">
                    <Sparkles className="h-3 w-3 text-copper-500" />
                    <span>{product.tag}</span>
                  </span>
                )}

                {/* Stock condition */}
                {!product.inStock && (
                  <span className="absolute top-3.5 right-3.5 z-10 bg-[#1c1915] border border-rose-500/30 text-rose-400 text-[9px] font-mono tracking-widest font-bold uppercase px-2 py-1 rounded-sm">
                    OUT OF STOCK
                  </span>
                )}

                {/* Product Image Box */}
                <div className="aspect-video w-full bg-[#181818] overflow-hidden relative cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-[#121212]/90 border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[#f3f3f3] transform translate-y-3 group-hover:translate-y-0 transition-all">
                      Quick View
                    </div>
                  </div>
                </div>

                {/* Product Information body */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-[#121212]">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 tracking-wider">
                      <span>{product.brand.toUpperCase()}</span>
                      <div className="flex items-center gap-0.5 ml-1 self-start">
                        <Star className="h-3 w-3 fill-copper-500 text-copper-500" />
                        <span className="text-slate-300 font-bold font-sans">{product.rating}</span>
                      </div>
                    </div>
                    
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="editorial-serif-heading font-medium text-lg text-white hover:text-copper-500 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="border-t border-white/5 pt-4 mt-5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest font-mono">UNIT PRICE</span>
                      <p className="text-lg font-mono font-bold text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddToCartWithFeedback(product)}
                      disabled={!product.inStock}
                      className={`px-4 py-2.5 rounded-sm text-[10px] font-bold font-mono tracking-widest transition-all uppercase flex items-center gap-1.5 cursor-pointer border ${
                        !product.inStock
                          ? 'bg-[#181818] border-white/5 text-slate-600 cursor-not-allowed'
                          : hasAdded
                            ? 'bg-copper-500 border-copper-500 text-slate-950'
                            : 'bg-white text-slate-950 border-white hover:bg-transparent hover:text-white transition-all duration-300'
                      }`}
                    >
                      {hasAdded ? (
                        <>
                          <Check className="h-3 w-3 text-slate-950" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-3 w-3" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>
      )}

      {/* Infinite scrolling sentinel & aesthetic loader section */}
      <div className="mt-12 flex flex-col items-center justify-center min-h-[140px] w-full">
        <AnimatePresence mode="wait">
          {isLoadingMore ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <div className="relative flex flex-col items-center justify-center p-8 bg-[#121212] rounded-sm border border-white/10 overflow-hidden shadow-2xl max-w-md mx-auto w-full">
                {/* Ambient radial blur backglow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-copper-500/10 rounded-full blur-2xl pointer-events-none" />
                
                {/* Outer rotating concentric ring */}
                <div className="relative w-16 h-16 flex items-center justify-center mb-5">
                  <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-t-copper-500 border-r-copper-500/40 border-b-transparent border-l-transparent" 
                  />
                  {/* Inner glowing core */}
                  <motion.div
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-6 w-6 rounded-full bg-gradient-to-tr from-copper-600 to-amber-400 flex items-center justify-center shadow-lg shadow-copper-500/20"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-slate-950" />
                  </motion.div>
                </div>

                {/* Content load info */}
                <div className="text-center space-y-1 z-10 w-full">
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#8c8c8c] uppercase">HYBRID WAREHOUSE GATEWAY</p>
                  
                  {/* Smoothly animated text transitions */}
                  <div className="h-5 flex items-center justify-center overflow-hidden">
                    <motion.p 
                      key={loaderMessage}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      className="text-xs text-white font-mono tracking-wide"
                    >
                      {loaderMessage}
                    </motion.p>
                  </div>
                  
                  {/* Mini loading progress bar */}
                  <div className="w-32 h-[3px] bg-white/5 rounded-full overflow-hidden mx-auto mt-2 relative">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.4, ease: "easeInOut" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-copper-500 to-amber-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : !hasMore ? (
            <motion.div 
              key="end-of-catalog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center justify-center py-8 text-center border-t border-dashed border-white/10"
            >
              <div className="h-10 w-10 bg-white/5 border border-white/10 text-copper-500 rounded-full flex items-center justify-center mb-3">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#cccccc]">
                End of Railway Road Showroom Catalog
              </p>
              <p className="text-[9px] sm:text-[10px] font-mono tracking-wider text-slate-500 mt-1 uppercase">
                100% thick copper warranty card included on all registered units
              </p>
            </motion.div>
          ) : (
            <div 
              key="sentinel" 
              ref={sentinelRef} 
              className="h-10 w-full flex items-center justify-center"
            >
              <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-[0.15em]">
                <span className="h-1.5 w-1.5 rounded-full bg-copper-500/40 animate-ping" />
                <span>Scroll to browse more arrivals</span>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* QUICK VIEW SPECIFICATION MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col">
            
            {/* Modal Heading Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <div>
                <span className="text-[10px] font-mono font-bold text-copper-500 uppercase tracking-widest block">{selectedProduct.brand.toUpperCase()} · CATALOG PREVIEW</span>
                <h3 className="editorial-serif-heading font-medium text-xl text-white line-clamp-1">{selectedProduct.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content body */}
            <div className="p-6 overflow-y-auto space-y-6 text-left">
              
              {/* Split layout: Image & quick details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="aspect-video w-full overflow-hidden bg-[#181818] border border-white/10 rounded-sm">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-mono font-bold text-[#cccccc] bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm tracking-widest uppercase">
                      Model SKU {selectedProduct.id.slice(5).toUpperCase()}
                    </span>
                    {selectedProduct.tag && (
                      <span className="text-[9px] font-mono font-extrabold text-copper-500 bg-[#1c1915] px-2.5 py-0.5 rounded-sm border border-copper-500/20 uppercase tracking-widest">
                        {selectedProduct.tag}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    {selectedProduct.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1 font-mono text-xs text-slate-400">
                    <span>Rating:</span>
                    <div className="flex items-center text-copper-500 font-bold">
                      <Star className="h-3.5 w-3.5 fill-copper-500 mr-0.5" />
                      <span>{selectedProduct.rating} / 5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Technical Specs list */}
              <div className="space-y-3 bg-[#0b0b0b] p-4 rounded-sm border border-white/5">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.15em] font-extrabold text-copper-500 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-copper-500" />
                  <span>Technical & Warranty Specifications</span>
                </h4>
                <ul className="text-xs text-slate-300 space-y-2 font-sans">
                  {selectedProduct.specifications.map((spec, i) => (
                    <li key={i} className="flex gap-2 items-start leading-normal">
                      <span className="h-1.5 w-1.5 rounded-full bg-copper-500 mt-1.5 flex-shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                  <li className="flex gap-2 items-start leading-normal font-semibold text-white pt-2 border-t border-white/5 mt-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>Authorized Support: Lifetime replacement warranties on motors &amp; copper lines available directly at our Kaimganj counter.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Modal Bottom control panel */}
            <div className="px-6 py-4 bg-[#121212] border-t border-white/10 flex items-center justify-between flex-shrink-0">
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">CUSTOMER PRICE</span>
                <span className="text-xl font-mono font-extrabold text-white">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border border-white/15 text-slate-400 rounded-sm text-xs font-mono tracking-widest uppercase font-bold hover:text-white cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleAddToCartWithFeedback(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  disabled={!selectedProduct.inStock}
                  className="bg-copper-500 border border-copper-500 text-slate-950 hover:bg-transparent hover:text-white px-5 py-2 rounded-sm text-xs font-mono tracking-widest uppercase font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-300"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
