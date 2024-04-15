import { createAction, props } from '@ngrx/store';
import {
  AllProducts,
  Burgers,
  Desserts,
  Drinks,
  Pizzas,
  ProductInCart,
  categoryOfTheListTypes,
} from '@interfaces/food.interface';

export const getPizzas = createAction(
  '[Food] Get pizzas list',
  props<{ pizzas: Pizzas[] }>()
);

export const getBurgers = createAction(
  '[Food], Get burgers list',
  props<{ burgers: Burgers[] }>()
);

export const getDesserts = createAction(
  '[Food], Get desserts list',
  props<{ desserts: Desserts[] }>()
);

export const getDrinks = createAction(
  '[Food], Get drinks list',
  props<{ drinks: Drinks[] }>()
);

export const addToCart = createAction(
  '[Food], Add product to cart',
  props<{ productToCart: ProductInCart }>()
);

export const deleteFromCart = createAction(
  '[Food], Delete product from the cart',
  props<{
    productName: string | undefined;
    productCategoryList: categoryOfTheListTypes;
  }>()
);

export const increaseQuantity = createAction(
  '[Food], Increase the product quantity',
  props<{
    productName: string | undefined;
    productCategoryList: categoryOfTheListTypes;
  }>()
);

export const pizzaPriceAccordingCrust = createAction(
  '[Food], Set pizza price according user crust selected',
  props<{ productName: string; crustPrice: number }>()
);

export const filterByProductName = createAction(
  '[Food], Filter by product name',
  props<{ productName: string; productCategoryList: categoryOfTheListTypes }>()
);

export const sortByPrice = createAction(
  '[Food], Sort products by price',
  props<{
    sort: boolean;
    productCategoryList: categoryOfTheListTypes;
    product: AllProducts;
  }>()
);



export const loadMore = createAction('[Food], Load more products');

export const loginAndLogout = createAction('[Food], login in the app');
