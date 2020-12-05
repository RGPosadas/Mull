import React from 'react';
import { gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { History } from 'history';

import { CustomTextInput } from '../../components';
import { RegistrationMethod } from '@mull/types';
import { useToast } from '../../hooks/useToast';

import logo from '../../../assets/mull-logo.png';

import './register.scss';

export interface RegisterProps {
  history: History;
}

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
    }
  }
`;

const Register = ({ history }: RegisterProps) => {
  // GraphQL mutation hook to create user
  const [createUser] = useMutation(CREATE_USER);
  const { notifyToast, updateToast } = useToast();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Name is required.'),
      email: Yup.string().required('Email is required.').email('Email format is incorrect'),
      password: Yup.string().required('Password is required.'),
    }),

    onSubmit: async (values) => {
      notifyToast('Registering...');
      const payload = { ...values, registrationMethod: RegistrationMethod.LOCAL };
      createUser({ variables: { createUserInput: payload } })
        .then(({ errors }) => {
          if (errors) {
            updateToast(toast.TYPE.ERROR, 'User Not Created');
          } else {
            updateToast(toast.TYPE.SUCCESS, 'Registration Successful');
            history.push('/home');
          }
        })
        .catch(() => {
          updateToast(toast.TYPE.ERROR, 'Fatal Error: User Not Created');
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="page-container no-navigation register-container">
        <img src={logo} className="register-mull-logo" alt="Mull logo" />
        <CustomTextInput
          title="Name"
          fieldName="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          hasErrors={formik.touched.email && !!formik.errors.email}
          errorMessage={formik.errors.name}
        />
        <CustomTextInput
          title="Email"
          fieldName="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          hasErrors={formik.touched.email && !!formik.errors.email}
          errorMessage={formik.errors.email}
        />
        <CustomTextInput
          title="Password"
          fieldName="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          hasErrors={formik.touched.email && !!formik.errors.password}
          errorMessage={formik.errors.password}
          password
        />
        <button type="submit" className="register-button">
          Create Account
        </button>

        <div className="login-link">
          Already have an acccount?{'  '}
          <Link to="/login" className="login-here">
            Login here!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
