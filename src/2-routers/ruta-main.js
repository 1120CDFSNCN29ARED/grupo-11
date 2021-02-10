const express= require('express');
const controladorMain = require('../1-controllers/controlador-main')

const router = express.Router();

router.get('/:id', controladorMain.index);

module.exports = router;
