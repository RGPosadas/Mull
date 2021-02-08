import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../../../src/constants';
import { UserProvider } from '../../../context/user.context';
import EditProfile from './edit-profile';

describe('EditProfile', () => {
  const renderHelper = (history: History) => {
    const setUserId = jest.fn();
    const userId = null;
    const { location } = window;
    // Stops tests from being redirected to OAuth Provider websites
    beforeEach(() => {
      delete window.location;
      window.location = {
        assign: jest.fn(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    });
    afterEach(() => {
      window.location = location;
    });

    return (
      <UserProvider value={{ userId, setUserId }}>
        <Router history={history}>
          <EditProfile />
        </Router>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const { baseElement } = render(<EditProfile />);
    expect(baseElement).toBeTruthy();
  });

  it('should upload an image', async () => {
    window.URL.createObjectURL = jest.fn();
    const history = createMemoryHistory();
    history.push(ROUTES.PROFILE.EDIT);
    const utils = render(renderHelper(history));
    const file = new File(['zoro'], 'zoro.png', { type: 'image/png' });
    const imageInput = utils.getByTestId('file') as HTMLInputElement;
    user.upload(imageInput, file);
    expect(imageInput.files[0]).toStrictEqual(file);
  });

  it('should have validation errors', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.PROFILE.EDIT);
    const utils = render(renderHelper(history));
    const submitButton = utils.container.querySelector('button[class="mull-button save-button"]');

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    const error = utils.container.querySelector('span[class="error-message"]');
    expect(error).toHaveTextContent('Display name is required');
  });

  it('should submit the edit profile form', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.PROFILE.EDIT);
    const utils = render(renderHelper(history));

    window.URL.createObjectURL = jest.fn();
    const file = new File(['zoro'], 'zoro.png', { type: 'image/png' });
    const imageInput = utils.getByTestId('file') as HTMLInputElement;
    user.upload(imageInput, file);

    let input = utils.getByLabelText('Display Name');
    fireEvent.change(input, { target: { value: 'Bob' } });
    input = utils.getByLabelText('Description');
    fireEvent.change(input, { target: { value: 'bob the builder' } });

    const submitButton = utils.container.querySelector('button[class="mull-button save-button"]');

    await waitFor(() => {
      fireEvent.click(submitButton);
    });
  });
});
