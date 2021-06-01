// Requires ***********************************
const productoRepository = require("../repositories/productoRepository");
const carritoRepository = require("../repositories/carritoRepository");

module.exports = {
	listado: async (req, res) => {
		let usuarioID = req.session.usuarioLogeado.id;
		let carritos = await carritoRepository.ObtenerTodos(usuarioID);
		res.render("carrito", {
			titulo: "Carrito de Compras",
			carritos,
			toThousand,
		});
	},

	agregarRegistro: async (req, res) => {
		// Variables de uso general
		let usuarioID = req.session.usuarioLogeado.id;
		let productoID = parseInt(req.params.id);
		// Definir a dónde se va a redireccionar
		let urlOrigen = req.originalUrl.slice(1);
		urlOrigen = urlOrigen.slice(
			urlOrigen.indexOf("/") + 1,
			urlOrigen.lastIndexOf("/")
		);
		if (urlOrigen == "agregar/1") {
			urlDestino = "/";
		} else if (urlOrigen == "agregar/2") {
			urlDestino = "/producto/" + productoID + "/detalle";
		}
		// Averiguar si el carrito ya existe
		let avanzar = await carritoRepository
			.CarritoYaExistente(usuarioID, productoID)
			.then((n) => !n);
		// Sumar al carrito
		avanzar
			? await carritoRepository.AgregarRegistro(usuarioID, productoID)
			: "";
		// Redireccionar
		return res.redirect(urlDestino);
	},

	actualizarCarrito: async (req, res) => {
		let cantRegistros = req.body.cantRegistros;
		for (let i = 0; i < cantRegistros; i++) {
			carritoID = req.body["carrito" + i];
			cantidad = req.body["cantidad" + i];
			await carritoRepository.ActualizarCarrito(carritoID, cantidad);
		}
		res.redirect("/carrito");
	},

	eliminarRegistro: async (req, res) => {
		let carritoID = req.params.id;
		await carritoRepository.EliminarRegistro(carritoID);
		res.redirect("/carrito");
	},

	comprar: async (req, res) => {
		let usuarioID = req.session.usuarioLogeado.id;
		let carritos = await carritoRepository.ObtenerTodos(usuarioID);
		// Eliminar el carrito y disminuir el stock
		for (n of carritos) {
			carritoID = n.id;
			productoID = n.producto_id;
			cantComprada = n.cantidad
			await carritoRepository.EliminarRegistro(carritoID);
			await productoRepository.DisminuirStock(productoID, cantComprada);
		}
	},

	contador: async (req, res) => {
		let usuarioID = req.session.usuarioLogeado.id;
		let contador = await carritoRepository
			.ObtenerTodos(usuarioID)
			.then((n) => n.length.toString());
		return res.json(contador);
	},
};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
};
