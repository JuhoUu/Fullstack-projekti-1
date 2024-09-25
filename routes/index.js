const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// File path for the JSON messages
const messagesFilePath = path.join(__dirname, '../data/messages.json');

// Utility to read messages from JSON file
const readMessages = () => {
    const messages = fs.readFileSync(messagesFilePath);
    return JSON.parse(messages);
};

// Utility to write messages to JSON file
const writeMessages = (messages) => {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
};

// Frontpage route
router.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Our Guestbook' });
});

// Guestbook route (displays messages)
router.get('/guestbook', (req, res) => {
    const messages = readMessages();
    res.render('guestbook', { messages });
});

// New message form route
router.get('/newmessage', (req, res) => {
    res.render('newmessage');
});

router.post('/newmessage', (req, res) => {
    const { username, country, message } = req.body;

    if (!username || !country || !message) {
        return res.status(400).send('All fields are required!');
    }

    const newMessage = {
        username,
        country,
        message,
        timestamp: new Date().toISOString()
    };

    const messages = readMessages();
    messages.push(newMessage);
    writeMessages(messages);

    res.redirect('/guestbook');
});

// AJAX message form route
router.get('/ajaxmessage', (req, res) => {
    res.render('ajaxmessage');
});

router.post('/ajaxmessage', (req, res) => {
    const { username, country, message } = req.body;

    if (!username || !country || !message) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const newMessage = {
        username,
        country,
        message,
        timestamp: new Date().toISOString()
    };

    const messages = readMessages();
    messages.push(newMessage);
    writeMessages(messages);

    res.json(messages); // Return all messages to be displayed on the page
});

module.exports = router;
