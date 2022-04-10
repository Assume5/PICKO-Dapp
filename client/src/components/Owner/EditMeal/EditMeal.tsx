import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImageUpload } from '@src/components/Global/ImageUpload/ImageUpload';
import { MenuItem, OptionType } from '@src/types';
import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';

type MenuWithCategory = MenuItem & {
  category: OptionType;
  name: string;
};
interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  current: MenuWithCategory | undefined;
  setCurrent: React.Dispatch<React.SetStateAction<MenuWithCategory | undefined>>;
  option: OptionType[];
}

export const EditMeal: React.FC<Props> = ({ modalOpen, setModalOpen, current, setCurrent, option }) => {
  const formContainer = useRef<HTMLFormElement | null>(null);

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
  };

  const onFormSubmit = () => {};
  return (
    <div className={`edit-meal modal ${modalOpen && 'visible'}`}>
      {typeof current === 'object' && (
        <>
          <FontAwesomeIcon icon={faTimes} className="close-button" onClick={onCloseClick} />
          <div className="modal-inner">
            <form onSubmit={() => onFormSubmit()} ref={formContainer}>
              <h4>Meal Image</h4>
              <ImageUpload />
              <h4>Menu Category</h4>
              <div className="dropdown-input">
                <Select
                  options={option}
                  classNamePrefix="category-select"
                  placeholder={'Select a Category'}
                  isClearable={true}
                  defaultValue={current.category}
                />
              </div>
              <h4>Meal Name</h4>
              <input type="text" placeholder="Meal Name" defaultValue={current.name} />
              <h4>Meal Description</h4>
              <textarea rows={8} defaultValue={current.description}></textarea>
              <h4>Meal Price</h4>
              <input type="number" step={0.01} min={0} placeholder="Meal Price" defaultValue={current.price} />
              <button type="submit" value="remove" className="delete-button">
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
