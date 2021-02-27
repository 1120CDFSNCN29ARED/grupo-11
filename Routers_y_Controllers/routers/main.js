const express = require('express');
const mainController = require('../controllers/mainController')

const router = express.Router();

router.get('/', mainController.index);
router.get('/carrito', mainController.carrito);
router.get('/login', mainController.login);
router.get('/registro', mainController.registro);

module.exports = router;