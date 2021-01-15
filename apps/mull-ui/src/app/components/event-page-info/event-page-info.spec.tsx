import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { dummyEvent } from '../../../constants';
import EventPageInfo from './event-page-info';

describe('EventPageInfo', () => {
  const history = createMemoryHistory();
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider>
        <Router history={history}>
          <EventPageInfo isJoined={true} isReview={false} event={dummyEvent} />
        </Router>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <MockedProvider>
          <Router history={history}>
            <EventPageInfo isJoined={true} isReview={false} event={dummyEvent} />
          </Router>
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
