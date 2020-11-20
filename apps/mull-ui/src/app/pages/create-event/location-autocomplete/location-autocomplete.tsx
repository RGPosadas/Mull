import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Search from './search';
import { CustomTextInput } from '@mull/ui-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function FullScreenDialog() {
  const [input_value, setInputValue] = React.useState('');
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
    <div>
      <CustomTextInput
        title="Location"
        fieldName="location"
        value={input_value}
        onChange={null}
        onClick={handleClickOpen}
        hasErrors={null}
        errorMessage={null}
        svgIcon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
      />

      <Dialog fullScreen open={open}>
        <Button autoFocus color="inherit" onClick={handleClose}>
          save
        </Button>

        <Search handleClose={handleClose} />
      </Dialog>
    </div>
  );
}
