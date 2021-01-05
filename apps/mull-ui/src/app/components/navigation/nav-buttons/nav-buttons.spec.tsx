import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import NavButtons from './nav-buttons';

describe('NavButtons', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <Router history={history}>
        <NavButtons />
      </Router>
    );
    expect(baseElement).toBeTruthy();
  });
});

it('button associated with current should be active ', () => {
  const testId = 'map-navlink';

  const history = createMemoryHistory();
  const dom = render(
    <Router history={history}>
      <NavButtons />
    </Router>
  );

  history.push(ROUTES.MAP);
  const element = dom.getByTestId(testId);
  expect(element.classList.contains('active')).toBeTruthy();
});
