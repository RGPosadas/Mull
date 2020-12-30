import React from 'react';
import { render } from '@testing-library/react';

import BottomNavBar from './bot-nav-bar';
import { Router } from 'react-router-dom';

import { createMemoryHistory } from 'history';

import renderer from 'react-test-renderer';

describe('Header', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();

    const { baseElement } = render(
      <Router history={history}>
        <BottomNavBar />
      </Router>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();

    const tree = renderer
      .create(
        <Router history={history}>
          <BottomNavBar />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
