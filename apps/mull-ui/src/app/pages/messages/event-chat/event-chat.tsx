import { IChatForm, ISerializedPost, LIMITS } from '@mull/types';
import { useFormik } from 'formik';
import { History } from 'history';
import React, { ChangeEvent, CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import {
  CreatePostInput,
  Event,
  PostAddedDocument,
  useChannelByEventIdQuery,
  useCreatePostMutation,
  useUploadFileMutation,
} from '../../../../generated/graphql';
import { validateFileSize } from '../../../../utilities';
import { ChatInput, Spinner } from '../../../components';
import ChatBubbleList from '../../../components/chat-bubble-list/chat-bubble-list';
import UserContext from '../../../context/user.context';
import { useForceUpdate } from '../../../hooks/useForceUpdate';
import { useToast } from '../../../hooks/useToast';

interface subscriptionData {
  subscriptionData: {
    data: {
      postAdded: Partial<ISerializedPost>;
    };
  };
}

export interface EventChatProps {
  history: History;
  channelName: string;
  restrictChatInput: boolean;
}

export const EventChat = ({ history, channelName, restrictChatInput }: EventChatProps) => {
  const { updateToast } = useToast();
  const [createPostMutation] = useCreatePostMutation();
  const { notifyToast } = useToast();

  const [imageURLFile, setImageURLFile] = useState<string>('');
  const [uploadFile] = useUploadFileMutation();
  const [file, setFile] = useState<File>(null);

  const { userId } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id);
  const { data, loading, error, subscribeToMore } = useChannelByEventIdQuery({
    variables: {
      eventId,
      channelName,
    },
  });
  const [containerStyle, setContainerStyle] = useState<CSSProperties>({});
  const eventChatRef = useRef<HTMLDivElement>(null);
  const chatInputBot = useRef<string>('');
  const forceUpdate = useForceUpdate();

  const isEventHost = (event: Event) => {
    if (restrictChatInput) {
      return event.host.id === userId || event.coHosts.some((coHost) => coHost.id === userId);
    }
    return true;
  };

  const subToMore = () =>
    subscribeToMore({
      document: PostAddedDocument,
      variables: { channelId: data.getChannelByEventId.id },
      updateQuery: (prev, { subscriptionData }: subscriptionData) => {
        if (!subscriptionData.data) return prev;
        const newPostItem = subscriptionData.data.postAdded;
        //Add the new message received from the subscriber
        return Object.assign({}, prev, {
          getChannelByEventId: {
            posts: [...prev.getChannelByEventId.posts, newPostItem],
          },
        });
      },
    });

  /**
   * Handles image file uploads
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setImageURLFile(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    formik.setFieldValue('imageFile', event.target.files[0]);
  };

  const handleCloseImage = () => {
    setImageURLFile('');
    setFile(null);
    formik.setFieldValue('imageFile', '');
    formik.setErrors({});
  };

  const formik = useFormik<IChatForm>({
    initialValues: {
      message: '',
      imageFile: '',
    },

    validationSchema: Yup.object({
      message: file
        ? Yup.string()
            .optional()
            .max(LIMITS.POST_MESSAGE, `A post must be at most ${LIMITS.POST_MESSAGE} characters.`)
        : Yup.string()
            .required()
            .test('no-whitespace', "Message can't be empty", (value) => !/^\s*$/.test(value))
            .max(LIMITS.POST_MESSAGE, `A post must be at most ${LIMITS.POST_MESSAGE} characters.`),
      imageFile: Yup.mixed().test('big-file', 'File size is too large', validateFileSize),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const uploadedFile = file
          ? (await uploadFile({ variables: { file: file } })).data.uploadFile
          : null;

        // The div which makes up the "textarea" of the chat input isn't tied to the form, and its text needs to be cleared out after submit.
        const textAreas = document.getElementsByClassName('mull-text-area');
        for (let i = 0; i < textAreas.length; i++) {
          const element = textAreas[i];
          element.textContent = '';
        }

        createPostMutation({
          variables: {
            post: {
              channel: { id: data.getChannelByEventId.id },
              message: formik.values.message ? formik.values.message.trim() : '',
              media: uploadedFile
                ? { id: uploadedFile.id, mediaType: uploadedFile.mediaType }
                : null,
              createdTime: Date.now(),
            } as CreatePostInput,
          },
        }).catch((e) => {
          notifyToast(e, toast.TYPE.ERROR);
        });

        resetForm();
        handleCloseImage();
      } catch (err) {
        updateToast('Unable to send message', toast.TYPE.ERROR);
        console.error(err);
      }
    },
  });

  const updateContainerStyle = () => {
    const chatInputContainer = document.getElementsByClassName(
      'chat-input-container'
    )[0] as HTMLDivElement;
    if (chatInputContainer) {
      const margin =
        document.documentElement.clientHeight - chatInputContainer.getBoundingClientRect().top;
      setContainerStyle({ marginBottom: margin + 'px' });
      window.scrollTo({ top: 9999, behavior: 'smooth' });
    }
  };

  const inputOnFocus = () => {
    if (window.innerWidth < 800) {
      const botNav = document.getElementsByClassName('bot-nav-container')[0] as HTMLDivElement;
      botNav.style.display = 'none';

      const chatInputContainer = document.getElementsByClassName(
        'chat-input-container'
      )[0] as HTMLDivElement;

      chatInputBot.current = chatInputContainer.style.bottom;

      chatInputContainer.style.bottom = '0';

      updateContainerStyle();
      forceUpdate();
    }
  };
  const inputOnBlur = () => {
    if (window.innerWidth < 800) {
      const botNav = document.getElementsByClassName('bot-nav-container')[0] as HTMLDivElement;
      botNav.style.display = 'block';

      const chatInputContainer = document.getElementsByClassName(
        'chat-input-container'
      )[0] as HTMLDivElement;

      chatInputContainer.style.bottom = chatInputBot.current;

      updateContainerStyle();
      forceUpdate();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      updateContainerStyle();
    }, 200);
  }, []);

  useEffect(() => {
    updateContainerStyle();
  }, [formik.values.message]);

  if (error) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  if (loading) return <Spinner />;

  if (data) {
    return (
      <div className="event-chat" style={containerStyle} ref={eventChatRef}>
        <ChatBubbleList
          posts={data.getChannelByEventId.posts}
          subToMore={subToMore}
          history={history}
        />
        {isEventHost(data.getChannelByEventId.event as Event) && (
          <ChatInput
            onFocus={inputOnFocus}
            onBlur={inputOnBlur}
            formik={formik}
            handleFileUpload={handleFileUpload}
            image={imageURLFile}
            handleCloseImage={handleCloseImage}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default EventChat;
