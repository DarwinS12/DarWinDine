import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ButtonToComponent } from '@components/ButtonTo/ButtonTo.component';
import { Drinks } from '@interfaces/food.interface';
import { ProdcutsImageComponent } from '@components/ProdcutsImage/ProdcutsImage.component';
import { QuantityButtonsComponent } from '@components/QuantityButtons/QuantityButtons.component';
import { AddToCartButtonComponent } from '@components/AddToCartButton/AddToCartButton.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-drink-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonToComponent,
    ProdcutsImageComponent,
    QuantityButtonsComponent,
    AddToCartButtonComponent,
  ],
  templateUrl: './ProductDrinkPage.component.html',
})
export default class ProductDrinkPageComponent {
  products$!: Drinks | undefined;

  paramsId!: number;

  private route = inject(ActivatedRoute);

  constructor(
    private store: Store<{
      drinksList: { drinksList: Drinks[] };
    }>
  ) {
    this.route.params
      .pipe(
        switchMap(({ id }) => {
          this.paramsId = +id;
          return this.store.select('drinksList');
        })
      )
      .subscribe((drinksState: { drinksList: Drinks[] }) => {
        const drinksToAdd = drinksState.drinksList.find(
          (drinkId) => drinkId.id === this.paramsId
        );
        this.products$ = drinksToAdd;
      });
  }
}
