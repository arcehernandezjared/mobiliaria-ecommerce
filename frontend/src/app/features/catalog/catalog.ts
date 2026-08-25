import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-catalog',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {
  private productService = inject(ProductService);

  // products$ es un Observable (la "$" al final es una convención de nombres,
  // no funcionalidad, para recordar que la variable es un Observable).
  // Se inicializa trayendo TODOS los productos.
  products$: Observable<Product[]> = this.productService.getAll();

  // Se ejecuta cuando el usuario hace clic en un botón de categoría.
  // Reasignar products$ hace que el "async" pipe del template se re-suscriba
  // automáticamente al nuevo Observable.
  filterByCategory(category?: string): void {
    this.products$ = this.productService.getAll(category);
  }
}
