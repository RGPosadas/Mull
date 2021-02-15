import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import ProfileHeader from './profile-header';

describe('ProfileHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileHeader />);

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<ProfileHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
