// Requires ***********************************
const productoRepository = require("../repositories/productoRepository");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const imagenesRepository = require("../repositories/imagenRepository");
const imagesPath = path.join(__dirname, "../public/images/products/");

module.exports = {
	crearForm: (req, res) => {
		let titulo = "Crear un Producto";
		res.render("producto-crear", { titulo, toThousand });
	},
	crearGuardar: async (req, res) => {
		let precio = parseFloat(SanitizePrice(req.body.precio));
		let validaciones = validationResult(req);
		// Revisar si el precio tiene un valor válido
		if (!precio) {
			validaciones.errors.push({
				msg: "Debés introducir un precio válido",
				param: "precio",
			});
		}
		// Acciones a tomar si existe algún error de validación
		let producto = await productoRepository.Crear(req.body, precio, req.session.usuarioLogeado.id);
		if (validaciones.errors.length) {
			oldData = {
				...req.body,
				precio: precio,
			}
			return res.render("producto-crear", {
				producto,
				toThousand,
				errores: validaciones.mapped(),
				oldData,
				titulo: "Crear un Producto",
			});
		}
		// Acciones a tomar si NO existe ningún error de validación
		// 1. Actualizar el registro en la BD
		await imagenesRepository.Crear(req.file.filename, producto.id);
		// 2. Redireccionar
		res.redirect("/producto/" + producto.id + "/detalle");
	},
	detalle: async (req, res) => {
		let titulo = "Detalle del Producto";
		let producto = await productoRepository.ObtenerPorId(req.params.id);
		
		return res.render("producto-detalle", { producto, toThousand, titulo });
	},
	editarForm: async (req, res) => {
		let titulo = "Editar el Producto";
		let producto = await productoRepository.ObtenerPorId(req.params.id);
		return res.render("producto-editar", { producto, toThousand, titulo });
	},
	editarGuardar: async (req, res) => {
		let precio = parseFloat(SanitizePrice(req.body.precio));
		let validaciones = validationResult(req);
		// Revisar si el precio tiene un valor válido
		if (!precio) {
			validaciones.errors.push({
				msg: "Debés introducir un precio válido",
				param: "precio",
			});
		};
		// Acciones a tomar si existe algún error de validación
		let producto = await productoRepository.ObtenerPorId(req.params.id);
		if (validaciones.errors.length) {
			oldData = {
				...req.body,
				precio: precio,
			}
			return res.render("producto-editar", {
				producto,
				toThousand,
				errores: validaciones.mapped(),
				oldData,
				titulo: "Editar un Producto",
			});
		}
		// Acciones a tomar si NO existe ningún error de validación
		// 1. Actualizar el registro en la BD
		await productoRepository.Actualizar(req.params.id, req.body, precio, req.session.usuarioLogeado.id);
		// 2. Redireccionar
		res.redirect("/producto/" + req.params.id + "/detalle");
	},
	eliminar: async (req, res) => {
		await EliminarProducto(req.params.id, req.session.usuarioLogeado.id);
		res.redirect("/");
	},
};

const toThousand = (n) => {
	return parseFloat(n).toLocaleString("es-AR", { maximumFractionDigits: 2 });
}

function SanitizePrice(priceString) {
	return priceString
		.replace(".", "")
		.replace(",", ".")
		.replace("$", "")
		.replace(" ", "");
}

async function EliminarProducto(id, idUsuario) {
	const imagenes = await productoRepository.ObtenerImagenes(id);
	for (let imagen of imagenes) {
		let imageFile = path.join(imagesPath, imagen.ruta);
		if (fs.existsSync(imageFile)) {
			fs.unlinkSync(imageFile);
		}
		await imagenesRepository.Eliminar(imagen.id);
	}
	await productoRepository.Eliminar(id, idUsuario);
}