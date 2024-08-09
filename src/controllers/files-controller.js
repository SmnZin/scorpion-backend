const mongoose = require("mongoose");
const { upload } = require("../utils/upload");
const Servicios = require("../models/Servicios");


let bucket;
mongoose.connection.on("connected", () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "filesBucket",
  });
});

//funcion para subir archivos
const uploadFile = async (req, res) => {
  try {
      const serviceId = req.body.serviceId;
      const fileId = req.file.id;

      if (!serviceId) {
          return res.status(400).json({ message: "Service ID es requerido" });
      }

      const servicio = await Servicios.findById(serviceId);
      if (!servicio) {
          return res.status(404).json({ message: "Servicio no encontrado" });
      }

      //no se que tan necesario sea esto
      // Convertir duracion de { horas: x, minutos: y } a minutos totales 
      if (typeof req.body.duracion === 'object') {
          const { horas, minutos } = req.body.duracion;
          servicio.duracion = (horas * 60) + minutos;
      } else {
          servicio.duracion = req.body.duracion;
      }

      servicio.disponibilidad = req.body.disponibilidad;
      servicio.imageFileId = fileId;
      await servicio.save();

      res.status(201).json({ message: "Archivo subido y referenciado con éxito" });
  } catch (err) {
      console.log(err);
      res.status(400).json({
          error: { text: "Unable to upload the file", error: err },
      });
  }
};

//funcion para descargar archivos
const getFile = async (req, res) => {
    try {
      const { Id: fileId } = req.params;
  
      // verifica si existe el archivo en el bucket
      const file = await bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
      if (file.length === 0) {
        return res.status(404).json({ message: "Archivo no encontrado" });
      }
  
      // seteamos el header para que el navegador sepa que es un archivo
      res.set('Content-Type', file[0].contentType);
    
  
      // creamos un stream para leer el archivo
      const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
      downloadStream.pipe(res);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: { text: "Error al descargar el archivo", err },
      });
    }
  }
  

// Función para eliminar archivos del bucket
const deleteFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;
        
        // Asegúrate de que el fileId no está undefined y es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ error: "Invalid file ID" });
        }
  
        // Encuentra el servicio que tiene el fileId como referencia
        const servicio = await Servicios.findOne({ imageFileId: fileId });
        if (servicio) {
            // Si se encuentra el servicio, elimina la referencia del fileId
            servicio.imageFileId = null; // O puedes eliminar la propiedad completamente con `delete servicio.imageFileId;`
            await servicio.save();
        }
  
        const objectId = new mongoose.Types.ObjectId(fileId);
        await bucket.delete(objectId);
        res.status(200).json({ message: "File eliminado y referencia actualizada" });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            error: { text: "Error al eliminar el archivo", err },
        });
    }
  }

module.exports = { uploadFile, getFile, upload, deleteFile };