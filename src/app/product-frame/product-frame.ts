import { Component, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-frame',
  imports: [],
  templateUrl: './product-frame.html',
  styleUrl: './product-frame.css',
})
export class ProductFrame {
  @Input() product!:Product;
}
