window.addEventListener("load", async () => {
	// Declarar lasvariables
	let agregar = document.querySelectorAll("#agregar");
	let agregarLink = document.querySelectorAll("#agregarLink");
	let contador = document.querySelector("#contador");
	let contadorOriginal = await fetch("/api/carrito/contador").then((n) => n.json());

	// Rutinas por cada registro
	for (let i = 0; i < agregar.length; i++) {
		// Cambios si se hace click sobre algún canasto
		agregar[i].addEventListener("click", async () => {
			// Se agrega el producto al carrito
			let avanzar = await fetch("/carrito/agregar/" + agregarLink[i].innerHTML).then(n => n.json())
			if (avanzar) {
				agregar[i].classList.contains("fa-shopping-basket") ? agregar[i].classList.replace("fa-shopping-basket", "fa-thumbs-up") : ""
				agregar[i].innerText == "Agregar al Carrito" ? agregar[i].classList.add("ocultar") : ""
			}
			// Si hubo cambios en la cantidad de productos en el carrito, se actualiza el contador
			let contadorActual = await fetch("/api/carrito/contador").then((n) => n.json());
			if (contadorActual > contadorOriginal) {
				contadorOriginal = contadorActual;
				contador.classList.remove("ocultar");
				contador.innerHTML = contadorActual;
			}
		});
	}
});
