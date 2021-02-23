const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/detalle-producto/:id', productController.detalle);

/*** CREAR PRODUCTO ***/ 
router.get('/crear-producto', productController.crearProducto); 
 

/*** EDITAR PRODUCTO ***/ 
router.get('/editar-producto/:id', productController.editarProducto); 


module.exports = router;