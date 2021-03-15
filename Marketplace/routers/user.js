const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require("path");

//******************* Rutas *******************
router.get('/crear', userController.crearForm);
router.post('/crear', userController.crearGuardar);
router.get('/:id/detalle', userController.detalle);
router.get('/:id/editar', userController.editarForm);
router.put('/:id/editar', userController.editarGuardar);
router.delete('/:id/eliminar', userController.eliminar);

module.exports = router;

//*********** Variable Storage *******
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder =  path.join(__dirname, '../public/images/users');
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})
const uploadFile = multer({storage});