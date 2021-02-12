const express= require('express');
const controladorMain = require('../1-controllers/controlador-main')

const router = express.Router();

router.get('/', controladorMain.home);
router.get('/:id', controladorMain.main);

module.exports = router;
