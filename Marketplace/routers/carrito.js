const express = require("express");
const carritoController = require("../controllers/carritoController");
const router = express.Router();

// Middlewares
const soloUsuarios = require("../middlewares/soloUsuarios");

// Rutas
router.get("/agregar/1/:id", soloUsuarios, carritoController.agregarCarrito);
router.get("/agregar/2/:id", soloUsuarios, carritoController.agregarCarrito);
router.put("/actualizar", soloUsuarios, carritoController.actualizarCarrito);
router.get("/borrar-carrito/:id", soloUsuarios, carritoController.eliminarCarrito);
router.get("/comprar", soloUsuarios, carritoController.comprar);
router.get("/API/contador", soloUsuarios, carritoController.contador);
router.get("/", soloUsuarios, carritoController.listado);

module.exports = router;
