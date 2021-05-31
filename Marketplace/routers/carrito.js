const express = require("express");
const carritoController = require("../controllers/carritoController");
const router = express.Router();

// Middlewares
const soloUsuarios = require("../middlewares/soloUsuarios");

// Rutas
router.get("/borrar-registro/:id", soloUsuarios, carritoController.eliminarRegistro);
router.put("/actualizar", soloUsuarios, carritoController.actualizarCarrito);
router.get("/", soloUsuarios, carritoController.listado);

module.exports = router;
