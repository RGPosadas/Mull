import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        login: {
          read() {
            return isLoggedIn();
          },
        },
      },
    },
  },
});

const loginInitialValue: boolean = false;

export const isLoggedIn: ReactiveVar<boolean> = makeVar<boolean>(loginInitialValue);
