import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import MessagesPage from './messages-page';

describe('MessagesPage', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <Router history={history}>
        <MessagesPage children="SwipeableRoutes" />
      </Router>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();
    const tree = renderer
      .create(
        <Router history={history}>
          <MessagesPage children="SwipeableRoutes" />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
