import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import CustomFileUpload from '../custom-file-upload/custom-file-upload';
import CustomTextInput from '../custom-text-input/custom-text-input';
import './chat-input.scss';

export const ChatInput = () => {
  return (
    <div className="chat-input-container">
      <CustomFileUpload
        className=""
        imageURL={null}
        hasErrors={null}
        errorMessage={null}
        handleFileUpload={null}
        fieldName="imageFile"
      />
      <CustomTextInput
        title=""
        fieldName="description"
        value=""
        onChange={null}
        hasErrors={null}
        errorMessage={null}
        svgIcon={<FontAwesomeIcon icon={faPaperPlane} className="send-icon" />}
      />
    </div>
  );
};

export default ChatInput;
