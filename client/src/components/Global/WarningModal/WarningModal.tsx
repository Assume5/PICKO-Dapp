import React from 'react';
interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}
export const WarningModal: React.FC<Props> = ({ modalOpen, setModalOpen, text, setConfirm }) => {
  const onConfirmClick = () => {
    setModalOpen(false);
    setConfirm(true);
  };
  return (
    <div className={`warning-modal modal ${modalOpen && 'visible'}`}>
      <div className="modal-inner">
        <p>{text}</p>
        <button className="remove-button" onClick={() => setModalOpen(!modalOpen)}>
          Cancel
        </button>
        <button className="confirm-button" onClick={() => onConfirmClick()}>
          Confirm
        </button>
      </div>
    </div>
  );
};
