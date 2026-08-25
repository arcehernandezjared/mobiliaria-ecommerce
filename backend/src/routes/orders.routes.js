import { Router } from 'express';
import { db } from '../db.js';
import { verifyToken, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// POST /api/orders -> crear una orden (cualquier usuario logueado)
router.post('/', verifyToken, async (req, res) => {
  const { items } = req.body; // esperado: [{ productId, quantity }, ...]

  if (!items || !items.length) {
    return res.status(400).json({ message: 'La orden debe tener al menos un producto' });
  }

  let total = 0;
  const orderItems = [];

  for (const item of items) {
    const product = db.data.products.find((p) => p.id === item.productId);

    if (!product) {
      return res.status(404).json({ message: `Producto ${item.productId} no existe` });
    }
    if (product.stock < item.quantity) {
      return res.status(409).json({ message: `No hay stock suficiente de "${product.name}"` });
    }

    product.stock -= item.quantity;
    total += product.price * item.quantity;

    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const newOrder = {
    id: db.data.orders.length ? Math.max(...db.data.orders.map((o) => o.id)) + 1 : 1,
    userId: req.user.id,
    items: orderItems,
    total,
    status: 'pendiente',
    createdAt: new Date().toISOString(),
  };

  db.data.orders.push(newOrder);
  await db.write();

  res.status(201).json(newOrder);
});

// GET /api/orders/mine -> las órdenes del usuario logueado
router.get('/mine', verifyToken, (req, res) => {
  const myOrders = db.data.orders.filter((o) => o.userId === req.user.id);
  res.json(myOrders);
});

// GET /api/orders -> todas las órdenes (solo admin, para el panel)
router.get('/', verifyToken, requireAdmin, (req, res) => {
  res.json(db.data.orders);
});

export default router;
