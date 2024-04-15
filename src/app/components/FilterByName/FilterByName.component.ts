import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AllProducts,
  categoryOfTheListTypes,
} from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { filterByProductName } from '@store/actions/food.actions';

@Component({
  selector: 'app-filter-by-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './FilterByName.component.html',
})
export class FilterByNameComponent {
  productName!: string;

  @Input({ required: true }) categoryOfTheProduct!: categoryOfTheListTypes;

  constructor(
    private store: Store<{ filterList: { filterList: AllProducts } }>
  ) {}

  searchProduct() {
    this.store.dispatch(
      filterByProductName({
        productName: this.productName,
        productCategoryList: this.categoryOfTheProduct,
      })
    );
  }
}
