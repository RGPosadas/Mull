import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@material-ui/core/Dialog';
import { EventRestriction, ILocation } from '@mull/types';
import { FormikConfig } from 'formik';
import React, { useState } from 'react';
import { CustomTextInput, MullBackButton } from '../../../components';
import LocationAutoCompleteTextbox from './location-autocomplete-textbox';

export interface LocationAutocompleteModalProps {
  formik: FormikConfig<{
    activeRestriction: EventRestriction;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    eventTitle: string;
    description: string;
    location: ILocation;
    imageFile: string;
  }>;
}

export default function LocationAutocompleteModal({
  formik: { touched, setFieldValue, errors, values },
}) {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetValue = (location: ILocation) => {
    setInputValue(location.title);
    setFieldValue('location', location);
    handleClose();
  };

  return (
    <>
      <CustomTextInput
        title="Location"
        fieldName="location"
        value={inputValue || values.location.title}
        readOnly
        onClick={handleClickOpen}
        hasErrors={touched.location && !!errors.location}
        errorMessage={errors.location}
        svgIcon={<FontAwesomeIcon className="input-icon" icon={faMapMarkerAlt} />}
      />

      <Dialog fullScreen open={open}>
        <MullBackButton children={'Edit'} onClick={handleClose} className={'edit'} />
        <LocationAutoCompleteTextbox handleSetValue={handleSetValue} input={inputValue} />
      </Dialog>
    </>
  );
}
