const express = require('express');
const router = express.Router();

router.get('/join' , (req, res) => {
    res.send('Chat server running');
});

module.exports= router;
