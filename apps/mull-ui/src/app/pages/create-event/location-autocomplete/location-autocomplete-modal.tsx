import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@material-ui/core/Dialog';
import { ICreateEventForm } from '@mull/types';
import { FormikContextType } from 'formik';
import React, { useState } from 'react';
import { LocationInput } from '../../../../generated/graphql';
import { CustomTextInput, MullBackButton } from '../../../components';
import './location-autocomplete-modal.scss';
import LocationAutoCompleteTextbox from './location-autocomplete-textbox';

export interface LocationAutocompleteModalProps {
  formik: FormikContextType<ICreateEventForm>;
}

export default function LocationAutocompleteModal({
  formik: { touched, setFieldValue, errors, values },
}: LocationAutocompleteModalProps) {
  const [inputValue, setInputValue] = useState(values.location.title);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetValue = (location: LocationInput) => {
    setInputValue(location.title);
    setFieldValue('location', location);
    handleClose();
  };

  return (
    <>
      <CustomTextInput
        title="Location"
        fieldName="location"
        value={inputValue}
        readOnly
        onClick={handleClickOpen}
        hasErrors={touched.location && !!errors.location}
        errorMessage={errors.location as string}
        svgIcon={<FontAwesomeIcon className="input-icon" icon={faMapMarkerAlt} />}
      />

      <Dialog fullScreen open={open}>
        <MullBackButton onClick={handleClose} className="location-autocomplete-modal-back-button">
          Edit
        </MullBackButton>
        <LocationAutoCompleteTextbox
          handleSetValue={handleSetValue}
          input={inputValue}
          setInputValue={setInputValue}
        />
      </Dialog>
    </>
  );
}
