import { MenuDict } from '@src/types';
const textHolder =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco';

export const fakeMenu: MenuDict = {
  'Main Dishes': {
    priority: true,
    'Miso Ramen 1': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 1,
    },
    'Miso Ramen 2': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 2,
    },
    'Miso Ramen 3': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 3,
    },
    'Miso Ramen 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 4,
    },
    'Miso Ramen 5': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 1,
    },
  },
  Starter: {
    priority: true,
    'Salad 1': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 5,
    },
    'Salad 2': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 6,
    },
    'Salad 3': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 7,
    },
    'Salad 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 8,
    },
  },
  Chicken: {
    priority: false,
    'Chicken Broccoli 1': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 9,
    },
    'Chicken Broccoli 2': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 10,
    },
    'Chicken Broccoli 3': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 11,
    },
    'Chicken Broccoli 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 12,
    },
  },
  Drinks: {
    priority: false,
    'Black Tea 1': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 13,
    },
    'Black Tea 2': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 14,
    },
    'Black Tea 3': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 15,
    },
    'Black Tea 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 16,
    },
  },
  Desserts: {
    priority: false,
    'Mocha Cake 1': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 17,
    },
    'Mocha Cake 2': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 18,
    },
    'Mocha Cake 3': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 19,
    },
    'Mocha Cake 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 20,
    },
  },

  Pork1: {
    priority: false,
    'Mocha Cake 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 20,
    },
  },
  Pork2: {
    priority: false,
    'Mocha Cake 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 20,
    },
  },
  Pork3: {
    priority: false,
    'Mocha Cake 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 20,
    },
  },
  Pork4: {
    priority: false,
    'Mocha Cake 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 20,
    },
  },
};

export const allInOneImage: any = {
  'Main Dishes': '/imgs/restaurant-hero-holder.jpg',
  Starter: '/imgs/restaurant-hero-holder.jpg',
  Chicken: '/imgs/restaurant-hero-holder.jpg',
  Desserts: '/imgs/restaurant-hero-holder.jpg',
  Drinks: '/imgs/restaurant-hero-holder.jpg',
  Pork1: '/imgs/restaurant-hero-holder.jpg',
  Pork2: '/imgs/restaurant-hero-holder.jpg',
  Pork3: '/imgs/restaurant-hero-holder.jpg',
  Pork4: '/imgs/restaurant-hero-holder.jpg',
};
