const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

// Middlewares
const avanzaSiYaEstasLogueado = require('../middlewares/avanzaSiYaEstasLogueado');

// Rutas
router.get('/', mainController.index);
router.get('/carrito', avanzaSiYaEstasLogueado, mainController.carrito);


module.exports = router;