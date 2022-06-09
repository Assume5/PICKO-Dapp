import React, { useEffect, useState } from 'react';
import { StoreMenus } from '@src/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { AddressSearch } from '../../AddressSearch/AddressSearch';
import { getCookie } from '@src/helpers';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  menuItem: StoreMenus | undefined;
  menuName: string;
}

export const MenuModal: React.FC<Props> = ({ showModal, setShowModal, menuItem, menuName }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState(false);

  useEffect(() => {
    const checkAddress = async () => {
      if (getCookie('address_details')) {
        setAddress(true);
      }
    };

    checkAddress();
  });

  const onCloseButtonClick = () => {
    setShowModal(false);
    setQuantity(1);
    const body = document.getElementsByTagName('body')[0];
    if (body) {
      body.style.overflow = 'auto';
    }
  };

  return (
    <div className={`menu-modal ${showModal ? 'visible' : 'hidden'}`}>
      {menuItem && typeof menuItem === 'object' && (
        <>
          <div className={`modal-inner ${!address && 'address-false'}`}>
            <div className="close-button">
              <FontAwesomeIcon icon={faTimes} onClick={onCloseButtonClick} className="close-button" />
            </div>
            {address ? (
              <>
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
                    <button>Add to cart - ${menuItem.price}</button>
                  </div>
                </div>
              </>
            ) : (
              <AddressSearch setChangeSuccess={setAddress} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
