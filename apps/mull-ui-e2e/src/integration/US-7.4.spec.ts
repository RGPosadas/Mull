/// <reference types="Cypress" />
import 'cypress-file-upload';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-7.4: View Other User Profiles (${frame.name} view)`, () => {
    const mockOtherUser = (friendStatusButton: string) => {
      cy.intercept('POST', 'http://localhost:3333/graphql', (req) => {
        if (req.body.operationName === 'OtherUserProfile') {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                user: {
                  id: 2,
                  name: 'Jamal Muller',
                  description: "Hey y'all it's Jamal!",
                  joinDate: '2021-01-03T00:23:51.000Z',
                  avatar: null,
                  __typename: 'User',
                },
                hostingCount: 2,
                portfolioCount: 1,
                portfolioEvents: [
                  {
                    id: 1,
                    title: "Let's help clean up this place!",
                    restriction: 0,
                    startDate: '2020-04-07T07:49:50.000Z',
                    endDate: '2020-04-07T11:22:12.000Z',
                    location: {
                      title: '2509 Simonis Plains, Lake Boydside, Oregon, 19960',
                      __typename: 'Location',
                    },
                    image: {
                      id: 1,
                      mediaType: 'jpeg',
                      __typename: 'Media',
                    },
                    __typename: 'Event',
                  },
                ],
              },
            },
            delayMs: 1000,
          });
        }
      });
      cy.intercept('POST', 'http://localhost:3333/graphql', (req) => {
        if (req.body.operationName === 'UserRelationship') {
          req.reply({
            statusCode: 200,
            body: {
              data: { getUserRelationship: friendStatusButton },
            },
            delayMs: 1000,
          });
        }
      });
      cy.intercept('POST', 'http://localhost:3333/graphql', (req) => {
        if (req.body.operationName === 'FriendCount') {
          req.reply({
            statusCode: 200,
            body: {
              data: { friendCount: 1 },
            },
            delayMs: 1000,
          });
        }
      });
      cy.visit('http://localhost:4200/user/2');
      /* eslint-disable-next-line cypress/no-unnecessary-waiting */
      cy.wait(2000); // Needed as it takes a while for the mock responses to load
    };

    beforeEach(() => {
      cy.mockRefreshRequest();
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it(`should show a friend's profile`, () => {
      mockOtherUser('FRIENDS');
      cy.get('[data-testid=mull-button]').should('have.text', 'Friends');
    });

    it(`should let the current user remove a friend`, () => {
      mockOtherUser('FRIENDS');
      cy.get('[data-testid=mull-button]').click();
      cy.get('[data-testid=mull-button]').eq(1).click();
      cy.get('[data-testid=mull-button]').should('have.text', 'Add Friend');
    });

    it(`should show a stranger's profile`, () => {
      mockOtherUser('NONE');
      cy.get('[data-testid=mull-button]').should('have.text', 'Add Friend');
    });

    it(`should let the current user add a friend`, () => {
      mockOtherUser('NONE');
      cy.get('[data-testid=mull-button]').click();
      cy.get('[data-testid=mull-button]').should('have.text', 'Pending');
    });

    it(`should show a profile with a pending friend request`, () => {
      mockOtherUser('PENDING_REQUEST');
      cy.get('[data-testid=mull-button]').should('have.text', 'Pending');
    });

    it(`should let the current user cancel a pending friend request`, () => {
      mockOtherUser('PENDING_REQUEST');
      cy.get('[data-testid=mull-button]').click();
      cy.get('[data-testid=mull-button]').eq(1).click();
      cy.get('[data-testid=mull-button]').should('have.text', 'Add Friend');
    });

    it(`should show a user that has added the current user`, () => {
      mockOtherUser('ADDED_ME');
      cy.get('[data-testid=mull-button]').should('have.text', 'Add Friend');
    });

    it(`should let the current user add a friend that has added them`, () => {
      mockOtherUser('ADDED_ME');
      cy.get('[data-testid=mull-button]').click();
      cy.get('[data-testid=mull-button]').should('have.text', 'Friends');
    });
  });
});
