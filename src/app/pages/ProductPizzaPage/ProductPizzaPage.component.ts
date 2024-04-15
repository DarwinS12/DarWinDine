import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonToComponent } from '@components/ButtonTo/ButtonTo.component';
import { Pizzas } from '@interfaces/food.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProdcutsImageComponent } from '@components/ProdcutsImage/ProdcutsImage.component';
import { QuantityButtonsComponent } from '@components/QuantityButtons/QuantityButtons.component';
import { AddToCartButtonComponent } from '@components/AddToCartButton/AddToCartButton.component';
import { pizzaPriceAccordingCrust } from '@store/actions/food.actions';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonToComponent,
    ProdcutsImageComponent,
    QuantityButtonsComponent,
    AddToCartButtonComponent,
  ],
  templateUrl: './ProductPizzaPage.component.html',
})
export default class ProductPizzaPageComponent {
  products$!: Pizzas | undefined;

  paramsId!: number;

  private route = inject(ActivatedRoute);

  sizesAndPrices: { size: string; price: number }[] = [];

  constructor(private store: Store<{ pizzasList: { pizzasList: Pizzas[] } }>) {
    this.route.params
      .pipe(
        switchMap(({ id }) => {
          this.paramsId = +id; // Convierte el id a número
          return this.store.select('pizzasList');
        })
      )
      .subscribe((pizzasState: { pizzasList: Pizzas[] }) => {
        const pizzaToAdd = pizzasState.pizzasList.find(
          (pizza) => pizza.id === this.paramsId
        );
        this.products$ = pizzaToAdd;
        this.initializeSizesAndPrices();
        console.log(this.products$, 'desde el product pizza');
      });
  }

  private initializeSizesAndPrices() {
    if (this.products$ && this.products$.sizeandcrust) {
      this.sizesAndPrices = this.products$.sizeandcrust.flatMap(
        (sizeAndCrust: any) => {
          const sizeAndCrustArray = [];
          for (const size in sizeAndCrust) {
            const price = sizeAndCrust[size][0].price;
            sizeAndCrustArray.push({ size, price });
          }

          return sizeAndCrustArray;
        }
      );
    } else {
      this.sizesAndPrices = [];
    }
  }

  changePizzaPrice(priceChanged: number) {
    if (this.products$) {
      this.store.dispatch(
        pizzaPriceAccordingCrust({
          productName: this.products$?.name,
          crustPrice: priceChanged,
        })
      );
    }
  }
}
