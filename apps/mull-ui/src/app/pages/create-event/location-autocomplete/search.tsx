import fetch from 'cross-fetch';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { faMapMarkerAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './search.scss';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AUTOCOMPLETED_LOCATIONS = gql`
  query Query($userInput: String!) {
    getAutocompletedLocations(userInput: $userInput)
  }
`;

export default function Asynchronous({ handleClose }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [getAutoCompletedLocations, { loading, data, error }] = useLazyQuery(
    AUTOCOMPLETED_LOCATIONS,
    {
      variables: { userInput: userInput },
    }
  );

  const getCurrentPosition = async () => {
    let pos = 'location is not available';
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        pos = `longitude: ${position.coords.longitude}, latitude: ${position.coords.latitude}`;
        handleClose(pos);
      });
    }
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: '100%' }}
      open={open}
      onFocus={() => {
        setOptions(['test']);
        setOpen(true);
        console.log(options);
      }}
      onOpen={() => {
        setOpen(true);

        console.log(options);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={async (event, value) => {
        // if (value.length > 5) { setUserInput(value);
        // setOptions(options.concat([ "dgfdg", "dfjasdgjdlg", "dsgjsakga"]))
        // const pos = await loadAddressOptions();
        // await getAutoCompletedLocations();
        // console.log("addresses: " + data);
        // setOptions([pos].concat(data));}
      }}
      onChange={async (event, value) => {
        if (value === 'test') {
          await getCurrentPosition();
        }
        // handleClose(value);
      }}
      getOptionSelected={(option, value) => option === value}
      renderOption={(option) => {
        let con;
        if (option == 'test') {
          con = faMapMarkerAlt;
        } else {
          con = faPencilAlt;
        }
        return (
          <React.Fragment>
            <FontAwesomeIcon icon={con} />
            {option}
          </React.Fragment>
        );
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          autoFocus
          {...params}
          label="Search Address"
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
