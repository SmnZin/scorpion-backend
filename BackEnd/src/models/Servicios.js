// Scorpion/models/Servicio.js
const mongoose = require('mongoose');

const ServiciosSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    duracion: Number,
    precio: Number,
    disponibilidad: Boolean,
    imagen: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Servicios', ServiciosSchema);
