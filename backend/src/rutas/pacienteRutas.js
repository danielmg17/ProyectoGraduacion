const express = require('express');
const router = express.Router();
const pacienteController = require('../controladores/pacienteControlador');

router.get('/', pacienteController.getAll);
router.get('/:id', pacienteController.getById);
router.post('/', pacienteController.create);
router.put('/:id', pacienteController.update);
router.delete('/:id', pacienteController.delete);

module.exports = router;
