const express = require("express");
const cors = require("cors");
const app = express();

// configuracion

app.set("port", process.env.PORT || 4000);

// middlewares (logica que se ejecuta antes de que lleguen a las rutas)
app.use(cors()); // para que el servidor acepte peticiones de otros servidores
app.use(express.json()); // para que el servidor entienda los formatos json

//rutas
app.get("/", (req, res) => {
    res.send("Esto es una API REST de vio ");
});

// rutas para nuestras apis (citas)
app.use("/api/citas", require("./routes/citas"));

// rutas para nuestras apis (servicios)
app.use("/api/servicios", require("./routes/servicios"));


module.exports = app;
