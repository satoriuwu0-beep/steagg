import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Recycle, Scissors, Leaf } from 'lucide-react';

interface ModaCircularPageProps {
  onBack: () => void;
  isKawaii: boolean;
}

const CIRCULAR_ITEMS = [
  {
    id: 'c1',
    name: 'Chaqueta Denim Intervenida',
    originalPriceCOP: 320000,
    priceCOP: 180000,
    description: 'Jean clásico de los 90s con bordados a mano y parches artesanales. Única. Talla M.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    tag: 'Modificada',
    tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'c2',
    name: 'Camisa Vintage Reworked',
    originalPriceCOP: 180000,
    priceCOP: 95000,
    description: 'Camisa Oxford de segunda vida, intervenida con tie-dye artesanal y botones personalizados.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80',
    tag: 'Segunda vida',
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'c3',
    name: 'Abrigo Upcycled Patchwork',
    originalPriceCOP: 650000,
    priceCOP: 290000,
    description: 'Construido a partir de tres abrigos diferentes. Cada panel cuenta una historia distinta.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
    tag: 'Upcycled',
    tagColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'c4',
    name: 'Pantalón Cargo Modificado',
    originalPriceCOP: 220000,
    priceCOP: 110000,
    description: 'Cargo clásico transformado con nuevos bolsillos artesanales y teñido manual en índigo.',
    image: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&auto=format&fit=crop&q=80',
    tag: 'Modificado',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'c5',
    name: 'Blazer Vintage Restaurado',
    originalPriceCOP: 480000,
    priceCOP: 220000,
    description: 'Blazer italiano de los 80s. Forrado nuevamente, botones cambiados, hombros ajustados.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4927?w=600&auto=format&fit=crop&q=80',
    tag: 'Restaurado',
    tagColor: 'bg-rose-100 text-rose-700',
  },
  {
    id: 'c6',
    name: 'Vestido Rework Artesanal',
    originalPriceCOP: 350000,
    priceCOP: 160000,
    description: 'Vestido de noche transformado en pieza casual única con bordados florales a mano.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
    tag: 'Artesanal',
    tagColor: 'bg-pink-100 text-pink-700',
  },
];

export default function ModaCircularPage({ onBack, isKawaii }: ModaCircularPageProps) {
  const formatCOP = (n: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 px-4 sm:px-8 py-4 flex items-center gap-4">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 text-sm font-semibold hover:bg-stone-50 cursor-pointer transition-all">
          <ArrowLeft size={15}/> Volver
        </motion.button>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">♻️ STEAGG</span>
          <h1 className="text-lg font-bold uppercase tracking-wider text-stone-900">Moda Circular</h1>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1558171813-80cc875e2d0b?w=1200&auto=format&fit=crop&q=80"
          alt="Moda circular" referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"/>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"/>
        <div className="absolute bottom-8 left-6 sm:left-12">
          <p className="text-emerald-400 text-xs uppercase tracking-widest font-bold mb-2">♻️ Segunda vida · Modificada · Rework</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase leading-tight">
            Cada prenda<br/>tiene una historia
          </h2>
        </div>
      </div>

      {/* Descripción inspiracional */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 text-center">
        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-light">
          La moda más sostenible es la que ya existe.<br/>
          <span className="font-semibold text-stone-900">Seleccionamos, intervenimos y devolvemos al mundo las prendas que el tiempo olvidó.</span>
        </p>
        <p className="mt-4 text-sm text-stone-400 leading-relaxed">
          Cada pieza de nuestra colección circular pasa por manos artesanas que la transforman en algo nuevo — sin perder su alma original. Ropa de segunda vida, modificada con propósito, diseñada para durar otra generación.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          {[
            { icon: <Recycle size={20}/>, label: 'Segunda vida', desc: 'Prendas cuidadosamente seleccionadas' },
            { icon: <Scissors size={20}/>, label: 'Intervenida', desc: 'Modificadas por manos artesanas' },
            { icon: <Leaf size={20}/>, label: 'Consciente', desc: 'Moda que respeta el planeta' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 w-full sm:w-44">
              <span className="text-emerald-600">{icon}</span>
              <span className="font-bold text-sm text-emerald-800 uppercase tracking-wide">{label}</span>
              <span className="text-xs text-stone-400 text-center">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
        <h3 className="text-xs uppercase font-bold tracking-widest text-stone-400 mb-8 text-center">
          COLECCIÓN DISPONIBLE — PIEZAS ÚNICAS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CIRCULAR_ITEMS.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img src={item.image} alt={item.name} referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-stone-900 text-sm mb-1">{item.name}</h4>
                <p className="text-xs text-stone-400 leading-relaxed mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-300 line-through block">{formatCOP(item.originalPriceCOP)}</span>
                    <span className="font-bold text-stone-900 text-base">{formatCOP(item.priceCOP)}</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-stone-950 text-white text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer hover:bg-emerald-700 transition-colors">
                    Agregar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
