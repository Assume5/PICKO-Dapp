import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts';
import { serverUrl } from '../utils/constants';

export const useCheckLogin = () => {
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch(`${serverUrl}/check-login`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
      });

      const response = await res.json();
      if (response.success) {
        userCtx.setUser({
          login: true,
          role: response.role,
        });
      } else {
        userCtx.setUser({ login: false });
      }
    };

    checkLogin();
  }, []);
};
