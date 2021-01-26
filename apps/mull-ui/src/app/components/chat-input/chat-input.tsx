import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import CustomFileUpload from '../custom-file-upload/custom-file-upload';
import CustomTextInput from '../custom-text-input/custom-text-input';
import './chat-input.scss';

export const ChatInput = () => {
  const [chatText, setChatText] = useState<string>('');
  return (
    <form className="chat-input-container">
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
        value={chatText}
        onChange={(e) => setChatText(e.target.value)}
        hasErrors={null}
        errorMessage={null}
        svgIcon={
          <button className="chat-input-button">
            <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
          </button>
        }
      />
    </form>
  );
};

export default ChatInput;
