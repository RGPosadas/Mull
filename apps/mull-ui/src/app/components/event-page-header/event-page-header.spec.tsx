import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import EventPageHeader from './event-page-header';
import { dummyEvent } from '../../../constants';

describe('EventPageHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <EventPageHeader event={dummyEvent} prevPage="" eventImageURL="" />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(<EventPageHeader event={dummyEvent} prevPage="" eventImageURL="" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render dates correctly', () => {
    const dom = render(<EventPageHeader event={dummyEvent} prevPage="" eventImageURL="" />);

    const startDateDiv = dom.getByTestId('start-date-div');
    const endDateDiv = dom.getByTestId('end-date-div');
    expect(startDateDiv.textContent).toBe('15 Jun01:45 PM');
    expect(endDateDiv.textContent).toBe('15 Jun01:45 PM');
  });
});
