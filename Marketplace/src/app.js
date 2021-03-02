const express = require("express");
const path = require("path");
const rutaMain = require('./routers/main');
const rutaProducto = require('./routers/product');

const app = express();
const staticFolder = path.resolve(__dirname, "../public");
app.use(express.static(staticFolder));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.set("view engine", "ejs");
app.set('views', [
                    path.resolve(__dirname, './views'), 
                    path.resolve(__dirname, './views/partials'), 
                    path.resolve(__dirname, './views/product'), 
                    path.resolve(__dirname, './views/user')
                ]);

app.listen(3000, () => console.log('Servidor funcionando en puerto 3000...'));

app.use('/', rutaMain);
app.use('/product', rutaProducto);