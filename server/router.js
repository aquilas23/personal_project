const express = require('express');
const router = express.Router();

router.get('/' , (req, res) => {
    res.send('Chat server running');
});

module.exports= router;
