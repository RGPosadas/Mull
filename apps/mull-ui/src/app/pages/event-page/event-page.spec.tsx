import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import EventPage from './event-page';
import { dummyEvent } from '../../../constants';

describe('EventPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventPage event={dummyEvent} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<EventPage event={dummyEvent} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
