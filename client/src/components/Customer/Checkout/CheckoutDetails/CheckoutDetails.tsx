import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../../contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faTimes } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../../../../utils/constants';
import { Cart, StoreMenus } from '../../../../types';
import { MenuModal } from '../../Menu/MenuModal/MenuModal';
import { AddressSearch } from '../../AddressSearch/AddressSearch';
import { getCookie } from '../../../../utils/functions';

type contextType = {
  cart: Cart | undefined;
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
};
interface Props {
  cartCtx: contextType;
  setAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CheckoutDetails: React.FC<Props> = ({ cartCtx, setAddressModal }) => {
  const navigate = useNavigate();
  if (!cartCtx) return null;
  const cart = cartCtx.cart;
  const [showModal, setShowModal] = useState(false);
  const [menuItem, setMenuItem] = useState<StoreMenus>();
  const [address, setAddress] = useState(false);

  const onMenuClick = async (menuId: number) => {
    const res = await fetch(`${serverUrl}/menus/${menuId}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    const response = await res.json();

    if (response.error) {
      console.error(response.error);
    }

    if (response.success) {
      const data: StoreMenus = response.data;
      setMenuItem(data);
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (!address || !cart) return;
    const home = getCookie('address_details').home;
    cartCtx.setCart({ ...cart, deliveryAddress: home });
    setAddressModal(false);
  }, [address]);

  return (
    <>
      <div className="checkout-details">
        <h2 className="link">{cart?.restaurantName}</h2>
        <p className="address">
          <div>
            <FontAwesomeIcon icon={faLocationArrow} />
            {cart?.deliveryAddress}
          </div>

          <button onClick={() => setAddressModal(true)}>Edit</button>
        </p>

        <p>
          Delivery Estimate Time: <strong>30 Mins</strong>
        </p>

        <div className="order-items">
          {cart?.cartItems?.map((item) => {
            return (
              <div key={item.menu_id} className="order-item" onClick={() => onMenuClick(item.menu_id)}>
                <p className="item-quantity">{item.count}</p>
                <p>{item.menu_name}</p>
                <p className="price">${item.price}</p>
              </div>
            );
          })}
        </div>
      </div>
      {menuItem && (
        <MenuModal
          showModal={showModal}
          setShowModal={setShowModal}
          menuItem={menuItem}
          menuName={menuItem.menu_name}
          isUpdate={true}
        />
      )}
    </>
  );
};
