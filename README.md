# ⚖️ Motivation Timer · Licence de Droit

<div align="center">

[![Licence](https://img.shields.io/badge/Licence-Apache_2.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-En_Ligne-22C55E?logo=github&logoColor=white)](https://elisencode.github.io/motivation-timer-licence-de-droit/)
[![Local First](https://img.shields.io/badge/Architecture-Local--First-10B981)](#-contrôle-de-cybersécurité--rgpd)
[![RGPD](https://img.shields.io/badge/Donn%C3%A9es-100%25_Priv%C3%A9es-emerald)](#-contrôle-de-cybersécurité--rgpd)

**Minuteur Pomodoro immersif & humoristique taillé sur mesure pour les études de Droit (Licence, Master & Doctorat).**  
*Rythmez vos fiches d'arrêt, vos cas pratiques et vos préparations de TD dans une atmosphère nocturne apaisante.*

[🚀 **Tester l'application en ligne (GitHub Pages)**](https://elisencode.github.io/motivation-timer-licence-de-droit/) • [🎬 **Démonstration animée**](#-démonstration-animée-how-to-app) • [📖 **Code de Survie**](#7--code-de-survie-guide-tout-en-douceur--système-de-grades)

</div>

---

> *« Attendu que l'étudiant a bûché 25 minutes consécutives sans ouvrir TikTok : par ces motifs, la Cour rejette le pourvoi de la flemme et valide la session avec mention très honorable ! »*  
> — **Cour de Cassation · Chambre des Étudiants Assidus (Visa : Art. 1240 C. civ.)**

---

## 📑 Sommaire

1. [🎬 Démonstration animée (« How to App »)](#-démonstration-animée-how-to-app)
2. [🏛️ Présentation & Philosophie](#️-présentation--philosophie)
3. [✨ Fonctionnalités Clés](#-fonctionnalités-clés)
   - [1. Sessions de Révision (25 minutes)](#1--sessions-de-révision-25-minutes)
   - [2. Sprint Final & Pulsation Subtile (60 dernières secondes)](#2--sprint-final--pulsation-subtile-60-dernières-secondes)
   - [3. Cloche de Cathédrale Saint-Pierre & Sons d'Audience](#3--cloche-de-cathédrale-saint-pierre--sons-daudience)
   - [4. Notifications du Navigateur (Web Notifications API)](#4--notifications-du-navigateur-web-notifications-api)
   - [5. Pause Réglementaire (5 minutes)](#5--pause-réglementaire-5-minutes)
   - [6. Mode Nuit & 6 Fonds d'Écran Immersifs](#6--mode-nuit-permanent-lueur-de-bougie--6-fonds-décran)
   - [7. Code de Survie, Guide Méthodologique & Rangs](#7--code-de-survie-guide-tout-en-douceur--système-de-grades)
4. [⌨️ Raccourcis & Ergonomie](#️-raccourcis--ergonomie)
5. [🌐 Déploiement GitHub Pages (Dossier `/docs`)](#-déploiement-github-pages-dossier-docs)
6. [🛡️ Cybersécurité & RGPD](#️-contrôle-de-cybersécurité--rgpd)
7. [⚖️ Propriété Intellectuelle & Droit d'Auteur](#️-propriété-intellectuelle--droit-dauteur)
8. [🛠️ Stack Technique](#️-stack-technique)
9. [🚀 Installation et Lancement Local](#-installation-et-lancement-local)

---

## 🎬 Démonstration animée (« How to App »)

Découvrez en quelques secondes le parcours complet de révision, les fonds d'écran immersifs, les animations de pulsation et la sonnerie solennelle :

<div align="center">

![Démonstration du Motivation Timer Droit](./public/assets/demo_how_to.gif)

*Navigation fluide : Niveau de Droit ➔ 25 min d'audience ➔ Sprint final 60s ➔ Cloche de Saint-Pierre & Citation ➔ Galerie 6 fonds (Soir de Noël, Faculté, Sélénite) ➔ Code de Survie.*

</div>

---

## 🏛️ Présentation & Philosophie

La réussite en faculté de Droit repose sur la constance, la décomposition des objectifs et la sérénité face à la masse de travail. Le **Motivation Timer** transforme chaque séance de révision en une **audience solennelle et stimulante**, alliant la rigueur méthodologique du juriste à l'humour incontournable des amphis de droit français.

Conçu selon les principes du **Mode Nuit exclusif** et du **design anti-distraction**, l'application garantit un confort visuel optimal pour les longues nuits de révision de TD, de galops d'essai et de partiels.

---

## ✨ Fonctionnalités Clés

### 1. 🌿 Sessions de Révision (25 minutes)
- **Barre « ⚖️ Droit en Focus : »** : Sélectionnez instantanément votre cycle d'études :
  - 🥇 **Licence Droit** (L1, L2, L3)
  - 🎓 **Master Droit** (M1, M2)
  - 📜 **Doctorant en Droit** (Thèse & Recherche)
- Lancez votre audience de révision d'un clic sur **« 25 min Révision »**.
- L'interface adopte une teinte apaisante **vert sauge pastel** (`#78CFA7`).
- Le cadran dynamique et l'onglet de votre navigateur synchronisent le temps restant en direct : `(24:48) Révision · Droit`.

### 2. ⏳ Sprint Final & Pulsation Subtile (60 dernières secondes)
- Dès que le chronomètre franchit les **60 dernières secondes** d'un cycle :
  - **Pulsation respirante** : L'anneau passe en rose corail doux (`#FB7185`) avec une onde de lueur subtile (`@keyframes timer-final-minute-pulse` et `.animate-stroke-pulse`) pour préparer le juriste sans stress ni son agressif.
  - **Indicateur discret** : Affichage central *« Sprint final · 60s »* et avertissement solennel *« Délibéré imminent ! »*.

### 3. 🔔 Cloche de Cathédrale Saint-Pierre & Sons d'Audience
- À l'issue du cycle de travail ou de pause :
  - **Son par défaut** : La résonance solennelle de la **Cathédrale Saint-Pierre** (note de bronze majestueuse).
  - **Sélecteur audio intégré** :
    - 🔔 *Cathédrale Saint-Pierre* (Sonnerie solennelle par défaut)
    - ⚖️ *Marteau de juge* (Double frappe d'audience au Palais)
    - 🪷 *Carillon zen* (Harmoniques douces pour concentration nocturne)
  - **Célébration** : Pluie de confettis pastel non-invasive.
  - **Jurisprudence humoristique** : Arrêts de principe réinventés, exégèse de l'article 1240, arrêt Blanco de 1873, port de la robe d'avocat, ou sacro-saint plan binaire en 2 parties et 2 sous-parties (I-A, I-B, II-A, II-B).
  - Bouton de copie en 1 clic pour partager la citation sur les groupes de TD.

### 4. 📢 Notifications du Navigateur (Web Notifications API)
- **Alerte même en arrière-plan** : Cliquez sur **« Alerte bureau »** dans la barre d'outils.
- Même si votre navigateur est réduit ou que vous étudiez un fascicule de TD / PDF en plein écran, une notification native vous avertit de la fin de séance.
- Un clic sur la notification replace instantanément le minuteur au premier plan.
- **100 % Local** : Ne transite par aucun serveur push distant.

### 5. ☕ Pause Réglementaire (5 minutes)
- Cliquez sur **« 5 min Pause »** pour lever la séance.
- L'interface bascule dans une ambiance **pêche / terracotta pastel** (`#F29E8B`).
- La cloche retentit pour vous rappeler la reprise des délibérés.

### 6. 🌙 Mode Nuit permanent & 7 Fonds d'Écran avec Animations Adaptées
- **Mode Nuit natif et permanent** : Fond sombre profond (`#0B0F17`) éliminant toute fatigue oculaire.
- **Une animation sur mesure pour chaque ambiance** :
  1. 🏛️ **Faculté de Droit (Par défaut)** : Résonance acoustique concentrique des cloches de la cathédrale (`@keyframes cathedral-ring-wave`), étoiles scintillantes au crépuscule et lueur des lampadaires d'audience.
  2. 🎄 **Soir de Noël & Cheminée (Chat Sphynx & 4 Traités)** : Flammes et braises crépitantes du feu de cheminée (`@keyframes fireplace-hearth-glow`), guirlandes lumineuses du sapin, flocons de neige tombant doucement à la fenêtre et vapeur du chocolat chaud.
  3. 🌸🐒 **Onsen & Sakura au Japon** : Vapeur thermale minérale montante (`@keyframes onsen-steam-rise`), pétales de cerisiers (sakura) oscillant au vent et reflets dorés des lanternes ishidoro.
  4. 🤍 **Cœur de Sélénite** : Aura respirante cyan-blanche éthérée émanant du cœur de cristal (`@keyframes selenite-core-pulse`), reflets prismatiques scintillants et flamme sacrée de bougie.
  5. ⚖️💻 **LegalTech & Zen Code** : Particules de code de jurisprudence émeraude flottant vers le haut (`@keyframes cyber-matrix-float`), scintillement des balances de Thémis et lueur phosphorique du terminal.
  6. ☀️ **Un jour à la fois** : Rayon de soleil matinal traversant l'amphithéâtre (`@keyframes amphi-sunbeam-stream`), poussières dorées flottant dans la lumière et vapeur du café chaud du matin.
  7. 🍃 **Minimaliste** : Vagues d'aurore pastel douces respirant harmonieusement en arrière-plan (`@keyframes minimalist-aurora-breath`).
- **Changement en 1 clic & Galerie visuelle** :
  - **Clic direct** sur le bouton de fond : cycle instantanément vers l'ambiance suivante !
  - **Flèche déroulante (▼)** : ouvre la galerie pour sélectionner précisément parmi les 7 ambiances et ajuster l'intensité :
  - **Réglage d'intensité** : *Discrète (40%)*, *Équilibrée (75%)* ou *Immersive (95%)*.

### 7. 📜 Code de Survie, Guide « Tout en douceur » & Système de Grades
- **Accès différencié** :
  - Clic sur **« Grade : L1 Découverte »** : ouvre directement votre échelle de rangs et les 5 commandements.
  - Clic sur **« Code de survie »** : ouvre directement le Guide Visuel Haute Définition méthodologique.
- **Guide Visuel Haute Résolution** : L'infographie *« Réussir ses études de Droit (tout en douceur !) »* est intégrée avec zoom haute définition et mode plein écran.
- **Les 5 Commandements du Juriste** :
  1. *Art. 1 : Le Dogme du Plan Binaire (I-A, I-B, II-A, II-B)*
  2. *Art. 2 : L'Immunité de l'Arrêt Blanco du 8 février 1873*
  3. *Art. 3 : La Magie du Stabilo Pastel*
  4. *Art. 4 : La Vraie Victoire : Le 10,01 compensé*
  5. *Art. 5 : La Phrase Passe-Partout (« Il convient d'opérer une distinction... »)*
- **Montée en grade automatique** :
  - 🎓 *Étudiant perdu en amphi* (L1 Découverte)
  - ✒️ *Scribe de Fiches d'Arrêt* (L2 Affûté)
  - 📖 *Exégète du Code Civil* (Adepte de Portalis)
  - ⚖️ *Plaideur Hors-Pair* (Ténor du Prétoire)
  - 🏆 *Major(e) de Promotion* (Grand Duc du Barreau)

---

## ⌨️ Raccourcis & Ergonomie

| Raccourci / Action | Effet |
| :--- | :--- |
| **Clic sur le bouton Fond d'écran** | Passe directement au fond d'écran suivant dans la liste |
| **Clic sur la flèche (▼) du Fond** | Ouvre la galerie avec aperçu des 6 fonds et sélecteur d'intensité (40%, 75%, 95%) |
| **Bouton Plein Écran (ou Échap)** | Active ou quitte le mode plein écran immersif sans bordure de navigateur |
| **Clic sur « Grade : ... »** | Ouvre la modale sur l'onglet des rangs et de progression |
| **Clic sur « Code de survie »** | Ouvre la modale sur le guide visuel méthodologique |
| **Bouton « Alerte bureau »** | Active ou teste les notifications système natives du navigateur |

---

## 🌐 Déploiement GitHub Pages (Dossier `/docs`)

L'application est 100 % configurée pour être hébergée sans aucune page blanche sur **GitHub Pages** :

### Pourquoi la page blanche apparaissait-elle ?
1. **Chemins absolus vs relatifs** : Par défaut, Vite générait des liens absolus (`/assets/index.js`), qui renvoyaient une erreur 404 sur les sous-domaines GitHub (`elisencode.github.io/motivation-timer-licence-de-droit/`). En définissant `base: './'`, tous les chemins sont désormais relatifs (`./assets/index.js`).
2. **Dossier de publication `/docs`** : GitHub Pages était configuré sur la branche `main` et le dossier `/docs`, alors que le dossier de build par défaut était `dist/`. La configuration `build: { outDir: 'docs' }` compile désormais directement dans `docs/`.
3. **Fichier `.nojekyll`** : Présent à la racine de `docs/` pour empêcher le moteur Jekyll de GitHub d'ignorer certains fichiers d'actifs.

### Configuration GitHub Pages :
1. Sur votre dépôt GitHub : rendez-vous dans **Settings** > **Pages**.
2. Dans **Build and deployment** > **Source** : sélectionnez **Deploy from a branch**.
3. Sous **Branch** : choisissez **`main`** et le dossier **`/docs`**, puis cliquez sur **Save**.
4. Après le push ou la compilation via `npm run build`, votre site est immédiatement opérationnel sur :
   👉 **`https://elisencode.github.io/motivation-timer-licence-de-droit/`**

---

## 🛡️ Contrôle de Cybersécurité & RGPD

Ce projet GitHub a fait l'objet d'un contrôle rigoureux de cybersécurité et de conformité aux normes européennes de protection des données :

| Critère de Sécurité | Mesure Mise en Œuvre | Statut |
| :--- | :--- | :--- |
| **Architecture Local-First** | 100 % de l'exécution s'effectue dans le navigateur de l'étudiant. Aucune donnée d'étude, statistique ou identifiant n'est transmis à un serveur tiers. | ✅ Conforme |
| **Stockage sécurisé** | Utilisation sécurisée de l'API standard `localStorage` encapsulée dans des blocs `try/catch` pour parer toute altération ou injection. | ✅ Sécurisé |
| **Protection contre les failles XSS** | Rendu sécurisé React (aucun usage de `dangerouslySetInnerHTML`), contrôle de typage strict TypeScript, assainissement des chaînes injectées. | ✅ Protégé |
| **Protection contre les attaques CSRF & Injection** | Pas d'APIs mutatives distantes, pas d'exécution de code dynamique (`eval`), ressources hébergées localement. | ✅ Protégé |
| **Respect de la vie privée (RGPD & CNIL)** | Zéro traqueur d'audience, zéro cookie publicitaire, zéro télémétrie invasive. L'étudiant conserve le contrôle souverain de ses données. | ✅ 100 % Conforme |
| **Web Notifications API** | Déclenchement conditionné à l'autorisation explicite de l'utilisateur (`Notification.requestPermission()`). Aucun serveur push distant. | ✅ Conforme |
| **Politique de Sécurité GitHub** | Présence d'un fichier `SECURITY.md` formalisant la procédure de divulgation responsable de vulnérabilités (*Responsible Disclosure*). | ✅ Documenté |

---

## ⚖️ Propriété Intellectuelle & Droit d'Auteur

Le statut juridique du projet sur GitHub est strictement encadré par le droit d'auteur français (Code de la propriété intellectuelle - CPI) et les standards du logiciel libre :

1. **Licence du Code Source (Apache 2.0)** :
   - Le code source original de l'application est publié sous licence **Apache 2.0** (voir fichier `LICENSE`).
   - Cette licence autorise la consultation, la duplication (fork), la modification et la réutilisation du code, y compris pour des projets dérivés, sous réserve de conserver les mentions de copyright et de paternité de l'auteur original.

2. **Citations Législatives, Jurisprudentielles & Doctrinales** :
   - Les extraits de textes juridiques officiels (Code civil, Code pénal, arrêts du Conseil d'État et de la Cour de cassation, citations de Portalis ou de grands jurisconsultes) sont insusceptibles d'appropriation privative en vertu de la doctrine et de l'article **L. 122-5 du Code de la propriété intellectuelle (CPI)** régissant les actes officiels et les courtes citations à des fins pédagogiques et critiques.

3. **Créations Visuelles & Fonds d'Écran** :
   - Les arrière-plans artistiques et illustrations intégrés au projet sont exploités dans un cadre d'accompagnement éducatif et de motivation des étudiants en droit.
   - Les droits moraux (droit à la paternité et respect de l'œuvre) sont pleinement réservés à leurs auteurs respectifs.

4. **Patrimoine Acoustique (Cloches & Effets sonores)** :
   - L'enregistrement et les harmoniques de la cloche de cathédrale (Bourdon) appartiennent au patrimoine acoustique et culturel, libres de réutilisation dans un cadre d'application pédagogique sans exploitation commerciale payante.

---

## 🛠️ Stack Technique

- **Framework** : [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Outil de build** : [Vite 6](https://vitejs.dev/) (Configuration `base: './'` et `outDir: 'docs'`)
- **Styles & Design** : [Tailwind CSS v4](https://tailwindcss.com/) (Palette pastel douce & Mode sombre natif `@custom-variant dark`)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Animations & Confettis** : [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **API Navigateur** : Web Notifications API (HTML5) & Fullscreen API
- **Audio immersif** : Cloche de cathédrale solennelle avec double architecture (fichier audio haute fidélité + moteur de synthèse Web Audio acoustique sans latence)

---

## 🚀 Installation et Lancement Local

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou bun

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/elisencode/motivation-timer-licence-de-droit.git
   cd motivation-timer-licence-de-droit
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   L'application s'ouvre sur `http://localhost:3000`.

4. **Compiler pour GitHub Pages (`docs/`) :**
   ```bash
   npm run build
   ```

---

<div align="center">

*Réalisé avec passion pour accompagner tous les étudiants en Droit vers la réussite et la toge d'avocat ou de magistrat.*  
**Attendu que la volonté ne faiblit jamais : bon courage pour vos révisions ! ⚖️**

</div>
