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
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      value: any,
      shouldValidate?: boolean
    ) => Promise<void> | Promise<FormikErrors<IChatForm>>;
  };
  image?: string;
  handleFileUpload?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCloseImage?: MouseEventHandler<HTMLImageElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export const ChatInput = ({
  formik,
  image,
  handleFileUpload,
  handleCloseImage,
  onFocus,
  onBlur,
}: ChatInputProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const lastKeyEventRef = useRef<KeyboardEvent>();

  const onKeyDown = (e: KeyboardEvent) => {
    lastKeyEventRef.current = e;
  };

  useEffect(() => {
    const localInputRef = inputRef.current;
    inputRef.current.addEventListener('keydown', onKeyDown);

    return () => {
      localInputRef.removeEventListener('keydown', onKeyDown);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="chat-input-container">
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
          onInput={(e) => {
            const target = e.target as HTMLDivElement;

            formik.setFieldValue('message', (e.target as HTMLDivElement).textContent);

            // User tried to submit form
            if (lastKeyEventRef.current.key === 'Enter' && !lastKeyEventRef.current.shiftKey) {
              target.textContent = '';
              formik.submitForm();
            }
          }}
          onFocus={onFocus}
          onBlur={onBlur}
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
