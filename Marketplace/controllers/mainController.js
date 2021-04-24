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

    index: (req, res) => {
        let novedadesPromise = productoRepository.ObtenerNovedades();
        let masVendidosPromise = productoRepository.ObtenerMasVendidos()

        Promise.all([novedadesPromise, masVendidosPromise]).then(([novedades, masVendidos]) => {
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
        });
    },
};