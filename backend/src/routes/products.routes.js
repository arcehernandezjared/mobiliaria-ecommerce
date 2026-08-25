import { Router } from 'express';
import { db } from '../db.js';
import { verifyToken, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/products -> lista todos los productos, con filtros opcionales
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

// POST /api/products -> crear producto (solo admin)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  const { name, description, price, category, stock, imageUrl } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: 'name, price y category son obligatorios' });
  }

  const newProduct = {
    id: db.data.products.length ? Math.max(...db.data.products.map((p) => p.id)) + 1 : 1,
    name,
    description: description || '',
    price,
    category,
    stock: stock ?? 0,
    imageUrl: imageUrl || '',
  };

  db.data.products.push(newProduct);
  await db.write();

  res.status(201).json(newProduct);
});

// PUT /api/products/:id -> actualizar producto (solo admin)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const product = db.data.products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  Object.assign(product, req.body); // sobreescribe solo los campos que vengan en el body
  await db.write();

  res.json(product);
});

// DELETE /api/products/:id -> eliminar producto (solo admin)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const index = db.data.products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  db.data.products.splice(index, 1);
  await db.write();

  res.json({ message: 'Producto eliminado' });
});

export default router;
