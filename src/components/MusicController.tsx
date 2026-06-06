import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, Disc } from 'lucide-react';
import { BrandMode } from '../types';

interface MusicControllerProps {
  currentMode: BrandMode;
}

interface Track {
  title: string;
  artist: string;
  genre: string;
  emoji: string;
}

const PLAYLIST: Track[] = [
  { title: "AVANT-GARDE COUTURE SYNTH", artist: "STEAGG SOUNDS", genre: "Industrial Minimal", emoji: "🛰️" },
  { title: "PASTEL MARSHMALLOW FLIGHT", artist: "SWEET APPAREL INC", genre: "Kawaii Lofi", emoji: "🧁" },
  { title: "SHIBUYA STREETLIGHTS WALK", artist: "STE AGG CO.", genre: "Future Bass Beats", emoji: "🍬" }
];

export default function MusicController({ currentMode }: MusicControllerProps) {
  const isKawaii = currentMode === 'STEAGG_KAWAII';
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [floatingNotes, setFloatingNotes] = useState<{ id: number; left: number; delay: number }[]>([]);

  const currentTrack = PLAYLIST[trackIndex];

  // Auto-emit floating emoji notes when playing
  useEffect(() => {
    if (!isPlaying) {
      setFloatingNotes([]);
      return;
    }

    const interval = setInterval(() => {
      setFloatingNotes(prev => [
        ...prev.slice(-8), // cap at max 8 notes to prevent memory leaks
        {
          id: Date.now(),
          left: Math.random() * 80 + 10,
          delay: Math.random() * 0.5
        }
      ]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 left-6 z-40 font-mono">
      {/* Visual floating note anchors */}
      <div className="absolute bottom-16 left-2 pointer-events-none w-16 h-32 overflow-visible">
        <AnimatePresence>
          {isPlaying && floatingNotes.map(note => (
            <motion.span
              key={note.id}
              initial={{ y: 20, opacity: 0, scale: 0.6 }}
              animate={{ y: -80, opacity: [0, 0.9, 0], scale: [0.6, 1.2, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: 'easeOut', delay: note.delay }}
              className="absolute text-sm"
              style={{ left: `${note.left}%` }}
            >
              {isKawaii ? ['🧁', '🍡', '🎀', '🎵', '🎶'][note.id % 5] : ['🖤', '🎼', '🎹', '🎵', '⚡'][note.id % 5]}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        {/* Constant Floating Circle Music Trigger */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all border-2 cursor-pointer pb-0.5 relative ${
            isKawaii
              ? 'bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 text-white border-white shadow-rose-200'
              : 'bg-stone-900 border-stone-800 text-stone-100 shadow-stone-950'
          }`}
          title="Toggle Ambient Audio Deck"
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-full h-full flex items-center justify-center"
            >
              <Disc size={20} className="animate-spin duration-[10000ms]" />
            </motion.div>
          ) : (
            <Music size={18} />
          )}

          {/* Micro pulsing active badge */}
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-450 bg-emerald-400 rounded-full border-2 border-white animate-ping" />
          )}
        </motion.button>

        {/* Floating Mini Player Deck */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              className={`p-4 rounded-2xl w-64 shadow-2xl border flex flex-col gap-3 transition-colors duration-500 backdrop-blur-md ${
                isKawaii
                  ? 'bg-rose-50/90 border-rose-150 text-rose-950 font-kawaii font-medium shadow-rose-100'
                  : 'bg-stone-950 border-stone-800 text-stone-50'
              }`}
            >
              {/* Header Info */}
              <div className="flex items-start justify-between border-b pb-2 border-white/10">
                <div className="overflow-hidden">
                  <span className={`text-[9px] uppercase font-bold text-stone-400 block tracking-widest ${isKawaii && 'text-purple-600'}`}>
                    {currentTrack.genre}
                  </span>
                  <span className={`text-xs font-bold leading-none line-clamp-1 truncate ${isKawaii ? 'text-rose-500 text-sm font-kawaii font-bold' : ''}`}>
                    {currentTrack.title}
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-1">
                    {currentTrack.artist}
                  </span>
                </div>
                <span className="text-sm shrink-0">{currentTrack.emoji}</span>
              </div>

              {/* simulated frequencies bars */}
              {isPlaying && (
                <div className="flex gap-1 items-end h-5 justify-center py-0.5">
                  {[...Array(12)].map((_, idx) => (
                    <motion.span
                      key={idx}
                      animate={{ height: [4, Math.random() * 18 + 4, 4] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.7 + idx * 0.1,
                        ease: "easeInOut"
                      }}
                      className={`w-1 rounded-sm ${isKawaii ? 'bg-pink-400' : 'bg-rose-400'}`}
                    />
                  ))}
                </div>
              )}

              {/* Controls audio */}
              <div className="flex items-center justify-between mt-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 hover:text-stone-300 transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                      isKawaii ? 'bg-pink-400 text-white' : 'bg-stone-100 text-stone-950'
                    }`}
                  >
                    {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                  </button>

                  <button
                    onClick={() => setTrackIndex((prev) => (prev + 1) % PLAYLIST.length)}
                    className="p-1 hover:text-stone-300 transition-colors cursor-pointer"
                    title="Skip Track"
                  >
                    <SkipForward size={14} />
                  </button>
                </div>

                <span className="text-[9px] text-stone-400 font-bold">1:04 / 3:20</span>
              </div>

              {isMuted && (
                <span className="text-[9px] text-red-400 text-center block font-bold uppercase tracking-wide">
                  audio outputs muted
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
