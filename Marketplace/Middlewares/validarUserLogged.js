const usuarioRepository = require("../repositories/usuarioRepository");

module.exports = async (req, res, next) => {
	res.locals.isLogged = false;

	if (req.cookies.recordar) {
		let userFromCookie = await usuarioRepository.ObtenerPorEmail(req.cookies.recordar);
	
		if (userFromCookie) {
			req.session.usuarioLogeado = userFromCookie;
		}
	}

	if (req.session.usuarioLogeado) {
		res.locals.isLogged = true;
		res.locals.usuarioLogeado = req.session.usuarioLogeado;
	}

	next();
};