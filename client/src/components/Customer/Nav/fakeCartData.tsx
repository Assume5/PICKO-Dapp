import { Cart } from '../../../types';

export const fakeCartData: Cart = {
  isCartEmpty: false,
  restaurantID: 1,
  restaurantName: 'China Taste',
  cartItems: {
    'Miso Ramen 1 With Pork, Eggs, and Random Stuff': {
      itemID: 1,
      quantity: 1,
      price: 1,
    },
    'Miso Ramen 2': {
      itemID: 2,
      quantity: 1,
      price: 1,
    },
    'Miso Ramen 3': {
      itemID: 3,
      quantity: 2,
      price: 1,
    },
    'Miso Ramen 5': {
      itemID: 1,
      quantity: 1,
      price: 2,
    },
    'Miso Ramen 1 With Pork, Eggs, and Random Stuff 1': {
      itemID: 1,
      quantity: 1,
      price: 1,
    },
    'Miso Ramen 6': {
      itemID: 2,
      quantity: 1,
      price: 1,
    },
    'Miso Ramen 4': {
      itemID: 3,
      quantity: 2,
      price: 1,
    },
    'Miso Ramen 7': {
      itemID: 1,
      quantity: 1,
      price: 2,
    },
  },
};
