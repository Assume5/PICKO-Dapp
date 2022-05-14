import React, { useEffect, useState } from 'react';
import { MenuType } from '@src/types';

export const useSortMenuKey = (menu: MenuType) => {
  const [sortedMenuKey, setSortedMenuKey] = useState<string[]>([]);
  useEffect(() => {
    if (menu) {
      const menus = menu && menu.menu;
      let priorityMenu: string[] = [];

      Object.keys(menus).forEach((key) => {
        if (menus[key].priority) {
          priorityMenu.push(key);
        }
      });

      const sortedMenusKey = Object.keys(menus).sort((a: string, b: string) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
      const sortedKey: string[] = Array.from(new Set([...priorityMenu, ...sortedMenusKey]));
      setSortedMenuKey(sortedKey);
    }
  }, [menu]);
  return [sortedMenuKey, setSortedMenuKey] as const;
};
