// When the user clicks on the button, toggle between hiding and showing the dropdown content
function desplegable(n) {document.getElementById(n).classList.toggle("mostrar");}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.boton-desplegable')) {
	let dropdowns = document.getElementsByClassName("dropdown-content");
	for (let n of dropdowns) {
		n.classList.remove('mostrar');
	}
	}
}