import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Desserts, categoryOfTheListTypes } from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
import { getDesserts } from '@store/actions/food.actions';
import { ButtonToComponent } from '@components/ButtonTo/ButtonTo.component';
import { FoodCardComponent } from '@components/FoodCard/FoodCard.component';
import { RouterModule } from '@angular/router';
import { FilterByNameComponent } from '@components/FilterByName/FilterByName.component';
import { SortByPriceComponent } from '@components/SortByPrice/SortByPrice.component';
import { SkeletonLoadingComponent } from '@components/SkeletonLoading/SkeletonLoading.component';

@Component({
  selector: 'app-desserts-page',
  standalone: true,
  imports: [
    CommonModule,
    FoodCardComponent,
    ButtonToComponent,
    RouterModule,
    FilterByNameComponent,
    SortByPriceComponent,
    SkeletonLoadingComponent
  ],
  templateUrl: './DessertsPage.component.html',
})
export default class DessertsPageComponent {
  desserts$!: Desserts[];

  category!: categoryOfTheListTypes;

  constructor(
    private store: Store<{ dessertsList: { dessertsList: Desserts[] } }>
  ) {
    store
      .select('dessertsList')
      .subscribe((dessertsState: { dessertsList: Desserts[] }) => {
        dessertsState.dessertsList.map((desserts) => {
          this.category = desserts.categoryOfTheList;
        });
        this.desserts$ = dessertsState.dessertsList;
      });
  }

  ngOnInit() {
    this.store.dispatch(getDesserts({ desserts: this.desserts$ }));
  }
}
