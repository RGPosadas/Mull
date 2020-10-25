import React, { ChangeEvent, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { RestrictionOption } from '@mull/types';
import { PillOptions, CustomTextInput } from '@mull/ui-lib';
import DateCalendar from '../create-event/date-calendar/date-calendar';
import { toast } from 'react-toastify';

import { DAY_IN_MILLISECONDS } from '../../../constants';

import './create-event.scss';

/* eslint-disable-next-line */
export interface CreateEventProps {
  history: History;
}

const CREATE_EVENT = gql`
  mutation CreateEvent($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
      id
    }
  }
`;

const CreateEventPage = ({ history }) => {
  const addTimeToDate = (time: string, date: Date) => {
    const [hour, minute] = time.split(':');
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));
  };

  const [createEvent] = useMutation(CREATE_EVENT);

  const formik = useFormik({
    initialValues: {
      activeRestriction: RestrictionOption.NONE,
      startDate: null,
      endDate: null,
      startTime: '',
      endTime: '',
      eventTitle: '',
      description: '',
      location: '',
    },

    validationSchema: Yup.object({
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date()
        .nullable()
        .required('End date is required')
        .test('maxEventLength', 'Event Length cannot be over 30 days', function (endDate) {
          const diff = Math.abs(+endDate - +this.parent.startDate);
          return diff <= 30 * DAY_IN_MILLISECONDS;
        }),
      startTime: Yup.string().required('Start Time is required'),
      endTime: Yup.string().required('End Time is required'),
      eventTitle: Yup.string()
        .required('Event Title is required.')
        .max(65, 'Event Title length must be under 65 characters.'),
      activeRestriction: Yup.number().min(0).max(2),
      description: Yup.string()
        .required('Event Description is required.')
        .max(5000, 'Event Description must be under 5000 characters'),
      location: Yup.string().required('Event Location is required.'),
    }),

    onSubmit: async (values) => {
      addTimeToDate(values.startTime, values.startDate);
      addTimeToDate(values.endTime, values.endDate);
      const payload = {
        startDate: values.startDate,
        endDate: values.endDate,
        description: values.description,
        title: values.eventTitle,
      };
      const res = await createEvent({ variables: { createEventInput: payload } });
      if (res.errors) {
        toast.error('Event Not Created', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success('Event Created', {
          position: toast.POSITION.TOP_RIGHT,
        });
        history.push('/home');
      }
    },
  });

  const [imageFile, setImageFile] = useState(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleRestrictions = (idx: number) => {
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
        {formik.touched.endDate && formik.errors.endDate ? (
          <span className="error-message">{formik.errors.endDate}</span>
        ) : null}

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
        {formik.touched.startTime && formik.errors.startTime ? (
          <span className="error-message">{formik.errors.startTime}</span>
        ) : null}
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
        {formik.touched.endTime && formik.errors.endTime ? (
          <span className="error-message">{formik.errors.endTime}</span>
        ) : null}
        <CustomTextInput
          title="Event Title"
          fieldName="eventTitle"
          value={formik.values.eventTitle}
          onChange={formik.handleChange}
          hasErrors={formik.touched.eventTitle && !!formik.errors.eventTitle}
          errorMessage={formik.errors.eventTitle}
        />
        <CustomTextInput
          title="Description"
          fieldName="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          hasErrors={formik.touched.description && !!formik.errors.description}
          errorMessage={formik.errors.description}
        />
        <CustomTextInput
          title="Location"
          fieldName="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          hasErrors={formik.touched.location && !!formik.errors.location}
          errorMessage={formik.errors.location}
        />
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
