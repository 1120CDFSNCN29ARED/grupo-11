window.addEventListener("load", () => {
	// --------------- NOMBRE -------------------------
	let nombre = document.getElementById("nombre");
	let mensaje_error_nombre = document.getElementById("mensaje_error_nombre");
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
			mensaje_error_nombre.innerHTML = " Tenés que escribir un nombre";
			mensaje_error_nombre.classList.remove("ocultar");
		}
		// Verificar la longitud del valor
		else if (nombre.value.length < 2) {
			mensaje_error_nombre.innerHTML = " El nombre debe ser más largo";
			mensaje_error_nombre.classList.remove("ocultar");
		} else if (nombre.value.length > 30) {
			mensaje_error_nombre.innerHTML = " El nombre debe ser más corto";
			mensaje_error_nombre.classList.remove("ocultar");
		}
		// Ocultar errores
		else {
			mensaje_error_nombre.innerHTML = "";
			mensaje_error_nombre.classList.add("ocultar")
		}
	}

	// --------------- PRECIO -------------------------
	let precio = document.getElementById("precio");
	let mensaje_error_precio = document.getElementById("mensaje_error_precio");
	precio.onkeypress = (e) => {
		if (precio.value.length >= 10) {
			e.preventDefault();
			mensaje_error_precio.innerHTML = " El precio ya no puede ser más largo";
			mensaje_error_precio.classList.remove("ocultar");
		}
	};
	precio.onkeyup = () => {
		if (mensaje_error_precio.innerHTML == " El precio ya no puede ser más largo") {
			mensaje_error_precio.innerHTML = "";
			mensaje_error_precio.classList.add("ocultar");
		}
	};
	precio.oninput = () => {
		// Borrar el mensaje de Back-End si se cambia el input
		document.getElementById("error-precio-be").classList.add("ocultar");
		// Verificar que el campo no esté vacío
		if (precio.value.length == 0) {
			mensaje_error_precio.innerHTML = " Tenés que escribir un precio";
			mensaje_error_precio.classList.remove("ocultar");
		}
		// Verificar que el campo contenga solamente números
		else if (isNaN(precio.value)) {
			mensaje_error_precio.innerHTML =
				" Debés introducir solamente números";
			mensaje_error_precio.classList.remove("ocultar");
		}
		// Verificar el valor contra el mínimo
		else if (precio.value < 100) {
			mensaje_error_precio.innerHTML = " El precio debe ser mayor";
			mensaje_error_precio.classList.remove("ocultar");
		}
		// Verificar el largo máximo
		else if (precio.value.length > 10) {
			mensaje_error_precio.innerHTML = " El precio debe ser más corto";
			mensaje_error_precio.classList.remove("ocultar");
		}
		// Ocultar errores
		else {
			mensaje_error_precio.innerHTML = "";
			mensaje_error_precio.classList.add("ocultar");
		}
	};

	// --------------- STOCK -------------------------
	let stock = document.getElementById("stock");
	let mensaje_error_stock = document.getElementById("mensaje_error_stock");
	stock.onkeypress = (e) => {
		if (stock.value.length >= 10) {
			e.preventDefault();
			mensaje_error_stock.innerHTML = " El stock ya no puede ser más largo";
			mensaje_error_stock.classList.remove("ocultar");
		}
	};
	stock.onkeyup = () => {
		if (mensaje_error_stock.innerHTML == " El stock ya no puede ser más largo") {
			mensaje_error_stock.innerHTML = "";
			mensaje_error_stock.classList.add("ocultar");
		}
	};
	stock.oninput = () => {
		// Borrar el mensaje de Back-End si se cambia el input
		document.getElementById("error-stock-be").classList.add("ocultar");
		// Verificar que el campo no esté vacío
		if (stock.value.length == 0) {
			mensaje_error_stock.innerHTML = " Tenés que escribir el stock";
			mensaje_error_stock.classList.remove("ocultar");
		}
		// Verificar que el campo contenga solamente números
		else if (isNaN(stock.value)) {
			mensaje_error_stock.innerHTML =
				" Debés introducir solamente números";
			mensaje_error_stock.classList.remove("ocultar");
		}
		// Verificar el valor contra el mínimo
		else if (stock.value < 0) {
			mensaje_error_stock.innerHTML =
				" El stock debe ser cero o positivo";
			mensaje_error_stock.classList.remove("ocultar");
		}
		// Verificar el largo máximo
		else if (stock.value.length > 10) {
			mensaje_error_stock.innerHTML = " El stock debe ser menor";
			mensaje_error_stock.classList.remove("ocultar");
		}
		// Ocultar errores
		else {
			mensaje_error_stock.innerHTML = "";
			mensaje_error_stock.classList.add("ocultar");
		}
	};

	// --------------- SELECTORES -------------------------
	let categoria = document.getElementById("categoria");
	categoria.oninput = () => {document.getElementById("error-categoria-be").classList.add("ocultar")}

	let marca = document.getElementById("marca");
	marca.oninput = () => {document.getElementById("error-marca-be").classList.add("ocultar")}

	let modelo = document.getElementById("modelo");
	modelo.oninput = () => {document.getElementById("error-modelo-be").classList.add("ocultar")}

	let borrado = document.getElementById("borrado");
	borrado.oninput = () => {document.getElementById("error-borrado-be").classList.add("ocultar")}

})