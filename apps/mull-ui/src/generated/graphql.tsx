import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type CreateEventInput = {
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  image: MediaInput;
  restriction: Scalars['Int'];
  startDate: Scalars['DateTime'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  registrationMethod: RegistrationMethod;
};

export type Event = {
  __typename?: 'Event';
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  image?: Maybe<Media>;
  restriction: Scalars['Float'];
  startDate: Scalars['DateTime'];
  title: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  accessToken: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  id: Scalars['Float'];
  mediaType: Scalars['String'];
};

export type MediaInput = {
  id: Scalars['Float'];
  mediaType: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addParticipantToEvent: Scalars['Boolean'];
  createEvent: Event;
  createUser: User;
  deleteEvent: Event;
  deleteUser: User;
  login: LoginResult;
  removeParticipantFromEvent: Scalars['Boolean'];
  updateEvent: Event;
  updateUser: User;
  uploadFile: Media;
};

export type MutationAddParticipantToEventArgs = {
  eventId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationRemoveParticipantFromEventArgs = {
  eventId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type MutationUpdateEventArgs = {
  updateEventInput: UpdateEventInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  coHostEvents: Array<Event>;
  discoverEvents: Array<Event>;
  event: Event;
  events: Array<Event>;
  hostEvents: Array<Event>;
  participatingEvents: Array<Event>;
  user: User;
  users: Array<User>;
};

export type QueryCoHostEventsArgs = {
  userId: Scalars['Int'];
};

export type QueryDiscoverEventsArgs = {
  userId: Scalars['Int'];
};

export type QueryEventArgs = {
  id: Scalars['Int'];
};

export type QueryHostEventsArgs = {
  userId: Scalars['Int'];
};

export type QueryParticipatingEventsArgs = {
  userId: Scalars['Int'];
};

export type QueryUserArgs = {
  id: Scalars['Int'];
};

export enum RegistrationMethod {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Local = 'LOCAL',
  Twitter = 'TWITTER',
}

export type UpdateEventInput = {
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  restriction?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  dob?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  description: Scalars['String'];
  dob: Scalars['DateTime'];
  email: Scalars['String'];
  friends: Array<User>;
  id: Scalars['ID'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  registrationMethod: RegistrationMethod;
  timezone: Scalars['String'];
};

export type CreateEventMutationVariables = Exact<{
  createEventInput: CreateEventInput;
}>;

export type CreateEventMutation = { __typename?: 'Mutation' } & {
  createEvent: { __typename?: 'Event' } & Pick<Event, 'id'>;
};

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;

export type UploadFileMutation = { __typename?: 'Mutation' } & {
  uploadFile: { __typename?: 'Media' } & Pick<Media, 'id' | 'mediaType'>;
};

export type FindSpecificEventQueryVariables = Exact<{
  eventId: Scalars['Int'];
}>;

export type FindSpecificEventQuery = { __typename?: 'Query' } & {
  event: { __typename?: 'Event' } & Pick<
    Event,
    'id' | 'title' | 'description' | 'startDate' | 'endDate' | 'restriction'
  >;
};

export type DiscoverEventsQueryVariables = Exact<{
  discoverEventsUserId: Scalars['Int'];
}>;

export type DiscoverEventsQuery = { __typename?: 'Query' } & {
  discoverEvents: Array<
    { __typename?: 'Event' } & Pick<Event, 'id' | 'title' | 'description' | 'startDate' | 'endDate'>
  >;
};

export type GetUsersEventsQueryVariables = Exact<{
  UserId: Scalars['Int'];
}>;

export type GetUsersEventsQuery = { __typename?: 'Query' } & {
  coHostEvents: Array<
    { __typename?: 'Event' } & Pick<Event, 'id' | 'title' | 'description' | 'startDate' | 'endDate'>
  >;
  hostEvents: Array<
    { __typename?: 'Event' } & Pick<Event, 'id' | 'title' | 'description' | 'startDate' | 'endDate'>
  >;
};

export type GetParticipatingEventsQueryVariables = Exact<{
  participatingEventsUserId: Scalars['Int'];
}>;

export type GetParticipatingEventsQuery = { __typename?: 'Query' } & {
  participatingEvents: Array<
    { __typename?: 'Event' } & Pick<Event, 'id' | 'endDate' | 'description' | 'startDate' | 'title'>
  >;
};

export const CreateEventDocument = gql`
  mutation CreateEvent($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
      id
    }
  }
`;
export type CreateEventMutationFn = Apollo.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      createEventInput: // value for 'createEventInput'
 *   },
 * });
 */
export function useCreateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>
) {
  return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(
    CreateEventDocument,
    baseOptions
  );
}
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>;
export const UploadFileDocument = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id
      mediaType
    }
  }
`;
export type UploadFileMutationFn = Apollo.MutationFunction<
  UploadFileMutation,
  UploadFileMutationVariables
>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(
  baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>
) {
  return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(
    UploadFileDocument,
    baseOptions
  );
}
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<
  UploadFileMutation,
  UploadFileMutationVariables
>;
export const FindSpecificEventDocument = gql`
  query FindSpecificEvent($eventId: Int!) {
    event(id: $eventId) {
      id
      title
      description
      startDate
      endDate
      restriction
    }
  }
`;

/**
 * __useFindSpecificEventQuery__
 *
 * To run a query within a React component, call `useFindSpecificEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSpecificEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSpecificEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useFindSpecificEventQuery(
  baseOptions: Apollo.QueryHookOptions<FindSpecificEventQuery, FindSpecificEventQueryVariables>
) {
  return Apollo.useQuery<FindSpecificEventQuery, FindSpecificEventQueryVariables>(
    FindSpecificEventDocument,
    baseOptions
  );
}
export function useFindSpecificEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindSpecificEventQuery, FindSpecificEventQueryVariables>
) {
  return Apollo.useLazyQuery<FindSpecificEventQuery, FindSpecificEventQueryVariables>(
    FindSpecificEventDocument,
    baseOptions
  );
}
export type FindSpecificEventQueryHookResult = ReturnType<typeof useFindSpecificEventQuery>;
export type FindSpecificEventLazyQueryHookResult = ReturnType<typeof useFindSpecificEventLazyQuery>;
export type FindSpecificEventQueryResult = Apollo.QueryResult<
  FindSpecificEventQuery,
  FindSpecificEventQueryVariables
>;
export const DiscoverEventsDocument = gql`
  query DiscoverEvents($discoverEventsUserId: Int!) {
    discoverEvents(userId: $discoverEventsUserId) {
      id
      title
      description
      startDate
      endDate
    }
  }
`;

/**
 * __useDiscoverEventsQuery__
 *
 * To run a query within a React component, call `useDiscoverEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiscoverEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiscoverEventsQuery({
 *   variables: {
 *      discoverEventsUserId: // value for 'discoverEventsUserId'
 *   },
 * });
 */
export function useDiscoverEventsQuery(
  baseOptions: Apollo.QueryHookOptions<DiscoverEventsQuery, DiscoverEventsQueryVariables>
) {
  return Apollo.useQuery<DiscoverEventsQuery, DiscoverEventsQueryVariables>(
    DiscoverEventsDocument,
    baseOptions
  );
}
export function useDiscoverEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DiscoverEventsQuery, DiscoverEventsQueryVariables>
) {
  return Apollo.useLazyQuery<DiscoverEventsQuery, DiscoverEventsQueryVariables>(
    DiscoverEventsDocument,
    baseOptions
  );
}
export type DiscoverEventsQueryHookResult = ReturnType<typeof useDiscoverEventsQuery>;
export type DiscoverEventsLazyQueryHookResult = ReturnType<typeof useDiscoverEventsLazyQuery>;
export type DiscoverEventsQueryResult = Apollo.QueryResult<
  DiscoverEventsQuery,
  DiscoverEventsQueryVariables
>;
export const GetUsersEventsDocument = gql`
  query GetUsersEvents($UserId: Int!) {
    coHostEvents(userId: $UserId) {
      id
      title
      description
      startDate
      endDate
    }
    hostEvents(userId: $UserId) {
      id
      title
      description
      startDate
      endDate
    }
  }
`;

/**
 * __useGetUsersEventsQuery__
 *
 * To run a query within a React component, call `useGetUsersEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersEventsQuery({
 *   variables: {
 *      UserId: // value for 'UserId'
 *   },
 * });
 */
export function useGetUsersEventsQuery(
  baseOptions: Apollo.QueryHookOptions<GetUsersEventsQuery, GetUsersEventsQueryVariables>
) {
  return Apollo.useQuery<GetUsersEventsQuery, GetUsersEventsQueryVariables>(
    GetUsersEventsDocument,
    baseOptions
  );
}
export function useGetUsersEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsersEventsQuery, GetUsersEventsQueryVariables>
) {
  return Apollo.useLazyQuery<GetUsersEventsQuery, GetUsersEventsQueryVariables>(
    GetUsersEventsDocument,
    baseOptions
  );
}
export type GetUsersEventsQueryHookResult = ReturnType<typeof useGetUsersEventsQuery>;
export type GetUsersEventsLazyQueryHookResult = ReturnType<typeof useGetUsersEventsLazyQuery>;
export type GetUsersEventsQueryResult = Apollo.QueryResult<
  GetUsersEventsQuery,
  GetUsersEventsQueryVariables
>;
export const GetParticipatingEventsDocument = gql`
  query GetParticipatingEvents($participatingEventsUserId: Int!) {
    participatingEvents(userId: $participatingEventsUserId) {
      id
      endDate
      description
      startDate
      title
    }
  }
`;

/**
 * __useGetParticipatingEventsQuery__
 *
 * To run a query within a React component, call `useGetParticipatingEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParticipatingEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParticipatingEventsQuery({
 *   variables: {
 *      participatingEventsUserId: // value for 'participatingEventsUserId'
 *   },
 * });
 */
export function useGetParticipatingEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetParticipatingEventsQuery,
    GetParticipatingEventsQueryVariables
  >
) {
  return Apollo.useQuery<GetParticipatingEventsQuery, GetParticipatingEventsQueryVariables>(
    GetParticipatingEventsDocument,
    baseOptions
  );
}
export function useGetParticipatingEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetParticipatingEventsQuery,
    GetParticipatingEventsQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetParticipatingEventsQuery, GetParticipatingEventsQueryVariables>(
    GetParticipatingEventsDocument,
    baseOptions
  );
}
export type GetParticipatingEventsQueryHookResult = ReturnType<
  typeof useGetParticipatingEventsQuery
>;
export type GetParticipatingEventsLazyQueryHookResult = ReturnType<
  typeof useGetParticipatingEventsLazyQuery
>;
export type GetParticipatingEventsQueryResult = Apollo.QueryResult<
  GetParticipatingEventsQuery,
  GetParticipatingEventsQueryVariables
>;
