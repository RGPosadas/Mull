import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import SettingsButton from './settings-button';

describe('ChatBubble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsButton icon={faGraduationCap} />);

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<SettingsButton icon={faGraduationCap} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
