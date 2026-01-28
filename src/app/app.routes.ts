import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ProductDetailPage } from './product-detail-page/product-detail-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'product/:id', component: ProductDetailPage }
];
