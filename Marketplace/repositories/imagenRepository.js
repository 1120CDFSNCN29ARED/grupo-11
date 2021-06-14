const db = require("../database/models");
const entidad = db.Imagen;

module.exports = {
	Crear: (rutaImagen, productoId) => {
		return entidad.create({
			ruta: rutaImagen,
			producto_id: productoId,
		});
	},
	Actualizar: (rutaImagen, productoId) => {
		return entidad.update(
			{ruta: rutaImagen},
			{where: { producto_id: productoId }},
		);
	},
	Eliminar: (id) => {
		return entidad.destroy({
			where: { id: id },
			force: true,
		});
	},
	ObtenerPorProductoId: (ProductoId) => {
		return entidad.findOne({
			where: { producto_id: ProductoId },
		});
	},
};