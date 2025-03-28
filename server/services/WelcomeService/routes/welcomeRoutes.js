const express = require('express');
const router = express.Router();
const tableController = require('../controllers/welcomeControllers');

router.get('/tables/free', tableController.getFreeTables);

module.exports = router;
