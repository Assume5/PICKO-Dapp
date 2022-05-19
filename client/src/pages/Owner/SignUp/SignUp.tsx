import React from 'react';
import { SignUpForm } from '../../../components/Global/SignUpForm/SignUpForm';
import { OwnerHeader } from '../../../components/Owner/OwnerHeader/OwnerHeader';

export const SignUp = () => {
  return (
    <>
      <OwnerHeader />
      <div className="owner-sign-up">
        <SignUpForm role={'owner'} />
      </div>
    </>
  );
};
