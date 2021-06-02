//averiguarStock;
window.addEventListener("load", async () => {
	// Declarar las variables
	let data = await fetch("/api/productos")
		.then((n) => n.json())
		.then((n) => n.products);
	let iconosCarrito = document.querySelectorAll("#averiguarStock");
	let productosID = document.querySelectorAll("#averiguarID");

	// Obtener el stock de cada producto y si es cero, ocultar el carrito
	for (let i = 0; i < iconosCarrito.length; i++) {
		productoID = productosID[i].innerHTML;
		stockDisponible = data.find((m) => m.id == productoID).stock;
		//console.log(stockDisponible);
		!stockDisponible ? iconosCarrito[i].classList.add("ocultar") : ""
	}
});
