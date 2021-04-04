import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { mockUser1 } from '../../../mockdata';
import ContactRow from './contact-row';
describe('ContactRow', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <Router history={history}>
        <ContactRow user={mockUser1} />
      </Router>
    );
    expect(baseElement).toBeTruthy();
  });
});
