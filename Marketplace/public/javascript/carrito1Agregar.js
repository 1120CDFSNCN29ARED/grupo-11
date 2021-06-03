window.addEventListener("load", async () => {
	// Declarar lasvariables
	let agregar = document.querySelectorAll("#agregar");
	let agregarLink = document.querySelectorAll("#agregarLink");
	let contador = document.querySelector("#contador");
	let contadorOriginal = await fetch("/carrito/contador").then((n) => n.json())

	// Rutinas por cada registro
	for (let i = 0; i < agregar.length; i++) {
		// Cambios si se hace click sobre algún canasto
		agregar[i].addEventListener("click", async () => {
			await fetch("/carrito/agregar/" + agregarLink[i].innerHTML)
			contadorActual = await fetch("/carrito/contador").then((n) => {return n.json()})
			if (contadorActual > contadorOriginal) {
				contadorOriginal = contadorActual
				contador.classList.remove("ocultar");
				contador.innerHTML = contadorActual;
			}
		})
	}
});

