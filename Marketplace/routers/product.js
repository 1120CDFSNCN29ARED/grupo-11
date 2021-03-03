const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:id', productController.detalle);
router.delete('/:id/eliminar', productController.eliminar);
router.get('/crear-producto', productController.crear); 
router.get('/:id/editar', productController.editar);
router.put('/:id/editar', (req,res) => res.send("Params: " + req.params.id + " Body: " + req.body));

module.exports = router;