const { check } = require("express-validator");

module.exports = [
    check("email")
        .notEmpty()
        .withMessage("Tienes que escribir un correo electrónico")
        .bail()
        .isEmail()
        .withMessage("Formato inválido de correo electrónico")
        .bail(),

    check("contrasena")
        .notEmpty()
        .withMessage("Tienes que escribir una contraseña")
        .bail(),
];
