import React, { ChangeEvent, useRef, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { toast, TypeOptions } from 'react-toastify';
import * as Yup from 'yup';
import { cloneDeep } from 'lodash';
import { EventRestriction, EventRestrictionMap, IEvent, IMedia } from '@mull/types';
import { PillOptions, CustomTextInput, CustomTimePicker } from '@mull/ui-lib';
import { MullButton, CustomFileUpload } from './../../components';
import { EventPage } from './../event-page/event-page';
import DateCalendar from './date-calendar/date-calendar';

import { DAY_IN_MILLISECONDS } from '../../../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faPencilAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { History } from 'history';

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

export const UPLOAD_PHOTO = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id
      mediaType
    }
  }
`;

/**
 * This component renders the create event page
 * @param {History} history
 */
const CreateEventPage = ({ history }: CreateEventProps) => {
  // Reference Id for the toast
  const toastId = useRef(null);
  // GraphQL mutation hook to create events
  const [createEvent] = useMutation<IEvent>(CREATE_EVENT);
  const [uploadFile] = useMutation<{ uploadFile: IMedia }>(UPLOAD_PHOTO);
  // Uploaded Image File
  const [imageURLFile, setImageURLFile] = useState<string>(null); // Path of uploaded image on client, to be used in image previews
  const [file, setFile] = useState<File>(null); // Uploaded image file blob
  const [review, setReview] = useState<boolean>(false); // Show either form or review page
  const [payload, setPayload] = useState<Partial<IEvent>>(null);
  /**
   * Handles image file uploads
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setImageURLFile(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    formik.setFieldValue('imageFile', event.target.files[0]);
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
      imageFile: '',
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
      imageFile: Yup.mixed().required('Image is required.'),
    }),

    onSubmit: async (values) => {
      if (!values.endDate) values.endDate = cloneDeep(values.startDate);
      addTimeToDate(values.startTime, values.startDate);
      addTimeToDate(values.endTime, values.endDate);
      try {
        var uploadedFile = await uploadFile({ variables: { file: file } });
        if (uploadedFile instanceof Error) {
          throw uploadedFile;
        }
      } catch (err) {
        updateSubmissionToast(toast.TYPE.ERROR, 'Fatal Error: Event Not Created');
        console.error(err);
        return;
      }
      const imageMedia: IMedia = {
        id: uploadedFile.data.uploadFile.id,
        mediaType: uploadedFile.data.uploadFile.mediaType,
      };
      setPayload({
        startDate: values.startDate,
        endDate: values.endDate,
        description: values.description,
        title: values.eventTitle,
        restriction: values.activeRestriction,
        image: imageMedia,
      });
      setReview(true);
    },
  });

  /**
   * Handles the change of the event restriction.
   * @param idx Index of Active Restriction
   */
  const handleRestrictions = (idx: number) => {
    formik.setFieldValue('activeRestriction', idx);
  };

  const createMullEvent = () => {
    notifySubmissionToast();
    createEvent({ variables: { createEventInput: payload } })
      .then(({ errors }) => {
        if (errors) {
          console.log(errors);
          updateSubmissionToast(toast.TYPE.ERROR, 'Event Not Created');
        } else {
          updateSubmissionToast(toast.TYPE.SUCCESS, 'Event Created');
          history.push('/home');
        }
      })
      .catch(() => {
        updateSubmissionToast(toast.TYPE.ERROR, 'Fatal Error: Event Not Created');
      });
  };

  return review ? (
    <EventPage
      event={payload}
      prevPage={'Edit'}
      onBackButtonClick={() => setReview(false)}
      onButtonClick={createMullEvent}
      eventImageURL={imageURLFile}
    ></EventPage>
  ) : (
    <form className="container" onSubmit={formik.handleSubmit}>
      <div className="page-container">
        <div className="create-event">
          <p className="create-event-text">Create Event</p>
          <CustomFileUpload
            imageURL={imageURLFile}
            hasErrors={formik.touched.imageFile && !!formik.errors.imageFile}
            errorMessage={formik.errors.imageFile}
            handleFileUpload={handleFileUpload}
            fieldName="imageFile"
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
            options={EventRestrictionMap}
            onChange={handleRestrictions}
            active={formik.values.activeRestriction}
          />
          <MullButton className="create-event-button">Submit</MullButton>
        </div>
      </div>
    </form>
  );
};

export default CreateEventPage;
