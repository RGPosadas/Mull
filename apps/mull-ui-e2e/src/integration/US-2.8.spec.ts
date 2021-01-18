/// <reference types="Cypress" />
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-2.8: Joining Events (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it('should join an event on the discover event page', () => {
      cy.visit('http://localhost:4200/home/discover');
      cy.get('#event-card-join').click();
    });

    it('should join an event on the preview event page', () => {
      cy.visit('http://localhost:4200/home/discover');
      cy.get(':nth-child(1) > .event-card-image').click();
      cy.get('[data-testid=mull-button]').click();
    });

    it('should leave an event on the upcoming event page', () => {
      cy.visit('http://localhost:4200/home/upcoming');
      cy.get('#event-card-join').click();
    });

    it('should leave an event on the preview event page', () => {
      cy.visit('http://localhost:4200/home/upcoming');
      cy.get('.discover-page-tabs-container > :nth-child(1) > .event-card-image').click();
      cy.get('[data-testid=mull-button]').click();
    });
  });
});
