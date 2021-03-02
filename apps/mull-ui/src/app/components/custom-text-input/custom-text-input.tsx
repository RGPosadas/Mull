import React, { ChangeEvent, ReactNode } from 'react';
import './custom-text-input.scss';

export interface CustomTextInputProps {
  title: string;
  value: string;
  fieldName: string;
  errorMessage: string;
  hasErrors: boolean;
  svgIcon?: ReactNode;
  password?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  placeholder?: string;
}

/**
 * This component renders a text input with a label. It supports validations
 * based on the values of hasErrors and errorMessage.
 * @param {string} title Label of the input
 * @param {string} value
 * @param {string} fieldName String to identify input
 * @param {boolean} hasErrors
 * @param {string} errorMessage
 * @param {ReactNode} svgIcon The svg in the text input
 * @param {(event: ChangeEvent<HTMLInputElement>) => void} onChange Handler for when text is changed
 * @param {(event: ChangeEvent<MouseEventHandler>) => void} onClick Handler for when input is clicked
 * @param {boolean} readOnly Text inside input cannot be editted
 */
export const CustomTextInput = ({
  title,
  value,
  fieldName,
  onChange,
  hasErrors,
  errorMessage,
  svgIcon,
  password,
  onClick,
  readOnly,
  placeholder,
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
        type={password ? 'password' : 'text'}
        value={value}
        onChange={onChange}
        onClick={onClick}
        readOnly={readOnly}
        placeholder={placeholder}
      />
      {svgIcon ? svgIcon : null}
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

export default CustomTextInput;
