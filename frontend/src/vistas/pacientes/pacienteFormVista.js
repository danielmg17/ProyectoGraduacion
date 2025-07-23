import React, { useState } from 'react';
import { crearPaciente } from '../../serviciosAPI/pacienteServicioAPI';

function PacienteForm({ onPacienteCreado }) {
  const [form, setForm] = useState({
    usuario_id: '',
    nombre_completo: '',
    genero: '',
    fecha_nacimiento: '',
    // agrega los campos que necesites...
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await crearPaciente(form);
      onPacienteCreado && onPacienteCreado();
      setForm({ usuario_id: '', nombre_completo: '', genero: '', fecha_nacimiento: '' });
    } catch (err) {
      alert('Error al crear paciente');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="usuario_id" value={form.usuario_id} onChange={handleChange} placeholder="ID Usuario" />
      <input name="nombre_completo" value={form.nombre_completo} onChange={handleChange} placeholder="Nombre completo" />
      <input name="genero" value={form.genero} onChange={handleChange} placeholder="Género" />
      <input name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} placeholder="Fecha de nacimiento" type="date" />
      {/* Más campos si deseas */}
      <button type="submit">Crear Paciente</button>
    </form>
  );
}

export default PacienteForm;
