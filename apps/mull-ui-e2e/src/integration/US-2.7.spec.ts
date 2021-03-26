import 'cypress-file-upload';
import { geolocationStub } from '../fixtures';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-2.7: Preview Event (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.mockRefreshRequest();
      cy.viewport(frame.res[0], frame.res[1]);
      cy.visit('http://localhost:4200/create-event', geolocationStub);
    });

    it('should preview an event', () => {
      cy.get('#imageFile').attachFile('../fixtures/trashed-park.jpg');
      cy.get('#startTime').type('12:00');
      cy.get('#endTime').type('23:59');
      cy.get('#eventTitle').type('Title for US-2.7: Preview Event E2E');
      cy.get('.-today').click();
      cy.get('.-today').click();
      cy.get('#description').type('Description for US-2.7: Preview Event E2E');
      cy.get('#location').click();
      cy.get('#location-input-field').should('be.visible');
      cy.get('#location-input-field-option-0').click();
      cy.get('[data-testid=pill-id-0]').click();
      cy.get('.create-event-button').click();
      cy.get('.event-page-button').click();

      cy.visit('http://localhost:4200/home/myevents');
      cy.get('.event-card-container').first().click();

      cy.get('.title').should('have.text', 'Title for US-2.7: Preview Event E2E');
      cy.get('.event-image').should('have.attr', 'src');
      cy.get('[data-testid=start-date-div]').should(
        'have.text',
        `${Cypress.moment().format('D MMM')}12:00 AM`
      );
      cy.get('[data-testid=end-date-div]').should(
        'have.text',
        `${Cypress.moment().format('D MMM')}11:59 PM`
      );
      cy.get('[data-testid=event-page-location]').should('have.text', 'Current Location');
      cy.get('[data-testid=expandable-text-div]').should(
        'have.text',
        'Description for US-2.7: Preview Event E2E'
      );
      cy.get('[data-testid=event-restriction]').should('have.text', 'Everyone');
    });
  });
});
