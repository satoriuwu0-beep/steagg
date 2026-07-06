import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Search, SlidersHorizontal, ShoppingBag, Eye, Star, Sparkles, X, ChevronDown } from 'lucide-react';
import { Product, BrandMode } from '../types';

interface ProductCatalogProps {
  products: Product[];
  currentMode: BrandMode;
  onProductClick: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onAddToCart: (product: Product, size: string, color: string) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function ProductCatalog({
  products,
  currentMode,
  onProductClick,
  onToggleWishlist,
  wishlist,
  onAddToCart,
  categories,
  selectedCategory,
  onSelectCategory
}: ProductCatalogProps) {
  const isKawaii = currentMode === 'STEAGG_KAWAII';

  // State filters
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Available unique sizes for fitters
  const sizeOptions = useMemo(() => {
    return isKawaii ? ["S", "M", "L", "One Size (S-L)"] : ["XXS", "XS", "S", "M", "L", "XL"];
  }, [isKawaii]);

  // Filter products by brand Mode & filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Must match active mode
      if (product.brandMode !== currentMode) return false;

      // Category filter
      if (selectedCategory !== "All Items" && product.category !== selectedCategory) return false;

      // Price limit
      if (product.price > maxPrice) return false;

      // Size filter
      if (selectedSize && !product.sizes.includes(selectedSize)) return false;

      // Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesFeat = product.features.some(f => f.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesFeat) return false;
      }

      return true;
    });
  }, [products, currentMode, selectedCategory, searchQuery, maxPrice, selectedSize]);

  // Quick action notifier
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showNotification = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || "M";
    const defaultColor = product.colorHexes[0] || "#FAF9F6";
    onAddToCart(product, defaultSize, defaultColor);
    showNotification(`Added ${product.name} (${defaultSize}) to your Bag!`);
  };

  const handleWishlistClick = (e: React.MouseEvent, productId: string, name: string) => {
    e.stopPropagation();
    onToggleWishlist(productId);
    const isNowLiked = !wishlist.includes(productId);
    showNotification(isNowLiked ? `Added ${name} to Wishlist! 🖤` : `Removed ${name} from Wishlist`);
  };

  return (
    <div id="catalog-section" className={`py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-500 ${
      isKawaii ? 'font-kawaii text-rose-950Bg bg-rose-50/20' : 'font-sans text-stone-800'
    }`}>
      
      {/* Search and Filters Hub */}
      <div className="mb-10 sm:mb-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-250/20">
          
          {/* Section Headers */}
          <div>
            <h2 className={`text-2xl sm:text-3xl font-bold uppercase ${
              isKawaii 
                ? 'font-kawaii text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 filter drop-shadow-sm' 
                : 'font-serif text-stone-900 tracking-wider'
            }`}>
              {isKawaii ? '🍰 Sweet Season Selections' : 'Architectural Collection'}
            </h2>
            <p className={`text-xs mt-1 ${isKawaii ? 'text-pink-600/70 font-medium' : 'text-stone-500 tracking-widest uppercase font-light'}`}>
              {isKawaii ? 'Fluffy structures, magical coordinates, and high-fashion comfort.' : 'Avant-Garde structural geometries designed for core longevity.'}
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="flex items-center gap-3 w-full md:w-auto max-w-md">
            <div className={`relative flex-1 min-w-[200px] border rounded-full overflow-hidden transition-all duration-300 ${
              isKawaii 
                ? 'border-rose-250 bg-white/70 focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-100' 
                : 'border-stone-300 bg-stone-100/50 focus-within:border-stone-900 focus-within:bg-white'
            }`}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input
                type="text"
                placeholder={isKawaii ? "Search cloud-knits..." : "Search style archives..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 outline-none bg-transparent"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 text-xs"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold cursor-pointer transition-all ${
                isKawaii
                  ? 'border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100'
                  : 'border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>{showFilters ? 'Hide Parameters' : 'Adjust Filters'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Filter Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`overflow-hidden border-b transition-colors duration-305 ${
                isKawaii ? 'border-rose-100 bg-rose-50/50' : 'border-stone-200 bg-stone-50/50'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 px-4">
                {/* Size Filter */}
                <div>
                  <h4 className={`text-xs font-bold uppercase mb-3 ${isKawaii ? 'text-pink-600' : 'text-stone-900 tracking-wider'}`}>
                    Available Silhouette Size
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSize(null)}
                      className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs border transition-all cursor-pointer ${
                        selectedSize === null
                          ? isKawaii ? 'bg-pink-400 border-pink-400 text-white font-bold' : 'bg-stone-950 border-stone-950 text-white'
                          : isKawaii ? 'border-rose-200 hover:bg-rose-100/50 text-rose-700' : 'border-stone-300 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      All Fits
                    </button>
                    {sizeOptions.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs border transition-all cursor-pointer ${
                          selectedSize === size
                            ? isKawaii ? 'bg-pink-400 border-pink-400 text-white font-bold' : 'bg-stone-950 border-stone-950 text-white'
                            : isKawaii ? 'border-rose-200 hover:bg-rose-100/50 text-rose-700' : 'border-stone-300 hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price cap sliding filter */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`text-xs font-bold uppercase ${isKawaii ? 'text-pink-600' : 'text-stone-900 tracking-wider'}`}>
                      Maximum Pricing Tier
                    </h4>
                    <span className="text-xs font-bold font-mono">${maxPrice} USD</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className={`w-full accent-rose-500 cursor-pointer h-1.5 rounded-lg bg-stone-200 ${
                      isKawaii ? 'accent-pink-400' : 'accent-stone-900'
                    }`}
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                    <span>$50</span>
                    <span>$500</span>
                  </div>
                </div>

                {/* Reset Filters Option */}
                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => {
                      setSelectedSize(null);
                      setMaxPrice(500);
                      setSearchQuery("");
                      onSelectCategory("All Items");
                    }}
                    className={`px-5 py-3 rounded-full text-xs font-bold transition-all hover:shadow-sm cursor-pointer ${
                      isKawaii
                        ? 'bg-gradient-to-r from-pink-300 to-purple-300 text-white'
                        : 'bg-stone-900 text-stone-50 hover:bg-stone-950'
                    }`}
                  >
                    Reset Active Parameters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Pills bar */}
        <div className="flex items-center gap-2 overflow-x-auto scroller-hide py-4 mt-2">
          {/* Kawaii mode: special 🍦 button label */}
          {isKawaii && (
            <span className="text-xs font-bold text-pink-500 mr-1 shrink-0 flex items-center gap-1">
              🍦 <span className="uppercase tracking-widest">Categorías</span>
            </span>
          )}
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-5 py-2 rounded-full text-xs font-medium cursor-pointer transition-all shrink-0 uppercase tracking-widest ${
                  isSelected
                    ? isKawaii
                      ? 'bg-rose-400 text-white font-bold shadow-[0_2px_10px_rgba(251,113,113,0.3)]'
                      : 'bg-stone-950 text-white'
                    : isKawaii
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Container */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center bg-stone-50/50">
          <p className="text-lg text-stone-500 font-light italic mb-2">No archive patterns registered in this dimension...</p>
          <span className="text-xs text-stone-400">Try loosening your style parameters or resetting active filters.</span>
          <button
            onClick={() => {
              onSelectCategory("All Items");
              setSelectedSize(null);
              setMaxPrice(500);
              setSearchQuery("");
            }}
            className={`mt-6 px-6 py-2.5 rounded-full text-xs font-medium border cursor-pointer border-stone-300 hover:bg-stone-100 transition-colors uppercase tracking-widest ${
              isKawaii ? 'border-rose-200 hover:bg-rose-100/50 text-rose-700' : ''
            }`}
          >
            Clear Selected Filter Specs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-8">
          {filteredProducts.map((product) => {
            const isLiked = wishlist.includes(product.id);
            const secondaryImage = product.gallery && product.gallery[1] ? product.gallery[1] : product.image;
            const isHovered = hoveredCardId === product.id;

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onClick={() => onProductClick(product)}
                onMouseEnter={() => setHoveredCardId(product.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`group flex flex-col justify-between h-full cursor-pointer relative rounded-2xl p-3 border transition-all duration-500 ${
                  isKawaii
                    ? 'border-rose-100/40 bg-white shadow-[0_4px_18px_rgba(251,113,133,0.03)] hover:shadow-[0_8px_24px_rgba(251,113,133,0.1)] hover:border-pink-200'
                    : 'border-stone-200/40 bg-white hover:border-stone-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Media frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100 mb-4">
                  {/* Alternating Image Hover Transition */}
                  <AnimatePresence>
                    <img
                      src={isHovered ? secondaryImage : product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out transform group-hover:scale-[1.03]"
                    />
                  </AnimatePresence>

                  {/* Hot labels badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                    {product.isNew && (
                      <span className={`text-[9px] uppercase px-2 py-1 rounded-full font-bold tracking-widest text-white shadow-sm ${
                        isKawaii ? 'bg-gradient-to-r from-pink-400 to-rose-400' : 'bg-black'
                      }`}>
                        NEW ADDITION
                      </span>
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-[9px] font-bold px-2 py-1 bg-amber-400 text-stone-900 rounded-full shadow-sm tracking-wide">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Quick-action Floating buttons */}
                  <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <button
                      onClick={(e) => handleWishlistClick(e, product.id, product.name)}
                      className={`p-2 rounded-full cursor-pointer shadow-lg backdrop-blur-md transition-all hover:scale-110 ${
                        isLiked
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/90 hover:bg-white text-stone-700'
                      }`}
                    >
                      <Heart size={16} fill={isLiked ? '#fff' : 'none'} />
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`p-2 rounded-full cursor-pointer shadow-lg backdrop-blur-md transition-all hover:scale-110 ${
                        isKawaii
                          ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
                          : 'bg-stone-950 text-white hover:bg-stone-900'
                      }`}
                      title="Quick Add To Bag"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="px-1 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tiny category / model rating info */}
                    <div className="flex items-center justify-between text-[10px] text-stone-400 uppercase tracking-widest mb-1">
                      <span>{product.category}</span>
                      <span className="flex items-center gap-0.5 font-semibold text-stone-600 font-mono">
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        {product.rating}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className={`text-sm font-semibold mb-2 group-hover:text-rose-500 transition-colors line-clamp-1 ${
                      isKawaii ? 'font-kawaii text-rose-950 text-base leading-tight' : 'font-serif text-stone-900'
                    }`}>
                      {product.name}
                    </h3>
                  </div>

                  <div>
                    {/* Sizes preview */}
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {product.sizes.slice(0, 3).map(sz => (
                        <span key={sz} className="text-[9px] px-1.5 py-0.5 border border-stone-200/50 rounded font-semibold text-stone-400">
                          {sz}
                        </span>
                      ))}
                      {product.sizes.length > 3 && (
                        <span className="text-[9px] px-1 py-0.5 bg-stone-100 rounded text-stone-400">
                          +{product.sizes.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Colors & Price bottom section */}
                    <div className="flex items-end justify-between pt-1 border-t border-stone-100">
                      {/* Interactive little color circles */}
                      <div className="flex gap-1">
                        {product.colorHexes.map((hex) => (
                          <span
                            key={hex}
                            style={{ backgroundColor: hex }}
                            className="w-2.5 h-2.5 rounded-full border border-stone-200 shadow-sm"
                            title={hex}
                          />
                        ))}
                      </div>

                      {/* Pricing block */}
                      <div className={`flex items-center gap-2 font-semibold ${isKawaii ? 'font-kawaii' : 'font-mono'}`}>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through font-normal">
                            ${product.originalPrice}
                          </span>
                        )}
                        <span className={`text-[15px] ${isKawaii ? 'text-rose-500 font-extrabold font-kawaii' : 'text-stone-950 font-bold'}`}>
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Micro Status Toast / Floating triggers */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-3 border ${
              isKawaii 
                ? 'bg-rose-50 border-rose-200 text-rose-700 font-kawaii shadow-pink-100' 
                : 'bg-stone-950 border-stone-800 text-stone-50 font-sans'
            }`}
          >
            {isKawaii ? <Sparkles size={14} className="animate-bounce" /> : <Star size={14} className="fill-stone-100" />}
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
