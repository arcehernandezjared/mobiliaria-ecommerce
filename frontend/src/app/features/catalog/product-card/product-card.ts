import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  // { required: true } hace que Angular avise si el componente padre
  // olvida pasar el producto. El "!" le dice a TypeScript "confía en mí,
  // esto se llena antes de usarse" (Angular lo asigna después del constructor).
  @Input({ required: true }) product!: Product;
}
