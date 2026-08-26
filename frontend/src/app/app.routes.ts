import { Routes } from '@angular/router';
import { Catalog } from './features/catalog/catalog';
import { ProductDetail } from './features/product-detail/product-detail';
import { Cart } from './features/cart/cart';

export const routes: Routes = [
  { path: '', component: Catalog },
  { path: 'producto/:id', component: ProductDetail },
  { path: 'carrito', component: Cart },
];
