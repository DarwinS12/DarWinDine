import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductInCart } from '@interfaces/food.interface';
import { addToCart } from '@store/actions/food.actions';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './AddToCartButton.component.html',
})
export class AddToCartButtonComponent {
  @Input() productsToAdd!: ProductInCart;

  productsInCart!: ProductInCart[];

  islogin$!: boolean;

  constructor(
    private store: Store<{
      cartList: { cartList: ProductInCart[] };
      isLogin: { isLogin: boolean };
    }>
  ) {
    store
      .select('cartList')
      .subscribe((carListState: { cartList: ProductInCart[] }) => {
        this.productsInCart = carListState.cartList;
      });
    this.store
      .select('isLogin')
      .subscribe((loginState: { isLogin: boolean }) => {
        this.islogin$ = loginState.isLogin;
      });
  }

  isProductInCart() {
    const productsAlreadyInCart = this.productsInCart.some(
      (productName) => productName?.name === this.productsToAdd?.name
    );

    if (productsAlreadyInCart) {
      return true;
    }
    return false;
  }

  addToTheProducts() {
    this.store.dispatch(addToCart({ productToCart: this.productsToAdd }));
  }
}
