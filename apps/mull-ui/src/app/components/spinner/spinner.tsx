import React from 'react';
import './spinner.scss';

export interface SpinnerProps {
  size?: string;
}

export const Spinner = ({ size = '3.125rem' }: SpinnerProps) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container" style={{ width: size, height: size }} />
    </div>
  );
};

export default Spinner;
