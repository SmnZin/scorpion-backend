const citaCtrl = {};

const Cita = require("../models/Cita");

//crear cita
citaCtrl.crearCita = async (req, res) => {
  // Asigna los datos del cliente provenientes del request a un nuevo objeto Cita
  const cita = req.body;
  const nuevaCita = new Cita({
    servicioId: cita.servicioId,
    fecha: cita.fecha,
    hora: cita.hora,
    nombreCliente: cita.nombreCliente,
    correoElectronico: cita.correoElectronico,
    telefono: cita.telefono,
    rut: cita.rut,
  });
  await nuevaCita.save();
  res
    .status(201)
    .json({ mensaje: "Cita creada con éxito", cita: nuevaCita._id });
};

citaCtrl.getHorariosDisponibles = async (req, res) => {
  let fechaDeseada = new Date(req.params.fecha);

  // Ajusta la fecha a la zona horaria del servidor
  fechaDeseada.setMinutes(
    fechaDeseada.getMinutes() + fechaDeseada.getTimezoneOffset()
  );

  const horariosPosibles = [];
  const inicio = fechaDeseada.getDay() === 6 ? 10 : 11; // Si es sábado, el horario de atención comienza a las 10:00, de lo contrario a las 11:00
  const fin = fechaDeseada.getDay() === 6 ? 19 : 21; // Si es sábado, el horario de atención termina a las 19:00, de lo contrario a las 21:00
  for (let i = inicio; i < fin; i++) {
    const horas = Math.floor(i);
    horariosPosibles.push({ hora: `${horas}:00`, disponible: true });
  }

  try {
    const fechaInicio = new Date(fechaDeseada.setHours(0, 0, 0, 0));
    const fechaFin = new Date(fechaDeseada.setHours(23, 59, 59, 999));

    const citas = await Cita.find({
      fecha: {
        $gte: fechaInicio,
        $lte: fechaFin,
      },
    });
    const horariosReservados = citas.map((cita) => cita.hora.split(":")[0]);
    const horariosDisponibles = horariosPosibles.map((horario) => {
      return {
        hora: horario.hora,
        disponible: !horariosReservados.includes(horario.hora.split(":")[0]),
      };
    });
    res.json(horariosDisponibles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//obtener todas las citas
citaCtrl.obtenerCitas = async (req, res) => {
  const citas = await Cita.find();
  res
    .status(201)
    .json({
      mensaje: "Citas obtenidas con éxito",
      citas: citas._id,
      fecha: citas.fecha,
      hora: citas.hora,
      nombreCliente: citas.nombreCliente,
    });
  //no muesta los datos del servicio
};

//obtener una cita en especifico
citaCtrl.obtenerCita = async (req, res) => {
  const cita = await Cita.findById(req.params.id);
  res.json(cita._id);
};

//modificar cita (update)
citaCtrl.modificarCita = async (req, res) => {
  const {
    servicioId,
    fecha,
    hora,
    nombreCliente,
    correoElectronico,
    telefono,
    rut,
  } = req.body;
  await Cita.findByIdAndUpdate(req.params.id, {
    nombreCliente,
    correoElectronico,
    telefono,
    rut,
    servicioId,
    fecha,
    hora,
  });
  try {
    res.status(200).json({ mensaje: "Cita modificada con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al modificar la cita", error: error });
  }
};

//eliminar cita
citaCtrl.eliminarCita = async (req, res) => {
  try {
    // Estructura el id a partir de los parámetros de la solicitud
    const { id } = req.params;

    // Busca la cita por su id y la elimina
    await Cita.findByIdAndRemove(id);

    // Si la eliminación fue exitosa, enviar una respuesta con un mensaje de éxito
    res.status(200).json({ mensaje: "Cita eliminada con éxito" });
  } catch (error) {
    // Manejo de errores, e.g. si hay un problema con la conexión a la base de datos
    res
      .status(500)
      .json({ mensaje: "Error al eliminar la cita", error: error });
  }
};

module.exports = citaCtrl;
