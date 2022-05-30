import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OwnerSettingMenuCategory } from '../../../../types';
import { serverUrl } from '../../../../utils/constants';
import { AddCategory } from './AddCategory/AddCategory';
import { EditCategory } from './EditCategory/EditCategory';

export const OwnerAccountMenuCategory = () => {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<OwnerSettingMenuCategory[]>([]);
  const [menuType, setMenuType] = useState('');
  const [updateData, setUpdateData] = useState<OwnerSettingMenuCategory>();
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);

      const res = await fetch(`${serverUrl}/restaurant/menus-categories/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      if (res.status === 403) {
        navigate('/owner');
      }

      const data = await res.json();
      console.log(data);

      if (data.error) {
        console.error(data.error);
      }

      if (data.success) {
        //sort data category by priority
        const sortedData = data.category.sort((a: OwnerSettingMenuCategory, b: OwnerSettingMenuCategory) => {
          return Number(b.priority) - Number(a.priority);
        }).sort((a: OwnerSettingMenuCategory, b: OwnerSettingMenuCategory) => {
          a.category_name < b.category_name ? -1 : 1
        });
        setData(sortedData);
        setMenuType(data.menu_type);
        setCount(data.category.length);
      }

      setLoaded(true);
    };

    fetchData();
  }, []);

  const onEditCategoryClick = (item: OwnerSettingMenuCategory) => {
    setUpdateData(item);
    setUpdateModal(true);
  };

  const onMenuTypeChange = async (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    console.log(target.value);
    const res = await fetch(`${serverUrl}/restaurant/menus-category/menu-type/${id}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: target.value,
      }),
    });

    const response = await res.json();

    if (response.error) {
      console.error(response.error);
    }
    if (response.success) {
      window.location.reload();
    }
  };

  if (!loaded) return null;

  return (
    <>
      <div className="owner-account-inner fade-in-up category-setting">
        <div onChange={(e) => onMenuTypeChange(e)} className="filter-type">
          <label>
            <input type="radio" value="filter" name="menu" defaultChecked={menuType === 'filter'} />
            Filter
          </label>

          <label>
            <input type="radio" value="aio" name="menu" defaultChecked={menuType === 'aio'} />
            All in one
          </label>
        </div>
        <div className="menu-category">
          {data.map((item, index) => {
            return (
              <div className="category-item" key={item.id}>
                <p>Category Name</p>
                <input type="text" value={item.category_name} disabled />
                <label>
                  <input type="checkbox" defaultChecked={item.priority} disabled /> Priority
                </label>
                {item.image && menuType === 'aio' && <img className="category-img" src={item.image} alt="" />}
                <button type="button" onClick={() => onEditCategoryClick(item)}>
                  Edit Category
                </button>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={() => setAddModal(true)}>
          Add more category
        </button>
      </div>
      {addModal && <AddCategory menuType={menuType} setAddModal={setAddModal} />}
      {updateModal && (
        <EditCategory menuType={menuType} setUpdateModal={setUpdateModal} data={updateData!} count={count} />
      )}
    </>
  );
};
