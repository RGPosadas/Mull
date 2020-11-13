import React from 'react';

import { CustomTextInput } from '@mull/ui-lib';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import logo from '../../../assets/mull-logo.png';
import { ReactComponent as TwitterIcon } from '../../../assets/icons/login-icons/twitter.svg';
import { ReactComponent as GoogleIcon } from '../../../assets/icons/login-icons/google.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/icons/login-icons/facebook.svg';

import './login.scss';

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().required('Email is required.'),
      password: Yup.string().required('Password is required.'),
    }),

    onSubmit: (values) => {},
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
        <img src={logo} className="login-mull-logo" alt="Mull logo" />

        <CustomTextInput
          title="Email"
          fieldName="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          hasErrors={formik.touched.email && !!formik.errors.email}
          errorMessage={formik.errors.email}
        />

        <CustomTextInput
          title="Password"
          fieldName="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          hasErrors={formik.touched.password && !!formik.errors.password}
          errorMessage={formik.errors.password}
        />

        <button className="login">Login</button>

        <div className="separator">or</div>

        <button className="twitter">
          <TwitterIcon />
          Continue with Twitter
        </button>

        <button className="google">
          <GoogleIcon />
          Continue with Google
        </button>

        <button className="facebook">
          <FacebookIcon />
          Continue with Facebook
        </button>
      </div>
    </form>
  );
};

export default Login;
