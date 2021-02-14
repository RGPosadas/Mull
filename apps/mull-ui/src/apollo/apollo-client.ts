import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from '@apollo/client';
import { IAuthToken } from '@mull/types';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { createUploadLink } from 'apollo-upload-client';
import jwtDecode from 'jwt-decode';
import { getAccessToken, setAccessToken } from '../app/access-token';
import { environment } from '../environments/environment';

/**
 * This link is responsible for refreshing the access token when it expires.
 *
 * isTokenValidOrUndefined checks if the access token expired and will
 * call fetchAccessToken if it is.
 *
 * handleFetch is the callback for fetchAccessToken
 */
const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) return true;
    try {
      const { exp }: IAuthToken = jwtDecode(token);
      if (Date.now() >= exp * 1000) return false;
      else return true;
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(`${environment.backendUrl}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  },
});

/**
 * This link is responsible for binding the authorization header
 * on requests.
 *
 * It also provides attaches an observable to requests to re-run them
 * if a 401 HTTP status is returned.
 */
const authLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: ZenObservable.Subscription;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

// This is the link that requests are sent to
const httpLink = new HttpLink({ uri: `${environment.backendUrl}/graphql`, credentials: 'include' });

// This is the link that media upload requests are sent to
const uploadLink = createUploadLink({
  uri: `${environment.backendUrl}/graphql`,
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([tokenRefreshLink, authLink, httpLink, uploadLink]),
  cache: new InMemoryCache(),
  credentials: 'include',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

export default apolloClient;
