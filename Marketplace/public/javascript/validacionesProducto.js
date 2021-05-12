window.addEventListener("load", () => {
	let nombre = document.getElementById("nombre");
	let mensaje_error_nombre = document.getElementById("mensaje_error_nombre");
	let precio = document.getElementById("precio");
	let mensaje_error_precio = document.getElementById("mensaje_error_precio");
	//console.log(mensaje_error_precio)

	nombre.oninput = () => {
		// Borrar el mensaje de Back-End si se cambia el input
		document.getElementById("error-nombre-be").classList.add("ocultar")
		// Verificar la longitud del valor
		if (nombre.value.length < 2 || precio.value.length > 20) {
			mensaje_error_nombre.classList.add("fas")
			mensaje_error_nombre.classList.add("fa-times-circle")
			mensaje_error_nombre.innerHTML = " El nombre debe ser de 2 a 30 caracteres";
		} else {
			mensaje_error_nombre.classList.remove("fas")
			mensaje_error_nombre.classList.remove("fa-times-circle")
			mensaje_error_nombre.innerHTML = "";
		}
		console.log(mensaje_error_nombre);
	}
	precio.oninput = () => {
		// Borrar el mensaje de Back-End si se cambia el input
		document.getElementById("error-precio-be").classList.add("ocultar")
		// Verificar la longitud del valor
		if (precio.value.length < 2 || precio.value.length > 20) {
			mensaje_error_precio.classList.add("fas")
			mensaje_error_precio.classList.add("fa-times-circle")
			mensaje_error_precio.innerHTML = " El precio debe ser de 2 a 20 caracteres";
		} else {
			mensaje_error_precio.classList.remove("fas")
			mensaje_error_precio.classList.remove("fa-times-circle")
			mensaje_error_precio.innerHTML = "";
		}
		console.log(mensaje_error_precio);
	}

	
})