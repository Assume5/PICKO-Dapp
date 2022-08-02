import React, { useEffect, useState } from 'react';
import { faTasks, faExclamationCircle, faHistory, faDolly } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NewOrders } from './NewOrders/NewOrders';
import { InProgressOrders } from './InProgressOrders/InProgressOrders';
import { ReadyForPickUp } from './ReadyForPickUp/ReadyForPickUp';
import { OrderHistory } from './OrderHistory/OrderHistory';
import { OrderDetailModal } from '../OrderDetailModal/OrderDetailModal';
import { OwnerOrderDetails } from '../../../types';

interface Props {
  orders: OwnerOrderDetails[];
  setOrders: React.Dispatch<React.SetStateAction<OwnerOrderDetails[] | null>>;
}

export const OrderPanel: React.FC<Props> = ({ orders, setOrders }) => {
  const [activeController, setActiveController] = useState('new-orders');
  const [orderModal, setOrderModal] = useState(false);
  const [details, setDetails] = useState<OwnerOrderDetails | null>(null);

  return (
    <>
      <div className="order-panel">
        <div className="controller">
          <div
            className={`icon-container ${activeController === 'new-orders' && 'active'}`}
            onClick={() => setActiveController('new-orders')}
          >
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
          <div
            className={`icon-container ${activeController === 'in-progress-orders' && 'active'}`}
            onClick={() => setActiveController('in-progress-orders')}
          >
            <FontAwesomeIcon icon={faTasks} />
          </div>
          <div
            className={`icon-container ${activeController === 'ready-for-pickup-orders' && 'active'}`}
            onClick={() => setActiveController('ready-for-pickup-orders')}
          >
            <FontAwesomeIcon icon={faDolly} />
          </div>
          <div
            className={`icon-container ${activeController === 'order-history' && 'active'}`}
            onClick={() => setActiveController('order-history')}
          >
            <FontAwesomeIcon icon={faHistory} />
          </div>
        </div>
        <div className="content">
          {activeController === 'new-orders' && (
            <NewOrders setOrderModal={setOrderModal} setDetails={setDetails} orders={orders} />
          )}
          {activeController === 'in-progress-orders' && (
            <InProgressOrders setOrderModal={setOrderModal} setDetails={setDetails} orders={orders} />
          )}
          {activeController === 'ready-for-pickup-orders' && (
            <ReadyForPickUp setOrderModal={setOrderModal} setDetails={setDetails} orders={orders} />
          )}
          {activeController === 'order-history' && (
            <OrderHistory setOrderModal={setOrderModal} setDetails={setDetails} orders={orders} />
          )}
        </div>
      </div>
      {orderModal && details && (
        <OrderDetailModal setOrderModal={setOrderModal} details={details} orders={orders} setOrders={setOrders} />
      )}
    </>
  );
};
