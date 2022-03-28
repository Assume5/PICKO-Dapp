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
