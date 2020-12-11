import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { gql, useLazyQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './location-autocomplete-textbox.scss';
import { faMapMarkerAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const AUTOCOMPLETED_LOCATIONS = gql`
  query Query($userInput: String!) {
    getAutocompletedLocations(userInput: $userInput)
  }
`;

export default function LocationAutocompleteTextbox({ handleClose, input }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [getAutocompletedLocations, { loading, data }] = useLazyQuery(AUTOCOMPLETED_LOCATIONS);
  const [keyStrokeCount, setKeyStrokeCount] = useState(0);

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = `latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`;
        handleClose(pos);
      });
    }
  };

  return (
    <Autocomplete
      id="location-input-field"
      style={{ width: '100%' }}
      open={open}
      onFocus={() => {
        setOptions(['Current Location']);
        setOpen(true);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      defaultValue={input}
      onInputChange={(event, value) => {
        setKeyStrokeCount(keyStrokeCount + 1);
        if (keyStrokeCount === 3) {
          setKeyStrokeCount(0);
          getAutocompletedLocations({
            variables: { userInput: value },
          });
          if (!loading && data) {
            setOptions(data.getAutocompletedLocations);
          }
        }
      }}
      onChange={(_event, value) => {
        if (value === 'Current Location') {
          getCurrentPosition();
        } else {
          handleClose(value);
        }
      }}
      getOptionSelected={(option, value) => option === value}
      renderOption={(option) => {
        let icon = option == 'Current Location' ? faLocationArrow : faMapMarkerAlt;
        return (
          <React.Fragment>
            <FontAwesomeIcon icon={icon} style={{ marginRight: '0.8rem' }} />
            {option}
          </React.Fragment>
        );
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          placeholder={'Search Address'}
          autoFocus
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
