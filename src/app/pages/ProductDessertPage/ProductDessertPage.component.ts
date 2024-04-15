import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Desserts } from '@interfaces/food.interface';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '@services/Food.service';
import { switchMap } from 'rxjs';
import { ButtonToComponent } from '@components/ButtonTo/ButtonTo.component';
import { ProdcutsImageComponent } from '@components/ProdcutsImage/ProdcutsImage.component';
import { QuantityButtonsComponent } from '@components/QuantityButtons/QuantityButtons.component';
import { AddToCartButtonComponent } from '@components/AddToCartButton/AddToCartButton.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-dessert-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonToComponent,
    ProdcutsImageComponent,
    QuantityButtonsComponent,
    AddToCartButtonComponent,
  ],
  templateUrl: './ProductDessertPage.component.html',
})
export default class ProductDessertPageComponent {
  products$!: Desserts | undefined;

  paramsId!: number;

  private route = inject(ActivatedRoute);

  constructor(
    private store: Store<{ dessertsList: { dessertsList: Desserts[] } }>
  ) {
    this.route.params
      .pipe(
        switchMap(({ id }) => {
          this.paramsId = +id;
          return this.store.select('dessertsList');
        })
      )
      .subscribe((dessertsState: { dessertsList: Desserts[] }) => {
        const dessertToAdd = dessertsState.dessertsList.find(
          (dessertId) => dessertId.id === this.paramsId
        );
        this.products$ = dessertToAdd;
      });
  }
}
