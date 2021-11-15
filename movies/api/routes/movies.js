const controller = require('../controllers/movies_controller');

const router = require('router');

router.get('/', async (req, res, next) => {
    const items = await controller.read();
    res.status(200).json(items);
});

module.exports = router;