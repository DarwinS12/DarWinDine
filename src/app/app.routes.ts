import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Home',
    loadComponent: () => import('./pages/HomePage/HomePage.component'),
    children: [],
  },
  {
    path: 'Pizza',
    title: 'Pizza',
    loadComponent: () => import('@pages/PizzasPage/PizzasPage.component'),
  },
  {
    path: 'Drink',
    title: 'Drink',
    loadComponent: () => import('@pages/DrinksPage/DrinksPage.component'),
  },
  {
    path: 'Dessert',
    title: 'Dessert',
    loadComponent: () => import('@pages/DessertsPage/DessertsPage.component'),
  },
  {
    path: 'Burger',
    title: 'Burger',
    loadComponent: () => import('@pages/BurgersPage/BurgersPage.component'),
  },
  {
    path: 'Product/Pizza/:id',
    title: 'Pizza',
    loadComponent: () =>
      import('@pages/ProductPizzaPage/ProductPizzaPage.component'),
  },
  {
    path: 'Product/Burger/:id',
    title: 'Burger',
    loadComponent: () =>
      import('@pages/ProductBurgerPage/ProductBurgerPage.component'),
  },
  {
    path: 'Product/Dessert/:id',
    title: 'Dessert',
    loadComponent: () =>
      import('@pages/ProductDessertPage/ProductDessertPage.component'),
  },
  {
    path: 'Product/Drink/:id',
    title: 'Drink',
    loadComponent: () =>
      import('@pages/ProductDrinkPage/ProductDrinkPage.component'),
  },
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full',
  },
];
