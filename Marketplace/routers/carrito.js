const express = require("express");
const carritoController = require("../controllers/carritoController");
const router = express.Router();

// Middlewares
const soloUsuarios = require("../middlewares/soloUsuarios");

// Rutas
router.get("/agregar/:id", soloUsuarios, carritoController.agregarCarrito);
router.put("/actualizar", soloUsuarios, carritoController.actualizarCarrito);
router.get("/borrar-carrito/:id", soloUsuarios, carritoController.eliminarCarrito);
router.get("/", soloUsuarios, carritoController.listado);

module.exports = router;
