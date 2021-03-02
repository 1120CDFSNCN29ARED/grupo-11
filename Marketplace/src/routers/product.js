const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/detalle-producto/:id', productController.detalle);

router.get('/crear-producto/', productController.crearProducto); 
router.post('/', productController.guardarProducto);


router.get('/editar-producto/:id', productController.editarProducto); 


module.exports = router;