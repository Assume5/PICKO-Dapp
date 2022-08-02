import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  newOrderModal: boolean;
  setNewOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  disableNav?: boolean;
}

export const NewOrderModal: React.FC<Props> = ({ setNewOrderModal, newOrderModal, disableNav }) => {
  const navigation = useNavigate();
  return (
    <div className={`modal new-order-modal ${newOrderModal ? 'show' : ''}`}>
      <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => setNewOrderModal(false)} />

      <div className="modal-inner">
        <div
          className="order-circle"
          onClick={() => {
            !disableNav && navigation('/owner');
          }}
        >
          <p>New Orders</p>
          <div className="outer-circle"></div>
          <div className="outer-circle-2"></div>
          <div className="inner-circle"></div>
        </div>
      </div>
    </div>
  );
};
