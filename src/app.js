const express = require("express");
const path = require("path");
const rutaMain = require('./2-routers/ruta-main');

const app = express();
const staticFolder = path.resolve(__dirname, "./public");
app.use(express.static(staticFolder));

app.listen(3000, () => console.log('Servidor funcionando en puerto 3000...'));

app.get('/', rutaMain)
app.get('/:id', rutaMain)
