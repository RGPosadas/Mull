import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import SettingsButton from './settings-button';

describe('ChatBubble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsButton />);

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<SettingsButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
