const express = require('express');
const router = express.Router();
const path = require("path");
const productController = require(path.join(__dirname,'../controllers/productController'));

// Middlewares
const uploadFile = require(path.join(__dirname,'../middlewares/multerProducto'));
const avanzaSiYaEstasLogueado = require('../middlewares/avanzaSiYaEstasLogueado');

// Rutas
router.get('/crear', avanzaSiYaEstasLogueado, productController.crearForm);
router.post('/crear', uploadFile.single("imagen"), productController.crearGuardar);
router.get('/:id/detalle', productController.detalle);
router.get('/:id/editar', avanzaSiYaEstasLogueado, productController.editarForm);
router.put('/:id/editar', productController.editarGuardar);
router.delete('/:id/eliminar', avanzaSiYaEstasLogueado, productController.eliminar);

module.exports = router;