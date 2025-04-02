const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const plantaCtrl = require('../controllers/planta.controller');

router.post('/', upload.single('imagen'), plantaCtrl.crearPlanta);
router.get('/', plantaCtrl.obtenerPlantas);
router.get('/:id', plantaCtrl.obtenerPlantaPorId);
router.get('/:id/imagen', plantaCtrl.verImagen);
router.put('/:id', upload.single('imagen'), plantaCtrl.actualizarPlanta);
router.delete('/:id', plantaCtrl.eliminarPlanta);

module.exports = router;
