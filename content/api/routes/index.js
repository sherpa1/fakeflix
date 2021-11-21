const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.status(200).json({ message: "Welcome to Fakeflix Movies API" });
});

module.exports = router;
