import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, ZoomIn } from 'lucide-react';

interface AngelaItem {
  name: string;
  price: number;
  img: string;
  tag: string;
  desc: string;
}

interface AngelaCatalogProps {
  items: AngelaItem[];
}

const COP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

export default function AngelaCatalog({ items }: AngelaCatalogProps) {
  const [lightbox, setLightbox] = useState<AngelaItem | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openLightbox = (item: AngelaItem, idx: number) => {
    setLightbox(item);
    setLightboxIdx(idx);
  };

  const closeLightbox = () => setLightbox(null);

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = (lightboxIdx - 1 + items.length) % items.length;
    setLightboxIdx(newIdx);
    setLightbox(items[newIdx]);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = (lightboxIdx + 1) % items.length;
    setLightboxIdx(newIdx);
    setLightbox(items[newIdx]);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -290, behavior: 'smooth' });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 290, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Sombras laterales */}
      <div className="absolute left-0 top-0 bottom-8 w-10 bg-gradient-to-r from-[#fff5f6] to-transparent z-10 pointer-events-none rounded-l-2xl" />
      <div className="absolute right-0 top-0 bottom-8 w-10 bg-gradient-to-l from-[#fff5f6] to-transparent z-10 pointer-events-none rounded-r-2xl" />

      {/* Botones nav desktop */}
      <button
        onClick={scrollLeft}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-8 -translate-x-2 z-20 w-10 h-10 bg-white rounded-full shadow-lg border border-rose-100 items-center justify-center cursor-pointer hover:bg-rose-50 transition-all hover:scale-110"
      >
        <ChevronLeft size={18} className="text-rose-400" />
      </button>
      <button
        onClick={scrollRight}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-8 translate-x-2 z-20 w-10 h-10 bg-white rounded-full shadow-lg border border-rose-100 items-center justify-center cursor-pointer hover:bg-rose-50 transition-all hover:scale-110"
      >
        <ChevronRight size={18} className="text-rose-400" />
      </button>

      {/* Scroll container — nativo, funciona en móvil y desktop */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-2 px-6"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="group bg-white rounded-2xl border border-rose-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex-shrink-0 flex flex-col"
            style={{
              width: 'clamp(220px, 65vw, 260px)',
              scrollSnapAlign: 'start',
            }}
          >
            {/* Imagen — click abre lightbox */}
            <div
              className="relative overflow-hidden cursor-zoom-in"
              style={{ height: 320 }}
              onClick={() => openLightbox(item, i)}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay al hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <ZoomIn size={20} className="text-rose-500" />
                </div>
              </div>
              {/* Tag */}
              <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-rose-600 shadow-sm">
                {item.tag}
              </span>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h4 className="font-bold text-sm text-rose-900 leading-snug">{item.name}</h4>
              <p className="text-[11px] text-stone-400 leading-relaxed flex-1 line-clamp-2">{item.desc}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-rose-500 font-bold text-sm">{COP(item.price)}</span>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  className="flex items-center gap-1.5 bg-rose-400 hover:bg-rose-500 text-white px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition-colors shadow-sm"
                >
                  <ShoppingBag size={12} />
                  Agregar
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hint scroll móvil */}
      <p className="text-center text-[11px] text-rose-300 mt-1 flex items-center justify-center gap-1 sm:hidden">
        <span>←</span> desliza para ver más <span>→</span>
      </p>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
            onClick={closeLightbox}
          >
            {/* Panel */}
            <motion.div
              key={lightbox.img}
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col sm:flex-row max-w-2xl w-full max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Imagen */}
              <div className="w-full sm:w-1/2 bg-stone-100 flex-shrink-0" style={{ minHeight: 300 }}>
                <img
                  src={lightbox.img}
                  alt={lightbox.name}
                  className="w-full h-full object-cover object-top"
                  style={{ maxHeight: '70vh' }}
                />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 block mb-2">{lightbox.tag}</span>
                  <h3 className="text-xl font-bold text-stone-900 mb-3 leading-tight">{lightbox.name}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{lightbox.desc}</p>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-2xl font-bold text-rose-500">{COP(lightbox.price)}</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-2xl font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors shadow-lg shadow-rose-200"
                  >
                    <ShoppingBag size={16} />
                    Agregar al carrito
                  </motion.button>
                  <p className="text-[10px] text-stone-400 text-center">
                    {lightboxIdx + 1} / {items.length} · toca fuera para cerrar
                  </p>
                </div>
              </div>

              {/* Cerrar */}
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center cursor-pointer transition-all z-10"
              >
                <X size={16} className="text-stone-600" />
              </button>

              {/* Prev / Next */}
              <button
                onClick={prevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center cursor-pointer transition-all"
              >
                <ChevronLeft size={18} className="text-stone-600" />
              </button>
              <button
                onClick={nextLightbox}
                className="absolute right-3 sm:right-auto sm:left-[calc(50%-20px)] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center cursor-pointer transition-all"
              >
                <ChevronRight size={18} className="text-stone-600" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
