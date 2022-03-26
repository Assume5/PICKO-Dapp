import React, { useEffect, useState } from 'react';
import { MenuChoice, MenuItem } from '../../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  menuItem: MenuItem | undefined;
  globalChoices: MenuChoice;
  menuName: string;
}

export const MenuModal: React.FC<Props> = ({ showModal, setShowModal, menuItem, globalChoices, menuName }) => {
  const [choices, setChoices] = useState<MenuChoice>();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (menuItem && typeof menuItem === 'object') {
      setChoices(menuItem['choices']);
    }
  }, [menuItem, choices]);

  const onCloseButtonClick = () => {
    setShowModal(false);
    setChoices(undefined)
    setQuantity(1)
    const body = document.getElementsByTagName('body')[0];
    if (body) {
      body.style.overflow = 'auto';
    }
  };

  return (
    <div className={`menu-modal ${showModal ? 'visible' : 'hidden'}`}>
      {menuItem && typeof menuItem === 'object' && (
        <>
          <div className="modal-inner">
            <div className="close-button">
              <FontAwesomeIcon icon={faTimes} onClick={onCloseButtonClick} className="close-button" />
            </div>
            <h2>{menuName}</h2>
            <p>{menuItem.description}</p>
            <img src={menuItem.image} alt="" />
            <div className="add-to-cart">
              <div className="quantity">
                <FontAwesomeIcon icon={faMinus} onClick={() => quantity > 1 && setQuantity(quantity - 1)} />
                <p>{quantity}</p>
                <FontAwesomeIcon icon={faPlus} onClick={() => setQuantity(quantity + 1)} />
              </div>
              <div className="add-to-cart-button">
                <button>Add to cart - {menuItem.price} ETH</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
