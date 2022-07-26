import {
  CartItem,
  MenuCategory,
  orderItems,
  RestaurantMenuItemType,
  StoreHeroImages,
  StoreMenuCategory,
  StoreMenus,
  StoreSocialLinks,
} from './componentsPart';
import { MenuDict } from './index';

export type User = {
  login: boolean;
  name?: string;
  address?: string;
  restaurant_id?: string;
  role?: string;
  checked: boolean;
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
  category: string;
  openTime: string;
  address: string;
  status: string;
};

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
  restaurantID?: string;
  restaurantName?: string;
  deliveryAddress?: string;
  cartItems?: CartItem[];
};

export type Orders = {
  [key: string]: {
    orderID: number;
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

export type StepOneData = {
  name: string;
  fullAddress: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  category: string;
  lat: string;
  long: string;
  openTime: string;
  closeTime: string;
};

export type StepTwoData = {
  menuType: string;
  heroType: string;
  cardImage: File;
  menuCategory: MenuCategory[];
  menuCategoryImages: File[];
  heroImages: File[];
  facebook: string;
  twitter: string;
  instagram: string;
};

export type RestaurantType = {
  id: string;
  category: string;
  distance: number;
  full_address: string;
  lat: string;
  long: string;
  open_time: string;
  close_time: string;
  restaurant_name: string;
  restaurant_card_image: string;
  view_count: number;
  status: string;
};

export type RestaurantInformation = {
  status: string;
  restaurantName: string;
};

export type RestaurantMenuCategory = {
  id: number;
  image?: string;
  category_name: string;
  priority: boolean;
};

export type RestaurantHeroImages = {
  id: number;
  hero_image: string;
};

export type RestaurantSocialLink = {
  facebook: string;
  twitter: string;
  instagram: string;
};

export type RestaurantSetting = {
  category: string;
  close_time: string;
  full_address: string;
  open_time: string;
  phone: string;
  restaurant_name: string;
  social_link: RestaurantSocialLink;
};

export type OwnerSettingMenuCategory = {
  category_name: string;
  id: number;
  image: string | null;
  priority: boolean;
};

export type Menu = {
  id: number;
  category_name: string;
  priority: boolean;
  menus: RestaurantMenuItemType[];
};

export type Store = {
  address: string;
  category: string;
  city: string;
  close_time: string;
  hero_images: StoreHeroImages[];
  hero_type: string;
  id: string;
  lat: string;
  long: string;
  menu_category: StoreMenuCategory[];
  menu_type: string;
  open_time: string;
  restaurant_name: string;
  social_links: StoreSocialLinks;
  state: string;
  status: string;
  zipcode: string;
};

