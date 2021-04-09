/// <reference types="Cypress" />
import 'cypress-file-upload';
import { geolocationStub } from '../fixtures';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-7.6: Login as a User (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.viewport(frame.res[0], frame.res[1]);
      cy.visit('http://localhost:4200/', geolocationStub);
    });

    it('should login a user', () => {
      cy.get('#email').type('test@email.com');
      cy.get('#password').type('fdsgsfdj');
      cy.intercept('POST', 'http://localhost:3333/graphql', (req) => {
        if (req.body.operationName === 'Login') {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                login: {
                  accessToken:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsImlhdCI6MTYxMTI4OTc5MywiZXhwIjoxNjExMjkzNDM2LCJqdGkiOiJhMmU5NGRjNS03M2MzLTRmYjMtOGM4NS1lZGJiNDhiODlmY2IifQ.d8UHgMh8HglhAXtGj_Szkoctwa-SKBHFxFXQYn6FYHUs',
                  __typename: 'LoginResult',
                },
              },
            },
            delayMs: 1000,
          });
        }
      });
      cy.mockRefreshRequest();
      cy.get('.login').click();
      cy.get('.Toastify__toast.Toastify__toast--success', { timeout: 5000 }).should(
        'have.css',
        'background-color',
        'rgb(29, 132, 116)'
      );
    });
  });
});
