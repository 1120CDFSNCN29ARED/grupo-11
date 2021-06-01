window.addEventListener("load", () => {
	// Declarar lasvariables
	let cantidad = document.querySelectorAll("#cantidad");
	let precio = document.querySelectorAll("#precio");
	let importe = document.querySelector("#importe");
	let eliminar = document.querySelectorAll("#eliminar");
	let carritoID = document.querySelectorAll("#carritoID");
	let comprar = document.querySelector("#comprar");

	// Rutinas por cada carrito
	for (let i = 0; i < cantidad.length; i++) {
		// Cambios en la cantidad
		cantidad[i].addEventListener("input", () => {
			cant = parseInt(cantidad[i].value);
			cant < 0 ? (cant = 0) : "";
			actualizar(cant, i);
			comprar.classList.add("ocultar")
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
