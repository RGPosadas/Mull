import React, { useState } from 'react';
import { PillOptions } from '@mull/ui-lib';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import DateCalendar from '../create-event/date-calendar/date-calendar';

import './create-event.scss';

/* eslint-disable-next-line */
export interface CreateEventProps {}

const CreateEventPage = () => {
  const formik = useFormik({
    initialValues: {
      activeRestriction: 0,
      startDate: new Date(),
      endDate: new Date(),
      startTime: '',
      endTime: '',
      eventTitle: '',
      description: '',
      location: '',
    },

    validationSchema: Yup.object({
      startDate: Yup.date(),
      endDate: Yup.date(),
      startTime: Yup.string(),
      endTime: Yup.string(),
      eventTitle: Yup.string()
        .required('Event Title is required.')
        .length(65, 'Event Title length must be under 65 characters.'),
      activeRestriction: Yup.number().min(0).max(2),
      description: Yup.string()
        .required('Event Description is required.')
        .length(5000, 'Event Description must be under 5000 characters'),
      location: Yup.string().required('Event Location is required.'),
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [imageFile, setImageFile] = useState(null);

  const handleFileUpload = (event) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleRestrictions = (idx) => {
    formik.setFieldValue('activeRestriction', idx);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="create-event page-container">
        <p className="create-event-text">Create Event</p>
        <label htmlFor="imageFile" className="custom-file-upload event-input-border">
          {imageFile ? (
            <img src={imageFile} style={{ width: '50%', height: '50%' }} alt="sup" />
          ) : (
            '🧼'
          )}
        </label>
        <input
          className="event-image-upload"
          id="imageFile"
          type="file"
          onChange={handleFileUpload}
        />
        <DateCalendar
          startDate={formik.values.startDate}
          endDate={formik.values.endDate}
          onStartDateChange={(date) => {
            formik.setFieldValue('startDate', date);
          }}
          onEndDateChange={(date) => {
            formik.setFieldValue('endDate', date);
          }}
        />
        <div className="time-picker">
          <label className="create-event-label">Start Time</label>
          <input
            type="time"
            className="event-time"
            id="startTime"
            name="startTime"
            value={formik.values.startTime}
            onChange={formik.handleChange}
          />
        </div>
        <div className="time-picker">
          <label className="create-event-label">End Time</label>
          <input
            type="time"
            className="event-time"
            id="endTime"
            name="endTime"
            value={formik.values.endTime}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label className="create-event-label" htmlFor="eventTitle">
            Event Title
          </label>
          <input
            className="create-event-input event-input-border"
            id="eventTitle"
            name="eventTitle"
            type="text"
            value={formik.values.eventTitle}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label className="create-event-label" htmlFor="description">
            Description
          </label>
          <input
            className="create-event-input event-input-border"
            id="description"
            name="description"
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label className="create-event-label" htmlFor="location">
            Location
          </label>
          <input
            className="create-event-input event-input-border"
            id="location"
            name="location"
            type="text"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
        </div>
        <PillOptions
          options={['Everyone', 'Friends', 'Invite Only']}
          onChange={handleRestrictions}
          active={formik.values.activeRestriction}
        />
        <button type="submit" className="create-event-button">
          create +
        </button>
      </div>
    </form>
  );
};

export default CreateEventPage;
