window.addEventListener("load", () => {
	// Declarar lasvariables
	let cantidad = document.querySelectorAll("#cantidad");
	let precio = document.querySelectorAll("#precio");
	let valorParcial = document.querySelectorAll("#valorParcial");
	let valorTotal = document.querySelector("#importe");
	let eliminar = document.querySelectorAll("#eliminar");
	let registroID = document.querySelectorAll("#registroID");
	let productos = document.querySelectorAll(".productos");

	// RUTINAS POR CADA REGUSTRO
	for (let i = 0; i < cantidad.length; i++) {
		// 1. Cambios en la cantidad
		cantidad[i].addEventListener("input", () => {
			cant = parseInt(cantidad[i].value);
			cant < 0 ? (cant = 0) : "";
			// Asegurarse de que la cantidad sea mayor a cero
			cantidad[i].value = cant;
			// Calcular el valor Parcial
			price = parseInt(precio[i].innerHTML);
			importe = cant * price;
			valorParcial[i].innerHTML = "$ " + toThousand(importe);
			// Calcular el valor Total
			importeTotal = actualizarTotalCarrito(
				productos,
				cantidad,
				precio,
				valorTotal
			);
		});
		
		// 2. Eliminar el registro
		eliminar[i].addEventListener("click", async () => {
			// Ocultar el producto
			productos[i].classList.replace("productos", "ocultar");
			// Calcular el valor Total
			importeTotal = actualizarTotalCarrito(
				productos,
				cantidad,
				precio,
				valorTotal
			);
			// Eliminar el producto de la BD
			await fetch("/carrito/borrar-registro/" + registroID[i].value);
			console.log(registroID[i].value);
			// Si se eliminó todo el carrito,  actualizar la página
			!importeTotal ? location.reload() : "";
		});
	}
});

// FUNCIONES

// Actualizar el valor Total
function actualizarTotalCarrito(productos, cantidad, precio, valorTotal) {
	let acumulador = 0;
	for (let i = 0; i < cantidad.length; i++) {
		if (!productos[i].classList.contains("ocultar")) {
			cant = parseInt(cantidad[i].value);
			price = parseInt(precio[i].innerHTML);
			acumulador = acumulador + cant * price;
		}
	}
	valorTotal.innerHTML = "$ " + toThousand(acumulador);
	return acumulador;
}

// SIMELA
function toThousand(n) {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
}
