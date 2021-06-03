window.addEventListener("load", () => {
	// Declarar lasvariables
	let cantidad = document.querySelectorAll("#cantidad");
	let precio = document.querySelectorAll("#precio");
	let importe = document.querySelector("#importe");
	let eliminar = document.querySelectorAll("#eliminar");
	let registroID = document.querySelectorAll("#registroID");
	let productos = document.querySelectorAll(".productos");

	// Rutinas por cada registro
	for (let i = 0; i < cantidad.length; i++) {
		// Cambios en la cantidad
		cantidad[i].addEventListener("input", () => {
			cant = parseInt(cantidad[i].value);
			cant < 0 ? (cant = 0) : "";
			actualizar(cant, i);
		});
		// Eliminar el registro
		eliminar[i].addEventListener("click", async () => {
			productos[i].classList.replace("productos", "ocultar");
			await fetch("/carrito/borrar-registro/" + registroID[i].innerHTML);
		});
	}

	// Rutina para el encabezado
	window.addEventListener("click", () => {
		let acumulador = 0;
		for (let i = 0; i < cantidad.length; i++) {
			if (!productos[i].classList.contains("ocultar")) {
				cant = parseInt(cantidad[i].value);
				price = parseInt(precio[i].innerHTML);
				acumulador = acumulador + cant * price;
			}
		}
		console.log(acumulador);
		acumulador > 0 ? importe.innerHTML = "$ " + toThousand(acumulador) : location.reload()
	});
});

// Funciones
function actualizar(cant, i) {
	let cantidad = document.querySelectorAll("#cantidad");
	let precio = document.querySelectorAll("#precio");
	let valorTotal = document.querySelectorAll("#valorTotal");
	cantidad[i].value = cant;
	price = parseInt(precio[i].innerHTML);
	importe = cant * price;
	valorTotal[i].innerHTML = "$ " + toThousand(importe);
}

function toThousand(n) {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
}
