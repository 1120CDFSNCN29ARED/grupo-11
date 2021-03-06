const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require("path");

//*********** Variable Storage *******
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder =  path.join(__dirname, '../public/images/products');
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})
const uploadFile = multer({storage});

router.get('/crear', productController.crearForm);
router.post('/', productController.crearGuardar);
router.get('/:id', productController.detalle);
router.get('/:id/editar', productController.editarForm);
router.put('/:id/editar', productController.editarGuardar);
router.delete('/:id/eliminar', productController.eliminar);

module.exports = router;