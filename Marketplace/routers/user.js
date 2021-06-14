const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require(path.join(__dirname,"../controllers/userController"));

// Middlewares
const uploadFile = require(path.join(__dirname,"../middlewares/multerUsuario"));
const validarUsuario = require(path.join(__dirname,"../middlewares/validarUsuario"));
const validarImagenCrear = require(path.join(__dirname,"../middlewares/validarImagenCrear"));
const validarLogin = require(path.join(__dirname,"../middlewares/validarLogin"));
const validarRecupero = require(path.join(__dirname,"../middlewares/validarRecupero"));
const soloVisitas = require("../middlewares/soloVisitas");
const soloUsuarios = require("../middlewares/soloUsuarios");
const soloAdmin = require("../middlewares/soloAdmin");

// Rutas
router.get("/crear", soloVisitas, userController.crearForm);
router.post(
	"/crear",
	soloVisitas,
	uploadFile.single("imagen"),
	validarUsuario,
	validarImagenCrear,
	userController.crearGuardar
);
router.get("/detalle", soloUsuarios, userController.detalle);
router.get("/editar", soloUsuarios, userController.editarForm);
router.put(
	"/editar",
	soloUsuarios,
	uploadFile.single("imagen"),
	validarUsuario,
	validarImagenCrear,
	userController.editarGuardar
);
router.delete("/eliminar", soloUsuarios, userController.eliminar);
router.get("/administrar/:id", soloAdmin, userController.adminForm);
router.put("/administrar", soloAdmin, userController.adminGuardar);
router.get("/login", soloVisitas, userController.loginForm);
router.post("/login", soloVisitas, validarLogin, userController.loginGrabar);
router.get("/logout", soloUsuarios, userController.logout);
router.get("/recupero", userController.recuperoForm);
router.post("/recupero", validarRecupero, userController.recuperoGrabar);

module.exports = router;
