const express = require('express');

const router = express.Router();

// Sample data (replace with database or other data source)
let quotes = [
    { id: 1, author: "Albert Einstein", text: "Life is like riding a bicycle. To keep your balance, you must keep moving." },
    { id: 2, author: "Oscar Wilde", text: "Be yourself; everyone else is already taken." },
    { id: 3, author: "Mahatma Gandhi", text: "Be the change that you wish to see in the world." }
];

// Get a random quote
router.get('/', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.json(randomQuote); // Retourne une citation aléatoire
});

// Get a single quote by ID
router.get('/:id', (req, res) => {
    const quote = quotes.find(q => q.id === parseInt(req.params.id));
    if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
    }
    res.json(quote);
});

// Add a new quote
router.post('/', (req, res) => {
    const { author, text } = req.body;
    if (!author || !text) {
        return res.status(400).json({ message: "Author and text are required" });
    }
    const newQuote = {
        id: quotes.length + 1,
        author,
        text
    };
    quotes.push(newQuote);
    res.status(201).json(newQuote);
});

// Update a quote by ID
router.put('/:id', (req, res) => {
    const quote = quotes.find(q => q.id === parseInt(req.params.id));
    if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
    }
    const { author, text } = req.body;
    if (author) quote.author = author;
    if (text) quote.text = text;
    res.json(quote);
});

// Delete a quote by ID
router.delete('/:id', (req, res) => {
    const quoteIndex = quotes.findIndex(q => q.id === parseInt(req.params.id));
    if (quoteIndex === -1) {
        return res.status(404).json({ message: "Quote not found" });
    }
    quotes.splice(quoteIndex, 1);
    res.status(204).send();
});

module.exports = router;