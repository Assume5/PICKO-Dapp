import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import type { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import type { SearchResult } from 'leaflet-geosearch/dist/providers/provider';

import { setCookie } from '@src/helpers';

interface RawResultAddress extends RawResult {
  address?: {
    [key: string]: string;
  };
}

interface Props {
  setChangeSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressResult?: React.Dispatch<React.SetStateAction<SearchResult<RawResultAddress> | undefined>>;
  setErr?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValue?: string;
}

export const AddressSearch: React.FC<Props> = ({ setChangeSuccess, setAddressResult, setErr, defaultValue }) => {
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
      setErr && setErr(false);
      if (setAddressResult) {
        setAddressResult(result);
      }
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

          if (setChangeSuccess) {
            setChangeSuccess(true);
          }
        } else {
          setErrorMessage('Please Select an Address');
        }
      } else {
        setErrorMessage('Please Select an Address');
      }
    }
  };
  return (
    <>
      <div className={`address-search ${loadingAddress ? 'loading' : ''}`}>
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => onInputChange(e.target.value)}
          ref={addressInput}
          defaultValue={(defaultValue && defaultValue) || ''}
          required
        />
        <FontAwesomeIcon icon={faArrowCircleRight} className="submit-button" onClick={onSubmitClick} />
        <FontAwesomeIcon icon={faCircleNotch} className="loading-icon fa-spin" />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {searchResult && (
        <div className={`address-search-result ${searchResult.length > 0 && 'has-result'}`}>
          {searchResult.map((result) => {
            const label = result.label;
            return (
              <div key={label} className="address-search-result-item" onClick={() => onResultClick(result)}>
                <p>{label}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
