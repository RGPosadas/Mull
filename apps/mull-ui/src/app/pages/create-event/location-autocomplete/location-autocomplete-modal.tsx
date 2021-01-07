import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import LocationAutoCompleteTextbox from './location-autocomplete-textbox';
import { CustomTextInput } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { MullBackButton } from '../../../components';
import { EventRestriction, ILocation } from '@mull/types';
import { FormikConfig } from 'formik';

export interface LocationAutocompleteModalProps {
  formik: FormikContextType<CreateEventForm>;
}

export interface CreateEventForm {
  activeRestriction: EventRestriction;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  eventTitle: string;
  description: string;
  location: ILocation;
  imageFile: string;
}

export default function LocationAutocompleteModal({
  formik: { touched, setFieldValue, errors, values },
}: LocationAutocompleteModalProps) {
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
        svgIcon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
      />

      <Dialog fullScreen open={open}>
        <MullBackButton
          style={{
            marginRight: 'auto',
            marginLeft: '0.2rem',
            marginTop: '0.8rem',
            marginBottom: '2rem',
          }}
          children={'Edit'}
          onClick={handleClose}
          className={'edit'}
        />
        <LocationAutoCompleteTextbox handleSetValue={handleSetValue} input={inputValue} />
      </Dialog>
    </>
  );
}
