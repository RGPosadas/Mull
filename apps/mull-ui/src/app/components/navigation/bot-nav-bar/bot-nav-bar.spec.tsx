import React from 'react';
import { render } from '@testing-library/react';

import BotNavBar from './bot-nav-bar';
import { Router } from 'react-router-dom';

import { createMemoryHistory } from 'history';

import renderer from 'react-test-renderer';

describe('BotNavBar', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();

    const { baseElement } = render(
      <Router history={history}>
        <BotNavBar />
      </Router>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();

    const tree = renderer
      .create(
        <Router history={history}>
          <BotNavBar />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
