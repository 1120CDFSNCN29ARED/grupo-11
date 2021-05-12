window.onload = () => {
	let nombre = document.getElementById("nombre");
	console.log(nombre)
//	let nombre = formInput[0];
//	let precio = formInput[1];
//	console.log(nombre)
//	let formInput = document.getElementsByClassName("error-fe");

	//form.onsubmit = (evento) => {evento.preventDefault();}

	for (let i=0; i<formInput.length; i++) {
		formInput[i].onchange = () => {
			if (formInput[i].value.length() == 0) {
				errores[i] = "El campo está vacío"
			}
		}
	}
	formInput[0].oninput = () => {
		document.getElementById("error-nombre-be").classList.add("ocultar")
		if (!errores[0] && formInput[0].value.length < 2) {
			errores = {nombre: {msg: "El nombre debe ser más largo"}}
		}
		else 
		if (!errores[0] && formInput[0].value.length > 30) {
			errores = {nombre: {msg: "El nombre debe ser más corto"}}
		}
	}
	formInput[1].oninput = () => {
		document.getElementById("error-precio-be").classList.add("ocultar")
		if (!errores[1] && !parseFloat.formInput[1].value) {
			errores = {nombre: {msg: "Debes ingresar un valor numérico"}}
		}		
	}
}