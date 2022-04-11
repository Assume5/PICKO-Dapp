import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fakeMenu } from '../../../pages/Customer/Restaurant/MenuFakeData';
import { AddMeal } from '../AddMeal/AddMeal';
import { EditMeal } from '../EditMeal/EditMeal';
import { MenuItem, OptionType } from '@src/types';
import { WarningModal } from '../WarningModal/WarningModal';

type MenuWithCategory = MenuItem & {
  category: OptionType;
  name: string;
};

export const OwnerHome = () => {
  const [sortedKey, setSortedKey] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [addMealModal, setAddMealModal] = useState(false);
  const [editMealModal, setEditMealModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [option, setOption] = useState<OptionType[]>([]);
  const [currentSelectedMenu, setCurrentSelectedMenu] = useState<MenuWithCategory>();

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

  useEffect(() => {
    let arr: OptionType[] = [];
    sortedKey.forEach((key) => {
      arr.push({ value: key.toLowerCase(), label: key });
    });

    setOption(arr);
  }, [sortedKey]);

  const onSearchChange = (val: string) => {
    setSearch(val);
  };

  const onMenuItemClick = (category: string, menuKey: string, item: MenuItem) => {
    if (typeof item === 'object') {
      const currentItem: MenuWithCategory = {
        image: item.image,
        description: item.description,
        price: item.price,
        id: item.id,
        category: { value: category.toLowerCase(), label: category },
        name: menuKey,
      };
      setEditMealModal(!editMealModal);
      setCurrentSelectedMenu(currentItem);
    }
  };

  const onPlusClick = (category: string) => {
    setCurrentCategory(category);
    setAddMealModal(!addMealModal);
  };

  const onTrashClick = (category: string) => {
    setCurrentCategory(category);
    setWarningModal(!warningModal);
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
            key={key}
          >
            <div className="menu-type" key={key}>
              <h3>{key}</h3>
              <div className="icons">
                <FontAwesomeIcon icon={faTrash} className="" onClick={() => onTrashClick(key)} />
                <FontAwesomeIcon icon={faPlus} className="" onClick={() => onPlusClick(key)} />
              </div>
            </div>
            <div className="menu-items">
              {Object.keys(menus).map((menusKey) => {
                const menuItem = menus[menusKey];
                if (typeof menuItem === 'object') {
                  return (
                    <div className="menu-item" key={menusKey} onClick={() => onMenuItemClick(key, menusKey, menuItem)}>
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
      <AddMeal modalOpen={addMealModal} setModalOpen={setAddMealModal} option={option} category={currentCategory} />
      <EditMeal
        modalOpen={editMealModal}
        setModalOpen={setEditMealModal}
        current={currentSelectedMenu}
        setCurrent={setCurrentSelectedMenu}
        option={option}
      />
      <WarningModal modalOpen={warningModal} setModalOpen={setWarningModal} category={currentCategory} />
    </div>
  );
};
