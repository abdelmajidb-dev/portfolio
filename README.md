# Portfolio - AbdelMajid Boukhlik

Portfolio professionnel de Développeur Full-Stack & Cybersécurité

## 🚀 Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styling moderne avec variables CSS, Flexbox, Grid
- **JavaScript Vanilla** - Interactions et animations
- **Google Fonts** - Orbitron, Space Mono, Outfit
- **Font Awesome 6** - Icônes

## ✨ Fonctionnalités

- ✅ Design responsive (Mobile First)
- ✅ Mode sombre/clair avec persistance
- ✅ Animations fluides au scroll
- ✅ Filtre de projets et compétences
- ✅ Effet de texte dactylographié
- ✅ Compteurs animés
- ✅ Formulaire de contact
- ✅ Navigation smooth scroll
- ✅ Menu burger mobile
- ✅ Effets 3D sur les cartes projets

## 📁 Structure du projet

```
portfolio/
│
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles CSS
├── js/
│   └── script.js       # JavaScript
├── assets/             # Images et ressources (à ajouter)
└── README.md           # Documentation
```

## 🎨 Personnalisation

### Couleurs (variables CSS)

Vous pouvez modifier les couleurs dans `:root` dans `css/style.css` :

```css
--accent-primary: #00f0ff;    /* Bleu cyber */
--accent-secondary: #00ff88;  /* Vert cyber */
```

### Contenu

Modifiez le contenu directement dans `index.html` :
- Informations personnelles dans la section Hero
- Projets dans la section Projects
- Expériences dans la section Experience
- etc.

### Images de projets

Ajoutez vos images de projets dans le dossier `assets/` et remplacez les placeholders :

```html
<!-- Dans index.html -->
<div class="project-image">
    <img src="assets/projet-1.jpg" alt="Description du projet">
</div>
```

## 📧 Configuration du formulaire de contact

Le formulaire de contact est actuellement configuré pour afficher une alerte. Pour l'activer :

### Option 1 : EmailJS (Recommandé)

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurez un service email
3. Créez un template
4. Ajoutez le SDK dans `index.html` :

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

5. Décommentez et configurez le code dans `js/script.js` (section Contact Form)

### Option 2 : Formspree

1. Créez un compte sur [Formspree](https://formspree.io/)
2. Modifiez le formulaire :

```html
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
```

## 🌐 Déploiement sur GitHub Pages

### Étape 1 : Préparer le repository

1. Assurez-vous que tous vos fichiers sont prêts
2. Vérifiez que `index.html` est à la racine du projet

### Étape 2 : Créer le repository GitHub

1. Allez sur [GitHub](https://github.com)
2. Cliquez sur **"New repository"** (bouton vert en haut à droite)
3. Nommez votre repository (exemple: `portfolio` ou `mon-nom-portfolio`)
4. Choisissez **Public**
5. NE COCHEZ PAS "Initialize with README" (nous avons déjà nos fichiers)
6. Cliquez sur **"Create repository"**

### Étape 3 : Pousser votre code sur GitHub

#### Option A : Via ligne de commande (Git)

Ouvrez un terminal dans le dossier de votre projet et exécutez :

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Faire un commit
git commit -m "Premier commit - Portfolio"

# Ajouter le repository distant (remplacez VOTRE-USERNAME et NOM-DU-REPO)
git remote add origin https://github.com/VOTRE-USERNAME/NOM-DU-REPO.git

# Pousser vers GitHub
git branch -M main
git push -u origin main
```

#### Option B : Via GitHub Desktop (Interface graphique)

1. Téléchargez [GitHub Desktop](https://desktop.github.com/)
2. Ouvrez GitHub Desktop
3. Cliquez sur **"Add"** → **"Add existing repository"**
4. Sélectionnez le dossier de votre portfolio
5. Faites un commit avec un message (ex: "Premier commit")
6. Cliquez sur **"Publish repository"**
7. Assurez-vous que le repository est **Public**
8. Cliquez sur **"Publish repository"**

#### Option C : Glisser-déposer sur GitHub (le plus simple)

1. Allez sur la page de votre repository nouvellement créé
2. Cliquez sur **"uploading an existing file"**
3. Glissez-déposez tous vos fichiers et dossiers
4. Ajoutez un message de commit
5. Cliquez sur **"Commit changes"**

### Étape 4 : Activer GitHub Pages

1. Sur votre repository GitHub, allez dans **"Settings"** (onglet en haut)
2. Dans le menu de gauche, cliquez sur **"Pages"**
3. Sous **"Source"**, sélectionnez :
   - Branch: **main** (ou master)
   - Folder: **/ (root)**
4. Cliquez sur **"Save"**
5. Attendez 1-2 minutes

### Étape 5 : Accéder à votre site

Votre site sera disponible à l'adresse :

```
https://VOTRE-USERNAME.github.io/NOM-DU-REPO/
```

Exemple : `https://abdelmajid.github.io/portfolio/`

### Étape 6 : Personnaliser le domaine (Optionnel)

Si vous voulez un domaine personnalisé comme `abdelmajid.dev` :

1. Achetez un nom de domaine (chez Namecheap, OVH, etc.)
2. Dans les paramètres DNS de votre domaine, ajoutez :
   ```
   Type: CNAME
   Name: www
   Value: VOTRE-USERNAME.github.io
   ```
3. Dans GitHub Pages Settings, ajoutez votre **Custom domain**
4. Cochez **"Enforce HTTPS"**

## 🔄 Mettre à jour votre site

### Via ligne de commande

```bash
# Après avoir modifié vos fichiers
git add .
git commit -m "Description des modifications"
git push
```

### Via GitHub Desktop

1. Ouvrez GitHub Desktop
2. Vos modifications apparaîtront automatiquement
3. Ajoutez un message de commit
4. Cliquez sur **"Commit to main"**
5. Cliquez sur **"Push origin"**

### Via interface GitHub

1. Naviguez vers le fichier à modifier
2. Cliquez sur l'icône crayon ✏️
3. Faites vos modifications
4. Cliquez sur **"Commit changes"**

## 🐛 Dépannage

### Le site ne s'affiche pas

- Vérifiez que GitHub Pages est activé dans Settings
- Attendez 2-5 minutes après activation
- Assurez-ez que `index.html` est à la racine

### Les images ne s'affichent pas

- Utilisez des chemins relatifs : `./assets/image.jpg` au lieu de `/assets/image.jpg`
- Vérifiez que les fichiers sont bien uploadés

### Les styles ne s'appliquent pas

- Vérifiez les chemins dans `index.html` :
  ```html
  <link rel="stylesheet" href="css/style.css">
  ```

### Le JavaScript ne fonctionne pas

- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Vérifiez le chemin :
  ```html
  <script src="js/script.js"></script>
  ```

## 📝 Checklist avant déploiement

- [ ] Remplacez les placeholders (liens GitHub, LinkedIn, etc.)
- [ ] Ajoutez vos vraies images de projets
- [ ] Testez tous les liens
- [ ] Vérifiez le formulaire de contact
- [ ] Testez sur mobile et desktop
- [ ] Validez votre HTML/CSS (W3C Validator)
- [ ] Optimisez les images (compression)
- [ ] Testez le mode sombre

## 🎯 Améliorations futures possibles

- [ ] Ajouter un blog
- [ ] Intégrer Google Analytics
- [ ] Ajouter des animations Lottie
- [ ] Créer une section Témoignages
- [ ] Ajouter un module de téléchargement CV
- [ ] Intégrer votre calendrier Calendly
- [ ] Ajouter une page 404 personnalisée

## 📞 Support

Pour toute question :
- Email : pro.abdelboukhlik@gmail.com
- GitHub Issues : [Créer une issue](https://github.com/VOTRE-USERNAME/NOM-DU-REPO/issues)

## 📄 Licence

Ce portfolio est sous licence MIT. Vous êtes libre de l'utiliser comme template.

---

**Développé avec ❤️ par AbdelMajid Boukhlik**
