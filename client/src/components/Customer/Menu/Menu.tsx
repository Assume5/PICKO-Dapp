import React from 'react';
import { StoreMenuCategory } from '@src/types';
import { MenuAllInOneType } from './MenuAllInOneType/MenuAllInOneType';
import { MenuFilterType } from './MenuFilterType/MenuFilterType';

interface Props {
  menuType: string;
  menus: StoreMenuCategory[];
}

export const Menu: React.FC<Props> = ({ menuType, menus }) => {
  return (
    <div className="menu">
      {menuType === 'filter' ? (
        <MenuFilterType menus={menus}  />
      ) : (
        <MenuAllInOneType menus={menus} />
      )}
    </div>
  );
};
