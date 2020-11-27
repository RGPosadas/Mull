import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Search from './search';
import { CustomTextInput } from '@mull/ui-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { MullBackButton } from '../../../components';

export default function FullScreenDialog() {
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
        value={inputValue}
        readOnly
        onClick={handleClickOpen}
        hasErrors={null}
        errorMessage={null}
        svgIcon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
      />

      <Dialog fullScreen open={open}>
        <div style={{ display: 'flex' }}>
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
        </div>
        <Search handleClose={handleClose} input={inputValue} />
      </Dialog>
    </React.Fragment>
  );
}
