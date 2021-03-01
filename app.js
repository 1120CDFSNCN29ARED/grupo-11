// ************ Requires ************
const express = require("express");
const path = require("path");
const rutaMain = require('./Routers_y_Controllers/routers/main');
const rutaProducto = require('./Routers_y_Controllers/routers/product');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE

// ************ express() ************
const app = express();

// ************ Middlewares ************
const staticFolder = path.resolve(__dirname, "./public");
app.use(express.static(staticFolder));  // Necesario para los archivos estáticos en el folder /public
app.use(methodOverride('_method'));     // Para poder usar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({extended:false})); // Necesario para subir una imagen o un archivo
app.use(express.json());

// ************ Carpetas de views **********
app.set("view engine", "ejs");
app.set('views', [
    path.resolve(__dirname, './views'), 
    path.resolve(__dirname, './views/basic'), 
    path.resolve(__dirname, './views/products'),
    path.resolve(__dirname, './views/user')
]);

app.listen(3000, () => console.log('Servidor funcionando en puerto 3000...'));

app.use('/', rutaMain);
app.use('/producto', rutaProducto);