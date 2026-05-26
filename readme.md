Bienvenue sur le dépôt officiel du projet **Arducible**, un système de jeu de pétanque arcade interactif alliant un socle électromécanique physique (piloté par microcontrôleur) et une interface web ultra-immersive aux accents *Synthwave* et *Heroic Fantasy*.

Ce projet est entièrement open-source, orienté vers la souveraineté des données, la légèreté numérique et une exécution locale sans dépendance à des infrastructures cloud ou à des runtimes lourds.

---

## 🚀 Fonctionnalités du Logiciel (V11)

L'application principale est une **PWA (Progressive Web App)** encapsulée dans un fichier HTML5/JavaScript unique, hautement optimisée pour tourner en local sur n'importe quel système (particulièrement adapté pour un environnement **Debian Linux**).

* **Mode Time-Attack Évolutif** : Le joueur dispose d'un capital temps initial pour marquer un maximum de points. Chaque tir réussi octroie un bonus de temps configurable.
* **Progression Dynamique par Niveaux** : Le jeu intègre 5 environnements vectoriels (SVG pur) qui s'activent tous les 10 points :
    1.  *Plage Néon* (Cyan)
    2.  *Zénith Alpin* (Blanc Glace)
    3.  *Précision Vert* (Vert Matrice)
    4.  *Cyber City* (Magenta)
    5.  *Finale Mondiale* (Or/Jaune)
* **Moteur d'Effets Visuels (VFX Canvas)** : Un système de particules s'adapte en temps réel à l'univers graphique (vagues bioluminescentes, chutes de neige polaire, feuilles au vent, trafic laser urbain, pluie de confettis avec secousse de l'écran lors des impacts au niveau 5).
* **Synthétiseur Audio & Longtrack Héroïque** : Une partition musicale *Heroic Fantasy* de 3 minutes (en Mi Mineur) est générée mathématiquement par l'API Web Audio du navigateur (aucun fichier MP3 lourd requis). **Le tempo de la musique s'accélère dynamiquement** lorsque le chronomètre s'approche de zéro pour accentuer la tension dramatique.
* **Alerte Chronomètre Tricolore** : Le timer passe automatiquement du Vert à l'Orange (en dessous de 40s) puis au Rouge Clignotant (en dessous de 15s).
* **Hall of Fame d'Époque** : Sauvegarde locale persistante (`localStorage`) des 5 meilleurs scores. En fin de partie, le joueur saisit ses initiales sur 3 lettres en utilisant directement les cibles physiques.

---

## 🛠️ Architecture Matérielle & Rétro-ingénierie

Le système s'appuie sur une émulation clavier native pour garantir une latence minimale et une compatibilité universelle sans pilote spécifique :

1.  **Le Socle** : Comporte 3 cibles physiques équipées de capteurs d'impact ou de boutons-poussoirs.
2.  **Le Microcontrôleur** : Un **Arduino Leonardo** (puce ATmega32U4). Grâce à sa gestion native de l'USB, il utilise la bibliothèque `Keyboard.h` pour agir comme un périphérique HID (clavier standard d'ordinateur).
3.  **Filtre anti-rebond (Debouncing)** : Le code injecté dans le Leonardo applique un verrouillage temporel court lors d'un impact de boule de pétanque afin d'éviter l'envoi de frappes multiples et parasites.

### Cartographie des Touches

| Action Physique | Émulation Clavier (HID) | Rôle en Jeu (Mode Match) | Rôle en Saisie (Hall of Fame) |
| :--- | :--- | :--- | :--- |
| **Impact Cible 1** | Touche `E` | Frapper la Cible 1 | Faire défiler la lettre vers le haut (`A -> B`) |
| **Impact Cible 2** | Touche `R` | Frapper la Cible 2 | Faire défiler la lettre vers le bas (`C -> B`) |
| **Impact Cible 3** | Touche `T` | Frapper la Cible 3 / Start | Valider la lettre / Passer à la lettre suivante |

---

## 📦 Installation & Déploiement Local

Fidèle aux principes de simplicité système et de performance brute, le projet **ne nécessite pas Docker** ni de serveur d'application complexe (Node.js, Apache, etc.).

### Prérequis
* Un ordinateur embarqué (PC de récupération, Raspberry Pi ou terminal d'arcade dédié) équipé de **Debian** ou de n'importe quelle distribution Linux/OS standard.
* Un navigateur web moderne respectant les standards Web Audio et Canvas (Chromium ou Firefox recommandés).

### Étapes d'installation
1.  **Cloner le dépôt** :
    ```
```text?code_stdout&code_event_index=2
README.md généré avec succès.

```bash
    git clone [https://github.com/votre-compte/arducible-petanque.git](https://github.com/votre-compte/arducible-petanque.git)
    cd arducible-petanque
    ```
2.  **Lancer le jeu** :
    Ouvrez simplement le fichier `arducible_v11_tempo_fix.html` dans votre navigateur web :
    ```bash
    xdg-open arducible_v11_tempo_fix.html
    ```
3.  **Installation PWA (Optionnel)** :
    Cliquez sur l'icône d'installation dans la barre d'adresse du navigateur pour ajouter le jeu à votre système. Il pourra ainsi s'exécuter en plein écran, sans bordure de fenêtre, et de manière totalement **hors-ligne** sur vos terrains de pétanque.

---

## ⚙️ Fichier de Configuration Interne

Le comportement du jeu peut être entièrement personnalisé sans toucher à l'architecture globale du code. Ouvrez le fichier HTML avec votre éditeur de texte favori (`nano`, `micro`, etc.) et ajustez le bloc d'objet global `ARDUCIBLE_CONFIG` situé au début de la balise script (aux alentours de la ligne 250) :

```javascript
const ARDUCIBLE_CONFIG = {
    initialTime: 60,         // Temps de départ accordé au joueur (en secondes)
    bonusTime: 5,            // Temps additionnel cumulé à chaque cible touchée (en secondes)
    orangeAlertTime: 40,     // Seuil de passage du chronomètre à la couleur ORANGE (en secondes)
    redAlertTime: 15,        // Seuil de déclenchement de l'alerte ROUGE CLIGNOTANTE (en secondes)
    
    // Réglages fins de la vitesse et de la tension de la musique
    musicBaseTempo: 0.15,    // Durée d'une note au départ (en s). Plus la valeur est élevée, plus c'est lent.
    musicMaxTempo: 0.10,     // Durée d'une note quand le chrono approche de 0s (vitesse maximale).
    
    // Seuils de points requis pour franchir les paliers de niveaux
    levelThresholds: {
        level1: 0,           // Score requis pour le Niveau 1 (Plage Néon)
        level2: 10,          // Score requis pour le Niveau 2 (Zénith Alpin)
        level3: 20,          // Score requis pour le Niveau 3 (Précision Vert)
        level4: 30,          // Score requis pour le Niveau 4 (Cyber City)
        level5: 40           // Score requis pour le Niveau 5 (Finale Mondiale)
    }
};
