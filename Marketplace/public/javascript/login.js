window.addEventListener("load", function (){

    let formulario = document.querySelector('.formulario');
    let email = document.querySelector(".email");
    let contrasena = document.querySelector(".contrasena");
    
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    
    email.addEventListener('keyup', function (){

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
    
    formulario.addEventListener('submit', function (e){

        if(email.value == ""){
           document.querySelector(".grupo_email").classList.add('formulario__grupo-incorrecto');
           document.querySelector(".grupo_email .formulario__input-error").classList.add('formulario__input-error-activo');
           e.preventDefault();
    }
    
        if(contrasena.value == ""){
           document.querySelector(".grupo_contrasena").classList.add('formulario__grupo-incorrecto');
           document.querySelector(".grupo_contrasena .formulario__input-error").classList.add('formulario__input-error-activo');  
           e.preventDefault();
        }
    })
})