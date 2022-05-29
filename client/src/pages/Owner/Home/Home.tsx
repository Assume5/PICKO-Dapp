import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@src/contexts';
import { OwnerHome } from '@src/components/Owner/OwnerHome/OwnerHome';
import { RestaurantDetails } from '@src/components/Owner/RestaurantDetails/RestaurantDetails';
import { Login } from '../../../components/Global/Login/Login';
import { OwnerHeader } from '../../../components/Owner/OwnerHeader/OwnerHeader';
import { JoinRestaurantForm } from '../../../components/Owner/JoinRestaurantForm/JoinRestaurantForm';
import { serverUrl } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useCheckLoginRedirect } from '../../../hooks/useCheckLoginRedirect';
export const Home = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkFilledForm = async () => {
      if (userCtx.user.checked) {
        if (userCtx.user.login) {
          const res = await fetch(`${serverUrl}/check/restaurant`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
          });

          const data = await res.json();
          if (data.exists) {
            navigate(`./${data.id}`);
          } else {
            const headerContent: HTMLDivElement | null = document.querySelector('.header .content');
            if (headerContent) {
              (headerContent.querySelector('.view-button') as HTMLButtonElement).style.display = 'none';
              (headerContent.querySelector('.nav-menus-page') as HTMLButtonElement).style.display = 'none';
            }
            setLoaded(true);
          }
        } else {
          setLoaded(true);
        }
      }
    };

    checkFilledForm();
  }, [userCtx]);

  // if (!loaded) return <></>;

  return (
    <>
      <OwnerHeader />
      <div className="owner-home page">
        {loaded &&
          (!userCtx.user.login ? <Login role={'owner'} /> : !checked && <JoinRestaurantForm setChecked={setChecked} />)}
      </div>
    </>
  );
};
