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
  const [prodCategory, setProdCategory] = useState("Dresses");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodBrandMode, setProdBrandMode] = useState<BrandMode>('STEAGG');
  const [prodSizes, setProdSizes] = useState("S,M,L");
  const [prodColors, setProdColors] = useState("#FAF9F6,#E7E5E4");
  const [prodFeatures, setProdFeatures] = useState("Organic cotton blend, Minimalist cut");
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
    triggerSuccess("Branding & Content blocks saved successfully! ✨");
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
      triggerSuccess(`Successfully updated product: "${prodName}"`);
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
      triggerSuccess(`Successfully added product: "${prodName}"`);
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
                <h2 className="font-serif text-lg font-semibold uppercase tracking-wider">Store Studio Dashboard</h2>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest">No-Code Creative Controls</span>
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
              Banners & Content
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
              Product Manager
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
              Reset & System
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
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 pb-2 border-b">Brand Essentials</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Standard Brand Name</label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Promo bar message</label>
                      <input
                        type="text"
                        value={promotionBanner}
                        onChange={(e) => setPromotionBanner(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Top Announcement Line</label>
                    <input
                      type="text"
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 pb-2 border-b">Editorial Lobby Hero</h3>
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Hero Title Heading</label>
                    <input
                      type="text"
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">STEAGG Luxury Slogan</label>
                      <input
                        type="text"
                        value={luxurySlogan}
                        onChange={(e) => setLuxurySlogan(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">STE AGG Kawaii Slogan</label>
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
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 pb-2 border-b">Bottom App QR Banner Block</h3>
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">App CTA Main Text</label>
                    <input
                      type="text"
                      value={qrText}
                      onChange={(e) => setQrText(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">App Benefits Description</label>
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
                  Confirm and Apply Studio Blocks
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
                      {isEditingId ? `✏️ Editing Catalog Line #${isEditingId}` : '➕ Add New Archival Pattern'}
                    </h3>
                    {isEditingId && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="text-[10px] uppercase underline text-red-500 font-bold"
                      >
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Product Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Silk Draped Overcoat"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Category Category</label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none bg-white"
                      >
                        <option value="Dresses">Dresses</option>
                        <option value="Outerwear">Outerwear</option>
                        <option value="Knitwear">Knitwear</option>
                        <option value="Bottoms">Bottoms</option>
                        <option value="Streetwear">Streetwear</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Pricing ($ USD) *</label>
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
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Original Price (MSRP)</label>
                      <input
                        type="number"
                        placeholder="e.g. 190"
                        value={prodOrigPrice}
                        onChange={(e) => setProdOrigPrice(e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Capsule Channel</label>
                      <select
                        value={prodBrandMode}
                        onChange={(e) => setProdBrandMode(e.target.value as BrandMode)}
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none bg-white font-semibold text-stone-800"
                      >
                        <option value="STEAGG">STEAGG (Modern Editorial)</option>
                        <option value="STEAGG_KAWAII">STE AGG (Cute Kawaii Mode)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Photo Image URL *</label>
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
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Sizes (comma-separated)</label>
                      <input
                        type="text"
                        value={prodSizes}
                        onChange={(e) => setProdSizes(e.target.value)}
                        placeholder="S, M, L, XL"
                        className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Colors (hex comma slit)</label>
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
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Fabric specifications / Highlights</label>
                    <input
                      type="text"
                      value={prodFeatures}
                      onChange={(e) => setProdFeatures(e.target.value)}
                      placeholder="Organic wool, Asymmetric cuffs, Scallop lace trims"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Catalog Description</label>
                    <textarea
                      rows={2}
                      placeholder="Enter fabric narrative and draping measurements..."
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-stone-900 hover:bg-stone-950 text-white font-semibold text-xs rounded-xl shadow transition-all cursor-pointer uppercase tracking-widest"
                  >
                    {isEditingId ? 'Apply Pattern Alterations ✏️' : 'Assemble Pattern into Registry 📥'}
                  </button>
                </form>

                {/* List layout of Registered Products */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Current Apparel Database ({products.length} registered patterns)</h3>
                  
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
                            title="Edit this apparel"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                            title="Delete patterns"
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
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500">Cautionary / Factory Reset</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    If your mock patterns, custom titles, comments, or category alignments become confused, you can restore all structural data metrics to the designers' default settings instantly:
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm("Restore factory layouts and remove all added custom items? This cannot be undone.")) {
                        onResetToDefaults();
                        triggerSuccess("Successfully wiped custom variables and re-initialized pristine models! 🧁");
                      }
                    }}
                    className="w-full py-3.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl transition-all cursor-pointer border border-red-200 flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={14} className="animate-spin" />
                    <span>RESTORE RE-INITIALIZED STOCK MODELS</span>
                  </button>
                </div>

                <div className="p-4 bg-white border border-stone-200 rounded-2xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">Visual Styling Paradigm</h3>
                  <div className="space-y-2 text-[11px] text-stone-500 leading-normal">
                    <p>✨ <strong>Editorial Mode (STEAGG):</strong> Bound with an Outfit Sans font and Playfair serif heading. Perfect for stone, coal, and chalk structured robes.</p>
                    <p>🦄 <strong>Kawaii Mode (STE AGG):</strong> Styled around a Fredoka bubble font with pastel pink, lilac dust, and baby blue layers. Handcrafted ribbons and star hardware badges.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Fixed overlay footer */}
          <div className="p-6 bg-stone-100 border-t border-stone-200 text-center">
            <span className="text-[10px] text-stone-400 font-mono tracking-wider">
              STEAGG Studio Admin suite • Local Storage Sync Enabled
            </span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
