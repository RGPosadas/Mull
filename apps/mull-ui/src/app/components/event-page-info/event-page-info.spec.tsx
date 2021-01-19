import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { dummyEvent } from '../../../constants';
import EventPageInfo from './event-page-info';

describe('EventPageInfo', () => {
  const renderHelper = (history: History) => {
    return (
      <MockedProvider>
        <Router history={history}>
          <EventPageInfo isJoined={true} isReview={false} event={dummyEvent} />
        </Router>
      </MockedProvider>
    );
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(renderHelper(history));
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();
    const tree = renderer.create(renderHelper(history)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
