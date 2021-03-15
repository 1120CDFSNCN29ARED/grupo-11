// ************** Requires *************
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');

const app = express();

// ************ Middlewares ************
app.use(express.static(path.resolve(__dirname, "./public"))); // Para acceder a los archivos estáticos en /public
app.use(methodOverride('_method')); // Para poder usar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({extended: false})); // Para poder subir una imagen o un archivo
app.use(express.json()); // ¿Para poder usar los métodos de JSON, para leer y guardar?

// ************ Carpetas de views **********
app.set("view engine", "ejs");
app.set('views', [
    path.resolve(__dirname, './views'), 
    path.resolve(__dirname, './views/partials'), 
    path.resolve(__dirname, './views/products'),
    path.resolve(__dirname, './views/users'),
    path.resolve(__dirname, './views/varios'),
]);

// ****** Conectando con el Navegador *******
app.listen(3000, () => console.log('Servidor funcionando en puerto 3000...'));
// ************* Ruteadores ****************
const rutaMain = require('./routers/main');
const rutaProducto = require('./routers/product');
const rutaUsuario = require('./routers/user');
// **************** Rutas *******************
app.use('/', rutaMain);
app.use('/producto', rutaProducto);
app.use('/usuario', rutaUsuario);