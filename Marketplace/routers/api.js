const express = require("express");
const router = express.Router();
const path = require("path");
const apiProductController = require(path.join(__dirname,"../controllers/api/apiProductController"));
const apiUserController = require(path.join(__dirname,"../controllers/api/apiUserController"));

// Rutas
router.get("/productos", apiProductController.listado);
router.get("/productos/:id", apiProductController.detalle);
router.get("/usuarios", apiUserController.listado);
router.get("/usuarios/:id", apiUserController.detalle);

module.exports = router;
