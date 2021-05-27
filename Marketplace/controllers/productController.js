// Requires ***********************************
const productoRepository = require("../repositories/productoRepository");
const imagenesRepository = require("../repositories/imagenRepository");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const imagesPath = path.join(__dirname, "../public/images/products/");

// Controlador ********************************
module.exports = {
	crearForm: (req, res) => {
		let titulo = "Crear un Producto";
		res.render("producto-crear", { titulo, toThousand });
	},
	crearGuardar: async (req, res) => {
		let precio = parseFloat(req.body.precio);
		// return res.send(precio.toString())
		let validaciones = validationResult(req);
		// Acciones a tomar si existe algún error de validación
		if (validaciones.errors.length) {
			validaciones.errors.push({
				msg: "Tienes que subir una imagen",
				param: "imagen",
			});
			req.file ? BorrarArchivoDeImagen(req.file.filename) : null
			// return res.send([req.body.precio, precio, isNaN(req.body.precio), !!precio])
			return res.render("producto-crear", {
				toThousand,
				errores: validaciones.mapped(),
				precio,
				oldData: req.body,
				titulo: "Crear un Producto",
			});
		}
		// Acciones a tomar si NO existe ningún error de validación
		// 1. Actualizar el registro en la BD
		let producto = await productoRepository.Crear(req.body, precio, req.session.usuarioLogeado.id);
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
		let titulo = "Editar un Producto";
		let producto = await productoRepository.ObtenerPorId(req.params.id);
		return res.render("producto-editar", { producto, toThousand, titulo });
	},
	editarGuardar: async (req, res) => {
		let precio = parseFloat(req.body.precio);
		//return res.send(precio.toString())
		let validaciones = validationResult(req);
		// Acciones a tomar si existe algún error de validación
		if (validaciones.errors.length) {
			validaciones.errors.push({
				msg: "Tienes que subir una imagen",
				param: "imagen",
			});
			req.file ? BorrarArchivoDeImagen(req.file.filename) : null
			return res.render("producto-editar", {
				toThousand,
				producto: {id: req.params.id},
				errores: validaciones.mapped(),
				oldData: req.body,
				precio,
				titulo: "Editar un Producto",
			});
		}
		// Acciones a tomar si NO existe ningún error de validación
		// 1. Actualizar el registro en la BD
		await productoRepository.Actualizar(req.params.id, req.body, precio, req.session.usuarioLogeado.id);
		await imagenesRepository.Actualizar(req.file.filename, req.params.id);
		// 2. Redireccionar
		res.redirect("/producto/" + req.params.id + "/detalle");
	},
	eliminar: async (req, res) => {
		await EliminarProducto(req.params.id, req.session.usuarioLogeado.id);
		res.redirect("/");
	},
};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
}

async function EliminarProducto(idProducto, idUsuario) {
	const imagenes = await productoRepository.ObtenerImagenes(idProducto);
	for (let imagen of imagenes) {
		let imageFile = path.join(imagesPath, imagen.ruta);
		if (fs.existsSync(imageFile)) {
			fs.unlinkSync(imageFile);
		}
		await imagenesRepository.Eliminar(imagen.id);
	}
	await productoRepository.Eliminar(idProducto, idUsuario);
}

function BorrarArchivoDeImagen(nombreDeArchivo) {
	let imageFile = path.join(imagesPath, nombreDeArchivo);
	if (nombreDeArchivo && fs.existsSync(imageFile)) {
		fs.unlinkSync(imageFile);
	}
}
