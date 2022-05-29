import React from 'react';

interface Props {
  text: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SuccessModal: React.FC<Props> = ({ text, setModal }) => {
  return (
    <div className={`success-modal modal `}>
      <div className="modal-inner fade-in-up">
        <p>{text}</p>
        <button className="remove-button" onClick={() => setModal(false)}>
          Close
        </button>
      </div>
    </div>
  );
};
