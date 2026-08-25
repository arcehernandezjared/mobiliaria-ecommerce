import { Routes } from '@angular/router';
import { Catalog } from './features/catalog/catalog';
import { ProductDetail } from './features/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: Catalog },
  { path: 'producto/:id', component: ProductDetail },
];
