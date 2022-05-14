import React, { useState, useEffect } from 'react';
import { MenuType, MenuItem } from '@src/types';
import { MenuModal } from '../MenuModal/MenuModal';
import { MenuSideBar } from '../MenuSideBar/MenuSideBar';
import { useSortMenuKey } from '../../../../hooks/useSortMenuKey';

interface Props {
  menu: MenuType;
}

export const MenuAllInOneType: React.FC<Props> = ({ menu }) => {
  const [sortedKey, setSortedKey] = useSortMenuKey(menu);
  const [showModal, setShowModal] = useState(false);
  const [menuItem, setMenuItem] = useState<MenuItem>();
  const [menuName, setMenuName] = useState('');

  const onMenuClick = (menuItem: MenuItem, menuName: string) => {
    setShowModal(true);
    setMenuItem(menuItem);
    setMenuName(menuName);
    const body = document.getElementsByTagName('body')[0];
    if (body) {
      body.style.overflow = 'hidden';
    }
  };

  return (
    <div className="menu-aio-type">
      {sortedKey.map((key) => {
        if (menu && menu.allInOneImage && menu.menu) {
          const menus = menu.menu[key];

          return (
            <div className="menu-category-container" data-category={key} key={key}>
              <div
                className="menu-category-hero"
                data-id={key}
                style={{ backgroundImage: `url(${menu.allInOneImage[key]})` }}
              >
                <h2>{key}</h2>
                <div className="overlay"></div>
                <div className="border"></div>
              </div>
              <div className="menu-container">
                <div className="menu-items">
                  {Object.keys(menus).map((menusKey) => {
                    const menuItem = menus[menusKey];
                    if (typeof menuItem === 'object') {
                      return (
                        <div className="menu-item" key={menusKey} onClick={() => onMenuClick(menuItem, menusKey)}>
                          <div className="item-image">
                            <img src={menuItem && menuItem.image} alt="" />
                          </div>
                          <div className="item-text">
                            <div className="heading">
                              <h4>{menusKey}</h4>
                            </div>
                            <div className="desc">
                              <p>{menuItem && menuItem.description}</p>
                            </div>
                            <div className="price">
                              <p>{menuItem && menuItem.price} ETH</p>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return <></>;
                    }
                  })}
                </div>
              </div>
            </div>
          );
        } else {
          return <></>;
        }
      })}

      <MenuSideBar sortedKey={sortedKey} />
      <MenuModal showModal={showModal} setShowModal={setShowModal} menuItem={menuItem} menuName={menuName} />
    </div>
  );
};
