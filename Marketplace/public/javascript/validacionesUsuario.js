window.addEventListener("load", function () {
	let formulario = document.querySelector("#formulario");
	let nombre = document.querySelector(".nombre");
	let apellido = document.querySelector(".apellido");
	let email = document.querySelector(".email");
	let imagen = document.querySelector(".imagen");
	let contrasena = document.querySelector(".contrasena");
	let contrasena2 = document.querySelector(".contrasena2");

	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	function validateImagen(imagen) {
		const re = /^(([a-zA-Z]:)|(\\{2}\w+)\$?)(\\(\w[\w].*))(.jpg|.JPG|.gif|.GIF|.png|.PNG|.jpeg|.JPEG)$/;
		return re.test(String(imagen).toLowerCase());
	}

	function SetearCorrecto(grupo, icono, formulario) {
		grupo.classList.remove("formulario__grupo-incorrecto");
		grupo.classList.add("formulario__grupo-correcto");
		icono.classList.remove("fa-times-circle");
		icono.classList.add("fa-check-circle");
		formulario.classList.remove("formulario__input-error-activo");
	}

	function SetearIncorrecto(grupo, icono, formulario) {
		grupo.classList.add("formulario__grupo-incorrecto");
		grupo.classList.remove("formulario__grupo-correcto");
		icono.classList.add("fa-times-circle");
		icono.classList.remove("fa-check-circle");
		formulario.classList.add("formulario__input-error-activo");
	}

	nombre.addEventListener("input", function () {
		let grupoNombre = document.querySelector(".grupo_nombre");
		let iconoNombre = document.querySelector(".grupo_nombre i");
		let formularioNombre = document.querySelector(".grupo_nombre .formulario__input-error");

		if (nombre.value.length >= 2) {
			SetearCorrecto(grupoNombre, iconoNombre, formularioNombre);
		} else {
			SetearIncorrecto(grupoNombre, iconoNombre, formularioNombre);
		}
	});

	apellido.addEventListener("input", function () {
		let grupoApellido = document.querySelector(".grupo_apellido");
		let iconoApellido = document.querySelector(".grupo_apellido i");
		let formularioApellido = document.querySelector(".grupo_apellido .formulario__input-error");

		if (apellido.value.length >= 2) {
			SetearCorrecto(grupoApellido, iconoApellido, formularioApellido);
		} else {
			SetearIncorrecto(grupoApellido, iconoApellido, formularioApellido);
		}
	});

	email.addEventListener("input", function (e) {
		document.querySelector("#be-mail").classList.add("ocultar");
		let grupoEmail = document.querySelector(".grupo_email");
		let iconoEmail = document.querySelector(".grupo_email .formulario__validacion-estado");
		let formularioEmail = document.querySelector(".grupo_email .formulario__input-error");

		if (validateEmail(email.value)) {
			SetearCorrecto(grupoEmail, iconoEmail, formularioEmail);
		} else {
			SetearIncorrecto(grupoEmail, iconoEmail, formularioEmail);
		}
	});

	imagen.addEventListener("change", function () {
		let grupoImagen = document.querySelector(".grupo_imagen");
		let iconoImagen = document.querySelector(".grupo_imagen i");
		let formularioImagen = document.querySelector(".grupo_imagen .formulario__input-error");

		if (validateImagen(imagen.value)) {
			SetearCorrecto(grupoImagen, iconoImagen, formularioImagen);
		} else {
			SetearIncorrecto(grupoImagen, iconoImagen, formularioImagen);
		}
	});

	contrasena.addEventListener("input", function () {
		let grupoContrasena = document.querySelector(".grupo_contrasena");
		let iconoContrasena = document.querySelector(".grupo_contrasena i");
		let formularioContrasena = document.querySelector(".grupo_contrasena .formulario__input-error");

		if (contrasena.value.length >= 6 && contrasena.value.length <= 12) {
			SetearCorrecto(grupoContrasena, iconoContrasena, formularioContrasena);
		} else {
			SetearIncorrecto(grupoContrasena, iconoContrasena, formularioContrasena);
		}
	});

	contrasena2.addEventListener("input", function () {
		let grupoContrasena2 = document.querySelector(".grupo_contrasena2");
		let iconoContrasena2 = document.querySelector(".grupo_contrasena2 i");
		let formularioContrasena2 = document.querySelector(".grupo_contrasena2 .formulario__input-error");

		if (contrasena2.value == contrasena.value) {
			SetearCorrecto(grupoContrasena2, iconoContrasena2, formularioContrasena2);
		} else {
			SetearIncorrecto(grupoContrasena2, iconoContrasena2, formularioContrasena2);
		}
	});

	formulario.addEventListener("submit", function (e) {
		if (nombre.value == "") {
			document
				.querySelector(".grupo_nombre")
				.classList.add("formulario__grupo-incorrecto");
			document
				.querySelector(".grupo_nombre .formulario__input-error")
				.classList.add("formulario__input-error-activo");
			e.preventDefault();
		}

		if (apellido.value == "") {
			document
				.querySelector(".grupo_apellido")
				.classList.add("formulario__grupo-incorrecto");
			document
				.querySelector(".grupo_apellido .formulario__input-error")
				.classList.add("formulario__input-error-activo");
			e.preventDefault();
		}

		if (email.value == "") {
			document
				.querySelector(".grupo_email")
				.classList.add("formulario__grupo-incorrecto");
			document
				.querySelector(".grupo_email .formulario__input-error")
				.classList.add("formulario__input-error-activo");
			e.preventDefault();
		}

		if (imagen.value == "") {
			document
				.querySelector(".grupo_imagen")
				.classList.add("formulario__grupo-incorrecto");
			document
				.querySelector(".grupo_imagen .formulario__input-error")
				.classList.add("formulario__input-error-activo");
			e.preventDefault();
		}

		if (contrasena.value == "") {
			document
				.querySelector(".grupo_contrasena")
				.classList.add("formulario__grupo-incorrecto");
			document
				.querySelector(".grupo_contrasena .formulario__input-error")
				.classList.add("formulario__input-error-activo");
			e.preventDefault();
		}

		if (contrasena2.value == "") {
			document
				.querySelector(".grupo_contrasena2")
				.classList.add("formulario__grupo-incorrecto");
			document
				.querySelector(".grupo_contrasena2 .formulario__input-error")
				.classList.add("formulario__input-error-activo");
			e.preventDefault();
		}
	});
});
