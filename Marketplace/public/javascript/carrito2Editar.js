window.addEventListener("load", () => {
	// Declarar lasvariables
	let cantidad = document.querySelectorAll("#cantidad");
	let precio = document.querySelectorAll("#precio");
	let valorParcial = document.querySelectorAll("#valorParcial");
	let valorTotal = document.querySelector("#importe");
	let eliminar = document.querySelectorAll("#eliminar");
	let registroID = document.querySelectorAll("#registroID");
	let productos = document.querySelectorAll(".productos");
	let contador = document.querySelector("#contador");

	// RUTINAS POR CADA REGUSTRO
	for (let i = 0; i < cantidad.length; i++) {
		// 1. Cambios en la cantidad de un producto
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
			actualizarTotalCarrito(productos, cantidad, precio, valorTotal);
		});

		// 2. Eliminar el registro y actualizar el contador
		eliminar[i].addEventListener("click", async () => {
			// Ocultar el producto
			productos[i].classList.replace("productos", "ocultar");
			// Calcular el valor Total
			quedanProductos = actualizarTotalCarrito(
				productos,
				cantidad,
				precio,
				valorTotal
			);
			// Eliminar el producto de la BD
			await fetch("/carrito/borrar-registro/" + registroID[i].value);
			// Actualizar el contador o la página entera
			if (quedanProductos) {
				// Si quedan productos, actualizar el contador
				contadorActual = await fetch("/carrito/contador").then((n) =>
					n.json()
				);
				contador.innerHTML = contadorActual;
			} else {
				// Si no quedan productos, actualizar la página
				location.reload();
			}
		});
	}
});

// FUNCIONES

// Actualizar el valor Total
function actualizarTotalCarrito(productos, cantidad, precio, valorTotal) {
	let acumulador = 0;
	let quedanProductos = 0;
	for (let i = 0; i < cantidad.length; i++) {
		if (!productos[i].classList.contains("ocultar")) {
			cant = parseInt(cantidad[i].value);
			price = parseInt(precio[i].innerHTML);
			acumulador = acumulador + cant * price;
			quedanProductos = true;
		}
	}
	valorTotal.innerHTML = "$ " + toThousand(acumulador);
	return quedanProductos;
}

// SIMELA
function toThousand(n) {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
}
