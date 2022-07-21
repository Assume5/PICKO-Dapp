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
import { WarningModal } from '../../../Global/WarningModal/WarningModal';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  menuItem: StoreMenus | undefined;
  menuName: string;
  isUpdate?: boolean;
}

export const MenuModal: React.FC<Props> = ({ showModal, setShowModal, menuItem, menuName, isUpdate }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState(false);
  const [onRemoveConfirm, setonRemoveConfirm] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [warningText, setWarningText] = useState('');

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

  useEffect(() => {
    if (onRemoveConfirm) {
      addMenuItem();
    }
  }, [onRemoveConfirm]);

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

  const removeAllMenuItems = async () => {
    const guest = Cookies.get('guest_cookie');
    const endpoint = `${serverUrl}/cart/remove-all${guest ? `/guest/${guest}` : ''}`;
    const res = await fetch(endpoint, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    });

    const response = await res.json();

    if (response.error) {
      console.error(response.error);
    }
  };

  const addMenuItem = async () => {
    if (!menuItem) return;

    if (!cartCtx.cart) return;

    if (restaurantId && cartCtx.cart.restaurantID && restaurantId !== cartCtx.cart.restaurantID && onRemoveConfirm) {
      await removeAllMenuItems();
    } else if (
      restaurantId &&
      cartCtx.cart.restaurantID &&
      restaurantId !== cartCtx.cart.restaurantID &&
      !onRemoveConfirm
    ) {
      const text = `Your already has order from ${cartCtx.cart.restaurantName}, do you want to remove the order from ${cartCtx.cart.restaurantName}?`;
      setWarningText(text);
      setWarningModal(true);
      return;
    }

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
        const home = getCookie('address_details').home;

        const addedItem: CartItem = {
          menu_id: id,
          count: quantity,
          menu_name: menu_name,
          price: price,
        };
        if (cart.isCartEmpty) {
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
          if (onRemoveConfirm) {
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
        }

        cartCtx.setCart(cart);
        setShowModal(false);
      }
    }
    setonRemoveConfirm(false);
  };

  const removeMenuItem = async (menuId: number) => {
    const guest = Cookies.get('guest_cookie');
    const endpoint = `${serverUrl}/cart${guest ? `/guest/${guest}` : ''}/${menuId}`;
    const res = await fetch(endpoint, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    });

    const response = await res.json();

    if (response.error) {
      console.error(response.error);
      return;
    }

    const cart = cartCtx.cart;

    if (cart?.cartItems?.length === 1) {
      cartCtx.setCart({ isCartEmpty: true });
    } else {
      const update = cart!.cartItems!.filter((item) => item.menu_id !== menuId);
      cart!.cartItems = update;
      cartCtx.setCart(cart);
    }

    setShowModal(false);
  };

  return (
    <>
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
                      {isUpdate ? (
                        <button onClick={() => addMenuItem()}>Update Cart - ${menuItem.price}</button>
                      ) : (
                        <button onClick={() => addMenuItem()}>Add to cart - ${menuItem.price}</button>
                      )}
                    </div>
                    {isUpdate && (
                      <button className="remove-button" onClick={() => removeMenuItem(menuItem.id)}>
                        Remove Menu
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <AddressSearch setChangeSuccess={setAddress} />
              )}
            </div>
          </>
        )}
      </div>
      <WarningModal
        modalOpen={warningModal}
        setModalOpen={setWarningModal}
        setConfirm={setonRemoveConfirm}
        text={warningText}
      />
    </>
  );
};
