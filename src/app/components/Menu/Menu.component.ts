import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TypeFoodMenuCardComponent } from '@components/TypeFoodMenuCard/TypeFoodMenuCard.component';
import { RatingComponent } from '@components/Rating/Rating.component';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { Pizzas } from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
import { getPizzas } from '@store/actions/food.actions';
import { FoodCardComponent } from '@components/FoodCard/FoodCard.component';
import { RouterModule } from '@angular/router';

register();

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    TypeFoodMenuCardComponent,
    RatingComponent,
    FoodCardComponent,
    RouterModule,
  ],
  templateUrl: './Menu.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuComponent {
  pizzas$!: Pizzas[];

  constructor(private store: Store<{ pizzasList: { pizzasList: Pizzas[] } }>) {
    store
      .select('pizzasList')
      .subscribe((pizzasState: { pizzasList: Pizzas[] }) => {
        const somePizzas = [...pizzasState.pizzasList]
          .sort(() => Math.random() - 0.5)
          .slice(0, 7);
        this.pizzas$ = somePizzas;
        console.log(somePizzas, 'desde el component');
      });
  }

  ngOnInit() {
    this.store.dispatch(getPizzas({ pizzas: this.pizzas$ }));
  }

  swiper = new Swiper('.swiper', {
    autoplay: {
      delay: 200,
    },
    slidesPerView: 4,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

 
}
