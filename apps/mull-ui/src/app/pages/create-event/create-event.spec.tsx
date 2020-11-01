import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import CreateEventPage from './create-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ROUTES } from '../../../constants';

describe('CreateEvent', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.CREATE_EVENT);

    const { baseElement } = render(
      <MockedProvider>
        <Router history={history}>
          <CreateEventPage history={history} />
        </Router>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have validation errors', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.CREATE_EVENT);
    const utils = render(
      <MockedProvider>
        <Router history={history}>
          <CreateEventPage history={history} />
        </Router>
      </MockedProvider>
    );
    const submitButton = utils.container.querySelector('button[type="submit"]');
    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    const error = utils.container.querySelector('span[class="error-message"]');
    expect(error).toHaveTextContent('End date is required');
  });

  it('should submit a valid event', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.CREATE_EVENT);
    const utils = render(
      <MockedProvider>
        <Router history={history}>
          <CreateEventPage history={history} />
        </Router>
      </MockedProvider>
    );

    let calendarDate = utils.container.querySelector('span[class="nice-dates-day -today"]');
    fireEvent.click(calendarDate);
    calendarDate = utils.container.querySelector('span[class="nice-dates-day"]');
    fireEvent.click(calendarDate);
    let input = utils.getByLabelText('Start Time');
    fireEvent.change(input, { target: { value: '04:20' } });
    input = utils.getByLabelText('End Time');
    fireEvent.change(input, { target: { value: '06:09' } });
    input = utils.getByLabelText('Event Title');
    fireEvent.change(input, { target: { value: 'Clean up at rogers park' } });
    input = utils.getByLabelText('Description');
    fireEvent.change(input, { target: { value: 'Cleanup :)' } });
    input = utils.getByLabelText('Location');
    fireEvent.change(input, { target: { value: 'Rogers Park' } });
    const activeRestriction = utils.container.querySelector(
      'form > div > div.pill-options > div:nth-child(2)'
    );
    fireEvent.click(activeRestriction);

    const submitButton = utils.container.querySelector('button[type="submit"]');
    await waitFor(() => {
      fireEvent.click(submitButton);
    });
  });
});
