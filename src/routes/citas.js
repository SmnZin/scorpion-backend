const {Router} = require('express');
const router = Router();

const {crearCita, obtenerCitas, modificarCita, eliminarCita, getHorariosDisponibles} = require('../controllers/Cita-controller');

// Para todas las citas
router.route('/')
    
    .post(crearCita)  // Para crear una nueva cita
    .get(obtenerCitas);  // Para obtener todas las citas

// Para citas individuales por id
router.route('/:id')
    .get(obtenerCitas)  // Para obtener los detalles de una cita
    .put(modificarCita)  // Para modificar una cita existente
    .delete(eliminarCita);  // Para eliminar una cita

router.route('/horariosDisponibles/:fecha')
    .get(getHorariosDisponibles);  // Para obtener los horarios disponibles

module.exports = router;
