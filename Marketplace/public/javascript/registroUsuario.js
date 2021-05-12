window.addEventListener("load", function (){

    let formulario = document.querySelector('#formulario');
    let nombre = document.querySelector(".nombre");
    let apellido = document.querySelector(".apellido");
    let email = document.querySelector(".email");
    let imagen = document.querySelector(".imagen");
    let contrasena = document.querySelector(".contrasena");
    let contrasena2 = document.querySelector(".contrasena2");

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    function validateImagen(imagen) {
        const re = /^(([a-zA-Z]:)|(\\{2}\w+)\$?)(\\(\w[\w].*))(.jpg|.JPG|.gif|.GIF|.png|.PNG|.jpeg|.JPEG)$/;
        return re.test(String(imagen).toLowerCase());
    };
    
    nombre.addEventListener('keyup', function (){

        if(nombre.value.length >= 2){
               document.querySelector(".grupo_nombre").classList.remove('formulario__grupo-incorrecto');
               document.querySelector(".grupo_nombre").classList.add('formulario__grupo-correcto');
               document.querySelector(".grupo_nombre i").classList.remove('fa-times-circle');
               document.querySelector(".grupo_nombre i").classList.add('fa-check-circle');
               document.querySelector(".grupo_nombre .formulario__input-error").classList.remove('formulario__input-error-activo');
        }else{
               document.querySelector(".grupo_nombre").classList.add('formulario__grupo-incorrecto');
               document.querySelector(".grupo_nombre").classList.remove('formulario__grupo-correcto');
               document.querySelector(".grupo_nombre i").classList.add('fa-times-circle');
               document.querySelector(".grupo_nombre i").classList.remove('fa-check-circle');
               document.querySelector(".grupo_nombre .formulario__input-error").classList.add('formulario__input-error-activo');
        } 
    })

    apellido.addEventListener('keyup', function (){

        if(apellido.value.length >= 2){
               document.querySelector(".grupo_apellido").classList.remove('formulario__grupo-incorrecto');
               document.querySelector(".grupo_apellido").classList.add('formulario__grupo-correcto');
               document.querySelector(".grupo_apellido i").classList.remove('fa-times-circle');
               document.querySelector(".grupo_apellido i").classList.add('fa-check-circle');
               document.querySelector(".grupo_apellido .formulario__input-error").classList.remove('formulario__input-error-activo');
        }else{
               document.querySelector(".grupo_apellido").classList.add('formulario__grupo-incorrecto');
               document.querySelector(".grupo_apellido").classList.remove('formulario__grupo-correcto');
               document.querySelector(".grupo_apellido i").classList.add('fa-times-circle');
               document.querySelector(".grupo_apellido i").classList.remove('fa-check-circle');
               document.querySelector(".grupo_apellido .formulario__input-error").classList.add('formulario__input-error-activo');
        } 
    })

    email.addEventListener('keyup', function (e){

        if(validateEmail(email.value)){
               document.querySelector(".grupo_email").classList.remove('formulario__grupo-incorrecto');
               document.querySelector(".grupo_email").classList.add('formulario__grupo-correcto');
               document.querySelector(".grupo_email i").classList.remove('fa-times-circle');
               document.querySelector(".grupo_email i").classList.add('fa-check-circle');
               document.querySelector(".grupo_email .formulario__input-error").classList.remove('formulario__input-error-activo');
          
        }else{
               document.querySelector(".grupo_email").classList.add('formulario__grupo-incorrecto');
               document.querySelector(".grupo_email").classList.remove('formulario__grupo-correcto');
               document.querySelector(".grupo_email i").classList.add('fa-times-circle');
               document.querySelector(".grupo_email i").classList.remove('fa-check-circle');
               document.querySelector(".grupo_email .formulario__input-error").classList.add('formulario__input-error-activo');
        } 
    })

    imagen.addEventListener('change', function (){

        if(validateImagen(imagen.value)){
               document.querySelector(".grupo_imagen").classList.remove('formulario__grupo-incorrecto');
               document.querySelector(".grupo_imagen").classList.add('formulario__grupo-correcto');
               document.querySelector(".grupo_imagen i").classList.remove('fa-times-circle');
               document.querySelector(".grupo_imagen i").classList.add('fa-check-circle');
               document.querySelector(".grupo_imagen .formulario__input-error").classList.remove('formulario__input-error-activo');
        }else{
               document.querySelector(".grupo_imagen").classList.add('formulario__grupo-incorrecto');
               document.querySelector(".grupo_imagen").classList.remove('formulario__grupo-correcto');
               document.querySelector(".grupo_imagen i").classList.add('fa-times-circle');
               document.querySelector(".grupo_imagen i").classList.remove('fa-check-circle');
               document.querySelector(".grupo_imagen .formulario__input-error").classList.add('formulario__input-error-activo');
        }
    })

    contrasena.addEventListener('keyup', function (){

        if(contrasena.value.length >= 6 && contrasena.value.length <= 12){
               document.querySelector(".grupo_contrasena").classList.remove('formulario__grupo-incorrecto');
               document.querySelector(".grupo_contrasena").classList.add('formulario__grupo-correcto');
               document.querySelector(".grupo_contrasena i").classList.remove('fa-times-circle');
               document.querySelector(".grupo_contrasena i").classList.add('fa-check-circle');
               document.querySelector(".grupo_contrasena .formulario__input-error").classList.remove('formulario__input-error-activo');
        }else{
               document.querySelector(".grupo_contrasena").classList.add('formulario__grupo-incorrecto');
               document.querySelector(".grupo_contrasena").classList.remove('formulario__grupo-correcto');
               document.querySelector(".grupo_contrasena i").classList.add('fa-times-circle');
               document.querySelector(".grupo_contrasena i").classList.remove('fa-check-circle');
               document.querySelector(".grupo_contrasena .formulario__input-error").classList.add('formulario__input-error-activo');
        } 
    })

    contrasena2.addEventListener('keyup', function (){

        if(contrasena2.value == contrasena.value){
               document.querySelector(".grupo_contrasena2").classList.remove('formulario__grupo-incorrecto');
               document.querySelector(".grupo_contrasena2").classList.add('formulario__grupo-correcto');
               document.querySelector(".grupo_contrasena2 i").classList.remove('fa-times-circle');
               document.querySelector(".grupo_contrasena2 i").classList.add('fa-check-circle');
               document.querySelector(".grupo_contrasena2 .formulario__input-error").classList.remove('formulario__input-error-activo');
        }else{
               document.querySelector(".grupo_contrasena2").classList.add('formulario__grupo-incorrecto');
               document.querySelector(".grupo_contrasena2").classList.remove('formulario__grupo-correcto');
               document.querySelector(".grupo_contrasena2 i").classList.add('fa-times-circle');
               document.querySelector(".grupo_contrasena2 i").classList.remove('fa-check-circle');
               document.querySelector(".grupo_contrasena2 .formulario__input-error").classList.add('formulario__input-error-activo');
        } 
    })


    formulario.addEventListener('submit', function (e){

        if(nombre.value == ""){
            document.querySelector(".grupo_nombre").classList.add('formulario__grupo-incorrecto');
            document.querySelector(".grupo_nombre .formulario__input-error").classList.add('formulario__input-error-activo');
            e.preventDefault();
        }

        if(apellido.value == ""){
        document.querySelector(".grupo_apellido").classList.add('formulario__grupo-incorrecto');
        document.querySelector(".grupo_apellido .formulario__input-error").classList.add('formulario__input-error-activo');
        e.preventDefault();
        }

        if(email.value == ""){
           document.querySelector(".grupo_email").classList.add('formulario__grupo-incorrecto');
           document.querySelector(".grupo_email .formulario__input-error").classList.add('formulario__input-error-activo');
           e.preventDefault();
        }

        if(imagen.value == ""){
            document.querySelector(".grupo_imagen").classList.add('formulario__grupo-incorrecto');
            document.querySelector(".grupo_imagen .formulario__input-error").classList.add('formulario__input-error-activo');
            e.preventDefault();
        }
    
        if(contrasena.value == ""){
           document.querySelector(".grupo_contrasena").classList.add('formulario__grupo-incorrecto');
           document.querySelector(".grupo_contrasena .formulario__input-error").classList.add('formulario__input-error-activo');  
           e.preventDefault();
        }

        if(contrasena2.value == ""){
            document.querySelector(".grupo_contrasena2").classList.add('formulario__grupo-incorrecto');
            document.querySelector(".grupo_contrasena2 .formulario__input-error").classList.add('formulario__input-error-activo');
            e.preventDefault();
        }
    })
})