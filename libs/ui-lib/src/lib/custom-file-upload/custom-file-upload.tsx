import React, { ChangeEvent, ReactNode } from 'react';

import './custom-file-upload.scss';

export interface CustomFileUploadProps {
  hasErrors: boolean;
  errorMessage: string;
  imageURL: string;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  uploadIcon: ReactNode;
}

export const CustomFileUpload = ({
  imageURL,
  uploadIcon,
  hasErrors,
  errorMessage,
  handleFileUpload,
}: CustomFileUploadProps) => {
  return (
    <>
      <label htmlFor="imageFile" className="custom-file-upload event-input-border">
        {imageURL ? (
          <img src={imageURL} style={{ width: '50%', height: '50%' }} alt="Event" />
        ) : (
          uploadIcon
        )}
      </label>
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
      <input
        className="event-image-upload"
        id="imageFile"
        type="file"
        onChange={handleFileUpload}
        accept="image/*"
      />
    </>
  );
};

export default CustomFileUpload;
