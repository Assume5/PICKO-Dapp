import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import type { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import type { SearchResult } from 'leaflet-geosearch/dist/providers/provider';

import { setCookie, getCookie } from '../../../../utils/functions';

interface RawResultAddress extends RawResult {
  address?: {
    [key: string]: string;
  };
}

export const HomeHero = () => {
  const addressInput = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult<RawResultAddress>[]>();
  const [result, setResult] = useState<SearchResult<RawResultAddress>>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const provider = useMemo(
    () =>
      new OpenStreetMapProvider({
        params: {
          countrycodes: 'us',
          addressdetails: 1,
        },
      }),
    [],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      provider.search({ query: address }).then((result: SearchResult<RawResultAddress>[]) => {
        setSearchResult(result);
        setLoadingAddress(false);
      });
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [address, provider]);

  const onInputChange = (input: string) => {
    setAddress(input);
    setLoadingAddress(true);
  };

  const onResultClick = (result: SearchResult<RawResultAddress>) => {
    if (addressInput && addressInput.current) {
      setSearchResult(undefined);
      setResult(result);
      addressInput.current.value = result.label;
      setErrorMessage(undefined);
    }
  };

  const onSubmitClick = () => {
    if (addressInput && addressInput.current) {
      if (result !== undefined) {
        const currentInput = addressInput.current.value;
        if (currentInput === result.label && result.raw.address) {
          const addressDetail = result.raw.address;
          const city = addressDetail.city;
          const zip = addressDetail.postcode;
          const home = `${addressDetail.house_number} ${addressDetail.road}`;
          const state = addressDetail.state;
          const fullAddress = {
            home: home,
            city: city,
            state: state,
            zip: zip,
          };
          const latLong = {
            lat: result.y,
            long: result.x,
          };
          setCookie('address_details', fullAddress, 7);
          setCookie('lat_long', latLong, 7);
        } else {
          setErrorMessage('Please Select an Address');
        }
      } else {
        setErrorMessage('Please Select an Address');
      }
    }
  };

  return (
    <div className="home-hero">
      <h2>Enter your address and order your food!</h2>
      <div className={`address-input ${loadingAddress ? 'loading' : ''}`}>
        <input type="text" placeholder="Address" onChange={(e) => onInputChange(e.target.value)} ref={addressInput} />
        <FontAwesomeIcon icon={faArrowCircleRight} className="submit-button" onClick={onSubmitClick} />
        <FontAwesomeIcon icon={faCircleNotch} className="loading-icon fa-spin" />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {searchResult && (
        <div className="search-result">
          {searchResult.map((result) => {
            const label = result.label;
            return (
              <div key={label} className="search-result-item" onClick={() => onResultClick(result)}>
                <p>{label}</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="overlay"></div>
    </div>
  );
};
