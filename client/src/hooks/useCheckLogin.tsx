import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts';
import { serverUrl } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

export const useCheckLogin = () => {
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch(`${serverUrl}/check/login`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
      });

      const response = await res.json();

      if (response.success) {
        const data: User = {
          login: true,
          name: response.name,
          role: response.role,
          checked: true,
        };

        if (response.role === 'driver') {
          const res = await fetch(`${serverUrl}/check/driver/status`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          });

          const response = await res.json();

          if (response.error) {
            console.error(response.error);
          }

          if (response.success) {
            data.driverStatus = response.status;
          }
        }
        userCtx.setUser(data);
        Cookies.remove('guest_cookie');
      } else {
        userCtx.setUser({ login: false, checked: true });
        Cookies.set('role', 'customer', { expires: 365 });
        if (!Cookies.get('guest_cookie')) {
          const guestId = uuidv4();
          Cookies.set('guest_cookie', guestId, { expires: 7 });
          const res = await fetch(`${serverUrl}/login/guest`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              guestId: guestId,
            }),
          });

          const response = await res.json();
        }
      }
    };
    checkLogin();
  }, []);
};
