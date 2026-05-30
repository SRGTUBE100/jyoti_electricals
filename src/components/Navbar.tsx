import React from 'react';
import { ShoppingCart, Wrench, Sparkles, Zap, ShieldAlert, ArrowRight, Menu, X } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  onOpenQuickDiagnostics: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cart,
  setIsCartOpen,
  onOpenQuickDiagnostics
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'services', label: 'Services & Repairing' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top micro-banner */}
      <div className="bg-[#0b0b0b] border-b border-white/5 text-slate-300 text-[10.5px] sm:text-xs py-2 px-4 text-center font-mono flex items-center justify-center gap-2 tracking-wide">
        <span className="inline-flex h-1.5 w-1.5 items-center justify-center rounded-full bg-copper-500 animate-pulse" />
        <span className="uppercase tracking-wider">Kaimganj's Premium Multi-Brand Center & Heavy Electricals Workshop · Est. 2005</span>
        <button 
          onClick={onOpenQuickDiagnostics}
          className="ml-3 underline hover:text-copper-500 transition-colors cursor-pointer hidden md:inline-flex items-center gap-1 font-sans font-bold uppercase text-[10px] tracking-widest"
        >
          Quick Diagnostic Check <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Main glass navbar */}
      <div className="w-full glass-panel py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Brandings */}
          <div 
            onClick={() => setCurrentTab('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center h-10 w-10 border border-white/10 bg-white/5 text-white transition-transform duration-300 group-hover:scale-105 rounded-md">
              <Zap className="h-5 w-5 text-copper-500 animate-pulse" />
              <div className="absolute -top-1 -right-1 bg-copper-500 text-slate-950 rounded-full h-3.5 w-3.5 flex items-center justify-center text-[8px] font-bold">★</div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-medium text-2xl tracking-[0.05em] text-white hover:text-copper-500 transition-colors">
                  JYOTI
                </span>
                <span className="font-sans font-extrabold text-xs uppercase tracking-[0.2em] text-copper-500">
                  Electricals
                </span>
              </div>
              <p className="text-[9px] text-[#8c8c8c] font-mono -mt-1 tracking-widest font-bold">
                SHOWROOM &amp; REPAIR DESK
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-widest font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-copper-500 font-bold border-b border-copper-500'
                      : 'text-[#cccccc] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* Quick Diagnostic helper for desktop */}
            <button
              onClick={onOpenQuickDiagnostics}
              className="hidden lg:flex items-center gap-2 border border-white/15 hover:bg-white hover:text-black hover:border-white text-white px-4 py-2 rounded-md text-[10.5px] uppercase tracking-wider font-semibold transition-all cursor-pointer"
            >
              <Wrench className="h-3.5 w-3.5" />
              <span>Diagnostic Check</span>
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-white/5 text-white transition-colors cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="h-5.5 w-5.5 text-slate-200" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-copper-500 text-slate-950 font-mono text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border border-slate-950 animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 absolute left-0 right-0 py-4 px-6 shadow-xl flex flex-col gap-3.5 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-left text-xs uppercase tracking-widest border-b border-transparent transition-all cursor-pointer ${
                  isActive ? 'text-copper-500 border-copper-500 pl-2' : 'text-[#cccccc] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              onOpenQuickDiagnostics();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white hover:text-slate-950 text-white py-2.5 rounded-md text-xs uppercase tracking-widest font-bold mt-2 transition-all"
          >
            <Wrench className="h-4 w-4" />
            Book Repair
          </button>
        </div>
      )}
    </header>
  );
}
