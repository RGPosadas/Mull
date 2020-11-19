import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import MullBackButton from './mull-back-button';

describe('MullBackButton', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <Router history={history}>
        <MullBackButton history={history} />
      </Router>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();
    const tree = renderer
      .create(
        <Router history={history}>
          {' '}
          <MullBackButton history={history}>Back Button</MullBackButton>{' '}
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should go to the previous page on click', () => {
    const history = createMemoryHistory();
    const dom = render(<MullBackButton history={history} />);

    history.push('/path1');
    history.push('/path2');

    const button = dom.getByTestId('mull-back-button');

    ReactTestUtils.Simulate.click(button);

    expect(history.location.pathname).toBe('/path1');
  });

  it('should run the provided function on click', () => {
    const mockCallback = jest.fn(() => {
      /* Do nothing */
    });
    const history = createMemoryHistory();
    const dom = render(<MullBackButton onClick={mockCallback} history={history} />);
    const button = dom.getByTestId('mull-back-button');

    ReactTestUtils.Simulate.click(button);

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
