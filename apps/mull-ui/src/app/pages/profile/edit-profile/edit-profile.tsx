import { IProfileEditForm, LIMITS } from '@mull/types';
import { useFormik } from 'formik';
import { History } from 'history';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { ROUTES } from '../../../../constants';
import { User, useUpdateUserMutation, useUserQuery } from '../../../../generated/graphql';
import { avatarUrl, exceedsNbOfLines, hasEmoji, validateFileSize } from '../../../../utilities';
import { CustomFileUpload, CustomTextInput, Spinner } from '../../../components';
import { MullBackButton } from '../../../components/mull-back-button/mull-back-button';
import MullButton from '../../../components/mull-button/mull-button';
import UserContext from '../../../context/user.context';
import { useToast } from '../../../hooks/useToast';
import './edit-profile.scss';

export interface EditProfilePageProps {
  history: History;
}

const EditProfile = ({ history }: EditProfilePageProps) => {
  const [imageURLFile, setImageURLFile] = useState<string>('');
  const [file, setFile] = useState<File>(null);
  const currentUserId = useContext(UserContext).userId;
  const { data: userData, loading: userLoading } = useUserQuery({
    variables: { id: currentUserId },
  });
  const [updateUser] = useUpdateUserMutation();
  const { updateToast, notifyToast } = useToast();

  const formik = useFormik<IProfileEditForm>({
    initialValues: {
      displayName: '',
      description: '',
      imageFile: '',
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .required('Display name is required')
        .max(LIMITS.USERNAME, `Display Name must be at most ${LIMITS.USERNAME} characters.`)
        .test('EmojiCheck', 'Emojis are not allowed in Display Name.', function (displayName) {
          return !hasEmoji(displayName);
        }),
      imageFile: Yup.mixed().test('big-file', 'File size is too large', validateFileSize),
      description: Yup.string()
        .max(
          LIMITS.PROFILE_DESCRIPTION,
          `Description must be ${LIMITS.PROFILE_DESCRIPTION} characters or less.`
        )
        .test(
          'NbOfLinesCheck',
          `Description must not exceed ${LIMITS.LINES} lines.`,
          function (description) {
            return exceedsNbOfLines(description);
          }
        ),
    }),

    onSubmit: async () => {
      notifyToast('Submitting User Profile...');
      try {
        await updateUser({
          variables: {
            newAvatar: file,
            userInput: {
              id: userData.user.id,
              name: formik.values.displayName,
              description: formik.values.description,
            },
          },
        });
        updateToast('Profile Updated', toast.TYPE.SUCCESS);
        history.push(ROUTES.PROFILE.DISPLAY);
      } catch (err) {
        updateToast('Error: Failed To Update Profile', toast.TYPE.ERROR);
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (!userLoading) {
      setImageURLFile(avatarUrl(userData.user as User));
      formik.setFieldValue('displayName', userData.user.name);
      formik.setFieldValue('description', userData.user.description);
    }
    // Ignored since the suggested fix broke the react hooks lifecycle
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [userData]);

  if (userLoading) return <Spinner />;

  /**
   * Handles image file uploads
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setImageURLFile(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    formik.setFieldValue('imageFile', event.target.files[0]);
  };

  return (
    <div className="page-container">
      <MullBackButton>Profile</MullBackButton>
      <form className="edit-profile-container" onSubmit={formik.handleSubmit}>
        <p className="edit-header">Edit Profile</p>

        <CustomFileUpload
          className="custom-file-upload-profile-picture"
          imageURL={imageURLFile}
          hasErrors={formik.touched.imageFile && !!formik.errors.imageFile}
          errorMessage={formik.errors.imageFile}
          handleFileUpload={handleFileUpload}
          fieldName="imageFile"
          displayPencilIcon={true}
        />

        <CustomTextInput
          title="Display Name"
          fieldName="displayName"
          value={formik.values.displayName}
          onChange={formik.handleChange}
          hasErrors={formik.touched.displayName && !!formik.errors.displayName}
          errorMessage={formik.errors.displayName}
        />

        <label className="description-label" htmlFor={'description'}>
          Description
        </label>

        <textarea
          id="description"
          className={`description-msg ${
            formik.touched.description && !!formik.errors.description ? 'error' : ''
          }`}
          rows={6}
          value={formik.values.description}
          onChange={formik.handleChange}
        />

        {formik.touched.description && !!formik.errors.description ? (
          <span className="error-message">{formik.errors.description}</span>
        ) : null}

        <MullButton className="save-button" type="submit">
          Save
        </MullButton>
      </form>
    </div>
  );
};

export default EditProfile;
