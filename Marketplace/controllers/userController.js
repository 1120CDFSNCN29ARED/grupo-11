// Requires ***********************************
const usuarioRepository = require("../repositories/usuarioRepository");
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

// Archivos y Paths ****************************
const imagesPath = path.join(__dirname, "../public/images/users/");
const errorRepeticionContrasena = "Ambas contraseñas deben coincidir";
const errorEmailRegistrado = "Este mail ya está registrado";

// Controlador ********************************
module.exports = {
	crearForm: (req, res) => {
		res.render("usuario-crear-y-editar", { 
			titulo: "Registro de Usuario",
			usuario: null,
		});
	},
	crearGuardar: async (req, res) => {
		// Validar campos en general
		let validaciones = validationResult(req);
		// Validar contraseña con contraseña2
		if (req.body.contrasena != req.body.contrasena2) {
			validaciones.errors.push({
				msg: errorRepeticionContrasena,
				param: "contrasena2",
			});
		}
		// Verificar si el mail ya existe en la BD
		if (await usuarioRepository.EmailYaExistente(req.body.email, 0)) {
			validaciones.errors.push({
				msg: errorEmailRegistrado,
				param: "email",
			});
		}
		// Si hay errores de validación...
		if (validaciones.errors.length > 0) {
			// Borrar el archivo de imagen
			if (req.file) {
				BorrarArchivoDeImagen(req.file.filename);
			}
			// Regresar al formulario de crear
			return res.render("usuario-crear-y-editar", {
				errores: validaciones.mapped(),
				oldData: req.body,
				titulo: "Registro de Usuario",
				usuario: null,
			});
		}
		// Si no hubieron errores de validación...
		// Crear el usuario
		const usuario = await usuarioRepository.Crear(req.body, req.file.filename);
		// Iniciar la sesión
		req.session.usuarioLogeado = usuario;
		// Redirigir al Detalle de Usuario
		res.redirect("/usuario/detalle");
	},
	detalle: async (req, res) => {
		let usuario = await usuarioRepository.ObtenerPorId(req.session.usuarioLogeado.id);
		res.render("usuario-detalle", {
			usuario,
			titulo: "Detalle del Usuario",
		});
	},
	editarForm: async (req, res) => {
		let usuario = await usuarioRepository.ObtenerPorId(req.session.usuarioLogeado.id);
		res.render("usuario-crear-y-editar", {
			usuario,
			titulo: "Edite su Usuario",
		});
	},
	editarGuardar: async (req, res) => {
		var usuario = await usuarioRepository.ObtenerPorId(req.session.usuarioLogeado.id);
		let validaciones = validationResult(req);
		// Revisar si las contraseñas coinciden
		if (req.body.contrasena != req.body.contrasena2) {
			validaciones.errors.push({
				msg: errorRepeticionContrasena,
				param: "contrasena2",
			});
		}
		// Revisar si el email ya existe para otro usuario
		if (await usuarioRepository.EmailYaExistente(req.body.email, usuario.id)) {
			validaciones.errors.push({
				msg: errorEmailRegistrado,
				param: "email",
			});
		}
		// Acciones a tomar si existe algún error de validación
		if (validaciones.errors.length) {
			req.file ? BorrarArchivoDeImagen(req.file.filename) : null
			return res.render("usuario-crear-y-editar", {
				usuario,
				errores: validaciones.mapped(),
				oldData: req.body,
				titulo: "Editar el Usuario",
			});
		}
		// Acciones a tomar si NO existe ningún error de validación
		// 1. Si se cambió de avatar, borrar el original
		req.file ? BorrarArchivoDeImagen(usuario.avatar) : null
		// 2. Asignarle a una variable el nombre del arhivo de imagen
		let fileName = req.file ? req.file.filename : usuario.avatar;
		// 3. Actualizar el registro en la BD y req.session.usuario
		req.session.usuarioLogeado = await usuarioRepository.Actualizar(usuario.id, req.body, fileName);
		// 4. Redireccionar
		res.redirect("/usuario/detalle");
	},
	eliminar: async (req, res) => {
		let avatar = await usuarioRepository.ObtenerPorId(req.session.usuarioLogeado.id).then(n => n.avatar)
		BorrarArchivoDeImagen(avatar);
		await usuarioRepository.Eliminar(req.session.usuarioLogeado.id);
		res.redirect("/usuario/logout");
	},
	loginForm: (req, res) => {
		res.render("login", { titulo: "Login" });
	},
	loginGrabar: async (req, res) => {
		let validaciones = validationResult(req);
		if (validaciones.isEmpty()) {
			// Verificar si el mail y la contraseña pertenecen a un usuario
			var usuario = await usuarioRepository.ObtenerPorEmailLogin(req.body.email);
			if (usuario == undefined || !bcryptjs.compareSync(req.body.contrasena, usuario.contrasena)) {
				validaciones.errors.push({msg: "Credenciales inválidas"})
			} else if (usuario.borrado) {
				validaciones.errors.push({
					msg: "El usuario está inactivado",
					param: "email",
				});
			}
		}
		if (!validaciones.isEmpty()) {
			return res.render("login", {
				errores: validaciones.array(),
				titulo: "Login",
				oldData: req.body,
			});
		}
		// Iniciar session
		req.session.usuarioLogeado = usuario;
		// Cookies
		req.body.recordar != undefined ? res.cookie("recordar", usuario.email, { maxAge: 24 * 60 * 60 * 1000 }) : null
		res.redirect("/usuario/detalle");
	},
	logout: (req, res) => {
		res.clearCookie("recordar");
		req.session.destroy();
		return res.redirect("/");
	}
};

function BorrarArchivoDeImagen(nombreDeArchivo) {
	let imageFile = path.join(imagesPath, nombreDeArchivo);
	nombreDeArchivo && fs.existsSync(imageFile) ? fs.unlinkSync(imageFile) : "";
}
