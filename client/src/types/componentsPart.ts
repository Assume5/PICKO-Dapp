export type MenuItem =
  | {
      image: string;
      description: string;
      price: number;
      id: number;
    }
  | boolean;

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

export type MenuDict = {
  [key: string]: {
    [key: string]: MenuItem;
    priority: boolean;
  };
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
