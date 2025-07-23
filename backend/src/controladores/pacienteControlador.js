const Paciente = require('../modelos/pacienteModel');

exports.getAll = async (req, res) => {
  try {
    const result = await Paciente.getAll();
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: 'Error al obtener pacientes', detalle: e.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await Paciente.getById(req.params.id);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: 'Error al obtener paciente', detalle: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    const result = await Paciente.create(req.body);
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: 'Error al crear paciente', detalle: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Paciente.update(req.params.id, req.body);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: 'Error al actualizar paciente', detalle: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Paciente.delete(req.params.id, req.body.modificado_por);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json({ mensaje: 'Paciente eliminado lógicamente' });
  } catch (e) {
    res.status(500).json({ error: 'Error al eliminar paciente', detalle: e.message });
  }
};
