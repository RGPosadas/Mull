import React, { useState } from 'react';
import SimpleReactCalendar from 'simple-react-calendar';

import './create-event.styles.scss';

const CreateEventPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="create-event">
      <p className="create-event-text">Create Event</p>
      <label htmlFor="file-upload" className="custom-file-upload">
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
      <label className="create-event-label" htmlFor="event-title">
        Event Title
      </label>
      <input className="create-event-input" id="event-title" type="text" />

      <label className="create-event-label" htmlFor="description">
        Description
      </label>
      <input className="create-event-input" id="description" type="text" />

      <label className="create-event-label" htmlFor="location">
        Location
      </label>
      <input className="create-event-input" id="location" type="text" />

      <button className="create-event-button">create +</button>
    </div>
  );
};

export default CreateEventPage;
