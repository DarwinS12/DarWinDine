import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AllProducts,
  categoryOfTheListTypes,
} from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
import { sortByPrice } from '@store/actions/food.actions';

@Component({
  selector: 'app-sort-by-price',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './SortByPrice.component.html',
})
export class SortByPriceComponent {
  @Input({ required: true }) category!: categoryOfTheListTypes;
  @Input({ required: false }) product!: AllProducts;

  isChecked: boolean = false;
  loading$!: boolean;
  orginalProducts$!: AllProducts;

  a: boolean = false;

  constructor(
    private store: Store<{
      isLoading: { isLoading: boolean };
      sort: { sort: boolean };
      originalProducts: { originalProducts: AllProducts };
    }>
  ) {
    store
      .select('isLoading')
      .subscribe((loadingState: { isLoading: boolean }) => {
        this.loading$ = loadingState.isLoading;
        //console.log(loadingState.isLoading);
      });
  }

    handleSort() {
    this.a = true
    console.log(this.a, 'Desde el sort component');
    this.store.dispatch(
      sortByPrice({
        sort: this.isChecked,
        productCategoryList: this.category,
        product: this.product,
      })
    );
    this.a = false
    console.log(this.a, 'Desde el sort component22 ');
  } 

  
}
