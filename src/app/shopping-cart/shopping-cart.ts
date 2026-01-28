import { Component } from '@angular/core';
import { Product } from '../product';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-shopping-cart',
  imports: [MatDivider],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  shoppingCartItems: [Product, number][] = [];
  shoppingCartSum: number = 0;
  lastId: number = 0;

  addShoppingCartItem(product: Product) {
    this.shoppingCartItems.push([product, ++this.lastId]);
    this.shoppingCartSum += product.price;
  }

  removeFromShoppingCart(product: [Product, number]) {
    this.shoppingCartItems = this.shoppingCartItems.filter(p => p[1] !== product[1]);
    this.shoppingCartSum -= product[0].price;
    if (this.shoppingCartItems.length === 0) {
      this.shoppingCartSum = 0;
    }
  }
}
