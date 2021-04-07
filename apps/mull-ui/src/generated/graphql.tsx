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
  media?: Maybe<MediaInput>;
  message?: Maybe<Scalars['String']>;
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
  removePendingRequest: Scalars['Boolean'];
  updateEvent: Event;
  updateFile: Media;
  updatePost: Post;
  updateUser: User;
  uploadFile: Media;
};


export type MutationAddFriendArgs = {
  userIdToAdd: Scalars['Int'];
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
  userIdToRemove: Scalars['Int'];
};


export type MutationRemovePendingRequestArgs = {
  userIdToRemove: Scalars['Int'];
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
  media?: Maybe<Media>;
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
  getStrangers: Array<User>;
  getTrueFriends: Array<User>;
  getUserRelationship: RelationshipType;
  hostEvents: Array<Event>;
  hostingCount: Scalars['Int'];
  isParticipant: Scalars['Boolean'];
  location: Location;
  participantEvents: Array<Event>;
  portfolioCount: Scalars['Int'];
  portfolioEvents: Array<Event>;
  posts: Array<Post>;
  threeParticipant: Array<User>;
  user: User;
  userPortfolioEvents: Array<Event>;
  users: Array<User>;
};


export type QueryChannelPostsArgs = {
  channelId: Scalars['Int'];
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};


export type QueryFriendCountArgs = {
  id: Scalars['Int'];
};


export type QueryGetChannelByEventIdArgs = {
  channelName: Scalars['String'];
  eventId: Scalars['Int'];
};


export type QueryGetDirectMessageChannelArgs = {
  toUserId: Scalars['Int'];
};


export type QueryGetStrangersArgs = {
  searchInput: Scalars['String'];
};


export type QueryGetUserRelationshipArgs = {
  userIdB: Scalars['Int'];
};


export type QueryHostingCountArgs = {
  id: Scalars['Int'];
};


export type QueryIsParticipantArgs = {
  eventId: Scalars['Int'];
};


export type QueryLocationArgs = {
  id: Scalars['Int'];
};


export type QueryPortfolioCountArgs = {
  id: Scalars['Int'];
};


export type QueryPortfolioEventsArgs = {
  id: Scalars['Int'];
};


export type QueryThreeParticipantArgs = {
  eventId: Scalars['Int'];
};


export type QueryUserArgs = {
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
  media?: Maybe<MediaInput>;
  message?: Maybe<Scalars['String']>;
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
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'mediaType'>
    )> }
  ) }
);

export type AddFriendMutationVariables = Exact<{
  userIdToAdd: Scalars['Int'];
}>;


export type AddFriendMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addFriend'>
);

export type RemoveFriendMutationVariables = Exact<{
  userIdToRemove: Scalars['Int'];
}>;


export type RemoveFriendMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFriend'>
);

export type RemovePendingRequestMutationVariables = Exact<{
  userIdToRemove: Scalars['Int'];
}>;


export type RemovePendingRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removePendingRequest'>
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
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id'>
    )> }
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

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


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

export type UserProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


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

export type UserPortfolioEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserPortfolioEventsQuery = (
  { __typename?: 'Query' }
  & { userPortfolioEvents: Array<(
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

export type OtherUserProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type OtherUserProfileQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hostingCount' | 'portfolioCount'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'description' | 'joinDate'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id'>
    )> }
  ), portfolioEvents: Array<(
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

export type FriendCountQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FriendCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'friendCount'>
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
      ), media?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'mediaType'>
      )> }
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

export type UserRelationshipQueryVariables = Exact<{
  userIdB: Scalars['Int'];
}>;


export type UserRelationshipQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getUserRelationship'>
);

export type GetRelationshipsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRelationshipsQuery = (
  { __typename?: 'Query' }
  & { getRelationships: Array<(
    { __typename?: 'Relationship' }
    & Pick<Relationship, 'type'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'mediaType'>
      )> }
    ) }
  )> }
);

export type GetStrangersQueryVariables = Exact<{
  searchInput: Scalars['String'];
}>;


export type GetStrangersQuery = (
  { __typename?: 'Query' }
  & { getStrangers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'mediaType'>
    )> }
  )> }
);

export type EventTitleQueryVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type EventTitleQuery = (
  { __typename?: 'Query' }
  & { event: (
    { __typename?: 'Event' }
    & Pick<Event, 'title'>
  ) }
);

export type GetTrueFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrueFriendsQuery = (
  { __typename?: 'Query' }
  & { getTrueFriends: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'mediaType' | 'id'>
    )> }
  )> }
);

export type GetThreeRandomParticipantsQueryVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type GetThreeRandomParticipantsQuery = (
  { __typename?: 'Query' }
  & { threeParticipant: Array<(
    { __typename?: 'User' }
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id'>
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
    avatar {
      id
    }
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
    media {
      id
      mediaType
    }
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
export const AddFriendDocument = gql`
    mutation AddFriend($userIdToAdd: Int!) {
  addFriend(userIdToAdd: $userIdToAdd)
}
    `;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      userIdToAdd: // value for 'userIdToAdd'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, baseOptions);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation RemoveFriend($userIdToRemove: Int!) {
  removeFriend(userIdToRemove: $userIdToRemove)
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      userIdToRemove: // value for 'userIdToRemove'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, baseOptions);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const RemovePendingRequestDocument = gql`
    mutation RemovePendingRequest($userIdToRemove: Int!) {
  removePendingRequest(userIdToRemove: $userIdToRemove)
}
    `;
export type RemovePendingRequestMutationFn = Apollo.MutationFunction<RemovePendingRequestMutation, RemovePendingRequestMutationVariables>;

/**
 * __useRemovePendingRequestMutation__
 *
 * To run a mutation, you first call `useRemovePendingRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePendingRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePendingRequestMutation, { data, loading, error }] = useRemovePendingRequestMutation({
 *   variables: {
 *      userIdToRemove: // value for 'userIdToRemove'
 *   },
 * });
 */
export function useRemovePendingRequestMutation(baseOptions?: Apollo.MutationHookOptions<RemovePendingRequestMutation, RemovePendingRequestMutationVariables>) {
        return Apollo.useMutation<RemovePendingRequestMutation, RemovePendingRequestMutationVariables>(RemovePendingRequestDocument, baseOptions);
      }
export type RemovePendingRequestMutationHookResult = ReturnType<typeof useRemovePendingRequestMutation>;
export type RemovePendingRequestMutationResult = Apollo.MutationResult<RemovePendingRequestMutation>;
export type RemovePendingRequestMutationOptions = Apollo.BaseMutationOptions<RemovePendingRequestMutation, RemovePendingRequestMutationVariables>;
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
    query User($id: Int!) {
  user(id: $id) {
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserProfileDocument = gql`
    query UserProfile($id: Int!) {
  user(id: $id) {
    name
    description
    joinDate
    avatar {
      id
    }
  }
  friendCount(id: $id)
  hostingCount(id: $id)
  portfolioCount(id: $id)
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const UserPortfolioEventsDocument = gql`
    query UserPortfolioEvents {
  userPortfolioEvents {
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
 * __useUserPortfolioEventsQuery__
 *
 * To run a query within a React component, call `useUserPortfolioEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPortfolioEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPortfolioEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserPortfolioEventsQuery(baseOptions?: Apollo.QueryHookOptions<UserPortfolioEventsQuery, UserPortfolioEventsQueryVariables>) {
        return Apollo.useQuery<UserPortfolioEventsQuery, UserPortfolioEventsQueryVariables>(UserPortfolioEventsDocument, baseOptions);
      }
export function useUserPortfolioEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPortfolioEventsQuery, UserPortfolioEventsQueryVariables>) {
          return Apollo.useLazyQuery<UserPortfolioEventsQuery, UserPortfolioEventsQueryVariables>(UserPortfolioEventsDocument, baseOptions);
        }
export type UserPortfolioEventsQueryHookResult = ReturnType<typeof useUserPortfolioEventsQuery>;
export type UserPortfolioEventsLazyQueryHookResult = ReturnType<typeof useUserPortfolioEventsLazyQuery>;
export type UserPortfolioEventsQueryResult = Apollo.QueryResult<UserPortfolioEventsQuery, UserPortfolioEventsQueryVariables>;
export const OtherUserProfileDocument = gql`
    query OtherUserProfile($id: Int!) {
  user(id: $id) {
    id
    name
    description
    joinDate
    avatar {
      id
    }
  }
  hostingCount(id: $id)
  portfolioCount(id: $id)
  portfolioEvents(id: $id) {
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
 * __useOtherUserProfileQuery__
 *
 * To run a query within a React component, call `useOtherUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useOtherUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOtherUserProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOtherUserProfileQuery(baseOptions: Apollo.QueryHookOptions<OtherUserProfileQuery, OtherUserProfileQueryVariables>) {
        return Apollo.useQuery<OtherUserProfileQuery, OtherUserProfileQueryVariables>(OtherUserProfileDocument, baseOptions);
      }
export function useOtherUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OtherUserProfileQuery, OtherUserProfileQueryVariables>) {
          return Apollo.useLazyQuery<OtherUserProfileQuery, OtherUserProfileQueryVariables>(OtherUserProfileDocument, baseOptions);
        }
export type OtherUserProfileQueryHookResult = ReturnType<typeof useOtherUserProfileQuery>;
export type OtherUserProfileLazyQueryHookResult = ReturnType<typeof useOtherUserProfileLazyQuery>;
export type OtherUserProfileQueryResult = Apollo.QueryResult<OtherUserProfileQuery, OtherUserProfileQueryVariables>;
export const FriendCountDocument = gql`
    query FriendCount($id: Int!) {
  friendCount(id: $id)
}
    `;

/**
 * __useFriendCountQuery__
 *
 * To run a query within a React component, call `useFriendCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendCountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFriendCountQuery(baseOptions: Apollo.QueryHookOptions<FriendCountQuery, FriendCountQueryVariables>) {
        return Apollo.useQuery<FriendCountQuery, FriendCountQueryVariables>(FriendCountDocument, baseOptions);
      }
export function useFriendCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendCountQuery, FriendCountQueryVariables>) {
          return Apollo.useLazyQuery<FriendCountQuery, FriendCountQueryVariables>(FriendCountDocument, baseOptions);
        }
export type FriendCountQueryHookResult = ReturnType<typeof useFriendCountQuery>;
export type FriendCountLazyQueryHookResult = ReturnType<typeof useFriendCountLazyQuery>;
export type FriendCountQueryResult = Apollo.QueryResult<FriendCountQuery, FriendCountQueryVariables>;
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
      media {
        id
        mediaType
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
export const UserRelationshipDocument = gql`
    query UserRelationship($userIdB: Int!) {
  getUserRelationship(userIdB: $userIdB)
}
    `;

/**
 * __useUserRelationshipQuery__
 *
 * To run a query within a React component, call `useUserRelationshipQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRelationshipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRelationshipQuery({
 *   variables: {
 *      userIdB: // value for 'userIdB'
 *   },
 * });
 */
export function useUserRelationshipQuery(baseOptions: Apollo.QueryHookOptions<UserRelationshipQuery, UserRelationshipQueryVariables>) {
        return Apollo.useQuery<UserRelationshipQuery, UserRelationshipQueryVariables>(UserRelationshipDocument, baseOptions);
      }
export function useUserRelationshipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRelationshipQuery, UserRelationshipQueryVariables>) {
          return Apollo.useLazyQuery<UserRelationshipQuery, UserRelationshipQueryVariables>(UserRelationshipDocument, baseOptions);
        }
export type UserRelationshipQueryHookResult = ReturnType<typeof useUserRelationshipQuery>;
export type UserRelationshipLazyQueryHookResult = ReturnType<typeof useUserRelationshipLazyQuery>;
export type UserRelationshipQueryResult = Apollo.QueryResult<UserRelationshipQuery, UserRelationshipQueryVariables>;
export const GetRelationshipsDocument = gql`
    query GetRelationships {
  getRelationships {
    user {
      id
      name
      avatar {
        id
        mediaType
      }
    }
    type
  }
}
    `;

/**
 * __useGetRelationshipsQuery__
 *
 * To run a query within a React component, call `useGetRelationshipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRelationshipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelationshipsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRelationshipsQuery(baseOptions?: Apollo.QueryHookOptions<GetRelationshipsQuery, GetRelationshipsQueryVariables>) {
        return Apollo.useQuery<GetRelationshipsQuery, GetRelationshipsQueryVariables>(GetRelationshipsDocument, baseOptions);
      }
export function useGetRelationshipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRelationshipsQuery, GetRelationshipsQueryVariables>) {
          return Apollo.useLazyQuery<GetRelationshipsQuery, GetRelationshipsQueryVariables>(GetRelationshipsDocument, baseOptions);
        }
export type GetRelationshipsQueryHookResult = ReturnType<typeof useGetRelationshipsQuery>;
export type GetRelationshipsLazyQueryHookResult = ReturnType<typeof useGetRelationshipsLazyQuery>;
export type GetRelationshipsQueryResult = Apollo.QueryResult<GetRelationshipsQuery, GetRelationshipsQueryVariables>;
export const GetStrangersDocument = gql`
    query GetStrangers($searchInput: String!) {
  getStrangers(searchInput: $searchInput) {
    id
    name
    avatar {
      id
      mediaType
    }
  }
}
    `;

/**
 * __useGetStrangersQuery__
 *
 * To run a query within a React component, call `useGetStrangersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStrangersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStrangersQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useGetStrangersQuery(baseOptions: Apollo.QueryHookOptions<GetStrangersQuery, GetStrangersQueryVariables>) {
        return Apollo.useQuery<GetStrangersQuery, GetStrangersQueryVariables>(GetStrangersDocument, baseOptions);
      }
export function useGetStrangersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStrangersQuery, GetStrangersQueryVariables>) {
          return Apollo.useLazyQuery<GetStrangersQuery, GetStrangersQueryVariables>(GetStrangersDocument, baseOptions);
        }
export type GetStrangersQueryHookResult = ReturnType<typeof useGetStrangersQuery>;
export type GetStrangersLazyQueryHookResult = ReturnType<typeof useGetStrangersLazyQuery>;
export type GetStrangersQueryResult = Apollo.QueryResult<GetStrangersQuery, GetStrangersQueryVariables>;
export const EventTitleDocument = gql`
    query EventTitle($eventId: Int!) {
  event(id: $eventId) {
    title
  }
}
    `;

/**
 * __useEventTitleQuery__
 *
 * To run a query within a React component, call `useEventTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventTitleQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventTitleQuery(baseOptions: Apollo.QueryHookOptions<EventTitleQuery, EventTitleQueryVariables>) {
        return Apollo.useQuery<EventTitleQuery, EventTitleQueryVariables>(EventTitleDocument, baseOptions);
      }
export function useEventTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventTitleQuery, EventTitleQueryVariables>) {
          return Apollo.useLazyQuery<EventTitleQuery, EventTitleQueryVariables>(EventTitleDocument, baseOptions);
        }
export type EventTitleQueryHookResult = ReturnType<typeof useEventTitleQuery>;
export type EventTitleLazyQueryHookResult = ReturnType<typeof useEventTitleLazyQuery>;
export type EventTitleQueryResult = Apollo.QueryResult<EventTitleQuery, EventTitleQueryVariables>;
export const GetTrueFriendsDocument = gql`
    query GetTrueFriends {
  getTrueFriends {
    id
    name
    avatar {
      mediaType
      id
    }
  }
}
    `;

/**
 * __useGetTrueFriendsQuery__
 *
 * To run a query within a React component, call `useGetTrueFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrueFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrueFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTrueFriendsQuery(baseOptions?: Apollo.QueryHookOptions<GetTrueFriendsQuery, GetTrueFriendsQueryVariables>) {
        return Apollo.useQuery<GetTrueFriendsQuery, GetTrueFriendsQueryVariables>(GetTrueFriendsDocument, baseOptions);
      }
export function useGetTrueFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrueFriendsQuery, GetTrueFriendsQueryVariables>) {
          return Apollo.useLazyQuery<GetTrueFriendsQuery, GetTrueFriendsQueryVariables>(GetTrueFriendsDocument, baseOptions);
        }
export type GetTrueFriendsQueryHookResult = ReturnType<typeof useGetTrueFriendsQuery>;
export type GetTrueFriendsLazyQueryHookResult = ReturnType<typeof useGetTrueFriendsLazyQuery>;
export type GetTrueFriendsQueryResult = Apollo.QueryResult<GetTrueFriendsQuery, GetTrueFriendsQueryVariables>;
export const GetThreeRandomParticipantsDocument = gql`
    query GetThreeRandomParticipants($eventId: Int!) {
  threeParticipant(eventId: $eventId) {
    avatar {
      id
    }
  }
}
    `;

/**
 * __useGetThreeRandomParticipantsQuery__
 *
 * To run a query within a React component, call `useGetThreeRandomParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreeRandomParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreeRandomParticipantsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetThreeRandomParticipantsQuery(baseOptions: Apollo.QueryHookOptions<GetThreeRandomParticipantsQuery, GetThreeRandomParticipantsQueryVariables>) {
        return Apollo.useQuery<GetThreeRandomParticipantsQuery, GetThreeRandomParticipantsQueryVariables>(GetThreeRandomParticipantsDocument, baseOptions);
      }
export function useGetThreeRandomParticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreeRandomParticipantsQuery, GetThreeRandomParticipantsQueryVariables>) {
          return Apollo.useLazyQuery<GetThreeRandomParticipantsQuery, GetThreeRandomParticipantsQueryVariables>(GetThreeRandomParticipantsDocument, baseOptions);
        }
export type GetThreeRandomParticipantsQueryHookResult = ReturnType<typeof useGetThreeRandomParticipantsQuery>;
export type GetThreeRandomParticipantsLazyQueryHookResult = ReturnType<typeof useGetThreeRandomParticipantsLazyQuery>;
export type GetThreeRandomParticipantsQueryResult = Apollo.QueryResult<GetThreeRandomParticipantsQuery, GetThreeRandomParticipantsQueryVariables>;
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