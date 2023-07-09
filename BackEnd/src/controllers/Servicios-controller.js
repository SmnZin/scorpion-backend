const servicioCtrl = {};

const Servicios = require("../models/Servicios");

// crear servicio
servicioCtrl.crearServicios =  async (req, res) => {
  const servicios = req.body;
  const serviciosCreados = {};

  for (const servicioKey in servicios) {
    const servicioData = servicios[servicioKey];
    const nuevoServicio = new Servicios({
      nombre: servicioData.nombre,
      descripcion: servicioData.descripcion,
      duracion: servicioData.duracion,
      precio: servicioData.precio,
      disponibilidad: servicioData.disponibilidad,
    });

    try {
      await nuevoServicio.save();
      serviciosCreados[servicioKey] = nuevoServicio;
    } catch (error) {
      res
        .status(400)
        .json({ mensaje: "Error al crear el servicio", error: error });
    }
  }

  res
    .status(201)
    .json({
      mensaje: "Servicios creados con éxito",
      servicios: serviciosCreados,
    });
};

// obtener un servicio en especifico
servicioCtrl.obtenerServicio = async (req, res) => {
  const servicio = await Servicios.findById(req.params.id);
  res.json(servicio);
};

// obtener todos los servicios
servicioCtrl.obtenerServicios = async (req, res) => {
  const servicioss = await Servicios.find();
  res.json(servicioss);
};

// modificar servicio
servicioCtrl.modificarServicio = async (req, res) => {
  const { nombre, descripcion, duracion, precio } = req.body;
  await Servicios.findByIdAndUpdate(req.params.id, {
    nombre,
    descripcion,
    duracion,
    precio,
    disponibilidad,
    imagen,
  });
  try {
    res.status(200).json({ mensaje: "Servicio modificado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al modificar el servicio", error: error });
  }
};

// eliminar servicio
servicioCtrl.eliminarServicio = async (req, res) => {
  await Servicios.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json({ mensaje: "Servicio eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar el servicio", error: error });
  }
};

module.exports = servicioCtrl;
