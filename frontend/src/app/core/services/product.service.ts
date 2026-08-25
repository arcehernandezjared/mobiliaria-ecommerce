import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

// URL base de tu API backend (la que armamos en las Fases 1-3).
// Por ahora la dejamos "quemada" aquí; más adelante se podría mover
// a un archivo de configuración por ambiente (dev/producción).
const API_URL = 'http://localhost:3000/api/products';

@Injectable({
  providedIn: 'root', // una sola instancia de este servicio para toda la app
})
export class ProductService {
  // inject(HttpClient) le pide a Angular la instancia ya configurada de HttpClient
  private http = inject(HttpClient);

  // Trae todos los productos. Si se pasa "category", filtra en el backend
  // usando el query param que ya soporta tu endpoint GET /api/products?category=...
  getAll(category?: string): Observable<Product[]> {
    const url = category ? `${API_URL}?category=${category}` : API_URL;
    return this.http.get<Product[]>(url); // <Product[]> le dice a TS qué forma esperar en la respuesta
  }

  // Trae un solo producto por id (lo usaremos en la Fase 6, detalle de producto)
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/${id}`);
  }
}
