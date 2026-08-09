import React, { useState, useEffect, useRef } from 'react';
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
  url: string;
}

const PLAYLIST: Track[] = [
  {
    title: "SLOW MOTION",
    artist: "Bensound",
    genre: "Bolero · Ambient",
    emoji: "🎷",
    url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3"
  },
  {
    title: "ROMANTIC",
    artist: "Bensound",
    genre: "Suave · Melódico",
    emoji: "🌹",
    url: "https://www.bensound.com/bensound-music/bensound-romantic.mp3"
  },
  {
    title: "SWEET",
    artist: "Bensound",
    genre: "Kawaii · Tranquilo",
    emoji: "🧁",
    url: "https://www.bensound.com/bensound-music/bensound-sweet.mp3"
  },
  {
    title: "MEMORIES",
    artist: "Bensound",
    genre: "Piano · Nostálgico",
    emoji: "🎹",
    url: "https://www.bensound.com/bensound-music/bensound-memories.mp3"
  }
];

export default function MusicController({ currentMode }: MusicControllerProps) {
  const isKawaii = currentMode === 'STEAGG_KAWAII';
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [floatingNotes, setFloatingNotes] = useState<{ id: number; left: number; delay: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[trackIndex];

  // Init / swap audio element when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = currentTrack.url;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.loop = true;
      if (isPlaying) audioRef.current.play().catch(() => {});
    } else {
      const audio = new Audio(currentTrack.url);
      audio.volume = isMuted ? 0 : volume;
      audio.loop = true;
      audioRef.current = audio;
    }
  }, [trackIndex]);

  // Play / pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Mute / volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [isMuted, volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  // Floating music notes animation
  useEffect(() => {
    if (!isPlaying) { setFloatingNotes([]); return; }
    const interval = setInterval(() => {
      setFloatingNotes(prev => [
        ...prev.slice(-8),
        { id: Date.now(), left: Math.random() * 80 + 10, delay: Math.random() * 0.5 }
      ]);
    }, 1500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSkip = () => {
    setTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-mono">
      {/* Floating notes */}
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
              {isKawaii
                ? ['🧁', '🍡', '🎀', '🎵', '🎶'][note.id % 5]
                : ['🖤', '🎷', '🎹', '🎵', '🌹'][note.id % 5]}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        {/* Main music button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all border-2 cursor-pointer relative ${
            isKawaii
              ? 'bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 text-white border-white shadow-rose-200'
              : 'bg-stone-900 border-stone-800 text-stone-100 shadow-stone-950'
          }`}
        >
          {isPlaying ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="w-full h-full flex items-center justify-center">
              <Disc size={20} />
            </motion.div>
          ) : (
            <Music size={18} />
          )}
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-ping" />
          )}
        </motion.button>

        {/* Player panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              className={`p-4 rounded-2xl w-64 shadow-2xl border flex flex-col gap-3 backdrop-blur-md ${
                isKawaii
                  ? 'bg-rose-50/90 border-rose-100 text-rose-950 font-kawaii'
                  : 'bg-stone-950 border-stone-800 text-stone-50'
              }`}
            >
              {/* Track info */}
              <div className="flex items-start justify-between border-b pb-2 border-white/10">
                <div className="overflow-hidden">
                  <span className={`text-[9px] uppercase font-bold block tracking-widest ${isKawaii ? 'text-purple-500' : 'text-stone-400'}`}>
                    {currentTrack.genre}
                  </span>
                  <span className={`text-xs font-bold leading-snug ${isKawaii ? 'text-rose-500' : 'text-white'}`}>
                    {currentTrack.title}
                  </span>
                  <span className="text-[10px] text-stone-400 block">{currentTrack.artist}</span>
                </div>
                <span className="text-xl shrink-0">{currentTrack.emoji}</span>
              </div>

              {/* Frequency bars */}
              {isPlaying && (
                <div className="flex gap-1 items-end h-5 justify-center">
                  {[...Array(12)].map((_, idx) => (
                    <motion.span
                      key={idx}
                      animate={{ height: [4, Math.random() * 18 + 4, 4] }}
                      transition={{ repeat: Infinity, duration: 0.7 + idx * 0.1, ease: 'easeInOut' }}
                      className={`w-1 rounded-sm ${isKawaii ? 'bg-pink-400' : 'bg-emerald-400'}`}
                    />
                  ))}
                </div>
              )}

              {/* Volume slider */}
              <div className="flex items-center gap-2">
                <Volume2 size={12} className="text-stone-400 shrink-0" />
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                  className="w-full h-1 accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button onClick={() => setIsMuted(!isMuted)}
                  className="p-1 hover:text-stone-300 transition-colors cursor-pointer text-stone-400">
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-md ${
                      isKawaii ? 'bg-pink-400 text-white' : 'bg-white text-stone-950'
                    }`}
                  >
                    {isPlaying
                      ? <Pause size={14} fill="currentColor" />
                      : <Play size={14} fill="currentColor" className="ml-0.5" />}
                  </button>
                  <button onClick={handleSkip}
                    className="p-1 hover:text-stone-300 transition-colors cursor-pointer text-stone-400">
                    <SkipForward size={14} />
                  </button>
                </div>

                <span className="text-[9px] text-stone-500 font-bold">
                  {trackIndex + 1}/{PLAYLIST.length}
                </span>
              </div>

              <p className="text-[9px] text-stone-500 text-center">
                🎵 Música libre de regalías · Bensound
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
