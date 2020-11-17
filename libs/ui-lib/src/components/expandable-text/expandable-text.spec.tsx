import React from 'react';
import { render } from '@testing-library/react';

import ExpandableText from './expandable-text';

describe('ExpandableText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExpandableText />);
    expect(baseElement).toBeTruthy();
  });
});
