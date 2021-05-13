const express = require("express");
const router = express.Router();
const path = require("path");
const productController = require(path.join(__dirname,"../controllers/productController"));

// Middlewares
const uploadFile = require(path.join(__dirname,"../middlewares/multerProducto"));
const validarProducto = require(path.join(__dirname,"../middlewares/validarProducto"));
const validarImagen = require(path.join(__dirname,"../middlewares/validarImagen"));
const soloUsuarios = require("../middlewares/soloUsuarios");

// Rutas
router.get("/crear", soloUsuarios, productController.crearForm);
router.post("/crear", soloUsuarios, uploadFile.single("imagen"), validarProducto, validarImagen, productController.crearGuardar);
router.get("/:id/detalle", productController.detalle);
router.get("/:id/editar", soloUsuarios, productController.editarForm);
router.put("/:id/editar", soloUsuarios, uploadFile.single("imagen"), validarProducto, validarImagen, productController.editarGuardar);
router.delete("/:id/eliminar", soloUsuarios, productController.eliminar);

module.exports = router;
