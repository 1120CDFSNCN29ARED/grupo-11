let path = require('path')

const controlador = {
	index: (req,res) => {res.sendFile(path.resolve(__dirname, '../views/' + req.params.id + '.html'))},
};

module.exports = controlador;
