// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Importar conexión a la base de datos
const sequelize = require('./src/database/db');

// Importar rutas (ejemplo: pacientes)
const pacienteRoutes = require('./src/routes/pacienteRoutes');
// Puedes agregar aquí otras rutas: usuarios, auth, etc.

app.use('/api/pacientes', pacienteRoutes);

// Ruta simple para probar que el servidor corre
app.get('/', (req, res) => {
  res.send('API Nutriapp funcionando 😺');
});

// Sincronizar la base de datos y levantar el servidor
const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Error al conectar la base de datos:', error);
});
