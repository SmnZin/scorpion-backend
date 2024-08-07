// Scorpion/models/Servicio.js
const mongoose = require('mongoose');

const ServiciosSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    duracion: {
        horas: Number,
        minutos: Number,
      },
    precio: Number,
    disponibilidad: Boolean,
    imageFileId: String // Guardar referencia del archivo en GridFS
}, {
    timestamps: true
});

module.exports = mongoose.model('Servicios', ServiciosSchema);
