/// <reference types="Cypress" />
import 'cypress-file-upload';
import * as faker from 'faker';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-7.1: Multiple Registration Options (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it('should fill in the user info and register', () => {
      cy.visit('http://localhost:4200/register');
      cy.get('#name').type('Tyler Uno');
      cy.get('#email').type(faker.internet.email());
      cy.get('#password').type('sup');

      cy.get('.register-button').click();
      cy.get('.Toastify__toast.Toastify__toast--success', { timeout: 5000 }).should(
        'have.css',
        'background-color',
        'rgb(29, 132, 116)'
      );
    });
  });
});
