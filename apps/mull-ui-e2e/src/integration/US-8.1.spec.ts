/// <reference types="Cypress" />
import 'cypress-file-upload';
import { frameSizes } from './../fixtures/frame-sizes';

const ids = [8101, 8102];

frameSizes.forEach((frame, i) => {
  describe(`US-8.5: Friends List (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it(`should show list of requests from me and other users`, () => {
      cy.mockRefreshRequest();
      cy.wait(1000); // Queries were failing due to the page refreshing too quickly
      cy.visit('http://localhost:4200/profile/add-friends');
    });

    it(`should allow users to create and cancel pending friend requests`, () => {
      cy.mockRefreshRequest();
      const username = 'test1';
      cy.wait(1000); // Queries were failing due to the page refreshing too quickly
      cy.visit('http://localhost:4200/profile/add-friends');
      cy.get('#add-friends-search-input').type(username);
      cy.get(`#add-friends-search-result-8100 > button`).click();
      cy.get('.friend-modal-button').eq(1).click();
      cy.get(`#pending-request-8100> button`).click();
      cy.get('.friend-modal-button').eq(1).click();
    });

    it(`should allow users to accept requests from other people`, () => {
      cy.mockRefreshRequest();
      cy.wait(1000); // Queries were failing due to the page refreshing too quickly
      cy.visit('http://localhost:4200/profile/add-friends');
      cy.get(`#added-me-${ids[i]} > button`).first().click();
      cy.get('.friend-modal-button').eq(1).click();
      cy.get(`#added-me-${ids[i]}`).should('not.exist');
    });
  });
});
