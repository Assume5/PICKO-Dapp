import React, { useState } from 'react';
import { AddressSearch } from '../../AddressSearch/AddressSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  heroModal: boolean;
  changeSuccess: boolean;
  setHeroModal: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EatHeroModal: React.FC<Props> = ({ heroModal, setHeroModal, changeSuccess, setChangeSuccess }) => {
  const closeModal = () => {
    setHeroModal(false);
  };

  return (
    <div className={`eat-hero-modal ${heroModal && !changeSuccess ? 'modal-up' : ''}`}>
      <div className="close-modal" onClick={closeModal}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <h4>Update Your Address</h4>
      <AddressSearch setChangeSuccess={setChangeSuccess} />
    </div>
  );
};
