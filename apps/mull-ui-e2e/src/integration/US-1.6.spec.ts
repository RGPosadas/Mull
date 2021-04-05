import 'cypress-file-upload';
import * as faker from 'faker';
import { geolocationStub } from '../fixtures';
import { frameSizes } from './../fixtures/frame-sizes';

/**
 * Helper function to register
 * @param email
 * @param password
 */
const registerUser = (email: string, password: string) => {
  cy.visit('http://localhost:4200/register');
  cy.get('#name').type('Tyler Uno');
  cy.get('#email').type(email);
  cy.get('#password').type(password);

  cy.get('.register-button').click();
  cy.get('.Toastify__toast.Toastify__toast--success', { timeout: 5000 }).should(
    'have.css',
    'background-color',
    'rgb(39, 176, 154)'
  );
};
/**
 * Helper function to login
 * @param username
 * @param password
 */
const loginUser = (username: string, password: string) => {
  cy.get('#email').type(username);
  cy.get('#password').type(password);
  cy.get('.login').click();
  cy.get('.Toastify__toast.Toastify__toast--success', { timeout: 5000 }).should(
    'have.css',
    'background-color',
    'rgb(39, 176, 154)'
  );
};
/**
 * Helper function to create event
 * @param date
 * @param pillId
 */
const createEvent = (date, pillId = 0) => {
  cy.get('#imageFile').attachFile('../fixtures/trashed-park.jpg');

  cy.get('.rc-slider-handle')
    .first()
    .should('have.attr', 'aria-valuenow', 12)
    .type('{leftarrow}'.repeat(50));

  cy.get('.rc-slider-handle')
    .last()
    .should('have.attr', 'aria-valuenow', 12)
    .type('{rightarrow}'.repeat(50));

  cy.get('#eventTitle').type(date.toString());

  cy.get('.-today').click();
  cy.get('.-today').click();

  cy.get('#description').type('test description');

  cy.get('#location').click();
  cy.get('#location-input-field').should('be.visible');

  cy.get('#location-input-field-option-0', { timeout: 5000 }).click();
  cy.get(`[data-testid=pill-id-${pillId}]`).click();
  cy.get('.create-event-button').click();
  cy.get('.event-page-button').click();

  cy.get('.Toastify__toast.Toastify__toast--success', { timeout: 5000 }).should(
    'have.css',
    'background-color',
    'rgb(39, 176, 154)'
  );
};

frameSizes.forEach((frame) => {
  describe(`US-1.6: Event Restriction (${frame.name} view)`, () => {
    // email and password to be used for registration and all following tests.
    const userName = faker.internet.email();
    const password = 'password';

    before(() => {
      registerUser(userName, password);
    });

    beforeEach(() => {
      cy.viewport(frame.res[0], frame.res[1]);
      cy.visit('http://localhost:4200/login');
      loginUser(userName, password);
    });

    it('should show a public event on the discover page', () => {
      const currentDate = new Date();
      cy.visit('http://localhost:4200/create-event', geolocationStub);
      createEvent(currentDate);
      cy.mockRefreshRequest(-999);
      cy.visit('http://localhost:4200/home/discover');
      cy.contains(currentDate.toString()).should('exist');
    });

    it('should not show private event on discover page', () => {
      const currentDate = new Date();
      cy.visit('http://localhost:4200/create-event', geolocationStub);
      createEvent(currentDate, 2); // set event as private
      cy.mockRefreshRequest(-999);
      cy.visit('http://localhost:4200/home/discover');
      cy.contains(currentDate.toString()).should('not.exist');
    });
  });
});
