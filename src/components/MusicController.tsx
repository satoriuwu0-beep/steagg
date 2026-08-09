import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, Disc } from 'lucide-react';
import { BrandMode } from '../types';

interface MusicControllerProps {
  currentMode: BrandMode;
}

// Generador de música ambiente usando Web Audio API (sin URLs externas, sin problemas de CORS)
function createAmbientPlayer(audioCtx: AudioContext) {
  let nodes: AudioNode[] = [];
  let gainNode: GainNode | null = null;

  const notes = {
    bolero:   [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88], // C mayor - bolero suave
    kawaii:   [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77], // C mayor agudo - dulce
    romantic: [220.00, 246.94, 261.63, 293.66, 329.63, 369.99, 392.00], // A menor - romántico
  };

  const playMelody = (scale: number[], volume: number) => {
    stop();
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.connect(audioCtx.destination);

    // Bajo continuo (pad)
    const padOsc = audioCtx.createOscillator();
    const padGain = audioCtx.createGain();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(scale[0] / 2, audioCtx.currentTime);
    padGain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    padOsc.connect(padGain);
    padGain.connect(gainNode);
    padOsc.start();
    nodes.push(padOsc, padGain);

    // Melodía arpegiada suave
    let noteIdx = 0;
    const playNote = () => {
      const osc = audioCtx.createOscillator();
      const env = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(scale[noteIdx % scale.length], audioCtx.currentTime);
      env.gain.setValueAtTime(0, audioCtx.currentTime);
      env.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.1);
      env.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.9);
      osc.connect(env);
      env.connect(gainNode!);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 1.0);
      nodes.push(osc, env);
      noteIdx++;
    };

    const intervalId = setInterval(playNote, 800);
    (gainNode as any)._intervalId = intervalId;
    nodes.push(gainNode);
    return intervalId;
  };

  const stop = () => {
    if (gainNode && (gainNode as any)._intervalId) {
      clearInterval((gainNode as any)._intervalId);
    }
    nodes.forEach(n => { try { (n as OscillatorNode).stop?.(); n.disconnect(); } catch (_) {} });
    nodes = [];
    gainNode = null;
  };

  return { playMelody, stop, notes };
}

const TRACKS = [
  { title: "Bolero Suave",     genre: "Bolero · Ambiente",  emoji: "🎷", scale: 'bolero'   as const },
  { title: "Romántico",        genre: "Suave · Melódico",   emoji: "🌹", scale: 'romantic' as const },
  { title: "Dulce Kawaii",     genre: "Kawaii · Tranquilo", emoji: "🧁", scale: 'kawaii'   as const },
  { title: "Noche Editorial",  genre: "Piano · Nostálgico", emoji: "🎹", scale: 'bolero'   as const },
];

export default function MusicController({ currentMode }: MusicControllerProps) {
  const isKawaii = currentMode === 'STEAGG_KAWAII';
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [floatingNotes, setFloatingNotes] = useState<{ id: number; left: number }[]>([]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const playerRef = useRef<ReturnType<typeof createAmbientPlayer> | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const currentTrack = TRACKS[trackIndex];

  // Init AudioContext al primer click (política del navegador)
  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
      playerRef.current = createAmbientPlayer(audioCtxRef.current);
    }
    return audioCtxRef.current;
  };

  const startMusic = () => {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const notes = {
      bolero:   [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88],
      kawaii:   [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77],
      romantic: [220.00, 246.94, 261.63, 293.66, 329.63, 369.99, 392.00],
    };
    playerRef.current?.playMelody(notes[currentTrack.scale], isMuted ? 0 : volume);
  };

  const stopMusic = () => {
    playerRef.current?.stop();
  };

  useEffect(() => {
    if (isPlaying) { startMusic(); } else { stopMusic(); }
  }, [isPlaying, trackIndex]);

  useEffect(() => {
    if (isPlaying) { stopMusic(); startMusic(); }
  }, [trackIndex]);

  // Control de volumen / mute
  useEffect(() => {
    if (!audioCtxRef.current) return;
    // reinicar con nuevo volumen
    if (isPlaying) { stopMusic(); startMusic(); }
  }, [volume, isMuted]);

  // Cleanup
  useEffect(() => () => stopMusic(), []);

  // Notas flotantes
  useEffect(() => {
    if (!isPlaying) { setFloatingNotes([]); return; }
    const id = setInterval(() => {
      setFloatingNotes(p => [...p.slice(-8), { id: Date.now(), left: Math.random() * 80 + 10 }]);
    }, 1400);
    return () => clearInterval(id);
  }, [isPlaying]);

  const handlePlayPause = () => {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    setIsPlaying(v => !v);
  };

  const handleSkip = () => {
    setTrackIndex(p => (p + 1) % TRACKS.length);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-mono">
      {/* Notas flotantes */}
      <div className="absolute bottom-16 left-2 pointer-events-none w-16 h-32 overflow-visible">
        <AnimatePresence>
          {isPlaying && floatingNotes.map(note => (
            <motion.span key={note.id}
              initial={{ y: 20, opacity: 0, scale: 0.6 }}
              animate={{ y: -80, opacity: [0, 0.9, 0], scale: [0.6, 1.2, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: 'easeOut' }}
              className="absolute text-sm"
              style={{ left: `${note.left}%` }}
            >
              {isKawaii ? ['🧁','🍡','🎀','🎵','🎶'][note.id % 5] : ['🖤','🎷','🎹','🎵','🌹'][note.id % 5]}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        {/* Botón principal */}
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(v => !v)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 cursor-pointer relative ${
            isKawaii
              ? 'bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 text-white border-white shadow-rose-200'
              : 'bg-stone-900 border-stone-800 text-stone-100 shadow-stone-950'
          }`}>
          {isPlaying
            ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }} className="flex items-center justify-center"><Disc size={20}/></motion.div>
            : <Music size={18}/>}
          {isPlaying && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-ping"/>}
        </motion.button>

        {/* Panel del reproductor */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ opacity: 0, scale: 0.9, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9, x: -20 }}
              className={`p-4 rounded-2xl w-64 shadow-2xl border flex flex-col gap-3 backdrop-blur-md ${
                isKawaii ? 'bg-rose-50/95 border-rose-100 text-rose-950' : 'bg-stone-950 border-stone-800 text-stone-50'
              }`}>

              {/* Info de pista */}
              <div className="flex items-start justify-between border-b pb-2 border-white/10">
                <div>
                  <span className={`text-[9px] uppercase font-bold block tracking-widest ${isKawaii ? 'text-purple-500' : 'text-stone-400'}`}>{currentTrack.genre}</span>
                  <span className={`text-xs font-bold ${isKawaii ? 'text-rose-500' : 'text-white'}`}>{currentTrack.title}</span>
                  <span className="text-[10px] text-stone-400 block">STEAGG Sounds</span>
                </div>
                <span className="text-xl">{currentTrack.emoji}</span>
              </div>

              {/* Barras de frecuencia */}
              {isPlaying && (
                <div className="flex gap-1 items-end h-5 justify-center">
                  {[...Array(12)].map((_, i) => (
                    <motion.span key={i}
                      animate={{ height: [4, Math.random() * 18 + 4, 4] }}
                      transition={{ repeat: Infinity, duration: 0.7 + i * 0.1, ease: 'easeInOut' }}
                      className={`w-1 rounded-sm ${isKawaii ? 'bg-pink-400' : 'bg-emerald-400'}`}
                    />
                  ))}
                </div>
              )}

              {/* Volumen */}
              <div className="flex items-center gap-2">
                <Volume2 size={12} className="text-stone-400 shrink-0"/>
                <input type="range" min="0" max="1" step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={e => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                  className="w-full h-1 accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Controles */}
              <div className="flex items-center justify-between">
                <button onClick={() => setIsMuted(v => !v)} className="p-1 text-stone-400 hover:text-stone-200 cursor-pointer transition-colors">
                  {isMuted ? <VolumeX size={14}/> : <Volume2 size={14}/>}
                </button>
                <div className="flex items-center gap-2">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    onClick={handlePlayPause}
                    className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-md ${
                      isKawaii ? 'bg-pink-400 text-white' : 'bg-white text-stone-950'
                    }`}>
                    {isPlaying ? <Pause size={14} fill="currentColor"/> : <Play size={14} fill="currentColor" className="ml-0.5"/>}
                  </motion.button>
                  <button onClick={handleSkip} className="p-1 text-stone-400 hover:text-stone-200 cursor-pointer transition-colors">
                    <SkipForward size={14}/>
                  </button>
                </div>
                <span className="text-[9px] text-stone-500 font-bold">{trackIndex + 1}/{TRACKS.length}</span>
              </div>

              <p className="text-[9px] text-stone-500 text-center">🎵 Música generada · STEAGG Audio</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
