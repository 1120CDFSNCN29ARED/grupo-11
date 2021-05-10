window.addEventListener("load", () => {
	let formInput = document.getElementsByClassName("formInput");
	for (let n of formInput) {
		n.addEventListener("focus", () => {
			n.classList.add("focus")
		})
		n.addEventListener("blur", () => {
			n.classList.remove("focus")
		})
		n.onchange = () => {
			n.style.color = "red"
			console.log(n.value)
		}
	}
	

})