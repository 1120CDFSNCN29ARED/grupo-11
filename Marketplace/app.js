// ************** Requires *************
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const path = require("path");
const methodOverride = require("method-override");
const cors = require("cors");
const app = express();
const cookieRecordar = require("./Middlewares/cookieRecordar");
const validarUserLogged = require("./middlewares/validarUserLogged");
const categoriaRepository = require("./repositories/categoriaRepository");

// ************ Middlewares ************
app.use(
    session({ secret: "Secreto", resave: false, saveUninitialized: false })
);
app.use(cookieRecordar);
app.use(cookies());
app.use(express.static(path.resolve(__dirname, "./public"))); // Para acceder a los archivos estáticos en /public
app.use(methodOverride("_method")); // Para poder usar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({ extended: false })); // Para poder subir una imagen o un archivo
app.use(express.json()); // ¿Para poder usar los métodos de JSON, para leer y guardar?
app.use(cors());
app.use(validarUserLogged); // Para tener actualizada constantemente la variable res.locals.isLogged
app.use(async (req, res, next) => {
    if (!app.locals.categoriasDeProductos) {
        app.locals.categoriasDeProductos = await categoriaRepository.ObtenerTodos();
    }
    next();
});

// ************ Carpetas de views **********
app.set("view engine", "ejs");
app.set("views", [
    path.resolve(__dirname, "./views"),
    path.resolve(__dirname, "./views/partials"),
    path.resolve(__dirname, "./views/products"),
    path.resolve(__dirname, "./views/users"),
    path.resolve(__dirname, "./views/varios"),
]);

// ****** Conectando con el Navegador *******
app.listen(3001, () => console.log("Servidor funcionando en puerto 3001..."));
// ************* Ruteadores ****************
const rutaProducto = require("./routers/product");
const rutaUsuario = require("./routers/user");
const rutaAPI = require("./routers/api");
const rutaCarrito = require("./routers/carrito");
const rutaVenta = require("./routers/ventas");
const rutaMain = require("./routers/main");
// **************** Rutas *******************
app.use("/producto", rutaProducto);
app.use("/usuario", rutaUsuario);
app.use("/api", rutaAPI);
app.use("/carrito", rutaCarrito);
app.use("/ventas", rutaVenta);
app.use("/", rutaMain);
