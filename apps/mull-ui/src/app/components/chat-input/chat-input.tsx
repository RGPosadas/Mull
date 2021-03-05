import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChatForm } from '@mull/types';
import { FormikContextType } from 'formik';
import React from 'react';
import CustomFileUpload from '../custom-file-upload/custom-file-upload';
import CustomTextInput from '../custom-text-input/custom-text-input';
import './chat-input.scss';

export interface ChatInputProps {
  formik: FormikContextType<IChatForm>;
}

export const ChatInput = ({ formik }: ChatInputProps) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="chat-input-container"
      data-testid="announcement-chat-input"
    >
      {/* TODO: Handle Image upload back-end */}
      <CustomFileUpload
        className="file-upload-feedback"
        imageURL={null}
        hasErrors={null}
        errorMessage={null}
        handleFileUpload={null}
        fieldName="imageFile"
      />
      <CustomTextInput
        title=""
        fieldName="message"
        value={formik.values.message}
        onChange={formik.handleChange}
        hasErrors={null}
        errorMessage={null}
        svgIcon={
          <button type="submit" className="chat-input-button">
            <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
          </button>
        }
      />
    </form>
  );
};

export default ChatInput;
