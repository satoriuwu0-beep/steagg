import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, X, Plus, Edit2, Trash2, CheckCircle, RefreshCw, Layers, Layout, Image, Tag, Sparkles } from 'lucide-react';
import { Product, BrandingSettings, BrandMode } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onEditProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  branding: BrandingSettings;
  onUpdateBranding: (branding: BrandingSettings) => void;
  currentMode: BrandMode;
  onResetToDefaults: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  branding,
  onUpdateBranding,
  currentMode,
  onResetToDefaults,
  isOpen,
  onClose
}: AdminDashboardProps) {
  if (!isOpen) return null;

  const isKawaii = currentMode === 'STEAGG_KAWAII';
  const [activeTab, setActiveTab] = useState<'content' | 'products' | 'guidelines'>('content');

  // Form states for adding/editing products
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState(150);
  const [prodOrigPrice, setProdOrigPrice] = useState("");
  const [prodCategory, setProdCategory] = useState("Vestidos");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodBrandMode, setProdBrandMode] = useState<BrandMode>('STEAGG');
  const [prodSizes, setProdSizes] = useState("S,M,L");
  const [prodColors, setProdColors] = useState("#FAF9F6,#E7E5E4");
  const [prodFeatures, setProdFeatures] = useState("Mezcla de algodón orgánico, Corte minimalista");
  const [successMsg, setSuccessMsg] = useState("");

  // Branding states
  const [brandName, setBrandName] = useState(branding.brandName);
  const [luxurySlogan, setLuxurySlogan] = useState(branding.luxurySlogan);
  const [kawaiiSlogan, setKawaiiSlogan] = useState(branding.kawaiiSlogan);
  const [heroTitle, setHeroTitle] = useState(branding.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(branding.heroSubtitle);
  const [heroImage, setHeroImage] = useState(branding.heroImage);
  const [announcementText, setAnnouncementText] = useState(branding.announcementText);
  const [promotionBanner, setPromotionBanner] = useState(branding.promotionBanner);
  const [qrText, setQrText] = useState(branding.qrText);
  const [qrSubtext, setQrSubtext] = useState(branding.qrSubtext);

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBranding({
      brandName,
      luxurySlogan,
      kawaiiSlogan,
      heroTitle,
      heroSubtitle,
      heroImage,
      announcementText,
      promotionBanner,
      qrText,
      qrSubtext
    });
    triggerSuccess("¡Marca y contenidos guardados correctamente! ✨");
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodImage) return;

    const sizesArray = prodSizes.split(',').map(s => s.trim()).filter(Boolean);
    const colorsArray = prodColors.split(',').map(c => c.trim()).filter(Boolean);
    const featuresArray = prodFeatures.split(',').map(f => f.trim()).filter(Boolean);

    if (isEditingId) {
      // Edit mode
      const updated: Product = {
        id: isEditingId,
        name: prodName,
        price: Number(prodPrice),
        originalPrice: prodOrigPrice ? Number(prodOrigPrice) : undefined,
        description: prodDesc,
        category: prodCategory,
        image: prodImage,
        gallery: [prodImage],
        brandMode: prodBrandMode,
        rating: 4.8,
        reviews: [],
        features: featuresArray,
        sizes: sizesArray,
        colorHexes: colorsArray,
        isNew: true
      };
      onEditProduct(updated);
      setIsEditingId(null);
      triggerSuccess(`Producto actualizado correctamente: "${prodName}"`);
    } else {
      // Add mode
      const newProd: Product = {
        id: "p_" + Date.now(),
        name: prodName,
        price: Number(prodPrice),
        originalPrice: prodOrigPrice ? Number(prodOrigPrice) : undefined,
        description: prodDesc,
        category: prodCategory,
        image: prodImage,
        gallery: [prodImage],
        brandMode: prodBrandMode,
        rating: 5.0,
        reviews: [],
        features: featuresArray,
        sizes: sizesArray,
        colorHexes: colorsArray,
        isNew: true,
        isFeatured: true
      };
      onAddProduct(newProd);
      triggerSuccess(`Producto añadido correctamente: "${prodName}"`);
    }

    // Reset fields
    setProdName("");
    setProdPrice(150);
    setProdOrigPrice("");
    setProdDesc("");
    setProdImage("");
    setProdBrandMode(currentMode);
  };

  const handleStartEdit = (product: Product) => {
    setIsEditingId(product.id);
    setProdName(product.name);
    setProdPrice(product.price);
    setProdOrigPrice(product.originalPrice ? String(product.originalPrice) : "");
    setProdCategory(product.category);
    setProdDesc(product.description);
    setProdImage(product.image);
    setProdBrandMode(product.brandMode);
    setProdSizes(product.sizes.join(', '));
    setProdColors(product.colorHexes.join(', '));
    setProdFeatures(product.features.join(', '));
    setActiveTab('products');
  };

  const handleCancelEdit = () => {
    setIsEditingId(null);
    setProdName("");
    setProdPrice(150);
    setProdOrigPrice("");
    setProdDesc("");
    setProdImage("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/50 backdrop-blur-[2px]"
        />

        {/* Action Panel Sheet */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
          className="relative w-full max-w-2xl h-full shadow-2xl flex flex-col bg-stone-50 border-l border-stone-200 z-10"
        >
          {/* Header Block */}
          <div className="p-6 bg-stone-900 text-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sliders className="text-rose-400" size={22} />
              <div>
                <h2 className="font-serif text-lg font-semibold uppercase tracking-wider">Panel del Estudio</h2>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest">Controles creativos sin código</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Settings Tabs menu */}
          <div className="flex border-b border-stone-200 bg-stone-100">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === 'content'
                  ? 'border-stone-900 text-stone-900 bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-850'
              }`}
            >
              <Layout size={14} className="inline mr-2" />
              Banners y Contenido
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'border-stone-900 text-stone-900 bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-850'
              }`}
            >
              <Tag size={14} className="inline mr-2" />
              Gestor de Productos
            </button>
            <button
              onClick={() => setActiveTab('guidelines')}
              className={`flex-1 py-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === 'guidelines'
                  ? 'border-stone-900 text-stone-900 bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-850'
              }`}
            >
              <Layers size={14} className="inline mr-2" />
              Restablecer y Sistema
            </button>
          </div>

          {/* Success messages alerts */}
          {successMsg && (
            <div className="m-4 p-3 bg-emerald-550 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle size={15} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Main Scrollable form fields container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* TAB ONE: Banners & Layout Banners Editor */}
            {activeTab === 'content' && (
              <form onSubmit={handleSaveBranding} className="space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 pb-2 border-b">Datos de Marca</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Nombre de marca estándar</label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Mensaje de barra promocional</label>
                      <input
                        type="text"
                        value={promotionBanner}
                        onChange={(e) => setPromotionBanner(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Línea de anuncio superior</label>
                    <input
                      type="text"
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 pb-2 border-b">Hero Editorial</h3>
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Título del Hero</label>
                    <input
                      type="text"
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Subtítulo del Hero</label>
                    <textarea
                      rows={2}
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Eslogan de lujo STEAGG</label>
                      <input
                        type="text"
                        value={luxurySlogan}
                        onChange={(e) => setLuxurySlogan(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Eslogan Kawaii STE AGG</label>
                      <input
                        type="text"
                        value={kawaiiSlogan}
                        onChange={(e) => setKawaiiSlogan(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 pb-2 border-b">Bloque QR de la App</h3>
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Texto principal de la App</label>
                    <input
                      type="text"
                      value={qrText}
                      onChange={(e) => setQrText(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Descripción de beneficios de la App</label>
                    <textarea
                      rows={2}
                      value={qrSubtext}
                      onChange={(e) => setQrSubtext(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-950 text-white font-semibold text-xs rounded-xl shadow-lg transition-all cursor-pointer uppercase tracking-widest"
                >
                  Confirmar y aplicar cambios
                </button>
              </form>
            )}

            {/* TAB TWO: Catalog Addition / Editing manager */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                
                {/* Save/Add Form */}
                <form onSubmit={handleSaveProduct} className="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      {isEditingId ? `✏️ Editando producto #${isEditingId}` : '➕ Añadir nuevo producto'}
                    </h3>
                    {isEditingId && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="text-[10px] uppercase underline text-red-500 font-bold"
                      >
                        Cancelar edición
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Nombre del producto *</label>
                      <input
                        type="text"
                        required
                        placeholder="p. ej., Abrigo de Seda Drapeado"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Categoría</label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none bg-white"
                      >
                        <option value="Vestidos">Vestidos</option>
                        <option value="Abrigos">Abrigos</option>
                        <option value="Punto">Punto</option>
                        <option value="Faldas">Faldas</option>
                        <option value="Urbano">Urbano</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Precio ($ USD) *</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={prodPrice}
                        onChange={(e) => setProdPrice(Number(e.target.value))}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Precio original (PVP)</label>
                      <input
                        type="number"
                        placeholder="e.g. 190"
                        value={prodOrigPrice}
                        onChange={(e) => setProdOrigPrice(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Canal / Cápsula</label>
                      <select
                        value={prodBrandMode}
                        onChange={(e) => setProdBrandMode(e.target.value as BrandMode)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none bg-white font-semibold text-stone-800"
                      >
                        <option value="STEAGG">STEAGG (Editorial Moderno)</option>
                        <option value="STEAGG_KAWAII">STE AGG (Modo Kawaii)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">URL de la imagen *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={prodImage}
                      onChange={(e) => setProdImage(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Tallas (separadas por comas)</label>
                      <input
                        type="text"
                        value={prodSizes}
                        onChange={(e) => setProdSizes(e.target.value)}
                        placeholder="S, M, L, XL"
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Colores (hex separados por comas)</label>
                      <input
                        type="text"
                        value={prodColors}
                        onChange={(e) => setProdColors(e.target.value)}
                        placeholder="#fbcfe8, #e0f2fe"
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Características / Detalles del tejido</label>
                    <input
                      type="text"
                      value={prodFeatures}
                      onChange={(e) => setProdFeatures(e.target.value)}
                      placeholder="Lana orgánica, Puños asimétricos, Encaje festoneado"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Descripción del catálogo</label>
                    <textarea
                      rows={2}
                      placeholder="Describe el tejido, la caída y las medidas..."
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-stone-900 hover:bg-stone-950 text-white font-semibold text-xs rounded-xl shadow transition-all cursor-pointer uppercase tracking-widest"
                  >
                    {isEditingId ? 'Aplicar cambios ✏️' : 'Añadir al catálogo 📥'}
                  </button>
                </form>

                {/* List layout of Registered Products */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Catálogo actual ({products.length} productos)</h3>
                  
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {products.map(p => (
                      <div key={p.id} className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-xl justify-between shadow-sm">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img src={p.image} alt="" className="w-10 h-12 rounded object-cover" referrerPolicy="no-referrer" />
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold truncate text-stone-800">{p.name}</h4>
                            <div className="flex gap-2 text-[10px] text-stone-405 font-mono">
                              <span className="font-semibold text-stone-600">${p.price} USD</span>
                              <span>•</span>
                              <span className={`px-1.5 py-0.2 rounded font-bold ${
                                p.brandMode === 'STEAGG_KAWAII' ? 'bg-rose-100 text-rose-700' : 'bg-stone-200 text-stone-800'
                              }`}>
                                {p.brandMode === 'STEAGG_KAWAII' ? 'KAWAII' : 'EDITORIAL'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                            title="Editar este producto"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                            title="Eliminar producto"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB THREE: Reset System Specs & Guidelines configs */}
            {activeTab === 'guidelines' && (
              <div className="space-y-4">
                <div className="p-4 bg-white border rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500">Precaución / Restablecer de fábrica</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    Si tus productos de prueba, títulos personalizados, comentarios o categorías se desordenan, puedes restaurar todos los datos a la configuración predeterminada de los diseñadores al instante:
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm("¿Restaurar la configuración de fábrica y eliminar todos los productos añadidos? Esta acción no se puede deshacer.")) {
                        onResetToDefaults();
                        triggerSuccess("¡Variables personalizadas borradas y modelos originales reinicializados! 🧁");
                      }
                    }}
                    className="w-full py-3.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl transition-all cursor-pointer border border-red-200 flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={14} className="animate-spin" />
                    <span>RESTAURAR MODELOS PREDETERMINADOS</span>
                  </button>
                </div>

                <div className="p-4 bg-white border border-stone-200 rounded-2xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">Paradigma de estilo visual</h3>
                  <div className="space-y-2 text-[11px] text-stone-500 leading-normal">
                    <p>✨ <strong>Modo Editorial (STEAGG):</strong> Tipografía Outfit Sans con titulares en serif Playfair. Perfecto para prendas estructuradas en tonos piedra, carbón y tiza.</p>
                    <p>🦄 <strong>Modo Kawaii (STE AGG):</strong> Tipografía Fredoka tipo burbuja con capas en rosa pastel, lila y azul bebé. Lazos artesanales e insignias con estrellas.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Fixed overlay footer */}
          <div className="p-6 bg-stone-100 border-t border-stone-200 text-center">
            <span className="text-[10px] text-stone-400 font-mono tracking-wider">
Panel de administración STEAGG • Sincronización local activada
            </span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
