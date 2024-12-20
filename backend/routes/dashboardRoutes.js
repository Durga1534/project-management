const express = require('express');
const {getDashboardData} = require('../controllers/dashboardController');
const router = express.Router();

router.get('/data', getDashboardData);

module.exports = router;