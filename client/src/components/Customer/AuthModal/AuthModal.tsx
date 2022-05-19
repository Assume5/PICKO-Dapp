import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SetStateAction, useEffect } from 'react';
import { Login } from '../../Global/Login/Login';
import { SignUpForm } from '../../Global/SignUpForm/SignUpForm';

interface Props {
  authState: string;
  setAuthState: React.Dispatch<SetStateAction<string>>;
  setAuthModal: React.Dispatch<SetStateAction<boolean>>;
}

export const AuthModal: React.FC<Props> = ({ authState, setAuthState, setAuthModal }) => {
  return (
    <div className="auth-modal modal">
      <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => setAuthModal(false)} />
      <div className="modal-inner fade-in-up">
        {authState === 'login' ? (
          <Login role={'customer'} setAuthState={setAuthState} setAuthModal={setAuthModal} />
        ) : (
          <SignUpForm role={'customer'} setAuthState={setAuthState} />
        )}
      </div>
    </div>
  );
};
