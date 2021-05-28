const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require(path.join(__dirname,"../controllers/userController"));

// Middlewares
const uploadFile = require(path.join(__dirname,"../middlewares/multerUsuario"));
const validarUsuario = require(path.join(__dirname,"../middlewares/validarUsuario"));
const validarImagen = require(path.join(__dirname,"../middlewares/validarImagen"));
const validarLogin = require(path.join(__dirname,"../middlewares/validarLogin"));
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
	validarImagen,
	userController.crearGuardar
);
router.get("/detalle", soloUsuarios, userController.detalle);
router.get("/editar", soloUsuarios, userController.editarForm);
router.put(
	"/editar",
	soloUsuarios,
	uploadFile.single("imagen"),
	validarUsuario,
	validarImagen,
	userController.editarGuardar
);
router.delete("/eliminar", soloUsuarios, userController.eliminar);
router.get("/administrar/:id", soloAdmin, userController.adminForm);
router.put("/administrar", soloAdmin, userController.adminGuardar);
router.get("/login", soloVisitas, userController.loginForm);
router.post("/login", soloVisitas, validarLogin, userController.loginGrabar);
router.get("/logout", soloUsuarios, userController.logout);

module.exports = router;
