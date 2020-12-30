import React from 'react';
import { render } from '@testing-library/react';

import TopNavBar from './top-nav-bar';
import { Router } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import { ROUTES } from '../../../../constants';

import renderer from 'react-test-renderer';

describe('NavigationBar', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();

    const { baseElement } = render(
      <Router history={history}>
        <TopNavBar />
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
      [ROUTES.PROFILE]: 'profile-desktop-navlink',
      [ROUTES.MESSAGES]: 'messages-navlink',
    };

    const history = createMemoryHistory();
    const dom = render(
      <Router history={history}>
        <TopNavBar />
      </Router>
    );

    for (const [key, value] of Object.entries(testIds)) {
      history.push(key);
      const element = dom.getByTestId(value);
      expect(element.classList.contains('active')).toBeTruthy();
    }
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();

    const tree = renderer
      .create(
        <Router history={history}>
          <TopNavBar />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
