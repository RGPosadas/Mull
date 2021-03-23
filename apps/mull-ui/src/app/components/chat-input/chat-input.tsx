import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChatForm } from '@mull/types';
import { FormikContextType } from 'formik';
import React, { ChangeEvent, MouseEventHandler } from 'react';
import CustomFileUpload from '../custom-file-upload/custom-file-upload';
import CustomTextInput from '../custom-text-input/custom-text-input';
import './chat-input.scss';

export interface ChatInputProps {
  formik: FormikContextType<IChatForm>;
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
    <form onSubmit={formik.handleSubmit} className="chat-input-container" data-testid="chat-input">
      {image && <img className="image-size" src={image} alt="" onClick={handleCloseImage} />}
      <CustomFileUpload
        className="file-upload-feedback"
        imageURL={null}
        hasErrors={null}
        errorMessage={null}
        handleFileUpload={handleFileUpload}
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
