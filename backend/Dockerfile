# Utilise l'image officielle de Node.js
FROM node:18

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers du backend
COPY . .

# Expose le port 5000
EXPOSE 5000

# Commande pour démarrer le backend
CMD ["node", "src/app.js"]