import fetch from 'cross-fetch';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { faMapMarkerAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import './search.scss';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AUTOCOMPLETED_LOCATIONS = gql`
  query Query($userInput: String!) {
    getAutocompletedLocations(userInput: $userInput)
  }
`;

export default function Asynchronous({ handleClose, input }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [getAutocompletedLocations, { loading, data, error }] = useLazyQuery(
    AUTOCOMPLETED_LOCATIONS
  );

  const getCurrentPosition = async () => {
    let pos = 'location is not available';
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        pos = `latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`;
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
        if (value.length) {
          getAutocompletedLocations({
            variables: { userInput: value },
          });
          if (!loading && data) {
            setOptions(data.getAutocompletedLocations);
          }
        }
      }}
      onChange={async (event, value) => {
        if (value === 'Current Location') {
          await getCurrentPosition();
        } else {
          handleClose(value);
        }
      }}
      getOptionSelected={(option, value) => option === value}
      renderOption={(option) => {
        let con;
        if (option == 'Current Location') {
          con = faLocationArrow;
        } else {
          con = faMapMarkerAlt;
        }
        return (
          <React.Fragment>
            <FontAwesomeIcon icon={con} style={{ marginRight: '0.8rem' }} />
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
