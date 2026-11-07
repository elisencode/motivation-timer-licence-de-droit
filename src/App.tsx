/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Coffee, 
  BookOpen, 
  Scale, 
  Plus, 
  FastForward, 
  Award,
  Sparkles,
  Moon,
  Sun,
  Image as ImageIcon,
  Bell,
  BellRing,
  Maximize,
  Minimize,
  ShieldCheck
} from 'lucide-react';
import { LAW_QUOTES, LawQuote, LAW_RANKS } from './data/lawQuotes';
import { playGavelSound, playChimeSound, playSoftClick, playNotreDameBell } from './utils/audio';
import { 
  isNotificationSupported, 
  getNotificationPermission, 
  requestNotificationPermission, 
  sendSessionNotification 
} from './utils/notifications';
import { LawQuoteCard } from './components/LawQuoteCard';
import { CompletionModal } from './components/CompletionModal';
import { SubjectSelector } from './components/SubjectSelector';
import { SurvivalGuideModal } from './components/SurvivalGuideModal';
import { SecurityLegalModal } from './components/SecurityLegalModal';

type TimerMode = 'revision' | 'pause';
export type SoundTheme = 'notredame' | 'gavel' | 'chime';

const REVISION_TIME = 25 * 60; // 25 min in seconds
const PAUSE_TIME = 5 * 60;     // 5 min in seconds

export default function App() {
  const [mode, setMode] = useState<TimerMode>('revision');
  const [timeLeft, setTimeLeft] = useState<number>(REVISION_TIME);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [soundTheme, setSoundTheme] = useState<SoundTheme>(() => {
    try {
      const saved = localStorage.getItem('law_sound_theme');
      if (saved === 'notredame' || saved === 'gavel' || saved === 'chime') {
        return saved as SoundTheme;
      }
      return 'notredame'; // Notre-Dame Cathedral bell is default
    } catch {
      return 'notredame';
    }
  });
  const [showSoundMenu, setShowSoundMenu] = useState<boolean>(false);
  const soundMenuRef = useRef<HTMLDivElement>(null);

  const selectSoundTheme = (newTheme: SoundTheme) => {
    setSoundTheme(newTheme);
    try {
      localStorage.setItem('law_sound_theme', newTheme);
    } catch {}
    if (!soundEnabled) {
      setSoundEnabled(true);
    }
    // Preview selected sound
    if (newTheme === 'notredame') {
      playNotreDameBell(0.85);
    } else if (newTheme === 'gavel') {
      playGavelSound(0.7);
    } else {
      playChimeSound(0.6);
    }
  };

  // Close sound dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (soundMenuRef.current && !soundMenuRef.current.contains(event.target as Node)) {
        setShowSoundMenu(false);
      }
    }
    if (showSoundMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSoundMenu]);

  // Fullscreen mode state & handlers
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (soundRef.current) playSoftClick(0.12);
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as unknown as { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen) {
          await (document.documentElement as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as unknown as { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen) {
          await (document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
        }
      }
    } catch {
      // Gracefully handle iframe / security restrictions
    }
  };

  const [selectedSubject, setSelectedSubject] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('law_selected_subject');
      if (saved === 'licence' || saved === 'master' || saved === 'doctorat') {
        return saved;
      }
      return 'licence';
    } catch {
      return 'licence';
    }
  });

  const handleSelectSubject = (id: string) => {
    setSelectedSubject(id);
    try {
      localStorage.setItem('law_selected_subject', id);
    } catch {}
    if (soundRef.current) playSoftClick(0.1);
  };

  // Mode Nuit exclusif et permanent
  const darkMode = true;

  // Helper for resolving asset paths with Vite base path (ensures GitHub Pages compatibility)
  const getAssetUrl = (path: string): string => {
    const base = import.meta.env.BASE_URL || './';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    return `${cleanBase}${path.replace(/^\//, '')}`;
  };

  type BgTheme = 'faculte' | 'noel' | 'onsen' | 'selenite' | 'legaltech' | 'one_day' | 'none';
  type BgIntensity = 'balanced' | 'vibrant' | 'subtle';

  interface BackgroundOption {
    id: BgTheme;
    title: string;
    subtitle: string;
    tag: string;
    imageSrc?: string;
  }

  const BACKGROUND_OPTIONS: BackgroundOption[] = [
    {
      id: 'faculte',
      title: 'Faculté de Droit',
      subtitle: 'Vue historique de la faculté & de la cathédrale au crépuscule',
      tag: 'Classique 🏛️',
      imageSrc: getAssetUrl('assets/aistudio/facdroit_a098dbcf.jpg')
    },
    {
      id: 'noel',
      title: 'Soir de Noël & Cheminée',
      subtitle: 'Révision du 25 déc. (Code civil, GAJA), chat sphynx au coin du feu & traîneau de Noël',
      tag: 'Noël & Sphynx 🎄🐱',
      imageSrc: getAssetUrl('assets/noel_droit_cheminee.jpg')
    },
    {
      id: 'onsen',
      title: 'Onsen & Sakura au Japon',
      subtitle: 'Bain thermal avec les singes des neiges sous les cerisiers en fleurs & révisions zen',
      tag: 'Onsen & Sakura 🌸🐒',
      imageSrc: getAssetUrl('assets/japon_onsen_sakura.jpg')
    },
    {
      id: 'selenite',
      title: 'Cœur de Sélénite',
      subtitle: 'Cristal rayonnant, bougie & sérénité d\'étude apaisante',
      tag: 'Zen & Cristal 🤍',
      imageSrc: getAssetUrl('assets/coeur_selenite_zen.jpg')
    },
    {
      id: 'legaltech',
      title: 'LegalTech & Zen Code',
      subtitle: 'Thémis dorée, code émeraude & bibliothèque nocturne',
      tag: 'Droit & Code ⚖️💻',
      imageSrc: getAssetUrl('assets/legaltech_zen_code.jpg')
    },
    {
      id: 'one_day',
      title: 'Un jour à la fois',
      subtitle: 'Amphithéâtre de Droit au matin · Aller s\'asseoir sur sa chaise en amphi',
      tag: 'Amphi & Présence ☀️',
      imageSrc: getAssetUrl('assets/amphi_un_jour_a_la_fois.jpg')
    },
    {
      id: 'none',
      title: 'Minimaliste',
      subtitle: 'Palette pastel douce et épurée sans illustration',
      tag: 'Épuré 🍃'
    }
  ];

  const [bgTheme, setBgTheme] = useState<BgTheme>(() => {
    try {
      const saved = localStorage.getItem('law_bg_theme');
      if (saved === 'faculte' || saved === 'noel' || saved === 'onsen' || saved === 'legaltech' || saved === 'one_day' || saved === 'selenite' || saved === 'none') {
        return saved as BgTheme;
      }
      return 'faculte'; // Default to Faculté de Droit
    } catch {
      return 'faculte';
    }
  });

  const [bgIntensity, setBgIntensity] = useState<BgIntensity>(() => {
    try {
      const saved = localStorage.getItem('law_bg_intensity');
      if (saved === 'balanced' || saved === 'vibrant' || saved === 'subtle') {
        return saved as BgIntensity;
      }
      return 'balanced';
    } catch {
      return 'balanced';
    }
  });

  // Cycle directly to the next background wallpaper
  const cycleNextBackground = () => {
    const ids: BgTheme[] = ['faculte', 'noel', 'onsen', 'selenite', 'legaltech', 'one_day', 'none'];
    const currentIndex = ids.indexOf(bgTheme);
    const nextTheme = ids[(currentIndex + 1) % ids.length];
    setBgTheme(nextTheme);
    try {
      localStorage.setItem('law_bg_theme', nextTheme);
    } catch {}
    if (soundRef.current) playSoftClick(0.12);
  };

  const [showBgMenu, setShowBgMenu] = useState<boolean>(false);
  const bgMenuRef = useRef<HTMLDivElement>(null);

  // Close background dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bgMenuRef.current && !bgMenuRef.current.contains(event.target as Node)) {
        setShowBgMenu(false);
      }
    }
    if (showBgMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBgMenu]);

  const [completedSessions, setCompletedSessions] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('law_completed_sessions');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [totalStudyMinutes, setTotalStudyMinutes] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('law_total_study_minutes');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  // Current display quote
  const [currentQuote, setCurrentQuote] = useState<LawQuote>(() => {
    const revisionQuotes = LAW_QUOTES.filter(q => q.category === 'revision');
    return revisionQuotes[Math.floor(Math.random() * revisionQuotes.length)];
  });

  // Modal states
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [lastCompletedMode, setLastCompletedMode] = useState<TimerMode>('revision');
  const [completionQuote, setCompletionQuote] = useState<LawQuote>(currentQuote);
  const [showSurvivalGuide, setShowSurvivalGuide] = useState<boolean>(false);
  const [survivalGuideTab, setSurvivalGuideTab] = useState<'infographie' | 'regles'>('infographie');
  const [showSecurityModal, setShowSecurityModal] = useState<boolean>(false);
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>(() => getNotificationPermission());

  const toggleNotificationPermission = async () => {
    if (soundRef.current) playSoftClick(0.12);
    if (notifPermission === 'granted') {
      sendSessionNotification(mode, 'Notifications actives ! Le minuteur vous alertera à la fin de chaque cycle, même si l\'onglet est en arrière-plan.');
      return;
    }
    const res = await requestNotificationPermission();
    setNotifPermission(res);
    if (res === 'granted') {
      sendSessionNotification(mode, 'Notifications activées ! Vous serez alerté dès la fin du cycle.');
    }
  };

  // Audio ref for volume
  const soundRef = useRef(soundEnabled);
  soundRef.current = soundEnabled;

  // Total duration of current mode
  const totalDuration = mode === 'revision' ? REVISION_TIME : PAUSE_TIME;
  const progressRatio = (totalDuration - timeLeft) / totalDuration;

  // Permanently enforce dark mode (Mode Nuit exclusif)
  useEffect(() => {
    try {
      localStorage.setItem('law_dark_mode', 'true');
    } catch {}

    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  }, []);

  // Helper to pick random quote for category
  const getRandomQuote = useCallback((targetCategory: 'revision' | 'pause') => {
    const pool = LAW_QUOTES.filter(q => q.category === targetCategory);
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  // Switch mode directly
  const switchMode = (newMode: TimerMode, autoStart = false) => {
    if (soundRef.current) playSoftClick(0.12);
    setMode(newMode);
    const duration = newMode === 'revision' ? REVISION_TIME : PAUSE_TIME;
    setTimeLeft(duration);
    setIsRunning(autoStart);
    setCurrentQuote(getRandomQuote(newMode));
  };

  // Toggle timer
  const toggleTimer = () => {
    if (soundRef.current) playSoftClick(0.15);
    setIsRunning(prev => !prev);
  };

  // Reset timer
  const resetTimer = () => {
    if (soundRef.current) playSoftClick(0.12);
    setIsRunning(false);
    setTimeLeft(mode === 'revision' ? REVISION_TIME : PAUSE_TIME);
  };

  // Add 1 minute
  const addMinute = () => {
    if (soundRef.current) playSoftClick(0.1);
    setTimeLeft(prev => prev + 60);
  };

  // Skip cycle (complete immediately for testing or fast-forward)
  const skipCycle = () => {
    handleCycleComplete();
  };

  // Cycle completion logic
  const handleCycleComplete = useCallback(() => {
    setIsRunning(false);
    setLastCompletedMode(mode);

    // Audio cue: Bourdon de Notre-Dame de Paris par défaut, ou marteau/chime
    if (soundRef.current) {
      if (soundTheme === 'notredame') {
        playNotreDameBell(0.85);
      } else if (soundTheme === 'gavel') {
        playGavelSound(0.7);
      } else {
        playChimeSound(0.6);
      }
    }

    // Pick encouraging quote for this cycle
    const endQuote = getRandomQuote(mode);
    setCompletionQuote(endQuote);
    setShowCompletionModal(true);

    // Alerter via les notifications du navigateur (Web Notifications API) même si réduit ou en arrière-plan
    sendSessionNotification(mode, endQuote?.quote);

    // If it was a revision session, increment stats
    if (mode === 'revision') {
      setCompletedSessions(prev => {
        const next = prev + 1;
        try {
          localStorage.setItem('law_completed_sessions', String(next));
        } catch {}
        return next;
      });
      setTotalStudyMinutes(prev => {
        const next = prev + 25;
        try {
          localStorage.setItem('law_total_study_minutes', String(next));
        } catch {}
        return next;
      });
    }

    // Reset timer to beginning of current mode
    setTimeLeft(mode === 'revision' ? REVISION_TIME : PAUSE_TIME);
  }, [mode, getRandomQuote, soundTheme]);

  // Main countdown interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval as NodeJS.Timeout);
            handleCycleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, handleCycleComplete]);

  // Sync browser title with countdown
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const modeLabel = mode === 'revision' ? 'Révision' : 'Pause';
    document.title = `(${timeFormatted}) ${modeLabel} · Motivation Timer Droit`;
  }, [timeLeft, mode]);

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Current rank
  const currentRank = [...LAW_RANKS].reverse().find(r => completedSessions >= r.threshold) || LAW_RANKS[0];

  // Colors based on mode & final 60s pulse
  const isRevision = mode === 'revision';
  const circleRadius = 145;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference * (1 - progressRatio);
  
  // Animation de pulsation subtile lors des 60 dernières secondes
  const isLastMinute = isRunning && timeLeft <= 60 && timeLeft > 0;

  const activeStrokeColor = isLastMinute
    ? '#FB7185' // Lueur rose corail délicate pour le sprint final
    : isRevision 
      ? (darkMode ? '#78CFA7' : '#74A790') 
      : (darkMode ? '#F29E8B' : '#E5917D');

  return (
    <div className="min-h-screen relative flex flex-col text-slate-800 dark:text-slate-100 selection:bg-[#E8D5C4] dark:selection:bg-slate-700 overflow-x-hidden">
      
      {/* Base background color */}
      <div className="fixed inset-0 -z-10 bg-[#FAF8F5] dark:bg-[#0F141C] transition-colors duration-300" />

      {/* Background Wallpaper Canvas - Unified full-bleed format across all wallpapers */}
      {bgTheme !== 'none' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <img
            key={bgTheme}
            src={
              bgTheme === 'faculte'
                ? getAssetUrl('assets/aistudio/facdroit_a098dbcf.jpg')
                : bgTheme === 'noel'
                  ? getAssetUrl('assets/noel_droit_cheminee.jpg')
                  : bgTheme === 'onsen'
                    ? getAssetUrl('assets/japon_onsen_sakura.jpg')
                    : bgTheme === 'selenite'
                      ? getAssetUrl('assets/coeur_selenite_zen.jpg')
                      : bgTheme === 'legaltech'
                        ? getAssetUrl('assets/legaltech_zen_code.jpg')
                        : getAssetUrl('assets/amphi_un_jour_a_la_fois.jpg')
            }
            alt="Arrière-plan Motivation Droit"
            className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
              bgIntensity === 'vibrant'
                ? 'opacity-95 scale-100'
                : bgIntensity === 'balanced'
                  ? 'opacity-75 scale-100'
                  : 'opacity-40 scale-100'
            }`}
          />

          {/* =====================================================================
              ADAPTED BESPOKE ANIMATIONS FOR EVERY WALLPAPER THEME
              ===================================================================== */}
          
          {/* 1. FACULTÉ DE DROIT : Résonance acoustique de la cathédrale & étoiles du crépuscule */}
          {bgTheme === 'faculte' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
              {/* Concentric acoustic cathedral bell waves rippling from the Gothic spire */}
              <div className="absolute top-[26%] right-[22%] w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/40 animate-cathedral-ring-1" />
              <div className="absolute top-[26%] right-[22%] w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/30 animate-cathedral-ring-2" />
              <div className="absolute top-[26%] right-[22%] w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/40 blur-md animate-pulse" />

              {/* Twilight starlight twinkling in the dusk sky */}
              <div className="absolute top-[12%] left-[35%] w-1.5 h-1.5 rounded-full bg-amber-100 animate-twilight-star" />
              <div className="absolute top-[18%] left-[55%] w-2 h-2 rounded-full bg-yellow-100 animate-twilight-star" style={{ animationDelay: '1.4s' }} />
              <div className="absolute top-[8%] right-[32%] w-1.5 h-1.5 rounded-full bg-amber-200 animate-twilight-star" style={{ animationDelay: '2.2s' }} />
              <div className="absolute top-[22%] left-[18%] w-1 h-1 rounded-full bg-white/90 animate-twilight-star" style={{ animationDelay: '0.7s' }} />

              {/* Warm lamppost glows on the historical cobblestone plaza */}
              <div className="absolute bottom-[28%] left-[24%] w-44 h-44 rounded-full bg-amber-500/20 blur-2xl animate-candle-glow" />
              <div className="absolute bottom-[32%] right-[35%] w-40 h-40 rounded-full bg-orange-400/15 blur-2xl animate-candle-glow" style={{ animationDelay: '2s' }} />
            </div>
          )}

          {/* 2. SOIR DE NOËL : Cheminée crépitante, guirlandes, flocons & vapeur de chocolat */}
          {bgTheme === 'noel' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
              {/* Hearth fireplace warm flame crackle & glow */}
              <div className="absolute bottom-[28%] left-[34%] w-[420px] h-[340px] -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-600/35 via-amber-500/25 to-transparent blur-3xl animate-fireplace-glow" />
              <div className="absolute bottom-[34%] left-[34%] w-48 h-32 -translate-x-1/2 rounded-full bg-yellow-400/30 blur-xl animate-candle-glow" />

              {/* Gentle snowfall drifting outside the frosty window panes */}
              <div className="absolute top-[14%] right-[24%] w-1.5 h-1.5 rounded-full bg-white/80 animate-snow-1" />
              <div className="absolute top-[22%] right-[18%] w-2 h-2 rounded-full bg-white/90 animate-snow-2" />
              <div className="absolute top-[10%] right-[12%] w-1 h-1 rounded-full bg-sky-100/80 animate-snow-3" />
              <div className="absolute top-[28%] right-[28%] w-1.5 h-1.5 rounded-full bg-white/75 animate-snow-1" style={{ animationDelay: '2.5s' }} />
              <div className="absolute top-[35%] right-[15%] w-2 h-2 rounded-full bg-white/85 animate-snow-2" style={{ animationDelay: '4s' }} />

              {/* Christmas tree fairy lights twinkle */}
              <div className="absolute top-[32%] left-[12%] w-2 h-2 rounded-full bg-rose-400 text-rose-300 animate-xmas-light-1" />
              <div className="absolute top-[42%] left-[16%] w-2.5 h-2.5 rounded-full bg-amber-300 text-amber-200 animate-xmas-light-2" />
              <div className="absolute top-[52%] left-[9%] w-2 h-2 rounded-full bg-emerald-400 text-emerald-300 animate-xmas-light-3" />
              <div className="absolute top-[26%] left-[14%] w-2 h-2 rounded-full bg-blue-300 text-blue-200 animate-xmas-light-1" style={{ animationDelay: '1.2s' }} />
              <div className="absolute top-[48%] left-[20%] w-2 h-2 rounded-full bg-pink-300 text-pink-200 animate-xmas-light-2" style={{ animationDelay: '0.8s' }} />

              {/* Warm desk lamp & steaming hot chocolate glow */}
              <div className="absolute bottom-[38%] right-[32%] w-56 h-56 rounded-full bg-amber-400/25 blur-2xl animate-candle-glow" />
              <div className="absolute bottom-[44%] right-[44%] w-16 h-24 rounded-full bg-amber-100/15 blur-lg animate-coffee-steam" />
            </div>
          )}

          {/* 3. ONSEN & SAKURA : Vapeur thermale, pétales de cerisier en dérive & lanternes */}
          {bgTheme === 'onsen' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
              {/* Soft rising thermal steam mist over the warm waters */}
              <div className="absolute inset-x-0 bottom-6 h-80 bg-gradient-to-t from-white/20 via-pink-100/10 to-transparent blur-2xl animate-onsen-steam" />
              <div className="absolute bottom-24 left-1/4 w-[420px] h-52 bg-white/15 blur-3xl animate-onsen-steam" style={{ animationDelay: '3.2s' }} />
              
              {/* Gentle warm lantern glows */}
              <div className="absolute bottom-[28%] left-[8%] w-48 h-48 rounded-full bg-amber-400/25 blur-2xl animate-candle-glow" />
              <div className="absolute bottom-[36%] right-[8%] w-48 h-48 rounded-full bg-amber-400/25 blur-2xl animate-candle-glow" style={{ animationDelay: '2.2s' }} />

              {/* Floating, gently swaying pink sakura blossom petals */}
              <div className="absolute top-[8%] left-[22%] text-pink-300/85 animate-sakura-1">
                <svg className="w-4 h-4 fill-pink-300/85 transform rotate-12 drop-shadow-xs" viewBox="0 0 24 24"><path d="M12 2C8.5 2 6 5.5 6 9c0 4.5 6 13 6 13s6-8.5 6-13c0-3.5-2.5-7-6-7z"/></svg>
              </div>
              <div className="absolute top-[14%] right-[26%] text-rose-200/85 animate-sakura-2">
                <svg className="w-3.5 h-3.5 fill-rose-200/85 transform rotate-45 drop-shadow-xs" viewBox="0 0 24 24"><path d="M12 2C8.5 2 6 5.5 6 9c0 4.5 6 13 6 13s6-8.5 6-13c0-3.5-2.5-7-6-7z"/></svg>
              </div>
              <div className="absolute top-[20%] left-[42%] text-pink-200/75 animate-sakura-3">
                <svg className="w-4.5 h-4.5 fill-pink-200/75 transform -rotate-15 drop-shadow-xs" viewBox="0 0 24 24"><path d="M12 2C8.5 2 6 5.5 6 9c0 4.5 6 13 6 13s6-8.5 6-13c0-3.5-2.5-7-6-7z"/></svg>
              </div>
              <div className="absolute top-[6%] right-[14%] text-rose-300/75 animate-sakura-4">
                <svg className="w-3 h-3 fill-rose-300/75 transform rotate-30 drop-shadow-xs" viewBox="0 0 24 24"><path d="M12 2C8.5 2 6 5.5 6 9c0 4.5 6 13 6 13s6-8.5 6-13c0-3.5-2.5-7-6-7z"/></svg>
              </div>
              <div className="absolute top-[32%] right-[38%] text-pink-200/65 animate-sakura-2" style={{ animationDelay: '2.1s' }}>
                <svg className="w-3.5 h-3.5 fill-pink-200/65 transform rotate-60 drop-shadow-xs" viewBox="0 0 24 24"><path d="M12 2C8.5 2 6 5.5 6 9c0 4.5 6 13 6 13s6-8.5 6-13c0-3.5-2.5-7-6-7z"/></svg>
              </div>
            </div>
          )}

          {/* 4. CŒUR DE SÉLÉNITE : Aura respirante cyan-blanche & étincelles prismatiques */}
          {bgTheme === 'selenite' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
              {/* Pure opalescent cyan-white crystal heart core pulse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-cyan-400/20 via-sky-200/15 to-transparent blur-3xl animate-selenite-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/20 blur-xl animate-selenite-pulse" style={{ animationDelay: '1.5s' }} />

              {/* Crystalline prism light gleams & diamond glints */}
              <div className="absolute top-[42%] left-[44%] w-3 h-3 text-cyan-200 animate-prism-gleam-1">
                <svg className="w-full h-full fill-white drop-shadow-md" viewBox="0 0 24 24"><path d="M12 0l3.09 8.26L24 12l-8.91 3.74L12 24l-3.09-8.26L0 12l8.91-3.74z"/></svg>
              </div>
              <div className="absolute top-[52%] right-[42%] w-3.5 h-3.5 text-sky-100 animate-prism-gleam-2">
                <svg className="w-full h-full fill-white drop-shadow-md" viewBox="0 0 24 24"><path d="M12 0l3.09 8.26L24 12l-8.91 3.74L12 24l-3.09-8.26L0 12l8.91-3.74z"/></svg>
              </div>
              <div className="absolute top-[36%] right-[48%] w-2 h-2 text-white animate-prism-gleam-1" style={{ animationDelay: '2.2s' }}>
                <svg className="w-full h-full fill-white" viewBox="0 0 24 24"><path d="M12 0l3.09 8.26L24 12l-8.91 3.74L12 24l-3.09-8.26L0 12l8.91-3.74z"/></svg>
              </div>

              {/* Sacred candle warm golden flame glow beside the crystal */}
              <div className="absolute bottom-[30%] left-[28%] w-48 h-48 rounded-full bg-amber-400/25 blur-2xl animate-candle-glow" />
            </div>
          )}

          {/* 5. LEGALTECH & ZEN CODE : Code émeraude montant, balances de Thémis & lueur phosphorique */}
          {bgTheme === 'legaltech' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
              {/* Glowing emerald screen phosphor pulse */}
              <div className="absolute top-[38%] right-[28%] w-[420px] h-[320px] rounded-full bg-emerald-500/18 blur-3xl animate-screen-glow" />

              {/* Themis golden balance scale gleam */}
              <div className="absolute top-[32%] left-[28%] w-[280px] h-[280px] rounded-full bg-amber-400/22 blur-2xl animate-themis-gleam" />
              <div className="absolute top-[28%] left-[30%] w-3 h-3 text-amber-200 animate-prism-gleam-1">
                <svg className="w-full h-full fill-amber-300 drop-shadow-md" viewBox="0 0 24 24"><path d="M12 0l3.09 8.26L24 12l-8.91 3.74L12 24l-3.09-8.26L0 12l8.91-3.74z"/></svg>
              </div>

              {/* Ascending emerald matrix/code particles */}
              <div className="absolute bottom-[35%] right-[32%] font-mono text-[11px] font-bold text-emerald-400/80 animate-cyber-float-1">
                &lt;jurisprudence/&gt;
              </div>
              <div className="absolute bottom-[42%] right-[22%] font-mono text-[10px] font-bold text-emerald-300/70 animate-cyber-float-2">
                01100010
              </div>
              <div className="absolute bottom-[28%] right-[38%] font-mono text-[11px] font-bold text-teal-300/70 animate-cyber-float-3">
                art.1103.val()
              </div>
              <div className="absolute bottom-[48%] right-[27%] font-mono text-[10px] font-bold text-emerald-400/60 animate-cyber-float-1" style={{ animationDelay: '3s' }}>
                syllogisme.ok
              </div>
            </div>
          )}

          {/* 6. UN JOUR À LA FOIS : Rayon de soleil matinal, vapeur de café & poussières dorées */}
          {bgTheme === 'one_day' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
              {/* Morning dawn sunbeam streaming through amphitheater windows */}
              <div className="absolute top-0 right-[20%] w-96 h-full bg-gradient-to-b from-yellow-300/20 via-amber-200/10 to-transparent blur-3xl animate-sunbeam" />
              
              {/* Golden morning dust motes floating in the sunbeam */}
              <div className="absolute top-[35%] right-[25%] w-2 h-2 rounded-full bg-yellow-200/70 blur-[0.5px] animate-dust-1" />
              <div className="absolute top-[48%] right-[30%] w-1.5 h-1.5 rounded-full bg-amber-100/80 blur-[0.5px] animate-dust-2" />
              <div className="absolute top-[28%] right-[35%] w-2.5 h-2.5 rounded-full bg-yellow-200/60 blur-[1px] animate-dust-3" />
              <div className="absolute top-[58%] right-[22%] w-1.5 h-1.5 rounded-full bg-amber-200/70 blur-[0.5px] animate-dust-1" style={{ animationDelay: '3.5s' }} />

              {/* Morning coffee steam rising gently on the desk */}
              <div className="absolute bottom-[34%] left-[36%] w-12 h-20 rounded-full bg-amber-100/20 blur-md animate-coffee-steam" />
              <div className="absolute bottom-[30%] left-[34%] w-32 h-32 rounded-full bg-amber-500/15 blur-xl animate-candle-glow" />
            </div>
          )}

          {/* Protective Scrim Overlay tailored for optimal contrast and beauty */}
          <div 
            className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
              bgIntensity === 'vibrant' 
                ? 'bg-[#0B0F17]/25' 
                : bgIntensity === 'balanced' 
                  ? 'bg-[#0B0F17]/50' 
                  : 'bg-[#0B0F17]/75'
            }`}
          />

          {/* Harmonizing atmospheric pastel tint according to active mode */}
          <div 
            className={`absolute inset-0 mix-blend-soft-light transition-opacity duration-700 pointer-events-none ${
              isRevision
                ? 'opacity-35 bg-gradient-to-b from-[#163829]/50 via-transparent to-[#0B0F17]/60'
                : 'opacity-35 bg-gradient-to-b from-[#452219]/50 via-transparent to-[#0B0F17]/60'
            }`}
          />
        </div>
      )}

      {/* 7. MINIMALISTE : Respiration d'aurore pastel harmonique */}
      {bgTheme === 'none' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl animate-aurora-breath" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-rose-500/10 blur-3xl animate-aurora-breath" style={{ animationDelay: '3.5s' }} />
        </div>
      )}

      {/* Subtle pastel ambient background glow tuned to photo's twilight hues */}
      <div 
        className={`fixed -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-35 dark:opacity-20 pointer-events-none z-0 transition-colors duration-700 ${
          isRevision ? 'bg-[#D2EAE0] dark:bg-[#163829]' : 'bg-[#F9DED4] dark:bg-[#452219]'
        }`} 
      />
      <div 
        className={`fixed top-1/2 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30 dark:opacity-20 pointer-events-none z-0 transition-colors duration-700 ${
          isRevision ? 'bg-[#EBD2DE] dark:bg-[#341F39]' : 'bg-[#FDEED9] dark:bg-[#3D2C1A]'
        }`} 
      />

      {/* Top Bar Contract: 3 zones (Brand wordmark - links/badges - primary action) */}
      <header className="w-full max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-6 border-b border-black/[0.05] dark:border-white/[0.08] relative z-50 transition-colors backdrop-blur-xs">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-800 text-amber-100 flex items-center justify-center shadow-xs">
            <Scale className="w-4 h-4 text-amber-200" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 font-serif-law">
              Motivation Timer
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Licence de Droit
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation / Info trigger */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <button
            onClick={() => {
              setSurvivalGuideTab('regles');
              setShowSurvivalGuide(true);
            }}
            className="px-3 py-1.5 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0 cursor-pointer"
            title="Consulter vos grades, rangs et les 5 commandements de survie"
          >
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Grade : {currentRank.badge}</span>
          </button>
          <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">·</span>
          <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0">
            {completedSessions} plaidoirie{completedSessions > 1 ? 's' : ''} validée{completedSessions > 1 ? 's' : ''}
          </span>
        </div>

        {/* Zone 3: Primary Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Background Selector Group */}
          <div className="relative z-50 flex items-center shrink-0" ref={bgMenuRef}>
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl shadow-xs overflow-hidden">
              {/* Primary Button: Click cycles directly to the next background! */}
              <button
                onClick={cycleNextBackground}
                className="px-3 py-2 text-xs font-semibold text-rose-300 hover:text-rose-200 hover:bg-slate-800/80 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                title="Cliquer pour changer de fond d'écran (ou flèche pour ouvrir la galerie)"
                aria-label="Fond d'écran suivant"
              >
                <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">
                  {bgTheme === 'faculte'
                    ? 'Faculté 🏛️'
                    : bgTheme === 'noel'
                      ? 'Soir de Noël 🎄🐱'
                      : bgTheme === 'onsen'
                        ? 'Onsen Sakura 🌸🐒'
                        : bgTheme === 'selenite'
                          ? 'Sélénite 🤍'
                          : bgTheme === 'legaltech'
                            ? 'LegalTech ⚖️💻'
                            : bgTheme === 'one_day'
                              ? '1 jour à la fois ☀️'
                              : 'Épuré 🍃'}
                </span>
                <span className="sm:hidden">Fond</span>
              </button>

              {/* Gallery Trigger: Opens the visual choices & intensity selector */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBgMenu(prev => !prev);
                  if (soundRef.current) playSoftClick(0.12);
                }}
                className={`px-2 py-2 text-xs border-l border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer ${
                  showBgMenu ? 'bg-slate-800 text-rose-300' : 'text-slate-400'
                }`}
                title="Ouvrir la galerie des fonds et régler l'intensité"
                aria-label="Galerie des fonds d'écran"
              >
                <span className="text-[10px] block font-mono">
                  {showBgMenu ? '▲' : '▼'}
                </span>
              </button>
            </div>

            {/* Background Dropdown Popover */}
            {showBgMenu && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-full mt-2 w-80 sm:w-[500px] max-w-[calc(100vw-2rem)] bg-slate-900/98 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl border border-slate-700/80 z-50 text-slate-100 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Choix du fond d'écran
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-rose-400 font-medium">
                      Mode Nuit · 7 ambiances
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowBgMenu(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors text-xs cursor-pointer"
                      title="Fermer"
                      aria-label="Fermer la galerie"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* 5 Background Choices in responsive grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3 max-h-[50vh] overflow-y-auto pr-1">
                  {BACKGROUND_OPTIONS.map((opt) => {
                    const isSelected = bgTheme === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBgTheme(opt.id);
                          try {
                            localStorage.setItem('law_bg_theme', opt.id);
                          } catch {}
                          if (soundRef.current) playSoftClick(0.12);
                        }}
                        className={`p-2 rounded-xl border text-left transition-all flex flex-col gap-1.5 relative overflow-hidden group cursor-pointer ${
                          isSelected
                            ? 'border-rose-400 ring-2 ring-rose-400/30 bg-rose-950/30 shadow-xs'
                            : 'border-slate-800 hover:border-slate-700 bg-slate-800/40'
                        }`}
                      >
                        {/* Thumbnail image or placeholder */}
                        <div className="w-full h-20 rounded-lg overflow-hidden bg-slate-800 relative">
                          {opt.imageSrc ? (
                            <img
                              src={opt.imageSrc}
                              alt={opt.title}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-950/60 to-rose-950/60 text-slate-400 text-xs font-medium">
                              Zen pastel
                            </div>
                          )}
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[11px] font-bold shadow-xs">
                              ✓
                            </div>
                          )}
                          <span className="absolute bottom-1 left-1 text-[9px] font-semibold px-1.5 py-0.5 rounded bg-black/75 text-white backdrop-blur-xs">
                            {opt.tag}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-100 truncate">
                            {opt.title}
                          </p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">
                            {opt.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Intensity selector with immediate visual contrast - strictly on top and clickable */}
                {bgTheme !== 'none' && (
                  <div className="mt-4 pt-3.5 border-t border-slate-800 relative z-20">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-400" />
                        <span>Intensité & Présence du fond :</span>
                      </span>
                      <span className="text-[11px] text-rose-300 font-bold bg-rose-950/50 px-2 py-0.5 rounded-lg border border-rose-800/40">
                        {bgIntensity === 'vibrant' ? '95% (Immersive)' : bgIntensity === 'balanced' ? '75% (Équilibrée)' : '40% (Discrète)'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 p-1 bg-slate-800/90 rounded-xl border border-slate-700/60">
                      {(['subtle', 'balanced', 'vibrant'] as BgIntensity[]).map((intensity) => (
                        <button
                          key={intensity}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setBgIntensity(intensity);
                            try {
                              localStorage.setItem('law_bg_intensity', intensity);
                            } catch {}
                            if (soundRef.current) playSoftClick(0.12);
                          }}
                          className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all capitalize cursor-pointer relative z-30 select-none text-center ${
                            bgIntensity === intensity
                              ? 'bg-rose-500/30 text-rose-200 border border-rose-400/60 shadow-xs font-bold'
                              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/60'
                          }`}
                        >
                          {intensity === 'subtle' ? 'Discrète (40%)' : intensity === 'balanced' ? 'Équilibrée (75%)' : 'Immersive (95%)'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mode Plein Écran */}
          <button
            onClick={toggleFullscreen}
            className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5"
            title={isFullscreen ? 'Quitter le mode plein écran (Échap)' : 'Activer le mode plein écran (concentration maximale)'}
            aria-label={isFullscreen ? 'Quitter le plein écran' : 'Mode Plein Écran'}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span className="hidden sm:inline">Quitter plein écran</span>
                <span className="sm:hidden">Quitter</span>
              </>
            ) : (
              <>
                <Maximize className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span className="hidden sm:inline">Plein écran</span>
                <span className="sm:hidden">Plein écran</span>
              </>
            )}
          </button>

          {/* Sound Selector Dropdown */}
          <div className="relative" ref={soundMenuRef}>
            <button
              onClick={() => {
                setShowSoundMenu(prev => !prev);
                if (soundRef.current) playSoftClick(0.12);
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap ${
                soundEnabled
                  ? 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  : 'bg-slate-100 dark:bg-slate-800/70 text-slate-400 dark:text-slate-500 border-transparent hover:text-slate-600'
              }`}
              title="Son : Cathédrale Saint-Pierre (Cliquer pour régler ou tester)"
              aria-label="Menu du son : Cathédrale Saint-Pierre"
            >
              {soundEnabled ? (
                soundTheme === 'notredame' ? (
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                )
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="hidden sm:inline">
                {soundEnabled ? (soundTheme === 'notredame' ? 'Cathédrale Saint-Pierre 🔔' : soundTheme === 'gavel' ? 'Marteau ⚖️' : 'Carillon 🪷') : 'Cathédrale Saint-Pierre (Muet)'}
              </span>
              <span className="sm:hidden">
                {soundEnabled ? (soundTheme === 'notredame' ? 'Cathédrale Saint-Pierre' : soundTheme === 'gavel' ? 'Marteau' : 'Carillon') : 'Muet'}
              </span>
            </button>

            {/* Sound Dropdown Popover */}
            {showSoundMenu && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 z-50 text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      Sons de fin de cycle
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const next = !soundEnabled;
                      setSoundEnabled(next);
                      if (next) playSoftClick(0.15);
                    }}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border transition-colors ${
                      soundEnabled
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {soundEnabled ? 'Activé' : 'Désactivé'}
                  </button>
                </div>

                <div className="mt-3 space-y-2">
                  {/* Option 1: Cathédrale Saint-Pierre Bell (Default) */}
                  <div
                    onClick={() => selectSoundTheme('notredame')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-2 ${
                      soundTheme === 'notredame'
                        ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700/60 ring-1 ring-amber-400/40'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">🔔</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                          Cathédrale Saint-Pierre
                        </span>
                        <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/60 px-1.5 py-0.2 rounded">
                          Par défaut 🔔
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        La cloche de la Cathédrale Saint-Pierre, note majestueuse et résonance solennelle.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playNotreDameBell(0.85);
                      }}
                      className="px-2 py-1 text-[11px] font-medium rounded-lg bg-amber-100 dark:bg-amber-900/60 hover:bg-amber-200 text-amber-800 dark:text-amber-200 shrink-0 transition-colors"
                      title="Écouter la cloche de la Cathédrale Saint-Pierre"
                    >
                      ▶ Tester
                    </button>
                  </div>

                  {/* Option 2: Wooden Judge Gavel */}
                  <div
                    onClick={() => selectSoundTheme('gavel')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-2 ${
                      soundTheme === 'gavel'
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60 ring-1 ring-emerald-400/40'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">⚖️</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                          Marteau de juge
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        Le coup de marteau d'audience qui clôt solennellement les délibérés.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playGavelSound(0.7);
                      }}
                      className="px-2 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shrink-0 transition-colors"
                      title="Écouter le marteau"
                    >
                      ▶ Tester
                    </button>
                  </div>

                  {/* Option 3: Zen Chime */}
                  <div
                    onClick={() => selectSoundTheme('chime')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-2 ${
                      soundTheme === 'chime'
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700/60 ring-1 ring-indigo-400/40'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">🪷</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                          Carillon zen
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        Harmoniques douces et apaisantes pour les longues nuits de révision.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playChimeSound(0.6);
                      }}
                      className="px-2 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shrink-0 transition-colors"
                      title="Écouter le carillon"
                    >
                      ▶ Tester
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500 text-center">
                  Retentit automatiquement à chaque fin de cycle de révision & de pause.
                </div>
              </div>
            )}
          </div>

          {/* Web Notifications API Button */}
          {isNotificationSupported() && (
            <button
              onClick={toggleNotificationPermission}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                notifPermission === 'granted'
                  ? 'bg-slate-900 text-emerald-400 border-slate-800 hover:bg-slate-800'
                  : notifPermission === 'denied'
                    ? 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-400 opacity-70'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
              title={
                notifPermission === 'granted'
                  ? 'Notifications bureau activées (Alerte sonore & visuelle même en arrière-plan)'
                  : notifPermission === 'denied'
                    ? 'Notifications bloquées dans votre navigateur'
                    : 'Activer les notifications du bureau pour être alerté en arrière-plan'
              }
              aria-label="Notifications du navigateur"
            >
              <BellRing className={`w-3.5 h-3.5 ${notifPermission === 'granted' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">
                {notifPermission === 'granted' ? 'Notifs actives' : notifPermission === 'denied' ? 'Notifs bloquées' : 'Alerte bureau'}
              </span>
              <span className="sm:hidden">Notifs</span>
              {notifPermission === 'granted' && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
          )}

          {/* Survival Guide button */}
          <button
            onClick={() => {
              setSurvivalGuideTab('infographie');
              setShowSurvivalGuide(true);
            }}
            className="px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            title="Consulter le Code de survie & l'infographie visuelle de méthode"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Code de survie</span>
            <span className="sm:hidden">Guide</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center relative z-10">
        
        {/* Study Subject Filter Strip - Full width container without clipping Doctorant en Droit */}
        <div className="w-full max-w-2xl mb-6 flex justify-center px-2">
          <SubjectSelector
            selectedSubject={selectedSubject}
            onSelect={handleSelectSubject}
          />
        </div>

        {/* Two Main Requested Mode Buttons (25 min Révision & 5 min Pause) */}
        <div className="w-full max-w-md grid grid-cols-2 gap-3 p-1.5 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs backdrop-blur-xs mb-8 transition-colors">
          {/* Button 1: 25 min Révision */}
          <button
            onClick={() => switchMode('revision')}
            className={`py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
              isRevision
                ? 'bg-[#E5F2EC] dark:bg-[#153125] text-[#245442] dark:text-[#78CFA7] shadow-sm border border-[#C6E4D6] dark:border-[#214D3A]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${isRevision ? 'text-[#245442] dark:text-[#78CFA7]' : 'text-slate-400 dark:text-slate-500'}`} />
            <span>25 min Révision</span>
          </button>

          {/* Button 2: 5 min Pause */}
          <button
            onClick={() => switchMode('pause')}
            className={`py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
              !isRevision
                ? 'bg-[#FCEEE8] dark:bg-[#361E17] text-[#9E4733] dark:text-[#F39A84] shadow-sm border border-[#F5D5C9] dark:border-[#522B22]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
            }`}
          >
            <Coffee className={`w-4 h-4 ${!isRevision ? 'text-[#9E4733] dark:text-[#F39A84]' : 'text-slate-400 dark:text-slate-500'}`} />
            <span>5 min Pause</span>
          </button>
        </div>

        {/* Circular Countdown Timer Stage with subtle pulsing animation on final 60 seconds */}
        <div className={`relative flex items-center justify-center my-2 sm:my-4 transition-all duration-700 ${
          isLastMinute ? 'animate-timer-pulse' : ''
        }`}>
          <svg
            className="w-72 h-72 sm:w-80 sm:h-80 -rotate-90 transform drop-shadow-xs"
            viewBox="0 0 320 320"
          >
            {/* Background Track */}
            <circle
              cx="160"
              cy="160"
              r={circleRadius}
              className="stroke-black/[0.05] dark:stroke-white/[0.08]"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Active Pastel Progress Stroke */}
            <circle
              cx="160"
              cy="160"
              r={circleRadius}
              stroke={activeStrokeColor}
              strokeWidth="10"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className={`transition-[stroke-dashoffset] duration-1000 ease-linear ${
                isLastMinute ? 'animate-stroke-pulse' : ''
              }`}
            />
          </svg>

          {/* Center Digital Display with frosted crystal background */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-white/75 dark:bg-slate-900/75 backdrop-blur-md flex flex-col items-center justify-center border border-white/60 dark:border-white/10 shadow-xs relative">
              {/* Sprint final badge during the last 60 seconds */}
              {isLastMinute && (
                <div className="absolute top-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>Sprint final · 60s</span>
                </div>
              )}
              <span className={`text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400 mb-1 ${isLastMinute ? 'mt-4' : ''}`}>
                {isRevision ? 'Session de Révision' : 'Pause Café du Greffier'}
              </span>
              <div className={`text-5xl sm:text-6xl font-serif-law font-bold tracking-tight tabular-nums transition-colors duration-300 ${
                isLastMinute ? 'text-rose-200 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'text-slate-800 dark:text-slate-100'
              }`}>
                {formattedTime}
              </div>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  isRunning 
                    ? (isLastMinute 
                        ? 'bg-rose-400 animate-ping' 
                        : (isRevision ? 'bg-[#74A790] dark:bg-[#78CFA7]' : 'bg-[#E5917D] dark:bg-[#F39A84]'))
                    : 'bg-slate-300 dark:bg-slate-600'
                }`} />
                <span>{isRunning ? (isLastMinute ? 'Délibéré imminent !' : 'Audience en cours') : 'Prêt à plaider'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Controls Bar */}
        <div className="mt-8 flex items-center gap-3">
          {/* Reset */}
          <button
            onClick={resetTimer}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white border border-slate-200/80 dark:border-slate-800 shadow-xs transition-all"
            title="Réinitialiser le chrono"
            aria-label="Réinitialiser"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Big Play / Pause CTA */}
          <button
            onClick={toggleTimer}
            className={`py-4 px-8 rounded-2xl font-bold text-base transition-all transform active:scale-98 flex items-center gap-2.5 shadow-md ${
              isRunning
                ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 hover:bg-slate-900 dark:hover:bg-white shadow-slate-900/10'
                : isRevision
                  ? 'bg-[#74A790] dark:bg-[#438269] hover:bg-[#629780] dark:hover:bg-[#38715A] text-white shadow-[#74A790]/25'
                  : 'bg-[#DE8672] dark:bg-[#B35844] hover:bg-[#CC7460] dark:hover:bg-[#9E4C38] text-white shadow-[#DE8672]/25'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Suspendre</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{timeLeft === totalDuration ? 'Lancer' : 'Reprendre'}</span>
              </>
            )}
          </button>

          {/* Quick +1 Min */}
          <button
            onClick={addMinute}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white border border-slate-200/80 dark:border-slate-800 shadow-xs transition-all flex items-center gap-1 text-xs font-semibold"
            title="Ajouter 1 minute de sursis"
            aria-label="Ajouter une minute"
          >
            <Plus className="w-4 h-4" />
            <span>1m</span>
          </button>

          {/* Fast forward / Skip cycle */}
          <button
            onClick={skipCycle}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-slate-200/80 dark:border-slate-800 shadow-xs transition-all"
            title="Valider le cycle immédiatement (Passer)"
            aria-label="Valider le cycle"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>

        {/* Motivational Law Quote Card */}
        <div className="w-full max-w-xl mt-10">
          <LawQuoteCard
            quote={currentQuote}
            onRefresh={() => setCurrentQuote(getRandomQuote(mode))}
            accentColor={isRevision ? 'sage' : 'peach'}
          />
        </div>

        {/* Daily Stats Quick Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="px-3.5 py-2 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">{completedSessions}</span>
            <span>session{completedSessions > 1 ? 's' : ''} de 25m réussie{completedSessions > 1 ? 's' : ''}</span>
          </div>
          <div className="px-3.5 py-2 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">{totalStudyMinutes}</span>
            <span>minutes au prétoire</span>
          </div>
          <div className="px-3.5 py-2 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Rang :</span>
            <span className="text-[#396956] dark:text-[#78CFA7] font-medium">{currentRank.badge}</span>
          </div>
        </div>

      </main>

      {/* Subtle Academic Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-6 border-t border-black/[0.05] dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10 transition-colors">
        <div>
          <span>Motivation Timer · Spécial Licence de Droit</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span className="italic">« Par ces motifs, la flemme est déboutée. »</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSecurityModal(true)}
            className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
            title="Consulter le contrôle de cybersécurité, RGPD et droit d'auteur"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cybersécurité & Droit d'Auteur</span>
          </button>
          <span className="hidden sm:inline text-slate-700">·</span>
          <span className="text-slate-500">Pour étudiants en Droit</span>
        </div>
      </footer>

      {/* Completion Modal with funny law encouragement & confetti */}
      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        completedMode={lastCompletedMode}
        quote={completionQuote}
        soundTheme={soundTheme}
        onStartNext={(nextMode) => {
          switchMode(nextMode, true);
        }}
      />

      {/* Survival Guide & Ranks Modal */}
      <SurvivalGuideModal
        isOpen={showSurvivalGuide}
        onClose={() => setShowSurvivalGuide(false)}
        completedSessions={completedSessions}
        initialTab={survivalGuideTab}
      />

      {/* Security & Copyright Modal */}
      <SecurityLegalModal
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
      />
    </div>
  );
}
