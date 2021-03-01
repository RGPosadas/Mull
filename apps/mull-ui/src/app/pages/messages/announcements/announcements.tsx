import { IChatForm } from '@mull/types';
import { useChannelByEventQuery, useCreatePostMutation } from 'apps/mull-ui/src/generated/graphql';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { mockPosts } from '../../../../constants';
import { ChatInput } from '../../../components';
import ChatBubbleList from '../../../components/chat-bubble-list/chat-bubble-list';
import { useToast } from '../../../hooks/useToast';

export const AnnouncementsPage = () => {
  // TODO: Render chat messages from an array
  const { updateToast } = useToast();
  const [createPostMutation] = useCreatePostMutation();
  const { data, loading } = useChannelByEventQuery({
    variables: {
      eventId: 4,
      channelName: 'Announcements',
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
              channel: { id: data.getChannelByEvent.id }, //TODO: replace with dynamic channel ID
              message: formik.values.message,
              createdTime: Date.now(),
              user: { id: 1 },
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
  return (
    <div className="announcement-page">
      <ChatBubbleList posts={mockPosts} />
      <ChatInput formik={formik} />
    </div>
  );
};
export default AnnouncementsPage;
