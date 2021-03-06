import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import ChatInput from './chat-input';

const mockFormik = {
  values: { location: 'test string' },
  setFieldValue: { location: 'value' },
  touched: { location: false },
  errors: { location: false },
  handleSubmit: jest.fn(),
};

describe('ChatInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatInput formik={mockFormik} />);

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<ChatInput formik={mockFormik} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
