export type RestaurantMenuItemType = {
  id: number;
  menu_name: string;
  price: number;
  description: string;
  status: string;
  image: string;
};

export type MenuItemWithCategory = RestaurantMenuItemType & {
  category: OptionType;
};

export type orderItems = {
  productName: string;
  quantity: number;
  price: number;
};

export type OptionType = {
  value: string;
  label: string;
  id: number;
};

export type MenuCategory = {
  category_name: string;
  priority: boolean;
};

export type StoreSocialLinks = {
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
};

export type StoreMenus = {
  id: number;
  description: string;
  menu_name: string;
  image: string;
  price: number;
  status: string;
};

export type StoreMenuCategory = {
  category_name: string;
  image: string;
  priority: boolean;
  menus: StoreMenus[];
};

export type StoreHeroImages = {
  hero_image: string;
};

export type CartItem = {
  menu_id: number;
  count: number;
  price: number;
  menu_name: string;
};
