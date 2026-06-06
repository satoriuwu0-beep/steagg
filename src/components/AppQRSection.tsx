import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Bell, Eye, Volume, Download, ArrowUpRight } from 'lucide-react';
import { BrandMode, BrandingSettings } from '../types';

interface AppQRSectionProps {
  currentMode: BrandMode;
  settings: BrandingSettings;
}

export default function AppQRSection({ currentMode, settings }: AppQRSectionProps) {
  const isKawaii = currentMode === 'STEAGG_KAWAII';

  return (
    <section className={`py-16 sm:py-24 border-t transition-all duration-500 overflow-hidden relative ${
      isKawaii
        ? 'bg-gradient-to-b from-rose-50/50 via-purple-50/50 to-rose-100/50 border-rose-100 font-kawaii text-rose-950'
        : 'bg-stone-900 border-stone-800 text-stone-100 font-sans'
    }`}>
      {/* Decorative blurred circles background for immersive luxury look */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <span className={`absolute w-72 h-72 rounded-full filter blur-[100px] opacity-20 -top-12 -left-12 ${
          isKawaii ? 'bg-pink-300' : 'bg-stone-500'
        }`} />
        <span className={`absolute w-72 h-72 rounded-full filter blur-[100px] opacity-20 -bottom-12 -right-12 ${
          isKawaii ? 'bg-violet-300' : 'bg-rose-500'
        }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: APP benefits narratives */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3  py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
              isKawaii 
                ? 'bg-pink-100 text-pink-600 border border-pink-200' 
                : 'bg-white/10 text-stone-300 border border-white/10'
            }`}>
              <Smartphone size={13} />
              <span>STEAGG COUTURE DIGITAL</span>
            </div>

            <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight uppercase leading-tight ${
              isKawaii ? 'font-kawaii text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500' : 'text-white'
            }`}>
              {settings.qrText}
            </h2>

            <p className={`text-xs sm:text-sm max-w-xl leading-relaxed font-light ${
              isKawaii ? 'text-purple-900/80 font-medium' : 'text-stone-400'
            }`}>
              {settings.qrSubtext}
            </p>

            {/* list benefits elements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 items-start">
                <span className={`p-2 rounded-xl ${isKawaii ? 'bg-pink-100 text-pink-600' : 'bg-stone-800 text-stone-200'}`}>
                  <Bell size={16} />
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase">Lanzamientos prioritarios</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-normal">
                    Reserva cápsulas exclusivas 15 minutos antes del lanzamiento global en la web.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className={`p-2 rounded-xl ${isKawaii ? 'bg-purple-100 text-purple-600' : 'bg-stone-800 text-stone-200'}`}>
                  <Eye size={16} />
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase">Espejo RA de armario</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-normal">
                    Proyecta al instante prendas en alta definición sobre la cámara de tu dispositivo.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className={`p-2 rounded-xl ${isKawaii ? 'bg-sky-100 text-sky-600' : 'bg-stone-800 text-stone-200'}`}>
                  <Volume size={16} />
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase">Audio sincronizado</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-normal">
                    Reproduce piezas de audio personalizadas para cada prenda de tu armario.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className={`p-2 rounded-xl ${isKawaii ? 'bg-rose-100 text-rose-600' : 'bg-stone-800 text-stone-200'}`}>
                  <Download size={16} />
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase">Propiedad digital</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-normal">
                    Obtén certificados digitales de autenticidad para tu archivo y el seguimiento de reventa.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Luxury QR mock box */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ y: -5 }}
              className={`p-6 sm:p-8 rounded-3xl border text-center relative max-w-xs w-full shadow-2xl ${
                isKawaii
                  ? 'bg-white border-rose-150 shadow-pink-100'
                  : 'bg-stone-950 border-stone-800 text-stone-100 shadow-stone-950'
              }`}
            >
              {/* Premium Vector SVG QR Mock */}
              <div className="bg-white p-4 rounded-2xl inline-block mb-4 border border-stone-200/50">
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 100 100"
                  className="mx-auto text-stone-900"
                  fill="currentColor"
                >
                  {/* Outer corner top-left finder */}
                  <rect x="0" y="0" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5" />
                  <rect x="5" y="5" width="15" height="15" />
                  <rect x="9" y="9" width="7" height="7" fill="white" />
                  <rect x="11" y="11" width="3" height="3" fill="currentColor" />

                  {/* Outer corner top-right finder */}
                  <rect x="75" y="0" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5" />
                  <rect x="80" y="5" width="15" height="15" />
                  <rect x="84" y="84" width="7" height="7" fill="white" />
                  <rect x="86" y="86" width="3" height="3" fill="currentColor" />

                  {/* Outer corner bottom-left finder */}
                  <rect x="0" y="75" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5" />
                  <rect x="5" y="80" width="15" height="15" />
                  <rect x="9" y="9" width="7" height="7" fill="white" />
                  <rect x="11" y="11" width="3" height="3" fill="currentColor" />

                  {/* Filler custom bits representing QR codes */}
                  <rect x="35" y="0" width="5" height="10" />
                  <rect x="45" y="5" width="10" height="5" />
                  <rect x="60" y="0" width="10" height="10" />
                  
                  <rect x="30" y="20" width="15" height="5" />
                  <rect x="35" y="30" width="5" height="15" />
                  <rect x="0" y="35" width="15" height="5" />
                  <rect x="15" y="45" width="10" height="5" />

                  <rect x="50" y="40" width="5" height="10" />
                  <rect x="65" y="30" width="5" height="15" />
                  <rect x="75" y="35" width="15" height="5" />
                  <rect x="85" y="45" width="10" height="5" />

                  <rect x="30" y="60" width="10" height="5" />
                  <rect x="45" y="55" width="15" height="10" />
                  <rect x="35" y="75" width="5" height="15" />
                  <rect x="0" y="60" width="15" height="5" />

                  <rect x="75" y="75" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5" />
                  <rect x="80" y="80" width="15" height="15" />

                  {/* Center Brand Badge Cover */}
                  <rect x="37" y="37" width="26" height="26" fill="white" rx="4" />
                  <rect x="42" y="42" width="16" height="16" fill="currentColor" rx="2" />
                  <text
                    x="50"
                    y="53.5"
                    fontSize="7"
                    fontFamily="serif"
                    fontWeight="bold"
                    fill="white"
                    textAnchor="middle"
                  >
                    SG
                  </text>
                </svg>
              </div>

              {/* QR instructions */}
              <h4 className={`text-xs font-bold uppercase ${isKawaii ? 'text-pink-600' : 'text-stone-300'}`}>
                CÓDIGO QR ESCANEABLE
              </h4>
              <p className="text-[10px] text-stone-400 mt-1 leading-normal">
                Apunta la cámara de tu dispositivo al código de arriba para acceder a la descarga al instante.
              </p>

              {/* download indicator links */}
              <div className="flex gap-2 items-center justify-center mt-5 pt-4 border-t border-white/10 text-[10px] text-stone-400 font-semibold uppercase">
                <span>iOS TestFlight</span>
                <span>•</span>
                <span>Android APK</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
