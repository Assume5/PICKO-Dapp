import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeHero } from '../../../components/Customer/Hero/HomeHero/HomeHero';
import { ServicesPromo } from '../../../components/Customer/ServicesPromo/ServicesPromo';
import { checkAddress } from '../../../utils/functions';

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const initCheck = async () => {
      const res = await checkAddress();
      if (res) {
        navigate('/eat');
      }
    };
    initCheck();
  }, [navigate]);

  return (
    <div className="home">
      <HomeHero />
      <ServicesPromo />
    </div>
  );
};
