window.addEventListener("load", () => {
	let avatar = document.getElementById("imagenUsuario");
	let ancho =  avatar.naturalWidth
    let alto = avatar.naturalHeight
	
	if (ancho > alto) {avatar.classList.add("imagenAncha")} else
	if (ancho < alto) {avatar.classList.add("imagenAlta")} else
	avatar.classList.add("imagenCuadrada");
	
})