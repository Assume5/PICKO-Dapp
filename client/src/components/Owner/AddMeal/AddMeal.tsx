import React, { useEffect, useRef, useState } from 'react';
import { ImageUpload } from '@src/components/Global/ImageUpload/ImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { OptionType } from '../../../types/componentsPart';
import Select from 'react-select';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  option: OptionType[];
}

export const AddMeal: React.FC<Props> = ({ modalOpen, setModalOpen, option }) => {
  const [currentSelected, setCurrentSelected] = useState('');
  const categoryInput = useRef<HTMLInputElement | null>(null);
  const formContainer = useRef<HTMLFormElement | null>(null);

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

  const onCloseClick = () => {
    setModalOpen(!modalOpen);
    if (formContainer && formContainer.current) {
      console.log(formContainer.current);
      let inputs = formContainer.current.querySelectorAll('input');
      console.log(inputs);
      inputs.forEach((input) => {
        input.value = '';
      });
    }
  };

  const onFormSubmit = () => {};
  return (
    <div className={`add-meal modal ${modalOpen && 'visible'}`}>
      <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => onCloseClick()} />
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
            />
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
