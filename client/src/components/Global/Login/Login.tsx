import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import React, { FormEvent, SetStateAction, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, UserContext } from '../../../contexts';
import { serverUrl } from '../../../utils/constants';
import { getCookie } from '../../../utils/functions';

interface Props {
  role: string;
  setAuthState?: React.Dispatch<SetStateAction<string>>; //for customer
  setAuthModal?: React.Dispatch<SetStateAction<boolean>>; //for customer
}

export const Login: React.FC<Props> = ({ role, setAuthState, setAuthModal }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userCtx = useContext(UserContext);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const { email, password } = target;

    const res = await fetch(`${serverUrl}/login/${role}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email.value,
        password: password.value,
        guestId: Cookies.get('guest_cookie'),
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      setError(data.error);
    }

    if (data.success) {
      Cookies.remove('guest_cookie');
      Cookies.set('socket-cookie', data.socketCookie, { expires: 365 });
      Cookies.set('role', role, { expires: 365 });
      window.location.reload();
    }
  };

  return (
    <div className={`login ${setAuthState && 'fade-in-up'}`}>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <h2>Sign In</h2>
        <label>Email</label>
        <input type="email" name="email" required />
        <label>Password</label>
        <input type="password" name="password" required />
        {error && <p className="form-error">{error}</p>}
        <button className={`${loading && 'loading'}`} disabled={loading}>
          Sign in {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
        <p
          className="sign-up-button"
          onClick={() => {
            setAuthState ? setAuthState('register') : navigate('./sign-up');
          }}
        >
          Register
        </p>
      </form>
    </div>
  );
};
