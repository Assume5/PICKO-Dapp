import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImageUpload } from '@src/components/Global/ImageUpload/ImageUpload';
import { MenuItemWithCategory, OptionType } from '@src/types';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { serverUrl } from '../../../utils/constants';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  current: MenuItemWithCategory | undefined;
  setCurrent: React.Dispatch<React.SetStateAction<MenuItemWithCategory | undefined>>;
  option: OptionType[];
}

export const EditMeal: React.FC<Props> = ({ modalOpen, setModalOpen, current, setCurrent, option }) => {
  const formContainer = useRef<HTMLFormElement | null>(null);
  const [currentSelected, setCurrentSelected] = useState<string>();
  const [currentSelectedId, setCurrentSelectedId] = useState(0);
  const [emptySelected, setEmptySelected] = useState<boolean>(false);

  const [imageChange, setImageChange] = useState(false);

  useEffect(() => {
    const category = current?.category.label;
    if (category) {
      setCurrentSelected(category);
      option.forEach((item) => {
        if (item.value === category.toLowerCase()) {
          setCurrentSelectedId(item.id);
        }
      });
    }
  }, [current]);

  useEffect(() => {
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (body && modalOpen) {
      body.style.overflowY = 'hidden';
    } else {
      body && (body.style.overflowY = 'auto');
    }
  }, [modalOpen]);

  const onCloseClick = () => {
    setModalOpen(!modalOpen);
    setCurrent(undefined);
    setImageChange(false);
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentSelected && !currentSelectedId) {
      setEmptySelected(true);
      return;
    }

    setEmptySelected(false);
    setCurrentSelectedId(0);

    const form = new FormData();

    const target = e.target as HTMLFormElement & {
      name: { value: string };
      price: { value: string };
      description: { value: string };
    };

    const { name, price, description } = target;

    const file = target.querySelector('.file-container input') as HTMLInputElement;
    if (file && file.files) {
      form.append('image', file.files[0]);
    }

    form.append('name', name.value);
    form.append('price', price.value);
    form.append('description', description.value);
    form.append('category_id', String(currentSelectedId));

    const res = await fetch(`${serverUrl}/restaurant/menus/${current?.id}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      body: form,
    });

    const data = await res.json();

    if (data.error) {
      console.error(data.error);
    }

    if (data.success) {
      window.location.reload();
    }
  };

  const onDeleteClick = async () => {
    const res = await fetch(`${serverUrl}/restaurant/menus/${current?.id}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    });

    const data = await res.json();

    if (data.error) {
      console.error(data.error);
    }

    if (data.success) {
      window.location.reload();
    }
  };
  return (
    <div className={`edit-meal modal ${modalOpen && 'visible'}`}>
      {typeof current === 'object' && (
        <>
          <FontAwesomeIcon icon={faTimes} className="close-button" onClick={onCloseClick} />
          <div className="modal-inner">
            <form onSubmit={(e) => onFormSubmit(e)} ref={formContainer}>
              <h4>Meal Image</h4>
              {!imageChange ? (
                <div className="preview-image-container">
                  <img className="preview-image" src={current.image} alt="" />
                  <FontAwesomeIcon icon={faTimesCircle} onClick={() => setImageChange(true)} />
                </div>
              ) : (
                <ImageUpload required />
              )}
              <h4>Menu Category</h4>
              <div className={`dropdown-input ${emptySelected && 'empty-selected'}`}>
                <Select
                  options={option}
                  classNamePrefix="category-select"
                  placeholder={'Select a Category'}
                  isClearable={true}
                  defaultValue={current.category}
                  onChange={(e) => {
                    const target = e as OptionType;
                    setCurrentSelected(target?.value);
                    setCurrentSelectedId(target?.id);
                  }}
                />
              </div>
              <h4>Meal Name</h4>
              <input type="text" placeholder="Meal Name" name="name" defaultValue={current.menu_name} required />
              <h4>Meal Description</h4>
              <textarea rows={8} defaultValue={current.description} name="description" required></textarea>
              <h4>Meal Price</h4>
              <input
                type="number"
                step={0.01}
                min={0}
                placeholder="Meal Price"
                name="price"
                defaultValue={current.price}
                required
              />
              <button type="button" value="remove" onClick={() => onDeleteClick()} className="delete-button">
                Delete Meal
              </button>
              <button type="submit" value="edit" className="submit-button">
                Edit Meal
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
