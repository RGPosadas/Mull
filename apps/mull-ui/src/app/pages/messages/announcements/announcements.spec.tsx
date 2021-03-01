import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { UserProvider } from '../../../context/user.context';
import AnnouncementsPage from './announcements';

describe('Announcements', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <AnnouncementsPage />
      </UserProvider>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
          <AnnouncementsPage />
        </UserProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
