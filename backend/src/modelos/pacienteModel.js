const db = require('../../conexion');

// Listar todos los pacientes
exports.getAll = () => db.query('SELECT * FROM pacientes');

// Obtener un paciente por ID
exports.getById = (id) => db.query('SELECT * FROM pacientes WHERE id_paciente = $1', [id]);

// Crear nuevo paciente
exports.create = (datos) => {
  const {
    usuario_id, nombre_completo, genero, fecha_nacimiento, altura_cm, peso_kg, imc, clasificacion_imc_id,
    telefono, direccion, municipio_id, estado_id, activo, creado_por
  } = datos;
  return db.query(
    `INSERT INTO pacientes (
      usuario_id, nombre_completo, genero, fecha_nacimiento, altura_cm, peso_kg, imc, clasificacion_imc_id,
      telefono, direccion, municipio_id, estado_id, activo, creado_por, fecha_creacion
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW()
    ) RETURNING *`,
    [
      usuario_id, nombre_completo, genero, fecha_nacimiento, altura_cm, peso_kg, imc, clasificacion_imc_id,
      telefono, direccion, municipio_id, estado_id, activo ?? true, creado_por
    ]
  );
};

// Actualizar paciente
exports.update = (id, datos) => {
  // Puedes mejorar para solo actualizar campos enviados
  const {
    nombre_completo, genero, fecha_nacimiento, altura_cm, peso_kg, imc, clasificacion_imc_id,
    telefono, direccion, municipio_id, estado_id, activo, modificado_por
  } = datos;
  return db.query(
    `UPDATE pacientes SET
      nombre_completo = $1, genero = $2, fecha_nacimiento = $3, altura_cm = $4, peso_kg = $5, imc = $6,
      clasificacion_imc_id = $7, telefono = $8, direccion = $9, municipio_id = $10, estado_id = $11,
      activo = $12, modificado_por = $13, fecha_modificacion = NOW()
    WHERE id_paciente = $14 RETURNING *`,
    [
      nombre_completo, genero, fecha_nacimiento, altura_cm, peso_kg, imc, clasificacion_imc_id,
      telefono, direccion, municipio_id, estado_id, activo, modificado_por, id
    ]
  );
};

// Eliminar (borrado lógico)
exports.delete = (id, modificado_por) =>
  db.query(
    `UPDATE pacientes SET activo = false, modificado_por = $1, fecha_modificacion = NOW()
     WHERE id_paciente = $2 RETURNING *`,
    [modificado_por, id]
  );
