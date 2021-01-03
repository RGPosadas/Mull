import React from 'react';
import renderer from 'react-test-renderer';
import SubNavBar from './sub-nav-bar';

import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { ROUTES } from '../../../../constants';

describe('SubNavBar', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();

    const { baseElement } = render(
      <Router history={history}>
        <SubNavBar />
      </Router>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have the correct button active based on the url', () => {
    const testIds = {
      [ROUTES.DISCOVER]: 'subnavigation-discover-button',
      [ROUTES.UPCOMING]: 'subnavigation-upcoming-button',
      [ROUTES.MY_EVENTS]: 'subnavigation-myEvents-button',
    };
    const history = createMemoryHistory();

    const utils = render(
      <Router history={history}>
        <SubNavBar />
      </Router>
    );

    for (const [key, value] of Object.entries(testIds)) {
      history.push(key);
      const button = utils.getByTestId(value);
      expect(button.classList.contains('active'));
    }
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();
    const tree = renderer
      .create(
        <Router history={history}>
          <SubNavBar />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
