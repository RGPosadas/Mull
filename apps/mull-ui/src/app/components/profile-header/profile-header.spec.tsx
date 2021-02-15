import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import ProfileHeader, { checkFriendStatus } from './profile-header';

describe('ProfileHeader', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<ProfileHeader />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<ProfileHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('FriendStatusButton', () => {
  it('should render Friend button successfully', () => {
    const { baseElement, getByText } = render(checkFriendStatus(true));
    expect(getByText('Friends'));
    expect(baseElement).toBeTruthy();
  });

  it('should render Pending button successfully', () => {
    const { baseElement, getByText } = render(checkFriendStatus(false));
    expect(getByText('Pending'));
    expect(baseElement).toBeTruthy();
  });

  it('should render Add Friend button successfully', () => {
    const { baseElement, getByText } = render(checkFriendStatus(null));
    expect(getByText('Add Friend'));
    expect(baseElement).toBeTruthy();
  });
});
