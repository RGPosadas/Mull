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
  setInputValue: (value: React.SetStateAction<string>) => void;
}

const CURRENT_LOCATION: IGooglePlace = { description: 'Current Location', placeId: null };

export default function LocationAutocompleteTextbox({
  handleSetValue,
  input,
  setInputValue,
}: LocationAutocompleteTextboxProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<IGooglePlace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { notifyToast } = useToast();

  const debounceGetLocation = useMemo(
    () =>
      debounce((search: string) => {
        setLoading(true);
        axios
          .get(encodeURI(`${environment.backendUrl}/api/location-autocomplete?search=${search}`))
          .then((data) => data.data)
          .then((data: IGooglePlace[]) => {
            {
              setOptions([CURRENT_LOCATION, ...data]);
              setLoading(false);
            }
          });
      }, 350),
    [axios.get]
  );

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
        className="location-autocomplete-textbox"
        inputValue={input}
        defaultValue={input}
        open={open}
        getOptionLabel={(option) => (option.description ? option.description : '')}
        onFocus={() => {
          setOptions([CURRENT_LOCATION]);
          setOpen(true);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onInputChange={(_event, value) => {
          setInputValue(value ? value : '');
          if (value && value !== CURRENT_LOCATION.description) {
            debounceGetLocation(value);
          }
        }}
        onChange={(_event, value: IGooglePlace) => {
          if (value) {
            if (value.description === CURRENT_LOCATION.description) {
              getCurrentPosition();
            } else if (value) {
              handleSetValue({ title: value.description, placeId: value.placeId });
            }
          }
        }}
        getOptionSelected={(option: IGooglePlace, value) => {
          return option.description === ((value as unknown) as string);
        }}
        renderOption={(option: IGooglePlace) => {
          const icon =
            option.description === CURRENT_LOCATION.description ? faLocationArrow : faMapMarkerAlt;
          return (
            <>
              <FontAwesomeIcon icon={icon} className="location-autocomplete-option" />
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
