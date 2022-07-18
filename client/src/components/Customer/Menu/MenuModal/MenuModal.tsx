import React, { useContext, useEffect, useState } from 'react';
import { Cart, CartItem, StoreMenus } from '@src/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { AddressSearch } from '../../AddressSearch/AddressSearch';
import { getCookie } from '@src/helpers';
import Cookies from 'js-cookie';
import { serverUrl } from '../../../../utils/constants';
import { CartContext } from '../../../../contexts';
import { useParams } from 'react-router-dom';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  menuItem: StoreMenus | undefined;
  menuName: string;
}

export const MenuModal: React.FC<Props> = ({ showModal, setShowModal, menuItem, menuName }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState(false);
  const cartCtx = useContext(CartContext);
  const { restaurantId, restaurantName } = useParams();

  useEffect(() => {
    const checkAddress = async () => {
      if (getCookie('address_details')) {
        setAddress(true);
      }
    };

    const checkExists = () => {
      if (cartCtx.cart && menuItem) {
        const existsItems = cartCtx.cart.cartItems;
        const { id } = menuItem;
        const found = existsItems?.find((item) => item.menu_id === id);
        if (found) {
          const existCount = found.count;
          setQuantity(existCount);
        } else {
          setQuantity(1);
        }
      }
    };

    checkAddress();
    checkExists();
  }, [cartCtx, showModal]);

  const onCloseButtonClick = () => {
    setShowModal(false);
    setQuantity(1);
    const body = document.getElementsByTagName('body')[0];
    if (body) {
      body.style.overflow = 'auto';
    }
  };

  const updateMenuItem = async () => {
    if (!menuItem) return;
    if (!cartCtx.cart) return;

    console.log(quantity);

    const guest = Cookies.get('guest_cookie');
    const endpoint = `${serverUrl}/cart${guest ? `/guest/${guest}` : ''}`;
    const { id } = menuItem;
    const count = quantity;
    const res = await fetch(endpoint, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        menuId: id,
        count,
        guestId: guest,
      }),
    });
    console.log(res);
    const response = await res.json();

    if (response.error) {
      console.error(response.error);
      return;
    }

    if (response.success) {
      const cart = cartCtx.cart;
      const existsItems = cart.cartItems;
      const update = existsItems?.map((item) => {
        if (item.menu_id === id) {
          return { ...item, count: quantity };
        }

        return item;
      });
      cart.cartItems = update;

      cartCtx.setCart(cart);
      setShowModal(false);
    }
  };

  const addMenuItem = async () => {
    if (!menuItem) return;

    //check if already exists in cartContext if yes method should be put, else POST
    if (!cartCtx.cart) return;

    const { id, price, menu_name } = menuItem;
    const existsItems = cartCtx.cart.cartItems;
    const found = existsItems?.find((item) => item.menu_id === id);

    if (found) {
      updateMenuItem();
    } else {
      const count = quantity;
      const guest = Cookies.get('guest_cookie');
      const endpoint = `${serverUrl}/cart${guest ? `/guest/${guest}` : ''}`;

      const res = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menuId: id,
          price,
          menu_name,
          count,
          restaurantId,
          guestId: guest,
        }),
      });

      const response = await res.json();

      if (response.error) {
        console.error(response.error);
        return;
      }

      if (response.success) {
        let cart = cartCtx.cart;
        const addedItem: CartItem = {
          menu_id: id,
          count: quantity,
          menu_name: menu_name,
          price: price,
        };
        if (cart.isCartEmpty) {
          const home = getCookie('address_details').home;

          const update: Cart = {
            isCartEmpty: false,
            deliveryAddress: home,
            restaurantID: restaurantId,
            restaurantName: restaurantName!
              .split('-')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' '),
            cartItems: [addedItem],
          };

          cart = update;
        } else {
          cart.cartItems?.push(addedItem);
        }

        cartCtx.setCart(cart);
        setShowModal(false);
      }
    }
  };

  return (
    <div className={`menu-modal ${showModal ? 'visible' : 'hidden'}`}>
      {menuItem && (
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
                    <button onClick={() => addMenuItem()}>Add to cart - ${menuItem.price}</button>
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
