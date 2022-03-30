import React, { useState } from 'react';
import { MenuType, MenuItem } from '@src/types';
import { MenuModal } from '../MenuModal/MenuModal';

interface Props {
  sortedKey: string[];
  menu: MenuType;
  activeFilter: String;
}

export const MenuGrid: React.FC<Props> = ({ sortedKey, menu, activeFilter }) => {
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
    <>
      {menu &&
        sortedKey.map((key) => {
          const menus = menu.menu[key];
          return (
            <div className={`menu-items ${activeFilter === key ? 'active' : ''}`} data-category={key} key={key}>
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
          );
        })}
      <MenuModal showModal={showModal} setShowModal={setShowModal} menuItem={menuItem} menuName={menuName} />
    </>
  );
};
