import { OrderStatus } from '@src/types';

export const fakeOrderDetails: OrderStatus = {
  orderID: 1,
  orderFrom: 'China Taste',
  restaurantID: 1,
  currentStatus: 1,
  driverID: 1,
  driverCurrentLocation: [42.997284, -78.822501],
  restaurantLocation: [42.9967927, -78.8031215],
  clientLocation: [43.005007, -78.813959],
  orderItems: [
    {
      productName: 'Miso Ramen 1 With Pork, Eggs, and Random Stuff',
      quantity: 1,
      price: 1,
    },
    {
      productName: 'Miso Ramen 1',
      quantity: 1,
      price: 1,
    },
    {
      productName: 'Miso Ramen 2',
      quantity: 1,
      price: 1,
    },
  ],
  orderDate: 'Mar 27, 2022',
  orderTime: '6:00 PM',
  driverTips: 0.1,
  deliveryFee: 0.1,
  total: 1,
};
