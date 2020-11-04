import React from 'react';
import ReactDOM from 'react-dom';
import { cache } from './cache';

import { ApolloClient, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { environment } from './environments/environment';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(
      function (registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}

const client = new ApolloClient({
  uri: environment.backendUrl, //url of graphql api
  cache: cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
