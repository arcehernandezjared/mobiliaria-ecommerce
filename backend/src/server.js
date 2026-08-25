import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import ordersRoutes from './routes/orders.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);

app.get('/', (req, res) => {
  res.send('API de Mobiliaria funcionando 🪑');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
