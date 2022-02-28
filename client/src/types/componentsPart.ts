export type MenuChoice = {
  [key: string]: {
    [key: string]: {
      choices: {
        [key: string]: {
          price: number;
          check: boolean;
        };
      };
      required: boolean;
    };
  };
};

export type MenuItem =
  | {
      image: string;
      description: string;
      price: number;
      id: number;
      choices: MenuChoice;
      globalChoices: string;
    }
  | boolean;

export type MenuDict = {
  [key: string]: {
    [key: string]: MenuItem;
    priority: boolean;
  };
};
