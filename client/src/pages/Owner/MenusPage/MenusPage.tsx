import { Menus } from '@src/components/Owner/Menus/Menus';
import React from 'react';
import { OwnerHeader } from '../../../components/Owner/OwnerHeader/OwnerHeader';

export const MenusPage = () => {
  return (
    <>
      <OwnerHeader />
      <div className="owner-menus">
        <Menus />
      </div>
    </>
  );
};
