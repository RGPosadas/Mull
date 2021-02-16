import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { getAccessToken } from './app/access-token';
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

const uploadLink = createUploadLink({
  uri: `${environment.backendUrl}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    credentials: 'include',
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3333/graphql',
  options: {
    reconnect: true,

    connectionParams: {
      authToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE0LCJpYXQiOjE2MTM0NDUyNTgsImV4cCI6MTYxMzQ1NDI1OH0.wS0XH4JAQeWI_uiR3AUqIHcc-84fKv56Ay5kOfTURaU',
    },
  },
});

const httpLink = new HttpLink({
  uri: 'http://localhost:3333/graphql',
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink, splitLink]),
  cache: new InMemoryCache(),
  credentials: 'include',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
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
