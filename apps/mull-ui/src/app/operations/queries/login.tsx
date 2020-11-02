import { gql } from '@apollo/client';

export const GET_LOGIN = gql`
  query getLogin {
    login @client
  }
`;
