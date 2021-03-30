const express = require('express');
const router = express.Router();
const path = require("path");
const userController = require(path.join(__dirname,'../controllers/userController'));

// Middlewares
const uploadFile = require(path.join(__dirname,'../Middlewares/multerUsuario'));
const validarUsuario = require(path.join(__dirname,'../Middlewares/validarUsuario'));
const validarLogin = require(path.join(__dirname,'../Middlewares/validarLogin'));
//******************* Rutas *******************
router.get('/crear', userController.crearForm);
router.post('/crear', uploadFile.single("imagen"), validarUsuario, userController.crearGuardar);
router.get('/detalle', userController.detalle);
router.get('/editar', userController.editarForm);
router.put('/editar', uploadFile.single("imagen"), validarUsuario, userController.editarGuardar);
router.delete('/eliminar', userController.eliminar);
router.get('/login', userController.login);
router.post('/login', validarLogin, userController.logeo);
router.get('/logout/', userController.logout);

module.exports = router;
