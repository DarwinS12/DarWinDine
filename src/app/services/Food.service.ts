import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Burgers,
  Desserts,
  Drinks,
  LoginRequestInterface,
  Pizzas,
  User,
} from '@interfaces/food.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  #PizzaApirUrl = 'assets/pizzas.json';
  #BurgersApirUrl = 'assets/burgers.json';
  #DessertsApirUrl = 'assets/desserts.json';
  #DrinksApiUrl = 'assets/drinks.json';
  #LoginApiUrl = 'assets/login.json';

  #http = inject(HttpClient);

  /*   constructor(private store: Store<{ pizzasList: { pizzasList: Pizzas[] } }>) {} */

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("There's an error", error.error);
    } else {
      console.error('Status code:', error.status, error.error);
    }
    return throwError(() => new Error('Something failed'));
  }

  getPizzas(): Observable<Pizzas[]> {
    return this.#http
      .get<Pizzas[]>(this.#PizzaApirUrl)
      .pipe(catchError(this.handleError));
  }

  getBurgers(): Observable<Burgers[]> {
    return this.#http
      .get<Burgers[]>(this.#BurgersApirUrl)
      .pipe(catchError(this.handleError));
  }

  getDesserts(): Observable<Desserts[]> {
    return this.#http
      .get<Desserts[]>(this.#DessertsApirUrl)
      .pipe(catchError(this.handleError));
  }

  getDrinks(): Observable<Drinks[]> {
    return this.#http
      .get<Drinks[]>(this.#DrinksApiUrl)
      .pipe(catchError(this.handleError));
  }

  login(credentials: LoginRequestInterface): Observable<User> {
    return this.#http
      .get<User>(this.#LoginApiUrl)
      .pipe(catchError(this.handleError));
  }
}
