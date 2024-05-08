const express = require('express');
const app = express();

// URL pública del archivo JSON en Google Drive
const JSON_URL = 'https://drive.google.com/file/d/1--KjTiCx07aSQG9J1dzqYABOzTMlJctn/view';

// Ruta para consultar información por Rut
app.get('/api/:rut', async (req, res) => {
  const { rut } = req.params;

  try {
    // Descargar el archivo JSON desde Google Drive
    const json = await fetch(JSON_URL);
    const data = await json.json();

    // Buscar la entrada correspondiente al Rut proporcionado
    const result = data.find(item => item.rut === rut);

    if (result) {
      // Si se encuentra, devolver los campos MONTO, FORMA_DE_PAGO y MENSAJE
      res.json({ MONTO: result.MONTO, FORMA_DE_PAGO: result.FORMA_DE_PAGO, MENSAJE: result.MENSAJE });
    } else {
      res.status(404).json({ error: 'No se encontraron datos para el Rut proporcionado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Manejar otras rutas
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Exportar el servidor Express para que Vercel pueda manejarlo
module.exports = app;