import React, { useState } from 'react';

import './pill-options.scss';

/* eslint-disable-next-line */
export interface PillOptionsProps {
  options: string[];
  onChange: (idx: number) => void;
  active: number;
}

export const PillOptions = ({ options, onChange, active }: PillOptionsProps) => {
  return (
    <div className="create-event-restriction">
      {options.map((option, idx) => (
        <div
          key={option}
          className={`restriction-option ${active === idx ? `active` : ''}`}
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
