import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { environment } from './environments/environment';

import App from './app/app';

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
  uri: environment.backendUrl,
  cache: new InMemoryCache(),
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
