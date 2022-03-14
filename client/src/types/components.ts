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
  };
};
