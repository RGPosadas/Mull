import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { UploadFileDocument } from '../../../generated/graphql';
import CreateEventPage from './create-event';

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

  it('should upload an image', async () => {
    window.URL.createObjectURL = jest.fn();
    const history = createMemoryHistory();
    history.push(ROUTES.CREATE_EVENT);
    const utils = render(
      <MockedProvider>
        <Router history={history}>
          <CreateEventPage history={history} />
        </Router>
      </MockedProvider>
    );
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const imageInput = utils.getByTestId('file') as HTMLInputElement;
    await waitFor(() => {
      user.upload(imageInput, file);
    });

    expect(imageInput.files[0]).toStrictEqual(file);
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
    const submitButton = utils.container.querySelector(
      'button[class="mull-button create-event-button"]'
    );
    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    const error = utils.container.querySelector('span[class="error-message"]');
    expect(error).toHaveTextContent('Image is required');
  });

  it('should submit a valid event', async () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const mocks = [
      {
        request: {
          query: UploadFileDocument,
          variables: {
            file: file,
          },
        },
        result: {
          data: {
            uploadFile: {
              id: '1',
              mediaType: 'jpg',
            },
          },
        },
      },
    ];

    const history = createMemoryHistory();
    history.push(ROUTES.CREATE_EVENT);
    const utils = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <CreateEventPage history={history} />
        </Router>
      </MockedProvider>
    );

    const imageInput = utils.getByTestId('file');
    await waitFor(() => {
      user.upload(imageInput, file);
    });

    let calendarDate = utils.container.querySelector('span[class="nice-dates-day -today"]');
    fireEvent.click(calendarDate);
    calendarDate = utils.container.querySelector('span[class="nice-dates-day -outside"]');
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
    const activeRestriction = utils.container.querySelector('.pill-options > div:nth-child(2)');
    fireEvent.click(activeRestriction);

    const submitButton = utils.container.querySelector(
      'button[class="mull-button create-event-button"]'
    );
    await waitFor(() => {
      fireEvent.click(submitButton);
    });
  });
});
