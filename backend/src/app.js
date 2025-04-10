const express = require('express');
const cors = require('cors'); // Importer le middleware CORS
const app = express();
const quotesRouter = require('./quotes'); // Importer le routeur
const PORT = 5000;

// Activer CORS pour toutes les origines
app.use(cors());

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Utiliser le routeur pour les routes commençant par /quotes
app.use('/quotes', quotesRouter);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});