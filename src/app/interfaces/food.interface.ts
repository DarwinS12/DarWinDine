//Pizza
export interface Pizzas {
  id: number;
  name: string;
  veg: boolean;
  price: number;
  description: string;
  quantity: number;
  hasUserSelectPrice: boolean;
  categoryOfTheList: categoryOfTheListTypes;
  img: string;
  sizeandcrust: Sizeandcrust[];
}

export interface Sizeandcrust {
  'Medium pan': Medium[];
  'Medium stuffed crust cheese max': Medium[];
  'Medium stuffed crust veg kebab'?: Medium[];
  'Medium stuffed crust chicken seekh kebab'?: Medium[];
  'Medium  stuffed crust kebab'?: Medium[];
}

export interface Medium {
  price: number;
}

//Burguer

export interface Burgers {
  id: number;
  name: string;
  images: Image[];
  desc: string;
  ingredients: Ingredient[];
  quantity: number;
  categoryOfTheList: categoryOfTheListTypes;

  price: number;
  veg: boolean;
}

export interface Image {
  sm?: string;
  lg?: string;
}

export interface Ingredient {
  id: number;
  name: string;
  img: string;
}

//Dessert

export interface Desserts {
  id: number;
  name: string;
  price: number;
  description: string;
  img: string;
  quantity: number;
  categoryOfTheList: categoryOfTheListTypes;
}

//Drinks

export interface Drinks {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image: string;
  categoryOfTheList: categoryOfTheListTypes;
}

export interface FoodListInterface {
  pizzasList: Pizzas[];
  burgersList: Burgers[];
  dessertsList: Desserts[];
  drinksList: Drinks[];
  cartList: ProductInCart[];
  originalProducts: AllProducts;
  isSorted: boolean;
  isLogin: boolean;
  currentPage: number;
  isLoading: boolean;
}

export interface CategoryObject {
  pizzas: 'pizzasList';
  burgers: 'burgersList';
  drinks: 'drinksList';
  desserts: 'dessertsList';
}

export type ProductInCart = Burgers | Desserts | Drinks | Pizzas | undefined;

export type AllProducts = Burgers[] | Desserts[] | Drinks[] | Pizzas[];

export type categoryOfTheListTypes =
  | 'pizzasList'
  | 'burgersList'
  | 'dessertsList'
  | 'drinksList';

export interface LoginRequestInterface {
  email: string;
  password: string;
}

export interface User {
  id:       number;
  message:  string;
  name:     string;
  lastName: string;
  email:    string;
}

