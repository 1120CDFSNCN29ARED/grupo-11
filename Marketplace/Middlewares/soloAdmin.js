module.exports = (req, res, next) => {
	if (!req.session.usuarioLogeado && req.session.usuarioLogeado.rol_id !=1 ) {
		return res.redirect("/usuario/logout");
	}
	next();
};
