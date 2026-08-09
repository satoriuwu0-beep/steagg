import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Video, Compass, Award, ShieldAlert, Heart, Star, ShoppingBag, Eye, X } from 'lucide-react';

import { Product, CartItem, BrandingSettings, BrandMode, Review } from './types';
import { INITIAL_PRODUCTS, INITIAL_BRANDING, CATEGORIES_STEAGG, CATEGORIES_KAWAII } from './data';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import AdminDashboard from './components/AdminDashboard';
import AdminGate from './components/AdminGate';
import MusicController from './components/MusicController';
import AppQRSection from './components/AppQRSection';
import AuthModal from './components/AuthModal';
import CartAndWishlistDrawers from './components/CartAndWishlistDrawers';
import ModaCircularPage from './components/ModaCircularPage';

// Formateador de precios en pesos colombianos
const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n * 4000);

export default function App() {
  // 1. STATE INITIALIZATION & SYNC ENGINE
  const [currentMode, setCurrentMode] = useState<BrandMode>(() => {
    const saved = localStorage.getItem('steagg_mode');
    return (saved as BrandMode) || 'STEAGG';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('steagg_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  const [branding, setBranding] = useState<BrandingSettings>(() => {
    const saved = localStorage.getItem('steagg_branding');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_BRANDING;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('steagg_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('steagg_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; address?: string; phone?: string } | null>(() => {
    const saved = localStorage.getItem('steagg_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });

  // 2. PERSISTENCE SYNCS
  useEffect(() => {
    localStorage.setItem('steagg_mode', currentMode);
  }, [currentMode]);

  useEffect(() => {
    localStorage.setItem('steagg_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('steagg_branding', JSON.stringify(branding));
  }, [branding]);

  useEffect(() => {
    localStorage.setItem('steagg_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('steagg_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('steagg_user', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  // 3. OVERLAYS CONTROLS
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Admin gate via URL hash (#admin)
  const [showAdminGate, setShowAdminGate] = useState(false);
  const [showCircularPage, setShowCircularPage] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setShowAdminGate(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  const handleAdminUnlock = () => {
    setShowAdminGate(false);
    setIsAdminOpen(true);
    window.history.pushState('', document.title, window.location.pathname);
  };
  const handleAdminGateClose = () => {
    setShowAdminGate(false);
    window.history.pushState('', document.title, window.location.pathname);
  };

  // Promo overlays
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  // Video model active lookbook player
  const [campaignVideoActive, setCampaignVideoActive] = useState(false);

  const isKawaii = currentMode === 'STEAGG_KAWAII';

  // 4. HANDLERS
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems(prev => {
      // Check if exact same item options exist
      const existingIdx = prev.findIndex(item => 
        item.productId === product.id && item.size === size && item.color === color
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        return [...prev, {
          id: Math.random().toString(),
          productId: product.id,
          size,
          color,
          quantity: 1
        }];
      }
    });
  };

  const handleUpdateCartQty = (lineId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === lineId) {
          const nextQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, nextQty) };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (lineId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== lineId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleAddReview = (productId: string, review: Review) => {
    setProducts(prev => {
      return prev.map(p => {
        if (p.id === productId) {
          const updatedReviews = [review, ...p.reviews];
          // Calculate active new rating
          const nextRating = parseFloat(((p.reviews.reduce((acc, r) => acc + r.rating, 0) + review.rating) / updatedReviews.length).toFixed(1));
          return {
            ...p,
            reviews: updatedReviews,
            rating: nextRating
          };
        }
        return p;
      });
    });
  };

  // 5. ADMINISTRATIVE CRUD MANAGEMENT
  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p));
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Perform irreversible subtraction of this apparel from the archives?")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleResetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setBranding(INITIAL_BRANDING);
    setCurrentMode('STEAGG');
    setCartItems([]);
    setWishlist([]);
    setCurrentUser(null);
  };

  const handleUpdateUserProfileAddress = (address: string, phone: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        address,
        phone
      });
    }
  };

  // Scroll handler to shop catalogs smoothly
  const handleScrollToShop = () => {
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Active Categories lists depending on style layout
  const categoriesList = isKawaii ? CATEGORIES_KAWAII : CATEGORIES_STEAGG;
  const [selectedCategory, setSelectedCategory] = useState("All Items");

  // Reset category when mode changes
  useEffect(() => {
    setSelectedCategory("All Items");
  }, [currentMode]);

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-500 overflow-x-hidden ${
      isKawaii 
        ? 'bg-[#fff5f6] font-kawaii selection:bg-pink-200 selection:text-pink-700' 
        : 'bg-stone-50 font-sans selection:bg-stone-250 selection:bg-stone-200 selection:text-stone-900'
    }`}>

      {/* Botón oculto para activar desde Navbar */}
      <button id="moda-circular-trigger" className="hidden" onClick={() => setShowCircularPage(true)} />

      {/* Página Moda Circular (overlay de pantalla completa) */}
      <AnimatePresence>
        {showCircularPage && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
            <ModaCircularPage onBack={() => setShowCircularPage(false)} isKawaii={isKawaii} />
          </div>
        )}
      </AnimatePresence>
      {/* Main navigation Header bar */}
      <Navbar
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        cartCount={cartItems.reduce((acc, c) => acc + c.quantity, 0)}
        wishlistCount={wishlist.length}
        isAdminOpen={isAdminOpen}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        user={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          localStorage.removeItem('steagg_user');
        }}
        settings={branding}
        categories={categoriesList}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Immersive cinematic first-fold Lobby Hero */}
      <Hero
        currentMode={currentMode}
        settings={branding}
        onExploreClick={handleScrollToShop}
        onOpenPromo={() => setShowPromoPopup(true)}
      />

      {/* ==================== LOOKBOOK CAMPAIGN BLOCK ==================== */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className={`py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-500 ${
          isKawaii ? 'bg-rose-50/10' : ''
        }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Campaign graphics imagery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className={`aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl border-2 ${
              isKawaii ? 'border-pink-200 shadow-pink-100/50' : 'border-stone-850 border-stone-900 shadow-stone-950/20'
            }`}>
              <img
                src={isKawaii 
                  ? "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop"
                  : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop"
                }
                alt="Campaign Concept"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-[4000ms]"
              />

              {/* Play video overlay button */}
              <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px] flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCampaignVideoActive(true)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer text-stone-900 shadow-xl border-4 ${
                    isKawaii 
                      ? 'bg-gradient-to-r from-pink-300 to-rose-300 text-white border-white' 
                      : 'bg-white text-stone-950 border-stone-100'
                  }`}
                  title="Play lookbook documentary campaign loop"
                >
                  <Video size={24} className="ml-0.5 fill-current" />
                </motion.button>
              </div>
            </div>

            {/* floating model details badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className={`absolute -bottom-6 -right-4 p-4 rounded-2xl border shadow-xl max-w-[190px] backdrop-blur-md ${
                isKawaii ? 'bg-purple-50/90 border-purple-150 text-purple-950 text-[10px]' : 'bg-stone-950 border-stone-800 text-stone-100 text-[10px]'
              }`}
            >
              <span className="font-bold block uppercase mb-1">Look #08 Campaign</span>
              <p className="font-light italic leading-normal text-stone-400">
                {isKawaii ? 'Strawberry tulle paired with custom hand-wired flower locks.' : 'Double-faced worsted virgin jacket with split cuffs outlines.'}
              </p>
            </motion.div>
          </motion.div>

          {/* Campaign narratives */}
          <div className="lg:col-span-7 space-y-6">
            <span className={`text-xs font-bold uppercase tracking-widest ${isKawaii ? 'text-pink-600' : 'text-stone-400'}`}>
              ◆ AVANT-GARDE CHRONICLES
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-tight ${
              isKawaii ? 'font-kawaii text-rose-500' : 'font-serif text-stone-950'
            }`}>
              {isKawaii ? 'Pastel Harmony Campaign' : 'The Monolithic Form Loop'}
            </h2>
            <blockquote className={`border-l-4 pl-4 text-sm sm:text-base italic ${
              isKawaii ? 'border-pink-300 text-purple-950 font-normal' : 'border-stone-900 text-stone-650'
            }`}>
              "In each crease we discover memory. In each asymmetrical lapel line we locate an alternative architectural horizon. Clothing is sculpture in translation."
            </blockquote>
            <p className={`text-xs sm:text-sm leading-relaxed ${isKawaii ? 'text-rose-900/80 font-medium' : 'text-stone-500 font-light'}`}>
              The 2026 Archive capsule celebrates the metamorphosis of natural gabardine and refined organza fiber sheets. We avoid general standard fast fashion, selecting single-weave threads and custom double-breasted off-centered peak labels. Each design is a durable shelter of expression.
            </p>

            {/* micro Campaign stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200/50">
              <div>
                <span className={`text-xl sm:text-2xl font-bold block ${isKawaii ? 'text-pink-500' : 'text-stone-950'}`}>100%</span>
                <span className="text-[10px] uppercase text-stone-400 block tracking-widest">Organic Gabardine</span>
              </div>
              <div>
                <span className={`text-xl sm:text-2xl font-bold block ${isKawaii ? 'text-purple-500' : 'text-stone-950'}`}>Bespoke</span>
                <span className="text-[10px] uppercase text-stone-400 block tracking-widest">Structural Finish</span>
              </div>
              <div>
                <span className={`text-xl sm:text-2xl font-bold block ${isKawaii ? 'text-sky-505' : 'text-stone-950'}`}>Limited</span>
                <span className="text-[10px] uppercase text-stone-400 block tracking-widest">Numbered Drops</span>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* ==================== THREE FEATURED HIGHLIGHTS ==================== */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className={`py-14 sm:py-20 transition-colors duration-500 ${isKawaii ? 'bg-purple-50/30' : 'bg-stone-50/50 border-y border-stone-200/40'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className={`text-xs uppercase font-bold tracking-[0.25em] mb-2.5 ${isKawaii ? 'text-pink-500' : 'text-stone-400'}`}>
              DESIGNER CHRONICLES
            </h3>
            <h2 className={`text-2xl sm:text-3xl font-bold uppercase ${isKawaii ? 'font-kawaii text-rose-500' : 'font-serif text-stone-950'}`}>
              {isKawaii ? '🍰 Magical Sweet Essentials' : 'The Editorial Core Matrix'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.brandMode === currentMode && p.isFeatured).slice(0, 3).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedProduct(item)}
                className={`group cursor-pointer rounded-2xl p-4 border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  isKawaii ? 'border-pink-100 hover:border-pink-300' : 'border-stone-205/30 border-stone-200 hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 relative">
                    <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase rounded">
                      EXPLORE DESIGN
                    </span>
                  </div>
                  <h4 className={`text-base font-bold ${isKawaii ? 'font-kawaii text-rose-955' : 'font-serif text-stone-900'}`}>{item.name}</h4>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2 font-light">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
                  <span className="text-sm font-bold font-mono">${item.price} USD</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${isKawaii ? 'text-pink-500' : 'text-stone-700'}`}>
                    <span>SECURE ARCHIVE</span>
                    <ArrowRight size={11} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Catalog hub: Interactive and customizable grids */}
      <ProductCatalog
        products={products}
        currentMode={currentMode}
        onProductClick={setSelectedProduct}
        onToggleWishlist={handleToggleWishlist}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        categories={categoriesList}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* ==================== SECCIÓN ÍNTIMA KAWAII ==================== */}
      {isKawaii && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="py-20 bg-gradient-to-b from-[#fff5f6] to-rose-50/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Título */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-xs uppercase tracking-widest font-bold text-rose-400 block mb-2">🌸 Colección Especial</span>
              <h2 className="text-3xl sm:text-5xl font-kawaii font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">
                Íntima Kawaii ✨
              </h2>
              <p className="text-stone-400 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                Piezas dulces y delicadas para los momentos más especiales. Diseñadas para sentirte hermosa desde adentro.
              </p>
            </motion.div>

            {/* Categorías íntimas */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {['Toda la colección', 'Lencería suave', 'Pijamas kawaii', 'Bodys dulces', 'Sets coordinados'].map((cat, i) => (
                <motion.button key={cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all border ${
                    i === 0
                      ? 'bg-rose-400 text-white border-rose-400 shadow-md shadow-rose-200'
                      : 'bg-white text-rose-500 border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Grid íntima */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {[
                { name: 'Set Seda Rosa', price: 320000, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80', tag: '🌸 Nuevo' },
                { name: 'Pijama Ositos', price: 185000, img: 'https://images.unsplash.com/photo-1566479179817-16c41bc84994?w=600&auto=format&fit=crop&q=80', tag: '🐻 Top' },
                { name: 'Body Encaje Suave', price: 240000, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4927?w=600&auto=format&fit=crop&q=80', tag: '✨ Exclusivo' },
                { name: 'Set Flores Pastel', price: 295000, img: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&auto=format&fit=crop&q=80', tag: '🌷 Favorito' },
              ].map((item, i) => (
                <motion.div key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl border border-rose-100 shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img src={item.img} alt={item.name} referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-rose-500">
                      {item.tag}
                    </span>
                    <button className="absolute bottom-2 right-2 bg-rose-400 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg">
                      <ShoppingBag size={14}/>
                    </button>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-xs text-rose-900 font-kawaii">{item.name}</h4>
                    <p className="text-rose-500 font-bold text-sm mt-1">
                      {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(item.price)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCategory('All Items')}
                className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-full font-bold uppercase tracking-widest text-sm cursor-pointer shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all">
                🌸 Ver toda la colección íntima
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* Moda Circular y Fundación — solo en modo editorial */}
      {!isKawaii && (<>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
        className={`py-20 sm:py-28 relative overflow-hidden ${isKawaii ? 'bg-rose-50/40' : 'bg-stone-950'}`}
      >
        {/* Background texture */}
        <div className={`absolute inset-0 ${isKawaii ? 'opacity-10' : 'opacity-5'}`}>
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #4ade80 0%, transparent 50%), radial-gradient(circle at 80% 20%, #86efac 0%, transparent 40%)'}} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">♻️</span>
                <span className={`text-xs font-bold uppercase tracking-[0.3em] ${isKawaii ? 'text-green-500' : 'text-emerald-400'}`}>
                  Nueva sección
                </span>
              </div>

              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-tight ${
                isKawaii ? 'font-kawaii text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500' : 'font-serif text-white'
              }`}>
                Moda<br/>Circular
              </h2>

              <p className={`text-lg sm:text-xl leading-relaxed font-light ${isKawaii ? 'text-green-800' : 'text-emerald-300'}`}>
                Cada prenda tiene una historia.<br/>
                <span className="font-semibold">Nosotros le damos una segunda.</span>
              </p>

              <p className={`text-sm leading-relaxed ${isKawaii ? 'text-stone-600' : 'text-stone-400'}`}>
                Creemos que la moda no debería tener fecha de vencimiento. Por eso seleccionamos, restauramos y reimaginamos prendas de segunda mano con el mismo estándar editorial que nuestra colección principal. Ropa modificada, intervenida, transformada — porque el estilo verdadero no se descarta, se reinventa.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { icon: '👗', label: 'Segunda vida', desc: 'Prendas seleccionadas' },
                  { icon: '✂️', label: 'Modificada', desc: 'Intervenida con estilo' },
                  { icon: '🌿', label: 'Consciente', desc: 'Moda responsable' },
                ].map(({ icon, label, desc }) => (
                  <div key={label} className={`rounded-2xl p-4 text-center border ${
                    isKawaii ? 'bg-white border-green-100' : 'bg-stone-900 border-stone-800'
                  }`}>
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${isKawaii ? 'text-green-700' : 'text-emerald-400'}`}>{label}</div>
                    <div className={`text-[10px] mt-0.5 ${isKawaii ? 'text-stone-400' : 'text-stone-500'}`}>{desc}</div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowCircularPage(true)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest cursor-pointer transition-all ${
                  isKawaii
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg shadow-green-200'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                }`}
              >
                <span>♻️ Explorar Colección Circular</span>
                <ArrowRight size={14} />
              </motion.button>
            </motion.div>

            {/* Right: visual collage */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[500px] hidden lg:block"
            >
              <div className="absolute top-0 left-0 w-[55%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=600&auto=format&fit=crop&q=80" alt="Moda circular ropa segunda mano" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-[50%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80" alt="Ropa modificada intervenida" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <div className={`absolute top-[38%] right-[12%] px-4 py-3 rounded-2xl shadow-xl text-xs font-bold border ${
                isKawaii ? 'bg-white border-green-100 text-green-700' : 'bg-stone-900 border-emerald-800 text-emerald-400'
              }`}>
                ♻️ +500 prendas<br/>
                <span className="font-normal text-stone-400">con nueva oportunidad</span>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* ==================== FUNDACIÓN ==================== */}
      <motion.section
        id="fundacion-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
        className={`py-20 sm:py-28 relative overflow-hidden ${isKawaii ? 'bg-purple-50/30' : 'bg-white'}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">En construcción · Únete</span>
            </div>

            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-tight ${
              isKawaii ? 'font-kawaii text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400' : 'font-serif text-stone-950'
            }`}>
              Moda que<br/>transforma vidas
            </h2>

            <p className={`text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto ${isKawaii ? 'text-purple-700' : 'text-stone-500'} font-light`}>
              "Queremos que cada prenda que no llega a nuestra vitrina<br className="hidden sm:block"/>
              <span className="font-semibold text-stone-900"> llegue a quien más la necesita."</span>
            </p>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${isKawaii ? 'text-stone-500' : 'text-stone-400'}`}>
              Estamos buscando activamente aliarnos con fundaciones que compartan nuestra visión: seleccionamos las mejores prendas para nuestra colección y las que no cumplen el estándar editorial las donamos — no las descartamos. La moda sostenible no es una tendencia, es una decisión.
            </p>

            {/* Three pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {[
                { icon: '🔍', title: 'Selección rigurosa', desc: 'Evaluamos cada prenda con criterio editorial y social.' },
                { icon: '🤝', title: 'Alianzas reales', desc: 'Queremos construir con fundaciones comprometidas.' },
                { icon: '💚', title: 'Impacto medible', desc: 'Cada donación tiene nombre, historia y destinatario.' },
              ].map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-2xl p-6 border text-left ${
                    isKawaii ? 'bg-white border-purple-100' : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="text-3xl mb-3">{icon}</div>
                  <h4 className={`font-bold text-sm uppercase tracking-wide mb-1 ${isKawaii ? 'text-purple-700' : 'text-stone-900'}`}>{title}</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest cursor-pointer shadow-lg ${
                  isKawaii
                    ? 'bg-gradient-to-r from-purple-400 to-emerald-400 text-white'
                    : 'bg-stone-950 text-white hover:bg-stone-800'
                }`}
              >
                <span>🌱 Quiero ser aliado</span>
              </motion.button>
              <p className="text-xs text-stone-400">
                ¿Tienes una fundación? Escríbenos.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-5 select-none pointer-events-none">♻️</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-5 select-none pointer-events-none">🌱</div>
      </motion.section>
      </>)}

      {/* Bottom App Scannable QR Section */}
      <AppQRSection
        currentMode={currentMode}
        settings={branding}
      />

      {/* Constant fixed music trigger bottom left */}
      <MusicController currentMode={currentMode} />

      {/* ===================== FOOTER ===================== */}
      <footer className={`py-12 border-t transition-colors duration-500 text-xs ${
        isKawaii
          ? 'bg-rose-100/40 border-rose-100 text-rose-900 font-kawaii font-medium'
          : 'bg-black border-stone-900 text-stone-400 font-sans'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className={`text-base font-bold uppercase mb-4 ${isKawaii ? 'text-pink-600' : 'text-stone-100 font-serif'}`}>
              {isKawaii ? 'ste agg 🍦' : 'STEAGG'}
            </h3>
            <p className="leading-relaxed font-light">
              Bespoke luxury clothing boundaries built on double gabardine cotton, minimal drapery and elegant cozy sweet dream-capsules.
            </p>
          </div>
          <div>
            <h3 className={`text-xs font-bold uppercase mb-4 tracking-wider ${isKawaii ? 'text-rose-700' : 'text-stone-100'}`}>Archival Portals</h3>
            <ul className="space-y-2 font-light">
              <li><button onClick={handleScrollToShop} className="hover:underline hover:text-white">Shop Entire Archive</button></li>
              <li><button onClick={() => setCurrentMode('STEAGG')} className="hover:underline hover:text-white">Editorial Minimalist Line</button></li>
              <li><button onClick={() => setCurrentMode('STEAGG_KAWAII')} className="hover:underline hover:text-white">STE AGG Kawaii Pastels</button></li>
              <li><button onClick={() => setIsAdminOpen(true)} className="hover:underline hover:text-white">Owner Creator Studio</button></li>
            </ul>
          </div>
          <div>
            <h3 className={`text-xs font-bold uppercase mb-4 tracking-wider ${isKawaii ? 'text-rose-700' : 'text-stone-100'}`}>Care & Inquiries</h3>
            <ul className="space-y-2 font-light">
              <li><span className="hover:text-white select-text">support@steagg.com</span></li>
              <li className="select-text">Phone: +1 (800) STE-AGG-8</li>
              <li><span className="hover:text-white">Archival Cleansing Guidelines</span></li>
              <li><span className="hover:text-white">Complimentary Returns</span></li>
            </ul>
          </div>
          <div>
            <h3 className={`text-xs font-bold uppercase mb-4 tracking-wider ${isKawaii ? 'text-rose-700' : 'text-stone-100'}`}>Brand Philosophy</h3>
            <p className="leading-relaxed font-light">
              We create structural apparel archives, not consumer surplus waste. Hand-harvested, assembled ethically, and tracked with cryptographic digital provenance credentials.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-stone-500 font-mono">
          <span>&copy; 2026 STEAGG COUTURE ARCHIVES. All intellectual forms reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-help">Cookie parameters</span>
            <span className="hover:text-white cursor-help">Digital providences</span>
            <span className="hover:text-white cursor-help">Terms of Forms</span>
          </div>
        </div>
      </footer>

      {/* ===================== OVERLAYS & MODALS OVERLAY GRID ===================== */}

      {/* 1. PRODUCT DETAIL DIALOG POPUP */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currentMode={currentMode}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlist={wishlist}
        onAddReview={handleAddReview}
        currentUser={currentUser}
      />

      {/* 2. ADMIN STUDIO PANEL */}
      {/* Admin Gate - password protection via /#admin URL */}
      {showAdminGate && (
        <AdminGate
          onUnlock={handleAdminUnlock}
          onClose={handleAdminGateClose}
        />
      )}

      <AdminDashboard
        products={products}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        branding={branding}
        onUpdateBranding={setBranding}
        currentMode={currentMode}
        onResetToDefaults={handleResetToDefaults}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* 3. USER AUTH / PROFILE MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentMode={currentMode}
        user={currentUser}
        onLogin={(name, email) => setCurrentUser({ name, email })}
        onLogout={() => setCurrentUser(null)}
        onUpdateAddress={handleUpdateUserProfileAddress}
      />

      {/* 4. CART & WISHLIST CABINET SIDE SLIDERS DRAWERS */}
      <CartAndWishlistDrawers
        isCartOpen={isCartOpen}
        onCloseCart={() => setIsCartOpen(false)}
        isWishlistOpen={isWishlistOpen}
        onCloseWishlist={() => setIsWishlistOpen(false)}
        products={products}
        cartItems={cartItems}
        wishlistIds={wishlist}
        currentMode={currentMode}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onClearCart={() => setCartItems([])}
        userAddress={currentUser?.address}
        userPhone={currentUser?.phone}
        whatsappNumber={branding.whatsappNumber}
      />

      {/* 5. GENTLE PROMO POPUP COUPON CLAIM MODULE */}
      <AnimatePresence>
        {showPromoPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPromoPopup(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`p-6 sm:p-8 rounded-3xl max-w-sm w-full text-center relative z-10 shadow-2xl bg-white ${
                isKawaii ? 'font-kawaii text-rose-950 text-sm' : 'font-sans text-stone-800'
              }`}
            >
              <button
                onClick={() => setShowPromoPopup(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 transition duration-300 cursor-pointer"
              >
                <X size={16} />
              </button>
              <div className="text-4xl mb-3">🏷️✨</div>
              <h3 className={`text-lg font-bold uppercase mb-2 ${isKawaii ? 'text-pink-500' : 'text-stone-900 font-serif'}`}>
                {isKawaii ? '🧁 Sweet Coupon Active!' : 'Archival Code Claimed'}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Input this voucher code during your checkout processing sequence to apply a 15% discount instantly.
              </p>
              <div className="p-3.5 bg-stone-100 text-stone-850 font-bold font-mono tracking-widest text-base uppercase rounded-xl border border-dashed border-stone-300 mb-5 relative select-all cursor-copy">
                SWEET15
                <span className="absolute -top-2.5 -right-2 bg-emerald-500 text-white rounded text-[8px] px-1.5 py-0.5 tracking-normal">
                  COPIED
                </span>
              </div>
              <button
                onClick={() => setShowPromoPopup(false)}
                className={`w-full py-3 rounded-full text-xs font-bold text-white transition cursor-pointer lowercase ${
                  isKawaii ? 'bg-pink-400 hover:bg-pink-500' : 'bg-stone-950 hover:bg-stone-900'
                }`}
              >
                close and explore capsule
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. LOOKBOOK CAMPAIGN CINEMATIC RUNWAY popup VIDEO LOOP */}
      <AnimatePresence>
        {campaignVideoActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-md p-4 sm:p-8">
            {/* outer click closes */}
            <div className="absolute inset-0" onClick={() => setCampaignVideoActive(false)} />
            
            <button
              onClick={() => setCampaignVideoActive(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-800 z-10 bg-black flex flex-col justify-between"
            >
              {/* Simulated high-fashion model campaign loop using sleek visual overlay placeholders with music cues */}
              <div className="absolute inset-0 z-0">
                <img
                  src={isKawaii 
                    ? "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200"
                    : "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200"
                  }
                  alt="Campaign Film"
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual screen filter loop scanner */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40 pointer-events-none" />
                <div className="absolute top-4 left-4 flex gap-2 items-center text-white text-[10px] uppercase font-bold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>SIMULATED RUNWAY LOOP FEED</span>
                </div>
              </div>

              {/* Bottom model caption detail inside lookbook player */}
              <div className="relative z-15 p-6 sm:p-10 text-white space-y-2 mt-auto">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-stone-400 block">
                  CAPSULE ARCHIVE CHRONICLES
                </span>
                <h3 className="font-serif text-lg sm:text-2xl uppercase tracking-wider font-bold">
                  {isKawaii ? "Sweet Elegance Draft Campaign" : "Metamorphosis Vol I: The Monolithic Drape"}
                </h3>
                <p className="text-xs text-stone-300 max-w-xl font-light leading-relaxed">
                  Captured during the Paris archival studio launch. Spotlighting double gabardine cotton structures and ultra-light layered pastel tulle, reflecting core form and sweet aesthetics in synthesis. Played with customized spatial synthesizer track loops.
                </p>
                <button
                  onClick={() => setCampaignVideoActive(false)}
                  className="mt-2 text-xs uppercase font-bold underline hover:text-rose-400 tracking-wider inline-block cursor-pointer"
                >
                  Terminate Cinematic Projection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
