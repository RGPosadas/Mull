import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import AnnouncementsPage from './announcements';

describe('Announcements', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AnnouncementsPage />);

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<AnnouncementsPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
