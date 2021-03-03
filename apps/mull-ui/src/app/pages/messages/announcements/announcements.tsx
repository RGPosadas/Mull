import { IChatForm, ISerializedPost } from '@mull/types';
import {
  PostAddedDocument,
  useChannelByEventQuery,
  useCreatePostMutation,
} from 'apps/mull-ui/src/generated/graphql';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { ChatInput } from '../../../components';
import ChatBubbleList from '../../../components/chat-bubble-list/chat-bubble-list';
import { useToast } from '../../../hooks/useToast';

interface subscriptionData {
  subscriptionData: {
    data: {
      postAdded: Partial<ISerializedPost>;
    };
  };
}

export const AnnouncementsPage = () => {
  const { updateToast } = useToast();
  const [createPostMutation] = useCreatePostMutation();
  const { data, loading, subscribeToMore } = useChannelByEventQuery({
    variables: {
      eventId: 4, //TODO: Replace with dynamic event ID
      channelName: 'Announcements',
    },
  });

  const subToMore = () =>
    subscribeToMore({
      document: PostAddedDocument,
      variables: { channelId: data.getChannelByEvent.id },
      updateQuery: (prev, { subscriptionData }: subscriptionData) => {
        if (!subscriptionData.data) return prev;
        const newPostItem = subscriptionData.data.postAdded;

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

  if (loading) return <div className="page-container">Loading...</div>;
  if (data) {
    return (
      <div className="announcement-page">
        <ChatBubbleList posts={data.getChannelByEvent.posts} subToMore={subToMore} />
        <ChatInput formik={formik} />
      </div>
    );
  }
};
export default AnnouncementsPage;
