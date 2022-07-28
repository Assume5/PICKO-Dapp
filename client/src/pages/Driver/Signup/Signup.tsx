import React from 'react';
import { DriverHeader } from '../../../components/Driver/DriverHeader/DriverHeader';
import { SignUpForm } from '../../../components/Global/SignUpForm/SignUpForm';

export const Signup = () => {
  return (
    <>
      <DriverHeader />
      <div className="sign-up">
        <SignUpForm role={'driver'} />
      </div>
    </>
  );
};
