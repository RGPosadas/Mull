import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Search from './location-autocomplete-textbox';
import { CustomTextInput } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { MullBackButton } from '../../../components';

export default function LocationAutocompleteModal({ formik }) {
  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (typeof value == 'string') {
      setInputValue(value);
    }
  };

  return (
    <React.Fragment>
      <CustomTextInput
        title="Location"
        fieldName="location"
        value={(formik.values.location = inputValue)}
        readOnly
        onClick={handleClickOpen}
        hasErrors={formik.touched.location && !!formik.errors.location}
        errorMessage={formik.errors.location}
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
        />
        <Search handleClose={handleClose} input={inputValue} />
      </Dialog>
    </React.Fragment>
  );
}
