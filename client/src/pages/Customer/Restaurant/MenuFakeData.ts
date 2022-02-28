import { HeroType, Social, MenuType, MenuDict, MenuChoice } from '../../../types/index';
const textHolder =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco';

const choice: MenuChoice = {
  choice: {
    size: {
      required: true,
      choices: {
        small: {
          price: 0,
          check: true,
        },
        medium: {
          price: 1,
          check: false,
        },
        large: {
          price: 1.5,
          check: false,
        },
      },
    },
    topping: {
      required: true,
      choices: {
        Mayo: {
          price: 0,
          check: true,
        },
        Pickles: {
          price: 0,
          check: true,
        },
        Bacon: {
          price: 0,
          check: true,
        },
      },
    },
  },
};

export const globalChoices: MenuChoice = {
  choice: {
    drink: {
      required: false,
      choices: {
        Coke: {
          price: 1,
          check: false,
        },
        Tea: {
          price: 1,
          check: false,
        },
        Sprite: {
          price: 1,
          check: false,
        },
      },
    },
    side: {
      required: false,
      choices: {
        Coke: {
          price: 1,
          check: false,
        },
        Tea: {
          price: 1,
          check: false,
        },
        Sprite: {
          price: 1,
          check: false,
        },
      },
    },
  },
};

export const fakeMenu: MenuDict = {
  'Main Dishes': {
    priority: true,
    'Miso Ramen 1': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 1,
      globalChoices: 'drink, side',
      choices: choice,
    },
    'Miso Ramen 2': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 2,
      globalChoices: 'drink',
      choices: choice,
    },
    'Miso Ramen 3': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 3,
      globalChoices: 'drink',
      choices: choice,
    },
    'Miso Ramen 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 4,
      globalChoices: 'drink',
      choices: choice,
    },
    'Miso Ramen 5': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 1,
      globalChoices: 'drink',
      choices: choice,
    },
  },
  Starter: {
    priority: true,
    'Salad 1': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 5,
      globalChoices: 'drink',
      choices: choice,
    },
    'Salad 2': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 6,
      globalChoices: 'drink',
      choices: choice,
    },
    'Salad 3': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 7,
      globalChoices: 'drink',
      choices: choice,
    },
    'Salad 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 8,
      globalChoices: 'drink',
      choices: choice,
    },
  },
  Chicken: {
    priority: false,
    'Chicken Broccoli 1': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 9,
      globalChoices: 'drink',
      choices: choice,
    },
    'Chicken Broccoli 2': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 10,
      globalChoices: 'drink',
      choices: choice,
    },
    'Chicken Broccoli 3': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 11,
      globalChoices: 'drink',
      choices: choice,
    },
    'Chicken Broccoli 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 2,
      id: 12,
      globalChoices: 'drink',
      choices: choice,
    },
  },
  Drinks: {
    priority: false,
    'Black Tea 1': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 13,
      globalChoices: 'none',
      choices: choice,
    },
    'Black Tea 2': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 14,
      globalChoices: 'none',
      choices: choice,
    },
    'Black Tea 3': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 15,
      globalChoices: 'none',
      choices: choice,
    },
    'Black Tea 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 16,
      globalChoices: 'none',
      choices: choice,
    },
  },
  Desserts: {
    priority: false,
    'Mocha Cake 1': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 17,
      globalChoices: 'none',
      choices: choice,
    },
    'Mocha Cake 2': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 18,
      globalChoices: 'none',
      choices: choice,
    },
    'Mocha Cake 3': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 19,
      globalChoices: 'none',
      choices: choice,
    },
    'Mocha Cake 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 20,
      globalChoices: 'none',
      choices: choice,
    },
  },

  Pork1: {
    priority: false,
    'Mocha Cake 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 20,
      globalChoices: 'none',
      choices: choice,
    },
  },
  Pork2: {
    priority: false,
    'Mocha Cake 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 20,
      globalChoices: 'none',
      choices: choice,
    },
  },
  Pork3: {
    priority: false,
    'Mocha Cake 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 20,
      globalChoices: 'none',
      choices: choice,
    },
  },
  Pork4: {
    priority: false,
    'Mocha Cake 4': {
      image: '/imgs/menu-holder.png',
      description: textHolder,
      price: 1,
      id: 20,
      globalChoices: 'none',
      choices: choice,
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
