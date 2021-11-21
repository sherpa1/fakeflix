const express = require('express');
const router = express.Router();

const { create, read, update, del, patch } = require('../controllers/movies_controller');


router.get('/', async (req, res, next) => {
    const items = await read();
    res.status(200).json(items);
});

module.exports = router;