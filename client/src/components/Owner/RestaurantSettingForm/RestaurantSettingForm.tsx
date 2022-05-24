import { faCircleNotch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { MenuCategory, StepTwoData } from '../../../types';
import { ImageUpload } from '../../Global/ImageUpload/ImageUpload';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setStepTwoData: React.Dispatch<React.SetStateAction<StepTwoData | null>>;
  onAllFormReady: () => void;
  loading: boolean;
}

export const RestaurantSettingForm: React.FC<Props> = ({ setStep, setStepTwoData, onAllFormReady, loading }) => {
  const [menuType, setMenuType] = useState('filter');
  const [heroType, setHeroType] = useState('image');
  const [count, setCount] = useState(1);
  const [heroImageCount, setHeroImageCount] = useState(2);
  const categoryRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as Element;
    const menuCategories = target.querySelector('.menu-category-container')?.childNodes;

    const categoryData: MenuCategory[] = [];

    const categoryImages: File[] = [];

    menuCategories &&
      menuCategories.forEach((child) => {
        const node = child as Element;
        const category = node.querySelector('input[name="category"]') as HTMLInputElement;
        const check = node.querySelector('input[type="checkbox"]') as HTMLInputElement;
        console.log(category.value, check.checked);
        categoryData.push({ category_name: category.value, priority: check.checked });
      });

    if (menuType === 'aio') {
      const categoryFiles = document.querySelectorAll(
        '.menu-category-input input[type="file"]',
      ) as NodeListOf<HTMLInputElement>;
      categoryFiles.forEach((file) => {
        file && file.files && categoryImages.push(file.files[0]);
      });
    }
    const cardImage = target.querySelector('.card-image .file-container input') as HTMLInputElement;
    const cardImageFile = cardImage && cardImage.files && cardImage.files[0];

    const heroFileData: File[] = [];

    const heroImages = target.querySelectorAll('.hero-image input[type="file"]') as NodeListOf<HTMLInputElement>;
    heroImages &&
      heroImages.forEach((child) => {
        child && child.files && child.files[0] && heroFileData.push(child.files[0]);
      });

    setStepTwoData({
      heroType: heroType,
      menuType: menuType,
      cardImage: cardImageFile!,
      menuCategory: categoryData,
      heroImages: heroFileData,
      menuCategoryImages: categoryImages,
      facebook: '',
      instagram: '',
      twitter: '',
    });
  };

  const onDeleteCategoryButtonClick = (target: Element) => {
    const length = categoryRef.current?.childElementCount;
    if (length && length > 1 && target.parentElement) {
      target.parentElement.remove();
    }
  };

  const onDeleteHeroButtonClick = (target: Element) => {
    const length = document.querySelector('.hero-image-upload-container')?.childElementCount;
    if (length && length > 2 && target.parentElement) {
      target.parentElement.remove();
    }
  };

  return (
    <div className="join-restaurant-form">
      <form className="restaurant-setting-form" onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <h2>Restaurant Setting Form</h2>
        <div onChange={(e) => setMenuType((e.target as HTMLInputElement).value)}>
          <label>
            <input type="radio" value="filter" name="menu" defaultChecked required />
            Filter
          </label>

          <label>
            <input type="radio" value="aio" name="menu" required />
            All in one
          </label>
        </div>
        <div className="menu-category-container" ref={categoryRef}>
          {Array.from(Array(count)).map((value, i) => {
            return (
              <div className="menu-category-input" key={i + 321}>
                <input type="text" name="category" placeholder="Main Dishes" required />
                <input type="checkbox" value="true" /> Priority?
                <div className="delete-button" onClick={(e) => onDeleteCategoryButtonClick(e.currentTarget as Element)}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </div>
                {menuType === 'aio' && <ImageUpload />}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={() => setCount(count + 1)}>
          Add more category
        </button>
        <div className="card-image">
          <h3>Card Image</h3>
          <ImageUpload />
        </div>

        <div className="hero-image">
          <div
            onChange={(e) => {
              setHeroType((e.target as HTMLInputElement).value);
              setHeroImageCount(2);
            }}
          >
            <label>
              <input type="radio" value="image" name="hero" required defaultChecked /> Single Image
            </label>
            <label>
              <input type="radio" value="carousel" name="hero" required /> Carousel
            </label>
          </div>
          <h3>Hero Image</h3>
          {heroType === 'image' ? (
            <ImageUpload />
          ) : (
            <div className="hero-image-upload-container">
              {Array.from(Array(heroImageCount)).map((value, i) => {
                return (
                  <div className="hero-image-upload">
                    <div className="delete-button" onClick={(e) => onDeleteHeroButtonClick(e.currentTarget as Element)}>
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </div>
                    <ImageUpload key={i + 123} />
                  </div>
                );
              })}
            </div>
          )}
          {heroType === 'carousel' && (
            <button type="button" onClick={() => setHeroImageCount(heroImageCount + 1)}>
              Add more images
            </button>
          )}
        </div>

        <button type="submit" className={`${loading && 'loading'}`} disabled={loading}>
          Submit {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
      </form>
    </div>
  );
};
