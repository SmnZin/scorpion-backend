const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => { 
  const URI = process.env.MONGODB_URI;
  //`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.b7on0ah.mongodb.net/${process.env.MONGO_DB_NAME}`
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB conectado a la base de datos: ", process.env.MONGO_DB_NAME);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
