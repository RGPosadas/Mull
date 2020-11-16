/// <reference types="Cypress" />
import 'cypress-file-upload';

const frameSizes = [
  { res: [375, 812], name: 'mobile' },
  { res: [1920, 1080], name: 'desktop' },
];

frameSizes.forEach((frame) => {
  describe(`US-1.1: Create Events (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.viewport(frame.res[0], frame.res[1]);
      cy.visit('http://localhost:4200/create-event');
    });

    it('should preview the file', () => {
      cy.get('[data-testid="file"]').attachFile('../fixtures/zoro.jpg');
      cy.get('.custom-file-upload').find('img').should('have.attr', 'src');
    });

    it('should have the correct page title', () => {
      cy.get('.create-event-text').should('have.text', 'Create Event');
    });

    it('should enter the start time', () => {
      cy.get(':nth-child(5) > [data-testid=custom-time-input]')
        .type('11:20')
        .should('have.value', '11:20');
    });

    it('should enter the end time', () => {
      cy.get(':nth-child(6) > [data-testid=custom-time-input]')
        .type('15:20')
        .should('have.value', '15:20');
    });

    it('should type into the event title input', () => {
      cy.get(':nth-child(7) > [data-testid=custom-text-input]')
        .type('test title')
        .should('have.value', 'test title');
    });

    it('should select today as the start and end date', () => {
      cy.get('.-today').click().should('have.text', new Date().getDate().toString());
      cy.get('.-today').click().should('have.text', new Date().getDate().toString());
    });

    it('should type into the event description input', () => {
      cy.get(':nth-child(8) > [data-testid=custom-text-input]')
        .type('test description')
        .should('have.value', 'test description');
    });
    it('should type into the event location input', () => {
      cy.get(':nth-child(9) > [data-testid=custom-text-input]')
        .type('test location')
        .should('have.value', 'test location');
    });

    it('should change restriction open', () => {
      cy.get('[data-testid=pill-id-1]')
        .click()
        .should('have.css', 'background-color', 'rgb(39, 176, 154)');
      cy.get('[data-testid=pill-id-2]')
        .click()
        .should('have.css', 'background-color', 'rgb(39, 176, 154)');
    });

    it('should show errors when fields are not completed', () => {
      cy.get('.create-event-button').click();
      cy.get(':nth-child(1) > .error-message').should('have.text', 'Image is required.');
      cy.get(':nth-child(6) > .error-message').should('have.text', 'Start Time is required.');
      cy.get(':nth-child(7) > .error-message').should('have.text', 'End Time is required.');
      cy.get(':nth-child(8) > .error-message').should('have.text', 'Event Title is required.');
      cy.get(':nth-child(9) > .error-message').should(
        'have.text',
        'Event Description is required.'
      );
      cy.get(':nth-child(10) > .error-message').should('have.text', 'Event Location is required.');
    });

    it('should show a successful submission message', () => {
      cy.get('[data-testid="file"]').attachFile('../fixtures/zoro.jpg');

      cy.get(':nth-child(5) > [data-testid=custom-time-input]').type('11:20');

      cy.get(':nth-child(6) > [data-testid=custom-time-input]').type('15:20');

      cy.get(':nth-child(7) > [data-testid=custom-text-input]').type('test title');

      cy.get('.-today').click();
      cy.get('.-today').click();

      cy.get(':nth-child(8) > [data-testid=custom-text-input]').type('test description');

      cy.get(':nth-child(9) > [data-testid=custom-text-input]').type('test location');

      cy.get('[data-testid=pill-id-1]').click();
      cy.get('.create-event-button').click();

      cy.get('.Toastify__toast.Toastify__toast--success', { timeout: 1000 }).should(
        'have.css',
        'background-color',
        'rgb(39, 176, 154)'
      );
    });
  });
});
