/// <reference types="Cypress" />
import 'cypress-file-upload';
import { geolocationStub } from '../fixtures';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-1.1: Create Events (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.mockRefreshRequest();
      cy.viewport(frame.res[0], frame.res[1]);
      cy.visit('http://localhost:4200/create-event', geolocationStub);
    });

    it('should preview the file', () => {
      cy.get('#imageFile').attachFile('../fixtures/trashed-park.jpg');
      cy.get('.image-uploaded').find('img').should('have.attr', 'src');
    });

    it('should have the correct page title', () => {
      cy.get('.create-event-text').should('have.text', 'Create Event');
    });

    it('should enter the start time', () => {
      cy.get('.rc-slider-handle')
        .first()
        .should('have.attr', 'aria-valuenow', 12)
        .type('{leftarrow}');
      cy.get('.rc-slider-handle').first().should('have.attr', 'aria-valuenow', 11.75);
    });

    it('should enter the end time', () => {
      cy.get('.rc-slider-handle')
        .last()
        .should('have.attr', 'aria-valuenow', 12)
        .type('{leftarrow}');
      cy.get('.rc-slider-handle').last().should('have.attr', 'aria-valuenow', 11.75);
    });

    it('should go past 11:45pm inclusive', () => {
      cy.get('.rc-slider-handle')
        .first()
        .should('have.attr', 'aria-valuenow', 12)
        .type('{rightArrow}'.repeat(50));
      cy.get('.rc-slider-handle').first().should('have.attr', 'aria-valuenow', 23.75);

      cy.get('.rc-slider-handle')
        .last()
        .should('have.attr', 'aria-valuenow', 12)
        .type('{rightArrow}'.repeat(50));
      cy.get('.rc-slider-handle').last().should('have.attr', 'aria-valuenow', 23.75);
    });

    it('should not go before 12:00am inclusive', () => {
      cy.get('.rc-slider-handle')
        .first()
        .should('have.attr', 'aria-valuenow', 12)
        .type('{leftArrow}'.repeat(50));
      cy.get('.rc-slider-handle').first().should('have.attr', 'aria-valuenow', 0);

      cy.get('.rc-slider-handle')
        .last()
        .should('have.attr', 'aria-valuenow', 12)
        .type('{leftArrow}'.repeat(50));
      cy.get('.rc-slider-handle').last().should('have.attr', 'aria-valuenow', 0);
    });

    it('should type into the event title input', () => {
      cy.get('#eventTitle').type('test title').should('have.value', 'test title');
    });

    it('should select today as the start and end date', () => {
      cy.get('.-today').click().should('contain.text', new Date().getDate().toString());
      cy.get('.-today').click().should('contain.text', new Date().getDate().toString());
    });

    it('should type into the event description input', () => {
      cy.get('#description').type('test description').should('have.value', 'test description');
    });

    it('should type into the event location modal and return autocompleted address', () => {
      cy.get('#location').click();
      cy.get('#location-input-field').should('be.visible');
      cy.get('#location-input-field').type('845 Rue Sherbrooke');
      cy.get('#location-input-field-option-0', { timeout: 3500 }).should(
        'contain.text',
        '845 Rue Sherbrooke'
      );
      cy.get('#location-input-field-option-0').click();
    });

    it('should click current location on event location modal', () => {
      cy.get('#location').click();
      cy.get('#location-input-field').should('be.visible');
      cy.get('#location-input-field-option-0').click();
      cy.get('#location').invoke('val').should('contain', 'Current Location');
    });

    it('should click the event location modal and exit with edit button', () => {
      cy.get('#location').click();
      cy.get('#location-input-field').should('be.visible');
      cy.get('.mull-back-button').click();
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
      cy.get('.custom-file-upload-container > .error-message').should(
        'have.text',
        'Image is required.'
      );
      cy.get('#eventTitle ~ .error-message').should('have.text', 'Event Title is required.');
      cy.get('.textarea-create-event-container > .error-message').should(
        'have.text',
        'Event Description is required.'
      );
      cy.get('#location ~ .error-message').should('have.text', 'Event Location is required.');
    });

    const fillEventForm = () => {
      cy.get('#imageFile').attachFile('../fixtures/trashed-park.jpg');

      cy.get('.rc-slider-handle').first().should('have.attr', 'aria-valuenow', 12);
      cy.get('.rc-slider-handle').last().should('have.attr', 'aria-valuenow', 12);

      cy.get('#eventTitle').type('test title');

      cy.get('#description').type('test description');

      cy.get('#location').click();

      cy.get('#location-input-field-option-0', { timeout: 5000 }).click();
      cy.get('[data-testid=pill-id-1]').click();
    };

    it('should show an error when end time is greater than start time if the event is on the same day', () => {
      fillEventForm();

      cy.get('.-today').click();
      cy.get('.-today').click();

      cy.get('.rc-slider-handle').first().type('{rightarrow}');

      cy.get('.rc-slider-handle').last().type('{leftarrow}');

      cy.get('.create-event-button').click();

      cy.get('.rc-slider ~ .error-message')
        .last()
        .should('have.text', 'The end time must be after the start time.');
    });

    it('should not show an error when end time is greater than start time if the event is on different days', () => {
      fillEventForm();

      const tomorrow = new Date().getDate() + 1;
      cy.get('.-today').click();
      cy.contains(tomorrow).click();

      cy.get('.create-event-button').click();

      cy.get('#endTime ~ .error-message').should('not.exist');
    });

    it('should show a successful submission message', () => {
      cy.get('#imageFile').attachFile('../fixtures/trashed-park.jpg');

      cy.get('.rc-slider-handle')
        .first()
        .should('have.attr', 'aria-valuenow', 12)
        .type('{leftArrow}'.repeat(4));

      cy.get('.rc-slider-handle')
        .last()
        .should('have.attr', 'aria-valuenow', 12)
        .type('{rightArrow}');

      cy.get('#eventTitle').type('test title');

      cy.get('.-today').click();
      cy.get('.-today').click();

      cy.get('#description').type('test description');

      cy.get('#location').click();
      cy.get('#location-input-field').should('be.visible');

      cy.get('#location-input-field').type('845 Rue Sherbrooke');
      cy.get('#location-input-field-option-0', { timeout: 3500 }).should(
        'contain.text',
        '845 Rue Sherbrooke'
      );

      cy.get('#location-input-field-option-0', { timeout: 5000 }).click();
      cy.get('[data-testid=pill-id-1]').click();
      cy.get('.create-event-button').click();
      cy.get('.event-page-button').click();

      cy.get('.Toastify__toast.Toastify__toast--success', { timeout: 5000 }).should(
        'have.css',
        'background-color',
        'rgb(39, 176, 154)'
      );
    });
  });
});
