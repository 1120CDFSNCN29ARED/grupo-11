const fs = require("fs");
let path = require("path");
const productsFilePath = path.join(__dirname, "../database/productos.json");
const imagesPath = path.join(__dirname, "../public/images/products/");

const toThousand = (n) => {
    return n.toLocaleString("es-AR", { maximumFractionDigits: 0 });
};

module.exports = {
    crearForm: (req, res) => {
        let titulo = "Alta de Producto";
        res.render("producto-crear", { titulo });
    },

    crearGuardar: (req, res) => {
        const productos = GetFileObject(productsFilePath);
        const nuevoId =
            productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
        let price = SanitizePrice(req.body.precio);
        const newProduct = {
            id: nuevoId,
            ...req.body,
            precio: Number(price),
            masVendido: false,
            novedades: true,
            imagen: req.file.filename,
        };
        productos.push(newProduct);
        WriteFile(productsFilePath, productos);
        res.redirect("/producto/" + newProduct.id + "/detalle");
    },

    detalle: (req, res) => {
        let titulo = "Detalle del Producto";
        const products = GetFileObject(productsFilePath);
        let producto = products.find(
            (producto) => producto.id == req.params.id
        );
        res.render("producto-detalle", { producto, toThousand, titulo });
    },

    editarForm: (req, res) => {
        let titulo = "Editar el Producto";
        const products = GetFileObject(productsFilePath);
        let producto = products.find(
            (producto) => producto.id == req.params.id
        );
        res.render("producto-editar", { producto, toThousand, titulo });
    },

    editarGuardar: (req, res) => {
        const productos = GetFileObject(productsFilePath);
        const productId = req.params.id;
        let producto = productos.find((producto) => producto.id == productId);
        let indice = productos.indexOf(producto);
        let price = SanitizePrice(req.body.precio);
        const actualizado = {
            ...producto,
            ...req.body,
            precio: Number(price),
        };
        productos[indice] = actualizado;
        WriteFile(productsFilePath, productos);
        res.redirect("/producto/" + productId + "/detalle");
    },

    eliminar: (req, res) => {
        const products = GetFileObject(productsFilePath);
        let indice = products.findIndex((n) => n.id == req.params.id);
        //Eliminar la imagen
        let imageFile = path.join(imagesPath, products[indice].imagen);
        if (products[indice].imagen && fs.existsSync(imageFile)) {
            fs.unlinkSync(imageFile);
        }
        //Eliminar el registro
        products.splice(indice, 1);
        WriteFile(productsFilePath, products);
        res.redirect("/");
    },
};

function GetFileObject(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")); //Christian, la función no funcionaba correctamente porque se estaba usando un parámtetro distinto al de la función
}

function SanitizePrice(priceString) {
    return priceString
        .replace(".", "")
        .replace(",", ".")
        .replace("$", "")
        .replace(" ", "");
}

function WriteFile(filePath, content) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}
