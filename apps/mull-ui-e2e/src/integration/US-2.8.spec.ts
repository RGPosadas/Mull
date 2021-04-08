/// <reference types="Cypress" />
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-2.8: Joining Events (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.mockRefreshRequest();
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it('should join an event on the discover event page', () => {
      cy.visit('http://localhost:4200/home/discover');
      cy.get('.event-card-join').first().click();
    });

    it('should join an event on the preview event page', () => {
      cy.visit('http://localhost:4200/home/discover');
      cy.get('[data-testid=discover-tab] > .event-card-container').first().click();
      cy.get('[data-testid=mull-button]').click();
    });

    it('should leave an event on the upcoming event page', () => {
      cy.visit('http://localhost:4200/home/upcoming');
      cy.get('.event-card-join').first().click();
    });

    it('should leave an event on the preview event page', () => {
      cy.visit('http://localhost:4200/home/upcoming');
      cy.get('[data-testid=upcoming-tab] > .event-card-container').first().click();
      cy.get('[data-testid=mull-button]').click();
    });
  });
});
