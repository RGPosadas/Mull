import React from 'react';

import './pill-options.scss';

/* eslint-disable-next-line */
export interface PillOptionsProps {
  options: string[];
  onChange: (idx: number) => void;
  active: number;
}

export const PillOptions = ({ options, onChange, active }: PillOptionsProps) => {
  return (
    <div className="pill-options">
      {options.map((option, idx) => (
        <div
          data-testid={`pill-id-${idx}`}
          key={option}
          className={`pill-option ${active === idx ? `active` : ''}`}
          onClick={() => {
            onChange(idx);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default PillOptions;
