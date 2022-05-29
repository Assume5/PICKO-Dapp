import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RestaurantSetting } from '../../../../types';
import { serverUrl } from '../../../../utils/constants';
import { SuccessModal } from '../../../Global/SuccessModal/SuccessModal';

export const OwnerAccountSetting = () => {
  const { id } = useParams();
  const [data, setData] = useState<RestaurantSetting | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${serverUrl}/restaurant/settings/${id}`, {
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
      } else {
        console.log(data.data);
        setData(data.data);
        setLoaded(true);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    const target = e.target as HTMLFormElement & {
      phone: { value: string };
      category: { value: string };
      openTime: { value: string };
      closeTime: { value: string };
      facebook: { value: string };
      instagram: { value: string };
      twitter: { value: string };
    };
    const { phone, category, openTime, closeTime, facebook, instagram, twitter } = target;
    const res = await fetch(`${serverUrl}/restaurant/settings/${id}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone.value,
        category: category.value,
        openTime: openTime.value,
        closeTime: closeTime.value,
        facebook: facebook.value,
        instagram: instagram.value,
        twitter: twitter.value,
      }),
    });

    const data = await res.json();
    if (data.error) {
      console.error(data.error);
    }

    if (data.success) {
      setUpdateSuccess(true);
    }
    setUpdateLoading(false);
  };

  if (!loaded && !data) return null;

  return (
    <div className="owner-account-inner fade-in-up">
      <form className="restaurant-form" onSubmit={(e) => handleSubmit(e)}>
        <label>Name</label>
        <input type="text" name="name" placeholder="Restaurant Name" value={data?.restaurant_name} disabled />
        <label>Address</label>
        <input type="text" name="address" placeholder="Address" value={data?.full_address} disabled />
        <label>Phone Number</label>
        <input type="text" name="phone" placeholder="Phone Number" defaultValue={data?.phone || ''} required />
        <label>Category</label>
        <input
          className=""
          name="category"
          placeholder="Category1, Category2"
          defaultValue={data?.category || ''}
          required
        />
        <div className="open-close-time">
          <div className="open-time">
            <label>Open Time</label>
            <input type="time" name="openTime" defaultValue={data?.open_time || ''} required />
          </div>
          <div className="close-time">
            <label>Close Time</label>
            <input type="time" name="closeTime" defaultValue={data?.close_time || ''} required />
          </div>
        </div>
        <div className="social-media">
          <div className="social-media-input">
            <label>Facebook URL</label>
            <input
              type="text"
              name="facebook"
              placeholder="Facebook"
              defaultValue={data?.social_link?.facebook || ''}
            />
            <label>Instagram URL</label>
            <input
              type="text"
              name="instagram"
              placeholder="Instagram"
              defaultValue={data?.social_link?.instagram || ''}
            />
            <label>Twitter URL</label>
            <input type="text" name="twitter" placeholder="Twitter" defaultValue={data?.social_link?.twitter || ''} />
          </div>
        </div>

        <button type="submit">
          Update {updateLoading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
      </form>
      {updateSuccess && <SuccessModal text="Update Success" setModal={setUpdateSuccess} />}
    </div>
  );
};
