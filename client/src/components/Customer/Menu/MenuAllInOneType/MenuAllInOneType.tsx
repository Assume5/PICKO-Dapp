import React, { useState, useEffect } from 'react';
import { StoreMenus, StoreMenuCategory } from '@src/types';
import { MenuModal } from '../MenuModal/MenuModal';
import { MenuSideBar } from '../MenuSideBar/MenuSideBar';

interface Props {
  menus: StoreMenuCategory[];
}

export const MenuAllInOneType: React.FC<Props> = ({ menus }) => {
  const [showModal, setShowModal] = useState(false);
  const [menuItem, setMenuItem] = useState<StoreMenus>();
  const [menuName, setMenuName] = useState('');
  const [sortedMenus, setSortedMenus] = useState<StoreMenuCategory[]>();

  useEffect(() => {
    setSortedMenus(menus.sort((menu1, menu2) => Number(menu2.priority) - Number(menu1.priority)));
  }, [menus]);

  const onMenuClick = (menuItem: StoreMenus, menuName: string) => {
    setShowModal(true);
    setMenuItem(menuItem);
    setMenuName(menuName);
    const body = document.getElementsByTagName('body')[0];
    if (body) {
      body.style.overflow = 'hidden';
    }
  };

  if (!sortedMenus) return null;

  return (
    <div className="menu-aio-type">
      {sortedMenus.map((menu) => {
        return (
          <div className="menu-category-container" data-category={menu.category_name} key={menu.category_name}>
            <div
              className="menu-category-hero"
              data-id={menu.category_name}
              style={{ backgroundImage: `url(${menu.image})` }}
            >
              <h2>{menu.category_name}</h2>
              <div className="overlay"></div>
              <div className="border"></div>
            </div>
            <div className="menu-container">
              <div className="menu-items">
                {!menu.menus.length && <h3 className="empty-menu"> Empty Menu</h3>}
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
                          <p>$ {menuItem.price}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      <MenuSideBar sortedMenus={sortedMenus} />
      <MenuModal showModal={showModal} setShowModal={setShowModal} menuItem={menuItem} menuName={menuName} />
    </div>
  );
};
