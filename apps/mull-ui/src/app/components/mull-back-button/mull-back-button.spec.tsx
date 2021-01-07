import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import MullBackButton from './mull-back-button';

let mockHistory;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => mockHistory,
}));

describe('MullBackButton', () => {
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<MullBackButton />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<MullBackButton>Back Button</MullBackButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should go to the previous page on click', () => {
    const dom = render(<MullBackButton />);

    mockHistory.push('/path1');
    mockHistory.push('/path2');

    const button = dom.getByTestId('mull-back-button');

    ReactTestUtils.Simulate.click(button);

    expect(mockHistory.location.pathname).toBe('/path1');
  });

  it('should run the provided function on click', () => {
    const mockCallback = jest.fn(() => {
      /* Do nothing */
    });
    const dom = render(<MullBackButton onClick={mockCallback} />);
    const button = dom.getByTestId('mull-back-button');

    ReactTestUtils.Simulate.click(button);

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
