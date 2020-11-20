import fetch from 'cross-fetch';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import './search.scss';

export default function Asynchronous({ handleClose }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const loading = open && options.length === 0;

  const loadAddressOptions = async (userInput) => {
    let pos = 'location is not available';
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        pos = `longitude: ${position.coords.longitude}, latitude: ${position.coords.latitude}`;
      });
    }
    const response = await fetch(
      `https://app.geocodeapi.io/api/v1/autocomplete?apikey=&text=${userInput}&size=5&layers=address`
    );
    const address = await response.json();
    let x = address.features.map(({ properties: { label } }) => label);
    setOptions([pos].concat(x));
  };

  console.log(options);
  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: '100%' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={(event, value) => {
        loadAddressOptions(value);
      }}
      onChange={(event, value) => {
        console.log(value);
        handleClose(value);
      }}
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
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
