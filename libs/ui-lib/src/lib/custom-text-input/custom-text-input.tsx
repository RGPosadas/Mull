import React, { ChangeEvent, ReactNode } from 'react';

import './custom-text-input.scss';

/* eslint-disable-next-line */
export interface CustomTextInputProps {
  title: string;
  value: string;
  fieldName: string;
  errorMessage: string;
  hasErrors: boolean;
  svgIcon: ReactNode;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomTextInput = ({
  title,
  value,
  fieldName,
  onChange,
  hasErrors,
  errorMessage,
  svgIcon,
}: CustomTextInputProps) => {
  return (
    <div className={`custom-text-input-container ${hasErrors ? 'error' : ''}`}>
      <label className="custom-text-input-label" htmlFor={fieldName}>
        {title}
      </label>
      <input
        className={`custom-text-input input-border ${hasErrors ? 'error' : ''}`}
        id={fieldName}
        name={fieldName}
        data-testid="custom-text-input"
        type="text"
        value={value}
        onChange={onChange}
      />
      {svgIcon}
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

export default CustomTextInput;
