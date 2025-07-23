require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importa y monta rutas
//const pacienteRoutes = require('./routes/pacienteRoutes');
//app.use('/api/pacientes', pacienteRoutes);

const pacienteRoutes = require('./src/rutas/pacienteRutas');
app.use('/api/pacientes', pacienteRoutes);


// Prueba de vida
app.get('/', (req, res) => {
  res.send('API Nutriapp funcionando 😺');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
