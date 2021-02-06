import { IProfileEditForm } from '@mull/types';
import { FormikTouched, FormikValues, setNestedObjectValues, useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import * as Yup from 'yup';
import { CustomFileUpload, CustomTextInput } from '../../../components';
import { MullBackButton } from '../../../components/mull-back-button/mull-back-button';
import MullButton from '../../../components/mull-button/mull-button';
import './edit-profile.scss';

const EditProfile = () => {
  // TODO: Add initial profile image if user has one
  // TODO: If user does not have an image, set to default image https://www.pngitem.com/pimgs/m/214-2145309_blank-profile-picture-circle-hd-png-download.png
  const [imageURLFile, setImageURLFile] = useState<string>(
    'https://blog.photofeeler.com/wp-content/uploads/2017/04/are-bumble-profiles-fake-how-many.jpeg'
  );

  // Uploaded image file blob
  const [file, setFile] = useState<File>(null);

  /**
   * Handles image file uploads
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setImageURLFile(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    formik.setFieldValue('imageFile', event.target.files[0]);
  };

  const formik = useFormik<IProfileEditForm>({
    initialValues: {
      displayName: '',
      description: '',
      imageFile: null,
    },

    validationSchema: Yup.object({
      displayName: Yup.string().required('Display name is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async () => {
      const errors = await formik.validateForm();
      if (isEmpty(errors)) {
        console.log(errors);
      } else {
        formik.setTouched(setNestedObjectValues<FormikTouched<FormikValues>>(errors, true));
      }
    },
  });

  const handleSaveButton = async () => {
    const errors = await formik.validateForm();
    if (isEmpty(errors)) {
      console.log(errors);
    } else {
      formik.setTouched(setNestedObjectValues<FormikTouched<FormikValues>>(errors, true));
    }
  };

  return (
    <form className="edit-profile-container" onSubmit={formik.handleSubmit}>
      <MullBackButton>Profile</MullBackButton>

      <p className="edit-header">Edit Profile</p>

      <CustomFileUpload
        className="custom-file-upload-profile-picture"
        imageURL={imageURLFile}
        hasErrors={formik.touched.imageFile && !!formik.errors.imageFile}
        errorMessage={formik.errors.imageFile}
        handleFileUpload={handleFileUpload}
        fieldName="imageFile"
        isEditProfile={true}
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

      <MullButton className="save-button" type="button" onClick={handleSaveButton}>
        Save
      </MullButton>
    </form>
  );
};

export default EditProfile;
