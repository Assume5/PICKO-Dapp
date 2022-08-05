import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../../../utils/constants';
import { ImageUpload } from '../../../Global/ImageUpload/ImageUpload';

type RestaurantImages = {
  hero_type: string;
  restaurant_card_image: string;
  hero_images: {
    hero_image: string;
    id: number;
  }[];
};

export const OwnerAccountImages = () => {
  const { id } = useParams();
  const [data, setData] = useState<RestaurantImages>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${serverUrl}/restaurant/images/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      const data = await res.json();

      if (data.error) {
        console.error(data.error);
      }

      if (data.success) {
        setData(data.data);
      }
    };
    fetchData();
  }, []);

  const onFormSubmit = async (e: FormEvent) => {};

  if (!data) return null;

  return (
    <div className="owner-account-inner fade-in-up">
      <form onSubmit={(e) => onFormSubmit(e)}>
        <div className="card-image">
          <h3>Card Image</h3>
          <img src={data?.restaurant_card_image} alt="" />
        </div>
        <label>
          <input type="radio" value="image" name="hero" required defaultChecked={data.hero_type === 'image'} /> Single
          Image
        </label>
        <label>
          <input type="radio" value="carousel" name="hero" required defaultChecked={data.hero_type === 'carousel'} />{' '}
          Carousel
        </label>
        <h3>Hero Image</h3>
        <div className="hero-image-upload-container">
          {data.hero_images.map((item) => {
            return (
              <div className="hero-image-upload">
                <img src={item.hero_image} alt="" />
              </div>
            );
          })}
        </div>

        <button>Update</button>
      </form>
    </div>
  );
};
