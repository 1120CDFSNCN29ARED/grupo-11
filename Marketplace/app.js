const express = require("express");
const path = require("path");
const rutaMain = require('./routers/main');
const rutaProducto = require('./routers/product');
const methodOverride = require('method-override');

const app = express();

// ************ Middlewares ************
const staticFolder = path.resolve(__dirname, "./public");
// Necesario para acceder a los archivos estáticos en /public
app.use(express.static(staticFolder));
// Para poder usar el method="POST" en el formulario por PUT y DELETE
app.use(methodOverride('_method'));
// Necesario para subir una imagen o un archivo
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// ************ Carpetas de views **********
app.set("view engine", "ejs");
app.set('views', [
    path.resolve(__dirname, './views'), 
    path.resolve(__dirname, './views/partials'), 
    path.resolve(__dirname, './views/products'),
    path.resolve(__dirname, './views/user')
]);

app.listen(3000, () => console.log('Servidor funcionando en puerto 3000...'));

app.use(methodOverride('_method'));
app.use('/', rutaMain);
app.use('/producto', rutaProducto);