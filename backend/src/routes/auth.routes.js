import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios' });
  }

  const existingUser = db.data.users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Ya existe una cuenta con ese email' });
  }

  // 10 = "salt rounds": qué tan costoso computacionalmente es el hash (más alto = más seguro y más lento)
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    id: db.data.users.length ? Math.max(...db.data.users.map((u) => u.id)) + 1 : 1,
    name,
    email,
    passwordHash,
    role: 'customer', // todo registro nuevo es cliente; el admin lo crearemos a mano
  };

  db.data.users.push(newUser);
  await db.write(); // guarda los cambios en db.json

  res.status(201).json({ message: 'Usuario registrado correctamente' });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = db.data.users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// GET /api/auth/me -> ruta protegida de prueba, para verificar que el token funciona
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
