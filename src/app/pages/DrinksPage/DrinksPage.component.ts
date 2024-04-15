import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Drinks, categoryOfTheListTypes } from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ButtonToComponent } from '@components/ButtonTo/ButtonTo.component';
import { FoodCardComponent } from '@components/FoodCard/FoodCard.component';
import { getDrinks } from '@store/actions/food.actions';
import { FilterByNameComponent } from '@components/FilterByName/FilterByName.component';
import { SortByPriceComponent } from '@components/SortByPrice/SortByPrice.component';
import { SkeletonLoadingComponent } from '@components/SkeletonLoading/SkeletonLoading.component';

@Component({
  selector: 'app-drinks-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FoodCardComponent,
    ButtonToComponent,
    FilterByNameComponent,
    SortByPriceComponent,
    SkeletonLoadingComponent,
  ],
  templateUrl: './DrinksPage.component.html',
})
export default class DrinksPageComponent {
  drinks$!: Drinks[];

  category!: categoryOfTheListTypes;

  constructor(private store: Store<{ drinksList: { drinksList: Drinks[] } }>) {
    store
      .select('drinksList')
      .subscribe((drinksState: { drinksList: Drinks[] }) => {
        drinksState.drinksList.map((drinks) => {
          this.category = drinks.categoryOfTheList;
        });
        this.drinks$ = drinksState.drinksList;
      });
  }

  ngOnInit() {
    this.store.dispatch(getDrinks({ drinks: this.drinks$ }));
  }
}
