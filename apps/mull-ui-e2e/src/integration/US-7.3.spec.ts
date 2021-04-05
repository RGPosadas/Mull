/// <reference types="Cypress" />
import 'cypress-file-upload';
import * as faker from 'faker';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-7.3: User Portfolio (${frame.name} view)`, () => {
    const email = faker.internet.email();

    beforeEach(() => {
      cy.mockRefreshRequest();
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it(`should show the user's portfolio`, () => {
      cy.visit('http://localhost:4200/profile/portfolio');
      cy.intercept('POST', 'http://localhost:3333/graphql', (req) => {
        if (req.body.operationName === 'UserPortfolioEvents') {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                portfolioEvents: [
                  {
                    id: 7,
                    title: 'recusandae libero consectetur vitae saepe accusantium',
                    restriction: 0,
                    startDate: '2021-03-20T00:39:10.000Z',
                    endDate: '2021-03-29T09:29:04.000Z',
                    location: {
                      title: '0474 Reichel Stream, McGlynnland, Arizona, 06761',
                      __typename: 'Location',
                    },
                    image: { id: 7, mediaType: 'jpeg', __typename: 'Media' },
                    __typename: 'Event',
                  },
                ],
              },
            },
            delayMs: 1000,
          });
        }
      });
      cy.get('.user-portfolio-title').should('have.text', 'My Portfolio');
      cy.get('.event-card-container').first().click();
    });
  });
});
