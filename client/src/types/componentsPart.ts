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
