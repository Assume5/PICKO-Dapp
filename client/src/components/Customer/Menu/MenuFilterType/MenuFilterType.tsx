import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MenuType } from '../../../../types';
import { MenuGrid } from '../MenuGrid/MenuGrid';

interface Props {
  menu: MenuType;
}

export const MenuFilterType: React.FC<Props> = ({ menu }) => {
  const [sortedKey, setSortedKey] = useState<string[]>([]);
  const [containerOverflow, setContainerOverFlow] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const filterContainer = useRef<HTMLDivElement>(null);

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
      setActiveFilter(sortedKey[0]);
    }
  }, [menu]);

  useLayoutEffect(() => {
    if (filterContainer && filterContainer.current) {
      const container = filterContainer.current;

      if (container.scrollWidth > container.clientWidth) {
        setContainerOverFlow(true);

        let mouseDown = false;
        let startX: number, scrollLeft: number;

        const dragging = (e: any) => {
          mouseDown = true;
          startX = e.pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
          container.classList.add('overflow');
        };

        const stopDragging = (e: any) => {
          mouseDown = false;
          container.classList.remove('overflow');
        };

        container.addEventListener('mousemove', (e: any) => {
          e.preventDefault();
          if (!mouseDown) {
            return;
          }
          const x = e.pageX - container.offsetLeft;
          const scroll = x - startX;
          container.scrollLeft = scrollLeft - scroll;
        });
        container?.addEventListener('mousedown', dragging, false);
        container?.addEventListener('mouseup', stopDragging, false);
        container?.addEventListener('mouseleave', stopDragging, false);
      }
    }
  }, [activeFilter, filterContainer.current]);

  const onFilterClick = (category: string) => {
    setActiveFilter(category);
  };

  return (
    <div className="menu-filter-type">
      {menu && (
        <div className="filter">
          <div className={`scroll-text ${containerOverflow ? 'overflow' : ''}`}>
            <p> Scroll </p>
            <div className="scroller"></div>
          </div>

          <div className={`filter-container ${containerOverflow ? 'overflow' : ''}`} ref={filterContainer}>
            {sortedKey.map((key, i) => {
              return (
                <div className={`filter-item ${activeFilter === key ? 'active' : ''}`} key={i}>
                  <p date-category={key} onClick={() => onFilterClick(key)}>
                    {key}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="menu-container">
        <MenuGrid sortedKey={sortedKey} menu={menu} activeFilter={activeFilter} />
      </div>
    </div>
  );
};
