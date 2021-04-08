import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { mockUser1 } from '../../../mockdata';
import ChatBubble from './chat-bubble';

describe('ChatBubble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatBubble user={mockUser1} />);

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<ChatBubble user={mockUser1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
