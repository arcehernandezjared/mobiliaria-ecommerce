import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service'; // NUEVO

@Component({
  selector: 'app-product-detail',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService); // NUEVO

  product = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.productService.getById(id);
      })
    )
  );

  quantity = signal(1);

  increaseQuantity(): void {
    const max = this.product()?.stock ?? 1;
    this.quantity.update((q) => Math.min(q + 1, max));
  }

  decreaseQuantity(): void {
    this.quantity.update((q) => Math.max(q - 1, 1));
  }

  addToCart(): void {
    const product = this.product();
    if (!product) return;

    this.cartService.addItem(product, this.quantity());
    alert(`Agregado: ${this.quantity()} x ${product.name}`);
  }
}
