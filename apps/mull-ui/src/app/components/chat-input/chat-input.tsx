import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChatForm, LIMITS } from '@mull/types';
import { FormikContextType, FormikErrors } from 'formik';
import React, { ChangeEvent, MouseEventHandler, useEffect, useRef } from 'react';
import CustomFileUpload from '../custom-file-upload/custom-file-upload';
import MullTextArea from '../mull-text-area/mull-text-area';
import './chat-input.scss';

export interface ChatInputProps {
  formik: FormikContextType<IChatForm> & {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => Promise<void> | Promise<FormikErrors<IChatForm>>;
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
  const inputRef = useRef<HTMLDivElement>(null);

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.code == 'Enter' && !e.shiftKey) {
      formik.submitForm();
      setTimeout(() => {
        inputRef.current.innerText = '';
      }, 100);
    }
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.current.addEventListener('keydown', onKeyPress);
    }
    return () => {
      inputRef.current.removeEventListener('keydown', onKeyPress);
    };
  }, []);

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
          inputRef={inputRef}
          title=""
          fieldName="message"
          onChange={(e) => {
            formik.setFieldValue('message', e.target.textContent);
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
        {LIMITS.POST_MESSAGE - formik.values.message.length < 100 ? (
          <div className="chat-input-limit-message">
            {LIMITS.POST_MESSAGE - formik.values.message.length}/{LIMITS.POST_MESSAGE}
          </div>
        ) : null}{' '}
      </form>
    </div>
  );
};

export default ChatInput;
