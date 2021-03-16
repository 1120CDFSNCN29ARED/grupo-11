const express = require('express');
const router = express.Router();
const path = require("path");
const productController = require(path.join(__dirname,'../controllers/productController'));
const uploadFile = require(path.join(__dirname,'../Middlewares/multerProducts'));

//******************* Rutas *******************
router.get('/crear', productController.crearForm);
router.post('/crear', uploadFile.single("imagen"), productController.crearGuardar);
router.get('/:id/detalle', productController.detalle);
router.get('/:id/editar', productController.editarForm);
router.put('/:id/editar', productController.editarGuardar);
router.delete('/:id/eliminar', productController.eliminar);

module.exports = router;