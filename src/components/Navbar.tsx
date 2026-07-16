import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, User, Sliders, ToggleLeft, ToggleRight, Sparkles, Menu } from 'lucide-react';
import { BrandMode, BrandingSettings } from '../types';
import GoogleAuthButton from './GoogleAuthButton';

interface NavbarProps {
  currentMode: BrandMode;
  onModeChange: (mode: BrandMode) => void;
  cartCount: number;
  wishlistCount: number;
  isAdminOpen: boolean;
  onToggleAdmin: () => void;
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onLogout: () => void;
  user: { name: string; email: string } | null;
  settings: BrandingSettings;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function Navbar({
  currentMode,
  onModeChange,
  cartCount,
  wishlistCount,
  isAdminOpen,
  onToggleAdmin,
  onOpenAuth,
  onOpenCart,
  onOpenWishlist,
  user,
  onLogout,
  settings,
  categories,
  selectedCategory,
  onSelectCategory
}: NavbarProps) {
  const isKawaii = currentMode === 'STEAGG_KAWAII';
  const [isCatOpen, setIsCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setIsCatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-500 ${
      isKawaii 
        ? 'bg-rose-50/80 border-rose-100 font-kawaii shadow-[0_4px_20px_rgba(251,113,133,0.1)]' 
        : 'bg-stone-50/80 border-stone-200/50 font-sans'
    }`}>
      {/* Scrolling phrases ticker banner */}
      {(() => {
        const phrases = [
          "Tu outfit habla antes que tú — asegúrate de que diga algo interesante",
          "La ropa no cambia el mundo, pero cambia cómo te sientes mientras lo haces",
          "Vestirse bien es una forma de buena educación",
          "No es vanidad, es arquitectura personal",
          "El estilo es saber quién eres sin tener que decirlo",
          "Compra menos, elige mejor, hazlo durar",
          "La moda pasa, el estilo permanece — tú decides cuál ser",
          "Hoy es un buen día para un outfit que no necesita explicación",
        ];
        const ticker = [...phrases, ...phrases].join("   ✦   ");
        return (
          <div className={`overflow-hidden text-[10px] sm:text-xs py-2 uppercase tracking-widest whitespace-nowrap ${
            isKawaii ? 'bg-rose-100 text-rose-600 font-semibold' : 'bg-stone-900 text-stone-100'
          }`}>
            <div className="inline-block animate-[marquee_70s_linear_infinite]">
              {ticker}&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;{ticker}
            </div>
            <style>{`
              @keyframes marquee {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        );
      })()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Toggle & Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Category menu hamburger */}
          <div className="relative" ref={catRef}>
            <button
              onClick={() => setIsCatOpen(!isCatOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all ${
                isKawaii
                  ? 'border-rose-200 text-rose-600 hover:bg-rose-50 bg-white'
                  : 'border-stone-300 text-stone-700 hover:bg-stone-100 bg-white'
              }`}
              title="Categorías"
            >
              {isKawaii ? '🍦' : <Menu size={15} />}
              <span className="hidden sm:inline">
                {selectedCategory === 'All Items' ? 'Categorías' : selectedCategory}
              </span>
            </button>

            <AnimatePresence>
              {isCatOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute left-0 top-full mt-2 min-w-[180px] rounded-2xl shadow-xl border z-50 overflow-hidden ${
                    isKawaii ? 'bg-white border-rose-100' : 'bg-white border-stone-100'
                  }`}
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { onSelectCategory(cat); setIsCatOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? isKawaii
                            ? 'bg-rose-400 text-white'
                            : 'bg-stone-900 text-white'
                          : isKawaii
                            ? 'text-rose-700 hover:bg-rose-50'
                            : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Special STE AGG cute pastel button tab replacing "COMMUNITY" */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onModeChange(isKawaii ? 'STEAGG' : 'STEAGG_KAWAII')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
              isKawaii
                ? 'bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 text-white font-medium shadow-[0_4px_14px_rgba(244,114,182,0.4)] border-2 border-white'
                : 'bg-stone-100 hover:bg-rose-100 text-stone-700 hover:text-rose-600 border border-stone-200 font-sans'
            }`}
          >
            <span className={`text-xs ${isKawaii ? 'font-kawaii text-sm tracking-wide font-semibold' : 'uppercase tracking-wider text-[11px]'}`}>
              {isKawaii ? '🌸 Back to Minimal Class' : '✨ STE AGG (Kawaii Mode)'}
            </span>
            {isKawaii && (
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              >
                🧁
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Center: Branding Logo */}
        <div className="text-center">
          <motion.span
            layoutId="brandLogo"
            className={`cursor-pointer select-none transition-all duration-500 block ${
              isKawaii 
                ? 'text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 font-extrabold tracking-normal font-kawaii drop-shadow-[0_2px_4px_rgba(251,113,133,0.15)]' 
                : 'text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.3em] font-serif font-bold text-stone-950'
            }`}
            onClick={() => onModeChange('STEAGG')}
          >
            {isKawaii ? 'ste agg 🍦' : settings.brandName}
          </motion.span>
        </div>

        {/* Right: Actions (Admin panels, Wishlist, Cart, Profile) */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Admin Switch */}
          <button
            onClick={onToggleAdmin}
            title="Admin Customizer Dashboard"
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer ${
              isAdminOpen
                ? 'bg-rose-600 text-white shadow-lg rotate-180'
                : isKawaii
                  ? 'text-purple-600 hover:bg-purple-100'
                  : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Sliders size={20} />
          </button>

          {/* User profile / login triggers — Google Auth */}
          <div className="relative">
            <GoogleAuthButton isKawaii={isKawaii} />
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className={`p-2 rounded-full relative transition-all cursor-pointer ${
              isKawaii ? 'text-pink-500 hover:bg-pink-100' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Heart size={20} fill={wishlistCount > 0 ? (isKawaii ? '#ec4899' : '#000') : 'none'} className={wishlistCount > 0 ? 'animate-heartBeat text-stone-900 border-none' : ''} />
            {wishlistCount > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white ${
                isKawaii ? 'bg-pink-400 animate-bounce' : 'bg-stone-950 font-sans'
              }`}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className={`p-2 rounded-full relative transition-all cursor-pointer ${
              isKawaii ? 'text-sky-500 hover:bg-sky-100' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white ${
                isKawaii ? 'bg-sky-400 bubble-sparkle' : 'bg-stone-950 font-sans'
              }`}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
