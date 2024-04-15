import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Burgers, categoryOfTheListTypes } from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
import { getBurgers } from '@store/actions/food.actions';
import { ButtonToComponent } from '@components/ButtonTo/ButtonTo.component';
import { FoodCardComponent } from '@components/FoodCard/FoodCard.component';
import { RouterModule } from '@angular/router';
import { FilterByNameComponent } from '@components/FilterByName/FilterByName.component';
import { SortByPriceComponent } from '@components/SortByPrice/SortByPrice.component';
import { SkeletonLoadingComponent } from '@components/SkeletonLoading/SkeletonLoading.component';

@Component({
  selector: 'app-burgers-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonToComponent,
    FoodCardComponent,
    RouterModule,
    FilterByNameComponent,
    SortByPriceComponent,
    SkeletonLoadingComponent,
  ],
  templateUrl: './BurgersPage.component.html',
})
export default class BurgersPageComponent {
  burgers$!: Burgers[];

  category!: categoryOfTheListTypes;

  constructor(
    private store: Store<{ burgersList: { burgersList: Burgers[] } }>
  ) {
    store
      .select('burgersList')
      .subscribe((burgersState: { burgersList: Burgers[] }) => {
        burgersState.burgersList.map((burger) => {
          this.category = burger.categoryOfTheList;
        });
        this.burgers$ = burgersState.burgersList;
        console.log(burgersState.burgersList, 'lista de las burgers');
      });
  }

  ngOnInit() {
    this.store.dispatch(getBurgers({ burgers: this.burgers$ }));
  }
}
