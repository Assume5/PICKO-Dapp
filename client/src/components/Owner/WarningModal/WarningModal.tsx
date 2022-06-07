import React from 'react';
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../../utils/constants';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  removeId: number;
}
export const WarningModal: React.FC<Props> = ({ modalOpen, setModalOpen, category, removeId }) => {
  const { id } = useParams();

  const onConfirmClick = async () => {
    const res = await fetch(`${serverUrl}/restaurant/menus/remove-all/${removeId}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurantId: id,
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.error(data.error);
    }

    if (data.success) {
      window.location.reload();
    }
  };

  return (
    <div className={`warning-modal modal ${modalOpen && 'visible'}`}>
      <div className="modal-inner">
        <p>
          Are you sure you want to remove, <strong>{category}</strong>?
        </p>
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
