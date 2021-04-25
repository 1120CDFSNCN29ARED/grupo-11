const productoRepository = require("../repositories/productoRepository");

const toThousand = (n) => {
    return n.toLocaleString("es-AR", { maximumFractionDigits: 0 });
};

module.exports = {
    carrito: (req, res) => {
        res.render("carrito", {
            titulo: "Carrito de Compras",
        });
    },

    index: async (req, res) => {
        let novedades = await productoRepository.ObtenerNovedades();
        let masVendidos = await productoRepository.ObtenerMasVendidos()

        let seccionesProductos = [
            {
                titulo: "Mas vendidos",
                productos: masVendidos
            },
            {
                titulo: "Novedades",
                productos: novedades
            }
        ];

        return res.render("index", {
            seccionesProductos,
            toThousand,
            titulo: "Guitar Shop",
        });
    },
};