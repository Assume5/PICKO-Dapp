import React, { useEffect, useRef, useState } from 'react';
import { MenuDict } from '@src/types';
import { ImageUpload } from '@src/components/Global/ImageUpload/ImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  keys: string[];
}

export const AddMeal: React.FC<Props> = ({ modalOpen, setModalOpen, keys }) => {
  const [currentSelected, setCurrentSelected] = useState('');
  const categoryInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (categoryInput && categoryInput.current) {
      categoryInput.current.value = currentSelected;
    }
  }, [currentSelected]);

  useEffect(() => {
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (body && modalOpen) {
      body.style.overflowY = 'hidden';
    } else {
      body && (body.style.overflowY = 'auto');
    }
  }, [modalOpen]);

  const onFormSubmit = () => {};
  return (
    <div className={`add-meal modal ${modalOpen && 'visible'}`}>
      <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => setModalOpen(!modalOpen)} />
      <div className="modal-inner">
        <form onSubmit={() => onFormSubmit()}>
          <h4>Meal Image</h4>
          <ImageUpload />
          <h4>Menu Category</h4>
          <div className="dropdown-input">
            <input list="category-dropdown" type="text" placeholder="Search a category" required ref={categoryInput} />
            <datalist id="category-dropdown">
              {keys.map((key) => {
                return <option value={key} />;
              })}
            </datalist>
          </div>
          <h4>Meal Name</h4>
          <input type="text" placeholder="Meal Name" />
          <h4>Meal Description</h4>
          <textarea rows={8}></textarea>
          <h4>Meal Price</h4>
          <input type="number" step={0.01} min={0} placeholder="Meal Price" />
          <button type="submit" className="submit-button">
            Add Meal
          </button>
        </form>
      </div>
    </div>
  );
};
