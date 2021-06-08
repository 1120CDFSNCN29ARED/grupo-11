window.addEventListener("load", () => {
	document
		.getElementById("hamburguer-container")
		.addEventListener("click", () => desplegable("menu-categorias"));
	document
		.getElementById("profile-container")
		.addEventListener("click", () => desplegable("menu-usuario"));
});

// Cerrar los dropdowns en desuso
window.onclick = function (e) {
	!e.target.matches("#categoria-button") ? document.getElementById("menu-categorias").classList.remove("mostrar") : ""
	!e.target.matches(".desplegableUsuario") ? document.getElementById("menu-usuario").classList.remove("mostrar") : ""
};

function desplegable(n) {document.getElementById(n).classList.toggle("mostrar")}