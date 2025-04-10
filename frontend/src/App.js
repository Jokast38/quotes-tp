import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [showForm, setShowForm] = useState(false); // État pour afficher ou masquer le formulaire
  const [newQuote, setNewQuote] = useState({ author: '', text: '' }); // État pour les données du formulaire

  const splitWords = useCallback(() => {
    let quoteElement = document.querySelector("blockquote");
    if (!quoteElement) return;

    let quotewords = quoteElement.innerText.split(" ");
    let wordCount = quotewords.length;
    quoteElement.innerHTML = "";

    for (let i = 0; i < wordCount; i++) {
      quoteElement.innerHTML += "<span>" + quotewords[i] + "</span>";
      if (i < quotewords.length - 1) {
        quoteElement.innerHTML += " ";
      }
    }

    let wordSpans = document.querySelectorAll("blockquote span");
    fadeWords(wordSpans);
  }, []);

  const fadeWords = useCallback((quotewords) => {
    Array.prototype.forEach.call(quotewords, function (word) {
      word.animate(
        [
          {
            opacity: 0,
            filter: "blur(" + getRandom(2, 5) + "px)"
          },
          {
            opacity: 1,
            filter: "blur(0px)"
          }
        ],
        {
          duration: 1000,
          delay: getRandom(500, 3300),
          fill: "forwards"
        }
      );
    });
  }, []);

  const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    axios.get('http://localhost:5000/quotes')
      .then(response => {
        setQuote(response.data.text);
        setAuthor(response.data.author);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la citation:', error);
      });
  }, []);

  useEffect(() => {
    if (quote) {
      splitWords();
    }
  }, [quote, splitWords]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Envoie une requête POST pour ajouter une nouvelle citation
    axios.post('http://localhost:5000/quotes', newQuote)
      .then(response => {
        alert('Citation ajoutée avec succès !');
        setShowForm(false); // Masque le formulaire après l'ajout
        setNewQuote({ author: '', text: '' }); // Réinitialise le formulaire
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la citation:', error);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Citation du jour</h1>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-quotes/bulb.webp"
          alt="Bulb"
        />
        <blockquote>
          {quote || 'Chargement...'}
        </blockquote>
        <p className="author">
          {author && `— ${author}`}
        </p>
        <button onClick={() => setShowForm(!showForm)} className="add-quote-btn">
          {showForm ? 'Annuler' : 'Ajouter une citation'}
        </button>
        {showForm && (
          <form onSubmit={handleFormSubmit} className="quote-form">
            <input
              type="text"
              placeholder="Auteur"
              value={newQuote.author}
              onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
              required
            />
            <textarea
              placeholder="Texte de la citation"
              value={newQuote.text}
              onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
              required
            ></textarea>
            <button type="submit">Ajouter</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;