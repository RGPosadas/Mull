import { IChatForm, ISerializedPost } from '@mull/types';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { ROUTES } from '../../../../../src/constants';
import {
  Event,
  PostAddedDocument,
  useChannelByEventQuery,
  useCreatePostMutation,
} from '../../../../generated/graphql';
import { ChatInput } from '../../../components';
import ChatBubbleList from '../../../components/chat-bubble-list/chat-bubble-list';
import UserContext from '../../../context/user.context';
import { useToast } from '../../../hooks/useToast';

interface subscriptionData {
  subscriptionData: {
    data: {
      postAdded: Partial<ISerializedPost>;
    };
  };
}

export interface EventChatProps {
  eventId: number;
  channelName: string;
  restrictChatInput: boolean;
}

export const EventChat = ({ eventId, channelName, restrictChatInput }: EventChatProps) => {
  const { updateToast } = useToast();
  const [createPostMutation] = useCreatePostMutation();
  const { userId } = useContext(UserContext);
  const { data, loading, error, subscribeToMore } = useChannelByEventQuery({
    variables: {
      eventId, //TODO: Replace with dynamic event ID
      channelName,
    },
  });

  const isEventHost = (event: Event) => {
    if (restrictChatInput) {
      return event.host.id === userId || event.coHosts.some((coHost) => coHost.id === userId);
    }
    return true;
  };

  const subToMore = () =>
    subscribeToMore({
      document: PostAddedDocument,
      variables: { channelId: data.getChannelByEvent.id },
      updateQuery: (prev, { subscriptionData }: subscriptionData) => {
        if (!subscriptionData.data) return prev;
        const newPostItem = subscriptionData.data.postAdded;
        //Add the new message received from the subscriber
        const newList = Object.assign({}, prev, {
          getChannelByEvent: {
            posts: [...prev.getChannelByEvent.posts, newPostItem],
          },
        });

        return newList;
      },
    });

  const formik = useFormik<IChatForm>({
    initialValues: {
      message: '',
      imageFile: '',
    },

    validationSchema: Yup.object({
      message: Yup.string().required(),
    }),

    onSubmit: (values, { resetForm }) => {
      try {
        createPostMutation({
          variables: {
            post: {
              channel: { id: data.getChannelByEvent.id },
              message: formik.values.message,
              createdTime: Date.now(),
            },
          },
        });
        resetForm();
      } catch (err) {
        updateToast('Unable to send message', toast.TYPE.ERROR);
        console.error(err);
      }
    },
  });
  if (error) {
    return <Redirect to={ROUTES.LOGIN} />;
  }
  if (loading) return <div className="page-container">Loading...</div>;
  if (data) {
    return (
      <div className="event-chat">
        <ChatBubbleList posts={data.getChannelByEvent.posts} subToMore={subToMore} />
        {isEventHost(data.getChannelByEvent.event as Event) && <ChatInput formik={formik} />}
      </div>
    );
  }
};

export default EventChat;
