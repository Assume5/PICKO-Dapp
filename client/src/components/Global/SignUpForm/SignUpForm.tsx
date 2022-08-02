import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../../utils/constants';
import { AddressSearch } from '../../Customer/AddressSearch/AddressSearch';

interface Props {
  role: string;
  setAuthState?: React.Dispatch<React.SetStateAction<string>>;
}

type body = {
  email: string;
  password: string;
  fname: string;
  lname: string;
  phone: string;
  address?: string;
  license?: string;
};

export const SignUpForm: React.FC<Props> = ({ role, setAuthState }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      fname: { value: string };
      lname: { value: string };
      phone: { value: string };
      address: { value: string };
      license: { value: string };
    };

    setError(null);

    const { email, password, fname, lname, phone } = target;

    const body: body = {
      email: email.value,
      password: password.value,
      fname: fname.value,
      lname: lname.value,
      phone: phone.value,
    };

    if (role === 'driver') {
      const { address, license } = target;
      body.address = address.value;
      body.license = license.value;
    }
    const res = await fetch(`${serverUrl}/register/${role}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.error);
    }

    setLoading(false);

    if (data.success) {
      setAuthState ? setAuthState('login') : navigate(`/${role}`);
    }
  };
  return (
    <div className={`sign-up-form ${setAuthState && 'fade-in-up'}`}>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <h2>Sign Up</h2>
        <div className="input-container">
          <div>
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
        </div>
        <div className="input-container">
          <div>
            <label>First Name</label>
            <input type="text" name="fname" required />
          </div>

          <div>
            <label>Last Name</label>
            <input type="text" name="lname" required />
          </div>
        </div>
        {role === 'driver' && (
          <>
            <div>
              <label>Address</label>
              <input type="text" name="address" required />
            </div>
            <div>
              <label>Driver License Number</label>
              <input type="text" name="license" required />
            </div>
          </>
        )}

        <label>Phone Number</label>
        <input type="text" name="phone" required />
        {error && <p className="form-error">{error}</p>}
        <button className={`${loading && 'loading'}`} disabled={loading}>
          Sign Up {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
        <p
          className="sign-up-button"
          onClick={() => {
            setAuthState ? setAuthState('login') : navigate(`/${role}`);
          }}
        >
          Login
        </p>
      </form>
    </div>
  );
};
