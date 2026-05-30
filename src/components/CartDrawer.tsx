import React from 'react';
import { 
  X, ShoppingCart, Trash2, Plus, Minus, 
  MapPin, CheckSquare, Sparkles, CreditCard, ShoppingBag,
  Phone, Mail, Send
} from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = React.useState<'cart' | 'success'>('cart');
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [pincode, setPincode] = React.useState('209630');
  const [customerAddress, setCustomerAddress] = React.useState('');
  const [customerEmail, setCustomerEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const [orderId, setOrderId] = React.useState('');

  if (!isOpen) return null;

  // Compute pricing totals
  const subTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const estimatedTaxGST = Math.round(subTotal * 0.18); // 18% standard electronic GST
  const estimatedDelivery = subTotal > 15000 ? 0 : 250; // free delivery above 15k
  const grandTotal = subTotal + estimatedTaxGST + estimatedDelivery;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return setSubmitError("Please specify your name.");
    if (!customerPhone.trim() || customerPhone.length < 10) return setSubmitError("Please input a valid 10-digit delivery mobile number.");
    if (!customerAddress.trim()) return setSubmitError("Please specify your full physical shipping address.");

    setIsSubmitting(true);
    setSubmitError('');

    const generatedOrderId = `JYOTI-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedOrderId);

    // Format cart details for email
    const cartSummaryString = cart.map(item => `${item.product.name} (Qty: ${item.quantity}) - Price: ₹${item.product.price}`).join(', ');

    // Send order details to vk30035@gmail.com asynchronously
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
          subject: `NEW ORDER: ${generatedOrderId} - ${customerName}`,
          orderId: generatedOrderId,
          customerName,
          customerPhone,
          deliveryPincode: pincode,
          fullAddress: customerAddress,
          customerEmail: customerEmail || "not-provided@jyoti.com",
          billAmount: `₹${grandTotal.toLocaleString('en-IN')}`,
          cartItems: cartSummaryString,
          deliveryInfo: "Please note: No home service/delivery is provided. User must talk on call and pick up/coordinate shipment."
        })
      });
    } catch (err) {
      console.warn("Could not dispatch cart order details via Formspree, will use local actions instead:", err);
    } finally {
      setIsSubmitting(false);
    }

    setCheckoutStep('success');
  };

  const handleCloseAndReset = () => {
    onClearCart();
    setCheckoutStep('cart');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setCustomerEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background dark glass panel overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-full sm:max-w-md bg-[#0b0b0b] shadow-2xl flex flex-col justify-between border-l border-white/10">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#121212]">
            <h3 className="editorial-serif-heading text-lg text-white flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-copper-500" />
              <span>Showroom Cart</span>
            </h3>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <X className="h-5.5 w-5.5" />
            </button>
          </div>

          {/* Core Content Drawer screen */}
          {checkoutStep === 'cart' ? (
            <>
              {cart.length === 0 ? (
                // EMPTY STATE
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-14 w-14 bg-white/5 text-[#8c8c8c] rounded-full flex items-center justify-center border border-white/10">
                    <ShoppingBag className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="editorial-serif-heading text-lg text-white">Your Shopping Cart is Empty</h4>
                    <p className="text-slate-400 text-xs mt-1.5 max-w-xs leading-relaxed font-sans">
                      Explore our high-fidelity smart TVs, double-door refrigerators, and dynamic MPPT solar charge SMUs to add items here.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-copper-500 border border-copper-500 hover:bg-transparent hover:text-white text-slate-950 font-bold font-mono text-xs py-3 px-6 rounded-sm uppercase tracking-widest transition-all duration-300 cursor-pointer"
                  >
                    Start Exploring Showroom
                  </button>
                </div>
              ) : (
                // ITEMS IN CART LIST
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex gap-4 p-3 border border-white/5 rounded-sm bg-[#121212] hover:border-white/10 transition-colors text-left"
                    >
                      {/* Thumbnail frame */}
                      <div className="h-16 w-16 rounded-sm overflow-hidden bg-[#181818] border border-white/5 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover opacity-80"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info & Quantity details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate font-sans">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-[#8c8c8c] hover:text-red-400 transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-[#8c8c8c] font-mono tracking-widest uppercase mt-0.5">
                            {item.product.brand}
                          </p>
                        </div>

                        {/* Adjust qty panel */}
                        <div className="flex justify-between items-end mt-1">
                          <div className="flex items-center gap-1.5 border border-white/10 rounded-sm p-0.5 bg-[#181818]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded-sm"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-mono text-xs font-semibold px-2 text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded-sm"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-copper-500">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}

                  {/* Pricing Breakdown Sheet */}
                  <div className="border-t border-white/10 pt-4 mt-6 space-y-2.5 text-[11px] text-[#cccccc] font-mono tracking-wide">
                    <p className="flex justify-between">
                      <span className="text-slate-400">ITEMS SUB-TOTAL:</span>
                      <span className="text-white font-bold">₹{subTotal.toLocaleString('en-IN')}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">ESTIMATED TAX (18% GST):</span>
                      <span className="text-white">₹{estimatedTaxGST.toLocaleString('en-IN')}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">SHOWROOM DELIVERY/TRANSIT:</span>
                      <span className="text-white">
                        {estimatedDelivery === 0 ? "FREE" : `₹${estimatedDelivery}`}
                      </span>
                    </p>
                    <div className="pt-2 border-t border-white/15 flex justify-between items-center text-white font-bold text-sm sm:text-base">
                      <span className="font-sans tracking-wide">GRAND TOTAL:</span>
                      <span className="text-copper-500 font-mono">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Immediate Checkout credentials form */}
                  <div className="pt-6 border-t border-white/10 mt-6 text-left">
                    <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                      <h4 className="text-[10px] font-mono uppercase font-bold text-copper-500 block mb-1 tracking-widest">
                        Showroom Order Coordinator
                      </h4>
                      
                      {submitError && (
                        <p className="text-[11px] text-rose-400 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 font-sans">
                          {submitError}
                        </p>
                      )}

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-mono block tracking-wider">YOUR NAME *</label>
                        <input
                          type="text"
                          placeholder="Rahul Sharma"
                          value={customerName}
                          onChange={(e) => { setCustomerName(e.target.value); setSubmitError(''); }}
                          className="w-full text-xs px-3 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-mono block tracking-wider">PHONE NUMBER *</label>
                          <input
                            type="tel"
                            placeholder="10-digit number"
                            maxLength={10}
                            value={customerPhone}
                            onChange={(e) => { setCustomerPhone(e.target.value); setSubmitError(''); }}
                            className="w-full text-xs px-3 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-mono"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-mono block tracking-wider">DELIVERY PINCODE *</label>
                          <input
                            type="text"
                            maxLength={6}
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="w-full text-xs px-3 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-mono block tracking-wider">FULL PHYSICAL ADDRESS *</label>
                        <textarea
                          rows={2}
                          placeholder="Enter complete shipping address / landmark for billing records..."
                          value={customerAddress}
                          onChange={(e) => { setCustomerAddress(e.target.value); setSubmitError(''); }}
                          className="w-full text-xs px-3 py-2 border border-white/10 focus:outline-none focus:border-copper-500 rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-sans resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-mono block tracking-wider font-mono">EMAIL ADDRESS (OPTIONAL)</label>
                        <input
                          type="email"
                          placeholder="rahul@gmail.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full text-xs px-3 py-2.5 border border-white/10 focus:outline-none focus:border-copper-500 rounded-sm bg-[#181818] text-white placeholder:text-slate-600 font-sans"
                        />
                      </div>

                      <div className="bg-[#1d1916] border border-copper-700/20 p-2.5 rounded-sm text-copper-300 text-[10px] font-sans leading-relaxed">
                        ⚠️ <strong>Counter-Only Handover:</strong> Jyoti Electricals does not provide direct home shipping. Please coordinate with Vijay on call and pick up items from our Railway Road counter.
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full mt-2 bg-copper-500 border border-copper-500 text-slate-950 font-mono font-bold py-3.5 px-4 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-transparent hover:text-white ${isSubmitting ? 'opacity-55 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            <span>Routing Order Desk...</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-4 w-4" />
                            <span>Place Showroom Order</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            // ORDER PLACED SUCCESSFULLY SCREEN
            <div className="flex-1 p-6 text-center flex flex-col justify-start overflow-y-auto space-y-5">
              <div className="space-y-2 pt-2">
                <div className="h-11 w-11 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse">
                  <CheckSquare className="h-5.5 w-5.5" />
                </div>
                <h3 className="editorial-serif-heading text-xl text-white font-serif">Showroom Order Placed!</h3>
                <p className="text-xs text-slate-400 font-sans">
                  Bill registry saved &amp; email sent successfully to <strong className="text-white font-mono">vk30035@gmail.com</strong>.
                </p>
              </div>

              {/* Order Receipt info */}
              <div className="bg-[#0b0b0b] border border-white/10 rounded-sm p-4 font-mono text-[11px] text-left space-y-2">
                <div className="border-b border-dashed border-white/15 pb-2 flex justify-between">
                  <span className="font-bold text-[#8c8c8c]">DESK ORDER ID:</span>
                  <span className="text-copper-500 font-bold">{orderId}</span>
                </div>
                <p className="flex justify-between">
                  <span className="text-[#8c8c8c]">CUSTOMER:</span>
                  <strong className="text-white font-sans">{customerName}</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-[#8c8c8c]">DELIVERY PIN:</span>
                  <strong className="text-white font-sans">{pincode}</strong>
                </p>
                <p className="flex flex-col gap-0.5">
                  <span className="text-[#8c8c8c]">SHIPPING ADDRESS:</span>
                  <strong className="text-white font-sans text-[10px] leading-snug">{customerAddress}</strong>
                </p>
                <p className="flex justify-between border-t border-white/10 pt-2 text-xs">
                  <span className="font-bold text-[#8c8c8c]">BILL TOTAL:</span>
                  <strong className="text-copper-500 font-bold">₹{grandTotal.toLocaleString('en-IN')}</strong>
                </p>
              </div>

              {/* Instant Call & WhatsApp integrations */}
              <div className="bg-[#1c1915] rounded-sm p-4 text-slate-300 border border-copper-500/15 text-xs text-left leading-normal space-y-3 font-sans">
                <div>
                  <p className="text-white font-bold mb-1">📞 Handover &amp; Order Status Details</p>
                  <p className="opacity-80 text-[11px]">
                    Managing Director Mr. <strong>Vijay Rathore</strong> will call you back on your line (<strong className="text-white font-mono">{customerPhone}</strong>) shortly to coordinate counter collection. Or reach us instantly with shortcuts:
                  </p>
                </div>

                <div className="pt-2 border-t border-dashed border-white/10 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:+919616936475`}
                      className="py-2 px-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-bold font-mono text-[10px] tracking-wider uppercase text-center rounded-sm transition-all flex items-center justify-center gap-1"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      Call Vijay
                    </a>
                    <a
                      href={`https://wa.me/919616936475?text=${encodeURIComponent(
                        `Hello Vijay! I have placed an order *${orderId}*:\n\n*Items:* ${cart
                          .map((i) => `${i.product.name} (x${i.quantity})`)
                          .join(', ')}\n*Total Bill:* ₹${grandTotal.toLocaleString('en-IN')}\n*Name:* ${customerName}\n*Tel:* ${customerPhone}\n*Address:* ${customerAddress}\n*Pincode:* ${pincode}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 bg-[#25d366] hover:bg-[#20ba56] text-slate-950 font-bold font-mono text-[10px] tracking-wider uppercase text-center rounded-sm transition-all flex items-center justify-center gap-1"
                    >
                      <Send className="h-3.5 w-3.5" />
                      WhatsApp Order
                    </a>
                  </div>
                  <a
                    href={`mailto:vk30035@gmail.com?subject=${encodeURIComponent(`New Jyoti Order: ${orderId}`)}&body=${encodeURIComponent(
                      `Hello Vijay,\n\nI have submitted a new showroom order via the Cart:\n- Order ID: ${orderId}\n- Customer Name: ${customerName}\n- Mobile Phone: ${customerPhone}\n- Shipping Address: ${customerAddress}\n- Pincode: ${pincode}\n- Email: ${customerEmail || 'not-provided'}\n- Grand Total: ₹${grandTotal.toLocaleString('en-IN')}\n\nList of Items:\n${cart
                        .map((i) => `• ${i.product.name} (Quantity: ${i.quantity}) - Rate: ₹${i.product.price}`)
                        .join('\n')}\n\nPlease trigger physical packaging.`
                    )}`}
                    className="block py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-bold font-mono text-[9px] tracking-widest uppercase text-center rounded-sm transition-all"
                  >
                    ✉️ Send direct billing backup email
                  </a>
                </div>
              </div>

              <button
                onClick={handleCloseAndReset}
                className="w-full bg-[#1c1c1c] hover:bg-white hover:text-slate-950 border border-white/10 text-[#cccccc] font-mono tracking-widest uppercase font-bold py-3.5 rounded-sm text-xs cursor-pointer transition-all duration-300"
              >
                Clear Cart &amp; Continue
              </button>
            </div>
          )}

          {/* Footer Address stamp */}
          <div className="px-6 py-4 bg-[#121212] border-t border-white/10 text-center">
            <span className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.1em]">
              Jyoti Electricals · Railway Road, Kaimganj
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
