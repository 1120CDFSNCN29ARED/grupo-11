const express = require("express");
const path = require("path");
const rutaMain = require('./routers/main');
const rutaProducto = require('./routers/product');
const methodOverride = require('method-override');

const app = express();
const staticFolder = path.resolve(__dirname, "./public");
app.use(express.static(staticFolder));

app.set("view engine", "ejs");
app.set('views', [
    path.resolve(__dirname, './views'), 
    path.resolve(__dirname, './views/basic'), 
    path.resolve(__dirname, './views/products'),
    path.resolve(__dirname, './views/user')
]);

app.use(methodOverride('_method'));

app.listen(3000, () => console.log('Servidor funcionando en puerto 3000...'));

app.use('/', rutaMain);
app.use('/producto', rutaProducto);