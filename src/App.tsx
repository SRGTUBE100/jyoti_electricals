import React from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ServicesView from './components/ServicesView';
import ContactView from './components/ContactView';
import CartDrawer from './components/CartDrawer';
import { Product, CartItem } from './types';
import { SERVICES, SHOWROOM_INFO } from './data';
import { 
  Zap, Wrench, ShieldCheck, Heart, MapPin, 
  HelpCircle, MessageSquare, Phone, Mail, Award, X, Sparkles
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = React.useState<string>('home');
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [activeServicesInitial, setActiveServicesInitial] = React.useState<string>("");

  // Quick Diagnostics global shortcut modal
  const [isQuickDiagnosticsOpen, setIsQuickDiagnosticsOpen] = React.useState(false);
  const [quickFaqId, setQuickFaqId] = React.useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const handleClearCart = () => setCart([]);

  // Transition helper
  const handleTriggerQuickRepairSelection = (serviceId: string) => {
    setActiveServicesInitial(serviceId);
    setCurrentTab('services');
    setIsQuickDiagnosticsOpen(false);
  };

  // Set window title dynamically
  React.useEffect(() => {
    document.title = "Jyoti Electricals | Kaimganj Showroom";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-100 selection:text-slate-900 overflow-x-hidden">
      
      {/* Navbar segment */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        onOpenQuickDiagnostics={() => setIsQuickDiagnosticsOpen(true)}
      />

      {/* Main Container screen views selection */}
      <main className="flex-1 w-full relative z-10">
        {currentTab === 'home' && (
          <HomeView 
            setCurrentTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuickDiagnostics={() => setIsQuickDiagnosticsOpen(true)}
          />
        )}
        
        {currentTab === 'shop' && (
          <ShopView 
            onAddToCart={handleAddToCart}
            cart={cart}
          />
        )}

        {currentTab === 'services' && (
          <ServicesView 
            initialServiceId={activeServicesInitial} 
          />
        )}

        {currentTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* FOOTER AREA */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-8 px-6 relative z-10 self-stretch mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 text-left">
          
          {/* Footer Logo Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-copper-500 to-electric-600 flex items-center justify-center text-white">
                <Zap className="h-4.5 w-4.5 text-amber-300" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                Jyoti Electricals
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
              Providing premium home appliances and certified master repair solutions around Kaimganj. Supported by 100% thick electrolytic copper windings, original dual run capacitors, and direct factory brand authorizations.
            </p>

            <div className="flex gap-3 text-xs font-mono pt-1 text-slate-500">
              <span className="bg-slate-800 text-slate-400 py-1 px-2.5 rounded-md">✓ Est 2005</span>
              <span className="bg-slate-800 text-slate-400 py-1 px-2.5 rounded-md">✓ Kaimganj</span>
            </div>
          </div>

          {/* Quick links header */}
          <div className="md:col-span-2.5 space-y-3.5">
            <h4 className="text-white text-xs uppercase tracking-widest font-mono font-bold">Showroom Links</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button onClick={() => { setCurrentTab('home'); }} className="hover:text-white text-left cursor-pointer">Homepage Hub</button>
              <button onClick={() => { setCurrentTab('shop'); }} className="hover:text-white text-left cursor-pointer font-semibold text-amber-400">Products Catalog</button>
              <button onClick={() => { setCurrentTab('services'); }} className="hover:text-white text-left cursor-pointer">Expert Repairing</button>
              <button onClick={() => { setCurrentTab('contact'); }} className="hover:text-white text-left cursor-pointer">Contact Desk</button>
            </div>
          </div>

          {/* Core repairing category links */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-white text-xs uppercase tracking-widest font-mono font-bold">Service Specialties</h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <span>Split Inverter AC Diagnostics</span>
              <span>Frost Free Smart Refrigerator</span>
              <span>Stabilizer High-Load Rewinding</span>
              <span>Heavy Washing Machine Bearings</span>
              <span>Desert Cooler Multi-Phase Motor</span>
            </div>
          </div>

          {/* MD Direct details */}
          <div className="md:col-span-2.5 space-y-3.5">
            <h4 className="text-white text-xs uppercase tracking-widest font-mono font-bold">MD Direct Desktop</h4>
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono block">VIJAY RATHORE</span>
                <a href="tel:+919616936475" className="hover:text-white block font-mono">+91 9616936475</a>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono block">AJAY RATHORE</span>
                <a href="tel:+919956697192" className="hover:text-white block font-mono">+91 9956697192</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 font-normal">
            &copy; {new Date().getFullYear()} Jyoti Electricals Showroom. All Rights Reserved.
          </p>
          <p className="text-slate-500 flex items-center gap-1">
            <span>Made with precision inside Kaimganj, Railway Road</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>&amp; pure-copper integrity.</span>
          </p>
        </div>
      </footer>

      {/* SLIDE-OUT SHOPPING CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* QUICK WORKSHOP DIAGNOSTICS LAUNCHER SHORTCUT MODAL */}
      {isQuickDiagnosticsOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div 
            onClick={() => setIsQuickDiagnosticsOpen(false)}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity" 
          />

          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200 text-left z-10 relative flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-copper-600" />
                <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-950">Quick Repair Advisor</h3>
              </div>
              <button 
                onClick={() => setIsQuickDiagnosticsOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body FAQs */}
            <div className="p-6 overflow-y-auto space-y-5">
              
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono whitespace-nowrap text-copper-600 font-extrabold uppercase">INSTANT ASSISTANCE TOOL</span>
                <h4 className="font-display font-bold text-slate-900 text-sm">Select Your System Behavior To View Diagnostic Rates:</h4>
              </div>

              {/* Grid of repair categories buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleTriggerQuickRepairSelection(s.id)}
                    className="p-3 text-left border border-slate-200 hover:border-copper-400 hover:bg-amber-50/10 rounded-xl transition-all cursor-pointer group flex justify-between items-center"
                  >
                    <div>
                      <strong className="text-xs text-slate-800 block leading-tight">{s.title}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">Diag visits from ₹{s.baseDiagnosticsPrice}</span>
                    </div>
                    <span className="text-copper-600 font-bold text-xs transform group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                ))}
              </div>

              {/* Help desk tips */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50 space-y-2.5 text-xs text-slate-600">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Authorized Copper Warranty Guarantee</span>
                </p>
                <p className="leading-relaxed text-slate-500">
                  All fan motors wound or replacement capacitors installed by our technicians carry an automatic <strong>6-Month written showroom warranty card</strong>. If faults reappear we replace units 100% free of charges.
                </p>
              </div>

            </div>

            {/* Bottom Contacts shortcuts */}
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono">Call MD directly:</span>
              <div className="flex gap-3 font-mono font-bold text-slate-800">
                <a href="tel:+919616936475" className="hover:text-copper-600">+91 9616936475</a>
                <a href="tel:+919956697192" className="hover:text-copper-600">+91 9956697192</a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
