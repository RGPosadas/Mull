import { render } from '@testing-library/react';
import React from 'react';
import { dummyEvent } from '../../../constants';
import EventPageHeader from './event-page-header';

describe('EventPageHeader', () => {
  const renderHelper = () => {
    return (
      <EventPageHeader
        event={dummyEvent}
        prevPage=""
        eventImageURL=""
        headerRef={null}
        setHeaderHeight={null}
      />
    );
  };
  it('should render successfully', () => {
    const { baseElement } = render(renderHelper());
    expect(baseElement).toBeTruthy();
  });

  it('should render dates correctly', () => {
    const dom = render(renderHelper());

    const startDateDiv = dom.getByTestId('start-date-div');
    const endDateDiv = dom.getByTestId('end-date-div');
    expect(startDateDiv.textContent).toBe('15 Jun01:45 PM');
    expect(endDateDiv.textContent).toBe('15 Jun01:45 PM');
  });
});
