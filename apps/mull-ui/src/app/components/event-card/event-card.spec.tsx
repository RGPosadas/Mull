import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import EventCard from './event-card';
import { dummyEvent } from '../../../constants';

describe('EventCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventCard event={dummyEvent} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<EventCard event={dummyEvent} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render dates correctly', () => {
    const dom = render(<EventCard event={dummyEvent} />);

    const dateDiv = dom.getByTestId('event-card-datetime');
    expect(dateDiv.textContent).toBe('Jan 112:00 AM');
  });
});
