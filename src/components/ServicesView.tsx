import React from 'react';
import { 
  Wrench, ShieldCheck, Calendar, Clock, MapPin, 
  User, Mail, Phone, Cpu, HelpCircle, CheckCircle, 
  ChevronRight, AlertTriangle, Sparkles, DollarSign,
  Send
} from 'lucide-react';
import { BookingDetails, ServiceCategory } from '../types';
import { SERVICES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesViewProps {
  initialServiceId?: string;
}

export default function ServicesView({ initialServiceId = "" }: ServicesViewProps) {
  // Booking state
  const [activeBookingCategory, setActiveBookingCategory] = React.useState<ServiceCategory | null>(
    SERVICES.find(s => s.id === initialServiceId) || SERVICES[0]
  );
  
  const [form, setForm] = React.useState<BookingDetails>({
    fullName: "",
    phone: "",
    email: "",
    serviceId: SERVICES[0].id,
    deviceModel: "",
    issueDescription: "",
    preferredDate: "",
    preferredTimeSlot: "10:00 AM - 01:00 PM",
    pincode: "209630"
  });

  const [validationError, setValidationError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [bookingTicket, setBookingTicket] = React.useState<any | null>(null);

  // Sync category selector box with state
  React.useEffect(() => {
    const selected = SERVICES.find(s => s.id === form.serviceId);
    if (selected) {
      setActiveBookingCategory(selected);
    }
  }, [form.serviceId]);

  // Handle text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  // Submit appointment booking
  const handleBookRepair = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Core validations
    if (!form.fullName.trim()) return setValidationError("Please state your Full Name.");
    if (!form.phone.trim() || form.phone.length < 10) return setValidationError("Please enter a valid 10-digit mobile number.");
    if (!form.deviceModel.trim()) return setValidationError("Please enter your electronic device brand/model (e.g., L.G. 1.5Ton Split).");
    if (!form.preferredDate) return setValidationError("Please select your preferred appointment date.");
    
    // Pincode local validity validation
    const pin = form.pincode.trim();
    const isKaimganjCovered = pin.startsWith("2096") || pin.startsWith("2097") || pin === "209630" || pin === "209601";
    if (!isKaimganjCovered) {
      return setValidationError("Pincode warning: Our heavy pickup/electrical van only covers Kaimganj and neighbouring suburbs (Pincodes starting with 2096xx or 2097xx).");
    }

    setIsSubmitting(true);
    setValidationError("");

    const generatedTicketNo = `JYOTI-REP-${Math.floor(100000 + Math.random() * 900000)}`;

    // Submit booking data asynchronously to Formspree
    try {
      const formspreeId = (import.meta as any).env?.VITE_FORMSPREE_FORM_ID || "xeedwjyw";
      await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _to: "vk30035@gmail.com",
          subject: `DIAGNOSTIC BOOKED: ${generatedTicketNo} - ${form.fullName}`,
          ticketNumber: generatedTicketNo,
          customerName: form.fullName,
          customerPhone: form.phone,
          customerEmail: form.email || "not-provided@jyoti.com",
          pincode: form.pincode,
          applianceType: activeBookingCategory?.title || "Consumer Electronics",
          deviceModel: form.deviceModel,
          errorSymptoms: form.issueDescription || "General troubleshooting alignment requested.",
          scheduledDate: form.preferredDate,
          preferredTime: form.preferredTimeSlot,
          notice: "No home service/delivery available. User will carry the appliance to the workshop counter."
        })
      });
    } catch (err) {
      console.warn("Could not submit scheduler ticket over Formspree:", err);
    } finally {
      setIsSubmitting(false);
    }

    // Success generation ticket setup
    const diagnosticTicket = {
      ticketNumber: generatedTicketNo,
      customerName: form.fullName,
      phone: form.phone,
      serviceTitle: activeBookingCategory?.title || "Consumer Electronics",
      baseFee: activeBookingCategory?.baseDiagnosticsPrice || 250,
      scheduledDate: form.preferredDate,
      timeSlot: form.preferredTimeSlot,
      createdAt: new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };

    setBookingTicket(diagnosticTicket);
    setValidationError("");
  };

  const handleResetBookingForm = () => {
    setForm({
      fullName: "",
      phone: "",
      email: "",
      serviceId: SERVICES[0].id,
      deviceModel: "",
      issueDescription: "",
      preferredDate: "",
      preferredTimeSlot: "10:00 AM - 01:00 PM",
      pincode: "209630"
    });
    setBookingTicket(null);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-hidden">
      
      {/* Banner / Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3 mb-10 sm:mb-12 max-w-3xl mx-auto"
      >
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-copper-500 block mb-1">
          COPPER-GRADE REPAIR &amp; AUTHORIZED SPARES
        </span>
        <h1 className="editorial-serif-heading text-3xl sm:text-5xl text-white">
          Expert Diagnostic &amp; Genuine Repairs
        </h1>
        <p className="text-slate-400 font-normal text-xs sm:text-sm leading-relaxed font-sans">
          Forget sub-standard local repairmen using cheap aluminum wires. We deploy certified technicians with state-of-the-art diagnostic kits and thick, pure-copper windings for lifetime load peace.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Specialties List */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="lg:col-span-7 space-y-6"
        >
          <h2 className="editorial-serif-heading text-2xl text-white text-left flex items-center gap-2 border-b border-white/15 pb-3">
            <Cpu className="text-copper-500 h-5 w-5 animate-pulse" />
            <span>Field Specialties</span>
          </h2>

          <div className="space-y-4">
            {SERVICES.map((serv) => {
              const isSelected = form.serviceId === serv.id;
              return (
                <motion.div 
                  variants={fadeInUp}
                  key={serv.id}
                  onClick={() => setForm(prev => ({ ...prev, serviceId: serv.id }))}
                  className={`border text-left rounded-sm overflow-hidden transition-all duration-300 cursor-pointer flex flex-col sm:flex-row ${
                    isSelected 
                      ? 'border-copper-500 bg-[#1c1915]' 
                      : 'border-white/10 bg-[#121212] hover:border-copper-500/25'
                  }`}
                >
                  {/* Image left or top */}
                  <div className="sm:w-1/3 aspect-video sm:aspect-auto min-h-[140px] relative bg-[#181818] overflow-hidden">
                    <img
                      src={serv.image}
                      alt={serv.title}
                      className="w-full h-full object-cover opacity-80 transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-950/80 text-[#f3f3f3] font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm font-bold border border-white/5">
                      Est. {serv.estimatedTime}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:w-2/3 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="editorial-serif-heading text-lg text-white leading-tight font-medium font-serif">
                          {serv.title}
                        </h3>
                        <span className="text-[10px] font-mono font-bold text-copper-500 bg-[#2b251e] px-2.5 py-1 rounded-sm uppercase tracking-wider border border-copper-500/20 whitespace-nowrap">
                          ₹{serv.baseDiagnosticsPrice} Base
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-normal leading-relaxed font-sans">
                        {serv.description}
                      </p>
                    </div>

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1 font-mono">
                      {serv.tags.map((tg, idx) => (
                        <span 
                          key={idx} 
                          className="bg-white/5 text-[#cccccc] border border-white/5 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-sm"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>

                    {/* Bullet elements list */}
                    <div 
                      className="pt-3 border-t border-white/10 space-y-1.5 text-[10px] text-slate-400 font-mono tracking-wide"
                    >
                      <p className="text-[9px] text-[#8c8c8c] font-sans uppercase font-bold tracking-widest">Diagnostics Coverage:</p>
                      {serv.details.map((b, bIdx) => (
                        <div key={bIdx} className="flex gap-1.5 items-center">
                          <span className="h-1 w-1 bg-copper-500 rounded-full" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Dynamic Scheduler Form */}
        <motion.div 
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full mt-6 lg:mt-0"
        >
          <div className="sticky top-24 bg-[#121212] rounded-sm p-5 sm:p-6 border border-white/10 text-left">
            
            {!bookingTicket ? (
              <form onSubmit={handleBookRepair} className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="editorial-serif-heading text-xl text-white flex items-center gap-1.5">
                    <Wrench className="text-copper-500 h-5 w-5" />
                    <span>Diagnostics Scheduler</span>
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 font-sans">
                    Book a slot immediately. Our pickup truck includes free transit coverage.
                  </p>
                </div>

                <div className="bg-[#181818] border border-white/5 p-3 rounded-sm flex items-center justify-between font-mono text-xs text-slate-300">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold block">ACTIVE DIAGNOSTIC</span>
                    <strong className="text-white uppercase tracking-wider">{activeBookingCategory?.title}</strong>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[9px] text-slate-500 uppercase font-bold block">EST. FEE</span>
                    <strong className="text-copper-500 font-bold">₹{activeBookingCategory?.baseDiagnosticsPrice}</strong>
                  </div>
                </div>

                {validationError && (
                  <div className="bg-[#1c1415] border border-rose-500/20 p-3 rounded-sm flex items-start gap-2 text-rose-400 text-xs leading-normal font-sans">
                    <AlertTriangle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider">YOUR FULL NAME *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Rahul Sharma"
                      value={form.fullName}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 text-sm rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider">MOBILE NUMBER *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit number"
                        value={form.phone}
                        onChange={handleChange}
                        maxLength={10}
                        className="w-full pl-9 pr-4 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 text-sm rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-mono"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider">PINCODE CORNER *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                      <input
                        type="text"
                        name="pincode"
                        placeholder="e.g. 209630"
                        value={form.pincode}
                        onChange={handleChange}
                        maxLength={6}
                        className="w-full pl-9 pr-4 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 text-sm rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider">DEVICE BRAND &amp; MODEL *</label>
                  <input
                    type="text"
                    name="deviceModel"
                    placeholder="e.g. Samsung 1.5Ton split inverter AC"
                    value={form.deviceModel}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 text-sm rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider font-mono">BRIEF FAULT DETAILS</label>
                  <textarea
                    name="issueDescription"
                    rows={2}
                    placeholder="E.g. compressor trips repeatedly / no cool air"
                    value={form.issueDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 text-sm rounded-sm bg-[#181818] text-white placeholder:text-slate-600 resize-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider uppercase">PREFERRED DATE *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                      <input
                        type="date"
                        name="preferredDate"
                        value={form.preferredDate}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 text-xs rounded-sm bg-[#181818] text-white font-mono"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider uppercase">PREFERRED TIME SLOT</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                      <select
                        name="preferredTimeSlot"
                        value={form.preferredTimeSlot}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-3 border border-white/10 focus:outline-none focus:border-copper-500 text-xs uppercase rounded-sm bg-[#181818] text-white font-mono"
                      >
                        <option value="10:00 AM - 01:00 PM">10 AM – 1 PM</option>
                        <option value="01:00 PM - 04:00 PM">1 PM – 4 PM</option>
                        <option value="04:00 PM - 07:00 PM">4 PM – 7 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-copper-500 border border-copper-500 text-slate-950 hover:bg-transparent hover:text-white py-4 rounded-sm text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${isSubmitting ? 'opacity-55 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3 w-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Securing Booking...</span>
                    </>
                  ) : (
                    <>
                      <Wrench className="h-4 w-4" />
                      <span>Reserve Slot Now</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-6 text-center py-4">
                <div className="space-y-2">
                  <div className="h-12 w-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="editorial-serif-heading text-2xl text-white font-serif">Slot Securely Booked!</h3>
                  <p className="text-xs text-slate-400 font-sans font-sans">
                    Slot reserved. Notification successfully sent to <strong className="text-white font-mono">vk30035@gmail.com</strong>.
                  </p>
                </div>

                <div className="border border-white/10 rounded-sm bg-[#0b0b0b] overflow-hidden text-left font-mono text-xs">
                  <div className="bg-[#181818] text-white p-4 justify-between flex items-center border-b border-white/15">
                    <div>
                      <span className="text-[9px] text-[#8c8c8c] tracking-widest block uppercase h-3">OFFICIAL TICKET</span>
                      <strong className="text-[11px] leading-none text-copper-500 tracking-wider uppercase font-mono">{bookingTicket.ticketNumber}</strong>
                    </div>
                    <span className="bg-copper-500/10 border border-copper-500/30 text-copper-500 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider font-mono">
                      CONFIRMED
                    </span>
                  </div>

                  <div className="p-4 space-y-2.5 text-[#cccccc] border-b border-dashed border-white/10">
                    <p className="flex justify-between gap-4">
                      <span className="text-[#8c8c8c]">CUSTOMER:</span>
                      <strong className="text-white font-sans text-right">{bookingTicket.customerName}</strong>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-[#8c8c8c]">APPLIANCE UNIT:</span>
                      <strong className="text-white font-sans text-right line-clamp-1">{form.deviceModel}</strong>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-[#8c8c8c]">DIAGNOSTICS:</span>
                      <strong className="text-copper-500 font-mono text-right">{bookingTicket.serviceTitle}</strong>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-[#8c8c8c]">DATE SCHEDULED:</span>
                      <strong className="text-white text-right">{bookingTicket.scheduledDate}</strong>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-[#8c8c8c]">TIME SLOT:</span>
                      <strong className="text-white text-right">{bookingTicket.timeSlot}</strong>
                    </p>
                  </div>

                  <div className="px-4 py-3 bg-[#121212] flex justify-between items-center text-white font-bold border-t border-white/5">
                    <span className="text-[10px] text-slate-400 font-sans tracking-widest uppercase">VISIT REPAIR FEE:</span>
                    <strong className="text-copper-500 text-sm">₹{bookingTicket.baseFee}</strong>
                  </div>
                </div>

                <div className="bg-[#1c1915] rounded-sm p-4 border border-copper-500/15 text-slate-300 text-xs leading-normal font-sans text-left space-y-3">
                  <div>
                    <p className="font-bold text-white mb-1">⚠️ Counter Drop-off Requirement</p>
                    <p className="text-slate-400 text-[11px]">
                      Please note: We do not offer home service or pickups. Reach out to Mr. <strong>Vijay Rathore</strong> to discuss symptoms, then drop off your device at our Railway Road workshop counter.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-dashed border-white/10 space-y-2">
                    <p className="text-[9px] uppercase font-mono font-bold tracking-wider text-copper-500">Contact Repair Workshop Instantly:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:+919616936475`}
                        className="py-2 px-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-bold font-mono text-[10px] tracking-wider uppercase text-center rounded-sm transition-all flex items-center justify-center gap-1 animate-pulse"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Call Workshop
                      </a>
                      <a
                        href={`https://wa.me/919616936475?text=${encodeURIComponent(
                          `Hello Vijay! I have booked a diagnostics slot *${bookingTicket.ticketNumber}*:\n\n*Device model:* ${form.deviceModel}\n*Diagnostic Service:* ${bookingTicket.serviceTitle}\n*Customer Name:* ${bookingTicket.customerName}\n*Phone:* ${form.phone}\n*Date schedule:* ${bookingTicket.scheduledDate} during ${bookingTicket.timeSlot}\n*Symptoms:* ${form.issueDescription || 'Not specified'}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 bg-[#25d366] hover:bg-[#20ba56] text-slate-950 font-bold font-mono text-[10px] tracking-wider uppercase text-center rounded-sm transition-all flex items-center justify-center gap-1"
                      >
                        <Send className="h-3.5 w-3.5" />
                        WhatsApp Diagnostic
                      </a>
                    </div>
                    <a
                      href={`mailto:vk30035@gmail.com?subject=${encodeURIComponent(`New Diagnostics Slot: ${bookingTicket.ticketNumber}`)}&body=${encodeURIComponent(
                        `Hello Vijay,\n\nI have booked an appointment slot for repair diagnostics:\n- Ticket Number: ${bookingTicket.ticketNumber}\n- Customer Name: ${bookingTicket.customerName}\n- Mobile Phone: ${form.phone}\n- Device Appliance: ${form.deviceModel}\n- Diagnostics Type: ${bookingTicket.serviceTitle}\n- Target Slot: ${bookingTicket.scheduledDate} (${bookingTicket.timeSlot})\n- Fault Details: ${form.issueDescription || 'General check'}\n- Email: ${form.email || 'not-provided'}\n\nThank you!`
                      )}`}
                      className="block py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-bold font-mono text-[9px] tracking-widest uppercase text-center rounded-sm transition-all"
                    >
                      ✉️ Composer Backup Email to Vijay
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetBookingForm}
                  className="w-full bg-[#1c1c1c] hover:bg-white hover:text-slate-950 border border-white/10 text-slate-300 py-3.5 rounded-sm text-xs font-mono uppercase tracking-widest font-bold cursor-pointer transition-all duration-300"
                >
                  Book another repair visit
                </button>
              </div>
            )}

          </div>
        </motion.div>

      </div>
    </div>
  );
}
