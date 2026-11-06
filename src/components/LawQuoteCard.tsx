import { useState } from 'react';
import { Sparkles, Copy, Check, Quote, RefreshCw } from 'lucide-react';
import { LawQuote } from '../data/lawQuotes';

interface LawQuoteCardProps {
  quote: LawQuote;
  onRefresh: () => void;
  accentColor?: 'sage' | 'peach';
}

export function LawQuoteCard({ quote, onRefresh, accentColor = 'sage' }: LawQuoteCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `« ${quote.quote} » — ${quote.author} (${quote.articleRef || 'Licence de Droit'})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bgStyle = accentColor === 'sage' 
    ? 'bg-[#F2F7F4] dark:bg-[#122219] border-[#DCE8E1] dark:border-[#1E3B2B]' 
    : 'bg-[#FCF4F0] dark:bg-[#261814] border-[#F5E2DA] dark:border-[#422620]';

  const accentTextStyle = accentColor === 'sage' 
    ? 'text-[#4A7865] dark:text-[#7FD1AB]' 
    : 'text-[#B86852] dark:text-[#F09F8C]';

  return (
    <div className={`relative rounded-2xl border ${bgStyle} p-6 shadow-xs transition-all duration-300`}>
      <div className="flex items-center justify-between pb-3 border-b border-black/[0.05] dark:border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Quote className={`w-4 h-4 ${accentTextStyle} opacity-70`} />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            {quote.category === 'pause' ? 'Conseil d\'audience · Pause' : 'Motivation Juridique'}
          </span>
          {quote.articleRef && (
            <span className="text-xs text-slate-400 dark:text-slate-500 font-serif-law italic hidden sm:inline">
              · {quote.articleRef}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onRefresh}
            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
            title="Autre citation juridique"
            aria-label="Changer de citation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
            title="Copier pour le groupe de TD"
            aria-label="Copier la citation"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      <div className="pt-4">
        <p className="font-serif-law text-lg sm:text-xl text-slate-800 dark:text-slate-100 leading-relaxed italic">
          « {quote.quote} »
        </p>
        
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <Sparkles className={`w-3.5 h-3.5 ${accentTextStyle}`} />
            <span>{quote.author}</span>
          </div>
          {quote.context && (
            <span className="italic text-slate-400 dark:text-slate-500">
              {quote.context}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
