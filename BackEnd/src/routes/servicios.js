const { Router } = require("express");
const router = Router();

const {
  crearServicios,
  obtenerServicio,
  obtenerServicios,
  modificarServicio,
  eliminarServicio,
} = require("../controllers/Servicios-controller");

// Para todos los servicios
router
  .route("/")
  .post(crearServicios)// Para crear un nuevo servicio
  .get(obtenerServicios);// Para obtener todos los servicios

// Para servicios individuales por id
router
  .route("/:id")
  .get(obtenerServicio) // Para obtener los detalles de un servicio
  .put(modificarServicio) // Para modificar un servicio existente
  .delete(eliminarServicio); // Para eliminar un servicio

module.exports = router;
