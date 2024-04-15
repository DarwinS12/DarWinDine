import { createReducer, on } from '@ngrx/store';
import {
  type ProductInCart,
  type AllProducts,
} from '@interfaces/food.interface';
import {
  addToCart,
  deleteFromCart,
  filterByProductName,
  getBurgers,
  getDesserts,
  getDrinks,
  getPizzas,
  increaseQuantity,
  loadMore,
  loginAndLogout,
  pizzaPriceAccordingCrust,
  sortByPrice,
} from '@store/actions/food.actions';
import { CATEGORY, FoodList } from '../../consts';

function checkProductIsOnList(products: AllProducts, productList: any) {
  return products.filter(
    (product) =>
      !productList.some(
        (existingProduct: ProductInCart) => existingProduct?.id === product.id
      )
  );
}

export const foodReducer = createReducer(
  FoodList,

  on(getPizzas, (state, { pizzas }) => {
    const newPizzas = checkProductIsOnList(pizzas, state.pizzasList);
    const pizzasToAddToTheList = newPizzas.map((pizzaObject: any) => ({
      ...pizzaObject,
      quantity: 0,
      hasUserSelectPrice: false,
      categoryOfTheList: CATEGORY.pizzas,
    }));

    return {
      ...state,
      pizzasList: [...state.pizzasList, ...pizzasToAddToTheList],
      originalProducts: [...state.pizzasList, ...pizzasToAddToTheList],
    };
  }),

  on(getBurgers, (state, { burgers }) => {
    const newBurgers = checkProductIsOnList(burgers, state.burgersList);
    const burgersToAddToTheList = newBurgers.map((burgerObject: any) => ({
      ...burgerObject,
      quantity: 0,
      categoryOfTheList: CATEGORY.burgers,
    }));
    return {
      ...state,
      burgersList: [...state.burgersList, ...burgersToAddToTheList],
      originalProducts: [...state.burgersList, ...burgersToAddToTheList],
    };
  }),

  on(getDesserts, (state, { desserts }) => {
    const newDesserts = checkProductIsOnList(desserts, state.dessertsList);
    const desserstToAddToTheList = newDesserts.map((dessertObject: any) => ({
      ...dessertObject,
      quantity: 0,
      categoryOfTheList: CATEGORY.desserts,
    }));
    return {
      ...state,
      dessertsList: [...state.dessertsList, ...desserstToAddToTheList],
      originalProducts: [...state.dessertsList, ...desserstToAddToTheList],
    };
  }),

  on(getDrinks, (state, { drinks }) => {
    const newDrinks = checkProductIsOnList(drinks, state.drinksList);
    const drinksToAddToTheList = newDrinks.map((drinksObject: any) => ({
      ...drinksObject,
      quantity: 0,
      categoryOfTheList: CATEGORY.drinks,
    }));
    return {
      ...state,
      drinksList: [...state.drinksList, ...drinksToAddToTheList],
      originalProducts: [...state.drinksList, ...drinksToAddToTheList],
    };
  }),

  on(addToCart, (state, { productToCart }) => {
    const isProductInCart = state.cartList.some(
      (productName) => productName?.name === productToCart?.name
    );

    if (isProductInCart) {
      return state;
    }

    return {
      ...state,
      cartList: [...state.cartList, productToCart],
    };
  }),

  on(deleteFromCart, (state, { productName, productCategoryList }) => {
    const updateQuantity = state[productCategoryList].map((productState) => {
      if (productState.name === productName) {
        if (productCategoryList === 'pizzasList') {
          return {
            ...productState,
            quantity: 0,
            hasUserSelectPrice: false,
          };
        }
        return {
          ...productState,
          quantity: 0,
        };
      }
      return productState;
    });

    const updateCart = state.cartList.filter(
      (productState) => productState?.name !== productName
    );

    return {
      ...state,
      cartList: [...updateCart],
      [productCategoryList]: [...updateQuantity],
    };
  }),

  on(increaseQuantity, (state, { productName, productCategoryList }) => {
    const updatedProduct = state[productCategoryList].map((productState) => {
      if (productState.name === productName) {
        return { ...productState, quantity: productState.quantity + 1 };
      }
      return productState;
    });

    const updatedProductInCartList = state.cartList.map((product) => {
      if (product && product.name === productName) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    return {
      ...state,
      [productCategoryList]: [...updatedProduct],
      cartList: updatedProductInCartList,
    };
  }),

  on(pizzaPriceAccordingCrust, (state, { productName, crustPrice }) => {
    const updatePrice = state.pizzasList.map((pizza) => {
      if (productName === pizza.name) {
        return {
          ...pizza,
          price: crustPrice,
          hasUserSelectPrice: true,
        };
      }
      return pizza;
    });

    return {
      ...state,
      pizzasList: updatePrice,
    };
  }),

  on(filterByProductName, (state, { productName, productCategoryList }) => {
    if (
      productName === null ||
      productName === undefined ||
      productName === ''
    ) {
      return {
        ...state,
        [productCategoryList]: [...state.originalProducts],
      };
    }

    const filteredProducts = state[productCategoryList].filter((name) =>
      name.name.toLocaleLowerCase().includes(productName.toLocaleLowerCase())
    );

    return {
      ...state,
      [productCategoryList]: filteredProducts,
    };
  }),

  on(sortByPrice, (state, { sort, productCategoryList, product }) => {
    const sorted =
      sort === true
        ? product.toSorted((a, b) => a.price - b.price)
        : state.originalProducts;

    return {
      ...state,
      [productCategoryList]: sorted,
    };
  }),

  on(loginAndLogout, (state) => {
    const loginValue = !state.isLogin;

    return {
      ...state,
      isLogin: loginValue,
    };
  })
);
