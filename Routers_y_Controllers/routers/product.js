// ************ Requires ************
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:id/detalle', productController.detalle);
router.delete('/:id/eliminar', productController.eliminar);
router.get('/:id/editar', productController.editar_form);
router.put('/:id/editar', (req,res)=> res.send("Params: " + req.params.id + " Body: " + req.body));
//router.put('/:id/editar', productController.editar_update);

module.exports = router;
