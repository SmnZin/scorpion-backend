// Scorpion/models/Cita.js
const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
    nombreCliente: String,
    correoElectronico: String,
    telefono: String,
    rut: String,
    servicioId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }],  
    fecha: Date,
    hora: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Cita', CitaSchema);
