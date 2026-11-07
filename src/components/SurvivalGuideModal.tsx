/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { X, Award, Scroll, Scale, Sparkles, BookOpen, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { LAW_RANKS } from '../data/lawQuotes';
import guideImg from '../assets/droit_tout_en_douceur.jpg';

interface SurvivalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedSessions: number;
  initialTab?: 'infographie' | 'regles';
}

const SURVIVAL_RULES = [
  {
    num: "Art. 1",
    title: "Le Dogme du Plan Binaire",
    desc: "Toute dissertation ou commentaire comporte exactement DEUX parties (I et II) et DEUX sous-parties (A et B). L'évocation d'une troisième partie entraîne l'exil immédiat de la faculté."
  },
  {
    num: "Art. 2",
    title: "L'Immunité de l'Arrêt Blanco",
    desc: "En cas d'interrogation surprise en TD de droit administratif, prononcer 'Arrêt Blanco, 8 février 1873' avec assurance accorde un sursis de bienveillance d'au moins 30 secondes."
  },
  {
    num: "Art. 3",
    title: "La Magie du Stabilo Pastel",
    desc: "Surligner son Code civil avec 6 teintes pastel différentes n'augmente pas la moyenne, mais confère une impression immédiate de contrôle absolu sur son destin."
  },
  {
    num: "Art. 4",
    title: "La Vraie Victoire : Le 10,01",
    desc: "Un 10,01 obtenu par compensation magique au second semestre procure une joie supérieure à l'attribution du Prix Nobel. Savoure chaque centième."
  },
  {
    num: "Art. 5",
    title: "La Phrase Passe-Partout",
    desc: "Face à une question piège : 'Il convient ici d'opérer une distinction fondamentale entre le fait et le droit'. Le chargé de TD hoche la tête, tu as gagné du temps."
  }
];

const METHOD_PILLARS = [
  {
    emoji: "🧠",
    title: "Ta Croissance Réelle",
    desc: "Tu ne bachotes pas dans le vide : tu construis une logique d'acier et une rigueur intellectuelle qui te serviront toute ta vie."
  },
  {
    emoji: "💡",
    title: "Comprendre plutôt que par cœur",
    desc: "Résume chaque règle avec tes propres mots, dessine des schémas simples des qualifications juridiques."
  },
  {
    emoji: "🛡️",
    title: "Ta Peur est une Force",
    desc: "Avoir le trac avant un galop d'essai prouve simplement ton attachement viscéral à ton projet professionnel."
  },
  {
    emoji: "👥",
    title: "Brise la Solitude",
    desc: "Travaille à la bibliothèque universitaire ou en binôme de TD pour désamorcer l'anxiété et l'isolement."
  },
  {
    emoji: "🪜",
    title: "Politique des Mini-Objectifs",
    desc: "Ne vise pas la perfection absolue dès le lundi : avance un chapitre, une sous-partie, une fiche après l'autre."
  },
  {
    emoji: "🚪",
    title: "Tu te crées des options",
    desc: "Le Droit t'apprend à décoder les systèmes et les règles du monde réel. Tes perspectives dépassent un seul métier."
  }
];

export function SurvivalGuideModal({ isOpen, onClose, completedSessions, initialTab = 'infographie' }: SurvivalGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'infographie' | 'regles'>(initialTab);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const currentRank = [...LAW_RANKS].reverse().find(r => completedSessions >= r.threshold) || LAW_RANKS[0];
  const nextRank = LAW_RANKS.find(r => r.threshold > completedSessions);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl max-h-[92vh] overflow-y-auto text-slate-100 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="survival-guide-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20 cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 pr-10">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Scroll className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-400">
              Guide officiel · Spécial Étudiants en Droit
            </span>
            <h3 id="survival-guide-title" className="text-xl font-bold font-serif-law text-white">
              Code de Survie & Méthode de Révision
            </h3>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-800/80 rounded-2xl mb-5">
          <button
            onClick={() => setActiveTab('infographie')}
            className={`py-2 px-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'infographie'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Guide Visuel : « Tout en douceur »</span>
          </button>

          <button
            onClick={() => setActiveTab('regles')}
            className={`py-2 px-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'regles'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Principes du Juriste & Grades ({currentRank.badge})</span>
          </button>
        </div>

        {/* Tab 1: The Artwork "Tout en douceur" in High Resolution */}
        {activeTab === 'infographie' && (
          <div className="space-y-5">
            {/* Image viewer container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/70 shadow-inner group">
              <div className="relative overflow-hidden flex items-center justify-center p-1">
                <img
                  src={guideImg}
                  alt="Guide Visuel : Réussir ses études de Droit (tout en douceur !)"
                  className={`w-full h-auto object-contain transition-transform duration-300 rounded-xl shadow-md ${
                    isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(prev => !prev)}
                />
              </div>

              {/* Zoom pill overlay */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomed(prev => !prev)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs text-rose-200 border border-slate-700 backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5" />
                      <span>Réduire</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Agrandir pour lire</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Reading Key Points extracted for optimal comfort */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-rose-400" />
                <span>Les 6 piliers pour réussir ses études de Droit :</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {METHOD_PILLARS.map((pillar) => (
                  <div 
                    key={pillar.title}
                    className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{pillar.emoji}</span>
                      <span className="text-xs font-bold text-slate-200">
                        {pillar.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: The 5 Survival Rules & Student Progression */}
        {activeTab === 'regles' && (
          <div className="space-y-5">
            {/* Student Progression / Rank */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Ton grade actuel
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                  {currentRank.badge}
                </span>
              </div>

              <h4 className="font-serif-law text-lg font-bold text-white">
                {currentRank.title}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {currentRank.desc}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Plaidoiries validées : <strong className="text-white">{completedSessions}</strong></span>
                {nextRank ? (
                  <span>Prochain grade dans <strong className="text-amber-400">{nextRank.threshold - completedSessions}</strong> session(s)</span>
                ) : (
                  <span className="text-emerald-400 font-medium">Niveau suprême atteint ! 🏆</span>
                )}
              </div>
            </div>

            {/* The 5 Survival Rules */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Principes fondamentaux du juriste (Jurisprudence étudiante)</span>
              </h4>

              {SURVIVAL_RULES.map((rule) => (
                <div key={rule.num} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                      {rule.num}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {rule.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-1">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer button */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-all text-center cursor-pointer shadow-xs"
          >
            Retourner plaider
          </button>
        </div>
      </div>
    </div>
  );
}
