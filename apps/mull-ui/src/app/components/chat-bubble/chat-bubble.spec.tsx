import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import ChatBubble from './chat-bubble';

describe('ChatBubble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatBubble />);

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<ChatBubble />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
