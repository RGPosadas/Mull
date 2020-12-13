import React, { ChangeEvent } from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';

import LocationAutocompleteTextbox, {
  LocationAutocompleteTextboxProps,
  AUTOCOMPLETED_LOCATIONS,
} from './location-autocomplete-textbox';

const mockHandleClose: (e) => void = jest.fn();

const mockLocationAutocompleteTextboxProps: () => LocationAutocompleteTextboxProps = () => ({
  handleClose: mockHandleClose,
  input: '',
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
    const autocompleteTextbox = utils.container.querySelector('#location-input-field') as any;
    expect(autocompleteTextbox.value).toBe(testInput);
  });

  it('should type in the autocomplete textbox', () => {
    const props = mockLocationAutocompleteTextboxProps();

    const mocks = [
      {
        request: {
          query: AUTOCOMPLETED_LOCATIONS,
          variables: { userInput: '' },
        },
        result: { data: ['845 rue Sherbrooke'] },
      },
    ];
    const utils = render(
      <MockedProvider mocks={mocks}>
        <LocationAutocompleteTextbox {...props} />
      </MockedProvider>
    );

    const textbox = utils.getByTestId('location-autocomplete-textbox');
    fireEvent.change(textbox, { target: { defaultValue: '8485 rue Sherbrooke' } });
    userEvent.type(
      screen.getByTestId('location-autocomplete-textbox'),
      '845 rue Sherbrooke{enter}'
    );

    const autocompleteTextbox = utils.container.querySelector('#location-input-field') as any;
    expect(autocompleteTextbox.value).toBe('8485 rue Sherbrooke');
  });
});
