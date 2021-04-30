const fs = require("fs");
let path = require("path");
const usersFilePath = path.join(__dirname, "../database/usuarios.json");

module.exports = (req, res, next) => {
	if (req.cookies && req.cookies.recordar && !req.session.usuariologeado) {
		let usuarios = GetFileObject(usersFilePath);
		let usuarioALogearse;
		usuarioALogearse = usuarios.find(
			(n) => n.email == req.cookies.recordar
		);
		req.session.usuarioLogeado = usuarioALogearse;
	}
	next();
};

function GetFileObject(filePath) {
	return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
