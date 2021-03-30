const fs = require("fs");
let path = require("path");
const usersFilePath = path.join(__dirname, "../database/usuarios.json");

function cookieRecordar(req, res, next){
    next();
 if(req.cookies.recordar != undefined && req.session.usuariologeado == undefined){
    let usuarios = GetFileObject(usersFilePath);
    let usuarioALogearse;
    for (i = 0; i < usuarios.length; i++) {
         if(usuarios[i].email == req.cookies.recordar ){
          usuarioALogearse = usuarios[i];
          break;
         }
    }
       req.session.usuarioLogeado = usuarioALogearse;
 }
}

module.exports = cookieRecordar;

function GetFileObject(filePath) {
   return JSON.parse(fs.readFileSync(filePath, "utf-8"))
};