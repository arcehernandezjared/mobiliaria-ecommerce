import { Router } from 'express';
import { db } from '../db.js';

// Router es un "mini servidor" de rutas que luego montamos en la app principal.
const router = Router();

// GET /api/products  -> lista todos los productos, con filtros opcionales
// Ejemplo de uso desde el navegador: /api/products?category=Salas
router.get('/', (req, res) => {
  const { category } = req.query;
  let products = db.data.products;

  if (category) {
    products = products.filter((p) => p.category === category);
  }

  res.json(products);
});

// GET /api/products/:id -> devuelve un solo producto por su id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = db.data.products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  res.json(product);
});

export default router;
