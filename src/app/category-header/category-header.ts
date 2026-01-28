import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { PullData } from '../pull-data';
import { Categorie } from '../categories';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-header',
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './category-header.html',
  styleUrl: './category-header.css',
})
export class CategoryHeader implements OnInit{
  dataService = inject(PullData);
  cdr = inject(ChangeDetectorRef);
  categories: Categorie[] = [];
  lastCategory: string = '';
  @Output() sendCategoryId: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
      this.dataService.getAllCategories().subscribe({
        next: (categories) => {
          this.categories = categories;
          this.cdr.detectChanges();
        },
        error: (err) => {
            console.log('Kategorien konnten nicht gefunden werden: ', err)
        },
      })
  }

  sendId(category: string) {
    this.lastCategory = category;
    this.sendCategoryId.emit(category);
  }
}
