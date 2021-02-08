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
  // TODO: If user does not have an image, set to a default image
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
    //TODO: implement form logic
    onSubmit: async () => {
      const errors = await formik.validateForm();
      if (isEmpty(errors)) {
        //TODO: update profile in database
        console.log('Form successfully submitted');
      } else {
        formik.setTouched(setNestedObjectValues<FormikTouched<FormikValues>>(errors, true));
      }
    },
  });

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
