import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuantityButtonsComponent } from '@components/QuantityButtons/QuantityButtons.component';
import { ButtonToComponent } from '@components/ButtonTo/ButtonTo.component';
import {
  ProductInCart,
  Pizzas,
  Desserts,
  Drinks,
  Burgers,
} from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, QuantityButtonsComponent, ButtonToComponent],
  templateUrl: './Cart.component.html',
})
export class CartComponent {
  products$!: ProductInCart[];

  address: string = "Your address"

  total$: number = 0;

  constructor(
    private store: Store<{ cartList: { cartList: ProductInCart[] } }>
  ) {
    store
      .select('cartList')
      .subscribe((productInCartState: { cartList: ProductInCart[] }) => {
        this.products$ = productInCartState.cartList;
        this.calculateTotal();
      });
  }

  calculateTotal() {
    this.total$ = 0;
    this.products$.forEach((price) => {
      if (price) {
        return ((this.total$ += price?.price * price.quantity));
      }
      return;
    });
  }

  isBurger(product: ProductInCart): product is Burgers {
    return (product as Burgers)?.images !== undefined;
  }

  isDessertOrPizza(product: ProductInCart): product is Desserts | Pizzas {
    return (product as Desserts)?.img !== undefined;
  }

  isDrink(product: ProductInCart): product is Drinks {
    return (product as Drinks)?.image !== undefined;
  }
}
