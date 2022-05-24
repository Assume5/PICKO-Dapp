import React from 'react';
import { OwnerHeader } from '../../../components/Owner/OwnerHeader/OwnerHeader';
import { OwnerHome } from '../../../components/Owner/OwnerHome/OwnerHome';

export const OwnerRestaurant = () => {
  return (
    <>
      <OwnerHeader />
      <div className="page owners-restaurant owner-home">
        <OwnerHome />
      </div>
    </>
  );
};
