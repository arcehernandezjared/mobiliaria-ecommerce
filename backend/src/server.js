import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.routes.js';

const app = express();
const PORT = 3000;

// Middlewares: funciones que procesan CADA petición antes de llegar a las rutas.
app.use(cors());           // Permite que Angular (otro puerto/origen) llame a esta API.
app.use(express.json());   // Convierte el body de las peticiones (JSON) en un objeto JS (req.body).

// Montamos las rutas de productos bajo el prefijo /api/products
app.use('/api/products', productsRoutes);

// Ruta simple para verificar que el servidor vive
app.get('/', (req, res) => {
  res.send('API de Mobiliaria funcionando 🪑');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
