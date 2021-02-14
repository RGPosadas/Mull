import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from '@apollo/client';
import { IAuthToken } from '@mull/types';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { createUploadLink } from 'apollo-upload-client';
import jwtDecode from 'jwt-decode';
import { getAccessToken, setAccessToken } from '../app/access-token';
import { environment } from '../environments/environment';

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

const httpLink = new HttpLink({ uri: `${environment.backendUrl}/graphql`, credentials: 'include' });

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
