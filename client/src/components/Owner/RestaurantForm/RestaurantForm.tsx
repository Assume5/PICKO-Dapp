import { AddressSearch } from '@src/components/Customer/AddressSearch/AddressSearch';
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import type { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import Web3 from 'web3';
import { UserContext } from '../../../contexts/UserContext';
import { StepOneData } from '../../../types';
interface RawResultAddress extends RawResult {
  address?: {
    [key: string]: string;
  };
}

interface Props {
  stepOneData: StepOneData | null;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setStepOneData: React.Dispatch<React.SetStateAction<StepOneData | null>>;
  address: SearchResult<RawResultAddress> | undefined;
  setAddress: React.Dispatch<React.SetStateAction<SearchResult<RawResultAddress> | undefined>>;
}

export const RestaurantForm: React.FC<Props> = ({ setStep, stepOneData, setStepOneData, address, setAddress }) => {
  const [err, setErr] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addressInput: HTMLInputElement | null = document.querySelector('.address-search input');
    console.log(address, addressInput);
    if (addressInput && addressInput.value === address?.label) {
      setErr(false);
      const target = e.target as typeof e.target & {
        name: { value: string };
        phone: { value: string };
        category: { value: string };
        openTime: { value: string };
        closeTime: { value: string };
      };
      const { name, phone, category, openTime, closeTime } = target;
      const { city, house_number, road, state, postcode } = address.raw.address!;
      setStepOneData({
        name: name.value,
        fullAddress: address.label,
        address: `${house_number} ${road}`,
        city: city,
        state: state,
        zipcode: postcode,
        phone: phone.value,
        category: category.value,
        openTime: openTime.value,
        closeTime: closeTime.value,
        lat: address.y.toString(),
        long: address.x.toString(),
      });

      setStep(2);
    } else {
      setErr(true);
    }
  };
  return (
    <div className="join-restaurant-form">
      <form className="restaurant-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Restaurant Form</h2>
        <input type="text" name="name" placeholder="Restaurant Name" defaultValue={stepOneData?.name || ''} required />
        <AddressSearch setAddressResult={setAddress} setErr={setErr} defaultValue={stepOneData?.fullAddress} />
        <p className={`error-message ${err ? 'visible' : 'hidden'}`}>Please Select an Address</p>
        <input type="text" name="phone" placeholder="Phone Number" defaultValue={stepOneData?.phone || ''} required />
        <input
          className=""
          name="category"
          placeholder="Category1, Category2"
          defaultValue={stepOneData?.category || ''}
          required
        />
        <div className="open-close-time">
          <div className="open-time">
            <label>Select a Open Time</label>
            <input type="time" name="openTime" defaultValue={stepOneData?.openTime || ''} required />
          </div>
          <div className="close-time">
            <label>Select a Close Time</label>
            <input type="time" name="closeTime" defaultValue={stepOneData?.closeTime || ''} required />
          </div>
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};
