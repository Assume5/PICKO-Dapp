import React, { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import type { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import type { SearchResult } from 'leaflet-geosearch/dist/providers/provider';

export const HomeHero = () => {
  const [address, setAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult<RawResult>[]>();
  const provider = useMemo(() => new OpenStreetMapProvider(), []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      provider.search({ query: address }).then((result) => {
        console.log(result);
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

  return (
    <div className="home-hero">
      <h2>Enter your address and order your food!</h2>
      <div className={`address-input ${loadingAddress ? 'loading' : ''}`}>
        <input type="text" placeholder="Address" onChange={(e) => onInputChange(e.target.value)} />
        <FontAwesomeIcon icon={faArrowCircleRight} className="submit-button" />
        <FontAwesomeIcon icon={faCircleNotch} className="loading-icon fa-spin" />
      </div>
      {searchResult && (
        <div className="search-result">
          {searchResult.map((result) => {
            const label = result.label;
            return <div key={label} className="search-result-item">
              <p>{label}</p>
            </div>;
          })}
        </div>
      )}

      <div className="overlay"></div>
    </div>
  );
};
