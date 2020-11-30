import React, { ChangeEvent } from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomTimePicker, { CustomTimePickerProps } from './custom-time-picker';

const mockOnChange: (e: ChangeEvent<HTMLInputElement>) => void = jest.fn();
const mockCustomTimePickerProps: () => CustomTimePickerProps = () => ({
  label: 'Text',
  value: '',
  fieldName: 'text',
  errorMessage: 'Text is not valid.',
  onChange: mockOnChange,
  hasErrors: true,
});

describe('CustomTimePicker', () => {
  it('should render successfully', () => {
    const props = mockCustomTimePickerProps();
    const { baseElement } = render(<CustomTimePicker {...props} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const props = mockCustomTimePickerProps();
    const tree = renderer.create(<CustomTimePicker {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have the correct time input', () => {
    const props = mockCustomTimePickerProps();
    const inputTime = '04:20';
    const utils = render(<CustomTimePicker {...props} />);
    const input = utils.getByTestId('custom-time-input');
    fireEvent.change(input, { target: { value: inputTime } });
    props.value = inputTime;
    utils.rerender(<CustomTimePicker {...props} />);
    expect(input.value).toBe(inputTime);
  });
});
