import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { PullData } from '../pull-data';
import { Product } from '../product';
import { ProductFrame } from '../product-frame/product-frame';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../filter-pipe';
import { Categorie } from '../categories';
import { CategoryHeader } from "../category-header/category-header";
import { ShoppingCart } from "../shopping-cart/shopping-cart";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [ProductFrame, FormsModule, FilterPipe, CategoryHeader, ShoppingCart],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {

  dataService = inject(PullData);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router)
  products: Product[] = [];
  allProducts: Product[] = [];
  categories: Categorie[] = [];
  searchString: string = '';
  currentCategoryId: number = 0;
  mostExpensiveProductPrice: number = 0;
  priceSliderValue: number = 0;
  @ViewChild(ShoppingCart) shoppingCart!: ShoppingCart;

  ngOnInit() {
    this.dataService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.products = [...products];
        this.mostExpensiveProductPrice = this.getHighestPrice(this.allProducts);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Fehler beim Laden der Produkte:', err);
      }
    });

    this.dataService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Fehler beim Laden der Kategorien: ', err);
      }
    });
  }

  getHighestPrice(products: Product[]): number {
    var highestPrice: number = 0;
    for (let index = 0; index < products.length; index++) {
      const currentPrice = products[index].price;
      if(currentPrice > highestPrice) {
        highestPrice = currentPrice;
      }
    }
    return highestPrice;
  }

  sortByCategory(category: string) {
    if(category == 'alle') {
      this.products = this.allProducts;
      return;
    }
    this.products = this.allProducts;
    var sortedProducts: Product[] = [];

    for (let index = 0; index < this.products.length; index++) {
      const product = this.products[index];
      if (product.category.includes(category)) {
        sortedProducts.push(product);
      }
    } 
    this.products = sortedProducts;
  }

  addProductToShoppingCart(product: Product) {
    this.shoppingCart.addShoppingCartItem(product);
  }

  navigateToProduct(productId: number) {
    this.router.navigate(['/product/'+ productId]);
  }

  sortAcc() {
    this.products.sort((a, b) => {
      if(a.price < b.price) {
        return -1
      } else if (a.price > b.price) {
        return 1
      } else {
        return 0;
      }
    });
  }

  sortDec() {
    this.products.sort((a, b) => {
      if(a.price > b.price) {
        return -1
      } else if (a.price < b.price) {
        return 1
      } else {
        return 0;
      }
    });
  }

  sortReset() {
    this.products = [...this.allProducts];
  }

}
