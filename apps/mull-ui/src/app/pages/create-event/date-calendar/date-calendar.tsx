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
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

const DateCalendar = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateCalendarProps) => {
  const START_DATE: DateRangeFocus = 'startDate';
  const [focus, setFocus] = useState<DateRangeFocus>(START_DATE);
  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
  };
  return (
    <div>
      <div className="event-calendar">
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
    </div>
  );
};

export default DateCalendar;
