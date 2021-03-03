const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:id', productController.detalle);
router.delete('/:id/eliminar', productController.eliminar);
router.get('/crear-producto', productController.crear); 
router.get('/:id/editar', productController.editar); 

module.exports = router;