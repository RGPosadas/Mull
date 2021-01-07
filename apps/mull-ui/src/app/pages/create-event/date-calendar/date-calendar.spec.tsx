import { render } from '@testing-library/react';
import React from 'react';
import DateCalendar, { DateCalendarProps } from './date-calendar';

const mockOnStartDateChange: (date: Date) => void = jest.fn();
const mockOnEndDateChange: (date: Date) => void = jest.fn();
const mockDateCalendarProps: () => DateCalendarProps = () => ({
  startDate: new Date(),
  endDate: new Date(),
  onStartDateChange: mockOnStartDateChange,
  onEndDateChange: mockOnEndDateChange,
  hasErrors: false,
  errorMessage: 'sup',
});
describe('DateCalendar', () => {
  it('should render successfully', () => {
    const props = mockDateCalendarProps();
    const { baseElement } = render(<DateCalendar {...props} />);
    expect(baseElement).toBeTruthy();
  });

  it('should display errors', () => {
    const props = mockDateCalendarProps();
    props.hasErrors = true;
    const { baseElement } = render(<DateCalendar {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
