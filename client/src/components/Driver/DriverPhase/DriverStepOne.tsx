import React from 'react';

interface Props {
  onOrderClickZoom: (dest: [number, number]) => void;
  onAcceptClick: (dest: [number, number]) => void;
}

export const DriverStepOne: React.FC<Props> = ({ onOrderClickZoom, onAcceptClick }) => {
  return (
    <div className="order-container">
      <div className="order-item">
        <div>
          <p>Earning: $5.00</p>
          <p>Distance to Store: 2 mile</p>
          <p>Store To Customer: 2mil</p>
        </div>
        <div className="button-container">
          <button className="preview-button" onClick={() => onOrderClickZoom([42.9993828, -78.8243875])}>
            Preview
          </button>
          <button
            onClick={() => {
              onAcceptClick([42.9993828, -78.8243875]);
            }}
          >
            Accept
          </button>
        </div>
      </div>
      <div className="order-item">
        <div>
          <p>Earning: $5.00</p>
          <p>Distance to Store: 2 mile</p>
          <p>Store To Customer: 2mil</p>
        </div>
        <div className="button-container">
          <button className="preview-button" onClick={() => onOrderClickZoom([42.9993828, -78.8243875])}>
            Preview
          </button>
          <button
            onClick={() => {
              onAcceptClick([42.9993828, -78.8243875]);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
