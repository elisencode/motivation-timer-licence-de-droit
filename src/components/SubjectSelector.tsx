import { LAW_SUBJECTS } from '../data/lawQuotes';

interface SubjectSelectorProps {
  selectedSubject: string;
  onSelect: (id: string) => void;
}

export function SubjectSelector({ selectedSubject, onSelect }: SubjectSelectorProps) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-2.5 max-w-full">
      <span className="text-xs font-bold text-rose-300 dark:text-rose-400 whitespace-nowrap shrink-0 flex items-center gap-1 px-1">
        <span>⚖️ Droit en Focus :</span>
      </span>
      {LAW_SUBJECTS.map((sub) => {
        const isSelected = selectedSubject === sub.id;
        return (
          <button
            key={sub.id}
            onClick={() => onSelect(sub.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              isSelected
                ? 'bg-rose-500/25 text-rose-200 border border-rose-400/60 shadow-xs ring-1 ring-rose-400/40 font-bold'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <span className="text-sm">{sub.emoji}</span>
            <span>{sub.name}</span>
          </button>
        );
      })}
    </div>
  );
}
