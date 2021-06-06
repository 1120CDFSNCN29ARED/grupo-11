window.addEventListener("load", async () => {
	// Declarar las variables
	let cantidad = document.querySelectorAll("#cantidad");
	let precio = document.querySelectorAll("#precio");
	let importe = document.querySelector("#importe");
	let eliminar = document.querySelectorAll("#eliminar");
	let carritoID = document.querySelectorAll("#carritoID");
	let comprar = document.querySelector("#comprar"); // Botón de "comprar"

	// Obtener el stock de cada producto para compararlo luego vs el carrito
	let api = await fetch("/api/productos")
		.then((n) => n.json())
		.then((n) => n.products);
	let productos = document.querySelectorAll("#productoID");
	let stock = [];
	for (n of productos) {
		ID = n.innerHTML;
		stockDisponible = api.find((m) => m.id == ID).stock;
		stock.push(stockDisponible);
	}
	// Rutinas por cada carrito
	for (let i = 0; i < cantidad.length; i++) {
		// Acciones ante cambios en la cantidad
		cantidad[i].addEventListener("input", () => {
			cant = parseInt(cantidad[i].value);
			cant < 0 ? cant = 0 : cant > stock[i] ? cant = stock[i] : ""
			actualizar(cant, i); // actualizar datos en la vista del carrito
			comprar.classList.add("ocultar"); // ocultar el botón de comprar si se deben guardar los cambios
		});
		// Eliminar el carrito
		eliminar[i].addEventListener("click", () => {
			location = "/carrito/borrar-carrito/" + carritoID[i].innerHTML;
		});
	}

	// Importe a pagar
	window.addEventListener("click", () => {
		let acumulador = 0;
		for (let i = 0; i < cantidad.length; i++) {
			cant = parseInt(cantidad[i].value);
			price = parseInt(precio[i].innerHTML);
			acumulador = acumulador + cant * price;
		}
		importe.innerHTML = "$ " + toThousand(acumulador);
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
