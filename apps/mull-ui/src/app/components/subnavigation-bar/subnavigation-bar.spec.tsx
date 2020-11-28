import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { createMemoryHistory } from 'history';

import SubNavigationBar from './subnavigation-bar';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../constants';

describe('SubNavigationBar', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();

    const { baseElement } = render(
      <Router history={history}>
        <SubNavigationBar />
      </Router>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have the correct button active based on the url', () => {
    const testIds = {
      [ROUTES.DISCOVER]: 'subnavigation-discover-button',
      [`${ROUTES.UPCOMING}`]: 'subnavigation-upcoming-button',
      [`${ROUTES.MYEVENTS}`]: 'subnavigation-myEvents-button',
    };
    const history = createMemoryHistory();

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
