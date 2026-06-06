import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User2, Mail, Lock, Sparkles, CheckCircle, Package, User, MapPin } from 'lucide-react';
import { BrandMode } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: BrandMode;
  user: { name: string; email: string; address?: string; phone?: string } | null;
  onLogin: (name: string, email: string) => void;
  onLogout: () => void;
  onUpdateAddress: (address: string, phone: string) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  currentMode,
  user,
  onLogin,
  onLogout,
  onUpdateAddress
}: AuthModalProps) {
  if (!isOpen) return null;

  const isKawaii = currentMode === 'STEAGG_KAWAII';
  const [isRegister, setIsRegister] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [phoneInput, setPhoneInput] = useState(user?.phone || "");
  const [addressInput, setAddressInput] = useState(user?.address || "");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (!nameInput || !emailInput) return;
      onLogin(nameInput, emailInput);
      setSuccessMsg("¡Cuenta creada correctamente! Bienvenida 🧁");
    } else {
      const fallbackName = emailInput.split('@')[0] || "Visitante";
      onLogin(fallbackName, emailInput || "guest@steagg.com");
      setSuccessMsg("¡Sesión iniciada! Bienvenida de nuevo 🖤");
    }

    setTimeout(() => {
      setSuccessMsg("");
      onClose();
    }, 2000);
  };

  const handleSaveProfileDetails = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAddress(addressInput, phoneInput);
    setSuccessMsg("¡Preferencias de tu perfil guardadas correctamente! ✨");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        {/* Form panel container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl bg-white z-10 transition-colors duration-500 ${
            isKawaii ? 'font-kawaii text-rose-950 font-medium' : 'font-sans text-stone-850'
          }`}
        >
          {/* Close trigger */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Toast inside auth */}
          {successMsg && (
            <div className={`p-3 rounded-lg border text-xs font-semibold flex items-center gap-2 mb-4 ${
              isKawaii ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              <CheckCircle size={14} className={isKawaii ? 'text-pink-500' : 'text-emerald-600'} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Mode 1: Logged In Customer Profile */}
          {user ? (
            <div className="space-y-6">
              <div className="text-center">
                <span className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-xl font-bold mb-3 ${
                  isKawaii ? 'bg-gradient-to-r from-pink-300 to-purple-300 text-white' : 'bg-stone-900 text-stone-100'
                }`}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <h3 className="text-lg font-bold uppercase">{user.name}</h3>
                <p className="text-xs text-stone-400 mt-0.5">{user.email}</p>
              </div>

              {/* Editable Delivery Settings */}
              <form onSubmit={handleSaveProfileDetails} className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-1">Datos de envío</h4>

                <div>
                  <label className="block text-[10px] text-stone-405 font-bold uppercase mb-1">Número de contacto</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2023"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-405 font-bold uppercase mb-1">Dirección de envío</label>
                  <textarea
                    rows={2}
                    placeholder="Calle, piso, código postal, país"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:border-stone-900 outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className={`flex-1 py-2.5 text-xs font-semibold rounded-lg text-white pointer-events-auto cursor-pointer transition-colors ${
                      isKawaii ? 'bg-purple-400 hover:bg-purple-500' : 'bg-stone-900 hover:bg-stone-950'
                    }`}
                  >
                    Guardar preferencias
                  </button>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="px-4 py-2.5 text-xs text-red-650 text-red-500 border border-red-200 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    Salir
                  </button>
                </div>
              </form>

              {/* Mock Order tracking record */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl">
                <h4 className="text-xs font-bold uppercase text-stone-500 mb-3 flex items-center gap-1.5">
                  <Package size={14} />
                  <span>Seguimiento de pedidos</span>
                </h4>
                <div className="space-y-2 text-[11px] leading-relaxed text-stone-500">
                  <div className="flex justify-between border-b pb-1 border-stone-240/10">
                    <span className="font-semibold text-stone-700">Pedido #S-20931</span>
                    <span className="px-2 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">EN TRÁNSITO</span>
                  </div>
                  <p className="font-light">Llegada estimada: 15 de junio de 2026 mediante mensajería premium asegurada.</p>
                </div>
              </div>
            </div>
          ) : (
            // Mode 2: Guest Authentication Form
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <span className="text-2xl">{isKawaii ? '🍨' : '✦'}</span>
                <h3 className={`text-xl font-bold uppercase mt-2 ${isKawaii ? 'text-pink-500 font-extrabold' : 'text-stone-900 font-serif'}`}>
                  {isRegister ? 'Crea tu cuenta' : 'Accede a tu cuenta'}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {isRegister ? 'Regístrate para desbloquear ventajas premium.' : 'Inicia sesión para recuperar tu bolsa y tus datos.'}
                </p>
              </div>

              {isRegister && (
                <div>
                  <label className="block text-[10px] text-stone-405 font-bold uppercase mb-1">Tu nombre</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-450 text-stone-400" size={14} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amélie V."
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 border rounded-lg focus:border-stone-900 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] text-stone-420 font-bold uppercase mb-1">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 border rounded-lg focus:border-stone-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-stone-420 font-bold uppercase mb-1">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 border rounded-lg focus:border-stone-900 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 text-xs font-bold text-white rounded-xl shadow-lg transition-all cursor-pointer uppercase tracking-wider ${
                  isKawaii
                    ? 'bg-gradient-to-r from-pink-400 to-purple-405 bg-gradient-to-r from-pink-400 to-purple-400'
                    : 'bg-stone-950 hover:bg-stone-900 tracking-widest'
                }`}
              >
                {isRegister ? 'Completar registro 🍰' : 'Iniciar sesión 🖤'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs text-stone-450 text-stone-500 hover:text-stone-900 underline"
                >
                  {isRegister ? '¿Ya tienes cuenta? Inicia sesión aquí.' : 'Crear una cuenta nueva.'}
                </button>
              </div>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
