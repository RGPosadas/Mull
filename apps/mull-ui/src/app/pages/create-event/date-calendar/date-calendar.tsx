import React, { useState } from 'react';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { DateRangeFocus, DateRangePickerCalendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import './date-calendar.scss';

const DateCalendar = () => {
  let START_DATE: DateRangeFocus = 'startDate';
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [focus, setFocus] = useState<DateRangeFocus>(START_DATE);
  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
  };
  return (
    <div>
      <p>
        Selected start date:{' '}
        {startDate ? format(startDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
      </p>
      <p>
        Selected end date: {endDate ? format(endDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
      </p>
      <p>Currently selecting: {focus}.</p>
      <div className="event-calendar">
        <DateRangePickerCalendar
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          onStartDateChange={(event) => setStartDate(event)}
          onEndDateChange={(event) => setEndDate(event)}
          onFocusChange={handleFocusChange}
          locale={enGB}
        />
      </div>
    </div>
  );
};

export default DateCalendar;
