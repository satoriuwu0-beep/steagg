import React, { useState, useEffect } from 'react';
import { Lock, X, Eye, EyeOff } from 'lucide-react';

const ADMIN_PASSWORD = 'Steah123456';

interface AdminGateProps {
  onUnlock: () => void;
  onClose: () => void;
}

export default function AdminGate({ onUnlock, onClose }: AdminGateProps) {
  const [input, setInput] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setInput('');
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-stone-950/80 backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 relative transition-all ${shake ? 'animate-[shake_0.4s_ease]' : ''}`}
        style={shake ? { animation: 'shake 0.4s ease' } : {}}>

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 cursor-pointer">
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-stone-950 flex items-center justify-center mb-3 shadow-lg">
            <Lock size={24} className="text-white" />
          </div>
          <h2 className="text-lg font-bold uppercase tracking-widest text-stone-900">Owner Studio</h2>
          <p className="text-xs text-stone-400 mt-1 text-center">Área restringida. Solo personal autorizado.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Contraseña de acceso"
              autoFocus
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none pr-10 transition-all ${
                error
                  ? 'border-red-400 bg-red-50 text-red-700 placeholder-red-300'
                  : 'border-stone-200 focus:border-stone-900 bg-stone-50'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium text-center">
              Contraseña incorrecta. Intenta de nuevo.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-stone-950 hover:bg-stone-800 text-white font-bold text-sm rounded-xl uppercase tracking-widest transition-all cursor-pointer shadow-lg"
          >
            Ingresar al Studio
          </button>
        </form>

        <p className="text-[10px] text-stone-300 text-center mt-4">
          steahgg.com · Owner Creator Studio
        </p>
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
