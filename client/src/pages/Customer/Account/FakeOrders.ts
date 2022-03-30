import { Orders } from '../../../types';

export const fakeOrders: Orders = {
  'China Taste': {
    orderID: 2,
    storeID: 1,
    storeImage: '/imgs/restaurant-hero-holder.jpg',
    totalPrice: 1,
    totalItems: 5,
    orderDate: 'Mar 25 at 6:00 PM',
    orderItems: {
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
    },
  },
  'India Taste': {
    orderID: 1,
    storeID: 1,
    storeImage: '/imgs/restaurant-hero-holder.jpg',
    totalPrice: 1,
    totalItems: 5,
    orderDate: 'Mar 25 at 6:00 PM',
    orderItems: {
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
    },
  },
};
