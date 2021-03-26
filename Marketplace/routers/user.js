const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const path = require("path");
const userController = require(path.join(__dirname,'../controllers/userController'));

// Middlewares
const uploadFile = require(path.join(__dirname,'../Middlewares/multerUsuario'));
const validarUsuario = require(path.join(__dirname,'../Middlewares/validarUsuario'));
//******************* Rutas *******************
router.get('/crear', userController.crearForm);
router.post('/crear', uploadFile.single("imagen"), validarUsuario, userController.crearGuardar);
router.get('/:id/detalle', userController.detalle);
router.get('/:id/editar', userController.editarForm);
router.put('/:id/editar', uploadFile.single("imagen"), validarUsuario, userController.editarGuardar);
router.delete('/:id/eliminar', userController.eliminar);
router.get('/login', userController.loginForm);

router.post('/login', [
    check('email')
        .notEmpty().withMessage('Tienes que escribir una dirección de mail').bail()
        .isEmail().withMessage('Formato de mail inválido').bail()
        ,
    check('contrasena')
        .notEmpty().withMessage('Tienes que escribir una contraseña').bail()
        .isLength({min:6, max:12}).withMessage("La contraseña debe tener de 6 a 12  caracteres").bail()
        ,
], userController.loginGuardar);

router.get('/logout/', userController.logout);

module.exports = router;
