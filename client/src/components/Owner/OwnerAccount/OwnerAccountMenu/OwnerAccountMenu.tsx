import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AddMeal } from '../../AddMeal/AddMeal';
import { EditMeal } from '../../EditMeal/EditMeal';
import { Menu, MenuItemWithCategory, OptionType, RestaurantMenuItemType } from '@src/types';
import { WarningModal } from '../../WarningModal/WarningModal';
import { serverUrl } from '../../../../utils/constants';
import { useNavigate, useParams } from 'react-router-dom';


export const OwnerAccountMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [addMealModal, setAddMealModal] = useState(false);
  const [editMealModal, setEditMealModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [idToRemove, setIdToRemove] = useState(0);
  const [option, setOption] = useState<OptionType[]>([]);

  const [currentSelectedMenu, setCurrentSelectedMenu] = useState<MenuItemWithCategory>();
  const [menusData, setMenusData] = useState<Menu[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${serverUrl}/restaurant/menus/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      if (res.status === 403) {
        navigate('/owner');
      }

      const data = await res.json();

      if (data.error) {
        console.error(data.error);
      }

      if (data.success) {
        const storedData = data.data.sort((a: Menu, b: Menu) => Number(b.priority) - Number(a.priority));
        const arr: OptionType[] = [];
        storedData.forEach((item: Menu) => {
          arr.push({ value: item.category_name.toLowerCase(), label: item.category_name, id: +item.id });
        });
        setMenusData(storedData);
        setOption(arr);
        setLoaded(true);
      }
    };

    fetchData();
  }, []);

  const onSearchChange = (val: string) => {
    setSearch(val);
  };

  const onMenuItemClick = (category: string, item: RestaurantMenuItemType) => {
    const currentItem: MenuItemWithCategory = {
      image: item.image,
      description: item.description,
      price: item.price,
      id: item.id,
      category: { value: category.toLowerCase(), label: category, id: item.id },
      menu_name: item.menu_name,
      status: 'available',
    };
    setEditMealModal(!editMealModal);
    setCurrentSelectedMenu(currentItem);
  };

  const onPlusClick = (category: string) => {
    setCurrentCategory(category);
    setAddMealModal(!addMealModal);
  };

  const onTrashClick = (category: string, id: number) => {
    setCurrentCategory(category);
    setIdToRemove(id);
    setWarningModal(!warningModal);
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      <div className="owner-home-menus fade-in-up">
        <div className="search-category">
          <input type="text" placeholder="Search a Menu Category" onChange={(e) => onSearchChange(e.target.value)} />
        </div>
        {menusData.map((menu) => {
          const menus = menu.menus;
          return (
            <div
              className={`menus-container ${
                search !== '' &&
                (menu.category_name.toLowerCase().includes(search.toLowerCase()) ? 'visible' : 'hidden')
              }`}
              key={menu.category_name}
            >
              <div className="menu-type">
                <h3>{menu.category_name}</h3>
                <div className="icons">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className=""
                    onClick={() => onTrashClick(menu.category_name, menu.id)}
                  />
                  <FontAwesomeIcon icon={faPlus} className="" onClick={() => onPlusClick(menu.category_name)} />
                </div>
              </div>
              <div className="menu-items">
                {!menus.length ? (
                  <div className="empty-menu">
                    <h4>Empty Menu</h4>
                    <button onClick={() => onPlusClick(menu.category_name)}>Add a Menu</button>
                  </div>
                ) : (
                  menus.map((item) => {
                    return (
                      <div
                        className="menu-item"
                        key={item.id}
                        onClick={() => onMenuItemClick(menu.category_name, item)}
                      >
                        <div className="item-image">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="item-text">
                          <div className="heading">
                            <h4>{item.menu_name}</h4>
                          </div>
                          <div className="desc">
                            <p>{item.description}</p>
                          </div>
                          <div className="price">
                            <p>{item.price} ETH</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
      <AddMeal modalOpen={addMealModal} setModalOpen={setAddMealModal} option={option} category={currentCategory} />
      <EditMeal
        modalOpen={editMealModal}
        setModalOpen={setEditMealModal}
        current={currentSelectedMenu}
        setCurrent={setCurrentSelectedMenu}
        option={option}
      />
      <WarningModal
        modalOpen={warningModal}
        setModalOpen={setWarningModal}
        category={currentCategory}
        removeId={idToRemove}
      />
    </>
  );
};
