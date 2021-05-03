// Requires ***********************************
const usuarioRepository = require("../repositories/usuarioRepository");
const fs = require("fs");
let path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

// Archivos y Paths ****************************
const imagesPath = path.join(__dirname, "../public/images/users/");
const errorRepeticionContrasena = "Ambas contraseñas deben coincidir";
const errorEmailRegistrado = "Este mail ya esta registrado";

// Controlador ********************************
module.exports = {
	crearForm: (req, res) => {
		res.render("usuario-crear", { titulo: "Registro" });
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
		if (await usuarioRepository.ObtenerPorEmail(req.body.email)) {
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
			return res.render("usuario-crear", {
				errores: validaciones.mapped(),
				oldData: req.body,
				titulo: "Registro",
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
		res.render("usuario-editar", {
			usuario,
			titulo: "Editar el Usuario",
		});
	},
	editarGuardar: async (req, res) => {
		let validaciones = validationResult(req);
		// Revisar si las contraseñas coinciden
		if (req.body.contrasena != req.body.contrasena2) {
			validaciones.errors.push({
				msg: errorRepeticionContrasena,
				param: "contrasena2",
			});
		}
		// Revisar si el email ya existe para otro usuario
		if (await usuarioRepository.EmailYaExistente(req.body.email, req.session.usuarioLogeado.id)) {
			validaciones.errors.push({
				msg: errorEmailRegistrado,
				param: "email",
			});
		}
		// Acciones a tomar si existe algún error de validación
		if (validaciones.errors.length) {
			if (req.file) {
				BorrarArchivoDeImagen(req.file.filename);
			}
			let usuario = await usuarioRepository.ObtenerPorId(req.session.usuarioLogeado.id);
			return res.render("usuario-editar", {
				usuario,
				errores: validaciones.mapped(),
				oldData: req.body,
				titulo: "Editar el Usuario",
			});
		}
		// Acciones a tomar si NO existe ningún error de validación
		let fileName = req.file ? req.file.filename : await usuarioRepository.ObtenerAvatar(req.session.usuarioLogeado.id);
		await usuarioRepository.Actualizar(req.session.usuarioLogeado.id, req.body, fileName);

		res.redirect("/usuario/detalle");
	},
	eliminar: async (req, res) => {
		await EliminarUsuario(req.session.usuarioLogeado.id);
		res.redirect("/usuario/logout");
	},
	loginForm: (req, res) => {
		res.render("login", { titulo: "Login" });
	},
	loginGrabar: async (req, res) => {
		let errores = validationResult(req);
		if (errores.isEmpty()) {
			let usuario = await usuarioRepository.ObtenerPorEmail(req.body.email);
			// Verificar si además coincide la contraseña
			if (usuario == undefined ||
				!bcryptjs.compareSync(req.body.contrasena, usuario.contrasena))
			{
				return res.render("login", {
					errores: [
						{ msg: "Correo electronico y/o contraseña incorrecta" },
					],
					titulo: "Login",
					oldData: req.body,
				});
			}
			// Iniciar session
			req.session.usuarioLogeado = usuario;
			// Cookies
			if (req.body.recordar != undefined) {
				res.cookie("recordar", usuario.email, { maxAge: 60000 });
			}
			res.redirect("/usuario/detalle");
		} else {
			return res.render("login", {
				errores: errores.array(),
				titulo: "Login",
				oldData: req.body,
			});
		}
	},
	logout: (req, res) => {
		res.clearCookie("recordar");
		req.session.destroy();
		return res.redirect("/");
	}
};

async function EliminarUsuario(id) {
	let avatar = await usuarioRepository.ObtenerAvatar(id);
	await usuarioRepository.Eliminar(id);
	BorrarArchivoDeImagen(avatar);
}

function BorrarArchivoDeImagen(nombreDeArchivo) {
	let imageFile = path.join(imagesPath, nombreDeArchivo);
	if (nombreDeArchivo && fs.existsSync(imageFile)) {
		fs.unlinkSync(imageFile);
	}
}
