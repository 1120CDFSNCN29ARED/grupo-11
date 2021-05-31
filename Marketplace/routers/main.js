const express = require("express");
const mainController = require("../controllers/mainController");
const router = express.Router();

// Rutas
router.get("/", mainController.index);

module.exports = router;
