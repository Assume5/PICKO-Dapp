import React, { useEffect, useRef, useState } from 'react';
import {
  faTasks,
  faExclamationCircle,
  faHistory,
  faDolly,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NewOrders } from './NewOrders/NewOrders';
import { InProgressOrders } from './InProgressOrders/InProgressOrders';
import { ReadyForPickUp } from './ReadyForPickUp/ReadyForPickUp';
import { OrderHistory } from './OrderHistory/OrderHistory';

export const OrderPanel = () => {
  const [activeController, setActiveController] = useState('new-orders');

  const content = useRef<HTMLDivElement>(null);

  return (
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
      <div className="content" ref={content}>
        {activeController === 'new-orders' && <NewOrders />}
        {activeController === 'in-progress-orders' && <InProgressOrders />}
        {activeController === 'ready-for-pickup-orders' && <ReadyForPickUp />}
        {activeController === 'order-history' && <OrderHistory />}
      </div>
    </div>
  );
};
