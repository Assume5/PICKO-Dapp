import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts';

export const useCheckLoginRedirect = (role: string) => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userCtx.user.checked) {
      !userCtx.user.login && navigate(`/${role}`);
    }
  }, [userCtx]);
};
