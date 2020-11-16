import React, { ChangeEvent, ReactNode } from 'react';

import './custom-file-upload.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

export interface CustomFileUploadProps {
  hasErrors: boolean;
  errorMessage: string;
  imageURL: string;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  fieldName: string;
}

export const CustomFileUpload = ({
  imageURL,
  hasErrors,
  errorMessage,
  handleFileUpload,
  fieldName,
}: CustomFileUploadProps) => {
  return (
    <div>
      <label htmlFor="imageFile" style={{ boxSizing: 'border-box' }} className="custom-file-upload">
        {imageURL ? (
          <img
            src={imageURL}
            style={{ width: '100%', display: 'block', borderRadius: '6.5px' }}
            alt="Event"
          />
        ) : (
          <FontAwesomeIcon className="event-image-icon" icon={faImages} />
        )}
      </label>
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
      <input
        className="event-image-upload"
        id={fieldName}
        type="file"
        onChange={handleFileUpload}
        accept="image/*"
        data-testid="file"
      />
    </div>
  );
};

export default CustomFileUpload;
