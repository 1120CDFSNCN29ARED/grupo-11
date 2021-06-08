window.addEventListener("load", async () => {
	// Declarar las variables
	let cantidad = document.querySelectorAll("#cantidad");
	let precio = document.querySelectorAll("#precio");
	let valorParcial = document.querySelectorAll("#valorParcial");
	let valorTotal = document.querySelector("#importe");
	let eliminar = document.querySelectorAll("#eliminar");
	let carritoID = document.querySelectorAll("#carritoID");
	let guardarCambios = document.querySelector("#guardarCambios"); // Botón de "Guardar Cambios"
	let comprar = document.querySelector("#comprar"); // Botón de "comprar"
	let productosSeccion = document.querySelectorAll(".productos");
	let contador = document.querySelector("#contador");

	// Obtener el stock de cada producto para compararlo luego vs el carrito
	let api = await fetch("/api/productos")
		.then((n) => n.json())
		.then((n) => n.products);
	let productosID = document.querySelectorAll("#productoID");
	let stock = [];
	for (n of productosID) {
		ID = n.innerHTML;
		stockDisponible = api.find((m) => m.id == ID).stock;
		stock.push(stockDisponible);
	}
	// RUTINAS POR CADA REGISTRO
	for (let i = 0; i < cantidad.length; i++) {
		// 1. Cambios en la cantidad de un producto
		cantidad[i].addEventListener("input", () => {
			cantidad[i].value == "" ? (cantidad[i].value = 0) : "";
			cant = parseInt(cantidad[i].value);
			cant < 0 ? (cant = 0) : cant > stock[i] ? (cant = stock[i]) : "";
			// Ocultar el botón de comprar si se deben guardar los cambios
			comprar.classList.add("ocultar");
			guardarCambios.classList.remove("ocultar");
			// Asegurarse de que la cantidad sea mayor a cero
			cantidad[i].value = cant;
			// Calcular el valor Parcial
			price = parseInt(precio[i].innerHTML);
			importe = cant * price;
			valorParcial[i].innerHTML = "$ " + toThousand(importe);
			// Calcular el valor Total
			actualizarTotalCarrito(
				productosSeccion,
				cantidad,
				precio,
				valorTotal
			);
		});

		// 2. Eliminar el registro y actualizar el contador
		eliminar[i].addEventListener("click", async () => {
			// Ocultar el producto
			productosSeccion[i].classList.replace("productos", "ocultar");
			// Calcular el valor Total
			quedanProductos = actualizarTotalCarrito(
				productosSeccion,
				cantidad,
				precio,
				valorTotal
			);
			// Eliminar el producto del carrito en la BD
			await fetch("/carrito/borrar-carrito/" + carritoID[i].value);
			// Actualizar el contador o la página entera
			if (quedanProductos) {
				// Si quedan productos, actualizar el contador
				contadorActual = await fetch("/api/carrito/contador").then((n) => n.json());
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
function actualizarTotalCarrito(
	productosSeccion,
	cantidad,
	precio,
	valorTotal
) {
	let acumulador = 0;
	let quedanProductos = 0;
	for (let i = 0; i < cantidad.length; i++) {
		if (!productosSeccion[i].classList.contains("ocultar")) {
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
