import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, map } from 'rxjs';
import { Categorie } from './categories';
import { Reviews } from './reviews';

@Injectable({
  providedIn: 'root',
})
export class PullData {
  http = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.http.get<{products: any[]}>('/shop_data_json.json').pipe(
      map(response => {
        const products = response.products.map(n => ({
          ...n,
        }));
        console.log('Produkte erhalten: ', products);
        return products;
      })
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getAllProducts().pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<{categories: any[]}>('/shop_data_json.json').pipe(
      map(response => {
        const categories = response.categories.map(c => ({
          ...c,
        }));
        return categories;
      })

    )
  }

  getReviewToProduct(productId: number): Observable<Reviews[]> {
    return this.http.get<{reviews: Reviews[]}>('/shop_data_json.json').pipe(
      map(response => {
        const review: Reviews[] = response.reviews.map(r => ({
          ...r,
        })).filter(r => r.productId === productId);
        return review;
      })
    )
  }
  
}
