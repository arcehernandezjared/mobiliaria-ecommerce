import jwt from 'jsonwebtoken';

// Middleware: verifica que la petición traiga un token válido.
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization; // formato esperado: "Bearer eyJhbGci..."

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
  }

  const token = authHeader.split(' ')[1]; // nos quedamos solo con el token, sin "Bearer "

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // guardamos { id, email, role } para usarlo en la siguiente función
    next(); // todo bien, continúa hacia la ruta real
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

// Middleware extra: además de estar logueado, exige que sea admin.
// Lo usaremos en la Fase 3 para proteger el CRUD de productos.
export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }
  next();
}
