import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { createMemoryHistory } from 'history';

import SubNavigationBar from './subnavigation-bar';
import { Router } from 'react-router-dom';
import { ROUTES } from 'apps/mull-ui/src/constants';

describe('SubNavigationBar', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.HOME);

    const { baseElement } = render(
      <Router history={history}>
        <SubNavigationBar />
      </Router>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have the correct button active based on the url', () => {
    const testIds = {
      [ROUTES.HOME]: 'subnavigation-discover-button',
      [`${ROUTES.HOME}/upcoming`]: 'subnavigation-upcoming-button',
      [`${ROUTES.HOME}/myevents`]: 'subnavigation-myEvents-button',
    };
    const history = createMemoryHistory();
    history.push(ROUTES.HOME);

    const utils = render(
      <Router history={history}>
        <SubNavigationBar />
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
          <SubNavigationBar />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
