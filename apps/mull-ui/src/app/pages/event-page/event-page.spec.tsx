import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import EventPage from './event-page';
import { dummyEvent } from '../../../constants';

describe('EventPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventPage event={dummyEvent} prevPage="" />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<EventPage event={dummyEvent} prevPage="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
