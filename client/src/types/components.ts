import { orderItems } from './componentsPart';
import { MenuDict } from './index';

export type User = {
  login: boolean;
  name?: string;
  address?: string;
};

export type HeroType = {
  type: string;
  image?: string;
  images?: string;
  videoUrl?: string;
} | null;

export type Social = {
  hasSocialMedia: boolean;
  twitter?: string;
  facebook?: string;
  instagram?: string;
};

export type MenuType = {
  type: string; // filter or allInOne
  menu: MenuDict;
  allInOneImage?: {
    [key: string]: String;
  };
} | null;

export type RestaurantDetailType = {
  deliveryFee: number;
  minToDeliver: string;
  restaurantName: string;
  distance: number;
  category: string;
  openTime: string;
} | null;

export type Restaurant = {
  [key: string]: {
    address: string;
    fee: number;
    time: string;
    category: string;
    id: number;
    reviewCount: number;
    image: string;
    mile: number;
  };
};

export type Cart = {
  isCartEmpty: boolean;
  restaurantID?: number;
  restaurantName?: string;
  deliveryAddress?: string;
  cartItems?: {
    [key: string]: {
      itemID: number;
      quantity: number;
      price: number;
    };
  };
};

export type Orders = {
  [key: string]: {
    storeID: number;
    storeImage: string;
    totalPrice: number;
    totalItems: number;
    orderDate: string;
    orderItems: {
      [key: string]: {
        itemID: number;
        quantity: number;
        price: number;
      };
    };
  };
};

export type OrderStatus = {
  orderID: number;
  orderFrom: string;
  restaurantID: number;
  currentStatus: number;
  driverID: number;
  driverCurrentLocation: [number, number];
  restaurantLocation: [number, number];
  clientLocation: [number, number];
  orderItems: orderItems[];
  orderDate: string;
  orderTime: string;
  driverTips: number;
  deliveryFee: number;
  total: number;
};
