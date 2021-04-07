import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ISerializedEvent } from '@mull/types';
import { GetThreeRandomParticipantsDocument } from '../../../generated/graphql';
import React from 'react';
import renderer, { act as actRenderer } from 'react-test-renderer';
import { EventMembers } from '..';
import { dummyEvent } from '../../../mockdata';

describe('EventMembers', () => {
  const renderHelper = (mocks: MockedResponse[], event: ISerializedEvent) => {
    return (
      <MockedProvider mocks={mocks}>
        <EventMembers eventId={event.id} />
      </MockedProvider>
    );
  };

  it('should render successfully', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GetThreeRandomParticipantsDocument,
          variables: { eventId: dummyEvent.id },
        },
        result: {
          data: { participants: dummyEvent.participants },
        },
      },
    ];

    await actRenderer(async () => {
      const tree = renderer.create(renderHelper(mocks, dummyEvent));
      await new Promise((resolve) => setTimeout(resolve, 200));
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
