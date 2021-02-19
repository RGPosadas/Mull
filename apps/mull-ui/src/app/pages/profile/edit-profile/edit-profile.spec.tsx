import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer, { act as actRenderer } from 'react-test-renderer';
import { ROUTES } from '../../../../../src/constants';
import { UserDocument, UserQuery } from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import EditProfile from './edit-profile';

describe('EditProfile', () => {
  const renderHelper = (history, mocks: MockedResponse[]) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <EditProfile history={history} />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.PROFILE.EDIT);

    const { baseElement } = render(renderHelper(history, null));
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: UserDocument,
        },
        result: {
          data: {
            user: {
              id: 1,
              name: 'Jane Doe',
              description: 'a description',
              avatar: null,
            },
          } as UserQuery,
        },
      },
    ];

    const history = createMemoryHistory();
    history.push(ROUTES.PROFILE.DISPLAY);
    await actRenderer(async () => {
      const tree = renderer.create(renderHelper(history, mocks));
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  it('should have validation errors', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.PROFILE.EDIT);
    const mocks: MockedResponse[] = [
      {
        request: {
          query: UserDocument,
        },
        result: {
          data: {
            user: {
              id: 1,
              name: '',
              description: 'a description',
              avatar: null,
            },
          } as UserQuery,
        },
      },
    ];

    await act(async () => {
      const utils = render(renderHelper(history, mocks));
      await new Promise((resolve) => setTimeout(resolve, 100));
      const saveButton = utils.container.querySelector('button[data-testid="mull-button"]');

      await waitFor(() => {
        fireEvent.click(saveButton);
      });

      const error = utils.container.querySelector('span[class="error-message"]');
      expect(error).toHaveTextContent('Display name is required');
    });
  });

  it('should submit the edit profile form', async () => {
    const history = createMemoryHistory();
    history.push(ROUTES.PROFILE.EDIT);
    const mocks: MockedResponse[] = [
      {
        request: {
          query: UserDocument,
        },
        result: {
          data: {
            user: {
              id: 1,
              name: 'Jane Doe',
              description: 'a description',
              avatar: null,
            },
          } as UserQuery,
        },
      },
    ];

    await act(async () => {
      const utils = render(renderHelper(history, mocks));
      await new Promise((resolve) => setTimeout(resolve, 100));

      window.URL.createObjectURL = jest.fn();
      const file = new File(['zoro'], 'zoro.png', { type: 'image/png' });
      const imageInput = utils.getByTestId('file') as HTMLInputElement;
      await waitFor(() => {
        user.upload(imageInput, file);
      });
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
});
