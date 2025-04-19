const mongoose = require('mongoose');

const plantaSchema = new mongoose.Schema({
  nombre: String,
  tipo: String,
  costo_soles: Number,
  recarga: Number,
  dano: Number,
  resistencia: String,
  rango: String,
  velocidad_ataque: String,
  descripcion: String,
  imagen: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Planta', plantaSchema);
