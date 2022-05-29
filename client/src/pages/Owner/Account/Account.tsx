import React from 'react';
import { useParams } from 'react-router-dom';
import { OwnerAccountImages } from '../../../components/Owner/OwnerAccount/OwnerAccountImages/OwnerAccountImages';
import { OwnerAccountMenu } from '../../../components/Owner/OwnerAccount/OwnerAccountMenu/OwnerAccountMenu';
import { OwnerAccountMenuCategory } from '../../../components/Owner/OwnerAccount/OwnerAccountMenuCategory/OwnerAccountMenuCategory';
import { OwnerAccountNavBar } from '../../../components/Owner/OwnerAccount/OwnerAccountNavBar/OwnerAccountNavBar';
import { OwnerAccountSetting } from '../../../components/Owner/OwnerAccount/OwnerAccountSetting/OwnerAccountSetting';
import { OwnerHeader } from '../../../components/Owner/OwnerHeader/OwnerHeader';
import { useCheckLoginRedirect } from '../../../hooks/useCheckLoginRedirect';

export const Account = () => {
  useCheckLoginRedirect('owner');
  const { page } = useParams();
  console.log(page);
  return (
    <>
      <OwnerHeader />
      <div className="owner-account">
        <OwnerAccountNavBar />
        {page === 'settings' && <OwnerAccountSetting />}
        {page === 'menu-category' && <OwnerAccountMenuCategory />}
        {page === 'menus' && <OwnerAccountMenu />}
        {page === 'images' && <OwnerAccountImages />}
      </div>
    </>
  );
};
