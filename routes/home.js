const express = require('express');
const homeController = require('../controllers/home');
const authenticateUser = require('../middleware/userAuthentication');
const router = express.Router();

router.use(authenticateUser);

router
  .route('/Home')
  .get(homeController.getHome);

module.exports = router;