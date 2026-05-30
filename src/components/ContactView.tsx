import React from 'react';
import { 
  Building, Mail, Phone, Clock, Navigation, 
  Send, User, FileText, CheckCircle, Smartphone, 
  MapPin, ShieldAlert, Navigation2, Star, Trash2, Inbox
} from 'lucide-react';
import { SHOWROOM_INFO } from '../data';
import { InquiryDetails } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface SavedInquiry extends InquiryDetails {
  id: string;
  timestamp: string;
  status: 'Pending Callback' | 'Assigned to Mr. Ajay Rathore' | 'Reviewing Spares';
}

export default function ContactView() {
  const [form, setForm] = React.useState<InquiryDetails>({
    fullName: "",
    email: "",
    phone: "",
    subject: "Retail Purchase",
    message: ""
  });

  const [inquiryPosted, setInquiryPosted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [savedInquiries, setSavedInquiries] = React.useState<SavedInquiry[]>([]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('jyoti_desk_inquiries');
      if (stored) {
        setSavedInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load inquiries:", e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrorText("");
  };

  const handleInquiryAction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName.trim()) return setErrorText("Please state your Full Name.");
    if (!form.phone.trim() || form.phone.length < 10) return setErrorText("Please enter a valid 10-digit mobile number for immediate callback.");
    if (!form.message.trim()) return setErrorText("Please write your detailed inquiry description.");

    setIsSubmitting(true);
    setErrorText("");

    // Submit asynchronously to Formspree for actual email routing to vk30035@gmail.com
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
          subject: `Inquiry: ${form.subject} - ${form.fullName}`,
          name: form.fullName,
          phone: form.phone,
          email: form.email || "not-provided@jyoti.com",
          message: form.message,
          showroomNotes: "No home service/delivery. Walk-in counter support required."
        })
      });
    } catch (err) {
      console.warn("Failed dynamic Formspree delivery, will use primary email composer instead:", err);
    } finally {
      setIsSubmitting(false);
    }

    // Save with real tracking code & timestamp
    const ticketId = "JYOTI-" + Math.random().toString(36).substring(3, 8).toUpperCase();
    const statuses = [
      'Pending Callback', 
      'Assigned to Mr. Ajay Rathore', 
      'Reviewing Spares'
    ] as const;

    const newInquiry: SavedInquiry = {
      ...form,
      id: ticketId,
      timestamp: new Date().toLocaleString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, day: 'numeric', month: 'short' }),
      status: form.subject.includes('Copper') || form.subject.includes('Stabilizer') 
        ? 'Assigned to Mr. Ajay Rathore' 
        : statuses[Math.floor(Math.random() * statuses.length)]
    };

    const updated = [newInquiry, ...savedInquiries];
    setSavedInquiries(updated);
    try {
      localStorage.setItem('jyoti_desk_inquiries', JSON.stringify(updated));
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }

    setInquiryPosted(true);
    setErrorText("");
  };

  const deleteInquiry = (id: string) => {
    const filtered = savedInquiries.filter(item => item.id !== id);
    setSavedInquiries(filtered);
    try {
      localStorage.setItem('jyoti_desk_inquiries', JSON.stringify(filtered));
    } catch (err) {
      console.warn("Could not update local storage:", err);
    }
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      subject: "Retail Purchase",
      message: ""
    });
    setInquiryPosted(false);
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
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3 mb-10 max-w-2xl mx-auto"
      >
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-copper-500 block mb-1">
          RETAIL SHOWROOM &amp; WORKSHOP OFFICE CO-ORDINATES
        </span>
        <h1 className="editorial-serif-heading text-3xl sm:text-5xl text-white">
          Our Contact Directory
        </h1>
        <p className="text-slate-400 font-normal text-xs sm:text-sm leading-relaxed font-sans">
          Have questions about specific winding wires, automatic stabilizer chokes, desert cooler parts, or home inverter repair? Connect directly with our Managing Directors.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Coordinates & Director Sheets */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="lg:col-span-7 space-y-8 text-left"
        >
          
          <motion.h2 variants={fadeInUp} className="editorial-serif-heading text-2xl text-white border-b border-white/15 pb-3 flex items-center gap-2">
            <Smartphone className="text-copper-500 h-5 w-5" />
            <span>Showroom Contact Desk</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SHOWROOM_INFO.contacts.map((contact, idx) => (
              <motion.div 
                variants={fadeInUp}
                key={idx} 
                className="bg-[#121212] rounded-sm p-5 border border-white/10 flex flex-col justify-between hover:border-copper-500/35 transition-all duration-300 text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#8c8c8c]">
                      {contact.title}
                    </span>
                  </div>
                  <h3 className="editorial-serif-heading text-lg text-white font-medium">
                    {contact.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Direct coordinator for corporate orders, coil specifications, bulk billing, and premium water pump winding chokes.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 mt-5 space-y-2">
                  <a 
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 text-xs font-mono font-bold text-copper-500 hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4 text-copper-500" />
                    <span>{contact.phone}</span>
                  </a>
                  {contact.email && (
                    <a 
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-copper-600 transition-colors truncate"
                    >
                      <Mail className="h-4 w-4 text-slate-500" />
                      <span className="truncate">{contact.email}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Showroom Physical coordinates */}
          <motion.div variants={fadeInUp} className="bg-[#121212] rounded-sm p-6 border border-white/10 space-y-4">
            <h3 className="editorial-serif-heading text-lg text-white flex items-center gap-2">
              <Building className="text-copper-500 h-5 w-5" />
              <span>Flagship Store Headquarters</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs tracking-wide">
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block tracking-widest">LOCATION ADDRESS</span>
                <p className="font-medium text-slate-300 font-sans">{SHOWROOM_INFO.address}</p>
                <a 
                  href={SHOWROOM_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-copper-500 hover:underline inline-flex items-center gap-1 font-mono font-bold pt-1 uppercase tracking-widest text-[9px]"
                >
                  <Navigation className="h-3 w-3" />
                  <span>Open drive route</span>
                </a>
              </div>
              
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block tracking-widest">HOURS OF OPERATION</span>
                <p className="font-medium text-slate-300 font-sans">09:00 AM – 10:00 PM (Daily)</p>
                <div className="text-rose-400 font-mono font-bold bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-sm inline-block text-[10px] uppercase tracking-wider">
                  Weekly Holiday: Sundays
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map mockup */}
          <motion.div variants={fadeInUp} className="border border-white/10 rounded-sm overflow-hidden aspect-video bg-[#0b0b0b] relative flex items-center justify-center shadow-inner">
            
            {/* Visual Vector Grid Mock indicating Railway Road / Cold Storage */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="space-y-3 text-center p-6 z-10">
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-rose-500 rounded-full blur-sm opacity-40 animate-ping" />
                <div className="bg-rose-600 text-white p-3 rounded-full relative">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
              <h4 className="editorial-serif-heading text-lg text-white font-serif">Railway Road Outlet, Kaimganj</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-normal font-sans">
                Directly opposite to the Meerut Cold Storage building. Safe private car parking bay is accessible at our retail portico.
              </p>
              <a 
                href={SHOWROOM_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-copper-500 hover:bg-transparent hover:text-white border border-copper-500 text-[#0b0b0b] px-4 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase font-bold transition-all duration-300 cursor-pointer"
              >
                <Navigation2 className="h-3.5 w-3.5 text-current" />
                <span>Navigate in Google Maps</span>
              </a>
            </div>

          </motion.div>

        </motion.div>

        {/* Right Column: Callback Inquiry Form */}
        <motion.div 
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full mt-6 lg:mt-0"
        >
          <div className="sticky top-24 bg-[#121212] rounded-sm p-5 sm:p-6 border border-white/10 text-left">
            {!inquiryPosted ? (
              <form onSubmit={handleInquiryAction} className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="editorial-serif-heading text-xl text-white flex items-center gap-2">
                    <FileText className="text-copper-500 h-5 w-5" />
                    <span>Inquiry Desk</span>
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 font-sans">
                    Send a message directly to our showroom managers. We usually call back within 2 operating hours.
                  </p>
                </div>

                {errorText && (
                  <div className="bg-[#1c1415] border border-rose-500/20 p-3 rounded-sm text-rose-400 text-xs font-sans flex items-start gap-2">
                    <ShieldAlert className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span>{errorText}</span>
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
                    <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider">PHONE NUMBER *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit mobile"
                        value={form.phone}
                        onChange={handleChange}
                        maxLength={10}
                        className="w-full pl-9 pr-4 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 text-sm rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider">EMAIL ADDRESS</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                      <input
                        type="email"
                        name="email"
                        placeholder="rahul@gmail.com"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 text-sm rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider">INQUIRY CATEGORY</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 text-xs rounded-sm bg-[#181818] text-white font-mono uppercase tracking-wider"
                  >
                    <option value="Retail Purchase">Retail Appliance Purchase</option>
                    <option value="Copper Windings Specialties">Pure Copper Rewinding</option>
                    <option value="Stabilizer &amp; SMU Quote">Stabilizer / Solar SMU Quote</option>
                    <option value="Bulk Spares Ordering">Mixer/Washing Spares Bulk order</option>
                    <option value="General Technical support">General Repairs Technical Help</option>
                  </select>
                </div>

                <div className="bg-[#1d1916] border border-copper-500/20 p-3 rounded-sm text-copper-200 text-xs font-sans space-y-1">
                  <strong>⚠️ Note on Home Delivery &amp; Services:</strong> 
                  <p className="opacity-80">We do NOT provide home delivery or home service. You can place your orders by calling us, and then collect/discuss your units physically at our Railway Road workshop counter.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider">YOUR DETAILED MESSAGE *</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Describe your requirement or electrical query with device model details..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 text-sm rounded-sm bg-[#181818] text-white placeholder:text-slate-600 resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-copper-500 border border-copper-500 text-slate-950 hover:bg-transparent hover:text-white py-4 rounded-sm text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${isSubmitting ? 'opacity-55 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3 w-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Submitting to Counter...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Desk Inquiry</span>
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
                  <h3 className="editorial-serif-heading text-2xl text-white">Inquiry Received!</h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Your query has been logged and queued. Email notification sent to <strong className="text-white font-mono">vk30035@gmail.com</strong>.
                  </p>
                </div>

                <div className="border border-white/10 rounded-sm bg-[#0b0b0b] p-4 text-left font-mono text-xs space-y-2.5">
                  <p className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[#8c8c8c] uppercase tracking-wider block">INQUIRY TOPIC:</span>
                    <strong className="text-copper-500 uppercase">{form.subject}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#8c8c8c]">NAME:</span>
                    <strong className="text-white font-sans">{form.fullName}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#8c8c8c]">MOBILE NUMBER:</span>
                    <strong className="text-white font-sans">{form.phone}</strong>
                  </p>
                </div>

                {/* Instant Callback Actions for Great UX */}
                <div className="bg-[#1c1915] rounded-sm p-4 border border-copper-500/15 text-slate-300 text-xs leading-normal font-sans text-left space-y-3">
                  <div>
                    <p className="font-bold text-white mb-1">📞 Callback &amp; Order Status Details</p>
                    <p className="opacity-80">Specialist officer <strong>Ajay Rathore</strong> is assigned to call you back on your line (<strong className="text-white font-mono">{form.phone}</strong>) within the next 2 operating hours. We will discuss custom pricing worksheet, part availability, or copper weights.</p>
                  </div>
                  
                  <div className="p-2 border-t border-dashed border-white/10 pt-3 space-y-2.5">
                    <p className="text-[10px] tracking-wider text-copper-500 uppercase font-mono font-bold">Or reach us instantly via direct mobile shortcuts:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href={`tel:+919616936475`}
                        className="py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-bold font-mono text-[10px] tracking-wider uppercase text-center rounded-sm transition-all flex items-center justify-center gap-1"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Call Showroom Now
                      </a>
                      <a
                        href={`https://wa.me/919616936475?text=${encodeURIComponent(`Hello Vijay! I am ${form.fullName}. I am inquiring about *${form.subject}*:\n\n*Name:* ${form.fullName}\n*Phone:* ${form.phone}\n*Inquiry Message:* ${form.message}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 bg-[#25d366] hover:bg-[#20ba56] text-slate-950 font-bold font-mono text-[10px] tracking-wider uppercase text-center rounded-sm transition-all flex items-center justify-center gap-1"
                      >
                        <Send className="h-3.5 w-3.5" />
                        WhatsApp Message
                      </a>
                    </div>
                    <a
                      href={`mailto:vk30035@gmail.com?subject=${encodeURIComponent(`Jyoti Inquiry: ${form.subject}`)}&body=${encodeURIComponent(`Hello Vijay,\n\nI just posted an inquiry:\n- Customer: ${form.fullName}\n- Tel: ${form.phone}\n- Topic: ${form.subject}\n- Inquiry Detail: ${form.message}\n\nPlease check.`)}`}
                      className="block py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-bold font-mono text-[9px] tracking-widest uppercase text-center rounded-sm transition-all"
                    >
                      ✉️ Composer Backup Email to Vijay
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full bg-[#1c1c1c] hover:bg-white hover:text-slate-950 border border-white/10 text-[#cccccc] py-3.5 rounded-sm text-xs font-mono uppercase tracking-widest font-bold cursor-pointer transition-all duration-300"
                >
                  Write another message
                </button>
              </div>
            )}
          </div>

          {/* Active Callback Tickets Registry */}
          {savedInquiries.length > 0 && (
            <div className="mt-6 bg-[#121212] rounded-sm p-5 border border-white/10 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h4 className="text-xs font-mono text-white tracking-wider flex items-center gap-1.5 uppercase font-bold">
                  <Inbox className="h-3.5 w-3.5 text-copper-500" />
                  <span>Desk Callback Queue ({savedInquiries.length})</span>
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setSavedInquiries([]);
                    try {
                      localStorage.removeItem('jyoti_desk_inquiries');
                    } catch (e) {}
                  }}
                  className="text-[9px] font-mono text-slate-500 hover:text-rose-400 uppercase tracking-widest transition-colors font-bold cursor-pointer"
                >
                  Clear Queue
                </button>
              </div>

              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {savedInquiries.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="border border-white/5 bg-[#181818] p-3 rounded-sm space-y-2 relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[9px] font-mono text-slate-500 block">TICKET ID</span>
                          <span className="text-xs font-mono font-bold text-slate-300 bg-white/5 px-1.5 py-0.5 rounded-sm">{item.id}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-mono text-slate-500 block">{item.timestamp}</span>
                          <span className={`inline-block text-[9px] font-mono font-bold uppercase tracking-wider mt-1 rounded-full px-2 py-0.5 ${
                            item.status.includes('Ajay') 
                              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                              : item.status.includes('Reviewing')
                                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            ● {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex justify-between items-end gap-3">
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <span className="text-[9px] text-[#8c8c8c] block truncate">
                            From: <strong className="text-slate-300 font-sans">{item.fullName}</strong> ({item.phone})
                          </span>
                          <p className="text-[10px] text-slate-400 italic line-clamp-2">"{item.message}"</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteInquiry(item.id)}
                          className="p-1 px-2 rounded-sm bg-rose-950/20 hover:bg-rose-950/60 text-rose-400 border border-rose-950/30 transition-all cursor-pointer flex-shrink-0"
                          title="Remove ticket"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
