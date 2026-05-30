import React, { useState, useEffect } from 'react';
import { 
  motion, AnimatePresence 
} from 'motion/react';
import { 
  Zap, Flame, Gauge, Cpu, RefreshCw, 
  Settings2, Wrench, ShieldAlert, BadgeInfo, Play, Waves
} from 'lucide-react';

interface InteractiveWindingLabProps {
  setCurrentTab: (tab: string) => void;
}

// Custom defined configurations for motor classes
const MOTOR_CLASSES = [
  {
    id: 'cooler',
    title: 'Desert Cooler Fan Motor',
    subText: 'High Moisture Standard (24 Slot, 4 Pole)',
    basePrice: 1250,
    baseRpm: 1400,
    fluxRating: 'High Torque'
  },
  {
    id: 'ceiling',
    title: 'Ceiling Fan Stator Coil',
    subText: 'Ultra High RPM Loop (14+14 Pole Speed)',
    basePrice: 299,
    baseRpm: 380,
    fluxRating: 'Direct Drive'
  },
  {
    id: 'pump',
    title: 'Submersible Water Pump 1HP',
    subText: 'Extreme Heavy Duty (Continuous Submarine)',
    basePrice: 2400,
    baseRpm: 2880,
    fluxRating: 'Peak Sub-Hydraulics'
  },
  {
    id: 'stabilizer',
    title: 'Power Stabilizer Transformer Choke',
    subText: 'High Wattage Silicon Core (Multi-Tap)',
    basePrice: 1900,
    baseRpm: 0, // static transformer coil
    fluxRating: 'Inductive Step-Up'
  }
];

// Copper Wire Gauge Sizes (Standard Wire Gauge - SWG)
const WIRE_GAUGES = [
  { swg: '28 SWG', thickness: 'Heavy Duty Thick (0.376mm)', multiplier: 1.25, lossFactor: 0.8 },
  { swg: '30 SWG', thickness: 'Standard Balanced (0.315mm)', multiplier: 1.0, lossFactor: 1.0 },
  { swg: '32 SWG', thickness: 'Eco High Turn-Count (0.274mm)', multiplier: 0.85, lossFactor: 1.35 }
];

// Thermal Varnish Shield Ratings
const COATING_MODIFIERS = [
  { id: 'standard', title: 'Single Polish Liquid Varnish', costAdd: 0, limitTemp: 105, color: '#f59e0b' },
  { id: 'double-epoxy', title: 'Double Glass-Baked Epoxy Shield', costAdd: 180, limitTemp: 180, color: '#f97316' }
];

export default function InteractiveWindingLab({ setCurrentTab }: InteractiveWindingLabProps) {
  const [selectedMotorId, setSelectedMotorId] = useState('cooler');
  const [selectedGauge, setSelectedGauge] = useState('30 SWG');
  const [selectedMaterial, setSelectedMaterial] = useState<'copper' | 'aluminium'>('copper');
  const [selectedVarnishId, setSelectedVarnishId] = useState('standard');
  const [turns, setTurns] = useState(380); // Slider input
  
  // Simulation states
  const [isSimulating, setIsSimulating] = useState(false);
  const [temperature, setTemperature] = useState(38); // Centigrade
  const [currentSurgeVoltage, setCurrentSurgeVoltage] = useState(230); // Volts
  const [simulationStepStatus, setSimulationStepStatus] = useState<'idle' | 'testing' | 'critical' | 'passed' | 'recovering'>('idle');
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  // Find active data objects
  const activeMotor = MOTOR_CLASSES.find(m => m.id === selectedMotorId) || MOTOR_CLASSES[0];
  const activeGauge = WIRE_GAUGES.find(g => g.swg === selectedGauge) || WIRE_GAUGES[1];
  const activeVarnish = COATING_MODIFIERS.find(v => v.id === selectedVarnishId) || COATING_MODIFIERS[0];

  // Dynamic visual wire colors
  const wireStrokeColor = selectedMaterial === 'copper'
    ? (activeVarnish.id === 'double-epoxy' ? '#f97316' : '#d97706')
    : (activeVarnish.id === 'double-epoxy' ? '#94a3b8' : '#cbd5e1');

  const wireStrokeOuter = selectedMaterial === 'copper'
    ? (activeVarnish.id === 'double-epoxy' ? '#ea580c' : '#b45309')
    : (activeVarnish.id === 'double-epoxy' ? '#475569' : '#64748b');

  // Dynamic cost calculation (Aluminium is eco-grade with ~40% cost reduction)
  const materialMultiplier = selectedMaterial === 'copper' ? 1.0 : 0.60;
  const calculatedCost = Math.round(
    (activeMotor.basePrice * activeGauge.multiplier * (turns / 350) * materialMultiplier) + activeVarnish.costAdd
  );

  // Dynamic efficiency calculations (Aluminium has slightly lower conductivity/flux than copper)
  const conductivityFactor = selectedMaterial === 'copper' ? 1.1 : 0.85;
  const magneticFluxIntensity = Math.round((turns * (activeMotor.id === 'pump' ? 1.4 : conductivityFactor)) / activeGauge.lossFactor);
  const rpmOutput = activeMotor.baseRpm > 0 
    ? Math.round(activeMotor.baseRpm * (350 / turns) * (activeGauge.swg === '28 SWG' ? 1.05 : 0.95) * (selectedMaterial === 'copper' ? 1.0 : 0.93))
    : 0;

  // Real-time thermal fluctuation in idle state based on motor load (mock)
  useEffect(() => {
    if (isSimulating) return;
    const interval = setInterval(() => {
      // Gentle floating temperature between 36C and 41C
      setTemperature(t => {
        const target = 36 + Math.round(Math.random() * 5);
        return t < target ? t + 1 : t - 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Generate spark particles animation for simulation loops
  const triggerSparks = () => {
    const newSparks = Array.from({ length: 8 }).map((_, idx) => ({
      id: Date.now() + idx,
      x: 35 + Math.random() * 30, // Percentage bounds inside SVG
      y: 35 + Math.random() * 30
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 800);
  };

  // Run full simulation routine (Interactive voltage surge simulation)
  const runSurgeSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStepStatus('testing');
    
    // Stage 1: Stabilized current
    setTemperature(42);
    setCurrentSurgeVoltage(230);

    // Stage 2: Voltage surge begins (after 1s)
    setTimeout(() => {
      setCurrentSurgeVoltage(380);
      setTemperature(74);
      triggerSparks();
    }, 1200);

    // Stage 3: Extreme 440V double-phase spikes (after 2.5s)
    setTimeout(() => {
      setCurrentSurgeVoltage(440);
      
      // Calculate heat load based on physical inputs
      const insulationBuffer = activeVarnish.id === 'double-epoxy' ? 20 : -15;
      const materialResistanceHeatAdd = selectedMaterial === 'copper' ? 0 : 38;
      const wireCoreLoadTemp = Math.round(110 * activeGauge.lossFactor + (turns / 15) - insulationBuffer + materialResistanceHeatAdd);
      setTemperature(wireCoreLoadTemp);
      
      triggerSparks();
      setSimulationStepStatus('critical');
    }, 2800);

    // Stage 4: Evaluation based on selections
    setTimeout(() => {
      triggerSparks();
      setSimulationStepStatus('passed');
    }, 4500);

    // Stage 5: Resetting / Cooling down
    setTimeout(() => {
      setSimulationStepStatus('recovering');
      // Gradual cooldown
    }, 7000);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationStepStatus('idle');
      setCurrentSurgeVoltage(230);
      setTemperature(38);
    }, 9000);
  };

  // Cooldown effect loop
  useEffect(() => {
    if (simulationStepStatus === 'recovering') {
      const cooldown = setInterval(() => {
        setTemperature(prev => (prev > 45 ? prev - 15 : prev));
        setCurrentSurgeVoltage(prev => (prev > 230 ? prev - 50 : 230));
      }, 300);
      return () => clearInterval(cooldown);
    }
  }, [simulationStepStatus]);

  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 mt-12 mb-16 text-left relative overflow-hidden" id="interactive-winding-lab-main">
      <div className="absolute top-0 right-0 w-64 h-64 bg-copper-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4f6cf7]/5 rounded-full blur-3xl -z-10" />

      {/* Header and Badge */}
      <div className="border-b border-white/10 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-[#201c18] border border-copper-700/30 px-2.5 py-1 rounded-sm text-[9px] font-mono tracking-widest text-copper-500 uppercase font-bold">
            <Cpu className="h-3 w-3 animate-pulse text-copper-500" />
            <span>Interactive Laboratory Sandbox</span>
          </div>
          <h2 className="editorial-serif-heading text-2xl sm:text-4xl text-white font-serif">
            Copper-wind Simulator &amp; Stress Lab
          </h2>
          <p className="text-slate-400 text-xs font-sans max-w-xl">
            Configure your electric cores dynamically. Choose wire thickness, stator counts, and heat varnish shields to run full-voltage overload spikes in real time.
          </p>
        </div>

        {/* Current Cost Calculator display */}
        <div className="bg-gradient-to-br from-[#1c1915] to-[#121212] border border-copper-500/20 px-6 py-4 rounded-xl text-right flex flex-col justify-center min-w-[200px]">
          <span className="text-[9px] tracking-widest uppercase font-mono text-slate-500 font-bold block mb-1">
            ESTIMATED CORE RATE
          </span>
          <span className="text-3xl font-mono text-copper-500 font-bold">
            ₹{calculatedCost}
          </span>
          <span className="text-[10px] text-slate-400 font-light font-sans mt-0.5">
            Incl. original copper wire + labor charge
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Selector adjustments */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Section: Select motor */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c8c8c] font-mono flex items-center gap-1.5">
              <Settings2 className="h-3.5 w-3.5 text-copper-500" />
              <span>1. Choose Appliance Core</span>
            </label>
            <div className="flex flex-col gap-2">
              {MOTOR_CLASSES.map(motor => (
                <button
                  key={motor.id}
                  onClick={() => !isSimulating && setSelectedMotorId(motor.id)}
                  disabled={isSimulating}
                  className={`text-left p-3 rounded-xl border transition-all duration-300 text-xs flex justify-between items-center ${
                    selectedMotorId === motor.id 
                      ? 'border-copper-500 bg-copper-500/10 text-white' 
                      : 'border-white/5 bg-[#181818] text-slate-400 hover:border-white/10 hover:text-white'
                  } ${isSimulating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="space-y-0.5">
                    <strong className="block font-bold">{motor.title}</strong>
                    <span className="text-[9.5px] opacity-70 block font-mono">{motor.subText}</span>
                  </div>
                  {selectedMotorId === motor.id && (
                    <motion.div layoutId="motorActiveDot" className="h-2 w-2 rounded-full bg-copper-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Selected gauge */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c8c8c] font-mono flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5 text-copper-500" />
              <span>2. Standard Wire Gauge (SWG)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {WIRE_GAUGES.map(g => (
                <button
                  key={g.swg}
                  onClick={() => !isSimulating && setSelectedGauge(g.swg)}
                  disabled={isSimulating}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    selectedGauge === g.swg 
                      ? 'border-copper-500 bg-[#2b251e] text-white font-bold' 
                      : 'border-white/5 bg-[#181818] text-slate-400 hover:border-white/10'
                  } ${isSimulating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="block text-xs font-mono">{g.swg}</span>
                  <span className="text-[8px] opacity-60 font-sans block truncate">{g.swg === '28 SWG' ? 'Thick' : g.swg === '30 SWG' ? 'Med' : 'Thin'}</span>
                </button>
              ))}
            </div>
            <p className="text-[9.5px] text-slate-500 mt-1.5 font-mono leading-none">
              Thickness: {activeGauge.thickness}
            </p>
          </div>

          {/* Section: Winding Material */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c8c8c] font-mono flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-copper-500" />
              <span>3. Winding Material Choice</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => !isSimulating && setSelectedMaterial('copper')}
                disabled={isSimulating}
                className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedMaterial === 'copper' 
                    ? 'border-copper-500 bg-[#2b251e]/80 text-white' 
                    : 'border-white/5 bg-[#181818] text-slate-400 hover:border-white/10'
                } ${isSimulating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className="block text-xs font-bold leading-none mb-1">100% Pure Copper</span>
                <span className="text-[8.5px] opacity-75 font-sans block leading-snug">Calibrated thermal longevity</span>
                <span className="text-[9px] font-mono text-copper-500 font-bold block mt-1">1.0x Core Price</span>
              </button>
              
              <button
                type="button"
                onClick={() => !isSimulating && setSelectedMaterial('aluminium')}
                disabled={isSimulating}
                className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedMaterial === 'aluminium' 
                    ? 'border-sky-500 bg-sky-950/25 text-white' 
                    : 'border-white/5 bg-[#181818] text-slate-400 hover:border-white/10'
                } ${isSimulating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className="block text-xs font-bold leading-none mb-1 text-sky-200">100% Aluminium</span>
                <span className="text-[8.5px] opacity-75 font-sans block leading-snug">Eco-Grade light winding</span>
                <span className="text-[9px] font-mono text-sky-400 font-bold block mt-1">40% Less Cost</span>
              </button>
            </div>
            <p className="text-[9.5px] text-slate-500 mt-1 font-mono leading-none">
              Material selected: <strong className="text-white uppercase font-bold">{selectedMaterial === 'copper' ? 'Pure Grade Copper coils' : 'Super Grade Aluminium coils'}</strong>
            </p>
          </div>

          {/* Section: Varnish Shield */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c8c8c] font-mono flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-copper-500" />
              <span>4. Heat Protection Resin Shield</span>
            </label>
            <div className="flex flex-col gap-2">
              {COATING_MODIFIERS.map(c => (
                <button
                  key={c.id}
                  onClick={() => !isSimulating && setSelectedVarnishId(c.id)}
                  disabled={isSimulating}
                  className={`text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
                    selectedVarnishId === c.id 
                      ? 'border-copper-500 bg-copper-500/5 text-white' 
                      : 'border-white/5 bg-[#181818] text-slate-400 hover:border-white/10'
                  } ${isSimulating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div>
                    <span className="font-bold block">{c.title}</span>
                    <span className="text-[9.5px] opacity-60 font-mono">Heat Limit: Up to {c.limitTemp}°C</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-copper-500">
                    {c.costAdd === 0 ? 'Included' : `+₹${c.costAdd}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Turns slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-mono font-bold text-[#8c8c8c]">
              <span className="uppercase">5. Coil Turn Count</span>
              <span className="text-copper-500 font-bold">{turns} Rounds</span>
            </div>
            <input
              type="range"
              min="200"
              max="500"
              step="10"
              value={turns}
              onChange={(e) => !isSimulating && setTurns(parseInt(e.target.value))}
              disabled={isSimulating}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-copper-500"
            />
            <div className="flex justify-between text-[8px] text-slate-600 font-mono">
              <span>200 (Lower magnetic load)</span>
              <span>500 (Heavy industrial loop)</span>
            </div>
          </div>

        </div>

        {/* Center Canvas Column: SVG Visualizer of actual winding core */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#0b0b0b] rounded-2xl border border-white/5 py-8 px-4 flex flex-col items-center justify-center relative aspect-square overflow-hidden">
            
            {/* Visual diagnostic status ticker in corner */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 font-mono text-[9px] bg-white/5 px-2.5 py-1 border border-white/5 rounded-sm">
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${isSimulating ? 'bg-orange-500 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-slate-400">STATUS: </span>
              <span className="text-white font-bold tracking-wider">{isSimulating ? 'STRESS SIMULATOR ON' : 'SYSTEM HEALTH OK'}</span>
            </div>

            {/* Glowing magnetic fields indicator */}
            {isSimulating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 bg-radial from-orange-500/10 to-transparent pointer-events-none"
              />
            )}

            {/* Simulated Voltage wave lines overlay background */}
            <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 150 Q 80 50, 160 150 T 320 150 T 480 150" fill="none" stroke="white" strokeWidth="2" />
                <path d="M 0 200 Q 100 100, 200 200 T 400 200 T 600 200" fill="none" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Spark explosion overlays during simulation */}
            {sparks.map(s => (
              <motion.div 
                key={s.id}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [1, 1.8], opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ top: `${s.y}%`, left: `${s.x}%` }}
                className="absolute h-5 w-5 pointer-events-none"
              >
                <div className="absolute h-full w-full bg-orange-400 blur-xs rounded-full opacity-60" />
                <Zap className="h-4 w-4 text-amber-200 block relative z-10" />
              </motion.div>
            ))}

            {/* Main Winding SVG Visualization Stator model */}
            <svg viewBox="0 0 200 200" className="w-64 h-64 select-none relative z-10">
              
              {/* External mechanical steel bracket skeleton ring */}
              <circle cx="100" cy="100" r="85" fill="none" stroke="#242424" strokeWidth="6" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#1f1f1f" strokeWidth="1" />

              {/* Electromagnetic laminated steel slots loops */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 360) / 16;
                return (
                  <g key={i} transform={`rotate(${angle} 100 100)`}>
                    {/* Metal slot tooth */}
                    <rect x="96" y="24" width="8" height="20" fill="#333333" rx="1" />
                    {/* Concentric copper loops inside slot block representing turns */}
                    <motion.rect 
                      x="94" 
                      y="26" 
                      width="12" 
                      height="16" 
                      fill="none" 
                      stroke={wireStrokeColor} 
                      strokeWidth={activeGauge.swg === '28 SWG' ? '2.5' : activeGauge.swg === '30 SWG' ? '1.8' : '1.1'}
                      className="opacity-90"
                      initial={{ scale: 1 }}
                      animate={isSimulating ? {
                        scale: [1, 1.05, 1],
                        stroke: [wireStrokeColor, '#f43f5e', wireStrokeColor]
                      } : {}}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                  </g>
                );
              })}

              {/* Interior Copper winding loops overlays connecting slots */}
              <circle cx="100" cy="100" r="54" fill="none" stroke={wireStrokeOuter} strokeWidth={activeGauge.swg === '28 SWG' ? '4' : '2.5'} strokeDasharray="6,4" className="opacity-80" />
              <circle cx="100" cy="100" r="48" fill="none" stroke={wireStrokeColor} strokeWidth={activeGauge.swg === '28 SWG' ? '3' : '1.8'} className="opacity-70" />

              {/* Core spinning rotor cylinder in middle (spins only when rpm > 0) */}
              <motion.g 
                animate={rpmOutput > 0 ? { rotate: 360 } : {}}
                transition={rpmOutput > 0 ? {
                  repeat: Infinity, 
                  duration: Math.max(0.2, 10 - (rpmOutput / 300)), 
                  ease: "linear"
                } : {}}
                style={{ transformOrigin: '100px 100px' }}
              >
                {/* Steel rotor disc */}
                <circle cx="100" cy="100" r="38" fill="#181818" stroke="#333" strokeWidth="2" />
                {/* Aluminum bars squirrel-cage slots inside rotor */}
                {Array.from({ length: 8 }).map((_, idx) => {
                  const ang = (idx * 360) / 8;
                  return (
                    <line 
                      key={idx} 
                      x1="100" 
                      y1="67" 
                      x2="100" 
                      y2="73" 
                      stroke="#888" 
                      strokeWidth="2.5" 
                      transform={`rotate(${ang} 100 100)`} 
                    />
                  );
                })}
                {/* Central hard carbon steel axle shaft rod */}
                <circle cx="100" cy="100" r="10" fill="#292929" />
                <circle cx="100" cy="100" r="5" fill="#4a4a4a" />
                {/* Direction indicator dynamic notches */}
                <line x1="97" y1="100" x2="103" y2="100" stroke="#f3f3f3" strokeWidth="1" />
              </motion.g>

              {/* Glowing electrical particles flow ring during stress testing */}
              {isSimulating && (
                <motion.circle 
                  cx="100" 
                  cy="100" 
                  r="51" 
                  fill="none" 
                  stroke="#60a5fa" 
                  strokeWidth="2.5" 
                  strokeDasharray="15,65"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  style={{ transformOrigin: '100px 100px' }}
                />
              )}
            </svg>

            {/* Live simulation voltage overlay dashboard */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-white/5 p-3 rounded-lg flex items-center justify-between font-mono text-[10px]">
              <div className="text-left">
                <span className="text-slate-500 block text-[8px] uppercase">DYNAMIC LOAD INPUT</span>
                <span className={`font-bold ${isSimulating ? 'text-amber-400' : 'text-slate-200'}`}>
                  {currentSurgeVoltage}V AC
                </span>
              </div>
              <div className="text-center">
                <span className="text-slate-500 block text-[8px] uppercase">CORE RESISTANCE</span>
                <span className="text-slate-200 font-bold">
                  {(10.8 * (350 / turns) * activeGauge.lossFactor).toFixed(1)} Ω
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[8px] uppercase">MAGNETIC FLUX</span>
                <span className="text-indigo-400 font-bold">
                  {magneticFluxIntensity} µWb
                </span>
              </div>
            </div>

          </div>

          {/* Trigger interactive simulation controls */}
          <button
            onClick={runSurgeSimulation}
            disabled={isSimulating}
            className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3 border text-xs tracking-wider uppercase font-bold transition-all cursor-pointer ${
              isSimulating 
                ? 'bg-rose-950/20 text-rose-400 border-rose-950/40 cursor-not-allowed' 
                : 'bg-gradient-to-r from-copper-600 to-copper-500 text-slate-950 border-copper-500 hover:from-white hover:to-white hover:text-slate-950 font-bold'
            }`}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-rose-400" />
                <span>Stress surge routine active... ({currentSurgeVoltage}V)</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current text-slate-950" />
                <span>Simulate 440 Volt Power Surge</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Real-time Stats feedback & Book Order form */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Section: Meters gages panels */}
          <div className="bg-[#181818] rounded-xl p-5 border border-white/5 space-y-5">
            <h4 className="text-white text-[10px] font-mono tracking-widest font-bold uppercase border-b border-white/5 pb-2">
              Diagnostics Desk
            </h4>

            {/* Meter 1: Heat Temp */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400">CORE TEMPERATURE</span>
                <span className={`font-bold ${temperature > 90 ? 'text-rose-400 font-bold animate-pulse' : 'text-slate-200'}`}>
                  {temperature}°C
                </span>
              </div>
              
              {/* Heat bar visual */}
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: '15%' }}
                  animate={{ width: `${Math.min(100, (temperature / activeVarnish.limitTemp) * 100)}%` }}
                  transition={{ duration: 0.4 }}
                  className={`h-full rounded-full ${
                    temperature > 100 
                      ? 'bg-gradient-to-r from-rose-500 to-rose-400' 
                      : temperature > 70 
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400' 
                        : 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                  }`}
                />
              </div>

              <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                <span>Ambient (36°C)</span>
                <span>Varnish Limit ({activeVarnish.limitTemp}°C)</span>
              </div>
            </div>

            {/* Meter 2: RPM Output */}
            {activeMotor.baseRpm > 0 && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-400">EXPECTED VELOCITY</span>
                  <span className="text-slate-200 font-bold">{isSimulating && simulationStepStatus === 'critical' ? rpmOutput + 150 : rpmOutput} RPM</span>
                </div>
                
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: '40%' }}
                    animate={{ width: `${Math.min(100, (rpmOutput / 3000) * 100)}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-electric-500 to-electric-400"
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                  <span>Standard Draft</span>
                  <span>Max Spec ({activeMotor.baseRpm} RPM)</span>
                </div>
              </div>
            )}

            {/* Realtime Safety Status Evaluation Card block */}
            <div className="bg-slate-950/80 rounded-xl p-3.5 border border-white/5 text-xs text-left">
              <AnimatePresence mode="wait">
                {simulationStepStatus === 'idle' && (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-1"
                  >
                    <span className="font-bold text-copper-500 flex items-center gap-1.5 uppercase tracking-wider text-[9px] font-mono">
                      <BadgeInfo className="h-3.5 w-3.5" />
                      <span>Configuration Standby</span>
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Custom {selectedMaterial === 'copper' ? 'pure copper-winding' : 'super grade aluminium-winding'} layout is ready. Run the high-voltage spike loop using standard 440 Volt simulator button.
                    </p>
                  </motion.div>
                )}

                {simulationStepStatus === 'testing' && (
                  <motion.div 
                    key="testing"
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-1"
                  >
                    <span className="font-bold text-[#4f6cf7] flex items-center gap-1.5 uppercase tracking-wider text-[9px] font-mono animate-pulse">
                      <Waves className="h-3.5 w-3.5 animate-spin" />
                      <span>Phase voltage rising</span>
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Laminated slot teeth reacting to line voltage change. Grid stabilization capacitors holding.
                    </p>
                  </motion.div>
                )}

                {simulationStepStatus === 'critical' && (
                  <motion.div 
                    key="critical"
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-1"
                  >
                    <span className="font-bold text-orange-500 flex items-center gap-1.5 uppercase tracking-wider text-[9px] font-mono animate-bounce">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      <span>Surge peak (440 Volts)</span>
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Extreme high-inductance workload. Core temperatures climbing to {temperature}°C. Testing insulation integrity.
                    </p>
                  </motion.div>
                )}

                {simulationStepStatus === 'passed' && (
                  <motion.div 
                    key="passed"
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-1.5"
                  >
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[9px] font-mono">
                      <Zap className="h-3.5 w-3.5" />
                      <span>TEST SUCCESSFUL</span>
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {selectedMaterial === 'copper' ? (
                        activeVarnish.id === 'double-epoxy' 
                          ? 'Jyoti Glass-baked Double Epoxy shell successfully survived 440V double-phase stress with absolute zero copper layer melting. Solid thermal endurance!'
                          : 'Pure physical copper windings survived safely without coil melting. Standard insulation showed minor heating but core operates flawlessly.'
                      ) : (
                        activeVarnish.id === 'double-epoxy'
                          ? 'Super Grade Aluminium winding secured by Double Epoxy shell withstood the high-stress spike. Orange/silver composite holds up perfectly!'
                          : 'Double-varnished Aluminium core cleared the surge. Heat reached a warm, peak temperature but remains highly economical & safe for domestic duty.'
                      )}
                    </p>
                  </motion.div>
                )}

                {simulationStepStatus === 'recovering' && (
                  <motion.div 
                    key="recovering"
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-1"
                  >
                    <span className="font-bold text-[#8c8c8c] flex items-center gap-1.5 uppercase tracking-wider text-[9px] font-mono animate-pulse">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Coils Cooldown cycle</span>
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Stabilizing stator temperatures. Dissipating residual inductive magnetic fields. Resetting core parameters.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Book this specific wound configuration */}
          <div className="bg-[#1c1915] border border-copper-700/20 p-5 rounded-2xl flex flex-col gap-3">
            <h5 className="font-sans font-bold text-white text-xs uppercase tracking-wider">
              Secure Lifetime Peace
            </h5>
            <p className="text-[11px] text-slate-400 leading-normal">
              Book this certified winding layout at our Railway Road workshop desk. Direct 6-Month copper warranty card signed by our Managing Directors.
            </p>
            <button
              onClick={() => {
                setCurrentTab('services');
                setTimeout(() => {
                  const scrollSection = document.getElementById('scheduler-booking-form-box');
                  if (scrollSection) {
                    scrollSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 200);
              }}
              className="w-full text-center bg-white hover:bg-slate-200 text-slate-950 font-extrabold uppercase font-mono tracking-widest text-[10px] py-3 rounded-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              Book Reparation/Winding
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
