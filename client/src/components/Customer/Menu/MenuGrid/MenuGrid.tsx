import React, { useState } from 'react';
import { StoreMenuCategory, StoreMenus } from '@src/types';
import { MenuModal } from '../MenuModal/MenuModal';

interface Props {
  activeFilter: String;
  sortedMenus: StoreMenuCategory[];
}

export const MenuGrid: React.FC<Props> = ({ activeFilter, sortedMenus }) => {
  const [showModal, setShowModal] = useState(false);
  const [menuItem, setMenuItem] = useState<StoreMenus>();
  const [menuName, setMenuName] = useState('');

  const onMenuClick = (menuItem: StoreMenus, menuName: string) => {
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
      {sortedMenus.map((menu) => {
        return (
          <div
            className={`menu-items ${activeFilter === menu.category_name ? 'active' : ''}`}
            data-category={menu.category_name}
            key={menu.category_name}
          >
            {!menu.menus.length && <h3 className="empty-menu">Empty Menus</h3>}
            {menu.menus.map((menuItem) => {
              return (
                <div
                  className="menu-item"
                  key={menuItem.menu_name}
                  onClick={() => onMenuClick(menuItem, menuItem.menu_name)}
                >
                  <div className="item-image">
                    <img src={menuItem.image} alt="" />
                  </div>
                  <div className="item-text">
                    <div className="heading">
                      <h4>{menuItem.menu_name}</h4>
                    </div>
                    <div className="desc">
                      <p>{menuItem.description}</p>
                    </div>
                    <div className="price">
                      <p>${menuItem.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <MenuModal showModal={showModal} setShowModal={setShowModal} menuItem={menuItem} menuName={menuName} />
    </>
  );
};
