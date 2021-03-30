const fs = require("fs");
let path = require("path");

module.exports = (req, res, next) => {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	let usersFilePath = path.join(__dirname, "../database/usuarios.json");
	let BD = GetFileObject(usersFilePath);
	let userFromCookie = mailEnBD(emailInCookie, BD);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.usuarioLogeado) {
		res.locals.isLogged = true;
		res.locals.usuarioLogeado = req.session.usuarioLogeado;
	}

	next();
}

function mailEnBD(texto, BD) {
	let usuario = BD.find((n) => n.email === texto);
	return usuario;
  }

function GetFileObject(filePath) {
	return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  