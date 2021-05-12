window.onload = () => {
	let nombre = document.getElementById("nombre");
	let mensaje_error_nombre = document.getElementById("mensaje_error_nombre");
	let precio = document.getElementById("precio");
	let mensaje_error_precio = document.getElementsByClassName("mensaje_error_precio");
	// mensaje_error_precio.innerHTML = "El precio debe ser de 2 a 20 caracteres";
	console.log(mensaje_error_precio)

	nombre.oninput = () => {
		// Borrar el mensaje de Back-End si se cambia el input
		document.getElementById("error-nombre-be").classList.add("ocultar")
	}
	precio.oninput = () => {
		// Borrar el mensaje de Back-End si se cambia el input
		document.getElementById("error-precio-be").classList.add("ocultar")
		// Verificar la longitud del precio
		// console.log(precio.value)
		//(precio.value.length < 2 || precio.value.length > 20) ? mensaje_error_precio.innerHTML = "El precio debe ser de 2 a 20 caracteres" : "";
	}

	
}