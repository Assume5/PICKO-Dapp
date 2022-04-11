import React from 'react';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
}
export const WarningModal: React.FC<Props> = ({ modalOpen, setModalOpen, category }) => {
  return (
    <div className={`warning-modal modal ${modalOpen && 'visible'}`}>
      <div className="modal-inner">
        <p>
          Are you sure you want to remove, <strong>{category}</strong>?
        </p>
        <button className="remove-button" onClick={() => setModalOpen(!modalOpen)}>
          Cancel
        </button>
        <button className="confirm-button">Confirm</button>
      </div>
    </div>
  );
};
