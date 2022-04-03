import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { fakeMenu } from '../../../pages/Customer/Restaurant/MenuFakeData';
import { AddMeal } from '../AddMeal/AddMeal';
export const OwnerHome = () => {
  const [sortedKey, setSortedKey] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [addMealModal, setAddMealModal] = useState(false);

  useEffect(() => {
    if (fakeMenu) {
      const menus = fakeMenu;
      console.log(fakeMenu);
      let priorityMenu: string[] = [];

      Object.keys(fakeMenu).forEach((key) => {
        if (fakeMenu[key].priority) {
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
  }, [fakeMenu]);

  const onSearchChange = (val: string) => {
    setSearch(val);
  };

  return (
    <div className="owner-home-menus">
      <div className="search-category">
        <input type="text" placeholder="Search a Menu Category" onChange={(e) => onSearchChange(e.target.value)} />
      </div>

      {sortedKey.map((key) => {
        const menus = fakeMenu[key];
        return (
          <div
            className={`menus-container ${
              search !== '' && (key.toLowerCase().includes(search.toLowerCase()) ? 'visible' : 'hidden')
            } `}
          >
            <div className="menu-type" key={key}>
              <h3>{key}</h3>
              <div className="icons">
                <FontAwesomeIcon icon={faTrash} className="" />
                <FontAwesomeIcon icon={faPlus} className="" />
              </div>
            </div>
            <div className="menu-items">
              {Object.keys(menus).map((menusKey) => {
                const menuItem = menus[menusKey];
                if (typeof menuItem === 'object') {
                  return (
                    <div className="menu-item" key={menusKey}>
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
        );
      })}

      <AddMeal />
    </div>
  );
};
