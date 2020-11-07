import React, { useState } from 'react';
import { enGB } from 'date-fns/locale';
import { DateRangeFocus, DateRangePickerCalendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import './date-calendar.scss';

export interface DateCalendarProps {
  startDate: Date;
  endDate: Date;
  hasErrors: boolean;
  errorMessage: string;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}
/**
 * This component renders a DateCalendar
 * @param {date} startDate Start Date of the event
 * @param {date} endDate End Date of event
 * @param {boolean} hasErrors
 * @param {string} errorMessage
 * @param {(date: Date) => void} onStartDateChange Handles start date change
 * @param {(date: Date) => void} onEndDateChange Handles end date change
 */
const DateCalendar = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  hasErrors,
  errorMessage,
}: DateCalendarProps) => {
  const START_DATE: DateRangeFocus = 'startDate';
  const [focus, setFocus] = useState<DateRangeFocus>(START_DATE);

  /**
   * Handles focus changes of the calendar
   * @param {DateRangeFocus} newFocus Current selected calendar date
   */
  const handleFocusChange = (newFocus: DateRangeFocus) => {
    setFocus(newFocus || START_DATE);
  };

  return (
    <div className="date-calendar-container">
      <div className="date-calendar">
        <DateRangePickerCalendar
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          onFocusChange={handleFocusChange}
          locale={enGB}
          minimumDate={new Date()}
        />
      </div>
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

export default DateCalendar;
