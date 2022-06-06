import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { ImageUpload } from '@src/components/Global/ImageUpload/ImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { OptionType } from '../../../types/componentsPart';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../../utils/constants';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  option: OptionType[];
  category: string;
}

export const AddMeal: React.FC<Props> = ({ modalOpen, setModalOpen, option, category }) => {
  const { id } = useParams();

  const [currentSelected, setCurrentSelected] = useState<string>();
  const [currentSelectedId, setCurrentSelectedId] = useState(0);
  const [emptySelected, setEmptySelected] = useState<boolean>(false);
  const formContainer = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    setCurrentSelected(category);
    option.forEach((item) => {
      if (item.value === category.toLowerCase()) {
        setCurrentSelectedId(item.id);
      }
    });
  }, [category]);

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
      let inputs = formContainer.current.querySelectorAll('input');
      inputs.forEach((input) => {
        input.value = '';
      });
    }
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentSelected && !currentSelectedId) {
      setEmptySelected(true);
      return;
    }

    setEmptySelected(false);
    setCurrentSelectedId(0);

    const target = e.target as HTMLFormElement & {
      name: { value: string };
      price: { value: string };
      description: { value: string };
    };

    const form = new FormData();

    const { name, price, description } = target;

    const file = target.querySelector('.file-container input') as HTMLInputElement;
    if (file && file.files) {
      form.append('image', file.files[0]);
    }

    form.append('name', name.value);
    form.append('price', price.value);
    form.append('description', description.value);
    form.append('id', id!);
    form.append('category_id', String(currentSelectedId));

    const res = await fetch(`${serverUrl}/restaurant/menus`, {
      method: 'POST',
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
  return (
    <div className={`add-meal modal ${modalOpen && 'visible'}`}>
      <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => onCloseClick()} />
      {modalOpen && (
        <div className="modal-inner">
          <form onSubmit={(e) => onFormSubmit(e)} ref={formContainer}>
            <h4>Meal Image</h4>
            <ImageUpload required />
            <h4>Menu Category</h4>
            <div className={`dropdown-input ${emptySelected && 'empty-selected'}`}>
              <Select
                options={option}
                classNamePrefix="category-select"
                placeholder={'Select a Category'}
                isClearable={true}
                onChange={(e) => {
                  const target = e as OptionType;
                  setCurrentSelected(target?.value);
                  setCurrentSelectedId(target?.id);
                }}
                defaultValue={{ value: category.toLowerCase(), label: category }}
              />
            </div>
            <h4>Meal Name</h4>
            <input type="text" placeholder="Meal Name" name="name" required />
            <h4>Meal Description</h4>
            <textarea rows={8} required name="description"></textarea>
            <h4>Meal Price</h4>
            <input type="number" name="price" step={0.01} min={0} placeholder="Meal Price" required />
            <button type="submit" className="submit-button">
              Add Meal
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
