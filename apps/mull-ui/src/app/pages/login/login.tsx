import React from 'react';
import { CustomTextInput } from '@mull/ui-lib';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import logo from '../../../assets/mull-logo.png';
import { ReactComponent as TwitterIcon } from '../../../assets/icons/login-icons/twitter.svg';
import { ReactComponent as GoogleIcon } from '../../../assets/icons/login-icons/google.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/icons/login-icons/facebook.svg';

import './login.scss';

export interface LoginProps {
  history: History;
}

export const Login = ({ history }) => {
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
      <div className="login-container">
        <img src={logo} className="login-mull-logo" alt="Mull logo" />

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
          hasErrors={formik.touched.password && !!formik.errors.password}
          errorMessage={formik.errors.password}
          isPassword={true}
        />

        <button type="submit" className="login">
          Login
        </button>

        <div className="sign-up">
          Don't have an account?{' '}
          <a href="/register" className="register-login-page">
            {' '}
            Sign up here!
          </a>
        </div>

        <div className="separator">or</div>

        <button className="twitter">
          <TwitterIcon />
          &nbsp; Continue with Twitter
        </button>

        <button className="google">
          <GoogleIcon />
          &nbsp; Continue with Google
        </button>

        <button className="facebook">
          <FacebookIcon />
          &nbsp; Continue with Facebook
        </button>
      </div>
    </form>
  );
};

export default Login;