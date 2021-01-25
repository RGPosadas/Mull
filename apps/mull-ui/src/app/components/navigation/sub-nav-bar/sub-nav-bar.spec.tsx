import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ROUTES } from '../../../../constants';
import SubNavBar from './sub-nav-bar';

describe('SubNavBar', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();

    const { baseElement } = render(
      <Router history={history}>
        <SubNavBar routes={[ROUTES.DISCOVER, ROUTES.UPCOMING, ROUTES.MY_EVENTS]} />
      </Router>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have the correct button active based on the url', () => {
    const testIds = {
      [ROUTES.DISCOVER.url]: 'subnavigation-discover-button',
      [ROUTES.UPCOMING.url]: 'subnavigation-upcoming-button',
      [ROUTES.MY_EVENTS.url]: 'subnavigation-myevents-button',
    };
    const history = createMemoryHistory();

    const utils = render(
      <Router history={history}>
        <SubNavBar routes={[ROUTES.DISCOVER, ROUTES.UPCOMING, ROUTES.MY_EVENTS]} />
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
          <SubNavBar routes={[ROUTES.DISCOVER, ROUTES.UPCOMING, ROUTES.MY_EVENTS]} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
