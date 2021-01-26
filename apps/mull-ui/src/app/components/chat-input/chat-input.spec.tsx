import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import ChatInput from './chat-input';

describe('ChatInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatInput />);

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<ChatInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
