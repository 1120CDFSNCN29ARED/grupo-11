const productRepository = require("../repositories/productRepository");

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
        let novedadesPromise = productRepository.ObtenerNovedades();
        let masVendidosPromise = productRepository.ObtenerMasVendidos()

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
            console.log(novedades);

            return res.render("index", {
                seccionesProductos,
                toThousand,
                titulo: "Guitar Shop",
            });
        });
    },
};