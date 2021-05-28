const usuarioRepository = require("../repositories/usuarioRepository");

module.exports = async (req, res, next) => {
	if (req.cookies && req.cookies.recordar && !req.session.usuarioLogeado) {
		req.session.usuarioLogeado = await usuarioRepository.ObtenerPorEmailLogin(req.cookies.recordar);
	}
	next();
};
