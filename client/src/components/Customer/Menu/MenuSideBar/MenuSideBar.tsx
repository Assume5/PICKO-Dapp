import React, { useLayoutEffect, useState } from 'react';

interface Props {
  sortedKey: string[];
}
export const MenuSideBar: React.FC<Props> = ({ sortedKey }) => {
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
        sortedKey.forEach((key) => {
          const target: HTMLDivElement | null = document.querySelector(
            `.menu-category-container[data-category='${key}']`,
          );
          if (target && win.scrollY >= target.offsetTop - 75 && win.scrollY <= target.offsetTop + target.offsetHeight) {
            setCurrentPosition(key);
          }
        });
      } else {
        setCurrentPosition('');
        setAtMenuPosition(false)
      }
    };

    win.addEventListener('scroll', onScroll);
  }, [sortedKey, win]);

  return (
    <div className="menu-sidebar">
      {sortedKey.map((key, i) => {
        return (
          <div
            className={`sidebar-item ${currentPosition === key ? 'active' : ''} ${atMenuPosition ? 'at-position' : ''}`}
            onClick={() => onSidebarClick(key)}
            key={i}
          >
            <p>{key}</p>
          </div>
        );
      })}
    </div>
  );
};
