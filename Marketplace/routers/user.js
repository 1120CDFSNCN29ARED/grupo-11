const express = require('express');
const router = express.Router();
const path = require("path");
const userController = require(path.join(__dirname,'../controllers/userController'));

// Middlewares
const uploadFile = require(path.join(__dirname,'../middlewares/multerUsuario'));
const validarUsuario = require(path.join(__dirname,'../middlewares/validarUsuario'));
const validarLogin = require(path.join(__dirname,'../middlewares/validarLogin'));
const avanzaSiNoEstasLogueado = require('../middlewares/avanzaSiNoEstasLogueado');
const avanzaSiYaEstasLogueado = require('../middlewares/avanzaSiYaEstasLogueado');

// Rutas
router.get('/crear', avanzaSiNoEstasLogueado, userController.crearForm);
router.post('/crear', uploadFile.single("imagen"), validarUsuario, userController.crearGuardar);
router.get('/detalle', avanzaSiYaEstasLogueado, userController.detalle);
router.get('/editar', avanzaSiYaEstasLogueado, userController.editarForm);
router.put('/editar', uploadFile.single("imagen"), validarUsuario, userController.editarGuardar);
router.delete('/eliminar', avanzaSiYaEstasLogueado, userController.eliminar);
router.get('/login', avanzaSiNoEstasLogueado, userController.login);
router.post('/login', validarLogin, userController.logeo);
router.get('/logout', avanzaSiYaEstasLogueado, userController.logout);

module.exports = router;
