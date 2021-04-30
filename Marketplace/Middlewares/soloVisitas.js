module.exports = (req, res, next) => {
	if (req.session.usuarioLogeado) {
		return res.redirect("/usuario/detalle");
	}
	next();
};
