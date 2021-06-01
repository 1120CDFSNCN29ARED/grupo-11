const express = require("express");
const router = express.Router();
const path = require("path");
const productController = require(path.join(__dirname,"../controllers/productController"));

// Middlewares
const uploadFile = require(path.join(__dirname,"../middlewares/multerProducto"));
const validarProducto = require(path.join(__dirname,"../middlewares/validarProducto"));
const validarImagenCrear = require(path.join(__dirname,"../middlewares/validarImagenCrear"));
const validarImagenEditar = require(path.join(__dirname,"../middlewares/validarImagenEditar"));
const soloUsuarios = require("../middlewares/soloUsuarios");

// Rutas
router.get("/crear", soloUsuarios, productController.crearForm);
router.post("/crear", soloUsuarios, uploadFile.single("imagen"), validarProducto, validarImagenCrear, productController.crearGuardar);
router.get("/:id/detalle", productController.detalle);
router.get("/:id/editar", soloUsuarios, productController.editarForm);
router.put("/:id/editar", soloUsuarios, uploadFile.single("imagen"), validarProducto, validarImagenEditar, productController.editarGuardar);
router.delete("/:id/eliminar", soloUsuarios, productController.eliminar);
router.get("/buscar", productController.buscar);

module.exports = router;
