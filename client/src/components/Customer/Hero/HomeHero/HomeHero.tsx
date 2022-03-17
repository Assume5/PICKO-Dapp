import { useEffect, useState } from 'react';
import { getCookie } from '../../../../utils/functions';
import { AddressSearch } from '../../AddressSearch/AddressSearch';
import { useNavigate } from 'react-router-dom';

export const HomeHero = () => {
  const [changeSuccess, setChangeSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (changeSuccess) {
      navigate('/eat');
    }
  }, [changeSuccess, navigate]);

  useEffect(() => {
    
  })
  return (
    <div className="home-hero">
      <h2>Enter your address and order your food!</h2>
      <AddressSearch setChangeSuccess={setChangeSuccess} />
      <div className="overlay"></div>
    </div>
  );
};
