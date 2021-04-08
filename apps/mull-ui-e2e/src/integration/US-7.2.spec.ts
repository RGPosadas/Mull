/// <reference types="Cypress" />
import 'cypress-file-upload';
import * as faker from 'faker';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-7.2: Müll Profile (${frame.name} view)`, () => {
    const email = faker.internet.email();
    before(() => {
      cy.visit('http://localhost:4200/register');
      cy.get('#name').type('Andrea Gloria');
      cy.get('#email').type(email);
      cy.get('#password').type('password');
      cy.get('.register-button').click();
    });

    beforeEach(() => {
      cy.viewport(frame.res[0], frame.res[1]);
      cy.interceptGraphQLReqs();
    });

    it(`should show the user's expected profile`, () => {
      cy.visit('http://localhost:4200/login');
      cy.get('#email').type(email);
      cy.get('#password').type('password');
      cy.get('.login').click().wait('@Login');
      cy.visit('http://localhost:4200/profile');

      cy.get('[data-testid=userName]').should('have.text', 'Andrea Gloria');
      cy.get('[data-testid=expandable-text-div]').should('have.text', '');
      cy.get('[data-testid=friendCount]').should('have.text', '0Friends');
      cy.get('[data-testid=portfolioCount]').should('have.text', '0Portfolio');
      cy.get('[data-testid=hostingCount]').should('have.text', '0Hosting');
    });

    it(`should show the user's updated profile`, () => {
      cy.visit('http://localhost:4200/login');
      cy.get('#email').type(email);
      cy.get('#password').type('password');
      cy.get('.login').click().wait('@Login');
      cy.visit('http://localhost:4200/profile/edit').wait('@User');
      cy.get('#description').clear().type('This is my updated description!');
      cy.get('.save-button').click();

      cy.get('[data-testid=userName]').should('have.text', 'Andrea Gloria');
      cy.get('[data-testid=expandable-text-div]').should(
        'have.text',
        'This is my updated description!'
      );
      cy.get('[data-testid=friendCount]').should('have.text', '0Friends');
      cy.get('[data-testid=portfolioCount]').should('have.text', '0Portfolio');
      cy.get('[data-testid=hostingCount]').should('have.text', '0Hosting');
    });
  });
});
