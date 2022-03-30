import React, { useEffect, useState } from 'react';
import { MenuType } from '@src/types';
import { MenuAllInOneType } from './MenuAllInOneType/MenuAllInOneType';
import { MenuFilterType } from './MenuFilterType/MenuFilterType';
import { fakeMenu, allInOneImage } from '../../../pages/Customer/Restaurant/MenuFakeData';

export const Menu = () => {
  const [menu, setMenu] = useState<MenuType>(null);

  useEffect(() => {
    //get menu
    const win: Window = window;
    const getMenu = async () => {
      if (win.location.href.includes('china-taste')) {
        setMenu({
          type: 'filter',
          menu: fakeMenu,
          allInOneImage: allInOneImage,
        });
      } else {
        setMenu({
          type: 'allInOne',
          menu: fakeMenu,
          allInOneImage: allInOneImage,
        });
      }
    };

    getMenu();
  }, []);

  return (
    <div className="menu">
      {menu && menu.type === 'filter' ? (
        <MenuFilterType menu={menu}  />
      ) : (
        <MenuAllInOneType menu={menu} />
      )}
    </div>
  );
};
