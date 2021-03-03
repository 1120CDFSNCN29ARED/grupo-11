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

router.get('/:id', productController.detalle);
router.delete('/:id/eliminar', productController.eliminar);
router.get('/crear-producto', productController.crear);
router.get('/:id/editar', productController.editar_form);
router.put('/:id/editar', productController.editar_update);

module.exports = router;