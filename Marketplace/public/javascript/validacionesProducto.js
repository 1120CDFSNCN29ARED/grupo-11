window.addEventListener("load", () => {
	let nombre = document.getElementById("nombre");
	let mensaje_error_nombre = document.getElementById("mensaje_error_nombre");
	let precio = document.getElementById("precio");
	let mensaje_error_precio = document.getElementById("mensaje_error_precio");

	nombre.onkeypress = (e) => {
		if (nombre.value.length >= 30) {
			e.preventDefault()
			mensaje_error_nombre.classList.remove("ocultar")
			mensaje_error_nombre.innerHTML = " El nombre ya no puede ser más largo"
		}
	}
	nombre.oninput = () => {
		// Borrar el mensaje de Back-End si se cambia el input
		document.getElementById("error-nombre-be").classList.add("ocultar")
		// Verificar la longitud del valor
		if (nombre.value.length < 2 || nombre.value.length > 30) {
			mensaje_error_nombre.classList.remove("ocultar")
			mensaje_error_nombre.innerHTML = " El nombre debe ser de 2 a 30 caracteres";
		} else {
			mensaje_error_nombre.classList.add("ocultar")
		}
	}
	precio.onkeypress = (e) => {
		if (precio.value.length >= 10) {
			e.preventDefault()
			mensaje_error_precio.classList.remove("ocultar")
			mensaje_error_precio.innerHTML = " El precio ya no puede ser más largo"
		}
	}
	precio.oninput = (e) => {
		// Borrar el mensaje de Back-End si se cambia el input
		document.getElementById("error-precio-be").classList.add("ocultar")
		// Verificar que el campo no esté vacío
		if (precio.value.length == 0) {
			mensaje_error_precio.classList.remove("ocultar")
			mensaje_error_precio.innerHTML = " Tenés que escribir un precio"
		}
		// Verificar el largo máximo
		else if (precio.value.length > 10) {
			mensaje_error_precio.classList.remove("ocultar")
			mensaje_error_precio.innerHTML = " El precio debe ser más corto"
		}
		// Verificar que el campo contenga solamente números
		else if (isNaN(precio.value)) {
			mensaje_error_precio.classList.remove("ocultar")
			mensaje_error_precio.innerHTML = " Debés introducir solamente números"
		}
		// Verificar el valor contra el mínimo
		else if (precio.value < 100) {
			mensaje_error_precio.classList.remove("ocultar")
			mensaje_error_precio.innerHTML = " El precio debe ser mayor"
		} 
		// Ocultar errores
		else {
			mensaje_error_precio.classList.add("ocultar")
			mensaje_error_precio.innerHTML = "";
		}
	}

	
})