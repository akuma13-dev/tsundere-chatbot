const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../services/aiService');

router.post('/', async (req, res) => {
    const { message, history } = req.body;
    try {
        const aiText = await getChatResponse(message, history);
        res.json({ text: aiText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ text: "Duh, otaknya Mini-chan lagi konslet, Baka! 💢" });
    }
});

module.exports = router;