import React, { useState } from 'react';
import { ImageUpload } from '../../Global/ImageUpload/ImageUpload';

export const RestaurantSettingForm = () => {
  const [menuType, setMenuType] = useState('filter');
  const [heroType, setHeroType] = useState('image');
  const [count, setCount] = useState(1);
  const [heroImageCount, setHeroImageCount] = useState(2);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };

  };

  return (
    <div className="join-restaurant-form">
      <form className="restaurant-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Restaurant Setting Form</h2>
        <div onChange={(e) => setMenuType((e.target as HTMLInputElement).value)}>
          <input type="radio" value="filter" name="menu" defaultChecked required /> Filter
          <input type="radio" value="aio" name="menu" required /> All in one
        </div>
        {Array.from(Array(count)).map((i) => {
          return (
            <div className="menu-category-input" key={i + 321}>
              <input type="text" name="category" placeholder="Main Dishes" required />
              <input type="checkbox" value="true" /> Priority?
              {menuType === 'aio' && <ImageUpload />}
            </div>
          );
        })}
        <p onClick={() => setCount(count + 1)}>Add more category</p>

        <h3>Card Image</h3>
        <div className="card-image">
          <ImageUpload />
        </div>
        <div
          onChange={(e) => {
            setHeroType((e.target as HTMLInputElement).value);
            setHeroImageCount(2);
          }}
        >
          <input type="radio" value="image" name="hero" required defaultChecked /> Single Image
          <input type="radio" value="carousel" name="hero" required /> Carousel
        </div>
        <h3>Hero Image</h3>
        <div className="hero-image">
          {heroType === 'image' ? (
            <ImageUpload />
          ) : (
            <>
              {Array.from(Array(heroImageCount)).map((i) => {
                return <ImageUpload key={i + 123} />;
              })}
            </>
          )}
        </div>
        {heroType === 'carousel' && <p onClick={() => setHeroImageCount(heroImageCount + 1)}>Add more category</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
