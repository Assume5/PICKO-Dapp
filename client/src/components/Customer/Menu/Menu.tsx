import React, { useEffect, useState } from 'react';
import { MenuType } from '../../../types';
import { MenuAllInOneType } from './MenuAllInOneType/MenuAllInOneType';
import { MenuFilterType } from './MenuFilterType/MenuFilterType';
import { fakeMenu, globalChoices, allInOneImage } from '../../../pages/Customer/Restaurant/MenuFakeData';

export const Menu = () => {
  const [menu, setMenu] = useState<MenuType>(null);

  useEffect(() => {
    //get menu
    const getMenu = async () => {
      setMenu({
        type: 'filter',
        menu: fakeMenu,
        allInOneImage: allInOneImage,
      });
    };

    getMenu();
  }, []);

  return (
    <div className="menu">
      {menu && menu.type === 'filter' ? (
        <MenuFilterType menu={menu} globalChoices={globalChoices} />
      ) : (
        <MenuAllInOneType menu={menu} globalChoices={globalChoices} />
      )}
    </div>
  );
};
