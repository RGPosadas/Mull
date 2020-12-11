import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Search from './location-autocomplete-textbox';
import { CustomTextInput } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { MullBackButton } from '../../../components';
import { EventRestriction } from '@mull/types';
import { FormikConfig } from 'formik';

export interface LocationAutocompleteModalProps {
  formik: FormikConfig<{
    activeRestriction: EventRestriction;
    startDate: any;
    endDate: any;
    startTime: string;
    endTime: string;
    eventTitle: string;
    description: string;
    location: string;
    imageFile: string;
  }>;
}

export default function LocationAutocompleteModal({ formik: { touched, setFieldValue, errors } }) {
  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (typeof value == 'string') {
      setInputValue(value);
      setFieldValue('location', value);
    }
  };

  return (
    <React.Fragment>
      <CustomTextInput
        title="Location"
        fieldName="location"
        value={inputValue}
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
        <Search handleClose={handleClose} input={inputValue} />
      </Dialog>
    </React.Fragment>
  );
}
