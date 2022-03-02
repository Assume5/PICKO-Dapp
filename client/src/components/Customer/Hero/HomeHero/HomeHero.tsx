import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import type { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import type { SearchResult } from 'leaflet-geosearch/dist/providers/provider';

export const HomeHero = () => {
  const addressInput = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult<RawResult>[]>();
  const [result, setResult] = useState<SearchResult<RawResult>>();
  const provider = useMemo(
    () =>
      new OpenStreetMapProvider({
        params: {
          countrycodes: 'us',
        },
      }),
    [],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      provider.search({ query: address }).then((result) => {
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

  const onResultClick = (result: SearchResult<RawResult>) => {
    if (addressInput && addressInput.current) {
      setSearchResult(undefined);
      setResult(result);
      addressInput.current.value = result.label;
    }
  };

  const onSubmitClick = () => {
    if (addressInput && addressInput.current) {
      console.log(result);

      if (result !== undefined) {
        const currentInput = addressInput.current.value;
        if (currentInput === result.label) {
          //add to local storage
        } else {
          console.log('Please Select an Address');
        }
      } else {
        console.log('Please Select an Address');
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
      {searchResult && (
        <div className="search-result">
          {searchResult.map((result) => {
            const label = result.label;
            return (
              <div key={label} className="search-result-item">
                <p onClick={() => onResultClick(result)}>{label}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="overlay"></div>
    </div>
  );
};
