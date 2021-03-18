import { render } from '@testing-library/react';
import React from 'react';
import { dummyProfilePictures } from '../../../mockdata';
import EventMembers from './event-members';

describe('EventMembers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventMembers profilePictures={dummyProfilePictures} />);
    expect(baseElement).toBeTruthy();
  });
});
