import React from 'react';
import { OwnerHeader } from '../../../components/Owner/OwnerHeader/OwnerHeader';
import { OwnerHome } from '../../../components/Owner/OwnerHome/OwnerHome';
import { useCheckLoginRedirect } from '../../../hooks/useCheckLoginRedirect';

export const OwnerRestaurant = () => {
  useCheckLoginRedirect('owner');
  
  return (
    <>
      <OwnerHeader />
      <div className="page owners-restaurant owner-home">
        <OwnerHome />
      </div>
    </>
  );
};
