import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StoreMenuCategory } from '@src/types';
import { MenuGrid } from '../MenuGrid/MenuGrid';

interface Props {
  menus: StoreMenuCategory[];
}

export const MenuFilterType: React.FC<Props> = ({ menus }) => {
  const [containerOverflow, setContainerOverFlow] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const filterContainer = useRef<HTMLDivElement>(null);
  const [sortedMenus, setSortedMenus] = useState<StoreMenuCategory[]>();

  useEffect(() => {
    setSortedMenus(menus.sort((menu1, menu2) => Number(menu2.priority) - Number(menu1.priority)));
  }, [menus]);

  useEffect(() => {
    if (sortedMenus) {
      setActiveFilter(sortedMenus[0].category_name);
    }
  }, [sortedMenus]);

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

  if (!sortedMenus) return null;

  return (
    <div className="menu-filter-type">
      <div className="filter">
        <div className={`scroll-text ${containerOverflow ? 'overflow' : ''}`}>
          <p> Scroll </p>
          <div className="scroller"></div>
        </div>

        <div className={`filter-container ${containerOverflow ? 'overflow' : ''}`} ref={filterContainer}>
          {sortedMenus.map((menu) => {
            return (
              <div
                className={`filter-item ${activeFilter === menu.category_name ? 'active' : ''}`}
                key={menu.category_name}
              >
                <p date-category={menu.category_name} onClick={() => onFilterClick(menu.category_name)}>
                  {menu.category_name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="menu-container">
        <MenuGrid activeFilter={activeFilter} sortedMenus={sortedMenus} />
      </div>
    </div>
  );
};
