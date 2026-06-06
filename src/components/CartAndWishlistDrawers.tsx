import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Heart, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, Ticket, Sparkles } from 'lucide-react';
import { Product, CartItem, BrandMode } from '../types';

interface CartAndWishlistDrawersProps {
  isCartOpen: boolean;
  onCloseCart: () => void;
  isWishlistOpen: boolean;
  onCloseWishlist: () => void;
  products: Product[];
  cartItems: CartItem[];
  wishlistIds: string[];
  currentMode: BrandMode;
  onUpdateCartQty: (lineId: string, delta: number) => void;
  onRemoveFromCart: (lineId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onClearCart: () => void;
  userAddress?: string;
  userPhone?: string;
}

export default function CartAndWishlistDrawers({
  isCartOpen,
  onCloseCart,
  isWishlistOpen,
  onCloseWishlist,
  products,
  cartItems,
  wishlistIds,
  currentMode,
  onUpdateCartQty,
  onRemoveFromCart,
  onToggleWishlist,
  onAddToCart,
  onClearCart,
  userAddress,
  userPhone
}: CartAndWishlistDrawersProps) {
  const isKawaii = currentMode === 'STEAGG_KAWAII';

  // Checkout states
  const [promoCode, setPromoCode] = useState("");
  const [activeDiscountRate, setActiveDiscountRate] = useState(0); // 0.15 for 15% off
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'details' | 'success'>('review');

  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState(userAddress || "");
  const [shippingPhone, setShippingPhone] = useState(userPhone || "");

  // Match products in cart
  const cartLines = cartItems.map(item => {
    const matched = products.find(p => p.id === item.productId);
    return {
      lineId: item.id,
      item,
      product: matched
    };
  }).filter(line => !!line.product) as Array<{ lineId: string; item: CartItem; product: Product }>;

  // Calculate Subtotals
  const subtotal = cartLines.reduce((acc, line) => {
    return acc + (line.product.price * line.item.quantity);
  }, 0);

  const discountAmount = subtotal * activeDiscountRate;
  const estimatedShipping = subtotal > 300 || subtotal === 0 ? 0 : 25;
  const grandTotal = subtotal - discountAmount + estimatedShipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "SWEET15") {
      setActiveDiscountRate(0.15);
      setPromoApplied(true);
    } else {
      alert("Código de cupón no válido. Prueba con 'SWEET15'");
    }
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
    setTimeout(() => {
      onClearCart();
      setCheckoutStep('review');
      onCloseCart();
    }, 4500);
  };

  return (
    <>
      <AnimatePresence>
        {/* ==================== CART DRAWER ==================== */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseCart}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-[1.5px]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between transition-colors duration-500 ${
                isKawaii ? 'font-kawaii text-rose-950Bg bg-rose-50/10' : 'font-sans text-stone-850'
              }`}
            >
              {/* Drawer Header */}
              <div className={`p-5 border-b border-stone-200 flex items-center justify-between ${isKawaii ? 'bg-pink-50' : 'bg-stone-50'}`}>
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={18} className={isKawaii ? 'text-pink-500' : 'text-stone-700'} />
                  <h3 className={`text-base font-bold uppercase ${isKawaii ? 'text-pink-600 font-extrabold' : 'tracking-wider font-serif text-stone-950'}`}>
                    {isKawaii ? '🍦 Bolsa Dulce' : 'Bolsa de Compra'}
                  </h3>
                  <span className="text-xs bg-stone-105 bg-stone-200 text-stone-750 px-2.5 py-0.5 rounded-full font-bold">
                    {cartItems.length}
                  </span>
                </div>
                <button
                  onClick={onCloseCart}
                  className="p-1.5 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Body Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {checkoutStep === 'success' ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-5xl"
                    >
                      {isKawaii ? '🧁🎉🦄' : '🖤🎁✨'}
                    </motion.div>
                    <h3 className={`text-xl font-bold uppercase ${isKawaii ? 'text-pink-500' : 'text-stone-900 font-serif'}`}>
                      {isKawaii ? '¡Pedido confirmado y sellado!' : 'Pedido enviado al archivo'}
                    </h3>
                    <p className="text-xs text-stone-400 max-w-xs leading-relaxed font-light">
                      Tu recibo ha sido generado. Nuestro servicio de mensajería a medida está preparando tus selecciones de alta moda de inmediato.
                    </p>
                    <span className="text-[10px] uppercase font-mono text-stone-400 font-semibold tracking-widest bg-stone-100 px-3 py-1 rounded">
                      Asignando datos de seguimiento...
                    </span>
                  </div>
                ) : checkoutStep === 'details' ? (
                  /* STEP 2 IN CART: Shipping billing Form details */
                  <form onSubmit={handleProcessOrder} className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 pb-1 border-b">Datos del envío</h4>

                    <div>
                      <label className="block text-[10px] text-stone-405 font-bold uppercase mb-1">Nombre del destinatario *</label>
                      <input
                        type="text"
                        required
                        placeholder="p. ej. Amélie Valentin"
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-stone-405 font-bold uppercase mb-1">Teléfono de contacto *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+33 6 00 00 00 00"
                        value={shippingPhone}
                        onChange={(e) => setShippingPhone(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-stone-405 font-bold uppercase mb-1">Dirección de envío *</label>
                      <textarea
                        rows={3}
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Calle, código postal, país"
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>

                    <div className="pt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('review')}
                        className="px-4 py-2.5 text-xs font-bold border rounded-xl hover:bg-stone-50 cursor-pointer text-stone-600"
                      >
                        Atrás
                      </button>
                      <button
                        type="submit"
                        className={`flex-1 py-2.5 text-xs font-bold text-white rounded-xl shadow-lg cursor-pointer transition-colors uppercase tracking-widest ${
                          isKawaii ? 'bg-pink-400 hover:bg-pink-500 font-kawaii' : 'bg-stone-900 hover:bg-stone-950 font-sans'
                        }`}
                      >
                        Finalizar compra
                      </button>
                    </div>
                  </form>
                ) : cartLines.length === 0 ? (
                  /* Empty state */
                  <div className="flex flex-col items-center justify-center h-4/5 text-center p-6 space-y-4">
                    <span className="text-4xl text-stone-300">🛒</span>
                    <p className="text-sm text-stone-505 font-light italic">Tu bolsa está vacía por ahora...</p>
                    <button
                      onClick={onCloseCart}
                      className={`px-6 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-stone-50 transition-colors ${
                        isKawaii ? 'border-pink-200 text-pink-600' : 'border-stone-300 text-stone-700'
                      }`}
                    >
                      Ver productos
                    </button>
                  </div>
                ) : (
                  /* Products Lists */
                  <div className="space-y-4 pr-1">
                    {cartLines.map((line) => (
                      <div key={line.lineId} className="flex gap-4 p-3 bg-stone-50 border border-stone-200/50 rounded-2xl relative shadow-sm">
                        
                        {/* Remove line trigger */}
                        <button
                          onClick={() => onRemoveFromCart(line.lineId)}
                          className="absolute top-2.5 right-2.5 text-stone-400 hover:text-red-500 p-1 rounded-full cursor-pointer transition-colors"
                          title="Eliminar artículo"
                        >
                          <Trash2 size={13} />
                        </button>

                        <img src={line.product.image} alt="" className="w-16 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
                        
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className={`text-xs font-bold ${isKawaii ? 'text-rose-950 font-kawaii text-sm' : 'text-stone-900 font-serif'}`}>
                              {line.product.name}
                            </h4>
                            <div className="flex gap-2 text-[10px] text-stone-400 mt-1 flex-wrap">
                              <span className="font-semibold uppercase bg-stone-200 px-1.5 py-0.1 select-none text-stone-850 rounded">
                                Talla: {line.item.size}
                              </span>
                              <span
                                style={{ backgroundColor: line.item.color }}
                                className="w-3.5 h-3.5 rounded-full border border-stone-200 select-none cursor-help shadow-sm"
                                title={`Color: ${line.item.color}`}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Qty count control handles */}
                            <div className="flex items-center gap-2 border bg-white rounded-full px-2 py-0.5 shadow-sm">
                              <button
                                onClick={() => onUpdateCartQty(line.lineId, -1)}
                                className="text-stone-400 hover:text-stone-900 p-0.5 cursor-pointer"
                              >
                                <Minus size={11} strokeWidth={2.5} />
                              </button>
                              <span className="text-xs font-bold font-mono text-stone-700">{line.item.quantity}</span>
                              <button
                                onClick={() => onUpdateCartQty(line.lineId, 1)}
                                className="text-stone-400 hover:text-stone-900 p-0.5 cursor-pointer"
                              >
                                <Plus size={11} strokeWidth={2.5} />
                              </button>
                            </div>

                            {/* Line pricing */}
                            <span className="text-sm font-bold font-mono text-stone-800">
                              ${(line.product.price * line.item.quantity)}
                            </span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Billing summary Footer */}
              {cartLines.length > 0 && checkoutStep === 'review' && (
                <div className={`p-5 border-t border-stone-200 space-y-4 ${isKawaii ? 'bg-pink-50/70 border-rose-150' : 'bg-stone-50'}`}>
                  
                  {/* Promo coupons inputs */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={isKawaii ? "¿Código dulce? (SWEET15)" : "Código promocional (SWEET15)"}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 text-xs px-3.5 py-2 border rounded-full bg-white max-w-[200px] outline-none"
                    />
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-full cursor-pointer text-xs font-bold text-white ${
                        isKawaii ? 'bg-pink-400 hover:bg-pink-500 font-kawaii' : 'bg-stone-900 hover:bg-stone-950 font-sans'
                      }`}
                    >
                      Aplicar
                    </button>
                  </form>

                  {/* Summary math prices */}
                  <div className="space-y-1.5 text-xs text-stone-550 border-b pb-3 border-stone-100">
                    <div className="flex justify-between">
                      <span className="font-light text-stone-500">Subtotal</span>
                      <span className="font-bold font-mono">${subtotal}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span className="flex items-center gap-1">
                          <Ticket size={11} />
                          <span>Cupón SWEET15 (-15%)</span>
                        </span>
                        <span className="font-mono">-${discountAmount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-light text-stone-500">Envío asegurado</span>
                      <span className="font-mono">{estimatedShipping === 0 ? 'Gratis' : `$${estimatedShipping}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Total</span>
                      <span className="text-xl font-bold font-mono text-stone-950">${grandTotal.toFixed(0)} USD</span>
                    </div>

                    <button
                      onClick={() => setCheckoutStep('details')}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white transition-all cursor-pointer ${
                        isKawaii
                          ? 'bg-gradient-to-r from-pink-400 to-purple-400 hover:shadow-lg hover:shadow-rose-100 font-kawaii font-bold'
                          : 'bg-stone-950 hover:bg-stone-900 tracking-widest uppercase font-sans'
                      }`}
                    >
                      <span>Pagar ahora</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 justify-center text-[10px] text-stone-400 font-semibold uppercase">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span>Protección SSL de 256 bits</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* ==================== WISHLIST CABINET DRAWER ==================== */}
        {isWishlistOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseWishlist}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-[1.5px]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between transition-colors duration-500 ${
                isKawaii ? 'font-kawaii text-rose-950Bg bg-rose-50/10' : 'font-sans text-stone-850'
              }`}
            >
              {/* Drawer Header */}
              <div className={`p-5 border-b border-stone-200 flex items-center justify-between ${isKawaii ? 'bg-pink-50/80' : 'bg-stone-50'}`}>
                <div className="flex items-center gap-2.5">
                  <Heart size={18} fill="#f43f5e" className="text-rose-500 border-none" />
                  <h3 className={`text-base font-bold uppercase ${isKawaii ? 'text-pink-600 font-extrabold' : 'tracking-wider font-serif text-stone-950'}`}>
                    {isKawaii ? '🧁 Lista de Deseos' : 'Favoritos Guardados'}
                  </h3>
                  <span className="text-xs bg-rose-200 text-rose-805 text-rose-700 px-2.5 py-0.5 rounded-full font-bold">
                    {wishlistIds.length}
                  </span>
                </div>
                <button
                  onClick={onCloseWishlist}
                  className="p-1.5 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Body Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {wishlistIds.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-4/5 text-center p-6 space-y-4">
                    <span className="text-4xl text-rose-300">🖤</span>
                    <p className="text-sm text-stone-500 font-light italic">Tu lista de deseos está vacía ahora mismo...</p>
                    <button
                      onClick={onCloseWishlist}
                      className={`px-6 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-stone-50 transition-colors ${
                        isKawaii ? 'border-pink-200 text-pink-600' : 'border-stone-300 text-stone-700'
                      }`}
                    >
                      Ver colección
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 pr-1">
                    {wishlistIds.map((id) => {
                      const item = products.find(p => p.id === id);
                      if (!item) return null;

                      return (
                        <div key={item.id} className="flex gap-4 p-3 bg-stone-50 border border-stone-200/50 rounded-2xl relative shadow-sm">
                          <button
                            onClick={() => onToggleWishlist(item.id)}
                            className="absolute top-2.5 right-2.5 text-stone-400 hover:text-red-500 p-1 rounded-full cursor-pointer transition-colors"
                            title="Eliminar de favoritos"
                          >
                            <Trash2 size={13} />
                          </button>

                          <img src={item.image} alt="" className="w-16 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className={`text-xs font-bold ${isKawaii ? 'text-rose-950 font-kawaii text-sm' : 'text-stone-900 font-serif'}`}>
                                {item.name}
                              </h4>
                              <span className="text-sm font-bold font-mono text-stone-750 block mt-1">
                                ${item.price} USD
                              </span>
                            </div>

                            <button
                              onClick={() => {
                                const defaultSize = item.sizes[0] || 'M';
                                const defaultColor = item.colorHexes[0] || '#fff';
                                onAddToCart(item, defaultSize, defaultColor);
                                onToggleWishlist(item.id);
                                alert(`¡${item.name} movido a la bolsa!`);
                              }}
                              className={`mt-2 py-1.5 px-4 rounded-full text-[10px] font-bold text-white text-center cursor-pointer uppercase tracking-wider transition-colors ${
                                isKawaii ? 'bg-pink-400 hover:bg-pink-500' : 'bg-stone-900 hover:bg-stone-950'
                              }`}
                            >
                              Añadir a la bolsa
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Drawer footer */}
              <div className="p-5 border-t border-stone-200 text-center bg-stone-50">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                  Armario premium asegurado STEAGG
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
