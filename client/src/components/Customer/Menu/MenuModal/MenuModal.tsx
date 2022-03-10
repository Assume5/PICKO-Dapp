import React from 'react';
import { MenuChoice, MenuItem } from '../../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  menuItem: MenuItem | undefined;
  globalChoices: MenuChoice;
  menuName: string;
}

export const MenuModal: React.FC<Props> = ({ showModal, setShowModal, menuItem, globalChoices, menuName }) => {
  if (showModal && menuItem && typeof menuItem === 'object') {
    console.log(menuItem, globalChoices);

    return (
      <div className="menu-modal">
        <FontAwesomeIcon icon={faTimes} />
        <div className="modal-inner">
          <h2>{menuName}</h2>
          <img src={menuItem.image} alt="" />
          {menuItem.choices.choice &&
            Object.keys(menuItem.choices.choice).map((key) => {
              const menuChoice = menuItem.choices['choice'][key]
              console.log(menuChoice);
            })}
        </div>
      </div>
    );
  }
  return <></>;
};
