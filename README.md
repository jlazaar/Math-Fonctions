# 🔢 Explorateur Interactif de Fonctions Mathématiques

Une application web interactive pour apprendre et comprendre l'effet des paramètres sur différents types de fonctions mathématiques.

## 📚 Description

Cette application éducative permet aux étudiants et enseignants d'explorer visuellement comment les paramètres affectent les courbes de fonctions mathématiques. Elle comprend un explorateur interactif et une série d'exercices pour tester vos connaissances.

## ✨ Fonctionnalités

### 🎯 Explorateur de Fonctions

L'explorateur permet de manipuler en temps réel les paramètres de 4 types de fonctions :

#### 📈 Fonctions Linéaires : `f(x) = ax + b`
- Ajustement de la pente (a)
- Ajustement de l'ordonnée à l'origine (b)
- Visualisation du point d'intersection avec l'axe Y

#### 📊 Fonctions Quadratiques : `f(x) = a(x - h)² + k`
- Contrôle de l'ouverture et orientation (a)
- Translation horizontale (h)
- Translation verticale (k)
- Affichage des coordonnées du sommet

#### 📉 Fonctions Exponentielles : `f(x) = a · b^(x - h) + k`
- Dilatation verticale (a)
- Modification de la base (b)
- Translations horizontale et verticale
- Visualisation des asymptotes

#### 🌊 Fonctions Trigonométriques : `f(x) = a · sin(b(x - h)) + k`
- Contrôle de l'amplitude (a)
- Ajustement de la fréquence (b)
- Déphasage horizontal (h)
- Translation verticale (k)
- Calcul et affichage de la période

### 📝 Page d'Exercices

7 exercices interactifs de difficulté progressive :

1. **Identifier les paramètres** (Facile - 10 pts)
   - Questions générées aléatoirement
   - Identification des paramètres a et b dans les fonctions linéaires

2. **Sommet de la parabole** (Facile - 10 pts)
   - Trouver les coordonnées du sommet d'une parabole
   - Questions aléatoires pour pratique illimitée

3. **Choix multiple - Effet des paramètres** (Moyen - 15 pts)
   - Questions conceptuelles sur le rôle des paramètres
   - Feedback visuel immédiat

4. **Associer fonction et graphique** (Moyen - 20 pts)
   - Reconnaître une fonction à partir de son graphique
   - Graphiques générés dynamiquement

5. **Période trigonométrique** (Difficile - 20 pts)
   - Calculer la période de fonctions sinusoïdales
   - Application de la formule 2π/|b|

6. **Construire une fonction** (Difficile - 25 pts)
   - Créer une fonction respectant des critères donnés
   - Prévisualisation en temps réel

7. **Transformation interactive** (Moyen - 30 pts)
   - Faire correspondre une courbe avec une cible
   - Ajustement visuel avec sliders

### 🏆 Système de Score
- Score total persistant (sauvegardé localement)
- Compteur d'exercices réussis
- Possibilité de réinitialiser la progression

## 🚀 Installation et Utilisation

### Utilisation locale

1. Clonez ce dépôt :
```bash
git clone https://github.com/VOTRE-USERNAME/Math-1.git
cd Math-1
```

2. Ouvrez `index.html` dans votre navigateur web préféré

Aucune installation de dépendances n'est nécessaire ! L'application fonctionne entièrement avec HTML, CSS et JavaScript vanilla.

### Déploiement avec GitHub Pages

1. Allez dans les paramètres de votre dépôt GitHub
2. Dans la section "Pages", sélectionnez la branche `main` comme source
3. Votre site sera disponible à l'adresse : `https://VOTRE-USERNAME.github.io/Math-1/`

## 🛠️ Technologies Utilisées

- **HTML5** - Structure de l'application
- **CSS3** - Design moderne et responsive
  - Variables CSS
  - Flexbox et Grid
  - Animations et transitions
- **JavaScript (Vanilla)** - Logique interactive
  - Canvas API pour le rendu des graphiques
  - localStorage pour la persistance des données
  - Programmation orientée objet

## 📁 Structure du Projet

```
Math-1/
├── index.html           # Page principale (explorateur)
├── exercises.html       # Page d'exercices
├── styles.css          # Styles communs
├── exercises.css       # Styles spécifiques aux exercices
├── script.js           # Logique de l'explorateur
├── exercises.js        # Logique des exercices
└── README.md           # Documentation
```

## 🎨 Captures d'écran

### Explorateur de Fonctions
Manipulez les paramètres et voyez les changements en temps réel sur les graphiques.

### Page d'Exercices
Testez vos connaissances avec 7 exercices interactifs de difficulté croissante.

## 🎓 Cas d'Usage Pédagogiques

- **Enseignants** : Démonstrations en classe pour illustrer l'effet des paramètres
- **Étudiants** : Auto-apprentissage et révision des concepts
- **Devoirs** : Exercices interactifs pour pratiquer
- **Tutoriels** : Support visuel pour expliquer les transformations de fonctions

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 👨‍💻 Auteur

Créé avec passion pour faciliter l'apprentissage des mathématiques.

## 🌟 Améliorations Futures

- [ ] Ajout de fonctions logarithmiques
- [ ] Mode sombre
- [ ] Export des graphiques en image
- [ ] Plus d'exercices et de niveaux de difficulté
- [ ] Support multilingue
- [ ] Mode comparaison de deux fonctions
- [ ] Historique des transformations

---

⭐ Si ce projet vous aide, n'hésitez pas à lui donner une étoile sur GitHub !
