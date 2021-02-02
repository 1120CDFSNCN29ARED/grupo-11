const express = require("express");
const path = require("path");

const app = express();
const staticFolder = path.resolve(__dirname, "./public");

app.use(express.static(staticFolder));

app.listen(3000, () => console.log('Servidor funcionando...'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/index.html'))
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/carrito.html'))
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/login.html'))
});
