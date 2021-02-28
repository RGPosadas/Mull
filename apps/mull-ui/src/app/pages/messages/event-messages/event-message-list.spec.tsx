import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import EventMessageList from './event-message-list';

describe('EventMessageList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventMessageList />);
    expect(baseElement).toBeTruthy();
  });
  it('should match snapshot', () => {
    const tree = renderer.create(<EventMessageList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
