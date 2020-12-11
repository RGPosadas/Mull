import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import LocationAutocompleteModal from './location-autocomplete-modal';

const mockFormik = {
  values: { location: 'test string' },
  touched: { location: false },
  errors: { location: false },
};

describe('location autocomplete modal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LocationAutocompleteModal formik={mockFormik} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<LocationAutocompleteModal formik={mockFormik} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should open autocomplete modal', async () => {
    const utils = render(<LocationAutocompleteModal formik={mockFormik} />);
    const autocompleteModal = utils.container.querySelector('#location');
    await waitFor(() => {
      fireEvent.click(autocompleteModal);
    });
  });
});
