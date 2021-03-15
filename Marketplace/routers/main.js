const express = require('express');
const mainController = require('../controllers/mainController')
const router = express.Router();

//******************* Rutas *******************
router.get('/', mainController.index);
router.get('/carrito', mainController.carrito);
router.get('/login', mainController.login);

module.exports = router;