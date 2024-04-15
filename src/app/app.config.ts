import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { foodReducer } from '@store/reducers/food.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { FoodEffects } from '@store/effects/food.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(
      HttpClientModule,

      StoreModule.forRoot({
        pizzasList: foodReducer,
        burgersList: foodReducer,
        dessertsList: foodReducer,
        drinksList: foodReducer,
        sharedProductInfo: foodReducer,
        cartList: foodReducer,
        isLogin: foodReducer,
        isLoading: foodReducer,
      }),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
      }),
      EffectsModule.forRoot([FoodEffects])
    ),
  ],
};
