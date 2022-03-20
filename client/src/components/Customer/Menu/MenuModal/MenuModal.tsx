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

  const onCheckBoxClick = (key: string, choiceKey: string, currentState: boolean) => {
    if (choices) {
      const prev = { ...choices };
      prev.choice[key]['choices'][choiceKey].check = !currentState;
      setChoices(prev);
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
            {/* {choices &&
              Object.keys(choices.choice).map((key) => {
                const menuChoice = menuItem.choices['choice'][key];
                return (
                  <div className="choice">
                    <div className="choice-title">
                      <h4>{key}</h4>
                      <p>{menuChoice.required ? 'Required' : 'Optional'}</p>
                    </div>
                    {Object.keys(menuChoice.choices).map((choiceKey) => {
                      return (
                        <div
                          className="choice-item"
                          onClick={() => onCheckBoxClick(key, choiceKey, menuChoice.choices[choiceKey]['check'])}
                        >
                          <input type={'checkbox'} checked={menuChoice.choices[choiceKey]['check']} />
                          <span>{choiceKey}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })} */}
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
