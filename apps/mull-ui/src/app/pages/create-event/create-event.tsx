import React, { ChangeEvent, useRef, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { toast, TypeOptions } from 'react-toastify';
import * as Yup from 'yup';
import { cloneDeep } from 'lodash';
import { EventRestriction } from '@mull/types';
import { PillOptions, CustomTextInput, CustomTimePicker } from '@mull/ui-lib';
import DateCalendar from '../create-event/date-calendar/date-calendar';

import { DAY_IN_MILLISECONDS } from '../../../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignLeft,
  faPencilAlt,
  faMapMarkerAlt,
  faImages,
} from '@fortawesome/free-solid-svg-icons';

import './create-event.scss';

export interface CreateEventProps {
  history: History;
}

// Mutation to create events
const CREATE_EVENT = gql`
  mutation CreateEvent($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
      id
    }
  }
`;

/**
 * This component renders the create event page
 * @param {History} history
 */
const CreateEventPage = ({ history }) => {
  // Reference Id for the toast
  const toastId = useRef(null);
  // GraphQL mutation hook to create events
  const [createEvent] = useMutation(CREATE_EVENT);
  // Image of Event
  const [imageFile, setImageFile] = useState(null);

  /**
   * Handles image file uploads
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  /**
   * Adds time to a Date object
   * @param {string} time Time in HH:MM format
   * @param {Date} date Date object
   */
  const addTimeToDate = (time: string, date: Date) => {
    const [hour, minute] = time.split(':');
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));
  };

  /**
   * Notifies the user of a event submission
   */
  const notifySubmissionToast = () => {
    toastId.current = toast('Submitting Event...', { autoClose: false });
  };
  /**
   * Updates existing toast.
   * @param {TypeOptions} type Type of the toast
   * @param {string} message Message to display
   */
  const updateSubmissionToast = (type: TypeOptions, message: string) => {
    toast.update(toastId.current, {
      type,
      render: message,
      autoClose: 3000,
    });
  };

  const formik = useFormik({
    initialValues: {
      activeRestriction: EventRestriction.NONE,
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
        .test('maxEventLength', 'Event length cannot be over 30 days.', function (endDate) {
          if (!endDate) return true;
          const diff = Math.abs(+endDate - +this.parent.startDate);
          return diff <= 30 * DAY_IN_MILLISECONDS;
        }),
      startTime: Yup.string().required('Start Time is required.'),
      endTime: Yup.string().required('End Time is required.'),
      eventTitle: Yup.string()
        .required('Event Title is required.')
        .max(65, 'Event Title length must be under 65 characters.'),
      activeRestriction: Yup.number().min(0).max(2),
      description: Yup.string()
        .required('Event Description is required.')
        .max(5000, 'Event Description must be under 5000 characters.'),
      location: Yup.string().required('Event Location is required.'),
    }),

    onSubmit: (values) => {
      notifySubmissionToast();
      if (!values.endDate) values.endDate = cloneDeep(values.startDate);
      addTimeToDate(values.startTime, values.startDate);
      addTimeToDate(values.endTime, values.endDate);
      const payload = {
        startDate: values.startDate,
        endDate: values.endDate,
        description: values.description,
        title: values.eventTitle,
        restriction: values.activeRestriction,
      };
      createEvent({ variables: { createEventInput: payload } })
        .then(({ errors }) => {
          if (errors) {
            updateSubmissionToast(toast.TYPE.ERROR, 'Event Not Created');
          } else {
            updateSubmissionToast(toast.TYPE.SUCCESS, 'Event Created');
            history.push('/home');
          }
        })
        .catch(() => {
          updateSubmissionToast(toast.TYPE.ERROR, 'Fatal Error: Event Not Created');
        });
    },
  });

  /**
   * Handles the change of the event restriction.
   * @param idx Index of Active Restriction
   */
  const handleRestrictions = (idx: number) => {
    formik.setFieldValue('activeRestriction', idx);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="page-container">
        <div className="create-event">
          <p className="create-event-text">Create Event</p>
          <label htmlFor="imageFile" className="custom-file-upload event-input-border">
            {imageFile ? (
              <img src={imageFile} style={{ width: '50%', height: '50%' }} alt="Event" />
            ) : (
              <FontAwesomeIcon className="event-image-icon" icon={faImages} />
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
            hasErrors={formik.touched.endDate && !!formik.errors.endDate}
            errorMessage={formik.errors.endDate as string}
            onStartDateChange={(date) => {
              formik.setFieldValue('startDate', date);
              formik.setFieldValue('endDate', null);
            }}
            onEndDateChange={(date) => {
              formik.setFieldValue('endDate', date);
            }}
          />
          <CustomTimePicker
            label="Start Time"
            fieldName="startTime"
            value={formik.values.startTime}
            onChange={formik.handleChange}
            hasErrors={formik.touched.startTime && !!formik.errors.startTime}
            errorMessage={formik.errors.startTime}
          />
          <CustomTimePicker
            label="End Time"
            fieldName="endTime"
            value={formik.values.endTime}
            onChange={formik.handleChange}
            hasErrors={formik.touched.endTime && !!formik.errors.endTime}
            errorMessage={formik.errors.endTime}
          />
          <CustomTextInput
            title="Event Title"
            fieldName="eventTitle"
            value={formik.values.eventTitle}
            onChange={formik.handleChange}
            hasErrors={formik.touched.eventTitle && !!formik.errors.eventTitle}
            errorMessage={formik.errors.eventTitle}
            svgIcon={<FontAwesomeIcon icon={faPencilAlt} />}
          />
          <CustomTextInput
            title="Description"
            fieldName="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            hasErrors={formik.touched.description && !!formik.errors.description}
            errorMessage={formik.errors.description}
            svgIcon={<FontAwesomeIcon icon={faAlignLeft} />}
          />
          <CustomTextInput
            title="Location"
            fieldName="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            hasErrors={formik.touched.location && !!formik.errors.location}
            errorMessage={formik.errors.location}
            svgIcon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
          />
          <PillOptions
            options={['Everyone', 'Friends', 'Invite Only']}
            onChange={handleRestrictions}
            active={formik.values.activeRestriction}
          />
          <button type="submit" className="create-event-button">
            Done
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateEventPage;
