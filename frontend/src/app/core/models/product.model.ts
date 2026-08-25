// Una "interface" en TypeScript no genera código real: es solo un contrato
// que describe la forma que debe tener un objeto. Sirve para que el editor
// y el compilador te avisen si usas mal un campo (ej. product.pric en vez de product.price).
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}
