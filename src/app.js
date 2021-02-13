const express = require("express");
const path = require("path");
const ruta = require('./2-routers/rutas');

const app = express();

const staticFolder = path.resolve(__dirname, "./public");
app.use(express.static(staticFolder));

app.set("view engine", "ejs")
app.listen(3000, () => console.log('Servidor funcionando en puerto 3000...'));

app.use('/', ruta)
app.get('/:id', ruta)
