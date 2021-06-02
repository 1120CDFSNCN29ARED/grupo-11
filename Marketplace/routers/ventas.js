const express = require("express");
const ventaController = require("../controllers/ventaController");
const router = express.Router();

// Middlewares
const soloUsuarios = require("../middlewares/soloUsuarios");

// Rutas
router.get("/kickOff", soloUsuarios, ventaController.kickOff);

module.exports = router;
