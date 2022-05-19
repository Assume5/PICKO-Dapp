import { AddressSearch } from '@src/components/Customer/AddressSearch/AddressSearch';
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import type { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import Web3 from 'web3';
import { UserContext } from '../../../contexts/UserContext';
interface RawResultAddress extends RawResult {
  address?: {
    [key: string]: string;
  };
}

export const RestaurantForm = () => {
  const [address, setAddress] = useState<SearchResult<RawResultAddress>>();
  const [err, setErr] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addressInput: HTMLInputElement | null = document.querySelector('.address-search input');
    if (addressInput && addressInput.value === address?.label) {
      setErr(false);
    } else {
      setErr(true);
    }
  };
  return (
    <div className="join-restaurant-form">
      <form className="restaurant-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Restaurant Form</h2>
        <input type="text" name="restaurant-name" placeholder="Restaurant Name" required />
        <input type="text" name="restaurant-phone" placeholder="Phone Number" required />
        <AddressSearch setAddressResult={setAddress} setErr={setErr} />
        <p className={`error-message ${err ? 'visible' : 'hidden'}`}>Please Select an Address</p>
        <input className="" name="restaurant-category" placeholder="Category1, Category2" required />
        <div className="open-close-time">
          <div className="open-time">
            <label>Select a Open Time</label>
            <input type="time" name="restaurant-open-close-time" required />
          </div>
          <div className="close-time">
            <label>Select a Close Time</label>
            <input type="time" name="restaurant-open-close-time" required />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
