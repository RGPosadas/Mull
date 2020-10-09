import React, { useState } from 'react';
import { PillOptions } from '@mull/ui-lib';

import './create-event.scss';

/* eslint-disable-next-line */
export interface CreateEventProps {}

const CreateEventPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [activeRestriction, setActiveRestriction] = useState(null);

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleRestrictions = (idx) => {
    setActiveRestriction(idx);
  };

  return (
    <div className="create-event">
      <p className="create-event-text">Create Event</p>
      <label htmlFor="file-upload" className="custom-file-upload event-input-border">
        {imageFile ? (
          <img src={imageFile} style={{ width: '50%', height: '50%' }} alt="sup" />
        ) : (
          '🧼'
        )}
      </label>
      <input
        className="event-image-upload"
        onChange={handleFileUpload}
        id="file-upload"
        type="file"
      />
      <div>
        <label className="create-event-label" htmlFor="event-title">
          Event Title
        </label>
        <input className="create-event-input event-input-border" id="event-title" type="text" />
      </div>
      <div>
        <label className="create-event-label" htmlFor="description">
          Description
        </label>
        <input className="create-event-input event-input-border" id="description" type="text" />
      </div>
      <div>
        <label className="create-event-label" htmlFor="location">
          Location
        </label>
        <input className="create-event-input event-input-border" id="location" type="text" />
      </div>
      <PillOptions
        options={['Everyone', 'Friends', 'Invite Only']}
        onChange={handleRestrictions}
        active={activeRestriction}
      />
      <button className="create-event-button">create +</button>
    </div>
  );
};

export default CreateEventPage;
