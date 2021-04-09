import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React from 'react';
import { getStringTime } from '../../../utilities';
import './time-slider.scss';

export interface TimeSliderProps {
  ariaLabel: string;
  label: string;
  reverse?: boolean;
  time: number;
  onTimeChange: (time: number) => void;
  hasErrors: boolean;
  errorMessage: string;
}

export const TimeSlider = ({
  ariaLabel,
  label,
  reverse,
  time,
  onTimeChange,
  hasErrors,
  errorMessage,
}: TimeSliderProps) => {
  return (
    <div className="custom-slider-container">
      <div className="custom-text-input-label">
        {label} {getStringTime(time)}
      </div>
      <Slider
        ariaLabelForHandle={ariaLabel}
        className="custom-slider-style"
        min={0}
        max={23.75}
        step={0.25}
        value={time}
        onChange={onTimeChange}
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
      {hasErrors && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export default TimeSlider;
