const express = require('express')
const app = express()

app.listen(3010, () => console.log('Servidor funcionando...'))
let path = require('path')
app.use(express.static(path.resolve('public')));

app.get('/', (req, res) => {res.sendFile(path.resolve(__dirname, 'views/index.html'))})
app.get('/carrito', (req, res) => {res.sendFile(path.resolve(__dirname, 'views/carrito.html'))})
app.get('/login', (req, res) => {res.sendFile(path.resolve(__dirname, 'views/login.html'))})
