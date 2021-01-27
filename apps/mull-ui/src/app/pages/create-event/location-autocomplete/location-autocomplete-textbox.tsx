import { faLocationArrow, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IGooglePlace } from '@mull/types';
import { environment } from 'apps/mull-ui/src/environments/environment';
import axios from 'axios';
import { debounce } from 'lodash';
import React, { useMemo, useState } from 'react';
import { LocationInput } from '../../../../generated/graphql';
import { useToast } from '../../../hooks/useToast';
import './location-autocomplete-textbox.scss';

export interface LocationAutocompleteTextboxProps {
  handleSetValue: (location: LocationInput) => void;
  input: string;
}

const CURRENT_LOCATION: IGooglePlace = { description: 'Current Location', placeId: null };

export default function LocationAutocompleteTextbox({
  handleSetValue,
  input,
}: LocationAutocompleteTextboxProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<IGooglePlace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { notifyToast, updateToast } = useToast();
  const CURRENT_LOCATION = 'Current Location';

  const debounceGetLocation = useMemo(
    () =>
      debounce((search: string) => {
        console.log('debounce called');
        setLoading(true);
        axios
          .get(`${environment.backendUrl}/api/location-autocomplete?search=${search}`)
          .then((data) => {
            setOptions(data.data);
            setLoading(false);
          });
      }, 350),
    [axios.get]
  );

  const getCurrentPosition = () => {
    console.log('getCurrentPos');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('in geolocation getCurrentPos');
          const location: LocationInput = {
            title: 'Current Location',
            coordinates: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          };
          handleSetValue(location);
        },
        () => {
          console.log('getcurrentpos error');
          notifyToast('Cannot get your current location coordinates.', { type: 'error' });
        },
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <div className="location-textbox-container">
      <Autocomplete
        id="location-input-field"
        data-testid="location-autocomplete-textbox"
        style={{ padding: '6px 20px' }}
        open={open}
        getOptionLabel={(option) => (option.description ? option.description : '')}
        onFocus={() => {
          setOptions([{ description: CURRENT_LOCATION, placeId: null }]);
          setOpen(true);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        defaultValue={input}
        onInputChange={(_event, value) => {
          if (value && value !== CURRENT_LOCATION) {
            debounceGetLocation(value);
          }
        }}
        onChange={(_event, value: IGooglePlace) => {
          console.log('onChange called');
          if (value.description === CURRENT_LOCATION) {
            getCurrentPosition();
          } else if (value) {
            handleSetValue({ title: value.description, placeId: value.placeId });
          }
        }}
        getOptionSelected={(option: IGooglePlace, value: IGooglePlace) => {
          // console.log({ option, value });
          return option.description === value.description;
        }}
        renderOption={(option: IGooglePlace) => {
          const icon = option.description === CURRENT_LOCATION ? faLocationArrow : faMapMarkerAlt;
          return (
            <>
              <FontAwesomeIcon icon={icon} style={{ marginRight: '0.8rem' }} />
              {option.description}
            </>
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
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
