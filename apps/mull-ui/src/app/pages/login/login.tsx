import React from 'react';
import { CustomTextInput } from '@mull/ui-lib';
import { Link } from 'react-router-dom';
import { History } from 'history';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import logo from '../../../assets/mull-logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

import './login.scss';

export interface LoginProps {
  history: History;
}

export const Login = ({ history }: LoginProps) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().required('Email is required.').email('Email format is incorrect'),
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
          password
        />

        <button type="submit" className="login">
          Login
        </button>

        <div className="sign-up">
          Don't have an account?{'  '}
          <Link to="/register" className="register-login-page">
            Sign up here!
          </Link>
        </div>

        <div className="separator">or</div>

        <button className="twitter">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
          &nbsp; Continue with Twitter
        </button>

        <button className="google">
          <FontAwesomeIcon icon={faGoogle} size="2x" />
          &nbsp; Continue with Google
        </button>

        <button className="facebook">
          <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
          &nbsp; Continue with Facebook
        </button>
      </div>
    </form>
  );
};

export default Login;
