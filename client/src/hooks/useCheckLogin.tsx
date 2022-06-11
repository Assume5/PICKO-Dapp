import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts';
import { serverUrl } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';

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
        userCtx.setUser({
          login: true,
          name: response.name,
          role: response.role,
          checked: true,
        });
        Cookies.remove('guest_cookie');
      } else {
        userCtx.setUser({ login: false, checked: true });
        if (!Cookies.get('guest_cookie')) Cookies.set('guest_cookie', uuidv4(), { expires: 7 });
      }
    };
    checkLogin();
  }, []);
};
