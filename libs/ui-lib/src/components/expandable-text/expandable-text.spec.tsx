import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import ExpandableText from './expandable-text';

describe('ExpandableText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExpandableText>Text</ExpandableText>);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<ExpandableText>Text</ExpandableText>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show all text and hide button if cutoff is too big', () => {
    const dom = render(<ExpandableText cutoff={100}>Text</ExpandableText>);

    const div = dom.getByTestId('expandable-text-div');

    expect(div.textContent).toBe('Text');
    const button = dom.queryByTestId('expandable-text-button');

    expect(button).toBe(null);
  });

  it('should cutoff text by default', () => {
    const dom = render(<ExpandableText cutoff={2}>Text</ExpandableText>);

    const div = dom.getByTestId('expandable-text-div');

    expect(div.textContent).toBe('Te... more');
  });

  it('should show all text on press', () => {
    const dom = render(<ExpandableText cutoff={2}>Text</ExpandableText>);

    const div = dom.getByTestId('expandable-text-div');
    const button = dom.getByTestId('expandable-text-button');

    ReactTestUtils.Simulate.click(button);

    expect(div.textContent).toBe('Text less');
  });
});
