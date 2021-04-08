import React, { ReactNode, useRef } from 'react';
import './mull-text-area.scss';

export interface MullTextAreaProps {
  inputRef?: React.MutableRefObject<HTMLDivElement>;
  title: string;
  fieldName: string;
  errorMessage?: string;
  hasErrors?: boolean;
  svgIcon?: ReactNode;
  onInput?: React.FormEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  placeholder?: string;
}

export function MullTextArea({
  inputRef,
  title,
  fieldName,
  hasErrors = false,
  errorMessage = null,
  svgIcon,
  onInput,
  onClick,
  onFocus,
  onBlur,
  placeholder,
}: MullTextAreaProps) {
  const grower = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`mull-text-area-container ${hasErrors ? 'error' : ''}`}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <label className="mull-text-area-label" htmlFor={fieldName}>
        {title}
      </label>
      <div className="mull-text-area-sub-container grow-wrap" ref={grower}>
        <div
          ref={inputRef}
          style={{ whiteSpace: 'pre-wrap' }}
          className={`mull-text-area input-border ${hasErrors ? 'error' : ''}`}
          id={fieldName}
          data-testid="mull-text-area"
          onInput={onInput}
          onClick={onClick}
          placeholder={placeholder}
          contentEditable={true}
          suppressContentEditableWarning={true}
          role="textbox"
        />
        <div className="mull-text-area-icon">{svgIcon ? svgIcon : null}</div>
      </div>
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
}

export default MullTextArea;
