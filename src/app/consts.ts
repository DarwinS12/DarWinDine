import { FoodListInterface, CategoryObject } from '@interfaces/food.interface';

export const CATEGORY: CategoryObject = {
  pizzas: 'pizzasList',
  burgers: 'burgersList',
  drinks: 'drinksList',
  desserts: 'dessertsList',
};

export const FoodList: FoodListInterface = {
  pizzasList: [],
  burgersList: [],
  dessertsList: [],
  drinksList: [],
  cartList: [],
  originalProducts: [],
  isSorted: false,
  isLogin: false,
  currentPage: 1,
  isLoading: false,
};
