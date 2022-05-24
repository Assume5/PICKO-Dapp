export type MenuItem =
  | {
      image: string;
      description: string;
      price: number;
      id: number;
    }
  | boolean;

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
};

export type MenuCategory = {
  category_name: string;
  priority: boolean;
};
