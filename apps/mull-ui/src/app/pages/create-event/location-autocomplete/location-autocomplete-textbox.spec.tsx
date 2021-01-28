import { IGooglePlace } from '@mull/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import LocationAutocompleteTextbox, {
  LocationAutocompleteTextboxProps,
} from './location-autocomplete-textbox';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const data: IGooglePlace[] = [
  {
    description: '845 rue Sherbrooke',
    placeId: 'mock',
  },
];

const mockHandleClose: (e) => void = jest.fn();
const mockSetInputValue: (e) => void = jest.fn();

const mockLocationAutocompleteTextboxProps: () => LocationAutocompleteTextboxProps = () => ({
  handleSetValue: mockHandleClose,
  input: '845 rue Sherbrooke',
  setInputValue: mockSetInputValue,
});

describe('location autocomplete textbox', () => {
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
    props.input = testInput;
    const utils = render(<LocationAutocompleteTextbox {...props} />);
    const autocompleteTextbox = utils.container.querySelector(
      '#location-input-field'
    ) as HTMLInputElement;
    expect(autocompleteTextbox.value).toBe(testInput);
  });

  it('should type in the autocomplete textbox', async () => {
    await act(async () => {
      const props = mockLocationAutocompleteTextboxProps();

      mockedAxios.get.mockResolvedValue({ data: data });

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
