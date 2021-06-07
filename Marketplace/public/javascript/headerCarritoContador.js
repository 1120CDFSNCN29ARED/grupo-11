window.addEventListener("load", async () => {
	let valor = await fetch("/api/carrito/contador").then(n => n.json())
    let contador = document.querySelector("#contador");
	if (valor > "0") {
		contador.classList.remove("ocultar")
		contador.innerHTML = valor;
	}
})