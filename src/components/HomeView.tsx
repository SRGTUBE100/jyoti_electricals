import React from 'react';
import { 
  Zap, Wrench, Shield, Award, MapPin, 
  Phone, ArrowRight, Sun, Cpu, Sparkles, Navigation, Clock
} from 'lucide-react';
import { SHOWROOM_INFO } from '../data';
import { motion } from 'motion/react';
import InteractiveWindingLab from './InteractiveWindingLab';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  onOpenQuickDiagnostics: () => void;
}

export default function HomeView({ setCurrentTab, onOpenQuickDiagnostics }: HomeViewProps) {
  // Solar integration calculator state
  const [solarInput, setSolarInput] = React.useState(300); // 300 Watts of panel
  const [batteryState, setBatteryState] = React.useState(75); // 75% charge

  // Calculate savings based on input
  const estimatedDailySavingsKWh = ((solarInput * 6) / 1000).toFixed(2); // 6 hours sunlight
  const estimatedMonthlySavingsINR = Math.round(parseFloat(estimatedDailySavingsKWh) * 8 * 30); // 8 INR per unit

  // Dynamic status checker for shop hour
  const getShopStatus = () => {
    const now = new Date();
    // Indian standard time offset adjustment is not strictly necessary for UI, 
    // but let's check local browser time
    const day = now.getDay(); // 0 is Sunday, 4 is Thursday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeFraction = hours + minutes / 60;

    if (day === 0) {
      return { text: "Closed Today (Weekly Holiday on Sunday)", color: "text-rose-500 bg-rose-50 border-rose-200" };
    }
    if (currentTimeFraction >= 9.0 && currentTimeFraction < 22.0) {
      return { text: "Open Now · Showroom hours of support 9:00 AM - 10:00 PM", color: "text-emerald-600 bg-emerald-50 border-emerald-200 animate-pulse" };
    }
    return { text: "Closed right now · Opens at 09:00 AM", color: "text-amber-600 bg-amber-50 border-amber-200" };
  };

  const currentStatus = getShopStatus();

  // Optimized animation curves
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const heroImageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      
      {/* Dynamic Glowing Ambient background effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-copper-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10 animate-pulse duration-[6000ms]" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-electric-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-amber-100 rounded-full filter blur-3xl opacity-50 -z-10" />
      
      {/* Hero Section Container */}
      <section className="relative px-6 py-12 md:py-24 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero left text column */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >
            
            <motion.div 
              variants={fadeInUpVariants}
              className="inline-flex items-center gap-1.5 self-start pb-2 border-b border-copper-500/30 text-copper-500 font-mono text-[10px] tracking-widest font-bold uppercase leading-none"
            >
              <Sparkles className="h-4 w-4 text-copper-500" />
              <span>OVER 20 YEARS OF MASTER SERVICE IN KAIMGANJ</span>
            </motion.div>

            <motion.h1 
              variants={fadeInUpVariants}
              className="editorial-serif-heading text-4xl sm:text-5xl lg:text-7xl tracking-tight text-white leading-[1.15]"
            >
              Premium Electronics &amp;{' '}
              <span className="italic font-light text-gradient bg-linear-to-r from-copper-500 to-amber-500">
                Master Repairing
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUpVariants}
              className="text-slate-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed"
            >
              Step into <span className="font-bold text-white tracking-wider">Jyoti Electricals</span>, 
              Kaimganj's ultimate destination for heavy appliances, smart TVs, and state-of-the-art power backup electronics. 
              We combine an elite retail showroom with expert technical workshops operating with 100% genuine copper wind and certified spares.
            </motion.p>

            {/* Quick interactive buttons */}
            <motion.div 
              variants={fadeInUpVariants}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => setCurrentTab('services')}
                className="editorial-button-primary flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-widest font-bold cursor-pointer"
              >
                <Wrench className="h-4 w-4" />
                <span>Explore Repairing Services</span>
              </button>
              <button
                onClick={() => setCurrentTab('shop')}
                className="editorial-button-secondary flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-widest font-bold cursor-pointer"
              >
                <span>View Product Showroom</span>
                <ArrowRight className="h-4 w-4 text-copper-500" />
              </button>
            </motion.div>

            {/* Micro details banner */}
            <motion.div 
              variants={fadeInUpVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 mt-4"
            >
              <div>
                <h4 className="text-3xl font-light text-white font-serif tracking-widest">2005</h4>
                <p className="text-[9.5px] text-[#8c8c8c] font-mono tracking-widest uppercase leading-none font-bold mt-1">ESTABLISHED YEAR</p>
              </div>
              <div>
                <h4 className="text-3xl font-light text-white font-serif tracking-widest">100%</h4>
                <p className="text-[9.5px] text-[#8c8c8c] font-mono tracking-widest uppercase leading-none font-bold mt-1">COPPER WINDINGS</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-3xl font-light text-white font-serif tracking-widest">15,000+</h4>
                <p className="text-[9.5px] text-[#8c8c8c] font-mono tracking-widest uppercase leading-none font-bold mt-1">LOCAL REPAIRS</p>
              </div>
            </motion.div>

          </motion.div>

          {/* Hero right image block */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={heroImageVariants}
            className="lg:col-span-5 relative w-full flex justify-center"
          >
            <div className="relative w-full max-w-md md:max-w-none">
              
              {/* Backglow border wrapper */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-copper-500 to-indigo-500 blur-md opacity-20 animate-pulse" />
              
              {/* Main Image Frame */}
              <div className="relative overflow-hidden bg-slate-950 border border-white/10 aspect-video lg:aspect-square flex items-center justify-center rounded-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL6KbejSdDLw07B5AMDwGdvpXiaWKUQ_CXpgNSM4m30W8UzyYirqoJNj6p_QodDY8Cbav6gmeogp8pcfg8kRnv646j0Bz-sbsqdG4YVRAnI5a79iUbx89Ei1zpNcvumOat-pZF2MsYiyWp2V3eb9VkrsjOIKzWoI9RKEFP548SwwxlUmhtDg3IDzOz6K1eJd3D1iU_JGPZ0SdadeTazmS-e2cTg6nNMBAlVYFAQ7rgkAQvF9yV6_UdAxXZ61Px0vX83Y7iwNJYOQ"
                  alt="Jyoti Electricals Micro Board Engineering and Solar integration"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-90"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating pill badge onto the image */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 p-3.5 border border-white/10 flex items-center justify-between rounded-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-copper-500 p-1.5 rounded-sm text-slate-950">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="text-white text-xs font-bold font-sans uppercase tracking-widest leading-none">Diagnostic Lab</h5>
                      <span className="text-copper-500 font-mono text-[9px] uppercase font-bold tracking-widest">100% Genuine Support</span>
                    </div>
                  </div>
                  <button 
                    onClick={onOpenQuickDiagnostics}
                    className="bg-[#1c1915] border border-white/10 hover:bg-white hover:text-slate-950 text-white text-[10px] font-mono tracking-widest uppercase font-bold px-3 py-1.5 transition-all cursor-pointer"
                  >
                    Quick Checkup
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Core Expertise Bento Board */}
      <section className="bg-[#0b0b0b] py-20 border-y border-white/10 px-6 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto space-y-12"
        >
          
          <motion.div variants={fadeInUpVariants} className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.2em] text-copper-500 uppercase font-bold">RETAIL &amp; REPAIR INTEGRITY</span>
            <h2 className="editorial-serif-heading text-3xl sm:text-5xl text-white">
              Our Core Expertise
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-normal text-sm">
              Over two decades of local mastery in retail diagnostics, electronics sales, and heavy motor winding techniques.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Bento block 1: Sales */}
            <motion.div 
              variants={fadeInUpVariants}
              className="bg-[#121212] border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all rounded-sm text-left"
            >
              <div className="space-y-4">
                <div className="h-10 w-10 border border-white/10 bg-white/5 flex items-center justify-center text-copper-500 rounded-sm">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="editorial-serif-heading text-2xl text-white">
                  Premium Sales &amp; Multi-Brand Retail Showroom
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Explore top tier household appliances directly inside our Kaimganj retail outlet. Complete with extended brand warranties, zero-interest installment options, and immediate doorstep secure shipping.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold text-slate-300">
                  <div className="bg-[#181818] border border-white/5 py-1.5 px-2.5 rounded-sm">✓ Smart TVs &amp; Soundbars</div>
                  <div className="bg-[#181818] border border-white/5 py-1.5 px-2.5 rounded-sm">✓ Inverter AC &amp; Coolers</div>
                  <div className="bg-[#181818] border border-white/5 py-1.5 px-2.5 rounded-sm">✓ Multi-Door Refrigerators</div>
                  <div className="bg-[#181818] border border-white/5 py-1.5 px-2.5 rounded-sm">✓ Heavy Copper Stabilizers</div>
                </div>
              </div>
              <button
                onClick={() => setCurrentTab('shop')} 
                className="mt-6 text-copper-500 hover:text-white font-mono text-[10px] tracking-widest uppercase font-bold inline-flex items-center gap-1.5 cursor-pointer self-start group transition-colors"
              >
                <span>Browse sales catalog</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Bento block 2: Repairs */}
            <motion.div 
              variants={fadeInUpVariants}
              className="bg-[#121212] border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all rounded-sm text-left"
            >
              <div className="space-y-4">
                <div className="h-10 w-10 border border-white/10 bg-white/5 flex items-center justify-center text-copper-500 rounded-sm">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="editorial-serif-heading text-2xl text-white">
                  Professional Board-Level Repairs &amp; Copper Winding
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  We diagnose right in front of your eyes! Our master tech bench specializes in micro-controller motherboard repair, high-grade gas pressure checks, and dual-layer varnished 100% pure copper winding for heavy water-pumps.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold text-slate-300">
                  <div className="bg-[#181818] border border-white/5 py-1.5 px-2.5 rounded-sm">⚡ System Gas Charging</div>
                  <div className="bg-[#181818] border border-white/5 py-1.5 px-2.5 rounded-sm">⚡ Capillary Tube Flushing</div>
                  <div className="bg-[#181818] border border-white/5 py-1.5 px-2.5 rounded-sm">⚡ Automatic Relay Repairs</div>
                  <div className="bg-[#181818] border border-white/5 py-1.5 px-2.5 rounded-sm">⚡ Dual Copper Rewinding</div>
                </div>
              </div>
              <button
                onClick={() => setCurrentTab('services')} 
                className="mt-6 text-copper-500 hover:text-white font-mono text-[10px] tracking-widest uppercase font-bold inline-flex items-center gap-1.5 cursor-pointer self-start group transition-colors"
              >
                <span>Schedule a repair book</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* Interactive Custom Copper Winding Lab */}
      <section className="px-6 max-w-7xl mx-auto overflow-hidden">
        <InteractiveWindingLab setCurrentTab={setCurrentTab} />
      </section>

      {/* Specialty Unique Edge Section: Interactive Solar SMU Show */}
      <section className="py-16 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Solar Left Column: Description */}
            <motion.div variants={fadeInUpVariants} className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 bg-orange-500/15 text-orange-400 px-3 py-1 rounded-full text-xs font-mono font-bold">
                <Sun className="h-3.5 w-3.5 animate-spin duration-[15000ms]" />
                <span>OUR EXCLUSIVE INNOVATIVE EDGE</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                Fully Organised MPPT Solar SMU System
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                Don't waste money throwing away your existing home inverter battery system! 
                Our custom **Jyoti Smart MPPT Solar SMU** sits right between your solar panels and your domestic inverter to harvest peak sunshine up to 99% accuracy. 
                Saves grid electricity bills by switching loads autonomously during sunshine peak times.
              </p>

              {/* Bullet points */}
              <ul className="space-y-3 text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-orange-400 rounded-full" />
                  <span>Converts standard home power system into a Hybrid Solar UPS</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-orange-400 rounded-full" />
                  <span>Equipped with 40-Amp Intelligent MPPT Algorithm tracker</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-orange-400 rounded-full" />
                  <span>Built-in smart high/low output voltage load cut-off</span>
                </li>
              </ul>

              <button
                onClick={() => setCurrentTab('shop')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-xs uppercase tracking-wide inline-flex items-center gap-1.5"
              >
                <span>Buy SMU Systems</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Solar Right Column: Interactive Solar Calculator Demonstration */}
            <motion.div variants={fadeInUpVariants} className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl relative">
              <div className="flex flex-col gap-6">
                
                <div className="border-b border-white/10 pb-4 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-white text-base font-bold flex items-center gap-2">
                      <Cpu className="text-orange-400 h-4 w-4" />
                      <span>Real-Time MPPT Core Tracker Sandbox</span>
                    </h3>
                    <span className="inline-flex self-start sm:self-auto text-[10px] bg-amber-500/15 text-amber-400 px-2.5 py-1 rounded-md border border-amber-500/30 font-bold tracking-wider font-mono">
                      UNIT PRICE: ₹3,599 FLAt
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">Simulate your system variables and observe estimated electricity offset. Complete support for capacities from 300W to 1200W at a single flat price of ₹3,599!</p>
                </div>

                {/* Input slider 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-slate-300">SOLAR PANEL CAPACITY</span>
                    <span className="text-amber-400">{solarInput} Watts</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="1200"
                    step="50"
                    value={solarInput}
                    onChange={(e) => setSolarInput(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>300W (Minimum)</span>
                    <span>1200W (Maximum)</span>
                  </div>
                </div>

                {/* Input slider 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-slate-300">BATTERY SOC (STATE OF CHARGE)</span>
                    <span className="text-sky-400">{batteryState}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={batteryState}
                    onChange={(e) => setBatteryState(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>10% (Discharged)</span>
                    <span>100% (Fully Charged)</span>
                  </div>
                </div>

                {/* Outputs Display Box */}
                <div className="bg-slate-950/90 rounded-xl p-4 border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  
                  <div className="p-3 border-r border-white/5 last:border-0 text-center">
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">MPPT OUTPUT STATUS</span>
                    <p className={`text-sm font-mono font-extrabold mt-1 uppercase ${batteryState < 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {batteryState < 90 ? 'Boost Charging' : 'Float Charging'}
                    </p>
                  </div>

                  <div className="p-3 border-r border-white/5 last:border-0 text-center">
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">DAILY SOLAR YIELD</span>
                    <p className="text-white text-lg font-mono font-bold mt-1">
                      {estimatedDailySavingsKWh} <span className="text-xs text-slate-400">kWh</span>
                    </p>
                  </div>

                  <div className="p-3 last:border-0 text-center">
                    <span className="text-orange-400 text-[10px] uppercase font-bold tracking-wider">MONEY SAVED / MO</span>
                    <p className="text-amber-300 text-lg font-mono font-semibold mt-1">
                      ₹{estimatedMonthlySavingsINR} <span className="text-xs text-slate-400 font-sans">est</span>
                    </p>
                  </div>

                </div>

                {/* Footnote */}
                <div className="text-[10px] text-slate-400 leading-normal flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-lg font-mono text-left">
                  <Shield className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                  <span>Note: Calculations are calibrated for North-Indian optimal peak coordinates. Actual savings can fluctuate with weather parameters.</span>
                </div>

              </div>
            </motion.div>

          </div>

        </motion.div>
      </section>

      {/* Operational address, map, and quick profile info */}
      <section className="bg-slate-100 py-12 px-6 border-t border-slate-200 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-left"
        >
          
          {/* Card: Address */}
          <motion.div variants={fadeInUpVariants} className="space-y-3">
            <div className="flex items-center gap-2 text-copper-700 font-extrabold">
              <MapPin className="h-5 w-5" />
              <h3 className="font-display font-bold text-lg text-slate-900">Showroom Address</h3>
            </div>
            <p className="text-sm font-normal text-slate-600 leading-relaxed font-sans">
              {SHOWROOM_INFO.address}
            </p>
            <a 
              href={SHOWROOM_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-electric-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Navigation className="h-3 w-3" />
              <span>Get live driving directions</span>
            </a>
          </motion.div>

          {/* Card: Active hours with shop Status indicator */}
          <motion.div variants={fadeInUpVariants} className="space-y-3">
            <div className="flex items-center gap-2 text-copper-700 font-extrabold">
              <Clock className="h-5 w-5" />
              <h3 className="font-display font-bold text-lg text-slate-900">Hours of Support</h3>
            </div>
            <p className="text-sm text-slate-600">
              Daily support: <strong className="text-slate-800">09:00 AM – 10:00 PM</strong>
            </p>
            <div className={`text-xs px-3 py-1.5 rounded-lg border inline-block font-mono font-bold ${currentStatus.color}`}>
              {currentStatus.text}
            </div>
          </motion.div>

          {/* Card: Instant Contact directors */}
          <motion.div variants={fadeInUpVariants} className="space-y-3">
            <div className="flex items-center gap-2 text-copper-700 font-extrabold">
              <Phone className="h-5 w-5" />
              <h3 className="font-display font-bold text-lg text-slate-900">Immediate Phone Support</h3>
            </div>
            <div className="space-y-1.5 text-xs">
              <p className="text-slate-600 font-mono">
                Vijay Rathore: <a href="tel:+919616936475" className="text-electric-700 font-extrabold hover:underline">+91 9616936475</a>
              </p>
              <p className="text-slate-600 font-mono">
                Ajay Rathore: <a href="tel:+919956697192" className="text-electric-700 font-extrabold hover:underline">+91 9956697192</a>
              </p>
              <button
                onClick={() => setCurrentTab('contact')}
                className="text-xs text-copper-700 font-bold hover:underline cursor-pointer font-sans"
              >
                View official contact page →
              </button>
            </div>
          </motion.div>

        </motion.div>
      </section>

    </div>
  );
}
