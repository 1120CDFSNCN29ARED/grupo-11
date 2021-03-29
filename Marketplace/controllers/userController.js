// Requires ***********************************
const fs = require("fs");
let path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

// Archivos y Paths ****************************
const usersFilePath = path.join(__dirname, "../database/usuarios.json");
const imagesPath = path.join(__dirname, "../public/images/users/");

// Controlador ********************************
module.exports = {

  crearForm: (req, res) => {
    res.render("usuario-crear", {
      usuario: null,
      mailYaUsado: false,
      coincidencia: true,
      titulo: "Registro",
    });
  },

  crearGuardar: (req, res) => {
    // Validar campos en general
    let validaciones = validationResult(req);
    // Validar campo "Repetir contraseña"
    let coincidencia = req.body.contrasena == req.body.contrasena2;
    // Validar email con la BD
    let BD = GetFileObject(usersFilePath);
    let mailYaUsado = mailEnBD(req.body.email, BD);
    // Verificar si existe algún error de validación
    if (validaciones.errors.length > 0 || !coincidencia || mailYaUsado) {
      // Borrar el archivo de imagen guardado
      req.file ? (archivo = req.file.filename) : (archivo = "");
      BorrarArchivoDeImagen(archivo);
      // Regresar al formulario de crear
      return res.render("usuario-crear", {
        usuario: null,
        mailYaUsado,
        coincidencia,
        errores: validaciones.mapped(),
        oldData: req.body,
        titulo: "Registro",
      });
    }
    // Preparar el registro para almacenar
    BD = GetFileObject(usersFilePath);
    const nuevoId = BD.length > 0 ? BD[BD.length - 1].id + 1 : 1;
    const nuevoUsuario = {
      id: nuevoId,
      ...req.body,
      contrasena: bcryptjs.hashSync(req.body.contrasena, 10),
      imagen: req.file.filename,
    };
    delete nuevoUsuario.contrasena2;
    BD.push(nuevoUsuario);
    // Guardar el registro
    WriteFile(usersFilePath, BD);
    // Inciar session
    req.session.usuarioLogeado = nuevoUsuario
    // Redireccionar
    res.redirect("/usuario/detalle");
  },

  detalle: (req, res) => {
    ID = req.session.usuarioLogeado.id
    const BD = GetFileObject(usersFilePath);
    let usuario = BD.find(n => n.id == ID);
    res.render("usuario-detalle", {
      usuario,
      titulo: "Detalle del Usuario",
    });
  },

  editarForm: (req, res) => {
    ID = req.session.usuarioLogeado.id
    let BD = GetFileObject(usersFilePath);
    let usuario = BD.find(n => n.id == ID);
    res.render("usuario-editar", {
      usuario,
      mailYaUsado: false,
      coincidencia: true,
      titulo: "Editar el Usuario",
    });
  },

  editarGuardar: (req, res) => {
    // Datos generales
    ID = req.session.usuarioLogeado.id
    let BD = GetFileObject(usersFilePath);
    let usuario = BD.find(n => n.id == ID);
    let indice = BD.findIndex(n => n.id == ID);
    // Validar campos en general
    let validaciones = validationResult(req);
    // Quitar error por "Tienes que subir una imagen"
    if (validaciones.errors.length) {
      indiceError = validaciones.errors.findIndex(n => n.msg == "Tienes que subir una imagen");
      indiceError >= 0 ? validaciones.errors.splice(indiceError, 1) : null;
    }
    // Validar campo "Repetir contraseña"
    let coincidencia = req.body.contrasena == req.body.contrasena2;
    // Validar email con la BD
    let mailYaUsado = BD.find(n => n.email == req.body.email && n.id != ID);
    // Verificar si existe algún error de validación
    if (validaciones.errors.length || !coincidencia || mailYaUsado) {
      // Borrar el archivo de imagen guardado
      req.file ? (archivo = req.file.filename) : (archivo = "");
      BorrarArchivoDeImagen(archivo);
      // Regresar al formulario de crear
      return res.render("usuario-editar", {
        usuario,
        mailYaUsado,
        coincidencia,
        errores: validaciones.mapped(),
        oldData: req.body,
        titulo: "Editar el Usuario",
      });
    }
    // Preparar el registro para almacenar
    const actualizado = {
      ...usuario,
      ...req.body,
      contrasena: bcryptjs.hashSync(req.body.contrasena, 10),
    };
    delete actualizado.contrasena2;
    if (req.file) {
      //Eliminar la imagen original
      archivo = usuario.imagen;
      BorrarArchivoDeImagen(archivo);
      //Cambiar el nombre de la imagen
      actualizado.imagen = req.file.filename;
    }
    BD[indice] = actualizado;
    WriteFile(usersFilePath, BD);
    res.redirect("/usuario/detalle");
  },

  eliminar: (req, res) => {
    ID = req.session.usuarioLogeado.id
    let BD = GetFileObject(usersFilePath);
    let indice = BD.findIndex(n => n.id == ID);
    // Borrar el archivo de imagen guardado
    archivo = BD[indice].imagen;
    BorrarArchivoDeImagen(archivo);
    //Eliminar el registro
    BD.splice(indice, 1);
    WriteFile(usersFilePath, BD);
    res.redirect("/usuario/logout");
  },

  login: (req, res) => {
    res.render("login", { titulo: "Login" });
  },

  logeo: (req, res) => {
    let errores = validationResult(req);
    if (errores.isEmpty()) {
      let usuarios = GetFileObject(usersFilePath);
      let usuarioALogearse;
      for (i = 0; i < usuarios.length; i++) {
        if (
          req.body.email == usuarios[i].email &&
          bcryptjs.compareSync(req.body.contrasena, usuarios[i].contrasena)
        ) {
          usuarioALogearse = usuarios[i];
          break;
        }
      }

      if (usuarioALogearse == undefined) {
        return res.render("login", {
          errores: [{ msg: "Correo electronico y/o Contraseña incorrecta" }],
          titulo: "Login",
          oldData: req.body,
        });
      }
      // Iniciar session
      req.session.usuarioLogeado = usuarioALogearse;
      // Redireccionar a Detalle de usuario
      res.redirect("/usuario/detalle");
      // Redireccionar a Login de nuevo
    } else {
      return res.render("login", {
        errores: errores.array(),
        titulo: "Login",
        oldData: req.body,
      });
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
};

// Funciones ********************************
function GetFileObject(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function WriteFile(filePath, content) {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}

function mailEnBD(texto, BD) {
  let usuario = BD.find(n => n.email === texto);
  return usuario;
}

function BorrarArchivoDeImagen(nombreDeArchivo) {
  let imageFile = path.join(imagesPath, nombreDeArchivo);
  if (nombreDeArchivo && fs.existsSync(imageFile)) {
    fs.unlinkSync(imageFile);
  }
}
