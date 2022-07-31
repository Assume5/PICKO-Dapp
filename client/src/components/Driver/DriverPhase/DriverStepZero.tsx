import React from 'react';

interface Props {
  updateStatus: (status: string) => void;
}

export const DriverStepZero: React.FC<Props> = ({ updateStatus }) => {
  return (
    <>
      <div className="start-close-button-container">
        <button
          className="start-button map-button"
          onClick={() => {
            updateStatus('1');
          }}
        >
          Start
        </button>
      </div>

      <div className="bottom-status-container">You are Offline</div>
    </>
  );
};
