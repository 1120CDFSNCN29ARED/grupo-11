// Requires ***********************************
const usuarioRepository = require("../../repositories/usuarioRepository");

module.exports = {
	listado: async (req, res) => {
		let usuarios = await usuarioRepository.ObtenerTodos();
		let usuarioRespuesta = usuarios.map((x) => {
			return {
				id: x.id,
				nombre: x.nombre,
				apellido: x.apellido,
				email: x.email,
				detalle: "/api/usuarios/" + x.id,
			};
		});
		let respuesta = {
			meta: {
				TotalUsuarios: usuarios.length,
				url: "/api/usuarios",
			},
			data: usuarioRespuesta,
		};
		res.status(200).json(respuesta);
	},
	detalle: async (req, res) => {
		let usuario = await usuarioRepository.ObtenerPorId(req.params.id);
		if (usuario != null) {
			let respuesta = {
				meta: {
					url: "/api/usuarios/" + req.params.id,
				},
				data: {
					id: usuario.id,
					nombre: usuario.nombre,
					apellido: usuario.apellido,
					email: usuario.email,
					avatar: usuario.avatar,
				},
			};
			res.status(200).json(respuesta);
		} else {
			let respuesta = {
				meta: {
					url: "/api/usuarios/" + req.params.id,
				},
				data: "id inexistente",
			};
			res.status(200).json(respuesta);
		}
	},
};
