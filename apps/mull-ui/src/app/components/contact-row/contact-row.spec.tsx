import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import ContactRow from './contact-row';
describe('ContactRow', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <Router history={history}>
        <ContactRow />
      </Router>
    );
    expect(baseElement).toBeTruthy();
  });
});
