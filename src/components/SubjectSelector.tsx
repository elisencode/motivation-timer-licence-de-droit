import { Scale, BookOpen, Award, GraduationCap, Scroll } from 'lucide-react';
import { LAW_SUBJECTS } from '../data/lawQuotes';

interface SubjectSelectorProps {
  selectedSubject: string;
  onSelect: (id: string) => void;
}

export function SubjectSelector({ selectedSubject, onSelect }: SubjectSelectorProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'civil': return <BookOpen className="w-3.5 h-3.5" />;
      case 'licence': return <Award className="w-3.5 h-3.5" />;
      case 'master': return <GraduationCap className="w-3.5 h-3.5" />;
      case 'doctorat': return <Scroll className="w-3.5 h-3.5" />;
      default: return <Scale className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none no-scrollbar">
      <span className="text-xs font-semibold text-rose-300 dark:text-rose-400 whitespace-nowrap shrink-0 pr-1 flex items-center gap-1">
        <span>Droit en Focus :</span>
      </span>
      {LAW_SUBJECTS.map((sub) => {
        const isSelected = selectedSubject === sub.id;
        return (
          <button
            key={sub.id}
            onClick={() => onSelect(sub.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
              isSelected
                ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 shadow-sm'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-800'
            }`}
          >
            {getIcon(sub.id)}
            <span>{sub.name}</span>
          </button>
        );
      })}
    </div>
  );
}
