/// <reference types="Cypress" />
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-2.1: Show events as a list discover page (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.mockRefreshRequest();
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it('should see a list of events on all tabs', () => {
      cy.visit('http://localhost:4200/home/discover');
      cy.get('a.subnavigation-link').then(($subnav) => {
        $subnav[1].click();
      });
      cy.get('a.subnavigation-link').eq(1).should('have.css', 'color', 'rgb(29, 132, 116)');
      cy.get('a.subnavigation-link').then(($subnav) => {
        $subnav[2].click();
      });
      cy.get('a.subnavigation-link').eq(2).should('have.css', 'color', 'rgb(29, 132, 116)');
      cy.get('.event-card-container').should('be.visible');
    });
  });
});
