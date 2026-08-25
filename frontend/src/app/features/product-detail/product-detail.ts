import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  // Cada vez que cambia el :id en la URL, pedimos el producto correspondiente.
  // toSignal() nos permite leerlo en el template como product() sin usar "| async".
  product = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.productService.getById(id);
      })
    )
  );

  // Cantidad que el usuario quiere comprar (estado local, empieza en 1)
  quantity = signal(1);

  increaseQuantity(): void {
    const max = this.product()?.stock ?? 1;
    // Math.min evita que la cantidad supere el stock disponible
    this.quantity.update((q) => Math.min(q + 1, max));
  }

  decreaseQuantity(): void {
    // Math.max evita bajar de 1
    this.quantity.update((q) => Math.max(q - 1, 1));
  }

  addToCart(): void {
    // TODO Fase 7: aquí vamos a llamar a un CartService real en vez de un alert.
    alert(`Agregado: ${this.quantity()} x ${this.product()?.name}`);
  }
}
