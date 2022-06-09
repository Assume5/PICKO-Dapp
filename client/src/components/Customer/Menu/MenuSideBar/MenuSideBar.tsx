import React, { useLayoutEffect, useState } from 'react';
import { StoreMenuCategory } from '../../../../types';

interface Props {
  sortedMenus: StoreMenuCategory[];
}
export const MenuSideBar: React.FC<Props> = ({ sortedMenus }) => {
  const [currentPosition, setCurrentPosition] = useState<string>('');
  const [atMenuPosition, setAtMenuPosition] = useState(false);
  const win: Window = window;

  const onSidebarClick = (key: string) => {
    const target: HTMLDivElement | null = document.querySelector(`.menu-category-container[data-category='${key}']`);
    if (target) {
      win.scroll({ top: target.offsetTop - 75, behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    const onScroll: EventListener = () => {
      const menuContainer: HTMLDivElement | null = document.querySelector('.menu');
      if (
        menuContainer &&
        win.scrollY >= menuContainer.offsetTop - 75 &&
        win.scrollY <= menuContainer.offsetTop + menuContainer.offsetHeight
      ) {
        setAtMenuPosition(true);
        sortedMenus.forEach((item) => {
          const target: HTMLDivElement | null = document.querySelector(
            `.menu-category-container[data-category='${item.category_name}']`,
          );
          if (target && win.scrollY >= target.offsetTop - 75 && win.scrollY <= target.offsetTop + target.offsetHeight) {
            setCurrentPosition(item.category_name);
          }
        });
      } else {
        setCurrentPosition('');
        setAtMenuPosition(false);
      }
    };

    win.addEventListener('scroll', onScroll);
    return () => win.removeEventListener('scroll', onScroll);
  }, [sortedMenus, currentPosition]);

  return (
    <div className="menu-sidebar">
      {sortedMenus.map((menu) => {
        return (
          <div
            className={`sidebar-item ${currentPosition === menu.category_name ? 'active' : ''} ${
              atMenuPosition ? 'at-position' : ''
            }`}
            onClick={() => onSidebarClick(menu.category_name)}
            key={menu.category_name}
          >
            <p>{menu.category_name}</p>
          </div>
        );
      })}
    </div>
  );
};
