import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RatingComponent } from '@components/Rating/Rating.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './FoodCard.component.html',
})
export class FoodCardComponent {
  @Input({ required: true }) foodName!: string;
  @Input({ required: true }) foodPrice!: number | string;
  @Input() imgSrc: string | undefined =
    'https://www.shutterstock.com/image-vector/no-food-allowed-symbol-isolated-260nw-296578892.jpg';
  @Input() imgHeight!: string;

  islogin$!: boolean;

  constructor(private store: Store<{ isLogin: { isLogin: boolean } }>) {
    store.select('isLogin').subscribe((loginState: { isLogin: boolean }) => {
      this.islogin$ = loginState.isLogin;
    });
  }
}
