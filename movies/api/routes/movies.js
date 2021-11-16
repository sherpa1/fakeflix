const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies_controller');


router.get('/', async (req, res, next) => {
    const items = await controller.read();
    res.status(200).json(items);
});

module.exports = router;