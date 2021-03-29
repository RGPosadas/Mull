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

export type ChannelInput = {
  id: Scalars['Float'];
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

export type CreatePostInput = {
  channel: ChannelInput;
  createdTime: Scalars['DateTime'];
  medias?: Maybe<MediaInput>;
  message: Scalars['String'];
  parentPost?: Maybe<ParentPostInput>;
  reactions?: Maybe<PostReactionInput>;
};

export type CreateUserInput = {
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  joinDate: Scalars['DateTime'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  registrationMethod: RegistrationMethod;
};


export type DirectMessageChannel = {
  __typename?: 'DirectMessageChannel';
  id: Scalars['Int'];
  participants: Array<User>;
  posts: Array<Post>;
};

export type Event = {
  __typename?: 'Event';
  coHosts: Array<User>;
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

export type EventChannel = {
  __typename?: 'EventChannel';
  event?: Maybe<Event>;
  id: Scalars['Int'];
  name: Scalars['String'];
  posts: Array<Post>;
  rights: Scalars['Int'];
};

export type Friend = {
  __typename?: 'Friend';
  avatar?: Maybe<Media>;
  description: Scalars['String'];
  directMessageChannel?: Maybe<DirectMessageChannel>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  friends: Array<User>;
  id: Scalars['Int'];
  joinDate: Scalars['DateTime'];
  latestPost?: Maybe<Post>;
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  registrationMethod: RegistrationMethod;
  timezone: Scalars['String'];
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
  addFriend: Scalars['Boolean'];
  createDirectMessageChannel: DirectMessageChannel;
  createEvent: Event;
  createLocation: Location;
  createUser: User;
  deleteChannel: Scalars['Boolean'];
  deleteEvent: Event;
  deletePost: Post;
  deleteUser: User;
  joinEvent: Scalars['Boolean'];
  leaveEvent: Scalars['Boolean'];
  login: LoginResult;
  post: Post;
  removeFriend: Scalars['Boolean'];
  updateEvent: Event;
  updateFile: Media;
  updatePost: Post;
  updateUser: User;
  uploadFile: Media;
};


export type MutationAddFriendArgs = {
  userIdToAdd: Scalars['Float'];
};


export type MutationCreateDirectMessageChannelArgs = {
  toUserId: Scalars['Int'];
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


export type MutationDeleteChannelArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
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


export type MutationPostArgs = {
  post: CreatePostInput;
};


export type MutationRemoveFriendArgs = {
  userIdToRemove: Scalars['Float'];
};


export type MutationUpdateEventArgs = {
  event: UpdateEventInput;
};


export type MutationUpdateFileArgs = {
  newFile: Scalars['Upload'];
  oldFile: MediaInput;
};


export type MutationUpdatePostArgs = {
  post: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  newAvatar?: Maybe<Scalars['Upload']>;
  userInput: UpdateUserInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};

export type ParentPostInput = {
  id: Scalars['Int'];
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

export type Post = {
  __typename?: 'Post';
  channel: EventChannel;
  createdTime: Scalars['DateTime'];
  id: Scalars['Int'];
  medias?: Maybe<Array<Media>>;
  message: Scalars['String'];
  parentPost?: Maybe<Post>;
  reactions?: Maybe<Array<PostReaction>>;
  user: User;
};

export type PostReaction = {
  __typename?: 'PostReaction';
  id: Scalars['Int'];
  post: Post;
  type: Scalars['Int'];
  user: User;
};

export type PostReactionInput = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  channelPosts: Array<Post>;
  coHostEvents: Array<Event>;
  discoverEvents: Array<Event>;
  event: Event;
  events: Array<Event>;
  friendCount: Scalars['Int'];
  friends: Array<Friend>;
  getChannelByEventId: EventChannel;
  getDirectMessageChannel?: Maybe<DirectMessageChannel>;
  getRelationships: Array<Relationship>;
  getUserRelationship: RelationshipType;
  hostEvents: Array<Event>;
  hostingCount: Scalars['Int'];
  isParticipant: Scalars['Boolean'];
  location: Location;
  participantEvents: Array<Event>;
  portfolioCount: Scalars['Int'];
  posts: Array<Post>;
  user: User;
  users: Array<User>;
};


export type QueryChannelPostsArgs = {
  channelId: Scalars['Int'];
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};


export type QueryGetChannelByEventIdArgs = {
  channelName: Scalars['String'];
  eventId: Scalars['Int'];
};


export type QueryGetDirectMessageChannelArgs = {
  toUserId: Scalars['Int'];
};


export type QueryGetUserRelationshipArgs = {
  userIdB: Scalars['Float'];
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

export type Relationship = {
  __typename?: 'Relationship';
  type: RelationshipType;
  user: User;
};

export enum RelationshipType {
  AddedMe = 'ADDED_ME',
  Friends = 'FRIENDS',
  None = 'NONE',
  PendingRequest = 'PENDING_REQUEST'
}

export type Subscription = {
  __typename?: 'Subscription';
  postAdded: Post;
};


export type SubscriptionPostAddedArgs = {
  channelId: Scalars['Int'];
};

export type UpdateEventInput = {
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  location: LocationInput;
  restriction?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdatePostInput = {
  channel: ChannelInput;
  createdTime: Scalars['DateTime'];
  id: Scalars['Int'];
  medias?: Maybe<MediaInput>;
  message: Scalars['String'];
  parentPost?: Maybe<ParentPostInput>;
  reactions?: Maybe<PostReactionInput>;
};

export type UpdateUserInput = {
  avatar?: Maybe<MediaInput>;
  description?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  avatar?: Maybe<Media>;
  description: Scalars['String'];
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  friends: Array<User>;
  id: Scalars['Int'];
  joinDate: Scalars['DateTime'];
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

export type UpdateUserMutationVariables = Exact<{
  userInput: UpdateUserInput;
  newAvatar?: Maybe<Scalars['Upload']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type CreatePostMutationVariables = Exact<{
  post: CreatePostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { post: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'message'>
  ) }
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
  & Pick<Event, 'id' | 'title' | 'restriction' | 'startDate' | 'endDate'>
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
    & Pick<Event, 'id' | 'title' | 'restriction' | 'startDate' | 'endDate'>
    & { location?: Maybe<(
      { __typename?: 'Location' }
      & Pick<Location, 'title'>
    )>, image?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'mediaType'>
    )> }
  )>, hostEvents: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'restriction' | 'startDate' | 'endDate'>
    & { location?: Maybe<(
      { __typename?: 'Location' }
      & Pick<Location, 'title'>
    )>, image?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'mediaType'>
    )> }
  )> }
);

export type ParticipantEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type ParticipantEventsQuery = (
  { __typename?: 'Query' }
  & { participantEvents: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'restriction' | 'startDate' | 'endDate'>
    & { location?: Maybe<(
      { __typename?: 'Location' }
      & Pick<Location, 'title'>
    )>, image?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'mediaType'>
    )> }
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
    & Pick<User, 'id' | 'name' | 'description'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id'>
    )> }
  ) }
);

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'friendCount' | 'hostingCount' | 'portfolioCount'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'name' | 'description' | 'joinDate'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id'>
    )> }
  ) }
);

export type ChannelByEventIdQueryVariables = Exact<{
  eventId: Scalars['Int'];
  channelName: Scalars['String'];
}>;


export type ChannelByEventIdQuery = (
  { __typename?: 'Query' }
  & { getChannelByEventId: (
    { __typename?: 'EventChannel' }
    & Pick<EventChannel, 'id'>
    & { event?: Maybe<(
      { __typename?: 'Event' }
      & { host: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ), coHosts: Array<(
        { __typename?: 'User' }
        & Pick<User, 'id'>
      )> }
    )>, posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'message' | 'createdTime'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
        & { avatar?: Maybe<(
          { __typename?: 'Media' }
          & Pick<Media, 'id' | 'mediaType'>
        )> }
      ) }
    )> }
  ) }
);

export type FriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsQuery = (
  { __typename?: 'Query' }
  & { friends: Array<(
    { __typename?: 'Friend' }
    & Pick<Friend, 'id' | 'name'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'mediaType'>
    )>, directMessageChannel?: Maybe<(
      { __typename?: 'DirectMessageChannel' }
      & Pick<DirectMessageChannel, 'id'>
    )>, latestPost?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'message'>
    )> }
  )> }
);

export type PostAddedSubscriptionVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type PostAddedSubscription = (
  { __typename?: 'Subscription' }
  & { postAdded: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdTime' | 'message'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'mediaType'>
      )> }
    ) }
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
  endDate
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
export const UpdateUserDocument = gql`
    mutation UpdateUser($userInput: UpdateUserInput!, $newAvatar: Upload) {
  updateUser(userInput: $userInput, newAvatar: $newAvatar) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *      newAvatar: // value for 'newAvatar'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($post: CreatePostInput!) {
  post(post: $post) {
    id
    message
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
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
    id
    title
    restriction
    startDate
    endDate
    location {
      title
    }
    image {
      id
      mediaType
    }
  }
  hostEvents {
    id
    title
    restriction
    startDate
    endDate
    location {
      title
    }
    image {
      id
      mediaType
    }
  }
}
    `;

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
    id
    title
    restriction
    startDate
    endDate
    location {
      title
    }
    image {
      id
      mediaType
    }
  }
}
    `;

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
    description
    avatar {
      id
    }
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
export const UserProfileDocument = gql`
    query UserProfile {
  user {
    name
    description
    joinDate
    avatar {
      id
    }
  }
  friendCount
  hostingCount
  portfolioCount
}
    `;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const ChannelByEventIdDocument = gql`
    query ChannelByEventId($eventId: Int!, $channelName: String!) {
  getChannelByEventId(eventId: $eventId, channelName: $channelName) {
    id
    event {
      host {
        id
      }
      coHosts {
        id
      }
    }
    posts {
      id
      message
      createdTime
      user {
        id
        name
        avatar {
          id
          mediaType
        }
      }
    }
  }
}
    `;

/**
 * __useChannelByEventIdQuery__
 *
 * To run a query within a React component, call `useChannelByEventIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelByEventIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelByEventIdQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      channelName: // value for 'channelName'
 *   },
 * });
 */
export function useChannelByEventIdQuery(baseOptions: Apollo.QueryHookOptions<ChannelByEventIdQuery, ChannelByEventIdQueryVariables>) {
        return Apollo.useQuery<ChannelByEventIdQuery, ChannelByEventIdQueryVariables>(ChannelByEventIdDocument, baseOptions);
      }
export function useChannelByEventIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelByEventIdQuery, ChannelByEventIdQueryVariables>) {
          return Apollo.useLazyQuery<ChannelByEventIdQuery, ChannelByEventIdQueryVariables>(ChannelByEventIdDocument, baseOptions);
        }
export type ChannelByEventIdQueryHookResult = ReturnType<typeof useChannelByEventIdQuery>;
export type ChannelByEventIdLazyQueryHookResult = ReturnType<typeof useChannelByEventIdLazyQuery>;
export type ChannelByEventIdQueryResult = Apollo.QueryResult<ChannelByEventIdQuery, ChannelByEventIdQueryVariables>;
export const FriendsDocument = gql`
    query Friends {
  friends {
    id
    name
    avatar {
      id
      mediaType
    }
    directMessageChannel {
      id
    }
    latestPost {
      id
      message
    }
  }
}
    `;

/**
 * __useFriendsQuery__
 *
 * To run a query within a React component, call `useFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsQuery(baseOptions?: Apollo.QueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
        return Apollo.useQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, baseOptions);
      }
export function useFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
          return Apollo.useLazyQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, baseOptions);
        }
export type FriendsQueryHookResult = ReturnType<typeof useFriendsQuery>;
export type FriendsLazyQueryHookResult = ReturnType<typeof useFriendsLazyQuery>;
export type FriendsQueryResult = Apollo.QueryResult<FriendsQuery, FriendsQueryVariables>;
export const PostAddedDocument = gql`
    subscription PostAdded($channelId: Int!) {
  postAdded(channelId: $channelId) {
    id
    createdTime
    message
    user {
      id
      name
      avatar {
        id
        mediaType
      }
    }
  }
}
    `;

/**
 * __usePostAddedSubscription__
 *
 * To run a query within a React component, call `usePostAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostAddedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function usePostAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<PostAddedSubscription, PostAddedSubscriptionVariables>) {
        return Apollo.useSubscription<PostAddedSubscription, PostAddedSubscriptionVariables>(PostAddedDocument, baseOptions);
      }
export type PostAddedSubscriptionHookResult = ReturnType<typeof usePostAddedSubscription>;
export type PostAddedSubscriptionResult = Apollo.SubscriptionResult<PostAddedSubscription>;