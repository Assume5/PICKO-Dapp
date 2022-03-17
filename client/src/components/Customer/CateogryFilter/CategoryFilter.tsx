import React, { useLayoutEffect, useRef, useState } from 'react';
import { Restaurant } from '../../../types/index';
interface Props {
  categories: string[];
  currentFilter: string[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CategoryFilter: React.FC<Props> = ({ categories, currentFilter, setCurrentFilter }) => {
  const [containerOverflow, setContainerOverFlow] = useState(false);
  const filterContainer = useRef<HTMLDivElement>(null);

  const onFilterClick = (key: string) => {
    if (currentFilter.indexOf(key) === -1) {
      setCurrentFilter([...currentFilter, key]);
    } else {
      const arr = [...currentFilter];
      arr.splice(arr.indexOf(key), 1);
      setCurrentFilter(arr);
    }
  };

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
  }, []);

  return (
    <div className="category-filter">
      <div className={`scroll-text ${containerOverflow ? 'overflow' : ''}`}>
        <p> Drag </p>
        <div className="scroller"></div>
      </div>
      <div className={`filter-container ${containerOverflow ? 'overflow' : ''}`} ref={filterContainer}>
        {categories.map((key) => {
          return (
            <p
              onClick={() => onFilterClick(key)}
              key={key}
              className={`filter-item ${currentFilter.indexOf(key) !== -1 && 'active'}`}
            >
              {key}
            </p>
          );
        })}
      </div>
    </div>
  );
};
