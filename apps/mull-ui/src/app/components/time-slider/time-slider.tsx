import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { useState } from 'react';
import './time-slider.module.scss';

const MySlider = Slider.createSliderWithTooltip(Slider);

function minTommss(minutes: number) {
  var hour = Math.floor(Math.abs(minutes));
  var min = Math.floor((Math.abs(minutes) * 60) % 60);
  return (hour < 10 ? '0' : '') + hour + ':' + (min < 10 ? '0' : '') + min;
}
const getStringTime = (time) => {
  return time > 12 ? minTommss(time % 12) + ' pm' : minTommss(time % 12) + '  am';
};

/* eslint-disable-next-line */
export interface TimeSliderProps {
  startOrEnd: string;
  reverse?: boolean;
}

const test = (value: number) => {
  const hhmm = minTommss(value).split(':');
  const d = new Date();
  d.setHours(parseInt(hhmm[0]));
  d.setMinutes(parseInt(hhmm[1]));
  d.setSeconds(0);
  d.setMilliseconds(0);
  console.log(d);
};

export const TimeSlider = ({ startOrEnd, reverse }: TimeSliderProps) => {
  const [value, setValue] = useState<number>(0);

  return (
    <div style={{ margin: 20 }}>
      <p>
        {startOrEnd} {getStringTime(value)}
      </p>
      <Slider
        style={{ paddingTop: '2rem', width: '20rem' }}
        min={0}
        max={24}
        step={0.25}
        value={value}
        onChange={setValue}
        trackStyle={{ backgroundColor: reverse ? 'silver' : '#27b09a', height: 10 }}
        handleStyle={{
          borderColor: 'green',
          height: 28,
          width: 28,
          marginTop: -9,
          backgroundColor: 'white',
        }}
        railStyle={{ backgroundColor: reverse ? '#27b09a' : 'silver', height: 10 }}
      />
      {test(value)}
    </div>
  );
};

export default TimeSlider;

//TODO
// 1 - add ` export * from './time-slider/time-slider'; ` to index.ts

// 2 - add below to create-event.tsx
// <TimeSlider startOrEnd={'Start'} reverse={true}/>
// <TimeSlider startOrEnd={'End'} />

// npm i rc-slider
