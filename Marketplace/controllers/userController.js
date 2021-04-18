// Requires ***********************************
const fs = require("fs");
let path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

// Archivos y Paths ****************************
const usersFilePath = path.join(__dirname, "../database/usuarios.json");
const imagesPath = path.join(__dirname, "../public/images/users/");
const errorRepeticionContrasena = "Ambas contraseñas deben coincidir";
const errorEmailRegistrado = "Este mail ya esta registrado";

// Controlador ********************************
module.exports = {
  crearForm: (req, res) => {
    res.render("usuario-crear", { titulo: "Registro" });
  },

  crearGuardar: (req, res) => {
    // Validar campos en general
    let validaciones = validationResult(req);

    if (req.body.contrasena != req.body.contrasena2) {
      validaciones.errors.push({
        msg: errorRepeticionContrasena,
        param: "contrasena2"
      });
    }

    if (ObtenerUsuarioPorEmail(req.body.email)) {
      validaciones.errors.push({
        msg: errorEmailRegistrado,
        param: "email"
      });
    }

    if (validaciones.errors.length > 0) {
      if (req.file) {
        BorrarArchivoDeImagen(req.file.filename);
      }

      // Regresar al formulario de crear
      return res.render("usuario-crear", {
        errores: validaciones.mapped(),
        oldData: req.body,
        titulo: "Registro"
      });
    }

    const usuario = CrearUsuario(req.body, req.file);

    // Inciar session
    req.session.usuarioLogeado = usuario

    res.redirect("/usuario/detalle");
  },

  detalle: (req, res) => {
    let usuario = ObtenerUsuarioPorId(req.session.usuarioLogeado.id);
    res.render("usuario-detalle", {
      usuario,
      titulo: "Detalle del Usuario",
    });
  },

  editarForm: (req, res) => {
    let usuario = ObtenerUsuarioPorId(req.session.usuarioLogeado.id);
    res.render("usuario-editar", {
      usuario,
      titulo: "Editar el Usuario",
    });
  },

  editarGuardar: (req, res) => {
    let validaciones = validationResult(req);

    if (req.body.contrasena != req.body.contrasena2) {
      validaciones.errors.push({
        msg: errorRepeticionContrasena,
        param: "contrasena2"
      });
    }

    if (MailYaExistente(req.body, req.session.usuarioLogeado.id)) {
      validaciones.errors.push({
        msg: errorEmailRegistrado,
        param: "email"
      });
    }

    if (validaciones.errors.length) {
      if (req.file) {
        BorrarArchivoDeImagen(req.file.filename);
      }
      let usuario = ObtenerUsuarioPorId(req.session.usuarioLogeado.id);
      return res.render("usuario-editar", {
        usuario,
        errores: validaciones.mapped(),
        oldData: req.body,
        titulo: "Editar el Usuario",
      });
    }

    ActualizarUsuario(req.session.usuarioLogeado.id, req.body, req.file);

    res.redirect("/usuario/detalle");
  },

  eliminar: (req, res) => {
    EliminarUsuario(req.session.usuarioLogeado.id);
    res.redirect("/usuario/logout");
  },

  login: (req, res) => {
    res.render("login", { titulo: "Login" });
  },

  logeo: (req, res) => {
    let errores = validationResult(req);
    if (errores.isEmpty()) {
      let usuario = ObtenerUsuarioPorEmail(req.body.email);
      // Verificar si además coincide la contraseña
      if (usuario == undefined ||
        !bcryptjs.compareSync(req.body.contrasena, usuario.contrasena)) {
        return res.render("login", {
          errores: [{ msg: "Correo electronico y/o contraseña incorrecta" }],
          titulo: 'Login',
          oldData: req.body
        });
      };
      // Iniciar session
      req.session.usuarioLogeado = usuario;
      // Cookies
      if (req.body.recordar != undefined) {
        res.cookie('recordar', usuario.email, { maxAge: 60000 })
      };
      res.redirect("/usuario/detalle");
    } else {
      return res.render("login", {
        errores: errores.array(),
        titulo: "Login",
        oldData: req.body,
      });
    }
  },

  logout: (req, res) => {
    res.clearCookie('recordar');
    req.session.destroy();
    return res.redirect("/");
  },
};

// Funciones ********************************
function ObtenerUsuarios() {
  return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
}

function ObtenerUsuarioPorId(id) {
  const usuarios = ObtenerUsuarios();
  return usuarios.find(x => x.id == id)
}

function ObtenerUsuarioPorEmail(email) {
  const usuarios = ObtenerUsuarios();
  return usuarios.find(x => x.email == email)
}

function CrearUsuario(formBody, file) {
  const usuarios = ObtenerUsuarios();
  const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
  const nuevoUsuario = {
    id: nuevoId,
    ...formBody,
    contrasena: bcryptjs.hashSync(formBody.contrasena, 10),
    imagen: file.filename,
  };
  delete nuevoUsuario.contrasena2;
  usuarios.push(nuevoUsuario);
  GuardarUsuarios(usuarios);
  return nuevoUsuario;
}

function GuardarUsuarios(content) {
  fs.writeFileSync(usersFilePath, JSON.stringify(content, null, 2));
}

function ActualizarUsuario(id, formBody, file) {
  const usuarios = ObtenerUsuarios();
  const usuario = ObtenerUsuarioPorId(id);
  let indice = usuarios.findIndex(n => n.id == id);
  // Preparar el registro para almacenar
  const actualizado = {
    ...usuario,
    ...formBody,
    contrasena: bcryptjs.hashSync(formBody.contrasena, 10),
  };
  delete actualizado.contrasena2;
  if (file) {
    //Eliminar la imagen original
    BorrarArchivoDeImagen(usuario.imagen);
    //Cambiar el nombre de la imagen
    actualizado.imagen = file.filename;
  }
  usuarios[indice] = actualizado;
  GuardarUsuarios(usuarios);
}

function EliminarUsuario(id) {
  let usuarios = ObtenerUsuarios();
  let indice = usuarios.findIndex(n => n.id == id);
  // Borrar el archivo de imagen guardado
  BorrarArchivoDeImagen(usuarios[indice].imagen);
  //Eliminar el registro
  usuarios.splice(indice, 1);
  GuardarUsuarios(usuarios);
}

function MailYaExistente(formBody, id) {
  const usuarios = ObtenerUsuarios();
  return (usuarios.find(n => n.email === formBody.email && n.id != id) != undefined);
}

function BorrarArchivoDeImagen(nombreDeArchivo) {
  let imageFile = path.join(imagesPath, nombreDeArchivo);
  if (nombreDeArchivo && fs.existsSync(imageFile)) {
    fs.unlinkSync(imageFile);
  }
}
