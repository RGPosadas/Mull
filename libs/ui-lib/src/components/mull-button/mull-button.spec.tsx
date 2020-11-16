import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import MullButton from './mull-button';

describe('MullButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MullButton />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<MullButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should run the provided function on click', () => {
    const mockCallback = jest.fn(() => {
      /* Do nothing */
    });
    const dom = render(<MullButton onClick={mockCallback} />);

    const button = dom.getByTestId('mull-button');
    button.dispatchEvent(new MouseEvent('click'));

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
