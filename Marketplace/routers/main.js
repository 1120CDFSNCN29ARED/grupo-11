const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

// Middlewares
const soloUsuarios = require('../middlewares/soloUsuarios');

// Rutas
router.get('/', mainController.index);
router.get('/carrito', soloUsuarios, mainController.carrito);


module.exports = router;