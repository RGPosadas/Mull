/// <reference types="Cypress" />
import 'cypress-file-upload';
import { geolocationStub } from '../fixtures';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-5.1: Tool To Identify Types Of Waste (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.mockRefreshRequest();
      cy.viewport(frame.res[0], frame.res[1]);
      cy.visit('http://localhost:4200/camera', geolocationStub);
    });

    it('should preview the file', () => {
      cy.get('[data-testid=waste-recognition-page-video]').should('exist');
    });
  });
});
