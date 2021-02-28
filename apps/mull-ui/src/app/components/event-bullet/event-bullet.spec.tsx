import { render } from '@testing-library/react';
import React from 'react';
import EventBullet from './event-bullet';

const mockEventBulletInput = {
  eventTitle: '',
  eventPicture: '',
  eventDate: new Date(),
};

describe('EventBullet', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <EventBullet
        eventTitle={mockEventBulletInput.eventTitle}
        eventPicture={mockEventBulletInput.eventPicture}
        eventDate={mockEventBulletInput.eventDate}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
