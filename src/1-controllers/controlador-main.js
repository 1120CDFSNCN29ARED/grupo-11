let path = require('path')

const controlador = {
	home: (req,res) => {res.render('index')},
	main: (req,res) => {res.sendFile(path.resolve(__dirname, '../views/' + req.params.id + '.ejs'))},
};

module.exports = controlador;
