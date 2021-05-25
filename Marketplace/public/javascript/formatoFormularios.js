window.addEventListener("load", () => {
	let formInput = document.getElementsByClassName("formInput");
	for (let i=0; i<formInput.length; i++) {
		formInput[i].addEventListener("focus", () => {
			formInput[i].classList.add("focus")
		})
		formInput[i].addEventListener("blur", () => {
			formInput[i].classList.remove("focus")
		})
	}
})

// Para que el fondo de los inputs cambie de color cuando el cursor está en él