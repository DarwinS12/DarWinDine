import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs';
import * as FoodActions from '@store/actions/food.actions';
import { Burgers, Desserts, Drinks, Pizzas } from '@interfaces/food.interface';
import { FoodService } from '@services/Food.service';

@Injectable()
export class FoodEffects {
  constructor(private actions$: Actions, private foodService$: FoodService) {}

  getPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoodActions.getPizzas, FoodActions.loadMore),
      exhaustMap(() =>
        this.foodService$
          .getPizzas()
          .pipe(map((pizzas: Pizzas[]) => FoodActions.getPizzas({ pizzas })))
      )
    )
  );

  getBurgers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoodActions.getBurgers),
      exhaustMap(() =>
        this.foodService$
          .getBurgers()
          .pipe(
            map((burgers: Burgers[]) => FoodActions.getBurgers({ burgers }))
          )
      )
    )
  );

  getDesserts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoodActions.getDesserts),
      exhaustMap(() =>
        this.foodService$
          .getDesserts()
          .pipe(
            map((desserts: Desserts[]) => FoodActions.getDesserts({ desserts }))
          )
      )
    )
  );

  getDrinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoodActions.getDrinks),
      exhaustMap(() =>
        this.foodService$
          .getDrinks()
          .pipe(map((drinks: Drinks[]) => FoodActions.getDrinks({ drinks })))
      )
    )
  );
}
