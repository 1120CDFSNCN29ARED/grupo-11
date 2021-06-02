// Requires ***********************************
const productoRepository = require("../repositories/productoRepository");
const marcaRepository = require("../repositories/marcaRepository");
const modeloRepository = require("../repositories/modeloRepository");
const imagenesRepository = require("../repositories/imagenRepository");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const imagesPath = path.join(__dirname, "../public/images/products/");

// Controlador ********************************
module.exports = {
	crearForm: async (req, res) => {
		res.render("producto-crear-y-editar", {
			titulo: "Crear un Producto",
			producto: null,
			marcas: await marcaRepository.ObtenerTodos(),
			modelos: await modeloRepository.ObtenerTodos(),
		});
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
			req.file ? BorrarArchivoDeImagen(req.file.filename) : null;
			return res.render("producto-crear-y-editar", {
				titulo: "Crear un Producto",
				producto: null,
				marcas: await marcaRepository.ObtenerTodos(),
				modelos: await modeloRepository.ObtenerTodos(),
				errores: validaciones.mapped(),
				oldData: req.body,
				precio,
			});
		}
		// Acciones a tomar si NO existe ningún error de validación
		// 1. Actualizar el registro en la BD
		let producto = await productoRepository.Crear(
			req.body,
			precio,
			req.session.usuarioLogeado.id
		);
		await imagenesRepository.Crear(req.file.filename, producto.id);
		// 2. Redireccionar
		res.redirect("/producto/" + producto.id + "/detalle");
	},
	detalle: async (req, res) => {
		let titulo = "Detalle del Producto";
		let producto = await productoRepository.ObtenerPorId(req.params.id);
		return res.render("producto-detalle", {
			producto,
			toThousand,
			titulo,
		});
	},
	editarForm: async (req, res) => {
		return res.render("producto-crear-y-editar", {
			titulo: "Editar un Producto",
			producto: await productoRepository.ObtenerPorId(req.params.id),
			marcas: await marcaRepository.ObtenerTodos(),
			modelos: await modeloRepository.ObtenerTodos(),
		});
	},
	editarGuardar: async (req, res) => {
		let precio = parseFloat(req.body.precio);
		//return res.send(precio.toString())
		let validaciones = validationResult(req);
		// Acciones a tomar si existe algún error de validación
		if (validaciones.errors.length) {
			req.file ? BorrarArchivoDeImagen(req.file.filename) : null;
			return res.render("producto-crear-y-editar", {
				titulo: "Editar un Producto",
				producto: { id: req.params.id },
				marcas: await marcaRepository.ObtenerTodos(),
				modelos: await modeloRepository.ObtenerTodos(),
				errores: validaciones.mapped(),
				oldData: req.body,
				precio,
			});
		}
		// Acciones a tomar si NO existe ningún error de validación
		// 1. Acciones a tomar con la imagen
		if (req.file) {
			// Eliminar el archivo de imagen obsoleto
			let nombreImagenObsoleta = await imagenesRepository
				.ObtenerPorProductoId(req.params.id)
				.then((n) => n.ruta);
			BorrarArchivoDeImagen(nombreImagenObsoleta);
			// Actualizar los registros de imagen en la BD
			await imagenesRepository.Actualizar(req.file.filename, req.params.id);
		}
		// 2. Actualizar el registro de producto en la BD
		await productoRepository.Actualizar(
			req.params.id,
			req.body,
			precio,
			req.session.usuarioLogeado.id
		);
		// 3. Redireccionar
		res.redirect("/producto/" + req.params.id + "/detalle");
	},
	eliminar: async (req, res) => {
		await EliminarProducto(req.params.id, req.session.usuarioLogeado.id);
		res.redirect("/");
	},
};

const toThousand = (n) => {return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 })};

async function EliminarProducto(idProducto, idUsuario) {
	const imagenes = await productoRepository
		.ObtenerPorId(idProducto)
		.then((n) => n.imagenes);
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
