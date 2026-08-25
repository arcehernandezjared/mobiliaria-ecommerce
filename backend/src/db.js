import { JSONFilePreset } from 'lowdb/node';

// Estructura por defecto de nuestra "base de datos".
// Si el archivo db.json no existe, lowdb lo crea con estos datos iniciales.
const defaultData = {
  products: [
    {
      id: 1,
      name: 'Sofá Nórdico 3 plazas',
      description: 'Sofá tapizado en tela gris, patas de madera de roble.',
      price: 8999,
      category: 'Salas',
      stock: 12,
      imageUrl: 'https://picsum.photos/seed/sofa1/400/300',
    },
    {
      id: 2,
      name: 'Mesa de Comedor Roble 6 personas',
      description: 'Mesa extensible de madera maciza de roble.',
      price: 6499,
      category: 'Comedores',
      stock: 8,
      imageUrl: 'https://picsum.photos/seed/mesa1/400/300',
    },
    {
      id: 3,
      name: 'Cama Matrimonial Minimalista',
      description: 'Base de cama con cabecera tapizada, incluye tablero.',
      price: 5299,
      category: 'Recámaras',
      stock: 15,
      imageUrl: 'https://picsum.photos/seed/cama1/400/300',
    },
    {
      id: 4,
      name: 'Silla de Oficina Ergonómica',
      description: 'Silla con soporte lumbar y ajuste de altura.',
      price: 2199,
      category: 'Oficina',
      stock: 20,
      imageUrl: 'https://picsum.photos/seed/silla1/400/300',
    },
  ],
  users: [],
  orders: [],
};

// JSONFilePreset crea (o abre) db.json y nos da un objeto `db`
// con `db.data` (el contenido) y `db.write()` (para guardar cambios en disco).
export const db = await JSONFilePreset('src/data/db.json', defaultData);
