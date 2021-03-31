import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import TimeSlider, { TimeSliderProps } from './time-slider';

const mockOnChange: (time: number) => void = jest.fn();
const mockCustomTimeSliderProps: () => TimeSliderProps = () => ({
  label: 'Text',
  value: 12,
  errorMessage: 'Time is not valid.',
  onChange: mockOnChange,
  hasErrors: true,
  reverse: true,
  time: 12,
  onTimeChange: mockOnChange,
});

describe('CustomTimePicker', () => {
  it('should render successfully', () => {
    const props = mockCustomTimeSliderProps();
    const { baseElement } = render(<TimeSlider {...props} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const props = mockCustomTimeSliderProps();
    const tree = renderer.create(<TimeSlider {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
