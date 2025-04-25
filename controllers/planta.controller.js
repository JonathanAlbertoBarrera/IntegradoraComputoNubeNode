const Planta = require('../models/planta.model');

exports.crearPlanta = async (req, res) => {
  try {
    const nuevaPlanta = new Planta({
      ...req.body,
      imagen: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });
    await nuevaPlanta.save();
    res.status(201).json(nuevaPlanta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerPlantas = async (req, res) => {
  try {
    const plantas = await Planta.find();
    const plantasConImagenUrl = plantas.map(p => ({
      _id: p._id,
      nombre: p.nombre,
      tipo: p.tipo,
      costo_soles: p.costo_soles,
      recarga: p.recarga,
      dano: p.dano,
      resistencia: p.resistencia,
      rango: p.rango,
      velocidad_ataque: p.velocidad_ataque,
      descripcion: p.descripcion,
      imagenUrl: `${req.protocol}://${req.get('host')}/api/plantas/${p._id}/imagen`
    }));
    res.json(plantasConImagenUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerPlantaPorId = async (req, res) => {
  try {
    const p = await Planta.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Planta no encontrada' });

    const plantaConImagenUrl = {
      _id: p._id,
      nombre: p.nombre,
      tipo: p.tipo,
      costo_soles: p.costo_soles,
      recarga: p.recarga,
      dano: p.dano,
      resistencia: p.resistencia,
      rango: p.rango,
      velocidad_ataque: p.velocidad_ataque,
      descripcion: p.descripcion,
      imagenUrl: `${req.protocol}://${req.get('host')}/api/plantas/${p._id}/imagen`
    };

    res.json(plantaConImagenUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizarPlanta = async (req, res) => {
  try {
    const dataActualizada = req.file
      ? { ...req.body, imagen: { data: req.file.buffer, contentType: req.file.mimetype } }
      : req.body;
    const planta = await Planta.findByIdAndUpdate(req.params.id, dataActualizada, { new: true });
    if (!planta) return res.status(404).json({ error: 'Planta no encontrada' });
    res.json(planta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminarPlanta = async (req, res) => {
  try {
    const planta = await Planta.findByIdAndDelete(req.params.id);
    if (!planta) return res.status(404).json({ error: 'Planta no encontrada' });
    res.json({ mensaje: 'Planta eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verImagen = async (req, res) => {
  try {
    const planta = await Planta.findById(req.params.id);
    if (!planta || !planta.imagen || !planta.imagen.data) {
      return res.status(404).send('Imagen no encontrada');
    }

    // Establecer el tipo de contenido adecuado (por ejemplo, image/png)
    const contentType = planta.imagen.contentType || 'image/png';

    // Configurar el encabezado y enviar la imagen directamente
    res.set('Content-Type', contentType);
    res.send(planta.imagen.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};