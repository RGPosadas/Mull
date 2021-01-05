import { render } from '@testing-library/react';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
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

  it('should do nothing on click by default', () => {
    const dom = render(<MullButton />);

    const button = dom.getByTestId('mull-button');
    ReactTestUtils.Simulate.click(button);

    expect(button.onclick.call.length).toBe(1);
  });

  it('should run the provided function on click', () => {
    const mockCallback = jest.fn(() => {
      /* Do nothing */
    });
    const dom = render(<MullButton onClick={mockCallback} />);

    const button = dom.getByTestId('mull-button');
    ReactTestUtils.Simulate.click(button);

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
