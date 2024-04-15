import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Burgers } from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
import { ButtonToComponent } from '@components/ButtonTo/ButtonTo.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProdcutsImageComponent } from '@components/ProdcutsImage/ProdcutsImage.component';
import { QuantityButtonsComponent } from '@components/QuantityButtons/QuantityButtons.component';
import { AddToCartButtonComponent } from '@components/AddToCartButton/AddToCartButton.component';

@Component({
  selector: 'app-product-burger-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonToComponent,
    ProdcutsImageComponent,
    QuantityButtonsComponent,
    AddToCartButtonComponent,
  ],
  templateUrl: './ProductBurgerPage.component.html',
})
export default class ProductBurgerPageComponent {
  products$: Burgers | undefined;

  paramsId!: number;

  private route = inject(ActivatedRoute);

  constructor(
    private store: Store<{ burgersList: { burgersList: Burgers[] } }>
  ) {
    this.route.params
      .pipe(
        switchMap(({ id }) => {
          this.paramsId = +id;
          return this.store.select('burgersList');
        })
      )
      .subscribe((burgersState: { burgersList: Burgers[] }) => {
        const burgerToAdd = burgersState.burgersList.find(
          (burgerId) => burgerId.id === this.paramsId
        );
        this.products$ = burgerToAdd;
      });
  }
}
