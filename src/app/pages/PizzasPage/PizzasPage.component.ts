import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonToComponent } from '@components/ButtonTo/ButtonTo.component';
import { FoodCardComponent } from '@components/FoodCard/FoodCard.component';
import { Pizzas, categoryOfTheListTypes } from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
import { getPizzas } from '@store/actions/food.actions';
import { RouterModule } from '@angular/router';
import { FilterByNameComponent } from '@components/FilterByName/FilterByName.component';
import { SortByPriceComponent } from '@components/SortByPrice/SortByPrice.component';
import { LoadMoreButtonComponent } from '@components/LoadMoreButton/LoadMoreButton.component';
import { SkeletonLoadingComponent } from '@components/SkeletonLoading/SkeletonLoading.component';

@Component({
  selector: 'app-pizzas-page',
  standalone: true,
  imports: [
    CommonModule,
    FoodCardComponent,
    RouterModule,
    ButtonToComponent,
    FilterByNameComponent,
    SortByPriceComponent,
    LoadMoreButtonComponent,
    SkeletonLoadingComponent
  ],
  templateUrl: './PizzasPage.component.html',
})
export default class PizzasPageComponent {
  pizza$!: Pizzas[];
  
  sort:boolean = false

  category!: categoryOfTheListTypes;

  constructor(private store: Store<{ pizzasList: { pizzasList: Pizzas[] } }>) {
    store
      .select('pizzasList')
      .subscribe((pizzasState: { pizzasList: Pizzas[] }) => {
        pizzasState.pizzasList.map((pizzas) => {
          this.category = pizzas.categoryOfTheList;
        });
        this.pizza$ = pizzasState.pizzasList;
      });
  }

  ngOnInit() {
    this.store.dispatch(getPizzas({ pizzas: this.pizza$ }));
  }

}
