const express = require("express");
const router = express.Router();
const path = require("path");
const apiProductController = require(path.join(__dirname,"../controllers/api/apiProductController"));
const apiUserController = require(path.join(__dirname,"../controllers/api/apiUserController"));
const apiCarritoController = require(path.join(__dirname,"../controllers/api/apiCarritoController"));
const apiVentaController = require(path.join(__dirname,"../controllers/api/apiVentasController"));

// Rutas
router.get("/productos", apiProductController.listado);
router.get("/productos/:id", apiProductController.detalle);
router.get("/usuarios", apiUserController.listado);
router.get("/usuarios/:id", apiUserController.detalle);
router.get("/carrito/contador", apiCarritoController.contador);
router.get("/ventas-por-cliente", apiVentaController.ventasPorCliente);
router.get("/ventas-por-producto/:id", apiVentaController.ventasPorProducto);

module.exports = router;
