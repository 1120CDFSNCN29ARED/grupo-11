const fs = require("fs");
let path = require("path");
const usersFilePath = path.join(__dirname, "../database/usuarios.json");

function cookieRecordar(req, res, next){
   if(req.cookies.recordar != undefined && req.session.usuariologeado == undefined){
      let usuarios = GetFileObject(usersFilePath);
      let usuarioALogearse;
      usuarioALogearse = usuarios.find(n => n.email == req.cookies.recordar);
      req.session.usuarioLogeado = usuarioALogearse;
   }
   next();
}

module.exports = cookieRecordar;

function GetFileObject(filePath) {
   return JSON.parse(fs.readFileSync(filePath, "utf-8"))
};