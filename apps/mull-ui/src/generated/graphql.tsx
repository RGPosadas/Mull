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
  location: LocationInput;
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
  host: User;
  id: Scalars['Int'];
  image?: Maybe<Media>;
  location?: Maybe<Location>;
  restriction: Scalars['Float'];
  startDate: Scalars['DateTime'];
  title: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  coordinates?: Maybe<Point>;
  id: Scalars['Int'];
  placeId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type LocationInput = {
  coordinates?: Maybe<PointInput>;
  placeId?: Maybe<Scalars['String']>;
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
  createEvent: Event;
  createLocation: Location;
  createUser: User;
  deleteEvent: Event;
  deleteUser: User;
  joinEvent: Scalars['Boolean'];
  leaveEvent: Scalars['Boolean'];
  login: LoginResult;
  updateEvent: Event;
  updateUser: User;
  uploadFile: Media;
};


export type MutationCreateEventArgs = {
  event: CreateEventInput;
};


export type MutationCreateLocationArgs = {
  location: LocationInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};


export type MutationJoinEventArgs = {
  eventId: Scalars['Int'];
};


export type MutationLeaveEventArgs = {
  eventId: Scalars['Int'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUpdateEventArgs = {
  event: UpdateEventInput;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};

export type Point = {
  __typename?: 'Point';
  id: Scalars['Int'];
  lat: Scalars['Float'];
  long: Scalars['Float'];
};

export type PointInput = {
  lat: Scalars['Float'];
  long: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  coHostEvents: Array<Event>;
  discoverEvents: Array<Event>;
  event: Event;
  events: Array<Event>;
  hostEvents: Array<Event>;
  isParticipant: Scalars['Boolean'];
  location: Location;
  participantEvents: Array<Event>;
  user: User;
  users: Array<User>;
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};


export type QueryIsParticipantArgs = {
  eventId: Scalars['Int'];
};


export type QueryLocationArgs = {
  id: Scalars['Int'];
};

export enum RegistrationMethod {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Local = 'LOCAL',
  Twitter = 'TWITTER'
}

export type UpdateEventInput = {
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  location: LocationInput;
  restriction?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  dob?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  description: Scalars['String'];
  dob: Scalars['DateTime'];
  email: Scalars['String'];
  friends: Array<User>;
  id: Scalars['Int'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  registrationMethod: RegistrationMethod;
  timezone: Scalars['String'];
};

export type CreateEventMutationVariables = Exact<{
  event: CreateEventInput;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent: (
    { __typename?: 'Event' }
    & Pick<Event, 'id'>
  ) }
);

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadFileMutation = (
  { __typename?: 'Mutation' }
  & { uploadFile: (
    { __typename?: 'Media' }
    & Pick<Media, 'id' | 'mediaType'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'accessToken'>
  ) }
);

export type JoinEventMutationVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type JoinEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinEvent'>
);

export type LeaveEventMutationVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type LeaveEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveEvent'>
);

export type EventPageContentFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'title' | 'description' | 'startDate' | 'endDate' | 'restriction'>
  & { location?: Maybe<(
    { __typename?: 'Location' }
    & Pick<Location, 'title'>
  )>, image?: Maybe<(
    { __typename?: 'Media' }
    & Pick<Media, 'id' | 'mediaType'>
  )>, host: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  ) }
);

export type EventCardContentFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'title' | 'restriction' | 'startDate'>
  & { location?: Maybe<(
    { __typename?: 'Location' }
    & Pick<Location, 'title'>
  )>, image?: Maybe<(
    { __typename?: 'Media' }
    & Pick<Media, 'id' | 'mediaType'>
  )> }
);

export type DiscoverEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type DiscoverEventsQuery = (
  { __typename?: 'Query' }
  & { discoverEvents: Array<(
    { __typename?: 'Event' }
    & EventCardContentFragment
  )> }
);

export type OwnedEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type OwnedEventsQuery = (
  { __typename?: 'Query' }
  & { coHostEvents: Array<(
    { __typename?: 'Event' }
    & EventCardContentFragment
  )>, hostEvents: Array<(
    { __typename?: 'Event' }
    & EventCardContentFragment
  )> }
);

export type ParticipantEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type ParticipantEventsQuery = (
  { __typename?: 'Query' }
  & { participantEvents: Array<(
    { __typename?: 'Event' }
    & EventCardContentFragment
  )> }
);

export type EventPageQueryVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type EventPageQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isParticipant'>
  & { event: (
    { __typename?: 'Event' }
    & EventPageContentFragment
  ) }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  ) }
);

export const EventPageContentFragmentDoc = gql`
    fragment EventPageContent on Event {
  id
  title
  description
  startDate
  endDate
  restriction
  location {
    title
  }
  image {
    id
    mediaType
  }
  host {
    id
    name
  }
}
    `;
export const EventCardContentFragmentDoc = gql`
    fragment EventCardContent on Event {
  id
  title
  restriction
  startDate
  location {
    title
  }
  image {
    id
    mediaType
  }
}
    `;
export const CreateEventDocument = gql`
    mutation CreateEvent($event: CreateEventInput!) {
  createEvent(event: $event) {
    id
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

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
 *      event: // value for 'event'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, baseOptions);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const UploadFileDocument = gql`
    mutation UploadFile($file: Upload!) {
  uploadFile(file: $file) {
    id
    mediaType
  }
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

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
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, baseOptions);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const JoinEventDocument = gql`
    mutation JoinEvent($eventId: Int!) {
  joinEvent(eventId: $eventId)
}
    `;
export type JoinEventMutationFn = Apollo.MutationFunction<JoinEventMutation, JoinEventMutationVariables>;

/**
 * __useJoinEventMutation__
 *
 * To run a mutation, you first call `useJoinEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinEventMutation, { data, loading, error }] = useJoinEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useJoinEventMutation(baseOptions?: Apollo.MutationHookOptions<JoinEventMutation, JoinEventMutationVariables>) {
        return Apollo.useMutation<JoinEventMutation, JoinEventMutationVariables>(JoinEventDocument, baseOptions);
      }
export type JoinEventMutationHookResult = ReturnType<typeof useJoinEventMutation>;
export type JoinEventMutationResult = Apollo.MutationResult<JoinEventMutation>;
export type JoinEventMutationOptions = Apollo.BaseMutationOptions<JoinEventMutation, JoinEventMutationVariables>;
export const LeaveEventDocument = gql`
    mutation LeaveEvent($eventId: Int!) {
  leaveEvent(eventId: $eventId)
}
    `;
export type LeaveEventMutationFn = Apollo.MutationFunction<LeaveEventMutation, LeaveEventMutationVariables>;

/**
 * __useLeaveEventMutation__
 *
 * To run a mutation, you first call `useLeaveEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveEventMutation, { data, loading, error }] = useLeaveEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useLeaveEventMutation(baseOptions?: Apollo.MutationHookOptions<LeaveEventMutation, LeaveEventMutationVariables>) {
        return Apollo.useMutation<LeaveEventMutation, LeaveEventMutationVariables>(LeaveEventDocument, baseOptions);
      }
export type LeaveEventMutationHookResult = ReturnType<typeof useLeaveEventMutation>;
export type LeaveEventMutationResult = Apollo.MutationResult<LeaveEventMutation>;
export type LeaveEventMutationOptions = Apollo.BaseMutationOptions<LeaveEventMutation, LeaveEventMutationVariables>;
export const DiscoverEventsDocument = gql`
    query DiscoverEvents {
  discoverEvents {
    ...EventCardContent
  }
}
    ${EventCardContentFragmentDoc}`;

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
 *   },
 * });
 */
export function useDiscoverEventsQuery(baseOptions?: Apollo.QueryHookOptions<DiscoverEventsQuery, DiscoverEventsQueryVariables>) {
        return Apollo.useQuery<DiscoverEventsQuery, DiscoverEventsQueryVariables>(DiscoverEventsDocument, baseOptions);
      }
export function useDiscoverEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiscoverEventsQuery, DiscoverEventsQueryVariables>) {
          return Apollo.useLazyQuery<DiscoverEventsQuery, DiscoverEventsQueryVariables>(DiscoverEventsDocument, baseOptions);
        }
export type DiscoverEventsQueryHookResult = ReturnType<typeof useDiscoverEventsQuery>;
export type DiscoverEventsLazyQueryHookResult = ReturnType<typeof useDiscoverEventsLazyQuery>;
export type DiscoverEventsQueryResult = Apollo.QueryResult<DiscoverEventsQuery, DiscoverEventsQueryVariables>;
export const OwnedEventsDocument = gql`
    query OwnedEvents {
  coHostEvents {
    ...EventCardContent
  }
  hostEvents {
    ...EventCardContent
  }
}
    ${EventCardContentFragmentDoc}`;

/**
 * __useOwnedEventsQuery__
 *
 * To run a query within a React component, call `useOwnedEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOwnedEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnedEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOwnedEventsQuery(baseOptions?: Apollo.QueryHookOptions<OwnedEventsQuery, OwnedEventsQueryVariables>) {
        return Apollo.useQuery<OwnedEventsQuery, OwnedEventsQueryVariables>(OwnedEventsDocument, baseOptions);
      }
export function useOwnedEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OwnedEventsQuery, OwnedEventsQueryVariables>) {
          return Apollo.useLazyQuery<OwnedEventsQuery, OwnedEventsQueryVariables>(OwnedEventsDocument, baseOptions);
        }
export type OwnedEventsQueryHookResult = ReturnType<typeof useOwnedEventsQuery>;
export type OwnedEventsLazyQueryHookResult = ReturnType<typeof useOwnedEventsLazyQuery>;
export type OwnedEventsQueryResult = Apollo.QueryResult<OwnedEventsQuery, OwnedEventsQueryVariables>;
export const ParticipantEventsDocument = gql`
    query ParticipantEvents {
  participantEvents {
    ...EventCardContent
  }
}
    ${EventCardContentFragmentDoc}`;

/**
 * __useParticipantEventsQuery__
 *
 * To run a query within a React component, call `useParticipantEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useParticipantEventsQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantEventsQuery, ParticipantEventsQueryVariables>) {
        return Apollo.useQuery<ParticipantEventsQuery, ParticipantEventsQueryVariables>(ParticipantEventsDocument, baseOptions);
      }
export function useParticipantEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantEventsQuery, ParticipantEventsQueryVariables>) {
          return Apollo.useLazyQuery<ParticipantEventsQuery, ParticipantEventsQueryVariables>(ParticipantEventsDocument, baseOptions);
        }
export type ParticipantEventsQueryHookResult = ReturnType<typeof useParticipantEventsQuery>;
export type ParticipantEventsLazyQueryHookResult = ReturnType<typeof useParticipantEventsLazyQuery>;
export type ParticipantEventsQueryResult = Apollo.QueryResult<ParticipantEventsQuery, ParticipantEventsQueryVariables>;
export const EventPageDocument = gql`
    query EventPage($eventId: Int!) {
  isParticipant(eventId: $eventId)
  event(id: $eventId) {
    ...EventPageContent
  }
}
    ${EventPageContentFragmentDoc}`;

/**
 * __useEventPageQuery__
 *
 * To run a query within a React component, call `useEventPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventPageQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventPageQuery(baseOptions: Apollo.QueryHookOptions<EventPageQuery, EventPageQueryVariables>) {
        return Apollo.useQuery<EventPageQuery, EventPageQueryVariables>(EventPageDocument, baseOptions);
      }
export function useEventPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventPageQuery, EventPageQueryVariables>) {
          return Apollo.useLazyQuery<EventPageQuery, EventPageQueryVariables>(EventPageDocument, baseOptions);
        }
export type EventPageQueryHookResult = ReturnType<typeof useEventPageQuery>;
export type EventPageLazyQueryHookResult = ReturnType<typeof useEventPageLazyQuery>;
export type EventPageQueryResult = Apollo.QueryResult<EventPageQuery, EventPageQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    id
    name
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;