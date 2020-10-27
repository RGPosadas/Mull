import React, { SyntheticEvent, useState } from 'react';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { DateRangeFocus, DateRangePickerCalendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import './date-calendar.scss';

/* eslint-disable-next-line */
export interface DateCalendarProps {
  startDate: Date;
  endDate: Date;
  hasErrors: boolean;
  errorMessage: string;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

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
