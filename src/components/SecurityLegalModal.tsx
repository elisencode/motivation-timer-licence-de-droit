/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Lock, FileText, CheckCircle, Scale, EyeOff, ServerOff, ExternalLink, X } from 'lucide-react';

interface SecurityLegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecurityLegalModal({ isOpen, onClose }: SecurityLegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="security-legal-title"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-100 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="security-legal-title" className="text-lg font-bold font-serif-law text-white">
                Cybersécurité & Droit d'Auteur
              </h2>
              <p className="text-xs text-slate-400">
                Garanties de sécurité, respect du RGPD & statut juridique de l'application
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-sm">
          {/* Section 1: Cybersécurité & Confidentialité */}
          <section className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>1. Contrôle de Cybersécurité & Respect de la Vie Privée (RGPD)</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <ServerOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Architecture 100 % Client-Side (Local-First) :</strong> Aucune donnée personnelle, statistique d'étude ou historique de session n'est transmise à un serveur distant. Tout reste stocké exclusivement dans le <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">localStorage</code> de votre propre navigateur.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <EyeOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Zéro Traqueur & Zéro Télémétrie :</strong> Aucun cookie publicitaire, aucun script d'analyse de comportement (Google Analytics, Meta Pixel, etc.) ni tiers espion.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Protection XSS & Injection :</strong> Rendu React sécurisé (aucun usage de <code className="text-rose-300 bg-slate-800 px-1 py-0.5 rounded">dangerouslySetInnerHTML</code>), validation stricte des types en TypeScript, et politique de ressources locales.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Web Notifications API sécurisée :</strong> Déclenchée uniquement avec consentement explicite de l'utilisateur, sans abonnement push serveur ni transmission d'identifiant de push notification.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 2: Droit d'auteur & Propriété intellectuelle */}
          <section className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>2. Droit d'Auteur & Propriété Intellectuelle (CPI)</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Code Source (Licence Libre Apache 2.0) :</strong> Le code source de l'application est mis à disposition sous licence libre Apache-2.0, autorisant la réutilisation, la modification et la distribution avec mention de paternité et sans garantie.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Textes Législatifs & Jurisprudence :</strong> En vertu du droit français et de la jurisprudence constante sur l'article L. 122-5 du Code de la propriété intellectuelle (CPI), les textes législatifs (Code civil, Code pénal), les arrêts publics (Conseil d'État, Cour de cassation) et les courtes citations à but pédagogique relèvent du domaine public ou de l'exception de courte citation.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Créations Visuelles & Fonds d'écran :</strong> Les illustrations intégrées au projet sont intégrées à des fins d'accompagnement éducatif et bienveillant des étudiants en droit. Le droit moral de leurs créateurs respectifs est scrupuleusement respecté.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Patrimoine Sonore (Cloche de la Cathédrale) :</strong> La sonnerie de la cloche (Bourdon de la cathédrale) fait partie du patrimoine acoustique et culturel libre de droits pour un usage pédagogique et non commercial.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3: Engagement GitHub */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-xs text-emerald-200">
            <p>
              Ce projet GitHub est conçu comme un outil ouvert, transparent et sécurisé, destiné à soutenir bénévolement la réussite universitaire des étudiants en droit.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Compris & Continuer à réviser
          </button>
        </div>
      </div>
    </div>
  );
}
