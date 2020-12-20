import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import DiscoverPage from './discover';
import { ROUTES } from '../../../constants';

describe('discoverPage', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.DISCOVER);

    const { baseElement } = render(
      <MockedProvider>
        <Router history={history}>
          <DiscoverPage />
        </Router>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render eventCards within the discover page', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.DISCOVER);

    const utils = render(
      <MockedProvider>
        <Router history={history}>
          <DiscoverPage />
        </Router>
      </MockedProvider>
    );
    const eventCards = utils.container.querySelector('.event-card-container');
    expect(eventCards).toBeTruthy();
  });
});
