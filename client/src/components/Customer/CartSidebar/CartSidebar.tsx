import React, { useContext, useState } from 'react';
import { Cart, StoreMenus } from '@src/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../../utils/constants';
import { MenuModal } from '../Menu/MenuModal/MenuModal';
import { AuthModal } from '../AuthModal/AuthModal';
import { UserContext } from '../../../contexts';

interface Props {
  cart: Cart;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
}

export const CartSidebar: React.FC<Props> = ({ cart, setSidebarOpen, sidebarOpen }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('checkout');
  const [tip, setTip] = useState(0.0);
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [menuItem, setMenuItem] = useState<StoreMenus>();
  const [authModal, setAuthModal] = useState(false);
  const [authState, setAuthState] = useState('login');
  const userCtx = useContext(UserContext);

  const onRestaurantCardClick = (key: string, id: string) => {
    const keyWithDash = key.trim().replaceAll(' ', '-').toLowerCase();
    navigate(`/restaurant/${keyWithDash}/${id}`);
    setSidebarOpen(false);
  };

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

  const onCheckOutClick = () => {
    if (!userCtx.user.login) {
      setAuthModal(true);
    }
  };

  return (
    <>
      <div className={`side-bar ${cart.isCartEmpty && 'empty'}`}>
        <div
          className="close-button"
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
            setStep('checkout');
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        {cart.isCartEmpty ? (
          <div className="empty">
            <FontAwesomeIcon icon={faCartArrowDown} />
            <h3>Your Cart is Empty</h3>
          </div>
        ) : (
          <div className="cart-content">
            <h2 onClick={() => onRestaurantCardClick(cart.restaurantName!, cart.restaurantID!)}>
              {cart.restaurantName}
            </h2>
            <p className="delivery-to">Delivery to {cart.deliveryAddress}</p>
            {cart.cartItems!.map((item) => {
              return (
                <div
                  className="cart-item"
                  key={item.menu_name}
                  data-id={item.menu_id}
                  onClick={() => onMenuClick(item.menu_id)}
                >
                  <div className="item-quantity">
                    <p>{item.count}</p>
                  </div>
                  <div className="item-desc">
                    <h3>{item.menu_name}</h3>
                    <p>$ {item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!cart.isCartEmpty && (
          <div className="checkout-button">
            <button onClick={() => onCheckOutClick()}>Checkout</button>
          </div>
        )}
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
      {authModal && <AuthModal authState={authState} setAuthState={setAuthState} setAuthModal={setAuthModal} />}
    </>
  );
};
