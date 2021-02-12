import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import UserProfilePage from './user-profile';

describe('UserProfilePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        {' '}
        <UserProfilePage />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          {' '}
          <UserProfilePage />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
