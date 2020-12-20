import { faAlignLeft, faMapMarkerAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventRestriction, EventRestrictionMap } from '@mull/types';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import { History } from 'history';
import { cloneDeep, isEmpty } from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { DAY_IN_MILLISECONDS, ROUTES } from '../../../constants';
import {
  CreateEventInput,
  useCreateEventMutation,
  useUploadFileMutation,
} from '../../../generated/graphql';
import { useToast } from '../../hooks/useToast';
import {
  CustomFileUpload,
  CustomTextInput,
  CustomTimePicker,
  MullButton,
  PillOptions,
} from './../../components';
import { EventPage } from './../event-page/event-page';
import './create-event.scss';
import DateCalendar from './date-calendar/date-calendar';

export interface CreateEventProps {
  history: History;
}

/**
 * This component renders the create event page
 * @param {History} history
 */
const CreateEventPage = ({ history }: CreateEventProps) => {
  // GraphQL mutation hook to create events
  const [createEvent] = useCreateEventMutation();
  const [uploadFile] = useUploadFileMutation();
  // Uploaded Image File
  const [imageURLFile, setImageURLFile] = useState<string>(null); // Path of uploaded image on client, to be used in image previews
  const [file, setFile] = useState<File>(null); // Uploaded image file blob
  const [isInReview, setIsInReview] = useState<boolean>(false); // Show either form or review page
  const [payload, setPayload] = useState<Partial<CreateEventInput>>(null);
  const { notifyToast, updateToast } = useToast();
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

  const formik = useFormik({
    initialValues: {
      activeRestriction: EventRestriction.NONE,
      startDate: null,
      endDate: null,
      startTime: '',
      endTime: '',
      eventTitle: '',
      description: '',
      location: { title: '' } as ILocation,
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
      location: Yup.mixed()
        .required('Event Location is required.')
        .test(
          'values.location.title cannot be empty string',
          'Event Location is required.',
          function (location) {
            if (location.title && location.title === '') return true;
            return location.title;
          }
        ),
      imageFile: Yup.mixed().required('Image is required.'),
    }),

    onSubmit: async () => {
      notifyToast('Submitting Event...');
      try {
        const {
          data: { uploadFile: uploadedFile },
        } = await uploadFile({ variables: { file: file } });
        await createEvent({
          variables: {
            event: {
              ...payload,
              image: { id: uploadedFile.id, mediaType: uploadedFile.mediaType },
            } as CreateEventInput,
          },
        });
        updateToast(toast.TYPE.SUCCESS, 'Event Created');
        history.push(ROUTES.HOME);
      } catch (err) {
        updateToast(toast.TYPE.ERROR, 'Fatal Error: Event Not Created');
        console.error(err);
      }
    },
  });

  /**
   * Handles the change of the event restriction.
   * @param idx Index of Active Restriction
   */
  const handleRestrictions = (idx: number) => {
    formik.setFieldValue('activeRestriction', idx);
  };

  /**
   * Handles the 'Done' button press. It will run the validation on the form and
   * make the payload ready for the review page.
   */
  const handleReviewButton = async () => {
    const errors = await formik.validateForm();
    if (isEmpty(errors)) {
      if (!formik.values.endDate) formik.values.endDate = cloneDeep(formik.values.startDate);
      addTimeToDate(formik.values.startTime, formik.values.startDate);
      addTimeToDate(formik.values.endTime, formik.values.endDate);
      setPayload({
        startDate: formik.values.startDate,
        endDate: formik.values.endDate,
        description: formik.values.description,
        title: formik.values.eventTitle,
        restriction: formik.values.activeRestriction,
        image: null,
      });
      setIsInReview(true);
    } else {
      formik.setTouched(setNestedObjectValues<FormikTouched<FormikValues>>(errors, true));
    }
  };

  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      {isInReview ? (
        <EventPage
          event={payload}
          prevPage={'Edit'}
          onBackButtonClick={() => setIsInReview(false)}
          buttonType={'submit'}
          eventImageURL={imageURLFile}
          isReview={true}
        />
      ) : (
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
            <MullButton className="create-event-button" type="button" onClick={handleReviewButton}>
              Done
            </MullButton>
          </div>
          <LocationInput formik={formik} />
        </div>
      )}
    </form>
  );
};

export default CreateEventPage;
