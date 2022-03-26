import React, { useState, useEffect } from 'react';
import { MenuType, MenuItem } from '../../../../types';
import { MenuModal } from '../MenuModal/MenuModal';
import { MenuSideBar } from '../MenuSideBar/MenuSideBar';

interface Props {
  menu: MenuType;
}

export const MenuAllInOneType: React.FC<Props> = ({ menu }) => {
  const [sortedKey, setSortedKey] = useState<string[]>([]);
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
      setSortedKey(sortedKey);
    }
  }, [menu]);

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
