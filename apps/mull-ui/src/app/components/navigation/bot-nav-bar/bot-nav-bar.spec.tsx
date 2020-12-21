import React from 'react';
import { render } from '@testing-library/react';

import BottomNavBar from './header';
import { Router } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import { ROUTES } from '../../../constants';

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

  it('button associated with current should be active ', () => {
    const testId = 'profile-mobile-navlink';

    const history = createMemoryHistory();
    const dom = render(
      <Router history={history}>
        <BottomNavBar />
      </Router>
    );

    history.push(ROUTES.PROFILE);
    const element = dom.getByTestId(testId);
    expect(element.classList.contains('active')).toBeTruthy();
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
