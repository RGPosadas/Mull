import React from 'react';
import './pill-options.scss';

export interface PillOptionsProps {
  options: string[];
  onChange: (idx: number) => void;
  active: number;
}
/**
 * This component renders a selectable menu where the user can select one out of many options.
 *
 * @param {string[]} options The string values of the pill options
 * @param {(idx: number) => void} onChange Handler for when the pill option has changed
 * @param {number} active The pill option that is currently selected
 */
export const PillOptions = ({ options, onChange, active }: PillOptionsProps) => {
  return (
      <label className="custom-text-input-label" htmlFor={'description'}>
    <div className="pill-options-container">
        Restriction
      </label>
    <div className="pill-options">
      {options.map((option, idx) => (
        <button
          data-testid={`pill-id-${idx}`}
          key={option}
          type="button"
          className={`pill-option ${
            active === idx ? `pill-option-active` : 'pill-option-inactive'
          }`}
          onClick={() => {
            onChange(idx);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default PillOptions;
