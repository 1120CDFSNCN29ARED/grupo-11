window.addEventListener("load", () => {
	let nombre = document.getElementById("nombre");
	let mensaje_error_nombre = document.getElementById("mensaje_error_nombre");
	let precio = document.getElementById("precio");
	let mensaje_error_precio = document.getElementById("mensaje_error_precio");

	nombre.onkeypress = (e) => {
		if (nombre.value.length >= 30) {
			e.preventDefault()
			mensaje_error_nombre.innerHTML = " El nombre ya no puede ser más largo"
			mensaje_error_nombre.classList.remove("ocultar");
		}
	}
	nombre.onkeyup = () => {
		if (mensaje_error_nombre.innerHTML == " El nombre ya no puede ser más largo") {
			mensaje_error_nombre.innerHTML = ""
			mensaje_error_nombre.classList.add("ocultar");
		}
	}
	nombre.oninput = () => {
		// Borrar el mensaje de Back-End si se cambia el input
		document.getElementById("error-nombre-be").classList.add("ocultar")
		// Verificar que el campo no esté vacío
		if (nombre.value.length == 0) {
			mensaje_error_nombre.innerHTML = " Tenés que escribir un nombre"
			mensaje_error_nombre.classList.remove("ocultar")
		} else
		// Verificar la longitud del valor
		if (nombre.value.length < 2) {
			mensaje_error_nombre.innerHTML = " El nombre debe ser más largo";
			mensaje_error_nombre.classList.remove("ocultar");
		} else
		if (nombre.value.length > 30) {
			mensaje_error_nombre.innerHTML = " El nombre debe ser más corto";
			mensaje_error_nombre.classList.remove("ocultar");
		} else 
		// Ocultar errores
		{
			mensaje_error_nombre.innerHTML = "";
			mensaje_error_nombre.classList.add("ocultar")
		}
	}

	precio.onkeypress = (e) => {
		if (precio.value.length >= 10) {
			e.preventDefault()
			mensaje_error_precio.innerHTML = " El precio ya no puede ser más largo"
			mensaje_error_precio.classList.remove("ocultar")
		}
	}
	precio.onkeyup = () => {
		if (mensaje_error_precio.innerHTML == " El precio ya no puede ser más largo") {
			mensaje_error_precio.innerHTML = ""
			mensaje_error_precio.classList.add("ocultar");
		}
	}
	precio.oninput = () => {
		// Borrar el mensaje de Back-End si se cambia el input
		document.getElementById("error-precio-be").classList.add("ocultar")
		// Verificar que el campo no esté vacío
		if (precio.value.length == 0) {
			mensaje_error_precio.innerHTML = " Tenés que escribir un precio"
			mensaje_error_precio.classList.remove("ocultar")
		} else
		// Verificar que el campo contenga solamente números
		if (isNaN(precio.value)) {
			mensaje_error_precio.innerHTML = " Debés introducir solamente números"
			mensaje_error_precio.classList.remove("ocultar")
		} else
		// Verificar el valor contra el mínimo
		if (precio.value < 100) {
			mensaje_error_precio.innerHTML = " El precio debe ser mayor"
			mensaje_error_precio.classList.remove("ocultar")
		} else
		// Verificar el largo máximo
		if (precio.value.length > 10) {
			mensaje_error_precio.innerHTML = " El precio debe ser más corto"
			mensaje_error_precio.classList.remove("ocultar")
		} else
		// Ocultar errores
		{
			mensaje_error_precio.innerHTML = "";
			mensaje_error_precio.classList.add("ocultar")
		}
	}
})