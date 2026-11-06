# 🛡️ Politique de Sécurité & Cybersécurité · Motivation Timer Droit

## 1. Engagement de Sécurité & Confidentialité
Le projet **Motivation Timer · Licence de Droit** accorde une priorité absolue à la cybersécurité, à l'intégrité du code et à la protection de la vie privée des étudiants.

### Architecture « Zero-Server » / Local-First
- **Aucune transmission de données** : Toutes les sessions, durées d'études et statistiques sont traitées en local dans le navigateur du client.
- **Stockage local exclusif** : Les données sont stockées au moyen de l'API standard `localStorage` sans aucune persistance sur un serveur applicatif.
- **Conformité RGPD / e-Privacy** : Aucun cookie tiers, aucun traqueur d'audience (zéro Google Analytics, Meta Pixel ou régie publicitaire), aucune collecte de données personnelles nominatives.

---

## 2. Mesures Techniques de Sécurité
- **Protection contre les injections XSS** : Rendu sécurisé assuré par React (absence totale de `dangerouslySetInnerHTML`).
- **Typage statique strict** : Codebase 100 % TypeScript sans types implicites permissifs.
- **Web Notifications API** :
  - Déclenchée exclusivement à la demande de l'utilisateur (`Notification.requestPermission()`).
  - Aucun token ou canal push distant : les notifications sont générées localement par le navigateur (`new Notification(...)`).
- **Contrôle des ressources** :
  - L'ensemble des images et fichiers audio est hébergé localement dans `/public/assets`.
  - Pas d'appels à des CDN non fiables à l'exécution.

---

## 3. Signalement d'une Vulnérabilité (Responsible Disclosure)
Si vous identifiez une faille de sécurité ou une faiblesse potentielle dans cette application :
1. **Ne pas ouvrir d'issue publique** afin de protéger les utilisateurs.
2. Contactez directement les mainteneurs du projet via l'onglet *Security Advisories* de GitHub ou par email sécurisé.
3. Nous nous engageons à analyser et corriger tout signalement vérifié dans un délai de 48 heures.

---

## 4. Propriété Intellectuelle & Droit d'Auteur
- **Code Source** : Distribué sous licence **Apache 2.0**.
- **Citations Juridiques** : Textes législatifs, jurisprudentiels et citations doctrinales reproduits conformément à l'article L. 122-5 du Code de la propriété intellectuelle (CPI) français.
- **Assets graphiques & sonores** : Utilisés avec respect des droits moraux et dans un cadre pédagogique bienveillant.
