import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PullData } from '../pull-data';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { Reviews } from '../reviews';

@Component({
  selector: 'app-product-detail-page',
  imports: [CommonModule],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css',
})
export class ProductDetailPage implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  dataService = inject(PullData);
  cdr = inject(ChangeDetectorRef);

  
  product?: Product;
  productId: number = 0;
  reviews: Reviews[] = [];

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
    this.dataService.getReviewToProduct(this.productId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.cdr.detectChanges();
      }
    });
  }

  loadProduct() {
    this.dataService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Fehler beim Laden des Produkts:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
