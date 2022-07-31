import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeHero } from '@src/components//Customer/Hero/HomeHero/HomeHero';
import { ServicesPromo } from '@src/components//Customer/ServicesPromo/ServicesPromo';
import { checkAddress } from '@src/helpers';
import { CustomerHeader } from '../../../components/Customer/CustomerHeader/CustomerHeader';

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
    <>
      <CustomerHeader />
      <div className="home">
        <HomeHero />
        <ServicesPromo />
      </div>
    </>
  );
};
