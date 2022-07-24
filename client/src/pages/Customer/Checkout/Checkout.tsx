import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddressSearch } from '../../../components/Customer/AddressSearch/AddressSearch';
import { CheckoutDetails } from '../../../components/Customer/Checkout/CheckoutDetails/CheckoutDetails';
import { CheckoutPrice } from '../../../components/Customer/Checkout/CheckoutPrice/CheckoutPrice';
import { CustomerHeader } from '../../../components/Customer/CustomerHeader/CustomerHeader';
import { CartContext } from '../../../contexts';
import { getCookie } from '../../../utils/functions';

export const Checkout = () => {
  const cartCtx = useContext(CartContext);
  if (!cartCtx) return null;
  const [address, setAddress] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!address || !cartCtx.cart) return;
    const cart = cartCtx.cart;
    const home = getCookie('address_details').home;
    cartCtx.setCart({ ...cart, deliveryAddress: home });
    setAddressModal(false);
  }, [address]);

  return (
    <>
      <div className="checkout-page">
        <CustomerHeader />
        {cartCtx && cartCtx.cart && cartCtx.cart.cartItems && cartCtx.cart.cartItems.length ? (
          <>
            <CheckoutDetails cartCtx={cartCtx} setAddressModal={setAddressModal} />
            <CheckoutPrice cartCtx={cartCtx} address={address} />
          </>
        ) : (
          <>
            <div className="empty-checkout">
              <p>Your Cart is Empty</p>
              <button onClick={() => navigate('/')}>Return to Home</button>
            </div>
          </>
        )}
        <div className={`modal ${addressModal ? 'show' : ''}`}>
          <div className="modal-inner">
            <div className="close-button">
              <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => setAddressModal(false)} />
            </div>
            <AddressSearch setChangeSuccess={setAddress} />
          </div>
        </div>
      </div>
    </>
  );
};
