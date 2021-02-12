const express= require('express');
const controladorMain = require('../1-controllers/controlador-main')
let path = require('path')

const router = express.Router();

router.get('/', (req, res) => {res.render('index');})
/* res.render(controladorMain.home); */

router.get('/:id', (req, res) => {res.render(req.params.id);})
/* router.get('/:id', controladorMain.main); */

module.exports = router;
