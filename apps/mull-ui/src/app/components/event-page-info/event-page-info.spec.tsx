import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import EventPageInfo from './event-page-info';
import { dummyEvent } from '../../../constants';

describe('EventPageInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventPageInfo event={dummyEvent} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<EventPageInfo event={dummyEvent} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
