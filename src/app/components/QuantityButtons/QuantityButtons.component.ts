import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductInCart } from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
import { deleteFromCart, increaseQuantity } from '@store/actions/food.actions';

@Component({
  selector: 'app-quantity-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './QuantityButtons.component.html',
})
export class QuantityButtonsComponent {
  @Input() styles!: string;
  @Input() ButtonStyles!: string;
  @Input() spanFont!: string;

  @Input({ required: true }) product!: ProductInCart;

  islogin$!: boolean;
  constructor(
    private store: Store<{
      cartList: { cartList: ProductInCart[] };
      isLogin: { isLogin: boolean };
    }>
  ) {
    this.store
      .select('isLogin')
      .subscribe((loginState: { isLogin: boolean }) => {
        this.islogin$ = loginState.isLogin;
      });
  }

  deleteProductFromCartList() {
    if (this.product && this.product.categoryOfTheList !== undefined) {
      this.store.dispatch(
        deleteFromCart({
          productName: this.product?.name,
          productCategoryList: this.product?.categoryOfTheList,
        })
      );
    }
  }

  updateQuantity() {
    if (this.product && this.product.categoryOfTheList !== undefined) {
      console.log(this.product, "desde el quantity");
      this.store.dispatch(
        increaseQuantity({
          productName: this.product.name,
          productCategoryList: this.product.categoryOfTheList,
        })
      );
    }
  }
}
