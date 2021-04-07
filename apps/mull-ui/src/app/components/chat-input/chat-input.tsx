import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChatForm } from '@mull/types';
import { FormikContextType } from 'formik';
import React, { ChangeEvent, MouseEventHandler } from 'react';
import CustomFileUpload from '../custom-file-upload/custom-file-upload';
import MullTextArea from '../mull-text-area/mull-text-area';
import './chat-input.scss';

export interface ChatInputProps {
  formik: FormikContextType<IChatForm> & {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void>;
  };
  image?: string;
  handleFileUpload?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCloseImage?: MouseEventHandler<HTMLImageElement>;
}

export const ChatInput = ({
  formik,
  image,
  handleFileUpload,
  handleCloseImage,
}: ChatInputProps) => {
  return (
    <div className="chat-input-container">
      {(formik.touched.imageFile && !!formik.errors.imageFile) ||
      (formik.touched.message && !!formik.errors.message) ? (
        <span className="error-message">
          {`${formik.errors.message ? formik.errors.message : ''} ${
            formik.errors.imageFile ? formik.errors.imageFile : ''
          }`}
        </span>
      ) : null}
      <form
        className="chat-input-form"
        onSubmit={formik.handleSubmit}
        data-testid="chat-input"
        autoComplete="off"
      >
        {image && (
          <img className="chat-input-image" src={image} alt="" onClick={handleCloseImage} />
        )}
        <CustomFileUpload
          className="file-upload-feedback"
          imageURL={null}
          hasErrors={null}
          errorMessage={null}
          handleFileUpload={handleFileUpload}
          fieldName="imageFile"
        />

        <MullTextArea
          title=""
          fieldName="message"
          onChange={(e) => {
            formik.setFieldValue('message', e.target.textContent);
            console.log(e.target.textContent);
          }}
          hasErrors={null}
          errorMessage={null}
          autoComplete="off"
          svgIcon={
            <button type="submit" className="chat-input-button">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          }
        />
      </form>
    </div>
  );
};

export default ChatInput;
