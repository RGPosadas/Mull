import React from 'react';
import { render } from '@testing-library/react';

import EventMembers from './event-members';
import { dummyProfilePictures } from '../../../constants';

describe('EventMembers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventMembers profilePictures={dummyProfilePictures} />);
    expect(baseElement).toBeTruthy();
  });
});
