import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, User, Sliders, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
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
  user: { name: string; email: string } | null;
  onLogout: () => void;
  settings: BrandingSettings;
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
  settings
}: NavbarProps) {
  const isKawaii = currentMode === 'STEAGG_KAWAII';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-500 ${
      isKawaii 
        ? 'bg-rose-50/80 border-rose-100 font-kawaii shadow-[0_4px_20px_rgba(251,113,133,0.1)]' 
        : 'bg-stone-50/80 border-stone-200/50 font-sans'
    }`}>
      {/* Top Banner / Announcement */}
      <div className={`text-[10px] sm:text-xs text-center py-2 px-4 transition-all duration-500 uppercase tracking-widest ${
        isKawaii 
          ? 'bg-rose-100 text-rose-600 font-semibold' 
          : 'bg-stone-900 text-stone-100'
      }`}>
        <div className="flex items-center justify-center gap-2">
          {isKawaii && <Sparkles size={12} className="animate-pulse" />}
          <span>{settings.announcementText}</span>
          {isKawaii && <Sparkles size={11} className="animate-pulse" />}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Toggle & Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm uppercase tracking-wider font-medium">
            <span 
              className={`cursor-pointer transition-colors ${
                isKawaii ? 'text-rose-500 hover:text-rose-600' : 'text-stone-600 hover:text-stone-950'
              }`}
              onClick={() => onModeChange('STEAGG')}
            >
              Editorial
            </span>
          </nav>

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
