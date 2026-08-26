import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

const STORAGE_KEY = 'mobiliaria-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  // Signal privado: solo este servicio puede escribirlo directamente.
  // Se inicializa leyendo lo que haya guardado en localStorage (o vacío).
  private itemsSignal = signal<CartItem[]>(loadFromStorage());

  // Versión de solo lectura, expuesta a los componentes.
  items = this.itemsSignal.asReadonly();

  // Se recalculan solos cada vez que itemsSignal cambia.
  totalItems = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  addItem(product: Product, quantity: number): void {
    const items = this.itemsSignal();
    const existing = items.find((i) => i.product.id === product.id);

    if (existing) {
      // ya estaba en el carrito: sumamos a la cantidad que ya tenía
      this.updateQuantity(product.id, existing.quantity + quantity);
    } else {
      this.setItems([...items, { product, quantity }]);
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const items = this.itemsSignal().map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.setItems(items);
  }

  removeItem(productId: number): void {
    const items = this.itemsSignal().filter((item) => item.product.id !== productId);
    this.setItems(items);
  }

  clear(): void {
    this.setItems([]);
  }

  // Punto único donde se actualiza el signal Y se guarda en localStorage,
  // para que nunca se nos olvide sincronizar ambos.
  private setItems(items: CartItem[]): void {
    this.itemsSignal.set(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
