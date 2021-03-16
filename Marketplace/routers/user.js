const express = require('express');
const router = express.Router();
const path = require("path");
const userController = require(path.join(__dirname,'../controllers/userController'));
const uploadFile = require(path.join(__dirname,'../Middlewares/multerUsers'));

//******************* Rutas *******************
router.get('/crear', userController.crearForm);
router.post('/crear', uploadFile.single("imagen"), userController.crearGuardar);
router.get('/:id/detalle', userController.detalle);
router.get('/:id/editar', userController.editarForm);
router.put('/:id/editar', uploadFile.single("imagen"), userController.editarGuardar);
router.delete('/:id/eliminar', userController.eliminar);

module.exports = router;
