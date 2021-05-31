module.exports = (req, res, next) => {
	if (!req.session.usuarioLogeado) {
		return res.redirect("/usuario/login");
	} else
	if (req.session.usuarioLogeado.rol_id !=1 ) {
		return res.redirect("/usuario/logout");
	}
	next();
};
