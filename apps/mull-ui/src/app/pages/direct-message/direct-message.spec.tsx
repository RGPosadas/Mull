import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import DirectMessagePage from './direct-message';

describe('DirectMessage', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <Router history={history}>
        <DirectMessagePage />
      </Router>
    );
    expect(baseElement).toBeTruthy();
  });
});
