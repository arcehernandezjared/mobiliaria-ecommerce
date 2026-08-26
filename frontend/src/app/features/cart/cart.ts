import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  // público (sin "private") porque el template accede a él directamente
  cartService = inject(CartService);

  onQuantityChange(productId: number, value: string): void {
    this.cartService.updateQuantity(productId, Number(value));
  }
}
