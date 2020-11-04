const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

// router for clients
router.use('/clients',require('./clients'));

// router for students
router.use('/students', require('./students'));

// for api
router.use('/api',require('./api'));

// for verify badge
router.get('/verify-badge/:id', homeController.verify);

console.log(`Router's are loaded Successfully`);

module.exports = router;