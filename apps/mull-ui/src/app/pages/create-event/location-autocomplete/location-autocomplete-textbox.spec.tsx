import { IGooglePlace } from '@mull/types';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import renderer from 'react-test-renderer';
import LocationAutocompleteTextbox, {
  LocationAutocompleteTextboxProps,
} from './location-autocomplete-textbox';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedApiData: IGooglePlace[] = [
  {
    description: '845 rue Sherbrooke',
    placeId: 'mock',
  },
];

const mockHandleClose: (e) => void = jest.fn();
const mockSetInputValue: (e) => void = jest.fn();
const mockSetValue: (e) => void = jest.fn();
const mockSetFieldValue: (e) => void = jest.fn();

const mockLocationAutocompleteTextboxProps: () => LocationAutocompleteTextboxProps = () => ({
  handleSetValue: mockHandleClose,
  inputValue: '845 rue Sherbrooke',
  setInputValue: mockSetInputValue,
  value: null,
  setValue: mockSetValue,
  setFieldValue: mockSetFieldValue,
});

describe('location autocomplete textbox', () => {
  // To suppress annoying warning by material ui
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });
  it('should render successfully', () => {
    const props = mockLocationAutocompleteTextboxProps();
    const { baseElement } = render(<LocationAutocompleteTextbox {...props} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const props = mockLocationAutocompleteTextboxProps();
    const tree = renderer.create(<LocationAutocompleteTextbox {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have the correct text input value', () => {
    const props = mockLocationAutocompleteTextboxProps();
    const testInput = 'test string';
    props.inputValue = testInput;
    const utils = render(<LocationAutocompleteTextbox {...props} />);
    const autocompleteTextbox = utils.container.querySelector(
      '#location-input-field'
    ) as HTMLInputElement;
    expect(autocompleteTextbox.value).toBe(testInput);
  });

  it('should type in the autocomplete textbox and trigger the debounce', async () => {
    await act(async () => {
      const props = mockLocationAutocompleteTextboxProps();

      mockedAxios.get.mockResolvedValue({ data: mockedApiData });

      const utils = render(<LocationAutocompleteTextbox {...props} />);

      userEvent.type(
        screen.getByTestId('location-autocomplete-textbox'),
        '845 rue Sherbrooke{enter}'
      );

      expect(mockedAxios.get).toHaveBeenCalledTimes(0);
      await new Promise((r) => setTimeout(r, 1000));
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);

      const autocompleteTextbox = utils.container.querySelector(
        '#location-input-field'
      ) as HTMLInputElement;
      expect(autocompleteTextbox.value).toBe('845 rue Sherbrooke');
    });
  });
});
