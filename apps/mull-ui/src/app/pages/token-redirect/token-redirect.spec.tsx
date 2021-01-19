import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { UserProvider } from '../../context/user.context';
import TokenRedirectPage from './token-redirect';

const mockUserProvider = () => ({
  setUserId: jest.fn(),
  userId: null,
  accessToken: null,
  setAccessToken: jest.fn(),
});

describe('TokenRedirectPage', () => {
  const renderHelper = (history: History, token: string, userProvider) => {
    return (
      <UserProvider value={userProvider}>
        <MemoryRouter initialEntries={[`token-redirect/${token}`]}>
          <Route path="token-redirect/:token">
            <TokenRedirectPage history={history} />
          </Route>
        </MemoryRouter>
      </UserProvider>
    );
  };
  it('should render successfully', () => {
    const mockProvider = mockUserProvider();
    const history = createMemoryHistory();
    const { baseElement } = render(renderHelper(history, 'abc123', mockProvider));
    expect(baseElement).toBeTruthy();
  });

  it('should invalidate an access token', async () => {
    const mockProvider = mockUserProvider();
    const history = createMemoryHistory();
    render(renderHelper(history, '123', mockProvider));
    expect(mockProvider.setAccessToken).not.toBeCalled();
    expect(mockProvider.setUserId).not.toBeCalled();
  });

  it('should validate an access token', async () => {
    const mockProvider = mockUserProvider();
    const history = createMemoryHistory();
    render(
      renderHelper(
        history,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTYxMDc1MzYzNiwiZXhwIjoxNjEwNzU0NTM2fQ.AjBTwCmOpPhbse8BGdQzerzEl9LfTDVs5BZZMTfyALw',
        mockProvider
      )
    );
    expect(mockProvider.setAccessToken).toBeCalled();
    expect(mockProvider.setUserId).toBeCalled();
  });
});
