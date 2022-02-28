import React, { useState } from 'react';
import { MenuChoice, MenuType, MenuItem } from '../../../../types';
import { MenuModal } from '../MenuModal/MenuModal';

interface Props {
  sortedKey: string[];
  menu: MenuType;
  globalChoices: MenuChoice;
  activeFilter: String;
}

export const MenuGrid: React.FC<Props> = ({ sortedKey, menu, globalChoices, activeFilter }) => {
  const [showModal, setShowModal] = useState(false);
  const [menuItem, setMenuItem] = useState<MenuItem>();
  const [menuName, setMenuName] = useState('');

  const onMenuClick = (menuItem: MenuItem, menuName: string) => {
    setShowModal(true);
    setMenuItem(menuItem);
    setMenuName(menuName);
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
                }
              })}
            </div>
          );
        })}
      <MenuModal
        showModal={showModal}
        setShowModal={setShowModal}
        menuItem={menuItem}
        globalChoices={globalChoices}
        menuName={menuName}
      />
    </>
  );
};
