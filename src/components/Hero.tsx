import React, { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Sparkle, ArrowRight, ChevronDown } from 'lucide-react';
import { BrandMode, BrandingSettings } from '../types';

interface HeroProps {
  currentMode: BrandMode;
  onExploreClick: () => void;
  settings: BrandingSettings;
  onOpenPromo: () => void;
}

export default function Hero({ currentMode, onExploreClick, settings, onOpenPromo }: HeroProps) {
  const isKawaii = currentMode === 'STEAGG_KAWAII';
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: background moves at 40% of scroll speed
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const standardBackground = "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&q=80&auto=format&fit=crop";
  const kawaiiBackground   = "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80&auto=format&fit=crop";

  return (
    <section ref={sectionRef} className="relative h-[85vh] sm:h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">

      {/* ── Parallax Background ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <img
            src={isKawaii ? kawaiiBackground : standardBackground}
            alt="Fashion Mood"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-60 sm:opacity-75"
          />
          {isKawaii ? (
            <div className="absolute inset-0 bg-gradient-to-b from-purple-100/10 via-pink-100/30 to-violet-50/90" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-900/60" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Floating Kawaii Deco ── */}
      {isKawaii && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
            { emoji: '🌸', top: '25%', left: '10%', delay: 0 },
            { emoji: '🧁', top: '70%', left: '88%', delay: 1 },
            { emoji: '✦',  top: '33%', left: '80%', delay: 2 },
            { emoji: '🌈', top: '12%', left: '33%', delay: 0.5 },
          ].map(({ emoji, top, left, delay }) => (
            <motion.div
              key={emoji}
              animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5 + delay, ease: 'easeInOut', delay }}
              style={{ position: 'absolute', top, left }}
              className="text-3xl sm:text-4xl"
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Hero Content (also moves on scroll for depth effect) ── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-6 will-change-transform"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className={`text-[10px] uppercase font-bold tracking-[0.25em] text-white ${isKawaii ? 'font-kawaii' : 'font-sans'}`}>
            {isKawaii ? '✨ STE AGG Sweet Edition' : '✦ Limited Curated Capsule'}
          </span>
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ delay: 0.3, duration: 1 }}
          className={`text-[11px] sm:text-xs font-semibold tracking-[0.35em] text-center mb-6 uppercase leading-relaxed ${
            isKawaii ? 'text-pink-600 font-kawaii' : 'text-stone-300'
          }`}
        >
          {isKawaii ? settings.kawaiiSlogan : settings.luxurySlogan}
        </motion.p>

        {/* Title — dramatic clip reveal */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight ${
              isKawaii
                ? 'font-kawaii text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 font-extrabold drop-shadow-[0_2px_15px_rgba(251,113,113,0.3)]'
                : 'font-serif tracking-[0.1em] text-white'
            }`}
          >
            {isKawaii ? 'Pastel Heaven ✨' : settings.heroTitle}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className={`max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-10 ${
            isKawaii ? 'text-purple-900 font-semibold font-kawaii' : 'text-stone-400 font-light'
          }`}
        >
          {settings.heroSubtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onExploreClick}
            className={`group flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto font-medium text-sm rounded-full transition-all duration-300 cursor-pointer ${
              isKawaii
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-[0_4px_18px_rgba(244,114,182,0.4)] hover:shadow-[0_4px_28px_rgba(244,114,182,0.6)] border-2 border-white'
                : 'bg-white hover:bg-stone-100 text-stone-950 font-sans tracking-widest uppercase'
            }`}
          >
            <span>{isKawaii ? '🍰 Explore Dream Closet' : 'DISCOVER CAPSULE'}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenPromo}
            className={`group flex items-center justify-center gap-2 px-7 py-4 w-full sm:w-auto text-sm rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer backdrop-blur-md ${
              isKawaii ? 'font-kawaii font-semibold' : 'tracking-widest uppercase text-xs'
            }`}
          >
            <Sparkle size={14} className="animate-spin duration-[3000ms]" />
            <span>{isKawaii ? '🍭 View Special Code' : 'ACQUIRE ENTRANCE CODE'}</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 flex justify-center w-full z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className={`flex flex-col items-center gap-1 ${isKawaii ? 'text-rose-400' : 'text-stone-500'}`}
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold">SCROLL</span>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
