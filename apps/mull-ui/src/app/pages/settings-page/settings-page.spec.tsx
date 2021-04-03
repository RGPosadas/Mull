import { fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import SettingsPage from './settings-page';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockImplementation(async () => {
  return 'void';
});

describe('SettingsPage', () => {
  beforeAll(() => {
    delete window.location;
    window.location = ({ reload: jest.fn() } as unknown) as Location;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<SettingsPage />);
    expect(baseElement).toBeTruthy();
  });

  it('should logout on logout button press', () => {
    const utils = render(<SettingsPage />);

    const logOutButton = utils.getByText('Log Out');
    fireEvent.click(logOutButton);
    expect(mockedAxios.post).toHaveBeenCalled();
  });
});
