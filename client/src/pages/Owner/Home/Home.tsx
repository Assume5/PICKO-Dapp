import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@src/contexts';
import { OwnerHome } from '@src/components/Owner/OwnerHome/OwnerHome';
import { RestaurantDetails } from '@src/components/Owner/RestaurantDetails/RestaurantDetails';
import { Login } from '../../../components/Global/Login/Login';
import { OwnerHeader } from '../../../components/Owner/OwnerHeader/OwnerHeader';
import { JoinRestaurantForm } from '../../../components/Owner/JoinRestaurantForm/JoinRestaurantForm';
import { serverUrl } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkFilledForm = async () => {
      if (userCtx.user.login) {
        const res = await fetch(`${serverUrl}/check/restaurant`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
        });

        const data = await res.json();
        if (data.exists) {
          setChecked(true);
          navigate(`./${data.id}`);
        }
      }
    };

    checkFilledForm();
  }, [userCtx]);
  return (
    <>
      <OwnerHeader />
      <div className="owner-home">
        {!userCtx.user.login ? (
          <Login role={'owner'} />
        ) : !checked ? (
          <JoinRestaurantForm setChecked={setChecked} />
        ) : (
          <>
            <OwnerHome />
          </>
        )}
      </div>
    </>
  );
};
