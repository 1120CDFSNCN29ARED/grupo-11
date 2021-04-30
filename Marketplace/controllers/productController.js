const productoRepository = require("../repositories/productoRepository");
const imagenesRepository = require("../repositories/imagenRepository");
const fs = require("fs");
const path = require("path");
const imagesPath = path.join(__dirname, "../public/images/products/");

module.exports = {
    crearForm: (req, res) => {
        let titulo = "Alta de Producto";
        res.render("producto-crear", { titulo });
    },
    crearGuardar: async (req, res) => {
        let precio = SanitizePrice(req.body.precio);
        let producto = await productoRepository.Crear(req.body, precio, req.session.usuarioLogeado.id);
        await imagenesRepository.Crear(req.file.filename, producto.id);

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
        await productoRepository.Actualizar(req.params.id, req.body, precio, req.session.usuarioLogeado.id);

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