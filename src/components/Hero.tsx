import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkle, ArrowRight, ChevronDown } from 'lucide-react';
import { BrandMode, BrandingSettings } from '../types';

interface HeroProps {
  currentMode: BrandMode;
  onExploreClick: () => void;
  settings: BrandingSettings;
  onOpenPromo: () => void;
}

export default function Hero({ currentMode, onExploreClick, settings, onOpenPromo }: HeroProps) {
  const isKawaii = currentMode === 'STEAGG_KAWAII';

  // Dramatic black/indigo premium image or cute pastel sweet clouds image
  const standardBackground = "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&q=80&auto=format&fit=crop";
  const kawaiiBackground = "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80&auto=format&fit=crop";

  return (
    <section className="relative h-[85vh] sm:h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Image & Immersive Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMode}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={isKawaii ? kawaiiBackground : standardBackground}
            alt="Fashion Mood"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-[8000ms] ease-out opacity-60 sm:opacity-75"
          />
          {/* Gradients */}
          {isKawaii ? (
            <div className="absolute inset-0 bg-gradient-to-b from-purple-100/10 via-pink-100/30 to-violet-50/90" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-900/60" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Embedded Floating Kawaii Deco */}
      {isKawaii && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute top-1/4 left-[10%] text-4xl"
          >
            🌸
          </motion.div>
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-1/4 right-[12%] text-4xl"
          >
            🧁
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute top-1/3 right-[20%] text-pink-300 text-6xl"
          >
            ✦
          </motion.div>
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute top-20 left-1/3 text-sky-300 text-lg opacity-60"
          >
            🌈
          </motion.div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-6">
        {/* Tiny Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className={`text-[10px] uppercase font-bold tracking-[0.25em] text-white ${isKawaii ? 'font-kawaii' : 'font-sans'}`}>
            {isKawaii ? '✨ STE AGG Edición Dulce' : '✦ Cápsula Limitada Curada'}
          </span>
        </motion.div>

        {/* Dynamic Slogan / Mode Callout */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`text-[11px] sm:text-xs font-semibold tracking-[0.35em] text-center mb-6 uppercase leading-relaxed ${
            isKawaii ? 'text-pink-600 font-kawaii' : 'text-stone-300'
          }`}
        >
          {isKawaii ? settings.kawaiiSlogan : settings.luxurySlogan}
        </motion.p>

        {/* Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase transition-all duration-500 mb-8 leading-tight ${
            isKawaii
              ? 'font-kawaii text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 font-extrabold drop-shadow-[0_2px_15px_rgba(251,113,113,0.3)]'
              : 'font-serif tracking-[0.1em] text-white'
          }`}
        >
          {isKawaii ? 'Paraíso Pastel ✨' : settings.heroTitle}
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-10 ${
            isKawaii ? 'text-purple-900 font-semibold font-kawaii' : 'text-stone-400 font-light'
          }`}
        >
          {settings.heroSubtitle}
        </motion.p>

        {/* Action Button Set */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Main Discover Button */}
          <button
            onClick={onExploreClick}
            className={`group flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto font-medium text-sm rounded-full transition-all duration-300 cursor-pointer ${
              isKawaii
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-[0_4px_18px_rgba(244,114,182,0.4)] hover:shadow-[0_4px_25px_rgba(244,114,182,0.6)] border-2 border-white'
                : 'bg-white hover:bg-stone-100 text-stone-950 font-sans tracking-widest uppercase'
            }`}
          >
            <span>{isKawaii ? '🍰 Explorar Armario de Ensueño' : 'DESCUBRIR CÁPSULA'}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Secondary Code promo Button */}
          <button
            onClick={onOpenPromo}
            className={`group flex items-center justify-center gap-2 px-7 py-4 w-full sm:w-auto text-sm rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer backdrop-blur-md ${
              isKawaii ? 'font-kawaii font-semibold' : 'tracking-widest uppercase text-xs'
            }`}
          >
            <Sparkle size={14} className="animate-spin duration-[3000ms]" />
            <span>{isKawaii ? '🍭 Ver Código Especial' : 'CONSEGUIR CÓDIGO'}</span>
          </button>
        </motion.div>
      </div>

      {/* Down Chevron scroll indicator */}
      <div className="absolute bottom-6 flex justify-center w-full z-20 pointer-events-none">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className={`flex flex-col items-center gap-1 ${isKawaii ? 'text-rose-400' : 'text-stone-500'}`}
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold">DESLIZA ABAJO</span>
          <ChevronDown size={14} />
        </motion.div>
      </div>
    </section>
  );
}
