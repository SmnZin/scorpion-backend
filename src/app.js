const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const connectDB = require('./database');


// configuracion

app.set("port", process.env.PORT || 4000);

// conectar a la base de datos
connectDB();


// middlewares (logica que se ejecuta antes de que lleguen a las rutas)
app.use(cors()); // para que el servidor acepte peticiones de otros servidores
app.use(express.json()); // para que el servidor entienda los formatos json
app.use(logger("dev")); // para que el servidor muestre mensajes en la consola
app.use(bodyParser.json()); // para que el servidor entienda los formatos json


//rutas
app.get("/", (req, res) => {
    res.send("Esto es una API REST de vio ");
});

// rutas para metodos de subida de archivos
app.use("/files", require("./routes/files"));

// rutas para metodos de citas
app.use("/citas", require("./routes/citas"));

// rutas para nuestras apis (servicios)
app.use("/servicios", require("./routes/servicios"));


module.exports = app;
