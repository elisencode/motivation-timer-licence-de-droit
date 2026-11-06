export interface LawQuote {
  id: string;
  category: 'revision' | 'pause' | 'bonus';
  quote: string;
  author: string;
  context?: string;
  articleRef?: string;
}

export const LAW_QUOTES: LawQuote[] = [
  // Citations de fin de session de révision (25 min bouclées)
  {
    id: 'rev-1',
    category: 'revision',
    quote: "Attendu que l'étudiant a bûché 25 minutes consécutives sans ouvrir TikTok : par ces motifs, la Cour rejette le pourvoi de la flemme et valide la session avec mention très honorable !",
    author: "Cour de Cassation · Chambre des Étudiants Assidus",
    context: "Arrêt de principe sur la productivité",
    articleRef: "Visa : Art. 1240 C. civ."
  },
  {
    id: 'rev-2',
    category: 'revision',
    quote: "Même Portalis n'a pas rédigé le Code civil avec autant de dévotion. Les 2 281 articles originels s'inclinent humblement devant tes 25 minutes de pur génie juridique.",
    author: "Esprit de Jean-Étienne-Marie Portalis",
    context: "Discours préliminaire révisé",
    articleRef: "Code civil de 1804"
  },
  {
    id: 'rev-3',
    category: 'revision',
    quote: "Fiche d'arrêt express : Faits : Tu avais la flemme. Procédure : Tu as lancé le chrono. Solution : Victoire éclatante. Portée : Tu te diriges tout droit vers la robe d'avocat.",
    author: "Méthodologie du Cas Pratique",
    context: "Syllogisme juridique irréfutable",
    articleRef: "Majeure · Mineure · Conclusion"
  },
  {
    id: 'rev-4',
    category: 'revision',
    quote: "Selon le principe de la force obligatoire de tes révisions (inspiré du sacro-saint article 1103), tout engagement de 25 min tient lieu de loi à celui qui l'a fait. Tu as honoré ton contrat !",
    author: "Droit des obligations",
    context: "Théorie de l'autonomie de la volonté",
    articleRef: "Art. 1103 C. civ."
  },
  {
    id: 'rev-5',
    category: 'revision',
    quote: "Arrêt Blanco de 1873 ? Fondateur du droit administratif. Toi aujourd'hui ? Fondateur de ta propre mention. Le Conseil d'État t'adresse une standing ovation.",
    author: "Tribunal des Conflits",
    context: "Arrêt Blanco revisité",
    articleRef: "Compétence administrative validée"
  },
  {
    id: 'rev-6',
    category: 'revision',
    quote: "Plan binaire validé avec brio : I. Une concentration absolue (A. Sans smartphone, B. Avec rigueur) — II. Un avenir radieux (A. Admis au barreau, B. Richesse et gloire). Pas besoin de III !",
    author: "L'art du plan en deux parties",
    context: "Norme sacrée des facultés de droit",
    articleRef: "Interdiction formelle du plan en 3 parties"
  },
  {
    id: 'rev-7',
    category: 'revision',
    quote: "Ton chargé de TD vient d'avoir un pressentiment inexplicable : il s'apprête à te mettre un 15/20 au prochain devoir. C'est statistiquement rarissime, savoure ce moment.",
    author: "Légende urbaine du TD de Droit",
    context: "Note supérieure à 11 constatée par huissier",
    articleRef: "Miracle universitaire"
  },
  {
    id: 'rev-8',
    category: 'revision',
    quote: "Droit pénal des révisions : L'élément matériel (25 min de travail) et l'élément moral (la soif de réussir) sont caractérisés. Infraction de réussite consommée sans circonstance atténuante !",
    author: "Chambre Criminelle",
    context: "Culpabilité d'excellence",
    articleRef: "Art. 121-3 Code pénal"
  },
  {
    id: 'rev-9',
    category: 'revision',
    quote: "Par dérogation expresse au principe de non-rétroactivité des lois, l'effort que tu viens de fournir garantit immédiatement que tu ne finiras pas aux rattrapages de juin !",
    author: "Principe de Sécurité Juridique",
    context: "Application immédiate de la réussite",
    articleRef: "Art. 2 C. civ."
  },
  {
    id: 'rev-10',
    category: 'revision',
    quote: "Ton exemplaire du Code Dalloz rouge sang pèse peut-être 3,8 kg, mais ton cerveau vient de devenir encore plus lourd d'érudition.",
    author: "Librairie de la Faculté",
    context: "Musculation intellectuelle et dorsale",
    articleRef: "Édition spéciale avec onglets fluo"
  },
  {
    id: 'rev-11',
    category: 'revision',
    quote: "Conseil constitutionnel : Après examen au titre de la QPC, la décision de travailler 25 minutes est déclarée 100% conforme à la Constitution et aux droits fondamentaux.",
    author: "Les Sages de la Rue de Montpensier",
    context: "Décision de conformité totale",
    articleRef: "Bloc de constitutionnalité"
  },
  {
    id: 'rev-12',
    category: 'revision',
    quote: "Théorie de l'imprévision (Art. 1195) : Même si les circonstances d'amphi étaient excessivement onéreuses moralement, tu as exécuté ta tâche sans renégocier. Respect éternel.",
    author: "Réforme du droit des contrats",
    context: "Résistance héroïque",
    articleRef: "Art. 1195 C. civ."
  },

  // Citations de fin de pause (5 min terminées, reprise)
  {
    id: 'pau-1',
    category: 'pause',
    quote: "Fin de la suspension de séance ! Le greffier agite la clochette, l'audience reprend. Rhabille-toi de ta toge invisible et retourne plaider tes révisions !",
    author: "Maître du Prétoire",
    context: "Reprise des débats au fond",
    articleRef: "Audience solennelle"
  },
  {
    id: 'pau-2',
    category: 'pause',
    quote: "Le délai franc de 5 minutes est officiellement expiré conformément aux articles 641 et suivants du CPC. Pas de jour férié accordé pour prolonger la pause café !",
    author: "Code de Procédure Civile",
    context: "Computation des délais impérative",
    articleRef: "Art. 641 CPC"
  },
  {
    id: 'pau-3',
    category: 'pause',
    quote: "Le café tiède de la machine de la BU a fini de diffuser dans tes synapses. L'ordre public universitaire ordonne la reprise immédiate de la lecture du traité.",
    author: "Machine à café du sous-sol de la Faculté",
    context: "Stimulant réglementaire agréé",
    articleRef: "Circulaire de réveil des neurones"
  },
  {
    id: 'pau-4',
    category: 'pause',
    quote: "Nemo auditur propriam turpitudinem allegans... Traduction libre : nul ne peut invoquer sa propre flemme pour esquiver le prochain cycle de 25 minutes. Au travail !",
    author: "Adage juridique latin",
    context: "Principe séculaire de bonne foi",
    articleRef: "Maxime prétorienne"
  },
  {
    id: 'pau-5',
    category: 'pause',
    quote: "La Cour européenne des droits de l'homme a statué : 5 minutes de pause suffisent à garantir un délai raisonnable de repos. L'article 6§1 t'invite à réouvrir tes fiches.",
    author: "Cour de Strasbourg",
    context: "Droit à un procès (et à un examen) équitable",
    articleRef: "Art. 6§1 CEDH"
  },
  {
    id: 'pau-6',
    category: 'pause',
    quote: "Rappelle-toi : Hans Kelsen a passé sa vie à hiérarchiser des normes pour que tu puisses briller en droit constit'. Tu ne vas pas le décevoir pour un reel de chat.",
    author: "La Pyramide des Normes",
    context: "Doctrine pure du Droit",
    articleRef: "Grundnorm autrichienne"
  },
  {
    id: 'pau-7',
    category: 'pause',
    quote: "Suspension levée ! Les parties sont priées de regagner la table des négociations intellectuelles. Prochain arrêt : la maîtrise absolue du programme.",
    author: "Président de Chambre",
    context: "Reprise sous haute solennité",
    articleRef: "Délibéré terminé"
  },

  // Citations bonus d'encouragement
  {
    id: 'bon-1',
    category: 'bonus',
    quote: "Le droit mène à tout, à condition d'en sortir... ou au moins d'en valider chaque semestre avec panache à 10,02 de moyenne !",
    author: "Sagesse ancestrale des carabins en toge",
    context: "La beauté du 10,01 compensé",
    articleRef: "Compensation magique des UE"
  },
  {
    id: 'bon-2',
    category: 'bonus',
    quote: "Dans le doute : 'Il convient d'opérer une distinction'. Cette phrase magique t'a déjà sauvé en dissertation, elle te sauvera encore aujourd'hui.",
    author: "Guide de survie de la L2",
    context: "L'art de noyer le poisson juridiquement",
    articleRef: "Méthode infaillible"
  },
  {
    id: 'bon-3',
    category: 'bonus',
    quote: "Pourquoi faire simple quand on peut qualifier juridiquement l'achat d'un pain au chocolat comme 'un contrat synallagmatique à titre onéreux et à exécution instantanée' ?",
    author: "Le juriste à la boulangerie",
    context: "Déformation professionnelle assumée",
    articleRef: "Art. 1106 C. civ."
  }
];

export const LAW_SUBJECTS = [
  { id: 'general', name: 'Matière Générale Licence', icon: 'Scale', color: 'slate' },
  { id: 'civil', name: 'Droit Civil Obligations', icon: 'BookOpen', color: 'rose' },
  { id: 'licence', name: 'Licence Droit', icon: 'Award', color: 'emerald' },
  { id: 'master', name: 'Master Droit', icon: 'GraduationCap', color: 'amber' },
  { id: 'doctorat', name: 'Doctorant en Droit', icon: 'Scroll', color: 'indigo' }
] as const;

export const LAW_RANKS = [
  { threshold: 0, title: "Étudiant perdu en amphi", badge: "L1 Découverte", desc: "Cherche encore l'amphi Simone Veil." },
  { threshold: 2, title: "Scribe de Fiches d'Arrêt", badge: "L2 Affûté", desc: "Maîtrise le stabilo jaune pastel sans bavure." },
  { threshold: 4, title: "Exégète du Code Civil", badge: "Adepte de Portalis", desc: "Cite l'article 1240 dans son sommeil." },
  { threshold: 6, title: "Plaideur Hors-Pair", badge: "Ténor du Prétoire", desc: "Capable de faire pleurer un chargé de TD." },
  { threshold: 8, title: "Major(e) de Promotion", badge: "Grand Duc du Barreau", desc: "La Cour de cassation lui demande conseil." }
];
