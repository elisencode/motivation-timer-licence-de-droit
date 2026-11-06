import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Coffee, BookOpen, ArrowRight, X, Copy, Check, Sparkles, Scale } from 'lucide-react';
import { LawQuote } from '../data/lawQuotes';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedMode: 'revision' | 'pause';
  quote: LawQuote;
  onStartNext: (mode: 'revision' | 'pause') => void;
  soundTheme?: 'notredame' | 'gavel' | 'chime';
}

export function CompletionModal({
  isOpen,
  onClose,
  completedMode,
  quote,
  onStartNext,
  soundTheme
}: CompletionModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fire pastel confetti
      const pastelColors = ['#A8D5BA', '#F7C6B7', '#B9C6E8', '#F8E1A6', '#C7B9E8'];
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: pastelColors,
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isRevision = completedMode === 'revision';

  const handleCopy = () => {
    const textToCopy = `« ${quote.quote} » — ${quote.author} (Trouvé sur Motivation Timer Droit)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] dark:bg-[#141A24] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EBE3D7] dark:border-slate-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Soft pastel ambient background blobs */}
        <div 
          className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-40 dark:opacity-20 pointer-events-none ${
            isRevision ? 'bg-[#A8D5BA] dark:bg-[#2B5441]' : 'bg-[#F7C6B7] dark:bg-[#5C2E24]'
          }`} 
        />
        <div 
          className={`absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-30 dark:opacity-15 pointer-events-none ${
            isRevision ? 'bg-[#F8E1A6] dark:bg-[#5A4822]' : 'bg-[#B9C6E8] dark:bg-[#2F395A]'
          }`} 
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Category Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isRevision 
              ? 'bg-[#E5F2EC] dark:bg-[#17382B] text-[#3D705C] dark:text-[#78CFA7]' 
              : 'bg-[#FCEEE8] dark:bg-[#3A1E18] text-[#B85842] dark:text-[#F39A84]'
          }`}>
            {isRevision ? <Scale className="w-6 h-6" /> : <Coffee className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
              {isRevision ? 'Session de 25 min validée !' : 'Pause de 5 min terminée !'}
            </span>
            <h3 className="text-xl font-bold font-serif-law text-slate-800 dark:text-slate-100">
              {isRevision ? 'Délibéré rendu avec succès ⚖️' : 'Fin de la suspension d\'audience ☕'}
            </h3>
            {soundTheme === 'notredame' && (
              <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-700 dark:text-amber-400 font-medium">
                <span className="inline-block animate-pulse">🔔</span>
                <span>Cloche de la Cathédrale Saint-Pierre</span>
              </div>
            )}
          </div>
        </div>

        {/* The Funny Law Quote */}
        <div className="my-6 p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-[#EFE8DD] dark:border-slate-800 shadow-sm relative">
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              {quote.articleRef || 'Jurisprudence de la motivation'}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier pour les potes de TD</span>
                </>
              )}
            </button>
          </div>

          <p className="font-serif-law text-lg sm:text-xl text-slate-800 dark:text-slate-100 italic leading-relaxed">
            « {quote.quote} »
          </p>

          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-slate-700 dark:text-slate-300">{quote.author}</span>
          </div>
        </div>

        {/* CTA Next Steps */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {isRevision ? (
            <>
              <button
                onClick={() => {
                  onClose();
                  onStartNext('pause');
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl font-medium text-sm bg-[#FCEEE8] dark:bg-[#341D17] hover:bg-[#F8E2D9] dark:hover:bg-[#44241D] text-[#9E4B38] dark:text-[#F39A84] border border-[#F5D8CE] dark:border-[#532C24] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Coffee className="w-4 h-4" />
                <span>Prendre 5 min de pause</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onStartNext('revision');
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl font-medium text-sm bg-[#E5F2EC] dark:bg-[#163327] hover:bg-[#D7ECE2] dark:hover:bg-[#1E4334] text-[#2F614E] dark:text-[#78CFA7] border border-[#CDE5DA] dark:border-[#25523F] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Enchaîner 25 min</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                onClose();
                onStartNext('revision');
              }}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-[#E5F2EC] dark:bg-[#163327] hover:bg-[#D7ECE2] dark:hover:bg-[#1E4334] text-[#2F614E] dark:text-[#78CFA7] border border-[#CDE5DA] dark:border-[#25523F] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Reprendre 25 min de révision</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
