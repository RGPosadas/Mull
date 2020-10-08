import React from 'react';
import { render } from '@testing-library/react';

import NavigationBar from './navigation-bar';
import { Router } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import { ROUTES } from '../../../constants';

import renderer from 'react-test-renderer';

describe('NavigationBar', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.HOME);

    const { baseElement } = render(
      <Router history={history}>
        <NavigationBar />
      </Router>
    );

    expect(baseElement).toBeTruthy();
  });

  it('button associated with current should be active ', () => {
    const testIds = {
      [ROUTES.HOME]: 'home-navlink',
      [ROUTES.MAP]: 'map-navlink',
      [ROUTES.CREATE_EVENT]: 'create-event-navlink',
      [ROUTES.TOOLS]: 'tools-navlink',
      [ROUTES.PROFILE]: 'profile-navlink',
    };

    const history = createMemoryHistory();
    const dom = render(
      <Router history={history}>
        <NavigationBar />
      </Router>
    );

    for (const key in ROUTES) {
      history.push(ROUTES[key]);

      const element = dom.getByTestId(testIds[ROUTES[key]]);

      expect(element.classList.contains('active')).toBeTruthy();
    }
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();

    const tree = renderer
      .create(
        <Router history={history}>
          <NavigationBar />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
