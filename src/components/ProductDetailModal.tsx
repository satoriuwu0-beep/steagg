import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Star, Sparkles, Send, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, BrandMode, Review } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currentMode: BrandMode;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onAddReview: (productId: string, review: Review) => void;
  currentUser: { name: string; email: string } | null;
}

export default function ProductDetailModal({
  product,
  onClose,
  currentMode,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onAddReview,
  currentUser
}: ProductDetailModalProps) {
  if (!product) return null;

  const isKawaii = currentMode === 'STEAGG_KAWAII';
  const isLiked = wishlist.includes(product.id);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colorHexes[0] || "");

  // Review state form
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");
  const [newName, setNewName] = useState(currentUser?.name || "");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setToastMessage(`¡Añadido ${product.name} a la bolsa!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleWishlistToggle = () => {
    onToggleWishlist(product.id);
    setToastMessage(isLiked ? "Eliminado de favoritos" : "¡Añadido a favoritos! 🖤");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const reviewerName = newName.trim() || "Visitante";
    const customReview: Review = {
      id: Math.random().toString(),
      user: reviewerName,
      rating: newRating,
      text: newText,
      date: new Date().toISOString().split('T')[0],
      avatar: isKawaii ? "🍡" : undefined
    };

    onAddReview(product.id, customReview);
    setNewText("");
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className={`relative w-full max-w-5xl h-[90vh] md:h-[82vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row bg-white transition-colors duration-500 z-10 ${
            isKawaii ? 'font-kawaii text-rose-950 font-medium' : 'font-sans text-stone-800'
          }`}
        >
          {/* Close Trigger */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-30 p-2 rounded-full border shadow-sm transition-all cursor-pointer ${
              isKawaii 
                ? 'bg-rose-100 border-rose-200 text-rose-700 hover:bg-rose-200' 
                : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <X size={18} />
          </button>

          {/* Left / Top Side: Immersive Photo Slider */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-stone-100 flex flex-col">
            <div className="flex-1 relative overflow-hidden">
              <img
                src={product.gallery && product.gallery[activeImageIndex] ? product.gallery[activeImageIndex] : product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Gallery side switch triggers */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.gallery.length - 1))}
                    className={`p-1.5 rounded-full shadow-md backdrop-blur-md cursor-pointer pointer-events-auto transition-transform hover:scale-110 ${
                      isKawaii ? 'bg-white/80 text-rose-600' : 'bg-black/40 text-stone-50'
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev < product.gallery.length - 1 ? prev + 1 : 0))}
                    className={`p-1.5 rounded-full shadow-md backdrop-blur-md cursor-pointer pointer-events-auto transition-transform hover:scale-110 ${
                      isKawaii ? 'bg-white/80 text-rose-600' : 'bg-black/40 text-stone-50'
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Carousel Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className={`p-4 flex gap-2.5 overflow-x-auto justify-center border-t border-stone-250/10 ${isKawaii ? 'bg-rose-50/50' : 'bg-stone-50'}`}>
                {product.gallery.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImageIndex === idx
                        ? isKawaii ? 'border-pink-400 scale-105 shadow-md' : 'border-stone-900 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={thumb} alt="Detail" className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right / Bottom Side: Content Details & Custom Reviews (Scrollable) */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Hot label badge */}
              <div className="flex items-center gap-1.5 mb-2.5">
                {product.isNew && (
                  <span className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-bold tracking-widest text-white ${
                    isKawaii ? 'bg-gradient-to-r from-pink-400 to-rose-400' : 'bg-black'
                  }`}>
                    NUEVO EN ARCHIVO
                  </span>
                )}
                <span className="text-xs font-semibold text-stone-400 tracking-wider font-mono">
                  ID: #{product.id.toUpperCase()}
                </span>
              </div>

              {/* Product Name */}
              <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 ${
                isKawaii ? 'font-kawaii text-rose-500 font-extrabold' : 'font-serif text-stone-950 tracking-wide'
              }`}>
                {product.name}
              </h1>

              {/* Price & original rating */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-stone-100">
                <div className={`flex items-end gap-2 text-xl font-bold ${isKawaii ? 'font-kawaii text-rose-500' : 'font-mono text-stone-950'}`}>
                  <span>${product.price} USD</span>
                  {product.originalPrice && (
                    <span className="text-xs text-stone-400 line-through font-normal">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-md text-xs font-bold text-stone-600 font-mono">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400 font-normal">({product.reviews.length} reseñas)</span>
                </div>
              </div>

              {/* Description explanation */}
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-light ${isKawaii ? 'text-rose-900/85' : 'text-stone-600'}`}>
                {product.description}
              </p>

              {/* Interactive Sizing selector */}
              <div className="mb-6">
                <h3 className={`text-xs font-bold uppercase mb-2.5 ${isKawaii ? 'text-purple-600' : 'text-stone-900 tracking-wide font-sans'}`}>
                  Selecciona tu talla
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 focus:outline-none cursor-pointer py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        selectedSize === size
                          ? isKawaii ? 'bg-purple-400 border-purple-400 text-white shadow-md' : 'bg-stone-950 border-stone-950 text-white'
                          : isKawaii ? 'border-rose-100 hover:bg-rose-50 text-rose-700' : 'border-stone-300 hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selection color blocks */}
              {product.colorHexes && product.colorHexes.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-xs font-bold uppercase mb-2.5 ${isKawaii ? 'text-purple-600' : 'text-stone-900 tracking-wide'}`}>
                    Color disponible
                  </h3>
                  <div className="flex gap-2">
                    {product.colorHexes.map((hex) => (
                      <button
                        key={hex}
                        onClick={() => setSelectedColor(hex)}
                        style={{ backgroundColor: hex }}
                        className={`w-7 h-7 rounded-full border cursor-pointer shadow-sm relative transition-all ${
                          selectedColor === hex
                            ? 'ring-2 ring-offset-2 scale-110 ' + (isKawaii ? 'ring-pink-400' : 'ring-stone-900')
                            : 'opacity-85 hover:opacity-100'
                        }`}
                      >
                        {selectedColor === hex && (
                          <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-stone-300 pointer-events-none mix-blend-difference" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical features Bullet points list */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className={`text-xs font-bold uppercase mb-3 ${isKawaii ? 'text-purple-600' : 'text-stone-900 tracking-wide'}`}>
                    Especificaciones y acabados
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] sm:text-xs">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex gap-2 items-start text-stone-500">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isKawaii ? 'bg-pink-400' : 'bg-stone-900'}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Customer Comments and Review Section */}
              <div className="border-t border-stone-100 pt-6 mb-6">
                <h3 className={`text-xs font-bold uppercase mb-4 ${isKawaii ? 'text-pink-600' : 'text-stone-900 tracking-wider'}`}>
                  Reseñas de clientes
                </h3>

                {product.reviews.length === 0 ? (
                  <p className="text-xs text-stone-400 italic mb-6">Aún no hay reseñas. ¡Sé el primero en opinar sobre esta pieza!</p>
                ) : (
                  <div className="space-y-4 mb-6 max-h-[180px] overflow-y-auto pr-2 scrollbar-hide">
                    {product.reviews.map((r) => (
                      <div key={r.id} className="p-3 bg-stone-50 rounded-xl text-xs flex flex-col gap-1 border border-stone-150/40">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                            {r.avatar && <span>{r.avatar}</span>}
                            {r.user}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">{r.date}</span>
                        </div>
                        <div className="flex gap-0.5 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              className={i < r.rating ? 'fill-current' : 'text-stone-200'}
                            />
                          ))}
                        </div>
                        <p className="text-stone-600 leading-relaxed mt-1 font-light italic">"{r.text}"</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submitting custom Review Form */}
                <form onSubmit={handleReviewSubmit} className="p-4 rounded-xl border border-dashed border-stone-200 bg-stone-50/50">
                  <h4 className="text-[11px] font-bold uppercase text-stone-500 mb-2.5">Deja tu reseña</h4>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Tu nombre (opcional)"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 text-xs px-3 py-2 border rounded-lg bg-white outline-none focus:border-stone-400 text-stone-800"
                      />
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-white border rounded-lg justify-between">
                        <span className="text-[10px] text-stone-400 font-bold uppercase">Valoración:</span>
                        <div className="flex gap-0.5 text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewRating(star)}
                              className="focus:outline-none cursor-pointer text-xs"
                            >
                              <Star size={13} className={star <= newRating ? 'fill-current' : 'text-stone-200'} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        required
                        placeholder="Escribe tu reseña aquí..."
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="flex-1 text-xs px-3 py-2 border rounded-lg bg-white outline-none focus:border-stone-400 text-stone-800"
                      />
                      <button
                        type="submit"
                        className={`p-2 rounded-lg cursor-pointer transition-colors flex items-center justify-center text-white ${
                          isKawaii ? 'bg-pink-400 hover:bg-pink-500' : 'bg-stone-900 hover:bg-stone-950'
                        }`}
                      >
                        <Send size={14} />
                      </button>
                    </div>
                    {submitSuccess && (
                      <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>¡Reseña enviada correctamente! Añadida al registro.</span>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Bottom Actions Block */}
            <div className={`p-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-3 bg-stone-50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 pt-4 rounded-b-3xl ${isKawaii ? 'bg-rose-50/50' : 'bg-stone-50'}`}>
              <button
                onClick={handleWishlistToggle}
                className={`p-3.5 rounded-full border transition-all cursor-pointer ${
                  isLiked
                    ? 'bg-rose-500 text-white border-rose-500 hover:bg-rose-600'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
                title="Guardar en favoritos"
              >
                <Heart size={18} fill={isLiked ? '#fff' : 'none'} />
              </button>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-bold text-white cursor-pointer transition-all uppercase tracking-wider ${
                  isKawaii
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 hover:shadow-[0_4px_15px_rgba(244,114,182,0.4)] border-2 border-white'
                    : 'bg-stone-950 hover:bg-stone-900 tracking-widest'
                }`}
              >
                {isKawaii ? '🧁 ¡Añadir a la Bolsa Dulce!' : 'Añadir a la Bolsa'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Action toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 text-white ${
                isKawaii ? 'bg-pink-400 shadow-rose-200' : 'bg-stone-950'
              }`}
            >
              {isKawaii ? <Sparkles size={14} className="animate-spin" /> : <Star size={14} className="fill-stone-100" />}
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
