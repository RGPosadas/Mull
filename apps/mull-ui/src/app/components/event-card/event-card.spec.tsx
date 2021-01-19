import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { dummyEvent } from '../../../constants';
import EventCard from './event-card';

describe('EventCard', () => {
  const renderHelper = (history: History) => {
    return (
      <MockedProvider>
        <Router history={history}>
          <EventCard event={dummyEvent} />
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

  it('should render dates correctly', () => {
    const history = createMemoryHistory();
    const dom = render(renderHelper(history));

    const dateDiv = dom.getByTestId('event-card-datetime');
    expect(dateDiv.textContent).toBe('15 JUN01:45PM');
  });
});
